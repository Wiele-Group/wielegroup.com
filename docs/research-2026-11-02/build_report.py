from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph,Table,TableStyle
from reportlab.lib.styles import ParagraphStyle
import json, shutil, io

ROOT=Path(__file__).parent
REPO=Path(__file__).resolve().parents[2]
ASSETS=Path('/Users/jonathanlandman/Documents/Wiele Properties/Reports/2026-10-29/editorial-assets')
OUT=ROOT/'Wiele-Properties-Malta-Investment-Report-Editorial-2026.pdf'
for name,file in [('Display','CormorantGaramond-400.ttf'),('DisplayMedium','CormorantGaramond-500.ttf'),('Text','Manrope-400.ttf'),('TextBold','Manrope-600.ttf'),('Slogan','CormorantGaramond-Italic-500.ttf')]:pdfmetrics.registerFont(TTFont(name,str(ASSETS/file)))
pdfmetrics.registerFontFamily('Text',normal='Text',bold='TextBold')
INK=colors.HexColor('#171a19');PAPER=colors.HexColor('#f4f0e8');WHITE=colors.HexColor('#fffdfa');GOLD=colors.HexColor('#b99661');PALE=colors.HexColor('#dfc89e');MUTED=colors.HexColor('#5e655f');RULE=colors.HexColor('#d6cdbd');BROWN=colors.HexColor('#75603e')
W,H=595.28,841.89;M=44;CW=W-2*M;G=24;COL=(CW-G)/2
ring=ImageReader(REPO/'public/property-identity/gold-circle/wiele-gold-circle-transparent.png')
ring_reverse=ImageReader(REPO/'public/property-identity/gold-circle/wiele-gold-circle-transparent.png')
brand=ImageReader(REPO/'public/property-identity/option-1/wiele-premium-stacked-charcoal.png')
sloganlight=ImageReader(REPO/'public/property-identity/option-1/slogan-ivory.png')
slogandark=ImageReader(REPO/'public/property-identity/option-1/slogan-charcoal.png')
wordgold=ImageReader(REPO/'public/property-identity/launch/wiele-wordmark-gold.webp')
worddark=ImageReader(REPO/'public/property-identity/launch/wiele-wordmark-charcoal.webp')
style=ParagraphStyle('body',fontName='Text',fontSize=10.2,leading=15.5,textColor=INK)
c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
c.setTitle('Wiele Properties | Malta Investment Property Report | 2025 Review / 2026 Outlook');c.setAuthor('Wiele Properties');c.setSubject('Malta investment real estate: evidence, outlook and acquisition opportunities')
md=['# Wiele Properties | Malta Investment Property Report','\nMalta Property. Global Ambition. | 2025 review / 2026 outlook | 2 November 2026\n'];ledger=[];page_no=0
def text(t,x,y,size=10,font='Text',colour=INK):
 c.setFillColor(colour);c.setFont(font,size);c.drawString(x,y,t)
def para(t,x,y,w=CW,size=10.2,leading=15.5,colour=INK,bold=False,record=True,bottom=60):
 s=ParagraphStyle('b',parent=style,fontName='TextBold' if bold else 'Text',fontSize=size,leading=leading,textColor=colour)
 p=Paragraph(escape(t).replace('\n','<br/>'),s);_,height=p.wrap(w,H)
 if y-height<bottom: raise ValueError(f'Page {page_no}: paragraph overflow at {y-height}: {t[:65]}')
 p.drawOn(c,x,y-height)
 if record:md.append(t+'\n')
 return y-height-12
def sub(t,x,y,w=COL,colour=BROWN):
 return para(t,x,y,w,size=12.5,leading=17,colour=colour,bold=True)
def line(x,y,w=CW,colour=RULE):c.setStrokeColor(colour);c.setLineWidth(.55);c.line(x,y,x+w,y)
def photo(name,x,y,w,h):
 im=Image.open(REPO/'public/property'/name).convert('RGB');iw,ih=im.size;scale=max(w/iw,h/ih);dw,dh=iw*scale,ih*scale
 encoded=io.BytesIO();im.save(encoded,format='JPEG',quality=88,optimize=True);encoded.seek(0)
 c.saveState();p=c.beginPath();p.rect(x,y,w,h);c.clipPath(p,stroke=0);c.drawImage(ImageReader(encoded),x+(w-dw)/2,y+(h-dh)/2,dw,dh,mask='auto');c.restoreState()
