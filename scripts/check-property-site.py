from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
import sys,time,json,re
from pathlib import Path
from xml.etree import ElementTree as ET
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3034'
ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15'
paths=['/','/luxury-assets','/luxury-assets/aircraft','/luxury-assets/yachts','/luxury-assets/exotic-cars','/luxury-assets/classic-cars','/research','/research/global-luxury-property-report-2026','/selling','/buying','/investor-onboarding','/seller-onboarding','/properties','/property-maintenance','/legal-compliance','/malta-investment-report','/articles','/articles/malta-short-let-investment-2026','/about','/contact','/privacy','/terms','/credits']
guide_data=Path(__file__).resolve().parent.parent/"src/data"
jurisdictions=json.loads((guide_data/"purchase-jurisdictions.json").read_text())
asset_guides=json.loads((guide_data/"purchase-assets.json").read_text())
assert len(jurisdictions)==35 and sum(j["group"]=="European Union" for j in jurisdictions)==27
paths += ["/purchase-guide"]+["/purchase-guide/"+j["slug"] for j in jurisdictions]+["/purchase-guide/assets/"+a["slug"] for a in asset_guides]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.assets=[];self.canonicals=[];self.h1s=0;self.meta={};self.title="";self.in_title=False;self.in_json=False;self.in_script=False;self.json_buffer="";self.schemas=[];self.visible=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='title':self.in_title=True
  if tag=='script':
   self.in_script=True
   if a.get('type')=='application/ld+json':self.in_json=True;self.json_buffer=''
  if tag=='h1':self.h1s+=1
  if tag=='a' and a.get('href','').startswith('/'):self.links.append(a['href'])
  if tag in ['img','script'] and a.get('src','').startswith('/'):self.assets.append(a['src'])
  if tag=='source':
   for candidate in a.get('srcset','').split(','):
    url=candidate.strip().split(' ')[0]
    if url.startswith('/'):self.assets.append(url)
  if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a.get('href'))
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_json:self.json_buffer+=data
  if not self.in_script:self.visible.append(data)
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script':
   if self.in_json:self.schemas.append(json.loads(self.json_buffer))
   self.in_json=False;self.in_script=False

def get(path):
 req=Request(urljoin(base,path),headers={'User-Agent':ua})
 try:
  with urlopen(req,timeout=30) as r:return r.status,r.headers,r.read()
 except HTTPError as e:return e.code,e.headers,e.read()
