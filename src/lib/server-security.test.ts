import { describe, expect, it } from 'vitest';
import { applyRateLimit, hasJsonContentType, requestIsTooLarge } from './server-security';

function requestFor(ip: string, options: { contentType?: string; contentLength?: string } = {}) {
  return new Request('https://hazemelerefy.vercel.app/api/test', {
    headers: {
      'x-forwarded-for': ip,
      ...(options.contentType ? { 'content-type': options.contentType } : {}),
      ...(options.contentLength ? { 'content-length': options.contentLength } : {}),
    },
  });
}

describe('server security helpers', () => {
  it('accepts JSON requests and rejects unexpected content types', () => {
    expect(hasJsonContentType(requestFor('198.51.100.1', { contentType: 'application/json; charset=utf-8' }))).toBe(true);
    expect(hasJsonContentType(requestFor('198.51.100.2', { contentType: 'text/plain' }))).toBe(false);
  });

  it('rejects requests whose declared payload size exceeds the endpoint limit', () => {
    expect(requestIsTooLarge(requestFor('198.51.100.3', { contentLength: '16001' }), 16_000)).toBe(true);
    expect(requestIsTooLarge(requestFor('198.51.100.4', { contentLength: '16000' }), 16_000)).toBe(false);
  });

  it('enforces a per-client chat request ceiling', () => {
    const request = requestFor('198.51.100.250');

    for (let attempt = 0; attempt < 12; attempt += 1) {
      expect(applyRateLimit(request, 'chat').allowed).toBe(true);
    }

    const blocked = applyRateLimit(request, 'chat');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});
