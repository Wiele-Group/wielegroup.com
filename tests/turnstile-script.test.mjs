import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(fs.readFileSync('src/lib/turnstile-script.ts','utf8'), {
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},
}).outputText;
function setup() {
 const scripts=[]; const timers=new Map(); let nextTimer=0;
 const window={}; const exports={};
 const document={
  querySelector:()=>scripts.find(s=>!s.removed) ?? null,
  createElement:()=>{
   const listeners=new Map();
   return {removed:false,addEventListener:(name,fn)=>{if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name).add(fn);},removeEventListener:(name,fn)=>listeners.get(name)?.delete(fn),remove(){this.removed=true;},emit(name){for(const fn of [...(listeners.get(name)??[])])fn();}};
  },
  head:{appendChild:s=>scripts.push(s)},
 };
 vm.runInNewContext(compiled,{exports,window,document,setTimeout:fn=>{timers.set(++nextTimer,fn);return nextTimer;},clearTimeout:id=>timers.delete(id)});
 return {load:exports.loadTurnstileScript,scripts,window,timers};
}
test('concurrent callers share one request and resolve after the API initialises', async()=>{
 const s=setup(); const a=s.load(),b=s.load(); assert.equal(a,b);assert.equal(s.scripts.length,1);
 s.window.turnstile={};s.scripts[0].emit('load');await Promise.all([a,b]);assert.equal(s.timers.size,0);
 await s.load();assert.equal(s.scripts.length,1);
});
test('a failed script is removed and retry issues a fresh request', async()=>{
 const s=setup();const first=s.load();const failure=assert.rejects(first,/could not load/);s.scripts[0].emit('error');await failure;assert.equal(s.scripts[0].removed,true);
 const retry=s.load();assert.equal(s.scripts.length,2);s.window.turnstile={};s.scripts[1].emit('load');await retry;assert.equal(s.timers.size,0);
});
test('a stalled load times out and can recover on retry', async()=>{
 const s=setup();const first=s.load();const failure=assert.rejects(first,/too long/);[...s.timers.values()][0]();await failure;
 const retry=s.load();assert.equal(s.scripts.length,2);s.window.turnstile={};s.scripts[1].emit('load');await retry;
});
test('a load event without the API fails and allows recovery', async()=>{
 const s=setup();const first=s.load();const failure=assert.rejects(first,/did not initialise/);s.scripts[0].emit('load');await failure;
 const retry=s.load();s.window.turnstile={};s.scripts[1].emit('load');await retry;
});
test('an existing loading script is reused without duplicate insertion', async()=>{
 const s=setup();const first=s.load(); // Another consumer's in-flight tag remains after this module is reloaded.
 const secondExports={};vm.runInNewContext(compiled,{exports:secondExports,window:s.window,document:{querySelector:()=>s.scripts[0]},setTimeout:()=>1,clearTimeout:()=>{}});
 const second=secondExports.loadTurnstileScript();assert.equal(s.scripts.length,1);s.window.turnstile={};s.scripts[0].emit('load');await Promise.all([first,second]);assert.equal(s.timers.size,0);
});
