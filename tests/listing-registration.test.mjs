import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import ts from 'typescript';
import * as zod from 'zod';
const valid={name:'Listing QA',email:'qa@example.invalid',updates:false,website:'',token:'synthetic-token',listing:'motor-yacht'};
function setup({storageFails=false,notificationFails=false,verification=true,hostname='wielegroup.com',configured=true}={}) {
 const records=[],calls=[],modules=new Map();
 const env=configured?{AUDIT_QUEUE:{async put(key,value,options){if(storageFails)throw Error('storage unavailable');records.push({key,value:JSON.parse(value),options});}},TURNSTILE_SECRET_KEY:'local-test-turnstile',REPORT_ACCESS_SECRET:'local-test-secret-listings-only-123456789',RESEND_API_KEY:'local-test-resend'}:{};
 function load(name,parent) {
  if(name==='zod')return zod;
  if(name==='@opennextjs/cloudflare')return{getCloudflareContext:()=>({env})};
  if(name==='server-only')return{};
  if(name.endsWith('.json')){const filename=name.startsWith('.')?path.resolve(path.dirname(parent),name):path.join(process.cwd(),name.replace('@/','src/'));return{__esModule:true,default:JSON.parse(fs.readFileSync(filename,'utf8'))};}
  const filename=name.startsWith('.')?path.resolve(path.dirname(parent),name+'.ts'):path.join(process.cwd(),name.replace('@/','src/')+'.ts');
  if(modules.has(filename))return modules.get(filename);
  const exports={};modules.set(filename,exports);
  const compiled=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(compiled,{exports,require:name=>load(name,filename),Request,Response,URL,URLSearchParams,AbortSignal,Buffer,TextEncoder,Date,crypto:webcrypto,console:{error(){}},fetch:async(url,options)=>{calls.push({url,options});return url.includes('siteverify')?Response.json({success:verification,hostname}):Response.json({},{status:notificationFails?503:200});}});
  return exports;
 }
 const register=load('@/app/api/listings/register/route');
 return{records,calls,env,access:load('@/server/listing-access'),articleAccess:load('@/server/article-access'),reportAccess:load('@/server/report-access'),post:(body=valid,origin='https://wielegroup.com',contentType='application/json')=>register.POST(new Request('https://wielegroup.com/api/listings/register',{method:'POST',headers:{origin,'Content-Type':contentType},body:JSON.stringify(body)}))};
}
test('retired sample registration neither collects details nor grants a cookie',async()=>{const ctx=setup();const r=await ctx.post();assert.equal(ctx.records.length,0);assert.equal(ctx.calls.length,0);assert.equal(r.status,410);assert.equal(r.headers.get('set-cookie'),null);});
test('listing HTML and RSC never read or write the shared Worker cache',async()=>{let reads=0,writes=0;const exports={};const compiled=ts.transpileModule(fs.readFileSync('cf-cache-wrapper.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(compiled,{exports,require:name=>name.includes('retired-agency')?{isRetiredAgencyPath:()=>false}:{__esModule:true,default:{fetch:async()=>new Response('protected-render',{headers:{'content-type':'text/html','x-nextjs-prerender':'1'}})}},Request,Response,URL,Headers,caches:{default:{match:async()=>{reads++;},put:async()=>{writes++;}}}});for(const suffix of ['', '?_rsc=test'])for(const cookie of ['', 'wiele_listing_access=synthetic']){const r=await exports.default.fetch(new Request('https://wielegroup.com/listing-examples/motor-yacht'+suffix,{headers:cookie?{cookie}:{}}),{},{waitUntil(){}});assert.equal(r.headers.get('x-edge-cache'),'BYPASS');assert.match(r.headers.get('cache-control'),/private, no-store/);assert.match(r.headers.get('cdn-cache-control'),/no-store/);assert.match(r.headers.get('vary'),/Cookie/);}assert.equal(reads,0);assert.equal(writes,0);});
