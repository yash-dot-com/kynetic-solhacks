from pathlib import Path
import math, random, wave, array, shutil
p=Path('public/video/datasets'); p.mkdir(parents=True,exist_ok=True)
names=['Reflective surfaces','Low-light examples','Unusual angles','General examples','Warehouse aisles','Fine-grained labels','Task demonstrations']
colors=['#ff6b51','#45bf6c','#d5b42f','#9284e6','#4267df','#63cbdf','#4a9f91']
for i,(name,color) in enumerate(zip(names,colors)):
 shapes=''
 for j in range(10):
  x=85+(j%3)*180;y=250+(j//3)*110
  shapes+=f'<rect x="{x}" y="{y}" width="145" height="85" fill="{color}" opacity="{.16+(j%4)*.12}"/><path d="M{x+14} {y+62} L{x+50} {y+24} L{x+87} {y+54} L{x+128} {y+15}" fill="none" stroke="{color}" stroke-width="3"/>'
 title=name.split(' '); line1=' '.join(title[:-1]);line2=title[-1]
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900"><rect width="720" height="900" fill="#f7f6f4"/><rect x="0" width="720" height="12" fill="{color}"/><text x="55" y="65" font-family="Arial" font-size="21" fill="#777">TRAINING DATA / 0{i+1}</text>{shapes}<text x="55" y="120" font-family="Arial" font-weight="bold" font-size="43" fill="#111">{line1}</text><text x="55" y="172" font-family="Arial" font-weight="bold" font-size="43" fill="#111">{line2}</text><path d="M55 730H665" stroke="#d5d4d0"/><text x="55" y="790" font-family="Arial" font-size="42" fill="#111">{(i+1)*1250:,} examples</text><text x="55" y="842" font-family="Arial" font-size="24" fill="#777">Images · labels · task context</text></svg>'''
 (p/f'{i}.svg').write_text(svg)
Path('public/video/assets/sky.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><radialGradient id="s"><stop stop-color="#fff"/><stop offset=".5" stop-color="#d9f5fa"/><stop offset="1" stop-color="#a8e3f0"/></radialGradient><filter id="b"><feGaussianBlur stdDeviation="80"/></filter></defs><rect width="1920" height="1080" fill="url(#s)"/><g filter="url(#b)" fill="#fff" opacity=".65"><ellipse cx="340" cy="810" rx="510" ry="200"/><ellipse cx="1620" cy="240" rx="490" ry="180"/></g></svg>''')
shutil.copyfile('/var/folders/9s/bb9pm6155t19z14__987mnqh0000gn/T/codex-clipboard-6157c698-240f-451c-a6b8-1493ae0647d3.png','public/video/assets/data-texture.png')
# Original 120 BPM instrumental with tuned pulses, plucks, transition sweeps and UI clicks.
rate=44100;duration=58;out=array.array('h');random.seed(42)
chords=[(130.8128,164.8138,195.9977),(110,146.8324,184.9972),(123.4708,155.5635,184.9972),(98,130.8128,164.8138)]
trans=[4,7,10,13,17,21,26,30,41,48,53]
clicks=[18.6,19.8,22.3,24.2,28.8,33,34.8,36.6,38.4,42.4,43.1,43.8,49.2,49.8,50.4,51]
for n in range(rate*duration):
 t=n/rate;chord=chords[int(t/4)%4];phase=t%.5;env=min(1,t/.5,(duration-t)/1.2)
 v=sum(math.sin(2*math.pi*f*t)*.009 for f in chord)
 kick=math.sin(2*math.pi*(48+55*math.exp(-phase*45))*phase)*math.exp(-phase*32)*.055
 pluck=math.sin(2*math.pi*chord[int(t/.5)%3]*4*phase)*math.exp(-phase*16)*.023
 v+=kick+pluck
 for a in trans:
  d=t-a
  if -.25<d<.2:v+=(random.random()*2-1)*.035*math.exp(-((d+.02)/.12)**2)
 for a in clicks:
  d=t-a
  if 0<=d<.07:v+=math.sin(2*math.pi*1600*d)*math.exp(-d*100)*.055
 out.append(int(max(-.95,min(.95,v*env))*32767))
with wave.open('public/video/assets/score.wav','wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(out.tobytes())
print('Prepared 7 dataset images, local sky, texture, and original 58-second score.')

import subprocess
subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", "public/video/assets/score.wav", "-af", "loudnorm=I=-18:TP=-1.5:LRA=9", "-ar", "48000", "-y", "public/video/assets/score-master.wav"], check=True)
