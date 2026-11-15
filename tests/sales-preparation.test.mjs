import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const config=JSON.parse(fs.readFileSync('src/data/wiele-asset-classes.json','utf8'));
const compiled=ts.transpileModule(fs.readFileSync('src/lib/sales-preparation.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
const exports={};vm.runInNewContext(compiled,{exports,require:()=>config});
const {prepareSalesBrief}=exports;
const base={category:'property',location:'',specification:'',price:'',currency:'EUR',authority:'To confirm',liquidity:'Not assessed',timing:'Exploring options',privacy:'To discuss',evidence:[]};
test('an empty preparation asks five diagnostics without claiming readiness',()=>{const p=prepareSalesBrief(base);assert.equal(p.questions.length,5);assert.equal(p.available.length,0);assert.equal(p.missing.length,4);assert.match(p.draft,/preparation only/);});
test('each category provides its own evidence and removes foreign selections',()=>{for(const category of Object.keys(config)){const evidence=[...config[category].evidence,'unrelated evidence'];const p=prepareSalesBrief({...base,category,evidence});assert.equal(p.available.length,4);assert.equal(p.missing.length,0);assert.equal(p.draft.includes('unrelated evidence'),false);assert.equal(p.channels[0],config[category].channels[0]);}});
test('complete self-described inputs still require at least three professional questions',()=>{const p=prepareSalesBrief({...base,location:'Malta',specification:'Test asset',price:'500000',authority:'Owner',liquidity:'Niche collector market',evidence:config.property.evidence});assert.equal(p.questions.length,3);assert.match(p.draft,/not verified/);assert.match(p.draft,/self-described/);});
test('confidential choice does not include public marketplace distribution',()=>{const p=prepareSalesBrief({...base,privacy:'Confidential first'});assert.equal(p.channels.length,2);assert.match(p.channels[1],/separate decision/);assert.equal(p.channels.some(x=>/marketplaces/.test(x)),false);});
test('time-sensitive route asks for a deadline review rather than promising 90-day execution',()=>{assert.match(prepareSalesBrief({...base,timing:'Time-sensitive'}).route,/before fixing/);});
test('maximum permitted free text fits the existing enquiry draft limit',()=>{const p=prepareSalesBrief({...base,category:'classic-cars',location:'L'.repeat(120),specification:'S'.repeat(500),price:'P'.repeat(60),evidence:config['classic-cars'].evidence});assert.ok(p.draft.length<=3000);});
test('unknown categories are rejected',()=>{assert.throws(()=>prepareSalesBrief({...base,category:'unknown'}));});

test('discussion or zero placeholders do not become asking prices',()=>{for(const price of ['To discuss','Unknown','0','0.00']){const p=prepareSalesBrief({...base,price});assert.match(p.draft,/Asking price: To discuss/);assert.ok(p.questions.some(x=>x.includes('asking price')));}});
