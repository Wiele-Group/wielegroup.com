from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from html import escape
root=Path(__file__).resolve().parents[2]
out=Path(__file__).resolve().parent
font=TTFont(root/'.next/static/media/caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2')
light=instantiateVariableFont(font,{'wght':350})
medium=instantiateVariableFont(font,{'wght':450})
serif=TTFont(root/'assets-source/property-identity/InstrumentSerif-Regular.ttf')
def width(text,font,size,tracking=0):
 gs=font.getGlyphSet();c=font.getBestCmap();return sum(gs[c[ord(ch)]].width for ch in text)*size/font['head'].unitsPerEm+max(0,len(text)-1)*tracking

def letters(text,font,size,x,y,tracking=0):
 gs=font.getGlyphSet();cm=font.getBestCmap();scale=size/font['head'].unitsPerEm;result=''
 for ch in text:
  g=gs[cm[ord(ch)]];pen=SVGPathPen(gs);g.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));result+='<path d="'+pen.getCommands()+'"/>';x+=g.width*scale+tracking
 return result

def centred(text,font,size,cx,y,tracking=0):return letters(text,font,size,cx-width(text,font,size,tracking)/2,y,tracking)
def svg(body,w,h,title):return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{escape(title)}"><title>{escape(title)}</title>{body}</svg>'
def label(text,x,y,size=12,color='#6e7062',tracking=2):return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" letter-spacing="{tracking}" fill="{color}">{escape(text)}</text>'
# Route 1: tapered diagonal ribbons; an intentional open joint in the centre.
sculpt='<path d="M7 12H25L51 89L76 19L73 12H91L118 89L148 12H156L122 116H107L82 43L57 116H43Z"/>'
# Route 2: wordmark first, with the single serif W reserved for compact applications.
editorial=letters('W',serif,130,3,111)
# Route 3: two offset open corner forms create an abstract plan / private threshold.
frame='<path d="M28 4H112V88H94V22H28Z"/><path d="M4 28H22V94H88V112H4Z"/>'
routes=[('01','sculpt','SCULPT','A sculpted monogram',sculpt,164,128),('02','editorial','EDITORIAL','A fashion-led wordmark',editorial,122,128),('03','atelier','ATELIER','An architectural signature',frame,116,116)]
board='<rect width="1800" height="1180" fill="#f8f5ef"/>'+label('WIELE PROPERTY / THREE PREMIUM DIRECTIONS',55,55,13)+label('CONCEPT STUDY · 24 OCTOBER 2026',55,85,10)
for i,(n,slug,name,desc,mark,mw,mh) in enumerate(routes):
 x=i*600
 if i:board+=f'<path d="M{x} 135V1115" stroke="#ded7ca"/>'
 board+=label(n+' / '+name,x+45,160,14,'#17332e')+label(desc,x+45,190,12,'#6e7062',0)
 if slug=='sculpt':
  lock=f'<g transform="translate(218 0)">{mark}</g>'+centred('WIELE',light,70,300,228,10)+centred('PROPERTY',light,13,300,265,5)
  horizontal=f'<g transform="translate(0 12) scale(.7)">{mark}</g>'+letters('WIELE',light,58,148,82,7)+letters('PROPERTY',light,10,151,112,4)
 elif slug=='editorial':
  lock=centred('WIELE',serif,118,300,163,5)+centred('PROPERTY',light,13,300,218,5)
  horizontal=centred('WIELE',serif,105,270,88,4)+centred('PROPERTY',light,11,270,126,5)
 else:
  lock=f'<g transform="translate(242 0)">{mark}</g>'+centred('wiele',medium,85,300,225,1.5)+centred('PROPERTY',light,12,300,262,4.5)
  horizontal=f'<g transform="translate(0 5) scale(.85)">{mark}</g>'+letters('wiele',medium,71,135,78,1)+letters('PROPERTY',light,10,140,108,3.8)
 board+=f'<g fill="#17332e" transform="translate({x} 285)">{lock}</g>'
 board+=f'<rect x="{x+32}" y="685" width="536" height="220" fill="#17332e"/>'
 board+=f'<g fill="#c6ad86" transform="translate({x+65} 741) scale(.88)">{horizontal}</g>'
 board+=label('COMPACT MARK / 16 · 24 · 32 PX',x+45,970,10)
 for j,size in enumerate([16,24,32]):board+=f'<g fill="#17332e" transform="translate({x+50+j*75} 997) scale({size/mw})">{mark}</g>'
 board+=label('FOREST / IVORY / CHAMPAGNE',x+45,1100,10)
 for variant,color in [('forest','#17332e'),('ivory','#f8f5ef'),('champagne','#c6ad86'),('black','#242b27')]:
  (out/f'{slug}-primary-{variant}.svg').write_text(svg(f'<g fill="{color}">{lock}</g>',600,300,'Wiele Property '+name+' concept'))
  (out/f'{slug}-horizontal-{variant}.svg').write_text(svg(f'<g fill="{color}">{horizontal}</g>',540,140,'Wiele Property '+name+' horizontal concept'))
  (out/f'{slug}-mark-{variant}.svg').write_text(svg(f'<g fill="{color}">{mark}</g>',mw,mh,'Wiele Property '+name+' compact mark'))
 # Individual flat board at same dimensions and palette, no realistic mock-up effects.
 individual='<rect width="1200" height="1040" fill="#f8f5ef"/>'+label(n+' / '+name,65,65,16,'#17332e')+label(desc,65,98,14,'#6e7062',0)
 individual+=f'<g transform="translate(150 180) scale(1.5)" fill="#17332e">{lock}</g>'
 individual+='<rect x="65" y="690" width="1070" height="260" fill="#17332e"/>'
 individual+=f'<g transform="translate(260 739) scale(1.25)" fill="#c6ad86">{horizontal}</g>'
 individual+=label('WIELE PROPERTY / ORIGINAL VECTOR CONCEPT / NOT A FINAL APPROVED IDENTITY',65,1005,10)
 (out/f'{slug}-preview.svg').write_text(svg(individual,1200,1040,'Wiele Property option '+n+' '+name))
board+=label('ORIGINAL VECTOR CONCEPTS · FLAT COLOUR · NO MOCK-UP EFFECTS · FOR DIRECTION SELECTION',55,1150,10)
(out/'three-directions.svg').write_text(svg(board,1800,1180,'Three premium Wiele Property logo options'))
print('Three distinct vector concept routes created')