def page(section,dark=False):
 global page_no
 if page_no:c.showPage()
 page_no+=1;c.setFillColor(INK if dark else PAPER);c.rect(0,0,W,H,fill=1,stroke=0)
 if page_no==1:return
 fg=PALE if dark else MUTED
 text('WIELE PROPERTIES / '+section.upper(),M,H-33,7.3,colour=fg)
 c.drawImage(ring_reverse if dark else ring,W-M-22,H-47,width=22,height=22,mask='auto')
 line(M,H-57,colour=GOLD if dark else RULE)
 line(M,43,colour=GOLD if dark else RULE)
 c.drawImage(slogandark if dark else sloganlight,M,24,width=185,height=185*Image.open(REPO/'public/property-identity/option-1/slogan-charcoal.png').height/Image.open(REPO/'public/property-identity/option-1/slogan-charcoal.png').width,mask='auto')
 c.setFillColor(fg);c.setFont('Text',7.3);c.drawRightString(W-M,28,f'{page_no:02d} / 16')
 c.linkURL('https://wielegroup.com/malta-investment-report',(M,20,280,40),relative=0,thickness=0)
 ledger.append({'page':page_no,'section':section})
 md.append('\n## '+section+'\n')
def title(t,deck='',dark=False,size=43):
 y=H-100
 for line_ in t.split('\n'):text(line_,M,y,size,'Display',PAPER if dark else INK);y-=size*.98
 y-=13
 if deck:y=para(deck,M,y,CW,size=11.1,leading=16.4,colour=PALE if dark else MUTED)
 return y-12
