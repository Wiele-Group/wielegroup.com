from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from html import escape
p=Path(__file__).resolve().parent.parent
serif=TTFont(p/'assets-source/property-identity/InstrumentSerif-Regular.ttf')
sans=None
for f in (p/'.next/static/media').glob('*.woff2'):
 font=TTFont(f)
 names=' '.join(str(n.toUnicode()) for n in font['name'].names if n.nameID in [1,2])
 if 'Geist' in names and 'Mono' not in names and all(ord(c) in font.getBestCmap() for c in 'PROPERTY'):
  sans=font;break
if sans is None: raise RuntimeError('Build website once to obtain the licensed website sans font')
def letters(text,font,size,x,y,tracking=0):
 gs=font.getGlyphSet(); cmap=font.getBestCmap(); scale=size/font['head'].unitsPerEm; paths=[]
 for c in text:
  g=gs[cmap[ord(c)]];pen=SVGPathPen(gs);g.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));paths.append('<path d="'+pen.getCommands()+'"/>');x+=g.width*scale+tracking
 return ''.join(paths)
def svg(body,width,height,label):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(label)}"><title>{escape(label)}</title>{body}</svg>'
# Doorway-inspired architectural portal and optically centred serif W.
portal='<path d="M10 108V47a38 38 0 0 1 76 0v61" fill="none" stroke="currentColor" stroke-width="4"/>'
w=letters('W',serif,70,25.215,88)
mark=portal+w
main=letters('WIELE',serif,67,117,73,6.3)+letters('PROPERTY',sans,14.5,120,103,4.2)
out=p/'public/property-identity'
for name,color in [('forest','#193f35'),('ivory','#f6f3ed'),('black','#18201b')]:
 (out/f'wiele-property-primary-{name}.svg').write_text(svg(f'<g color="{color}" fill="{color}">{mark}{main}</g>',370,120,'Wiele Property'))
 (out/f'wiele-property-mark-{name}.svg').write_text(svg(f'<g color="{color}" fill="{color}">{mark}</g>',96,120,'Wiele Property architectural monogram'))
 # The simplified small icon keeps the W legible at 16 pixels.
 small=letters('W',serif,75,23.5875,88)
 (out/f'wiele-property-icon-{name}.svg').write_text(svg(f'<g fill="{color}">{small}</g>',96,112,'Wiele Property W'))
(out/'favicon.svg').write_text(svg('<rect width="112" height="112" rx="20" fill="#193f35"/>'+f'<g fill="#f6f3ed">{letters("W",serif,80,29.96,87)}</g>',112,112,'Wiele Property'))
# Flat presentation sheet, not part of the public navigation.
board='<rect width="1400" height="960" fill="#f6f3ed"/><text x="70" y="70" font-family="Arial" font-size="12" letter-spacing="3" fill="#52674e">WIELE PROPERTY / THE ARCHWAY IDENTITY</text>'
board+=f'<g transform="translate(215 175) scale(2.6)" color="#193f35" fill="#193f35">{mark}{main}</g>'
board+='<line x1="70" y1="570" x2="1330" y2="570" stroke="#c9d1c2"/><rect x="70" y="625" width="590" height="245" fill="#193f35"/>'
board+=f'<g transform="translate(118 665) scale(1.22)" color="#f6f3ed" fill="#f6f3ed">{mark}{main}</g>'
board+=f'<g transform="translate(810 666) scale(1.3)" color="#18201b" fill="#18201b">{mark}</g>'
board+=f'<g transform="translate(1100 699) scale(.75)" fill="#193f35">{small}</g>'
board+='<text x="70" y="925" font-family="Arial" font-size="12" fill="#52674e">ARCHITECTURAL MONOGRAM · OUTLINED WORDMARK · ONE COLOUR · REVERSED · SMALL ICON</text>'
(p/'assets-source/property-identity/identity-preview.svg').write_text(svg(board,1400,960,'Wiele Property new logo identity'))
print('Vector identity masters generated: outlined paths, no external font dependencies')
