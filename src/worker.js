const CONTACT_PATH = '/api/contact';
const EXPECTED_ACTION = 'contact';
const MAX_BODY_BYTES = 16 * 1024;
const MAX_TOKEN_LENGTH = 2048;
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const ALLOWED_INTERESTS = new Set(['', 'solar', 'wind', 'hydro', 'storage', 'all']);

class RequestBodyError extends Error {
  constructor(status) {
    super('invalid request body');
    this.status = status;
  }
}

function jsonResponse(payload, status = 200, headers = {}) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

async function readBoundedJson(request) {
  if (!request.body) throw new RequestBodyError(400);

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let body = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RequestBodyError(413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body);
  } catch (error) {
    if (error instanceof RequestBodyError) throw error;
    throw new RequestBodyError(400);
  }
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringWithin(value, minimum, maximum) {
  return typeof value === 'string' && value.trim().length >= minimum && value.length <= maximum;
}

function isValidContactPayload(payload) {
  if (!isRecord(payload)) return false;

  const interest = typeof payload.interest === 'string' ? payload.interest : '';
  const message = typeof payload.message === 'string' ? payload.message : '';

  return (
    isStringWithin(payload.name, 1, 120) &&
    isStringWithin(payload.email, 3, 254) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) &&
    isStringWithin(payload.company, 1, 160) &&
    ALLOWED_INTERESTS.has(interest) &&
    message.length <= 4000
  );
}

function expectedHostnames(value) {
  if (typeof value !== 'string') return new Set();
  return new Set(value.split(',').map((hostname) => hostname.trim()).filter(Boolean));
}

function isSiteverifyResult(value) {
  return (
    isRecord(value) &&
    typeof value.success === 'boolean' &&
    (value.action === undefined || typeof value.action === 'string') &&
    (value.hostname === undefined || typeof value.hostname === 'string')
  );
}

async function handleContact(request, env) {
  const requestId = crypto.randomUUID();
  const origin = request.headers.get('Origin');
  const expectedOrigin = new URL(request.url).origin;

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405, {
      Allow: 'POST',
      'X-Request-Id': requestId,
    });
  }

  if (!origin || origin !== expectedOrigin) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403, { 'X-Request-Id': requestId });
  }

  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0].trim();
  if (contentType !== 'application/json') {
    return jsonResponse({ ok: false, error: 'unsupported_media_type' }, 415, {
      'X-Request-Id': requestId,
    });
  }

  let payload;
  try {
    payload = await readBoundedJson(request);
  } catch (error) {
    const status = error instanceof RequestBodyError ? error.status : 400;
    return jsonResponse(
      { ok: false, error: status === 413 ? 'request_too_large' : 'invalid_request' },
      status,
      { 'X-Request-Id': requestId },
    );
  }

  if (!isValidContactPayload(payload)) {
    return jsonResponse({ ok: false, error: 'invalid_request' }, 400, { 'X-Request-Id': requestId });
  }

  const token = payload['cf-turnstile-response'];
  const hostnames = expectedHostnames(env.TURNSTILE_HOSTNAMES);
  if (typeof token !== 'string' || token.length === 0 || token.length > MAX_TOKEN_LENGTH || hostnames.size === 0) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403, { 'X-Request-Id': requestId });
  }

  if (typeof env.TURNSTILE_SECRET !== 'string' || env.TURNSTILE_SECRET.length === 0) {
    console.error(JSON.stringify({ message: 'missing Turnstile secret', requestId }));
    return jsonResponse({ ok: false, error: 'service_unavailable' }, 503, { 'X-Request-Id': requestId });
  }

  const siteverifyBody = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: token,
    idempotency_key: requestId,
  });
  const clientIp = request.headers.get('CF-Connecting-IP');
  if (clientIp && clientIp.length <= 45) siteverifyBody.set('remoteip', clientIp);

  let result;
  try {
    const verification = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: siteverifyBody,
      signal: AbortSignal.timeout(10_000),
    });
    if (!verification.ok) throw new Error('siteverify ' + verification.status);
    result = await verification.json();
  } catch (error) {
    console.error(JSON.stringify({
      message: 'Turnstile Siteverify request failed',
      requestId,
      error: error instanceof Error ? error.message : 'unknown error',
    }));
    return jsonResponse({ ok: false, error: 'forbidden' }, 403, { 'X-Request-Id': requestId });
  }

  if (
    !isSiteverifyResult(result) ||
    result.success !== true ||
    result.action !== EXPECTED_ACTION ||
    !hostnames.has(result.hostname)
  ) {
    return jsonResponse({ ok: false, error: 'forbidden' }, 403, { 'X-Request-Id': requestId });
  }

  return jsonResponse({ ok: true }, 200, { 'X-Request-Id': requestId });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === CONTACT_PATH) return handleContact(request, env);
    if (url.pathname.startsWith('/api/')) return jsonResponse({ ok: false, error: 'not_found' }, 404);

    return env.ASSETS.fetch(request);
  },
};
