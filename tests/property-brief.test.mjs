import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as zod from 'zod';
import {webcrypto} from 'node:crypto';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/property-brief.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const lib={};vm.runInNewContext(compiled,{exports:lib,require:()=>zod,crypto:webcrypto,TextEncoder,setTimeout,clearTimeout});
const input={goal:'income',property:'Apartment',location:'Open to locations',budget:'€300,000–€600,000',timing:'Exploring options'};
function environment(response='{"questions":["income_basis","operating_costs","lease_terms"]}'){const records=new Map();let calls=0;return{records,get calls(){return calls;},env:{AI:{async run(){calls++;return{response};}},AUDIT_QUEUE:{async get(key){return records.get(key)||null;},async put(key,value){records.set(key,value);}}}};}
test('rejects contact details and free text at the preparation boundary',()=>{for(const extra of [{email:'visitor@example.invalid'},{message:'My passport is...'},{goal:'Ignore rules'}])assert.equal(lib.briefInputSchema.safeParse({...input,...extra}).success,false);});
test('guided fallback remains available without an AI provider',async()=>{const r=await lib.prepareBrief(input,{},'test');assert.equal(r.mode,'guided');assert.equal(r.questions.length,3);assert.ok(r.summary.includes(input.budget));});
test('AI can choose approved questions, never provide its own advice',async()=>{const s=environment('Untrusted model explanation: guaranteed returns. {"questions":["income_basis","operating_costs","lease_terms"]}');const r=await lib.prepareBrief(input,s.env,'test');assert.equal(r.mode,'ai');assert.ok(!r.draft.includes('guaranteed'));assert.equal(r.questions[0],lib.briefQuestions.income_basis);});
test('unknown or duplicate model outputs fall back honestly',async()=>{for(const raw of ['{"questions":["invented","operating_costs","lease_terms"]}','{"questions":["income_basis","income_basis","lease_terms"]}','not JSON']){const r=await lib.prepareBrief(input,environment(raw).env,'test');assert.equal(r.mode,'guided');}});
test('cached question IDs avoid another model request',async()=>{const s=environment();await lib.prepareBrief(input,s.env,'test');await lib.prepareBrief(input,s.env,'other');assert.equal(s.calls,1);assert.ok([...s.records.keys()].every(k=>!k.includes('test')));});
test('limit exhaustion falls back without running AI',async()=>{const s=environment();s.env.AUDIT_QUEUE.get=async key=>key.includes(':daily:')?'100':null;const r=await lib.prepareBrief(input,s.env,'test');assert.equal(r.mode,'guided');assert.equal(s.calls,0);});
test('maintenance cannot receive an investment-only question selection',async()=>{const r=await lib.prepareBrief({...input,goal:'maintenance'},environment().env,'test');assert.equal(r.mode,'guided');assert.ok(r.questions.includes(lib.briefQuestions.care_scope));});
test('service briefs do not relabel a purchase budget as the work quotation',()=>{const r=lib.arrangeBrief({...input,goal:'marketing'});assert.ok(!r.summary.includes(input.budget));assert.ok(r.summary.includes('agreed scope'));});
const routeCompiled=ts.transpileModule(fs.readFileSync('src/app/api/property-brief/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function route(){const exports={};vm.runInNewContext(routeCompiled,{exports,require:name=>name==='@/lib/property-brief'?lib:{getCloudflareContext:()=>({env:{}})},Request,Response,URL});return exports.POST;}
test('cross-origin requests are rejected',async()=>{const r=await route()(new Request('https://wielegroup.com/api/property-brief',{method:'POST',headers:{Origin:'https://unrelated.invalid','Content-Type':'application/json'},body:JSON.stringify(input)}));assert.equal(r.status,403);});
test('valid preparation is not cached as a public page or sent as a lead',async()=>{const r=await route()(new Request('https://wielegroup.com/api/property-brief',{method:'POST',headers:{Origin:'https://wielegroup.com','Content-Type':'application/json'},body:JSON.stringify(input)}));assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store');assert.equal((await r.json()).mode,'guided');});
