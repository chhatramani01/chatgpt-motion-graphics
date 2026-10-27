#!/usr/bin/env python3
"""Align an exact script to Whisper timed words; visibly flag estimates."""
import json,sys,re,difflib,pathlib
def norm(x):return re.sub(r'[^\w]+','',x.casefold())
def parse(src):
 if isinstance(src,list):segs=src
 else:segs=src.get('transcription') or src.get('segments') or src.get('words') or []
 output=[]
 for el in segs:
  if 'words' in el:output+=parse(el['words']);continue
  t=str(el.get('word',el.get('text',''))).strip()
  if not t:continue
  o=el.get('offsets') or {}
  a=float(o['from'])/1000 if 'from' in o else float(el.get('start',el.get('s',0)))
  b=float(o['to'])/1000 if 'to' in o else float(el.get('end',el.get('e',a)))
  tokens=t.split()
  for i,w in enumerate(tokens):output.append({'w':w,'s':a+(b-a)*i/len(tokens),'e':a+(b-a)*(i+1)/len(tokens),'measured':len(tokens)==1})
 return output
def align(script,obj):
 tokens=script.split();spoken=parse(obj)
 if not tokens or not spoken:raise ValueError('Need script and timed Whisper output')
 found=[None]*len(tokens)
 for block in difflib.SequenceMatcher(None,[norm(w) for w in tokens],[norm(x['w']) for x in spoken],autojunk=False).get_matching_blocks():
  for k in range(block.size):
   x=spoken[block.b+k];found[block.a+k]=(x['s'],x['e'],x['measured'])
 measured=sum(1 for x in found if x and x[2])
 i=0
 while i<len(tokens):
  if found[i]:i+=1;continue
  j=i
  while j<len(tokens) and found[j] is None:j+=1
  a=found[i-1][1] if i else 0.
  b=found[j][0] if j<len(tokens) else max(a+.2*(j-i),spoken[-1]['e'])
  b=max(a,b)
  for k in range(i,j):found[k]=(a+(b-a)*(k-i)/(j-i),a+(b-a)*(k-i+1)/(j-i),False)
  i=j
 return [{'w':w,'s':round(x[0],3),'e':round(max(x[0],x[1]),3),'estimated':not x[2]} for w,x in zip(tokens,found)],measured
if __name__=='__main__':
 if len(sys.argv)!=4:raise SystemExit('Usage: align.py transcript.txt whisper.json words.json')
 script=pathlib.Path(sys.argv[1]).read_text(encoding='utf8');src=json.loads(pathlib.Path(sys.argv[2]).read_text())
 words,n=align(script,src);p=pathlib.Path(sys.argv[3]);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(words,ensure_ascii=False,indent=2)+'\n')
 print(f'measured={n}, estimated={len(words)-n}, match_rate={n/len(words):.1%}',file=sys.stderr)
