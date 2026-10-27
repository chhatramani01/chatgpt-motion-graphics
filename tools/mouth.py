#!/usr/bin/env python3
"""Generate normalized ~30fps mouth-open audio-energy envelope. NOT phoneme accurate."""
import sys,json,math,struct,subprocess,pathlib
def envelope(path,fps=30,sr=16000):
 raw=subprocess.run(['ffmpeg','-v','error','-i',str(path),'-ac','1','-ar',str(sr),'-f','s16le','-'],capture_output=True,check=True).stdout
 size=round(sr/fps);values=[];count=len(raw)//2
 for start in range(0,count,size):
  end=min(count,start+size)
  samples=struct.unpack_from('<'+str(end-start)+'h',raw,start*2)
  values.append(math.sqrt(sum(x*x for x in samples)/len(samples))/32768.)
 if not values:raise ValueError('No audio decoded')
 level=sorted(values)[min(len(values)-1,int(len(values)*.95))]
 return {'fps':fps,'duration':round(count/sr,4),'samples':[round(max(0,min(1,x/max(level,.0001))),3) for x in values],'method':'RMS approximate mouth opening; not phoneme alignment'}
if __name__=='__main__':
 if len(sys.argv)!=3:raise SystemExit('Usage: mouth.py audio.mp3 mouth.json')
 data=envelope(sys.argv[1]);p=pathlib.Path(sys.argv[2]);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(data)+'\n')
 print(f'Wrote {len(data["samples"])} mouth samples',file=sys.stderr)
