from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from html import escape
from fontTools.varLib.instancer import instantiateVariableFont
p=Path(__file__).resolve().parent.parent
serif=TTFont(p/'assets-source/property-identity/InstrumentSerif-Regular.ttf')
sans=None
for f in (p/'.next/static/media').glob('*.woff2'):
 font=TTFont(f)
 names=' '.join(str(n.toUnicode()) for n in font['name'].names if n.nameID in [1,2])
 if 'Geist' in names and 'Mono' not in names and all(ord(c) in font.getBestCmap() for c in 'PROPERTY'):
  sans=font;break
if sans is None: raise RuntimeError('Build website once to obtain the licensed website sans font')
sans=instantiateVariableFont(sans, {'wght':350}) if 'fvar' in sans else sans
def letters(text,font,size,x,y,tracking=0):
 gs=font.getGlyphSet(); cmap=font.getBestCmap(); scale=size/font['head'].unitsPerEm; paths=[]
 for c in text:
  g=gs[cmap[ord(c)]];pen=SVGPathPen(gs);g.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));paths.append('<path d="'+pen.getCommands()+'"/>');x+=g.width*scale+tracking
 return ''.join(paths)
def svg(body,width,height,label):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(label)}"><title>{escape(label)}</title>{body}</svg>'
# Original tapered W with a widely spaced contemporary uppercase wordmark.
mark='<path d="M8 20H20L44 86L65 31L61 20H75L99 86L122 20H128L101 101H91L69 43L47 101H37Z"/>'
main=letters('WIELE',sans,64,168,86,7)+letters('PROPERTY',sans,11,171,116,4.8)
out=p/'public/property-identity/premium'
out.mkdir(parents=True,exist_ok=True)
for name,color in [('forest','#17332e'),('ivory','#f8f5ef'),('black','#242b27'),('champagne','#c6ad86')]:
 (out/f'wiele-property-primary-{name}.svg').write_text(svg(f'<g fill="{color}">{mark}{main}</g>',440,150,'Wiele Property'))
 (out/f'wiele-property-mark-{name}.svg').write_text(svg(f'<g fill="{color}">{mark}</g>',138,112,'Wiele Property geometric W'))
 (out/f'wiele-property-icon-{name}.svg').write_text(svg(f'<g fill="{color}">{mark}</g>',138,112,'Wiele Property W'))
(out/'wiele-property-signature.svg').write_text(svg(f'<g fill="#c6ad86">{mark}</g><g fill="#f8f5ef">{main}</g>',440,150,'Wiele Property'))
(out/'favicon.svg').write_text(svg('<rect width="144" height="144" rx="25" fill="#17332e"/>'+f'<g fill="#f8f5ef" transform="translate(7 20) scale(.94)">{mark}</g>',144,144,'Wiele Property'))
board='<rect width="1400" height="960" fill="#f8f5ef"/><text x="70" y="70" font-family="Arial" font-size="12" letter-spacing="3" fill="#52674e">WIELE PROPERTY / THE PREMIUM IDENTITY</text>'
board+=f'<g transform="translate(235 190) scale(2.1)" fill="#17332e">{mark}{main}</g>'
board+='<line x1="70" y1="570" x2="1330" y2="570" stroke="#c9d1c2"/><rect x="70" y="625" width="620" height="245" fill="#17332e"/>'
board+=f'<g transform="translate(125 671) scale(1.15)" fill="#c6ad86">{mark}{main}</g>'
board+=f'<g transform="translate(820 676) scale(1.3)" fill="#242b27">{mark}</g>'
board+=f'<g transform="translate(1120 706) scale(.65)" fill="#17332e">{mark}</g>'
board+='<text x="70" y="925" font-family="Arial" font-size="12" fill="#52674e">GEOMETRIC W · SPACED UPPERCASE WORDMARK · ONE COLOUR · REVERSED · COMPACT MARK</text>'
(p/'assets-source/property-identity/identity-preview.svg').write_text(svg(board,1400,960,'Wiele Property premium logo identity'))
print('Premium vector identity masters generated with outlined letters')
