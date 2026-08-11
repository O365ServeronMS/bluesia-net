import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../src/worker.js';

const env = {
  TURNSTILE_SECRET: 'test-secret',
  TURNSTILE_HOSTNAMES: 'bluesia.net',
  ASSETS: {
    fetch: async () => new Response('asset'),
  },
};

const validPayload = {
  name: 'Nguyen Van A',
  email: 'investor@example.com',
  company: 'Example Energy',
  interest: 'solar',
  message: 'Hello',
  'cf-turnstile-response': 'valid-token',
};

function contactRequest(payload = validPayload, overrides = {}) {
  return new Request('https://bluesia.net/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://bluesia.net',
      ...overrides.headers,
    },
    body: JSON.stringify(payload),
    ...overrides,
  });
}

test('accepts a valid Turnstile result', async (t) => {
  const siteverify = t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(init.method, 'POST');
    assert.equal(init.body.get('secret'), env.TURNSTILE_SECRET);
    assert.equal(init.body.get('response'), validPayload['cf-turnstile-response']);
    assert.match(init.body.get('idempotency_key'), /^[0-9a-f-]{36}$/);
    return Response.json({ success: true, action: 'contact', hostname: 'bluesia.net' });
  });

  const response = await worker.fetch(contactRequest(), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(siteverify.mock.callCount(), 1);
});

test('rejects action and hostname mismatches', async (t) => {
  const results = [
    { success: true, action: 'login', hostname: 'bluesia.net' },
    { success: true, action: 'contact', hostname: 'attacker.example' },
  ];
  t.mock.method(globalThis, 'fetch', async () => Response.json(results.shift()));

  assert.equal((await worker.fetch(contactRequest(), env)).status, 403);
  assert.equal((await worker.fetch(contactRequest(), env)).status, 403);
});

test('rejects a replayed token', async (t) => {
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    calls += 1;
    return Response.json(
      calls === 1
        ? { success: true, action: 'contact', hostname: 'bluesia.net' }
        : { success: false, 'error-codes': ['timeout-or-duplicate'] },
    );
  });

  assert.equal((await worker.fetch(contactRequest(), env)).status, 200);
  assert.equal((await worker.fetch(contactRequest(), env)).status, 403);
});

test('rejects cross-origin requests before Siteverify', async (t) => {
  const siteverify = t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('must not be called');
  });
  const request = contactRequest(validPayload, {
    headers: { 'Content-Type': 'application/json', Origin: 'https://attacker.example' },
  });

  assert.equal((await worker.fetch(request, env)).status, 403);
  assert.equal(siteverify.mock.callCount(), 0);
});

test('rejects oversized bodies', async () => {
  const payload = { ...validPayload, message: 'x'.repeat(17 * 1024) };
  assert.equal((await worker.fetch(contactRequest(payload), env)).status, 413);
});

test('delegates non-API requests to static assets', async () => {
  const response = await worker.fetch(new Request('https://bluesia.net/'), env);
  assert.equal(await response.text(), 'asset');
});
