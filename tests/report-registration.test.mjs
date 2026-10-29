import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import ts from 'typescript';
import * as zod from 'zod';

const valid = { name: 'Report QA', email: 'qa@example.invalid', objective: 'apartment', updates: false, website: '', token: 'synthetic-token' };
function setup({ storageFails = false, notificationFails = false, verification = true, hostname = 'wielegroup.com', configured = true } = {}) {
  const records = [], calls = [], modules = new Map();
  const env = configured ? { AUDIT_QUEUE: { async put(key, value, options) { if (storageFails) throw Error('storage unavailable'); records.push({ key, value: JSON.parse(value), options }); } }, TURNSTILE_SECRET_KEY: 'test-turnstile-secret', REPORT_ACCESS_SECRET: 'test-report-secret-only-for-local-tests-123456789', RESEND_API_KEY: 'test-resend' } : {};
  function load(name) {
    if (name === 'zod') return zod;
    if (name === '@opennextjs/cloudflare') return { getCloudflareContext: () => ({ env }) };
    if (name === 'server-only') return {};
    const filename = path.join(process.cwd(), name.replace('@/', 'src/') + '.ts');
    if (modules.has(filename)) return modules.get(filename);
    const exports = {}; modules.set(filename, exports);
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(compiled, { exports, require: load, Request, Response, URL, URLSearchParams, AbortSignal, Buffer, TextEncoder, Date, crypto: webcrypto, console: { error() {} }, fetch: async (url, options) => { calls.push({ url, options }); return url.includes('siteverify') ? Response.json({ success: verification, hostname }) : Response.json({}, { status: notificationFails ? 503 : 200 }); } });
    return exports;
  }
  const route = load('@/app/api/reports/register/route');
  const download = load('@/app/api/reports/download/route');
  return {
    records, calls, env, access: load('@/server/report-access'),
    post: (body = valid, origin = 'https://wielegroup.com', contentType = 'application/json') => route.POST(new Request('https://wielegroup.com/api/reports/register', { method: 'POST', headers: { origin, 'Content-Type': contentType }, body: JSON.stringify(body) })),
    get: (cookie = '') => download.GET(new Request('https://wielegroup.com/api/reports/download', { headers: cookie ? { cookie } : {} })),
  };
}
test('cross-origin registration does not verify, write or email', async () => { const s = setup(); assert.equal((await s.post(valid, 'https://other.invalid')).status, 403); assert.equal(s.calls.length, 0); assert.equal(s.records.length, 0); });
test('invalid fields and non-JSON content are rejected', async () => { const s = setup(); assert.equal((await s.post({ ...valid, email: 'bad' })).status, 400); assert.equal((await s.post(valid, 'https://wielegroup.com', 'text/plain')).status, 415); assert.equal(s.calls.length, 0); });
test('oversized and honeypot submissions never unlock the PDF', async () => { const s = setup(); for (const body of [{ ...valid, name: 'x'.repeat(7000) }, { ...valid, website: 'spam' }]) { const r = await s.post(body); assert.ok(r.status >= 400); assert.equal(r.headers.get('set-cookie'), null); } assert.equal(s.records.length, 0); });
test('missing configuration fails closed for registration and downloads', async () => { const s = setup({ configured: false }); assert.equal((await s.post()).status, 503); assert.equal((await s.get()).status, 503); assert.equal(s.records.length, 0); });
test('failed or wrong-host Turnstile tokens do not write or unlock', async () => { for (const opts of [{ verification: false }, { hostname: 'other.invalid' }]) { const s = setup(opts); const r = await s.post(); assert.equal(r.status, 403); assert.equal(r.headers.get('set-cookie'), null); assert.equal(s.records.length, 0); } });
test('storage failure never issues access or an email', async () => { const s = setup({ storageFails: true }); const r = await s.post(); assert.equal(r.status, 503); assert.equal(r.headers.get('set-cookie'), null); assert.equal(s.calls.length, 1); });
test('registration without marketing consent persists and unlocks', async () => { const s = setup(); const r = await s.post(); assert.equal(r.status, 201); const record = s.records[0]; assert.match(record.key, /^report-registration:/); assert.equal(record.options.expirationTtl, 7776000); assert.equal(record.value.submission.email, valid.email); assert.equal(record.value.submission.token, undefined); assert.equal(record.value.emailVerified, false); assert.equal(record.value.marketingConsent.accepted, false); const cookie = r.headers.get('set-cookie'); assert.match(cookie, /HttpOnly; Secure; SameSite=Strict/); assert.match(cookie, /Path=\/api\/reports/); assert.ok(!cookie.includes(valid.email)); const response = await s.get(cookie.split(';')[0]); assert.equal(response.status, 200); assert.equal(response.headers.get('content-type'), 'application/pdf'); assert.match(Buffer.from(await response.arrayBuffer()).subarray(0, 8).toString(), /^%PDF-/); });
test('marketing opt-in is distinct and recorded with wording version', async () => { const s = setup(); assert.equal((await s.post({ ...valid, updates: true })).status, 201); const consent = s.records[0].value.marketingConsent; assert.equal(consent.accepted, true); assert.equal(consent.version, 'report-updates-2026-10-29'); assert.ok(consent.recordedAt); });
test('notification failure retains registration and download access', async () => { const s = setup({ notificationFails: true }); const r = await s.post(); assert.equal(r.status, 201); assert.equal(s.records.length, 1); const mail = JSON.parse(s.calls[1].options.body); assert.deepEqual(mail.to, ['admin@wielegroup.com']); assert.equal(mail.reply_to, valid.email); });
test('anonymous download returns no PDF bytes and is not cacheable', async () => { const s = setup(); const r = await s.get(); assert.equal(r.status, 401); assert.match(r.headers.get('cache-control'), /no-store/); assert.match(r.headers.get('x-robots-tag'), /noindex/); assert.ok(!(await r.text()).startsWith('%PDF-')); });
test('tampered, expired, future and wrong-report cookies fail verification', async () => { const s = setup(); const now = Date.now(); const id = webcrypto.randomUUID(); const good = await s.access.createAccess(s.env.REPORT_ACCESS_SECRET, id, now); assert.equal(await s.access.validAccess(s.env.REPORT_ACCESS_SECRET, good, now), true); assert.equal(await s.access.validAccess(s.env.REPORT_ACCESS_SECRET, good, now + 86400001), false); assert.equal(await s.access.validAccess(s.env.REPORT_ACCESS_SECRET, good.replace('malta-investment-2026', 'other-report'), now), false); assert.equal(await s.access.validAccess('different-key', good, now), false); const altered = good.slice(0, -5) + 'ABCDE'; assert.equal(await s.access.validAccess(s.env.REPORT_ACCESS_SECRET, altered, now), false); const future = await s.access.createAccess(s.env.REPORT_ACCESS_SECRET, id, now + 3600000); assert.equal(await s.access.validAccess(s.env.REPORT_ACCESS_SECRET, future, now), false); });
test('private PDF is absent from public files and client imports', () => { const publicFiles = fs.readdirSync('public', { recursive: true }); assert.ok(!publicFiles.some(f => /investment.*\.pdf$/i.test(f))); for (const file of ['src/components/property/report-registration.tsx', 'src/app/malta-investment-report/page.tsx']) assert.ok(!fs.readFileSync(file, 'utf8').includes('report-pdf')); });
