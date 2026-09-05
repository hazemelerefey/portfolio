type RateLimitScope = "chat" | "contact";

type RateLimitRule = {
  windowMs: number;
  maxRequests: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rules: Record<RateLimitScope, RateLimitRule> = {
  chat: { windowMs: 60_000, maxRequests: 12 },
  contact: { windowMs: 60 * 60_000, maxRequests: 5 },
};

const globalRateLimitState = globalThis as typeof globalThis & {
  __portfolioRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimitState = globalRateLimitState.__portfolioRateLimits ?? new Map<string, RateLimitEntry>();
globalRateLimitState.__portfolioRateLimits = rateLimitState;

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function applyRateLimit(request: Request, scope: RateLimitScope) {
  const rule = rules[scope];
  const now = Date.now();

  if (rateLimitState.size > 2_000) {
    for (const [key, entry] of rateLimitState) {
      if (entry.resetAt <= now) rateLimitState.delete(key);
    }
  }

  const key = `${scope}:${getClientIdentifier(request)}`;
  const existing = rateLimitState.get(key);
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + rule.windowMs }
    : existing;

  entry.count += 1;
  rateLimitState.set(key, entry);

  return {
    allowed: entry.count <= rule.maxRequests,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
  };
}

export function hasJsonContentType(request: Request) {
  return request.headers.get("content-type")?.split(';')[0].trim().toLowerCase() === "application/json";
}

export class RequestBodyError extends Error {
  constructor(message: string, public readonly status: 400 | 413) {
    super(message);
  }
}

// Check actual streamed bytes as Content-Length can be absent or understated.
export async function readBoundedJson(request: Request, maximumBytes: number): Promise<unknown> {
  if (requestIsTooLarge(request, maximumBytes)) {
    throw new RequestBodyError('Request is too large', 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError('Invalid JSON body', 400);
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximumBytes) {
        await reader.cancel();
        throw new RequestBodyError('Request is too large', 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new RequestBodyError('Invalid JSON body', 400);
  }
}

export function requestIsTooLarge(request: Request, maximumBytes: number) {
  const header = request.headers.get("content-length");
  if (!header) return false;

  const contentLength = Number(header);
  return Number.isFinite(contentLength) && contentLength > maximumBytes;
}
