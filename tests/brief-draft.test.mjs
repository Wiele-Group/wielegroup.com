import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const compiled=ts.transpileModule(fs.readFileSync('src/lib/brief-draft.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const exports={};vm.runInNewContext(compiled,{exports});
const {saveBriefDraft,readBriefDraft,clearBriefDraft,summariseBriefDraft,BRIEF_DRAFT_KEY}=exports;
function storage(){const map=new Map();return{getItem:key=>map.get(key)??null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};}
test('reading a transferred brief repeatedly does not consume it',()=>{const s=storage();saveBriefDraft(s,'Property brief',100);assert.equal(readBriefDraft(s,200),'Property brief');assert.equal(readBriefDraft(s,300),'Property brief');});
test('latest edited brief survives another load and renews its expiry',()=>{const s=storage();saveBriefDraft(s,'Original',0);saveBriefDraft(s,'Edited',1000);assert.equal(readBriefDraft(s,1800000),'Edited');assert.equal(readBriefDraft(s,1801000),null);assert.equal(s.getItem(BRIEF_DRAFT_KEY),null);});
test('discard or successful-save cleanup removes the brief',()=>{const s=storage();saveBriefDraft(s,'Draft',0);clearBriefDraft(s);assert.equal(readBriefDraft(s,10),null);});
test('empty edited text remains empty, never restoring an older version',()=>{const s=storage();saveBriefDraft(s,'Old',0);saveBriefDraft(s,'',10);assert.equal(readBriefDraft(s,20),'');});
test('expired and invalid records are not hydrated',()=>{const s=storage();s.setItem(BRIEF_DRAFT_KEY,JSON.stringify({draft:'x',expires:5}));assert.equal(readBriefDraft(s,6),null);s.setItem(BRIEF_DRAFT_KEY,JSON.stringify({draft:5,expires:100}));assert.equal(readBriefDraft(s,6),null);s.setItem(BRIEF_DRAFT_KEY,'bad JSON');assert.equal(readBriefDraft(s,6),null);});
test('blocked storage leaves reads safe and lets the transfer caller handle failure',()=>{const s={getItem(){throw Error('Blocked');},setItem(){throw Error('Blocked');},removeItem(){throw Error('Blocked');}};assert.equal(readBriefDraft(s),null);assert.throws(()=>saveBriefDraft(s,'x'),/Blocked/);});

test('homepage handoff summarises priorities and preserves punctuation inside amounts',()=>{
 const draft=['Asset: Property.','Objective: Acquire an asset.','Property purpose: Residence.','Country or location: Malta.','Purchase budget: EUR 1.25m.','Timing: Within 3 months.','Property type and essential features: Villa.'].join('\n');
 const summary=summariseBriefDraft(draft);
 assert.equal(Object.fromEntries(summary.map(({label,value})=>[label,value])).Budget,'EUR 1.25m');
 assert.equal(summary.length,6);
});
test('valuation handoff summarises structured fields without pulling in free-text asset notes',()=>{
 const draft=['Indicative valuation enquiry — Yachts','Country / locality: Malta','Purpose: Potential sale','Indicative budget or asset value: EUR 1,200,500.5','Starting point: illustrative estimator inputs. Confirm any sample figures against the asset.','Asset details: 32 m motor yacht','Timing: A reference buried in the notes'].join('\n');
 const summary=Object.fromEntries(summariseBriefDraft(draft).map(({label,value})=>[label,value]));
 assert.deepEqual(summary,{Asset:'Yachts',Location:'Malta',Purpose:'Potential sale','Indicative amount':'EUR 1,200,500.5',Basis:'Illustrative estimator example'});
 assert.equal(summariseBriefDraft('A plain legacy draft').length,0);
});
