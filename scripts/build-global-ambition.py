from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import json
root=Path(__file__).resolve().parent.parent
out=root/'assets-source/social-pages/global-ambition-2026-10-29'
out.mkdir(parents=True,exist_ok=True)
def font(family,italic=False):
 for p in (root/'.next/static/media').glob('*.woff2'):
  f=TTFont(p)
  if f['name'].getDebugName(1).startswith(family) and ('Italic' in f['name'].getDebugName(2))==italic and all(ord(c) in f.getBestCmap() for c in 'Malta Property. Global Ambition.'):
   if 'fvar' in f:f=instantiateVariableFont(f,{'wght':400})
   return f
 raise RuntimeError('Required brand font not found')
serif=font('Cormorant Garamond');italic=font('Cormorant Garamond',True);sans=font('Manrope')
def line(text,f,size,cx,y,color,tracking=0):
 gs=f.getGlyphSet();cm=f.getBestCmap();scale=size/f['head'].unitsPerEm
 w=sum(gs[cm[ord(c)]].width for c in text)*scale+tracking*(len(text)-1);x=cx-w/2;paths=[]
 for c in text:
  g=gs[cm[ord(c)]];pen=SVGPathPen(gs);g.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));paths.append('<path d="'+pen.getCommands()+'"/>');x+=g.width*scale+tracking
 return f'<g fill="{color}">'+''.join(paths)+'</g>'
configs=[dict(name='facebook',width=1702,height=630,photo=620,cx=1120,logo=390,top=85,font=74,y1=335,y2=416,desc=495,web=540),dict(name='linkedin',width=4200,height=700,photo=1750,cx=2950,logo=630,top=60,font=114,y1=350,y2=465,desc=555,web=620),dict(name='share',width=1200,height=630,photo=0,cx=600,logo=440,top=82,font=85,y1=336,y2=425,desc=510,web=555)]
for c in configs:
 b=line('Malta Property.',serif,c['font'],c['cx'],c['y1'],'#f4f0e8')+line('Global Ambition.',italic,c['font'],c['cx'],c['y2'],'#dfc89e')
 b+=line('INVESTMENT REAL ESTATE',sans,c['font']*.19,c['cx'],c['desc'],'#f4f0e8',c['font']*.035)
 b+=line('wielegroup.com',sans,c['font']*.2,c['cx'],c['web'],'#dfc89e',c['font']*.012)
 if c['photo']:b+=line('Illustrative stock photograph · Not a property listing',sans,c['height']*.018,c['photo']/2,c['height']-20,'#f4f0e8')
 (out/(c['name']+'-type.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{c["width"]}" height="{c["height"]}" viewBox="0 0 {c["width"]} {c["height"]}">{b}</svg>')
(out/'layout.json').write_text(json.dumps(configs))
