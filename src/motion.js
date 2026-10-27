export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const easeOut=x=>1-(1-clamp(x))**3;
export function spring(t,k=170,d=26){if(t<=0)return 0;const w=Math.sqrt(k),z=d/(2*w);if(z<1){const wd=w*Math.sqrt(1-z*z);return 1-Math.exp(-z*w*t)*(Math.cos(wd*t)+z*w/wd*Math.sin(wd*t));}if(Math.abs(z-1)<1e-6)return 1-Math.exp(-w*t)*(1+w*t);const a=-w*(z-Math.sqrt(z*z-1)),b=-w*(z+Math.sqrt(z*z-1));return 1-(b*Math.exp(a*t)-a*Math.exp(b*t))/(b-a)}
export function track(t,keys,k=170,d=26){let v=keys[0][1];for(let i=1;i<keys.length;i++)v+=(keys[i][1]-keys[i-1][1])*spring(t-keys[i][0],k,d);return v}
export function seeded(seed){let a=seed>>>0;return()=>{a=(a+0x6d2b79f5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
