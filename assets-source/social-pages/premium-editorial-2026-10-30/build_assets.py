from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image,ImageOps,ImageFont,ImageDraw
import base64
R=Path(__file__).parent
REPO=Path('/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com')
OUT=REPO/'public/property-identity/premium-platform';OUT.mkdir(exist_ok=True)
F=Path('/Users/jonathanlandman/Documents/Wiele Properties/Reports/2026-10-29/editorial-assets')
NAME=TTFont('/System/Library/Fonts/Supplemental/Didot.ttc',fontNumber=0);ITALIC=TTFont('/System/Library/Fonts/Supplemental/Didot.ttc',fontNumber=1);SUP=TTFont(F/'Manrope-400.ttf')
def width(font,s,size,track=0):
 cm=font.getBestCmap();return sum(font['hmtx'][cm[ord(c)]][0] for c in s)*size/font['head'].unitsPerEm+(len(s)-1)*track
def text(font,s,size,x,y,colour,track=0):
 cm=font.getBestCmap();gs=font.getGlyphSet();scale=size/font['head'].unitsPerEm;out=[]
 for c in s:
  g=cm[ord(c)];p=SVGPathPen(gs);gs[g].draw(p)
  if p.getCommands():out.append(f'<path fill="{colour}" d="{p.getCommands()}" transform="translate({x:.4f} {y}) scale({scale:.6f} {-scale:.6f})"/>')
  x+=font['hmtx'][g][0]*scale+track
 return ''.join(out)
ring=base64.b64encode((REPO/'public/property-identity/ring/wiele-gold-ring-transparent.png').read_bytes()).decode()
gold='#c7a56a';centre=228
body=f'<image href="data:image/png;base64,{ring}" x="4" y="12" width="94" height="94"/>'
sz=(216-4*4)/width(NAME,'WIELE',1);body+=text(NAME,'WIELE',sz,120,66,gold,4)
s='PROPERTIES · MALTA';sz=11;tr=2.1;body+=text(SUP,s,sz,centre-width(SUP,s,sz,tr)/2,87,gold,tr)
s='Malta Property. Global Ambition.';sz=15.2;body+=text(ITALIC,s,sz,centre-width(ITALIC,s,sz)/2,113,gold)
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 126" role="img" aria-labelledby="title"><title id="title">Wiele Properties Malta — Malta Property. Global Ambition.</title><desc>Responsive small-format adaptation of approved Option 1: unchanged original ring and same outlined Didot/Manrope lettering, with larger supporting type for readable digital display. Hybrid SVG.</desc>{body}</svg>'
(OUT/'wiele-option1-digital.svg').write_text(svg);(R/'wiele-option1-digital.svg').write_text(svg)
print(R)
import subprocess
subprocess.run(['node','-e',"const sharp=require('sharp');const p='public/property-identity/premium-platform/wiele-option1-digital';sharp(p+'.svg').resize(2160,756).png().toFile(p+'.png').catch(e=>{console.error(e);process.exit(1)});"],cwd=REPO,check=True)
# Social covers: preserve architectural light, and keep the signature readable after platform scaling.
logo=Image.open(OUT/'wiele-option1-digital.png').convert('RGBA')
photo=Image.open(REPO/'public/property/modern-malta-apartments-concept.webp').convert('RGB')
for name,w,h in [('facebook-premium-1702x630.jpg',1702,630),('linkedin-premium-4200x700.jpg',4200,700),('website-premium-share-1200x630.jpg',1200,630)]:
 im=Image.new('RGB',(w,h),'#171a19');pw=int(w*.45);im.paste(ImageOps.fit(photo,(pw,h),centering=(.62,.5)),(0,0));mark=logo.copy();mark.thumbnail((int((w-pw)*.93),int(h*.88)),Image.Resampling.LANCZOS);im.paste(mark,(pw+(w-pw-mark.width)//2,(h-mark.height)//2),mark)
 d=ImageDraw.Draw(im);sz=max(13,round(w/160));label='AI-created architectural concept · not a property offered for sale';f=ImageFont.truetype(str(F/'Manrope-400.ttf'),sz);box=d.textbbox((0,0),label,font=f);tw=box[2];x=round(w*.012);y=h-sz*3;d.rectangle((x-6,y-5,min(pw-8,x+tw+6),y+sz+10),fill='#171a19');d.text((x,y),label,font=f,fill='#f4f0e8');im.save(R/name,quality=94)
import shutil
shutil.copy(R/'website-premium-share-1200x630.jpg',REPO/'public/property/og-premium-editorial-20261030.jpg')
# A paired editorial social template, kept as an upload-ready asset rather than a new post.
im=Image.new('RGB',(1080,1350),'#f4f0e8');im.paste(ImageOps.fit(photo,(1080,710),centering=(.62,.5)),(0,0));mark=Image.open(REPO/'public/property-identity/option-1/wiele-premium-stacked-ivory.png').convert('RGBA');mark.thumbnail((650,480));im.paste(mark,((1080-mark.width)//2,785),mark);ImageDraw.Draw(im).text((30,670),'AI-created architectural concept · not a property offered for sale',font=ImageFont.truetype(str(F/'Manrope-400.ttf'),17),fill='#f4f0e8');im.save(R/'instagram-editorial-1080x1350.jpg',quality=94)