assets=set();links=set();titles=set();descriptions=set()
for path in paths:
 status,headers,data=get(path+'?_cb='+str(int(time.time())))
 text=data.decode();p=Page();p.feed(text)
 assert status==200,(path,status)
 assert p.h1s==1,(path,'heading count',p.h1s)
 assert len(p.canonicals)==1 and p.canonicals[0].rstrip('/')==('https://wielegroup.com'+('/' if path=='/' else path)).rstrip('/'),(path,p.canonicals)
 assert not re.search(r'wa\.me|tel:|linkedin\.com/in/',text,re.I),(path,'private direct contact remains')
 assert 'icloud.com' not in text and 'Passport:' not in text and 'RSA ID' not in text,(path,'private CV information')
 # Four-digit fragments can occur in generated hydration IDs; check the phone fragment only in rendered text.
 assert '9932' not in ' '.join(p.visible),(path,'personal phone fragment remains in visible text')
 assert 'mailto:admin@wielegroup.com' in text,(path,'admin contact missing')
 assert 'Wiele Investments' in text
 assert all(old not in text for old in ['Malta at heart','Investment in focus','From South African roots to Malta shores. Thinking globally.']),(path,'retired tagline')
 assert p.title and p.title not in titles,(path,'missing or duplicate title')
 titles.add(p.title)
 description=p.meta.get('description','')
 assert description and description not in descriptions,(path,'missing or duplicate description')
 descriptions.add(description)
 assert p.meta.get('og:title') and p.meta.get('og:description'),(path,'missing social copy')
 assert p.meta.get('og:url','').rstrip('/')==('https://wielegroup.com'+path).rstrip('/'),(path,'social URL')
 assert p.meta.get('og:image','').startswith('https://wielegroup.com/'),(path,'social image')
 assert p.meta.get('twitter:card')=='summary_large_image',(path,'social card')
 assert p.meta.get('og:description')==description and p.meta.get('twitter:description')==description,(path,'social description consistency')
 for key in ['og:image','twitter:image']:
  image=p.meta.get(key,'')
  assert image.startswith('https://wielegroup.com/'),(path,key,'absolute image URL')
  assets.add(urlparse(image).path)
 assert p.meta.get('og:image:alt'),(path,'missing social image description')
 assert 'noindex' not in p.meta.get('robots',''),(path,'unexpected noindex')
 entities=[]
 for schema in p.schemas:entities.extend(schema.get('@graph',[schema]))
 types=[e.get('@type') for e in entities]
 assert 'Organization' in types and 'WebSite' in types,(path,'missing business identity schema')
 org=next(e for e in entities if e.get('@type')=='Organization')
 assert org.get('slogan')=='South African roots. Global perspective.',(path,'organization slogan')
 assert set(['Wiele Group','WieleGroup','Wiele Property']).issubset(org['alternateName']),(path,'brand aliases')
 assert org['name']=='Wiele Investments' and org['address']['addressLocality']=='Swieqi',(path,'business identity')
 social_profiles={'https://www.facebook.com/wieleinvestments/','https://www.linkedin.com/company/wiele-investments/'}
 assert set(org['sameAs'])==social_profiles,(path,'official social profiles')
 assert all(f'href="{profile}"' in text for profile in social_profiles) and 'instagram.com' not in text.lower(),(path,'public social links')
 if path.startswith('/purchase-guide'):
  assert 'FAQPage' in types and 'Service' not in types and 'LegalService' not in types,(path,'purchase guide schema')
  assert '2026-11-15' in text,(path,'research date missing')
  if path!='/purchase-guide':assert 'Coverage' in text,(path,'coverage limits missing')
  else:assert '35 jurisdictions' in text,(path,'destination count missing')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,(path,'purchase FAQ mismatch')
  if path=='/purchase-guide':
   assert all('/purchase-guide/'+j['slug'] in text for j in jurisdictions),'destination menu incomplete'
 if path.startswith('/luxury-assets/'):
  assert 'FAQPage' in types and 'Product' not in types and 'Offer' not in types,(path,'guide schema')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,(path,'FAQ mismatch')
 if path=='/luxury-assets':
  assert all(f'id="{category}"' in text for category in ['aircraft','yachts','exotic-cars','classic-cars']), 'missing asset category'
  assert all(f'asset={category}' in text for category in ['aircraft','yachts','exotic-cars','classic-cars']), 'asset enquiry context missing'
  assert 'No aircraft, yachts or cars are currently advertised' in text, 'availability disclosure missing'
  assert 'Product' not in types and 'Offer' not in types, 'category imagery must not become advertised stock'
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('asset FAQ mismatch',item['name'])
 if path in ['/selling','/buying','/property-maintenance']:
  service=next(e for e in entities if e.get('@type')=='Service')
  assert service['provider']['@id']=='https://wielegroup.com/#organization',(path,'service identity')
  if path=='/property-maintenance':assert service['areaServed']['name']=='Malta',(path,'maintenance locality')
  else:assert 'areaServed' not in service,(path,'do not assert unverified worldwide service coverage')
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['mainEntity']['@id']==service['@id'],(path,'service page relationship')
 if path.startswith('/articles/'):
  assert 'Register &amp; read the article' in text and 'name="email"' in text, 'article registration missing'
  assert 'An operating short-let property and an apartment awaiting conversion' not in text, 'full article leaked before registration'
  assert '/api/articles/media/demand-growth' not in text, 'private chart leaked before registration'
  assert 'private' in headers.get('Cache-Control','') and 'no-store' in headers.get('Cache-Control',''), 'article shared caching allowed'
  article=next(e for e in entities if e.get('@type')=='Article')
  assert article['isAccessibleForFree'] is False and article['hasPart']['cssSelector']=='.registered-article-body', 'registration schema'
 if path=='/property-maintenance':
  assert 'Wiele Property Maintenance' in text and 'Wiele-managed' in text
  assert 'request-maintenance' in text and 'maintenance-services' in text
  assert 'Loading the maintenance enquiry form' in text or 'Property maintenance enquiry' in text
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('maintenance FAQ mismatch',item['name'])
 if path in ['/investor-onboarding','/seller-onboarding']:
  assert 'id="start-onboarding"' in text and 'id="prepare-documents"' in text
  assert 'onboarding enquiry' in text and 'name="acknowledgement"' in text
  assert 'type="file"' not in text
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('onboarding FAQ mismatch',item['name'])
 if path=='/legal-compliance':
  assert '2026-10-31' in text and 'General information for your purchase brief.' in text
  for anchor in ['eu-investors','non-eu-investors','third-country-nationals','corporate-investors','purchase-checks','compliance-questions']:
   assert f'id="{anchor}"' in text,('compliance anchor',anchor)
  assert 'Service' not in types, 'Legal guide must not imply legal services are offered'
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  assert len(faq['mainEntity']) >= 12
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('compliance FAQ mismatch',item['name'])
  assert 'https://legislation.mt/eli/cap/246/eng/pdf' in text and 'https://www.mfsa.mt/our-work/investment-services-supervision/' in text
 if path!='/':assert 'WebPage' in types and 'BreadcrumbList' in types,(path,'page schema')
 else:
  assert 'Marketing &amp; introductions' not in text and 'Marketing & introductions' not in text
  assert 'Global Luxury Asset Brokerage' in p.title and 'Exceptional assets.' in text and 'Property at our core.' in text,(path,'luxury brokerage proposition')
  assert 'Build your asset brief' in text and 'Your choices stay in this browser' in text and 'No assets are currently advertised.' in text,(path,'honest interactive brief')
  assert all(f'id="{anchor}"' in text for anchor in ['property-brief','why-wiele','luxury-assets','research','questions']),(path,'editorial journey sections')
  assert 'Choose a scene' not in text and 'Test 10% lower rent' not in text,(path,'keep homepage focused')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('FAQ schema must match visible content',item['name'])
 assert 'Citation, not clicks' not in text
 assert 'Start AI Visibility Audit' not in text
 assert headers.get('X-Content-Type-Options')=='nosniff'
 assets.update(p.assets);links.update(p.links)
 print('PASS',path,'HTTP',status,'headings, canonical, unique metadata, social previews, entity schema and security header')
