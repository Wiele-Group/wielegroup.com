from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
import sys,time,json,re
from pathlib import Path
from xml.etree import ElementTree as ET
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3034'
ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15'
home_languages={'en-GB':'/','de-DE':'/de','fr-FR':'/fr','it-IT':'/it','es-ES':'/es','x-default':'/'}
home_paths={path:tag for tag,path in home_languages.items() if tag!='x-default'}
mandate_languages={tag:('' if target=='/' else target)+'/private-mandates' for tag,target in home_languages.items()}
mandate_paths={path:tag for tag,path in mandate_languages.items() if tag!='x-default'}
buying_languages={tag:('' if target=='/' else target)+'/buying' for tag,target in home_languages.items()}
buying_paths={path:tag for tag,path in buying_languages.items() if tag!='x-default'}
selling_languages={tag:('' if target=='/' else target)+'/selling' for tag,target in home_languages.items()}
selling_paths={path:tag for tag,path in selling_languages.items() if tag!='x-default'}
desk_languages={tag:('' if target=='/' else target)+'/luxury-assets' for tag,target in home_languages.items()}
desk_paths={path:tag for tag,path in desk_languages.items() if tag!='x-default'}
purchase_languages={tag: ("" if target=="/" else target)+"/purchase-guide" for tag,target in home_languages.items()}
purchase_paths={path:tag for tag,path in purchase_languages.items() if tag!="x-default"}
research_languages={tag: ("" if target=="/" else target)+"/research" for tag,target in home_languages.items()}
research_paths={path:tag for tag,path in research_languages.items() if tag!="x-default"}
valuation_languages={tag: ("" if target=="/" else target)+"/valuations" for tag,target in home_languages.items()}
valuation_paths={path:tag for tag,path in valuation_languages.items() if tag!="x-default"}
origination_languages={tag: ("" if target=="/" else target)+"/origination-protocol" for tag,target in home_languages.items()}
origination_paths={path:tag for tag,path in origination_languages.items() if tag!="x-default"}
contact_languages={tag: ("" if target=="/" else target)+"/contact" for tag,target in home_languages.items()}
contact_paths={path:tag for tag,path in contact_languages.items() if tag!="x-default"}
paths=[*origination_paths,*contact_paths,*valuation_paths,*research_paths,*purchase_paths,*home_paths,*mandate_paths,*buying_paths,*selling_paths,*desk_paths,'/luxury-assets/yachts','/luxury-assets/classic-cars','/research/global-luxury-property-report-2026','/investor-onboarding','/seller-enquiry','/property-maintenance','/legal-compliance','/malta-investment-report','/articles','/articles/malta-short-let-investment-2026','/about','/privacy','/terms','/terms/seller-retainer','/credits']
guide_data=Path(__file__).resolve().parent.parent/"src/data"
jurisdictions=json.loads((guide_data/"purchase-jurisdictions.json").read_text())
sales_processes=json.loads((guide_data/"property-sales-process.json").read_text())
asset_guides=json.loads((guide_data/"purchase-assets.json").read_text())
assert len(jurisdictions)==35 and sum(j["group"]=="European Union" for j in jurisdictions)==27
paths += ['/legal-compliance/cross-border','/asset-taxonomy']
paths += ["/purchase-guide/"+j["slug"] for j in jurisdictions]+["/purchase-guide/assets/"+a["slug"] for a in asset_guides]
example_data=json.loads((guide_data/"listing-examples.json").read_text())
example_paths=["/listing-examples/"+e["slug"] for e in example_data]
indexable_paths=paths.copy()
paths += example_paths
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.assets=[];self.canonicals=[];self.alternates={};self.h1s=0;self.meta={};self.title="";self.in_title=False;self.in_json=False;self.in_script=False;self.json_buffer="";self.schemas=[];self.visible=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='title':self.in_title=True
  if tag=='script':
   self.in_script=True
   if a.get('type')=='application/ld+json':self.in_json=True;self.json_buffer=''
  if tag=='h1':self.h1s+=1
  if tag=='img':assert 'alt' in a,('image missing alternative text',a.get('src'))
  if tag=='a' and a.get('href','').startswith('/'):self.links.append(a['href'])
  if tag in ['img','script'] and a.get('src','').startswith('/'):self.assets.append(a['src'])
  if tag=='source':
   for candidate in a.get('srcset','').split(','):
    url=candidate.strip().split(' ')[0]
    if url.startswith('/'):self.assets.append(url)
  if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a.get('href'))
  if tag=='link' and a.get('rel')=='alternate' and a.get('hreflang'):self.alternates[a['hreflang']]=a.get('href')
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_json:self.json_buffer+=data
  if not self.in_script:self.visible.append(data)
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script':
   if self.in_json:self.schemas.append(json.loads(self.json_buffer))
   self.in_json=False;self.in_script=False

