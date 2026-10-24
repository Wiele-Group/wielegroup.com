from urllib.request import Request, urlopen
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from html.parser import HTMLParser
import sys,time
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3034'
ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15'
paths=['/','/selling','/buying','/properties','/about','/contact','/privacy','/terms','/credits']
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.assets=[];self.canonicals=[];self.h1s=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1s+=1
  if tag=='a' and a.get('href','').startswith('/'):self.links.append(a['href'])
  if tag in ['img','script'] and a.get('src','').startswith('/'):self.assets.append(a['src'])
  if tag=='link' and a.get('rel')=='canonical':self.canonicals.append(a.get('href'))
def get(path):
 req=Request(urljoin(base,path),headers={'User-Agent':ua})
 try:
  with urlopen(req,timeout=30) as r:return r.status,r.headers,r.read()
 except HTTPError as e:return e.code,e.headers,e.read()
assets=set();links=set()
for path in paths:
 status,headers,data=get(path+'?_cb='+str(int(time.time())))
 text=data.decode();p=Page();p.feed(text)
 assert status==200,(path,status)
 assert p.h1s==1,(path,'heading count',p.h1s)
 assert len(p.canonicals)==1 and p.canonicals[0].rstrip('/')==('https://wielegroup.com'+('/' if path=='/' else path)).rstrip('/'),(path,p.canonicals)
 assert 'Wiele Property' in text
 assert 'Citation, not clicks' not in text
 assert 'Start AI Visibility Audit' not in text
 assert headers.get('X-Content-Type-Options')=='nosniff'
 assets.update(p.assets);links.update(p.links)
 print('PASS',path,'HTTP',status,'one H1, canonical, new brand and security header')
for path in sorted(assets):
 status,_,_=get(path);assert status==200,(path,status)
for path in sorted(links):
 parsed=urlparse(path)
 assert parsed.path in paths or parsed.path=='/',('unexpected internal link',path)
for path in ['/audit','/pricing','/labs','/api/audit','/api/contact']:
 status,_,data=get(path);assert status==404,(path,status)
print('PASS',len(assets),'assets;',len(links),'internal link destinations; retired agency routes return 404')
for path in ['/robots.txt','/sitemap.xml','/llms.txt','/property/og-property-editorial.jpg','/property-identity/editorial/favicon.svg']:
 status,_,_=get(path);assert status==200,(path,status)
print('PASS search metadata and brand resources')
