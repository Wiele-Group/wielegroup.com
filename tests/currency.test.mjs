import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/currency.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const exports={};vm.runInNewContext(compiled,{exports,Date,Number});
const {currencies,parseReferenceRates,convertCurrency}=exports;
const now=new Date('2026-11-15T12:00:00Z');
const rates={EUR:1,GBP:0.8,ZAR:20,USD:1.1,CHF:0.93,SEK:11,NOK:10.5,DKK:7.4,PLN:4.4,CZK:24.4};
const rows=()=>currencies.filter(c=>c!=='EUR').map(quote=>({base:'EUR',quote,rate:rates[quote],date:'2026-11-13'}));
test('cross-rates preserve direction, reverse conversion and zero',()=>{assert.equal(convertCurrency(100,'GBP','ZAR',rates),2500);assert.equal(convertCurrency(2500,'ZAR','GBP',rates),100);assert.equal(convertCurrency(0,'EUR','ZAR',rates),0);assert.equal(convertCurrency(17,'ZAR','ZAR',rates),17);});
test('reject invalid amounts and unavailable or zero rates',()=>{for(const amount of [NaN,Infinity,-1,1e13])assert.throws(()=>convertCurrency(amount,'EUR','ZAR',rates));assert.throws(()=>convertCurrency(10,'AAA','EUR',rates));assert.throws(()=>convertCurrency(10,'EUR','GBP',{...rates,GBP:0}));});
test('complete common-date ECB data supports weekends',()=>{const value=parseReferenceRates(rows(),now);assert.equal(value.date,'2026-11-13');assert.equal(value.rates.EUR,1);assert.equal(value.rates.ZAR,20);});
test('reject partial, malformed, nonpositive and nonnumeric provider results',()=>{assert.throws(()=>parseReferenceRates({},now));assert.throws(()=>parseReferenceRates(rows().slice(1),now));for(const rate of [0,-3,Infinity,'20',null]){const value=rows();value[0].rate=rate;assert.throws(()=>parseReferenceRates(value,now));}});
test('reject stale, future, invalid or mixed reference dates',()=>{for(const date of ['2026-11-01','2026-11-16','2026-02-30','bad']){const value=rows().map(r=>({...r,date}));assert.throws(()=>parseReferenceRates(value,now));}const value=rows();value[0].date='2026-11-12';assert.throws(()=>parseReferenceRates(value,now));});

const fxCompiled = ts.transpileModule(fs.readFileSync('src/lib/fx-rates.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function mockProvider(fetch, signal = AbortSignal) {
  const fx = {};
  vm.runInNewContext(fxCompiled, {
    exports: fx,
    require: () => exports,
    URL, URLSearchParams, AbortSignal: signal, Response, fetch,
  });
  return fx;
}

test('FX endpoint publishes complete EUR reference rates with a one-hour edge TTL', async () => {
  const recentRows = rows().map(row => ({ ...row, date: new Date().toISOString().slice(0, 10) }));
  const { loadFxRates, fxRatesResponse } = mockProvider(async url => {
    assert.equal(url.searchParams.get('providers'), 'ECB');
    return Response.json(recentRows);
  });
  const data = await loadFxRates();
  const response = fxRatesResponse(data);
  assert.equal(data.degraded, false);
  assert.equal(data.base, 'EUR');
  assert.equal(data.rates.ZAR, 20);
  assert.match(response.headers.get('Cache-Control'), /s-maxage=3600/);
});

test('FX endpoint publishes the dated, complete snapshot when the provider fails', async () => {
  for (const fetch of [
    async () => new Response(null, { status: 503 }),
    async () => new Response('malformed'),
    async () => Response.json([]),
    async (_url, { signal }) => {
      assert.equal(signal.aborted, true);
      throw signal.reason;
    },
  ]) {
    const { loadFxRates, fxRatesResponse } = mockProvider(fetch, {
      timeout(ms) {
        assert.equal(ms, 3500);
        return AbortSignal.abort(new DOMException('Timeout', 'TimeoutError'));
      },
    });
    const data = await loadFxRates();
    const response = fxRatesResponse(data);
    assert.equal(response.status, 200);
    assert.equal(data.degraded, true);
    assert.equal(data.date, '2026-11-24');
    assert.equal(data.rates.EUR, 1);
    assert.equal(Object.keys(data.rates).length, currencies.length);
    assert.ok(convertCurrency(100, 'EUR', 'GBP', data.rates) > 0);
    assert.match(response.headers.get('Cache-Control'), /s-maxage=300/);
  }
});
