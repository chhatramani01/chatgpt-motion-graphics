// Contact sheet: node scripts/contact-sheet.mjs scene.html contact.png duration step width height
import{chromium}from'playwright';
import{mkdtempSync,mkdirSync,rmSync}from'node:fs';
import{tmpdir}from'node:os';
import{join,resolve,dirname}from'node:path';
import{spawnSync}from'node:child_process';
import{pathToFileURL}from'node:url';
const [scene='examples/demo/scene.html',out='output/contact.png',duration='8',step='1',width='640',height='360']=process.argv.slice(2);
const D=Number(duration),T=Number(step),W=Number(width),H=Number(height);
if(![D,T,W,H].every(x=>Number.isFinite(x)&&x>0)||!Number.isInteger(W)||!Number.isInteger(H))throw Error('Invalid contact-sheet arguments');
const tmp=mkdtempSync(join(tmpdir(),'motion-'));
mkdirSync(dirname(resolve(out)),{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined});
try{
 const cx=await browser.newContext({viewport:{width:W,height:H}});
 await cx.addInitScript(()=>{window.__MOTION_RENDER_MODE__=true;window.requestAnimationFrame=()=>0});
 const page=await cx.newPage();await page.goto(pathToFileURL(resolve(scene)).href);
 await page.evaluate(async({W,H})=>{const c=document.querySelector('canvas');if(!c)throw Error('No canvas');c.width=W;c.height=H;c.style.width=W+'px';c.style.height=H+'px';c.style.maxWidth='none';c.style.maxHeight='none';await document.fonts.ready},{W,H});
 let n=0;
 for(let t=0;t<D;t+=T){
  await page.evaluate(t=>{const fn=window.renderAt||window.seek;if(typeof fn!=='function')throw Error('Missing renderAt');fn(t)},t);
  await page.locator('canvas').first().screenshot({path:join(tmp,'shot-'+String(n++).padStart(3,'0')+'.png')});
 }
 const cols=Math.min(n,4),rows=Math.ceil(n/cols);
 const ff=spawnSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-framerate','1','-i',join(tmp,'shot-%03d.png'),'-vf','tile='+cols+'x'+rows+':nb_frames='+n,'-frames:v','1',resolve(out)],{stdio:'inherit'});
 if(ff.status!==0)throw Error('Contact sheet ffmpeg failed');
 console.log('OK contact sheet',out,n+' frames');
}finally{await browser.close();rmSync(tmp,{recursive:true,force:true})}