def table(headers,rows,x,y,widths,small=9.0):
 ss=ParagraphStyle('cell',parent=style,fontSize=small,leading=13)
 hs=ParagraphStyle('head',parent=ss,fontName='TextBold',textColor=WHITE,fontSize=8.2,leading=11)
 data=[[Paragraph(escape(v),hs) for v in headers]]+[[Paragraph(escape(str(v)),ss) for v in row] for row in rows]
 t=Table(data,colWidths=widths,hAlign='LEFT');t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),INK),('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,PAPER]),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,0),.8,GOLD)]));_,height=t.wrap(CW,H)
 if y-height<61:raise ValueError(f'Page {page_no}: table overflow')
 t.drawOn(c,x,y-height);md.extend(['| '+' | '.join(headers)+' |','| '+' | '.join(['---']*len(headers))+' |']+['| '+' | '.join(map(str,row))+' |' for row in rows]+[''])
 return y-height-15
def bigstat(value,label,period,x,y,w=COL,dark=False):
 text(value,x,y,43,'Display',PALE if dark else INK)
 para(label,x,y-14,w,size=10,leading=14,colour=PAPER if dark else INK,bold=True)
 para(period,x,y-54,w,size=8,leading=11,colour=PALE if dark else MUTED)
def link(label,url,x,y,size=10,colour=BROWN):
 text(label,x,y,size,'TextBold',colour);width=pdfmetrics.stringWidth(label,'TextBold',size);c.linkURL(url,(x,y-4,x+width,y+size+3),relative=0,thickness=0);md.append(f'[{label}]({url})\n')

# 01 / Cover: one location photograph and a single dominant cover story.
page('Cover');photo('modern-malta-apartments-concept.webp',0,355,W,H-355)
c.setFillColor(INK);c.rect(0,0,W,355,fill=1,stroke=0)
c.setFillColor(INK);c.rect(0,H-200,W,200,fill=1,stroke=0)
c.drawImage(brand,(W-245)/2,H-190,width=245,height=245*520/700,mask='auto')
text('THE WIELE REPORT / UPDATED 2 NOVEMBER 2026',M,322,8.2,'TextBold',PALE)
text('Malta. A market',M,267,47,'Display',PAPER);text('in motion.',M,220,47,'Display',PAPER)
para('Malta Investment Property Report\n2025 review / 2026 outlook',M,180,CW,size=13,leading=20,colour=PALE)
line(M,116,colour=GOLD)
para('The growth. The opportunity. The cost of getting in.\nAn evidence-led Wiele perspective for your next property decision.',M,99,CW,size=10.2,leading=16,colour=PAPER)
c.setFillColor(INK);c.rect(0,355,W,20,fill=1,stroke=0)
text('AI-created modern Malta architectural concept. Not an actual property or listing.',M,362,6.5,colour=PAPER)
md += ['# Malta. A market in motion.','Malta Investment Property Report. 2025 review / 2026 outlook.','Cover: AI-created modern Malta architectural concept. Not an actual property or listing.']

# 02 / Editorial opener and contents.
page('The Wiele view');y=title('Growth is visible.\nValue needs work.','An investment market is more than a rising price index. The useful question is what an individual asset can support after costs, risk and the reality of ownership.')
left=y;right=y
left=sub('Our perspective',M,left)
left=para('Malta enters this review with positive house-price growth, a larger population and expanding tourism. Alongside that demand sits a substantial pipeline of approved dwellings. The combination calls for selection, rather than a blanket view that every property will perform alike. [1,4-7]',M,left,COL)
left=para('At Wiele Properties, the starting point is the asset, the income and the detail. Wiele Properties is your point of contact in Swieqi, Malta, for property marketing and introductions. A first apartment and a wider portfolio deserve the same clarity of evidence.',M,left,COL)
left=para('This report brings those questions together. It separates measured results from published forecasts, and both from our own interpretation and hypothetical investment tests. There is no promised yield, assumed stock availability or claim of a verified sales track record.',M,left,COL)
left=sub('How to read this edition',M,left-4)
left=para('The annual review covers January-December 2025 against 2024. Newer 2026 observations are dated separately. Research cut-off: 2 November 2026. Annual transactions use the retained October NSO workbook; the release page was rechecked. Fresh workbook download was blocked. Original published prices retain their stated vintage.',M,left,COL,size=9,leading=13.8)
right=sub('In this report',M+COL+G,right)
for pg,head in [('03','The year in numbers'),('04','Momentum and a counter-signal'),('05','Follow the income'),('06-07','A locality starts the search'),('08','Beyond the single apartment'),('09','The outlook'),('10','The cost of getting in'),('11-12','The return, under pressure'),('13','Read the detail'),('14','Your next chapter'),('15-16','Sources and image credits')]:
 line(M+COL+G,right-4,COL);text(pg,M+COL+G,right-24,9,'TextBold',BROWN);right=para(head,M+COL+G+42,right-11,COL-42,size=10.2,leading=15)-5

# 03 / Annual data dashboard.
page('2025 / The measured result');y=title('The year in numbers.','Malta property: annual-average price growth eased in 2025. Revised NSO totals show deed value growing faster than deed count.')
for i,(v,l,p_) in enumerate([('6.0%','House-price growth','Annual average, 2025 [1]'),('14.29%','Growth in deed value','October 2026 vintage [3]'),('41.41%','Growth in approvals','2025 new dwellings [6,21]')]):bigstat(v,l,p_,M+i*(CW/3),y-35,CW/3-15)
y-=141;line(M,y);y-=28
text('Annual-average house-price growth (%)',M,y,11,'TextBold');y-=23
for i,(label,value) in enumerate([('2023',6.2),('2024',6.7),('2025',6.0)]):
 yy=y-i*35;text(label,M,yy+2,9,colour=MUTED);c.setFillColor(GOLD if i==2 else colors.HexColor('#c9c3b5'));c.rect(M+55,yy-4,value*50,18,fill=1,stroke=0);text(f'{value:.1f}%',M+70+value*50,yy,10,'TextBold')
y-=111;y=table(['Revised annual totals [3]','2024','2025','Growth'],[['Final deeds','12,598','13,351','5.98%'],['Final-deed value','€3,530.5m','€4,034.9m','14.29%'],['Promises of sale','13,579','14,569','7.29%']],M,y,[224,85,105,93])
y=para('Value per deed rose from approximately €280,243 to €302,217 (+7.84%). The mix of property and the number of properties within a deed affect this ratio; it is not a quality-adjusted price index. [3; calculations]',M,y,CW,size=9.6,leading=14)
para('Revision note: annual totals replace the original January release. Calculated from monthly rows in the retained 9 October 2026 workbook; a fresh download was blocked on 2 November. September figures match the rechecked release. Deeds and promises are separate stages, not additive sales. [1-3,9]',M,y,CW,size=8,leading=11.5)

# 04 / Current momentum.
page('2026 / The market signal');y=title('Momentum, with\na counter-signal.','House prices continued to rise. A weaker September transaction reading adds a reason to look beyond the headline.')
vals=[5.9,5.6,6.0,6.3,6.8,6.9];labs=['Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26'];base=y-161
text('Residential prices: year-on-year growth (%) [2]',M,y,10,'TextBold')
for i,(v,l) in enumerate(zip(vals,labs)):
 x=M+15+i*83;c.setFillColor(GOLD if i>=4 else colors.HexColor('#c6c0b3'));c.rect(x,base,43,v*18,fill=1,stroke=0);text(str(v),x+9,base+v*18+8,10,'TextBold');text(l,x+1,base-18,8,colour=MUTED)
y=base-48;y=table(['Latest observations','Result','Reference'],[['Residential price growth','6.9% annual; 1.6% quarterly','Q2 2026 [8]'],['Apartments / maisonettes','7.4% / 4.3% annual','Q2 2026 [8]'],['Final deeds','974; down 11.5% annually','September 2026 [9]'],['Promises of sale','959; down 9.6% annually','September 2026 [9]']],M,y,[190,190,127])
a=sub('The Wiele reading',M,y);a=para('Price strength and softer transaction volumes can coexist. One month does not establish a downturn. Review several months of registrations, achieved rents and competing completions before changing the value assigned to a particular asset.',M,a,COL,size=10,leading=15)
b=sub('Keep the measures distinct',M+COL+G,y);para('Annual-average growth describes a whole year. Year-on-year quarterly growth compares the same quarter in successive years. Neither is an annual rental return. Q4 2025 was revised from 6.1% in the original NSO release to 6.3% in the latest quarterly series. [2,8]',M+COL+G,b,COL,size=9,leading=13.5)

# 05 / Demand / rent definitions.
page('Income / The demand story');y=title('Follow the income.','Population and tourism provide context. Collected rent establishes the property income.')
photo('modern-malta-interior-concept.webp',M,y-222,CW,222);text('AI-created architectural concept. Not an actual Malta property or listing.',M,y-234,7,colour=MUTED)
y-=265;a=sub('Demand is visible',M,y);a=para('Malta\'s resident population reached 588,254 at end-2025, up 2.4%. Net migration was 13,906. Inbound tourist trips rose 12.9% to 4,022,310, with nights up 11.0% to 25.4 million. These are demand indicators, not proof of occupancy or income for a particular home. [4,5]',M,a,COL)
a=para('Tourist spending reached €3,904.4 million, an 18.6% increase. It includes transport, food and other expenditure; it cannot be treated as accommodation revenue. [4]',M,a,COL)
b=sub('Rent is not one number',M+COL+G,y);b=para('The HICP actual-rent component rose 1.7% on an annual-average basis in 2025. The Central Bank\'s advertised-rent models showed 4.9%-5.3% annual growth in Q1 2026. Different periods, samples and definitions make a direct comparison misleading. [10,11]',M+COL+G,b,COL)
b=para('The Housing Authority received 48,385 new contract submissions in 2025. It links the roughly 13% fall partly to registration-rule changes. That administrative decline cannot be read as an equivalent fall in demand. [14]',M+COL+G,b,COL)
para('For an acquisition: reconcile signed leases, receipts, arrears and recurring costs. Keep collected, contracted and projected income separate.',M,103,CW,size=10,leading=15,bold=True)

# 06-07 / Search priorities, one repeatable but spacious locality feature.
areas=[
 ('Birkirkara / Santa Venera / Qormi','Everyday housing, tested against cost.','Investigate conventional long-let apartments where an efficient layout and practical access meet occupier needs. Test the all-in entry cost against genuinely comparable harbour assets.','Ask for achieved rents, owner-paid costs and competing completions. Birkirkara had 256 new dwelling approvals in Q2 2026. [7]'),
 ('Msida / Gżira / Pietà','Compact units. Specific streets.','Assess tenant demand linked to nearby work and education. A quiet street, ventilation and a usable layout can matter more to an occupier than a broad locality label.','Verify street-level rent comparables, damp and neighbouring works. Msida had 164 Q2 2026 dwelling approvals. [7]'),
 ("St Paul’s Bay",'Activity helps comparison. Income makes the case.','An active transaction market can help an investor find relevant comparisons. Acquire for documented income and a defensible entry price, rather than the activity headline alone.','September 2026 recorded 85 final deeds; Q2 approvals covered 258 dwellings. Neither figure proves liquidity for every unit. [7,9]'),
 ('Mosta / Naxxar / Marsaskala','Homes for longer tenancies.','Investigate demand for longer tenancies where parking, lift access and practical room sizes meet occupier needs. Test whether the specification supports the achieved rent.','Review comparable leases, service charges, competing supply and the affordability of a future buyer.'),
 ("Sliema / St Julian’s / eligible SDAs",'Read the premium. Check the route.','Consider access, occupier fit and acquisition eligibility alongside the entry premium. Higher headline rent does not automatically mean a higher net return.','Confirm the exact development’s SDA status, service charges and lawful income use. A locality name alone proves none of these. [15,16]'),
 ('Gozo / selective locations','Year-round evidence comes first.','Investigate residential or tourism assets with documented year-round demand. A proven operation needs its own income record, rather than an island-wide tourism assumption.','Review winter income, management and access costs, licences and local comparable rents. Day trips are not overnight demand.')]
for offset in [0,3]:
 page('Opportunity / Search priorities' if not offset else 'Opportunity / The individual asset',dark=bool(offset))
 y=title('A locality starts\nthe search.' if not offset else 'The asset makes\nthe difference.','Wiele research priorities, not a league table of achieved locality returns.' if not offset else 'A useful location is part of the proposition. The lease, condition and total cost determine the investment case.',dark=bool(offset))
 for i,(area,head,thesis,proof) in enumerate(areas[offset:offset+3]):
  fg=PAPER if offset else INK;mut=PALE if offset else MUTED
  line(M,y,colour=GOLD if offset else RULE);text(f'{offset+i+1:02d}',M,y-26,10,'TextBold',PALE if offset else BROWN)
  yy=para(area,M+42,y-13,CW-42,size=9.5,leading=14,colour=mut,bold=True)
  yy=para(head,M+42,yy+3,CW-42,size=17,leading=22,colour=fg,bold=False)
  a=para(thesis,M+42,yy,COL-20,size=9.6,leading=14.3,colour=fg)
  b=para(proof,M+COL+G,yy,COL,size=9,leading=13.5,colour=mut)
  y=min(a,b)-14
 para('No comparable official 2025 locality-level capital-growth or net-yield series was verified. These propositions require property-level evidence; no current Wiele stock or superior historical performance is implied.',M,107,CW,size=8,leading=11.5,colour=PALE if offset else MUTED)

# 08 / Asset structures.
page('Opportunity / Beyond the apartment');y=title('Beyond the\nsingle apartment.','Blocks, refurbishment and commercial property require a different set of questions.')
a=sub('Income-producing blocks',M,y);a=para('A block can diversify individual tenant turnover and simplify control of common areas. Underwrite each unit separately, including rent collection, lease expiry, arrears, deposits and deferred works. Assess the price against concentrated location exposure and the potential whole-block exit market.',M,a,COL)
a=sub('Refurbishment with a reason',M,a-4);a=para('Prioritise work that improves habitability, reduces maintenance or supports an evidenced rent increase. Ventilation, waterproofing, electrical safety and practical layouts deserve consideration before decorative upgrades. Unapproved subdivision and extra floors belong in a separate planning-risk case.',M,a,COL)
a=sub('Commercial: start with the lease',M,a-4);a=para('For retail, offices and warehouses, review tenant strength, permitted use, lease breaks, rent-free periods, fit-out ownership and re-letting costs. A single departure can remove all operating income. Residential growth is not a proxy for commercial performance.',M,a,COL)
x=M+COL+G;c.setFillColor(INK);c.rect(x,y-271,COL,271,fill=1,stroke=0)
text('A REFURBISHMENT EXAMPLE',x+18,y-29,8,'TextBold',PALE);text('7.2%',x+18,y-90,51,'Display',PAPER)
b=para('Gross incremental rent / works cost',x+18,y-109,COL-36,size=10,leading=15,colour=PALE)
b=para('€25,000 works that add an assumed €150 a month generate €1,800 annual gross incremental rent. Deduct vacancy, extra costs, tax and lost rent during works.',x+18,b,COL-36,size=9.5,leading=14.3,colour=PAPER)
para('Hypothetical screening calculation; not an observed Malta return or evidence that the rent increase is achievable.',x+18,b,COL-36,size=8,leading=11.5,colour=PALE)
b=sub('Tourism is an operation',x,y-299);b=para('Require monthly occupancy, room rates, platform statements and operating accounts. Verify current MTA requirements and the exact licence and permitted use before relying on tourist income. [18]',x,b,COL)
para('For consortiums, establish the lead contact, ownership, capital commitments and decision rules. Group ownership does not establish authorisation to promote a pooled investment product.',M,110,CW,size=9,leading=13.5)

# 09 / Current context and judgement.
page('Outlook / Reviewed 2 November 2026');y=title('A selective market.','Malta property investment: current evidence supports careful selection, with price growth and softer recent sales activity.')
y=table(['Indicator / observation period','Latest verified reading'],[['National residential prices / Q2 2026','+6.9% year on year [8]'],['Registered final deeds / September 2026','974; -11.5% year on year [9]'],['Malta HICP inflation / September 2026','2.4% year on year [12]'],['ECB deposit facility / current policy','2.50%; unchanged on 29 October [13]']],M,y,[285,222])
y=para('The ECB rate is a policy rate, not a Maltese mortgage quote. Borrower costs depend on the lender, product, reference rate, margin, term and fees. The 4.5% loan on page 12 remains a hypothetical assumption. [13]',M,y,CW,size=9.5,leading=14)
y=sub('The European context',M,y,CW);y=para('Savills estimates European investment at about €46bn in Q3 2026, down 6% annually; this is a preliminary nowcast published 1 October. Its coverage includes non-EU markets and commercial assets. These figures do not establish a yield or price for Maltese apartments. [22]',M,y,CW,size=9.5,leading=14)
y=sub('The Wiele interpretation',M,y,CW);y=para('Prioritise evidenced rent, the full acquisition cost and a liquidity reserve. One weaker month does not prove a downturn. Continued credit and tourism demand could support activity; persistent weaker registrations, arrears or nearby competing completions would weaken an individual income case. [9,12; interpretation]',M,y,CW,size=9.5,leading=14)
y=table(['Hypothetical one-year tests','Capital value','Rent'],[['No-growth case','0%','0%'],['Softer market','-5%','-5%'],['Stronger market','+5%','+3%']],M,y,[285,111,111],small=8.5)
para('Scenario inputs, not forecasts, probabilities or loss limits. Also test vacancy, works overruns and a 2 percentage-point borrowing-rate increase. Current locality yields and borrower quotations remain property-specific evidence gaps.',M,y,CW,size=8.5,leading=12)

# 10 / Entry costs and eligibility.
page('Acquisition / Entry costs');y=title('The cost of\ngetting in.','A €300,000 asking price is not a €300,000 investment. The denominator changes once duty, fees and works are included.')
y=table(['Illustrative debt-free purchase','Cash requirement'],[['Purchase price','€300,000'],['Stamp duty: standard 5% assumption [17]','€15,000'],['Notary, searches and technical/legal review','€7,500 allowance'],['Initial works / furnishing','€15,000 allowance'],['Total acquisition cost + works','€337,500'],['Separate liquidity reserve','€10,000'],['Total cash committed','€347,500']],M,y,[355,152])
a=sub('Check the acquisition route',M,y);a=para('MTCA states that property acquired under an Acquisition of Immovable Property (AIP) permit cannot be rented out. Citizenship, residence history, the buyer entity and the intended use must be assessed for the actual transaction. [15]',M,a,COL,size=9.4,leading=14)
a=para('Special Designated Areas (SDAs) have an acquisition exception described by MTCA. It does not prove that every development qualifies or that every income use is permitted. Entities require separate assessment. [16]',M,a,COL,size=9.4,leading=14)
b=sub('Keep tax assumptions visible',M+COL+G,y);b=para('Provisional duty of 1% is part of the total duty, not an extra 1%. MTCA’s example applies 5% final duty, with market value or transfer value, whichever is higher, relevant to the tax base. Relief requires confirmation. [17]',M+COL+G,b,COL,size=9.4,leading=14)
b=para('Do not add 18% VAT automatically to the price or rent. Treatment depends on the transaction and activity. Allowances here are assumed final cash costs, including unrecoverable taxes; obtain written quotations. [20]',M+COL+G,b,COL,size=9.4,leading=14)

# 11 / Yield anatomy.
page('Returns / The headline and the reality');y=title('6% is the beginning.','The same hypothetical apartment produces very different figures once the income basis, costs and denominator are made explicit.')
for i,(v,l,p_) in enumerate([('6.00%','Gross scheduled yield','€18,000 rent / €300,000 price'),('4.18%','Net operating yield','€14,100 NOI / €337,500 cost'),('0.65%','Pre-tax cash-on-cash','€1,094 cash / €167,500 equity')]):bigstat(v,l,p_,M+i*(CW/3),y-37,CW/3-15)
y-=149;y=para('These are different return measures, not successive deductions from one percentage. All figures are hypothetical annual examples; rent is assumed at €1,500 a month, not evidenced for a current listing.',M,y,CW,size=9.4,leading=14)
y=table(['Annual operating item','Base case','Rental downside'],[['Scheduled rent','€18,000','€16,200 (-10%)'],['Vacancy / collection loss','€900 (5%)','€1,620 (10%)'],['Effective operating income','€17,100','€14,580'],['Owner operating costs','€3,000','€3,600 (+20%)'],['Net operating income (NOI)','€14,100','€10,980'],['NOI / €337,500 acquisition cost + works','4.18%','3.25%'],['Separate recurring capital reserve','€1,000','€1,000'],['Cash before finance and income tax','€13,100','€9,980']],M,y,[285,111,111])
para('NOI is before financing, income tax and capital expenditure. Operating costs assume management, insurance, maintenance and owner-paid common costs. Vacancy is deducted once; the capital reserve is treated separately. Financing assumptions follow on page 12.',M,y,CW,size=8.5,leading=12.5)

# 12 / Debt and tax stress test.
page('Returns / Under pressure',dark=True);y=title('The return,\nunder pressure.','Borrowing can leave little room between operating income and repayments.',dark=True)
bigstat('€1,094','Base annual cash flow','After debt service and reserve; before tax',M,y-38,COL,True);bigstat('-€2,026','Rental-downside cash flow','Same loan; lower income and higher costs',M+COL+G,y-38,COL,True)
y-=161
y=para('Assume a €180,000 repayment loan: 60% of the purchase price, 25 years and a hypothetical 4.5% annual rate. Annual repayments are approximately €12,006. The base debt-service coverage ratio is 1.17 times: €14,100 NOI divided by €12,006 repayments.',M,y,CW,colour=PAPER)
y=para('Cash equity committed is €167,500: €120,000 price equity, €37,500 costs and works, and a €10,000 liquidity reserve. The resulting pre-tax cash-on-cash is about 0.65%. No lender offer or current market interest rate is implied.',M,y,CW,colour=PAPER)
line(M,y-2,colour=GOLD);y-=28
y=sub('At a 6.5% borrowing rate',M,y,CW,PALE);y=para('Annual repayments rise to approximately €14,584. With the base operating income and €1,000 capital reserve, cash flow falls to about -€1,484 before income tax. The rate is an illustrative stress input.',M,y,CW,colour=PAPER)
y=sub('Tax can consume the remaining cash',M,y,CW,PALE);y=para('MTCA describes an optional 15% final tax on qualifying gross rental income. If the investor qualifies and elects it, 15% of the base received rent of €17,100 is €2,565. That turns the financed base cash flow into approximately -€1,471, before any other investor taxes. It is not a complete after-tax return. [19]',M,y,CW,colour=PAPER)
para('The practical consequence: assess the property’s cash resilience, not just the gross yield. Financing fees, additional works and investor-specific taxes require their own budget.',M,104,CW,size=10,leading=15,colour=PALE,bold=True)

# 13 / Due diligence and exit.
page('Acquisition / Read the detail');y=title('Buy the asset.\nRead the detail.','Public statistics can frame the market. They cannot establish a particular property’s ownership, condition, lawful use or income.')
y=table(['Before an unconditional commitment','Evidence to obtain'],[['Income and tenants','Signed leases, receipts, deposits, arrears and expiry/break dates; separate collected and projected income.'],['Title and rights','Notarial searches, burdens, ground rent, access, airspace, parking and transfer/use rights.'],['Planning and condition','Independent architect review of approved plans, permitted use, structure, damp, waterproofing and services.'],['Building obligations','Condominium accounts, arrears, insurance, lift liabilities and near-term major works.'],['Finance and eligibility','Actual lender terms; acquisition route and intended income use; investor-specific tax assessment. [15-17]'],['Exit','Comparable sales, likely buyer pool, sale costs, applicable transfer tax and an extended holding period.']],M,y,[183,324],small=9.1)
y=sub('Price growth is not realised profit',M,y,CW);y=para('A €300,000 property rising 5% reaches €315,000 before selling costs. That remains below the €337,500 acquisition-and-works outlay in our example, unless the works add separate value. Positive market growth can coexist with a capital loss on exit.',M,y,CW)
para('Deduct outstanding debt, applicable transfer taxes, sale costs, required works and holding-period cash losses from the proposed exit proceeds. Use the owner’s actual tax basis and holding history.',M,y,CW,size=9.5,leading=14.5)

# 14 / Brand close and conversion.
page('Wiele Properties / Your next chapter');y=title('Your next chapter.\nInformed by the detail.','From a first apartment to a wider portfolio, the right starting point is a clear investment brief.')
photo('modern-malta-apartments-concept.webp',M,y-216,CW,216);text('AI-created architectural concept. Not an actual Malta property or listing.',M,y-228,7,colour=MUTED)
y-=260;a=sub('Tell us what matters to you',M,y);a=para('Preferred property type and locations. Purchase-budget range. Income objectives. Holding period and timing. If buying as a consortium, identify the lead contact, purchasing structure and decision process.',M,a,COL)
a=para('Wiele Properties provides property marketing and introductions. Transaction documentation is handled by appropriately licensed practitioners. No availability, allocation or return is implied by an enquiry. Letting, tenancy administration and fund management are not offered.',M,a,COL,size=9,leading=13.5)
b=sub('Contact Wiele Properties',M+COL+G,y);b=para('Share your brief. Clarify the information available. Agree a suitable next step. Income-led acquisitions and premium residences start with your objectives. By appointment in Swieqi; English and Afrikaans.',M+COL+G,b,COL)
link('admin@wielegroup.com','mailto:admin@wielegroup.com',M+COL+G,b-5,10)
link('Follow Wiele Properties on LinkedIn','https://www.linkedin.com/company/wiele-properties/',M+COL+G,b-37,8.5)
line(M,121,colour=GOLD);c.drawImage(sloganlight,M,81,width=360,height=360*Image.open(REPO/'public/property-identity/option-1/slogan-charcoal.png').height/Image.open(REPO/'public/property-identity/option-1/slogan-charcoal.png').width,mask='auto')

# 15-16 / Original evidence register and image/licence transparency.
old=json.loads((ROOT/'source-register.json').read_text())
for offset in [0,11]:
 page('Sources / '+('01-11' if not offset else '12-22'));y=title('The evidence\nbehind the view.','Research reviewed 2 November 2026. Each source retains its observation period and publication vintage.',size=39)
 for num,head,desc,url in old[offset:offset+11]:
  y=para(f'[{num}] {head}',M,y,CW,size=9,leading=12.5,bold=True)
  y=para(desc,M,y+8,CW-55,size=7.8,leading=10.8)
  link('Open source',url,W-M-52,y+15,6.8)
 if offset:
  y-=3;y=sub('Photography, fonts and publication notes',M,y,CW)
  y=para('Images: AI-created modern Malta architectural concepts, generated with OpenAI ImageGen on 29 October 2026. They do not show actual properties, verified locations, completed Wiele projects or advertised stock.',M,y,CW,size=7.6,leading=10.5)
  y=para('Body fonts: Cormorant Garamond and Manrope, SIL Open Font License. Approved brand lettering uses Didot. Screen-first PDF with selectable body text and live links. Printer-specific bleed, colour profiles and PDF/X preparation are not included.',M,y,CW,size=7.6,leading=10.5)
  link('Image credits and licences','https://wielegroup.com/credits',M,y-2,7.5)
c.save()
(ROOT/'Wiele-Properties-Malta-Investment-Report-Editorial-2026.md').write_text('\n'.join(md))
(ROOT/'editorial-page-map.json').write_text(json.dumps(ledger,indent=2))
print(OUT);print('Pages',page_no)
