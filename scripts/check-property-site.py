from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
import sys,time,json,re
from xml.etree import ElementTree as ET
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3034'
ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15'
paths=['/','/selling','/buying','/investor-onboarding','/seller-onboarding','/properties','/property-maintenance','/legal-compliance','/malta-investment-report','/about','/contact','/privacy','/terms','/credits']
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
 assert 'Wiele Properties' in text
 assert text.count('Malta Property. Global Ambition.') >= 2,(path,'shared brand tagline missing')
 assert 'Malta at heart' not in text and 'Investment in focus' not in text,(path,'retired tagline')
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
 assert org.get('slogan')=='Malta Property. Global Ambition.',(path,'organization slogan')
 assert set(['Wiele Group','WieleGroup','Wiele Property']).issubset(org['alternateName']),(path,'brand aliases')
 assert org['name']=='Wiele Properties' and org['address']['addressLocality']=='Swieqi',(path,'business identity')
 if path in ['/selling','/buying','/property-maintenance']:
  service=next(e for e in entities if e.get('@type')=='Service')
  assert service['provider']['@id']=='https://wielegroup.com/#organization' and service['areaServed']['name']=='Malta',(path,'service identity')
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['mainEntity']['@id']==service['@id'],(path,'service page relationship')
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
for path in ['/api/audit','/api/contact','/unknown-property-page']:
 status,_,_=get(path);assert status==404,(path,status)
print('PASS',len(assets),'assets;',len(links),'internal link destinations; retired agency pages return 410, unknown routes return 404')
for path in ['/robots.txt','/sitemap.xml','/llms.txt','/property/og-premium-editorial-20261030.jpg','/property-identity/option-1/icon-32.png']:
 status,_,_=get(path);assert status==200,(path,status)
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
