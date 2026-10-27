// Deterministic Canvas/SVG renderer, fixed-time frame stepping.
// Usage: node scripts/render.mjs scene.html out.mp4 duration fps width height
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [scene='examples/kinetic-typography/scene.html', output='output/silent.mp4',
  duration='8', fps='30', width='1280', height='720'] = process.argv.slice(2);
const dur=Number(duration), rate=Number(fps), W=Number(width), H=Number(height);
if (![dur,rate,W,H].every(Number.isFinite) || dur<=0 || rate<=0 || W<=0 || H<=0)
  throw new Error('duration/fps/width/height must all be positive finite numbers');
mkdirSync(dirname(resolve(output)),{recursive:true});

const browser=await chromium.launch({headless:true});
try {
  const context=await browser.newContext({viewport:{width:Math.trunc(W),height:Math.trunc(H)},
    deviceScaleFactor:1});
  // Inject before page JS: prevent realtime RAF and expose a fixed, controlled time.
  await context.addInitScript(() => {
    let tick=0;
    Object.defineProperty(window,'__MOTION_RENDER_MODE__',{value:true});
    Object.defineProperty(window,'__MOTION_CLOCK__',{value:{set:t=>{tick=t*1000},get:()=>tick}});
    try { performance.now=()=>tick; } catch {}
    try { Date.now=()=>Math.round(tick); } catch {}
    window.requestAnimationFrame=()=>0;
    window.cancelAnimationFrame=()=>{};
  });
  const page=await context.newPage();
  await page.goto(pathToFileURL(resolve(scene)).href,{waitUntil:'load'});
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all(
    [...document.images].map(im=>im.decode?.().catch(()=>{})??Promise.resolve()));});
  const c=page.locator('canvas').first();
  if (!(await c.count())) throw new Error('scene.html needs a canvas element');
  const ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe',
    '-framerate',String(rate),'-i','-','-c:v','libx264','-crf','16','-pix_fmt','yuv420p',
    '-movflags','+faststart',resolve(output)],{stdio:['pipe','inherit','inherit']});
  const done=new Promise((resolve,reject)=>{
    ff.once('error',reject);ff.once('close',code=>code===0?resolve():reject(new Error('FFmpeg exited '+code)));
  });
  for(let i=0,total=Math.ceil(dur*rate);i<total;i++){
    const t=i/rate;
    await page.evaluate(t=>{
      window.__MOTION_CLOCK__?.set(t);
      const fn=window.renderAt??window.seek;
      if(typeof fn!=='function')throw new Error('scene must expose window.renderAt(t) or window.seek(t)');
      fn(t);
    },t);
    const png=await c.screenshot({type:'png',animations:'disabled'});
    if(!ff.stdin.write(png)) await new Promise(res=>ff.stdin.once('drain',res));
    if(i%rate===0)process.stdout.write('render '+Math.floor(t)+' / '+dur+' s\n');
  }
  ff.stdin.end();
  await done;
  console.log('Rendered silent video:',resolve(output));
} finally { await browser.close(); }
