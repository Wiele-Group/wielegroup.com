import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import ts from 'typescript';
import * as zod from 'zod';
const source=fs.readFileSync('src/app/api/enquiry/route.ts','utf8');
const onboardingSource=fs.readFileSync('src/lib/property-onboarding.ts','utf8');
const onboardingCompiled=ts.transpileModule(onboardingSource,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const onboardingExports={};
vm.runInNewContext(onboardingCompiled,{exports:onboardingExports,require:(name)=>{if(name==='zod')return zod;throw new Error(name);}});
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const valid={name:'Website QA',email:'qa@example.invalid',phone:'',interest:'general',message:'Synthetic test of the enquiry workflow.',website:'',token:'synthetic-test-token'};
function setup({storageFails=false,verification=true,notificationFails=false,configured=true}={}){
 const records=[];const calls=[];
 const env=configured?{AUDIT_QUEUE:{async put(key,value,opts){if(storageFails)throw new Error('unavailable');records.push({key,value:JSON.parse(value),opts});}},TURNSTILE_SECRET_KEY:'synthetic-secret',RESEND_API_KEY:'synthetic-secret'}:{};
 const exports={};
 vm.runInNewContext(compiled,{exports,require:(name)=>{if(name==='next/server')return{NextResponse:{json:(data,opts)=>new Response(JSON.stringify(data),{...opts,headers:{'Content-Type':'application/json',...opts.headers}})}};if(name==='@opennextjs/cloudflare')return{getCloudflareContext:()=>({env})};if(name==='zod')return zod;if(name==='@/lib/property-onboarding')return onboardingExports;throw new Error('Unexpected import '+name);},Request,Response,URL,URLSearchParams,AbortSignal,crypto:webcrypto,console:{error:()=>{}},fetch:async(url,opts)=>{calls.push({url,opts});return url.includes('siteverify')?new Response(JSON.stringify({success:verification,hostname:'wielegroup.com'}),{status:200}):new Response(JSON.stringify(notificationFails?{error:'unavailable'}:{id:'synthetic-id'}),{status:notificationFails?503:200});}});
 const post=(body=valid,origin='https://wielegroup.com',contentType='application/json')=>exports.POST(new Request('https://wielegroup.com/api/enquiry',{method:'POST',headers:{Origin:origin,'Content-Type':contentType},body:JSON.stringify(body)}));
 return{post,records,calls};
}
test('rejects cross-origin submissions without writing or sending',async()=>{const s=setup();assert.equal((await s.post(valid,'https://unrelated.invalid')).status,403);assert.equal(s.calls.length,0);assert.equal(s.records.length,0);});
test('validates user fields before verification',async()=>{const s=setup();assert.equal((await s.post({...valid,email:'not-an-email'})).status,400);assert.equal(s.calls.length,0);});
test('rejects unsupported content type',async()=>{const s=setup();assert.equal((await s.post(valid,'https://wielegroup.com','text/plain')).status,415);});
test('rejects excessive payloads',async()=>{const s=setup();assert.equal((await s.post({...valid,message:'x'.repeat(11000)})).status,413);});
test('fails closed when runtime bindings are absent',async()=>{const s=setup({configured:false});assert.equal((await s.post()).status,503);assert.equal(s.records.length,0);});
test('failed verification cannot create an enquiry',async()=>{const s=setup({verification:false});assert.equal((await s.post()).status,403);assert.equal(s.records.length,0);assert.equal(s.calls.length,1);});
test('storage failure never returns a false success or sends notification',async()=>{const s=setup({storageFails:true});assert.equal((await s.post()).status,503);assert.equal(s.calls.length,1);});
test('enquiry remains successful and durable if notification fails',async()=>{const s=setup({notificationFails:true});const r=await s.post();assert.equal(r.status,202);assert.ok((await r.json()).ticketId);assert.equal(s.records.length,1);assert.equal(s.records[0].opts.expirationTtl,7776000);assert.equal(s.records[0].value.submission.email,valid.email);assert.equal(s.records[0].value.submission.token,undefined);});
test('notification goes only to the existing Wiele inbox',async()=>{const s=setup();const r=await s.post();assert.equal(r.status,202);const sent=JSON.parse(s.calls[1].opts.body);assert.deepEqual(sent.to,['admin@wielegroup.com']);assert.equal(sent.reply_to,valid.email);assert.equal(s.records.length,1);});
test('honeypot is discarded without storing or emailing',async()=>{const s=setup();assert.equal((await s.post({...valid,website:'https://spam.invalid'})).status,202);assert.equal(s.records.length,0);assert.equal(s.calls.length,0);});

test('investor and consortium enquiries retain their routing after durable storage',async()=>{for(const interest of ['buying','consortium']){const s=setup();assert.equal((await s.post({...valid,interest})).status,202);assert.equal(s.records[0].value.submission.interest,interest);assert.equal(JSON.parse(s.calls[1].opts.body).subject,`Property enquiry · ${interest}`);}});

// Maintenance is a distinct enquiry type throughout storage and notification.
test('maintenance enquiries are retained and notified with their own classification',async()=>{const s=setup();const r=await s.post({...valid,interest:'maintenance',message:'Swieqi apartment: adjust two cupboard doors and renew shower sealant.'});assert.equal(r.status,202);assert.equal(s.records[0].value.submission.interest,'maintenance');assert.match(s.records[0].value.submission.message,/Swieqi/);const sent=JSON.parse(s.calls[1].opts.body);assert.equal(sent.subject,'Property enquiry · maintenance');assert.match(sent.text,/Interest: maintenance/);assert.deepEqual(sent.to,['admin@wielegroup.com']);});

const investorOnboarding={kind:'investor',acknowledgement:true,details:{structure:'Individual',use:'Long-term residential letting',budget:'€300,000–€500,000',funding:'Own funds and borrowing',timing:'3–6 months',eligibility:'Not yet reviewed',locality:'Swieqi',residenceCountry:'Malta'}};
const sellerOnboarding={kind:'seller',acknowledgement:true,details:{authority:'Joint owner',propertyType:'Apartment / penthouse / maisonette',tenure:'Freehold',occupancy:'Tenanted',epc:'EPC commissioned',planning:'Documents being gathered',timing:'6–12 months',locality:'Mosta'}};
test('investor and seller briefs persist all validated details and route notifications',async()=>{for(const onboarding of [investorOnboarding,sellerOnboarding]){const s=setup();const interest=onboarding.kind==='investor'?'buying':'marketing';const response=await s.post({...valid,interest,onboarding});assert.equal(response.status,202);assert.deepEqual(JSON.parse(JSON.stringify(s.records[0].value.submission.onboarding)),onboarding);const mail=JSON.parse(s.calls[1].opts.body);assert.equal(mail.subject,`Property onboarding · ${onboarding.kind}`);assert.match(mail.text,/Malta \/ Gozo localities:/);assert.match(mail.text,/Process acknowledgement: accepted/);assert.deepEqual(mail.to,['admin@wielegroup.com']);}});
test('rejects incomplete, unknown and misrouted onboarding before any external call',async()=>{const invalid=[{interest:'buying',onboarding:{...investorOnboarding,details:{...investorOnboarding.details,structure:'Unrecognised'}}},{interest:'buying',onboarding:{...investorOnboarding,details:{...investorOnboarding.details,residenceCountry:''}}},{interest:'buying',onboarding:{...investorOnboarding,acknowledgement:false}},{interest:'marketing',onboarding:investorOnboarding},{interest:'buying',onboarding:sellerOnboarding},{interest:'marketing',onboarding:{...sellerOnboarding,details:{...sellerOnboarding.details,passport:'must not be collected'}}}];for(const fields of invalid){const s=setup();assert.equal((await s.post({...valid,...fields})).status,400);assert.equal(s.records.length,0);assert.equal(s.calls.length,0);}});
test('onboarding never reports success after storage failure and survives notification failure',async()=>{for(const kind of ['storage','notification']){const s=setup({storageFails:kind==='storage',notificationFails:kind==='notification'});const result=await s.post({...valid,interest:'buying',onboarding:investorOnboarding});assert.equal(result.status,kind==='storage'?503:202);assert.equal(s.records.length,kind==='storage'?0:1);}});
