import { describe, expect, it } from 'vitest';
import { applyRateLimit, hasJsonContentType, requestIsTooLarge, readBoundedJson } from './server-security';

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
    expect(hasJsonContentType(requestFor('198.51.100.2', { contentType: 'application/json-malicious' }))).toBe(false);
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

describe('bounded request bodies', () => {
  function bodyRequest(body: string, declaredSize?: string) {
    return new Request('https://example.com/api/contact', {
      method: 'POST', body,
      headers: declaredSize ? { 'content-length': declaredSize } : {},
    });
  }

  it('rejects oversized bodies without trusting Content-Length', async () => {
    await expect(readBoundedJson(bodyRequest('"' + 'a'.repeat(100) + '"'), 20)).rejects.toMatchObject({ status: 413 });
    await expect(readBoundedJson(bodyRequest('"' + 'a'.repeat(100) + '"', '2'), 20)).rejects.toMatchObject({ status: 413 });
  });
  it('counts UTF-8 bytes and accepts exactly the permitted size', async () => {
    await expect(readBoundedJson(bodyRequest('"é"'), 4)).resolves.toBe('é');
    await expect(readBoundedJson(bodyRequest('"é"'), 3)).rejects.toMatchObject({ status: 413 });
  });
  it('handles malformed JSON as a client error', async () => {
    await expect(readBoundedJson(bodyRequest('{'), 20)).rejects.toMatchObject({ status: 400 });
  });
  it('decodes Unicode across stream chunk boundaries', async () => {
    const bytes = new TextEncoder().encode('{"name":"حازم"}');
    const stream = new ReadableStream({
      start(controller) {
        for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
        controller.close();
      },
    });
    const request = new Request('https://example.com', { method: 'POST', body: stream, duplex: 'half' } as RequestInit);
    await expect(readBoundedJson(request, bytes.length)).resolves.toEqual({ name: 'حازم' });
  });
});