def get(path,extra_headers=None):
 req=Request(urljoin(base,path),headers={'User-Agent':ua,**(extra_headers or {})})
 try:
  with urlopen(req,timeout=30) as r:return r.status,r.headers,r.read()
 except HTTPError as e:return e.code,e.headers,e.read()
brand_logo='/property-identity/gold-rings/wiele.webp'
assets=set();links=set();titles=set();descriptions=set()
for path in paths:
 status,headers,data=get(path+'?_cb='+str(int(time.time())))
 text=data.decode();p=Page();p.feed(text)
 assert status==200,(path,status)
 assert p.assets.count(brand_logo)==2,(path,'header and footer logo')
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
 if path in example_paths:
  assert 'noindex' in p.meta.get('robots',''),(path,'fictional listing must be noindex')
  assert 'Illustrative example' in text and 'not for sale' in text and 'Registered access' not in text,(path,'example registration/disclosures')
  assert 'private' in headers.get('Cache-Control','') and 'no-store' in headers.get('Cache-Control',''),(path,'listing shared caching allowed')
  assert 'application/ld+json' in text
 else:assert 'noindex' not in p.meta.get('robots',''),(path,'unexpected noindex')
 entities=[]
 for schema in p.schemas:entities.extend(schema.get('@graph',[schema]))
 types=[e.get('@type') for e in entities]
 ids=[e['@id'] for e in entities if '@id' in e]
 assert len(ids)==len(set(ids)),(path,'duplicate schema node identifiers')
 if path in {'/about','/luxury-assets','/luxury-assets/classic-cars','/valuations','/research','/malta-investment-report','/terms/seller-retainer','/contact','/privacy'}:
  trail=next(e for e in entities if e.get('@type')=='BreadcrumbList')['itemListElement']
  assert [i['position'] for i in trail]==list(range(1,len(trail)+1)),(path,'breadcrumb order')
  assert trail[0]['item']=='https://wielegroup.com/' and trail[-1]['item']=='https://wielegroup.com'+path,(path,'breadcrumb destination')

 if path in example_paths:
  assert not any(t in types for t in ['Product','Offer','RealEstateListing','Vehicle']),(path,'fictional asset offered as inventory')
  example=next(e for e in example_data if path.endswith('/'+e['slug']))
  private_example=next(e for e in json.loads((guide_data.parent/'server/listing-examples.json').read_text()) if e['slug']==example['slug'])
  assert private_example['price'] in text and private_example['overview'] in ' '.join(p.visible),(path,'public sample details missing')
  assert 'registered-listing-body' in text and 'Discuss marketing my asset' in text and 'name="email"' not in text,(path,'public sample content or registration mismatch')
 assert 'Organization' in types and 'WebSite' in types,(path,'missing business identity schema')
 org=next(e for e in entities if e.get('@type')=='Organization')
 assert org.get('slogan')=='South African roots. Global perspective.',(path,'organization slogan')
 assert org['logo']=='https://wielegroup.com/property-identity/gold-rings/organisation-logo.png',(path,'organization logo')
 assert set(['Wiele Group','WieleGroup','Wiele Property']).issubset(org['alternateName']),(path,'brand aliases')
 assert org['name']=='Wiele Investments' and org['address']['addressCountry']=='MT' and 'addressLocality' not in org['address'],(path,'business identity')
 social_profiles={'https://www.facebook.com/wieleinvestments/','https://www.linkedin.com/company/wiele-investments/'}
 assert set(org['sameAs'])==social_profiles,(path,'official social profiles')
 assert all(f'href="{profile}"' in text for profile in social_profiles) and 'instagram.com' not in text.lower(),(path,'public social links')
 if path.startswith('/purchase-guide/') or path in purchase_paths:
  assert 'FAQPage' in types and not any(e.get('@type') in ('Service','LegalService') and e.get('@id')!='https://wielegroup.com/#brokerage-service' for e in entities),(path,'purchase guide schema')
  assert ('2026-11-26' if path in purchase_paths else '2026-11-15') in text,(path,'research date missing')
  if path not in purchase_paths:assert 'Coverage' in text,(path,'coverage limits missing')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,(path,'purchase FAQ mismatch')
  if path.startswith('/purchase-guide/') and not path.startswith('/purchase-guide/assets/'):
   slug=path.rsplit('/',1)[1]
   process=sales_processes[slug]
   assert all(f'id="{anchor}"' in text for anchor in ['nationality-status','legal-sales-process','sale-documents','country-coverage']),(path,'legal guide navigation missing')
   assert process['binding'] in visible and process['documents'] in visible,(path,'legal process or document content missing')
   assert process['nationalities']['eea'] in visible and process['nationalities']['other'] in visible,(path,'additional nationality content missing')
   webpage=next(e for e in entities if e.get('@type')=='WebPage')
   assert all(source['url'] in webpage.get('citation',[]) for source in process['sources']),(path,'process source citations missing')
   for stage in process['stages']:
    assert stage['text'] in visible and stage['kind'] in visible,(path,'stage content missing')
  if path in purchase_paths:
   page=next(e for e in entities if e.get('@type')=='WebPage')
   assert page['inLanguage']==purchase_paths[path] and page['description']==description,(path,'purchase guide locale metadata')
   assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in purchase_languages.items()},(path,'purchase guide language alternates')
   assert all('/purchase-guide/'+j['slug'] in p.links for j in jurisdictions),(path,'destination menu incomplete')
   assert 'id="country-search"' in text,(path,'jurisdiction search')
   assert text.count('name="settlement-asset"')==3 and text.count('name="settlement-corridor"')==3,(path,'matrix selections')
   assert text.count('class="settlement-result"')==9 and text.count('name="acquisition-checklist"')==5,(path,'matrix and checklist totals')
   prefix=path.removesuffix('/purchase-guide')
   assert all(route in p.links for route in [prefix+'/buying',prefix+'/private-mandates','/legal-compliance/cross-border',prefix+'/valuations#landed-cost-estimator','/purchase-guide/assets/yachts','/purchase-guide/assets/vehicles']),(path,'purchase guide actions and references')
   content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
   assert not re.search(r'\bAI\b|artificial intelligence|machine learning|automated guide|algorit\w*',content,re.I),(path,'retired guide language')
   assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/','/images/selling/','/images/valuations/','/images/luxury-assets/','/images/list-asset/')) for asset in p.assets),(path,'dedicated purchase guide imagery')
   if path=='/purchase-guide':
    assert text.count('<span class="corridor-tag">Primary Corridor</span>')==7,(path,'primary corridors')
    assert text.index('id="acquisition-checklist"')<text.index('id="cross-border-funding"')<text.index('id="transaction-tools"')<text.index('id="selling-across-borders"'),(path,'transaction guidance order')
 if path.startswith('/luxury-assets/'):
  assert 'FAQPage' in types and 'Product' not in types and 'Offer' not in types,(path,'guide schema')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,(path,'FAQ mismatch')
 if path in desk_paths:
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['inLanguage']==desk_paths[path] and page['description']==description,(path,'desk locale metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in desk_languages.items()},(path,'desk language alternates')
  assert page['mainEntity']['numberOfItems']==3 and text.count('name="specialist-desk"')==3,(path,'three specialist desks')
  assert all(f'id="{anchor}"' in text for anchor in ('specialist-desks','capital-allocation','title-governance')),(path,'desk sections')
  assert all(any(url.endswith('/private-mandates#asset='+key) for url in p.links) for key in ('real-estate','yachts','classic-cars')),(path,'prefiltered mandate links')
  assert all(link in p.links for link in ('/list-asset','/terms/seller-retainer','/luxury-assets/yachts','/luxury-assets/classic-cars')),(path,'desk actions and links')
  assert not {'Offer','Product','RealEstateListing'}.intersection(types),(path,'illustrative scenes must not become inventory')
  assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/','/images/selling/','/images/valuations/')) for asset in p.assets),(path,'dedicated desk imagery')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|automated curation|algorit\w*',content,re.I),(path,'retired desk language')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=' '.join(p.visible)
  assert all(item['name'] in visible and item['acceptedAnswer']['text'] in visible for item in faq['mainEntity']),(path,'FAQ parity')
 if path in research_paths:
  page=next(e for e in entities if e.get('@type')=='CollectionPage')
  assert page['inLanguage']==research_paths[path] and page['description']==description,(path,'research locale metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in research_languages.items()},(path,'research language alternates')
  assert text.count('name="briefing-desk"')==5 and 'id="briefings-index"' in text,(path,'briefing desk selector')
  assert text.count('class="research-brief research-brief-lead"')==1,(path,'one featured briefing')
  assert page['mainEntity']['numberOfItems']==len(re.findall(r'<article class="research-brief(?: research-brief-lead)?"',text)),(path,'catalogue item count')
  prefix=path.removesuffix('/research')
  assert all(route in p.links for route in ['/research/global-luxury-property-report-2026','/research/global-luxury-property-report-2026#register','/malta-investment-report','/malta-investment-report#register','/articles','/articles/malta-short-let-investment-2026',prefix+'/luxury-assets','/legal-compliance/cross-border',prefix+'/valuations#landed-cost-estimator',prefix+'/private-mandates',prefix+'/buying',prefix+'/selling']),(path,'research links and dispatch')
  assert all(date in text for date in ['2026-11-13','2026-11-02','2026-10-29']),(path,'publication and cutoff dates')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|automated insights|algorit\w*',content,re.I),(path,'retired research language')
  assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/','/images/selling/','/images/valuations/','/images/luxury-assets/','/images/list-asset/','/images/purchase-guide/')) for asset in p.assets),(path,'dedicated research imagery')
 if path in mandate_paths:
  page=next(e for e in entities if e.get('@type')=='CollectionPage')
  assert page['inLanguage']==mandate_paths[path] and page['description']==description,(path,'mandate locale metadata')
  assert page['mainEntity']['numberOfItems']==3 and text.count('<article class="mandate-card">')==3,(path,'three illustrative dossiers')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in mandate_languages.items()},(path,'mandate language alternates')
  assert not any(t in types for t in ['RealEstateListing','Offer','Product']),(path,'fictional asset offered as inventory')
  mandate_content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|automated|property listing',mandate_content,re.I),(path,'retired mandate language')
  assert all('/flagship-examples/'+name+'.html' in p.links for name in ['cape-villa','ligurian-yacht','oxfordshire-coupe']),(path,'dossier destinations')
  assert not any(asset.startswith('/images/home/') for asset in p.assets),(path,'Home image reuse')
 if path in buying_paths:
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['inLanguage']==buying_paths[path] and page['description']==description,(path,'buying locale metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in buying_languages.items()},(path,'buying language alternates')
  assert all(f'id="{anchor}"' in text for anchor in ('acquisition-protocol','due-diligence','acquisition-brief')),(path,'acquisition sections')
  assert text.count('name="acquisition-stage"')==4 and path.removesuffix('/buying')+'/contact?interest=buying' in p.links,(path,'protocol choices and enquiry fallback')
  assert not any(asset.startswith(('/images/home/','/images/mandates/')) for asset in p.assets),(path,'dedicated acquisition artwork')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|automated alerts|machine learning|algorit\w*',content,re.I),(path,'retired buying language')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=' '.join(p.visible)
  assert all(item['name'] in visible and item['acceptedAnswer']['text'] in visible for item in faq['mainEntity']),(path,'FAQ parity')
 if path in selling_paths:
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['inLanguage']==selling_paths[path] and page['description']==description,(path,'selling locale metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in selling_languages.items()},(path,'selling language alternates')
  assert all(f'id="{anchor}"' in text for anchor in ('mandate-walkthrough','mandate-terms','seller-duration')),(path,'walkthrough and calculator')
  assert text.count('name="seller-stage"')==4 and all(link in p.links for link in ('/list-asset','/terms/seller-retainer')),(path,'mandate actions')
  assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/')) for asset in p.assets),(path,'dedicated selling artwork')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|automated targeting|algorit\w*',content,re.I),(path,'retired selling language')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=' '.join(p.visible)
  assert all(item['name'] in visible and item['acceptedAnswer']['text'] in visible for item in faq['mainEntity']),(path,'FAQ parity')
 if path in buying_paths or path in selling_paths or path=='/property-maintenance':
  service=next(e for e in entities if e.get('@id')=='https://wielegroup.com'+path+'#service')
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
 if path in origination_paths or path in contact_paths:
  origination=path in origination_paths
  expected_languages=origination_languages if origination else contact_languages
  expected_tag=(origination_paths if origination else contact_paths)[path]
  node=next(e for e in entities if e.get('@type')==('WebPage' if origination else 'ContactPage'))
  assert node['inLanguage']==expected_tag and node['description']==description,(path,'localized desk metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in expected_languages.items()},(path,'desk language alternates')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|algorit\w*|\bbots?\b|automated (?:routing|ad scripts)|ad networks',content,re.I),(path,'retired terminology')
  assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/','/images/selling/','/images/valuations/','/images/luxury-assets/','/images/purchase-guide/','/images/research/','/images/contact/' if origination else '/images/origination/')) for asset in p.assets),(path,'dedicated imagery')
  assert '/list-asset' in p.links and '/terms/seller-retainer' in p.links,(path,'mandate navigation')
  if origination:
   prefix=path.removesuffix('/origination-protocol')
   assert text.count('name="origination-phase"')==4 and 'id="origination-architecture"' in text and 'id="discretion-ledger"' in text,(path,'protocol sequence')
   assert all(prefix+target in p.links for target in ['/selling','/private-mandates']),(path,'localized protocol CTAs')
  else:
   prefix=path.removesuffix('/contact')
   assert text.count('name="correspondence-desk"')==4 and 'id="private-correspondence"' in text,(path,'correspondence controls')
   assert all(prefix+target in p.links for target in ['/buying','/valuations']),(path,'localized correspondence CTAs')
 if path in contact_paths:
  assert '<form' in text and 'name="message"' in text and 'method="post"' in text,(path,'missing initial HTML form')
  assert 'Loading the enquiry form' not in text,(path,'blank loading state')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  assert len(faq['mainEntity'])==2,(path,'enquiry FAQ count')
  display=' '.join(p.visible)
  for item in faq['mainEntity']:
   assert item['name'] in display and item['acceptedAnswer']['text'] in display,(path,item['name'],'FAQ answer differs')
 if path=='/malta-investment-report':
  report=next(e for e in entities if e.get('@type')=='Report')
  assert report['datePublished']=='2026-10-29' and report['dateModified']=='2026-11-02' and 'registration' in report['conditionsOfAccess'],(path,'report dates or access')
 if path in valuation_paths:
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['inLanguage']==valuation_paths[path] and page['description']==description,(path,'valuation locale metadata')
  assert p.alternates=={tag:'https://wielegroup.com'+target for tag,target in valuation_languages.items()},(path,'valuation language alternates')
  assert all(f'id="{anchor}"' in text for anchor in ('appraisal-desk','currency-converter','valuation-methodology','valuation-enquiry')),(path,'valuation sections')
  assert text.count('name="appraisal-specialist"')==3 and '/terms/seller-retainer' in p.links,(path,'specialist desks and mandate terms')
  content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|automated valuation|algorit\w*',content,re.I),(path,'retired valuation language')
  assert not any(asset.startswith(('/images/home/','/images/mandates/','/images/buying/','/images/selling/','/images/luxury-assets/','/images/list-asset/','/images/purchase-guide/','/images/research/')) for asset in p.assets),(path,'dedicated valuation imagery')
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  visible=' '.join(p.visible)
  assert all(item['name'] in visible and item['acceptedAnswer']['text'] in visible for item in faq['mainEntity']),(path,'valuation FAQ parity')
  assert 'id="landed-cost-estimator"' in text and 'Total landed cost' in text,(path,'transaction estimator')
  assert 'appropriately licensed practitioners in the relevant jurisdiction' in text,(path,'estimate limits')
  assert all(amount in text for amount in ['1,500,000.00','93,750.00','1,599,500.00']) and 'Illustrative worked example.' in text,(path,'server-rendered worked example')
  assert 'Carry scenario into valuation brief' in text and 'id="valuation-budget"' in text and 'id="valuation-currency"' in text,(path,'local valuation handoff')
  assert all(route in p.links for route in ['/flagship-examples/cape-villa.html','/flagship-examples/ligurian-yacht.html','/flagship-examples/oxfordshire-coupe.html']),(path,'evidence dossiers')
 if path=='/seller-enquiry':
  assert 'id="acquisition-mandates"' in text and 'They represent no current buyers' in text,(path,'illustrative mandates')
  assert all(phrase in text for phrase in ['01 Core Identity','Technical &amp; Structural Specs','Legal, Tax &amp; Provenance','Financial &amp; Commercial Terms','seller-reported record coverage']),(path,'structured seller intake')
  assert 'type="file"' not in text and 'passport and identity documents' in text,(path,'private document guardrails')
 if path in ['/investor-onboarding','/seller-enquiry']:
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
  assert not any(e.get('@type') in ('Service','LegalService') and e.get('@id')!='https://wielegroup.com/#brokerage-service' for e in entities), 'Legal guide must not imply legal services are offered'
  faq=next(e for e in entities if e.get('@type')=='FAQPage')
  assert len(faq['mainEntity']) >= 12
  visible=re.sub(r'\s+',' ',' '.join(p.visible))
  for item in faq['mainEntity']:
   assert item['name'] in visible and item['acceptedAnswer']['text'] in visible,('compliance FAQ mismatch',item['name'])
  assert 'https://legislation.mt/eli/cap/246/eng/pdf' in text and 'https://www.mfsa.mt/our-work/investment-services-supervision/' in text
 if path in mandate_paths or path in research_paths:assert 'CollectionPage' in types and 'BreadcrumbList' in types,(path,'collection schema')
 elif path in contact_paths:assert 'ContactPage' in types and 'BreadcrumbList' in types,(path,'contact schema')
 elif path not in home_paths:assert 'WebPage' in types and 'BreadcrumbList' in types,(path,'page schema')
 else:
  page=next(e for e in entities if e.get('@type')=='WebPage')
  assert page['inLanguage']==home_paths[path] and page['description']==description,(path,'localized page schema')
  assert {tag:target.rstrip('/') for tag,target in p.alternates.items()}=={tag:('https://wielegroup.com'+target).rstrip('/') for tag,target in home_languages.items()},(path,'language alternates')
  assert all(anchor in text for anchor in ['id="asset-desks"','id="capital-corridors"','id="viewing-room"','id="questions"']),(path,'Home sections')
  assert text.index('id="asset-desks"') < text.index('id="capital-corridors"') < text.index('id="viewing-room"'),(path,'Home section order')
  assert text.count('name="capital-corridor"')==4 and '/list-asset' in p.links,(path,'corridor choices and mandate link')
  assert all(f'/flagship-examples/{slug}.html' in p.links for slug in ('cape-villa','ligurian-yacht','oxfordshire-coupe')),(path,'dossier links')
  home_content=' '.join([*p.visible,*p.meta.values(),json.dumps(entities,ensure_ascii=False)])
  assert not re.search(r'\bAI\b|artificial intelligence|machine learning|algorit\w*|automated bots',home_content,re.I),(path,'retired Home language')
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
 elif parsed.path in {'/legal-guide', '/imagery-credits', '/malta-maintenance'}:
  destination={'/legal-guide':'/legal-compliance/cross-border','/imagery-credits':'/credits','/malta-maintenance':'/property-maintenance'}[parsed.path]
  status,headers,_=get(parsed.path)
  assert status==308 and urlparse(headers.get('Location','')).path==destination,(parsed.path,'canonical route alias')
 elif parsed.path=='/list-asset':
  status,headers,data=get(parsed.path);assert status==200,(parsed.path,status)
  onboarding=Page();onboarding.feed(data.decode())
  assert onboarding.h1s==1 and 'noindex' in onboarding.meta.get('robots',''),(parsed.path,'transaction page indexing or heading')
  assert '/terms/seller-retainer' in onboarding.links,(parsed.path,'retainer terms link missing')
 elif parsed.path.startswith(('/flagship-examples/', '/reference-data/')):
  status,headers,data=get(parsed.path);assert status==200,(parsed.path,status)
  if parsed.path.endswith('.html'):
   example=Page();example.feed(data.decode('utf-8'))
   assert example.h1s==1 and b'<form' not in data and b'noindex' in data,(parsed.path,'sample access or metadata')
   assert brand_logo in example.assets,(parsed.path,'standalone dossier logo')
   if parsed.path in ['/flagship-examples/cape-villa.html','/flagship-examples/ligurian-yacht.html','/flagship-examples/oxfordshire-coupe.html']:
    assert b'id="readiness"' in data and b'0 of 5 checks supported by verified records' in data,(parsed.path,'fictional due-diligence record')

  if parsed.path.endswith('.json'):json.loads(data)
 else:
  assert parsed.path in paths or parsed.path=='/',('unexpected internal link',path)
for path in ['/audit','/pricing','/labs','/citation-score','/citation-brief/brand-semantics-infrastructure','/services/ai-visibility-monitoring','/systems/search','/pricing/?old=1']:
 status,headers,data=get(path);assert status==410,(path,status)
 assert headers.get('X-Robots-Tag')=='noindex, follow',(path,'retired URL index exclusion')
 assert b'no longer offered' in data and b'https://wielegroup.com/about' in data,(path,'retirement explanation')
for path in ['/api/audit','/api/contact','/unknown-property-page','/listing-examples/unknown-example','/purchase-guide/unknown-country','/purchase-guide/assets/unknown-asset']:
 status,_,_=get(path);assert status==404,(path,status)
print('PASS',len(assets),'assets;',len(links),'internal link destinations; retired agency pages return 410, unknown routes return 404')
for path in ['/robots.txt','/sitemap.xml','/llms.txt','/llms-full.txt','/og/wiele-gold-rings-20261126.png','/property/og-property-maintenance-20261126.jpg','/property/og-legal-compliance-20261126.jpg','/property-identity/gold-rings/favicon-32.png','/property-identity/gold-rings/wiele.webp','/property-identity/gold-rings/organisation-logo.png','/site.webmanifest']:
 status,_,_=get(path);assert status==200,(path,status)
for path in ['/llms.txt','/llms-full.txt']:
 status,headers,data=get(path)
 assert status==200 and 'text/plain' in headers.get('Content-Type','') and data.decode('utf-8').startswith('# Wiele Investments'),(path,'machine-readable text')
 assert not re.search(rb'Jonathan|Landman|jonathan|9932|wa\.me',data,re.I),(path,'personal identity')
png=get('/og/wiele-gold-rings-20261126.png')[2]
assert png[:8]==b'\x89PNG\r\n\x1a\n' and tuple(int.from_bytes(png[n:n+4],'big') for n in (16,20))==(1200,630),'fallback OG PNG dimensions'
print('PASS search metadata and brand resources')

status,_,data=get('/sitemap.xml')
root=ET.fromstring(data)
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
locations=[e.text.rstrip('/') for e in root.findall('s:url/s:loc',ns)]
assert len(locations)==len(set(locations)),'duplicate sitemap URLs'
assert set(locations)=={'https://wielegroup.com'+('' if p=='/' else p) for p in indexable_paths},'sitemap canonical coverage'
for entry in root.findall('s:url',ns):
 assert entry.find('s:lastmod',ns) is not None,'missing sitemap modification date'
 for desk_paths_map,desk_languages_map in ((origination_paths,origination_languages),(contact_paths,contact_languages)):
  if urlparse(entry.find('s:loc',ns).text).path in desk_paths_map:
   alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
   assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in desk_languages_map.items()},'protocol and contact sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in valuation_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in valuation_languages.items()},'valuation sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in research_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in research_languages.items()},'research sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in purchase_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in purchase_languages.items()},'purchase guide sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in desk_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in desk_languages.items()},'desk sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in selling_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in selling_languages.items()},'selling sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in buying_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in buying_languages.items()},'buying sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in mandate_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in mandate_languages.items()},'mandate sitemap language alternates'
 if urlparse(entry.find('s:loc',ns).text).path in home_paths:
  alternatives={node.attrib['hreflang']:node.attrib['href'] for node in entry.findall('{http://www.w3.org/1999/xhtml}link')}
  assert alternatives=={tag:'https://wielegroup.com'+target for tag,target in home_languages.items()},'sitemap language alternates'
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

# The edge cache must distinguish full pages from App Router navigation.
# Request the SAME URL and warm HTML first to catch cross-representation reuse.
for path in ['/selling','/luxury-assets/yachts']:
 status,headers,data=get(path)
 assert status==200 and b'<!DOCTYPE html>' in data,(path,'HTML navigation')
 status,headers,data=get(path,{'RSC':'1'})
 assert status==200 and 'text/x-component' in headers.get('Content-Type',''),(path,'RSC response replaced by HTML cache')
 assert b'<!DOCTYPE html>' not in data and 'RSC' in headers.get('Vary',''),(path,'RSC representation and Vary')
 status,headers,data=get(path)
 assert status==200 and 'text/html' in headers.get('Content-Type','') and b'<!DOCTYPE html>' in data,(path,'RSC must not poison HTML cache')
print('PASS HTML / App Router representation isolation')
