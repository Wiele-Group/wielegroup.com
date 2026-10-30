from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import shutil
R=Path(__file__).parent
A=R.parent
P=Path('/Users/jonathanlandman/Documents/Wiele Properties/Brand/2026-10-30-premium-didot')
REPO=Path('/Users/jonathanlandman/Documents/Claude/Projects/Wiele Group Operations/wielegroup.com')
OUT=REPO/'public/property-identity/option-1';OUT.mkdir(exist_ok=True)
F=Path('/Users/jonathanlandman/Documents/Wiele Properties/Reports/2026-10-29/editorial-assets')
for layout in ['stacked','horizontal']:
 for variant in ['charcoal','ivory']:
  for ext in ['png','svg']:
   src=P/f'wiele-premium-{layout}-{variant}.{ext}';shutil.copy(src,OUT/src.name);shutil.copy(src,R/src.name)
logo=Image.open(A/'Wiele-Properties-Approved-Logo.png').convert('RGBA')
photo=Image.open(REPO/'public/property/modern-malta-apartments-concept.webp').convert('RGB')
for name,w,h in [('facebook-cover-1702x630.jpg',1702,630),('linkedin-cover-4200x700.jpg',4200,700),('website-share-1200x630.jpg',1200,630),('instagram-square-1080.jpg',1080,1080),('instagram-story-1080x1920.jpg',1080,1920),('google-cover-1024x576.jpg',1024,576)]:
 im=Image.new('RGB',(w,h),'#171a19');pw=int(w*.44)
 if h>w:
  im.paste(ImageOps.fit(photo,(w,int(h*.48))),(0,int(h*.52)));brand=logo.copy();brand.thumbnail((int(w*.82),int(h*.43)),Image.Resampling.LANCZOS);im.paste(brand,((w-brand.width)//2,50),brand)
 elif w==h:
  brand=logo.copy();brand.thumbnail((int(w*.87),int(h*.75)),Image.Resampling.LANCZOS);im.paste(brand,((w-brand.width)//2,(h-brand.height)//2),brand)
 else:
  im.paste(ImageOps.fit(photo,(pw,h)),(0,0));brand=logo.copy();brand.thumbnail((int((w-pw)*.90),int(h*.92)),Image.Resampling.LANCZOS);im.paste(brand,(pw+(w-pw-brand.width)//2,(h-brand.height)//2),brand)
 if w!=h:
  ImageDraw.Draw(im).text((max(10,w//180),h-max(25,h//23)),'AI-created architectural concept · not a property offered for sale',font=ImageFont.truetype(str(F/'Manrope-400.ttf'),max(11,w//180)),fill='#f4f0e8')
 im.save(R/name,quality=94)
ring=Image.open(REPO/'public/property-identity/ring/wiele-gold-ring-transparent.png').convert('RGBA');avatar=Image.new('RGBA',(800,800),'#171a19');avatar.alpha_composite(ring.resize((620,620),Image.Resampling.LANCZOS),(90,90));avatar.convert('RGB').save(R/'social-avatar-800.png')
# Original circle is the approved small-format identity; its artwork is unchanged.
for size in [32,64,180,192,512]:shutil.copy(REPO/f'public/property-identity/gold-circle/icon-{size}.png',OUT/f'icon-{size}.png')
shutil.copy(REPO/'public/property-identity/ring/wiele-gold-ring-transparent.png',OUT/'wiele-original-ring.png')
# Use outlined Didot slogan pixels on PDF footers so font rendering matches the approved mark.
for variant in ['charcoal','ivory']:
 im=Image.open(P/f'wiele-premium-stacked-{variant}.png');im=im.crop((0,1290,2100,1470));im=im.crop(im.getbbox());im.save(OUT/f'slogan-{variant}.png')
shutil.copy(R/'website-share-1200x630.jpg',REPO/'public/property/og-option-1-20261030.jpg')
(R/'email-signature.html').write_text('''<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#171a19;padding:18px"><a href="https://wielegroup.com"><img src="https://wielegroup.com/property-identity/option-1/wiele-premium-horizontal-charcoal.png" width="320" alt="Wiele Properties Malta — Malta Property. Global Ambition." style="display:block;border:0"></a></td></tr><tr><td style="font:13px Arial,sans-serif;color:#171a19;padding-top:14px"><strong>Jonathan Landman</strong><br>Property marketing &amp; introductions · Swieqi, Malta<br><a href="mailto:admin@wielegroup.com">admin@wielegroup.com</a> · <a href="https://wa.me/35699320474">+356 9932 0474</a><br>By appointment · English &amp; Afrikaans<br><a href="https://wielegroup.com/malta-investment-report">Read the Wiele Malta Investment Property Report</a></td></tr></table>''')
print(R)