for path in sorted(assets):
 status,_,_=get(path);assert status==200,(path,status)
for path in sorted(links):
 parsed=urlparse(path)
 if parsed.path=='/property/investment-information-example.html':
  status,headers,data=get(parsed.path)
  assert not re.search(rb'Jonathan|Landman|9932|wa\.me',data,re.I),'personal identity in example download'
  assert status==200 and 'text/html' in headers.get('Content-Type',''),('example download',status)
  example=Page();example.feed(data.decode('utf-8'))
  assert example.meta.get('robots')=='noindex' and example.h1s==1,'example document indexing/heading'
  assert b'Example only' in data and b'Unverified' in data and b'No return is promised' in data,'example evidence boundaries'
 else:
  assert parsed.path in paths or parsed.path=='/',('unexpected internal link',path)
for path in ['/audit','/pricing','/labs','/citation-score','/citation-brief/brand-semantics-infrastructure','/services/ai-visibility-monitoring','/systems/search','/pricing/?old=1']:
 status,headers,data=get(path);assert status==410,(path,status)
 assert headers.get('X-Robots-Tag')=='noindex, follow',(path,'retired URL index exclusion')
 assert b'no longer offered' in data and b'https://wielegroup.com/about' in data,(path,'retirement explanation')
for path in ['/api/audit','/api/contact','/unknown-property-page','/purchase-guide/unknown-country','/purchase-guide/assets/unknown-asset']:
 status,_,_=get(path);assert status==404,(path,status)
print('PASS',len(assets),'assets;',len(links),'internal link destinations; retired agency pages return 410, unknown routes return 404')
for path in ['/robots.txt','/sitemap.xml','/llms.txt','/property/og-wiele-global-20261113.jpg','/property-identity/reflective-gold/favicon-32.png','/property-identity/wiele-investments/wordmark-reflective.png','/property-identity/reflective-gold/organisation-icon.png']:
 status,_,_=get(path);assert status==200,(path,status)
assert not re.search(rb'Jonathan|Landman|jonathan|9932|wa\.me',get('/llms.txt')[2],re.I),'personal identity in llms.txt'
print('PASS search metadata and brand resources')

status,_,data=get('/sitemap.xml')
root=ET.fromstring(data)
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
locations=[e.text.rstrip('/') for e in root.findall('s:url/s:loc',ns)]
assert set(locations)=={'https://wielegroup.com'+('' if p=='/' else p) for p in paths},'sitemap canonical coverage'
for entry in root.findall('s:url',ns):
 assert entry.find('s:lastmod',ns) is not None,'missing sitemap modification date'
status,_,data=get('/robots.txt')
assert b'Sitemap: https://wielegroup.com/sitemap.xml' in data and b'Disallow: /api/' in data,'crawl rules'
print('PASS sitemap canonical coverage, modification dates and crawl rules')

for path in ['/api/articles/media/demand-growth','/api/articles/media/occupancy-sensitivity']:
 status,headers,data=get(path)
 assert status==401,(path,'anonymous media must be denied',status)
 assert 'no-store' in headers.get('Cache-Control','') and not data,(path,'private chart leaked or cached')
print('PASS anonymous article access: no protected body, no charts, private cache headers')

for query in ['', '?report=global-luxury-2026']:
 status,headers,data=get('/api/reports/download'+query)
 allowed=(401,503) if urlparse(base).hostname in ['localhost','127.0.0.1'] else (401,)
 assert status in allowed,('anonymous report must be denied',query,status)
 assert 'no-store' in headers.get('Cache-Control','') and not data.startswith(b'%PDF'), 'private report leaked or cached'
status,_,_=get('/api/reports/download?report=unknown')
assert status==404,'unknown report must not fall back to an existing PDF'
print('PASS report-specific access: both PDFs protected; unknown reports rejected')
