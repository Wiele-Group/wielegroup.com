import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function load(file, dependencies = {}) {
 const exports = {};
 const compiled = ts.transpileModule(readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
 }).outputText;
 runInNewContext(compiled, { exports, require: path => dependencies[path] });
 return exports;
}

const currency = load('src/lib/currency.ts');
const { estimateTransaction } = load('src/lib/transaction-estimate.ts', { './currency': currency });
const input = {
 role:'Buyer', asset:'Property', market:'UK', currency:'GBP', location:'England / Northern Ireland',
 value:500000, propertyBasis:'standard', sdltResidence:'resident', route:'pending', sellerTax:'quote',
 fees:2000, survey:1000, delivery:0, other:0, quotedTax:null, duty:null, customsValue:null,
 incidentalVatBase:null, vatRate:null, collector:'unknown', sacu:'unknown', temporaryFacts:false, months:null,
};
const run = (changes, fx = null) => estimateTransaction({ ...input, ...changes }, fx);
const tax = (result, label) => result.lines.find(line => line.label.includes(label))?.amount;

test('England SDLT stacks independently evidenced residence and higher-rate assumptions', () => {
 const result = run({ propertyBasis:'additional', sdltResidence:'nonresident' });
 assert.equal(tax(result,'residential SDLT'),15000);
 assert.equal(tax(result,'Additional property'),25000);
 assert.equal(tax(result,'non-resident'),10000);
 assert.equal(result.total,553000);
 assert.equal(result.partial,false);
 const unresolved = run({ sdltResidence:'unknown' });
 assert.equal(tax(unresolved,'non-resident'),null);
 assert.equal(unresolved.partial,true);
});

test('local property taxes respect the selected UK nation and South Africa threshold', () => {
 assert.equal(tax(run({ location:'Wales', value:260000, propertyBasis:'additional' }),'LTT'),15950);
 assert.equal(tax(run({ location:'Scotland', value:425000 }),'LBTT'),15850);
 assert.equal(tax(run({ market:'South Africa', currency:'ZAR', value:1663800 }),'Transfer Duty'),13614);
 assert.equal(tax(run({ market:'South Africa', currency:'ZAR', value:1210000 }),'Transfer Duty'),0);
});

test('other EU acquisition tax requires a local quote and FX never falls back to parity', () => {
 const result = run({ market:'Europe (EU)', location:'Other EU country', currency:'EUR' });
 assert.equal(tax(result,'Quoted acquisition'),null);
 assert.equal(result.partial,true);
 assert.equal(tax(run({ currency:'USD' }),'residential SDLT'),null);
 const fx = { date:'2026-11-20', rates:{ EUR:1, GBP:.8, USD:1.2 } };
 const converted = run({ currency:'USD', value:750000 },fx);
 assert.equal(Math.round(tax(converted,'residential SDLT')),22500);
 assert.equal(converted.fxDate,fx.date);
});

test('collector import relief uses confirmed classification; yacht TA does not deduct provisional relief', () => {
 const car = { asset:'Classic Cars', location:'Great Britain', route:'import', duty:0, customsValue:200000, incidentalVatBase:2000 };
 assert.equal(tax(run(car),'Import VAT'),null);
 assert.equal(tax(run({ ...car, collector:'confirmed' }),'Import VAT'),10100);
 assert.equal(tax(run({ ...car, collector:'standard' }),'Import VAT'),40400);
 const yacht = run({ asset:'Yachts', market:'Europe (EU)', location:'Malta', route:'temporary', temporaryFacts:true, months:18 });
 assert.equal(yacht.partial,true);
 assert.match(yacht.lines.find(line => line.label.includes('Temporary Admission')).note,/Potential private-use route, up to 18 months/);
 assert.equal(tax(yacht,'Temporary Admission'),null);
});

test('SARS distinguishes origin for VAT and section 35A withholding on the full sale price', () => {
 const car = { asset:'Classic Cars', market:'South Africa', currency:'ZAR', route:'import', customsValue:1e6, duty:100000 };
 assert.equal(Math.round(tax(run({ ...car, sacu:'outside' }),'Import VAT')),180000);
 assert.equal(Math.round(tax(run({ ...car, sacu:'blns' }),'Import VAT')),165000);
 assert.equal(tax(run(car),'Import VAT'),null);
 const sale = { role:'Seller', market:'South Africa', currency:'ZAR', sellerTax:'sa-person' };
 assert.equal(tax(run({ ...sale, value:2e6 }),'Section 35A'),0);
 assert.equal(run({ ...sale, value:3e6 }).total,2772000);
});
