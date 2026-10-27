import unittest,sys,pathlib,math,struct,wave,tempfile
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parent.parent/'tools'))
from align import align
from mouth import envelope
class TestTools(unittest.TestCase):
 def test_measured_words(self):
  w,n=align('Hello Nepal',{'transcription':[{'text':'Hello','offsets':{'from':0,'to':300}},{'text':'Nepal','offsets':{'from':300,'to':600}}]})
  self.assertEqual(n,2);self.assertTrue(all(not z['estimated'] for z in w))
 def test_unmatched_flagged(self):
  w,n=align('hello beautiful world',{'words':[{'word':'hello','start':0,'end':.2},{'word':'world','start':.8,'end':1.}]})
  self.assertEqual(n,2);self.assertTrue(w[1]['estimated'])
 def test_phrase_segments_are_approximate(self):
  w,n=align('hello world',{'segments':[{'text':'hello world','start':0,'end':.8}]})
  self.assertEqual(n,0);self.assertTrue(all(z['estimated'] for z in w))
 def test_missing_audio_words(self):
  with self.assertRaises(ValueError):align('hello',{'words':[]})
 def test_mouth(self):
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'test.wav';sr=16000
   with wave.open(str(p),'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(sr)
    f.writeframes(b''.join(struct.pack('<h',int(math.sin(2*math.pi*440*i/sr)*10000)) for i in range(sr//4)))
   v=envelope(p);self.assertTrue(v['samples']);self.assertTrue(max(v['samples'])>.5)
