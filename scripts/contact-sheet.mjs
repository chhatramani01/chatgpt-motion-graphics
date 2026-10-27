// Exact-time storyboard/contact sheet. Usage:
// node scripts/contact-sheet.mjs scene.html out/contact.png duration [step=1] [width=640] [height=360]
import{chromium}from'playwright';
import{mkdtempSync,mkdirSync,rmSync}from'node:fs';
import{tmpdir}from'node:os';
import{join,resolve,dirname}from'node:path';
import{spawnSync}from'node:child_process';
import{pathToFileURL}from'node:url';
const [scene='examples/kinetic-typography/scene.html',out='output/contact.png',
 duration='8',step='1',width='640',height='360']=process.argv.slice(2);
const D=Number(duration),T=Number(step),W=Number(width),H=Number(height);
if(![D,T,W,H].every(x=>Number.isFinite(x)&&x>0))throw Error('Invalid duration, step, width or height');
const tmp=mkdtempSync(join(tmpdir(),'motion-sheet-'));
mkdirSync(dirname(resolve(out)),{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 const cx=await browser.newContext({viewport:{width:W,height:H},deviceScaleFactor:1});
 await cx.addInitScript(()=>{window.__MOTION_RENDER_MODE__=true;window.requestAnimationFrame=()=>0;});
 const page=await cx.newPage();await page.goto(pathToFileURL(resolve(scene)).href);
 await page.evaluate(()=>document.fonts.ready);
 const canvas=page.locator('canvas').first();let n=0;
 for(let t=0;t<D;t+=T){
  await page.evaluate(t=>{const f=window.renderAt??window.seek;if(typeof f!=='function')throw Error('Missing renderAt(t)');f(t)},t);
  await canvas.screenshot({path:join(tmp,'frame-'+String(n++).padStart(3,'0')+'.png')});
 }
 const cols=Math.min(n,5),rows=Math.ceil(n/cols);
 const ff=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-framerate','1',
  '-i',join(tmp,'frame-%03d.png'),'-vf',`scale=${W}:${H},tile=${cols}x${rows}:nb_frames=${n}`,
  '-frames:v','1',resolve(out)],{stdio:'inherit'});
 if(ff.status!==0)throw Error('FFmpeg contact sheet creation failed');
 console.log('Contact sheet:',resolve(out),'frames:',n);
}finally{await browser.close();rmSync(tmp,{recursive:true,force:true});}
