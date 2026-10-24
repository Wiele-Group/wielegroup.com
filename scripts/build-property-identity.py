"""Approved Option 2: outlined editorial wordmark and optical small W."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from html import escape
p=Path(__file__).resolve().parent.parent
serif=TTFont(p/'assets-source/property-identity/InstrumentSerif-Regular.ttf')
sans=TTFont(p/'.next/static/media/caa3a2e1cccd8315-s.p.09~u27dqhyhd6.woff2')
sans=instantiateVariableFont(sans,{'wght':400})
def width(text,font,size,tracking=0):
 gs=font.getGlyphSet();cm=font.getBestCmap();return sum(gs[cm[ord(c)]].width for c in text)*size/font['head'].unitsPerEm+(len(text)-1)*tracking
def letters(text,font,size,x,y,tracking=0):
 gs=font.getGlyphSet();cm=font.getBestCmap();scale=size/font['head'].unitsPerEm;s=''
 for c in text:
  g=gs[cm[ord(c)]];pen=SVGPathPen(gs);g.draw(TransformPen(pen,(scale,0,0,-scale,x,y)));s+='<path d="'+pen.getCommands()+'"/>';x+=g.width*scale+tracking
 return s
def centred(text,font,size,cx,y,tracking=0):return letters(text,font,size,cx-width(text,font,size,tracking)/2,y,tracking)
def svg(body,w,h,label):return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{escape(label)}"><title>{escape(label)}</title>{body}</svg>'
main=centred('WIELE',serif,124,180,103,5)+centred('PROPERTY',sans,12,180,137,5)
mark=centred('W',serif,115,64,111)
out=p/'public/property-identity/editorial';out.mkdir(exist_ok=True)
for name,color in [('forest','#17332e'),('ivory','#f8f5ef'),('champagne','#c6ad86'),('black','#242b27')]:
 (out/f'wiele-property-primary-{name}.svg').write_text(svg(f'<g fill="{color}">{main}</g>',360,148,'Wiele Property'))
 (out/f'wiele-property-mark-{name}.svg').write_text(svg(f'<g fill="{color}">{mark}</g>',128,128,'Wiele Property W'))
# Optical reinforcement for small icons; not a production printing specification.
small=centred('W',serif,105,64,104)
(out/'favicon.svg').write_text(svg('<rect width="128" height="128" rx="20" fill="#17332e"/>'+f'<g fill="#f8f5ef" stroke="#f8f5ef" stroke-width="1.5" stroke-linejoin="round">{small}</g>',128,128,'Wiele Property'))
board='<rect width="1400" height="950" fill="#f8f5ef"/><text x="65" y="65" font-family="Arial" font-size="12" letter-spacing="3" fill="#6b6658">WIELE PROPERTY / APPROVED EDITORIAL IDENTITY</text>'
board+=f'<g transform="translate(300 130) scale(2.2)" fill="#17332e">{main}</g>'
board+='<rect x="65" y="590" width="790" height="270" fill="#17332e"/>'
board+=f'<g transform="translate(225 626) scale(1.3)" fill="#c6ad86">{main}</g>'
board+=f'<g transform="translate(1040 640)" fill="#17332e">{mark}</g>'
board+='<text x="65" y="915" font-family="Arial" font-size="11" letter-spacing="1" fill="#6b6658">SERIF WORDMARK / OUTLINED SVG / FOREST, IVORY, CHAMPAGNE, CHARCOAL / COMPACT W</text>'
(p/'assets-source/property-identity/identity-preview.svg').write_text(svg(board,1400,950,'Wiele Property selected editorial logo'))
