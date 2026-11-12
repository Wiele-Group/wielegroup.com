"""Create an offline, self-contained homepage design preview from a Next build.
Onward page links intentionally open the current website; no forms or API calls
are sent by this preview. The full application remains in the source checkout.
"""
from pathlib import Path
from urllib.parse import urljoin, urlparse
import re, base64, mimetypes, json
root=Path(__file__).resolve().parents[1]
html=(root/'.next/server/app/index.html').read_text()

def data(path):
    mime=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()

def resource(url):
    if url.startswith('/_next/'): return root/'.next'/url.removeprefix('/_next/')
    if url.startswith('/'): return root/'public'/url.lstrip('/')
    return None

def csslink(match):
    tag=match.group(0)
    if 'rel="stylesheet"' not in tag:return ''
    url=re.search(r'href="([^"]+)"',tag).group(1)
    path=resource(url)
    css=path.read_text()
    def inline_url(m):
        value=m.group(1).strip('"\'')
        if value.startswith('data:'):return m.group(0)
        resolved=resource(urljoin('https://preview.test'+url,value).replace('https://preview.test',''))
        return 'url("'+data(resolved)+'")' if resolved and resolved.is_file() else m.group(0)
    return '<style>'+re.sub(r'url\(([^)]+)\)',inline_url,css)+'</style>'
html=re.sub(r'<script\b([^>]*)>.*?</script>',lambda m:m.group(0) if 'application/ld+json' in m.group(1) else '',html,flags=re.S)
html=re.sub(r'<link\b[^>]*>',csslink,html)
html=re.sub(r'\bsrc="(/[^"]+)"',lambda m:'src="'+data(resource(m.group(1)))+'"',html)
html=re.sub(r'href="(/[^"#]*)"',lambda m:'href="https://wielegroup.com'+m.group(1)+'"',html)
html=html.replace('<head>','<head><meta name="robots" content="noindex,nofollow"/>')
# All styling and imagery is embedded. Nothing needs to load from the internet.
scenes=[data(root/'public/property'/name) for name in ['wiele-malta-residence-concept.webp','wiele-malta-apartments-concept.webp','wiele-malta-material-detail-concept.webp']]
script=r'''
const sceneImages=SCENE_IMAGES;
const sceneLabels=['Mediterranean residence','Contemporary architecture','Natural material study'];
const frames=document.querySelector('.cinema-scene');
sceneImages.slice(1).forEach(src=>{const frame=document.createElement('div');frame.className='cinema-frame';const image=document.createElement('img');image.src=src;image.alt='';image.style='position:absolute;inset:0;width:100%;height:100%';frame.append(image);frames.append(frame)});
let active=0,automatic=false,paused=false;
const buttons=[...document.querySelectorAll('.cinema-scenes button')];
function show(index){active=index;[...frames.children].forEach((f,i)=>f.classList.toggle('is-active',i===index));buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));document.querySelector('.cinema-count>span').textContent='0'+(index+1);document.querySelector('.cinema-caption>span').textContent=sceneLabels[index]+' · AI-created concept · not a property for sale'}
buttons.forEach((button,index)=>button.addEventListener('click',()=>{automatic=false;autoButton.textContent='Play slideshow';autoButton.setAttribute('aria-pressed','false');show(index)}));
const autoButton=document.querySelector('.cinema-caption details button');
autoButton.addEventListener('click',()=>{automatic=!automatic;autoButton.textContent=automatic?'Pause slideshow':'Play slideshow';autoButton.setAttribute('aria-pressed',String(automatic))});
setInterval(()=>{if(automatic&&!paused&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.querySelector('.cinema-hero').getBoundingClientRect().bottom>0)show((active+1)%3)},10000);
document.querySelectorAll('.motion-toggle,.experience-motion-control').forEach(button=>button.addEventListener('click',()=>{paused=!paused;document.documentElement.dataset.motionPaused=String(paused);document.querySelectorAll('.motion-toggle,.experience-motion-control').forEach(b=>{b.setAttribute('aria-pressed',String(paused));b.textContent=paused?'Resume motion':'Pause motion';b.setAttribute('aria-label',paused?'Resume decorative motion':'Pause decorative motion')})}));
const menu=document.querySelector('.mobile-navigation');
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus()}});
document.addEventListener('pointerdown',event=>{if(!menu.contains(event.target))menu.open=false});
const ranges=[...document.querySelectorAll('.scenario-field input')], defaults=[300000,1500,25000,3000,5];let downside=false;
const money=n=>new Intl.NumberFormat('en-MT',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const scenarioButtons=[...document.querySelectorAll('.scenario-actions button')];
function calculate(){const [price,rent,acquisition,costs,vacancy]=ranges.map(r=>+r.value);const scheduled=rent*(downside?.9:1)*12,empty=scheduled*vacancy/100,effective=scheduled-empty,operating=effective-costs,total=price+acquisition;document.querySelectorAll('.scenario-field output').forEach((o,i)=>{o.textContent=i===4?vacancy+'%':money(+ranges[i].value);ranges[i].setAttribute('aria-valuetext',o.textContent)});const yields=document.querySelectorAll('.scenario-yields strong');yields[0].textContent=(scheduled/price*100).toFixed(2)+'%';yields[1].textContent=(operating/total*100).toFixed(2)+'%';document.querySelectorAll('.scenario-ledger dd').forEach((dd,i)=>dd.textContent=(i===1||i===2?'−':'')+money([scheduled,empty,costs,operating,total][i]));const graphic=document.querySelector('.scenario-income-graphic');graphic.setAttribute('aria-label',`Scheduled annual rent ${money(scheduled)}, vacancy ${money(empty)}, operating costs ${money(costs)}, operating income ${money(operating)}`);graphic.querySelector('span').style.width=Math.max(0,operating)/Math.max(scheduled,1)*100+'%';graphic.querySelector('i').style.width=Math.min(costs,effective)/Math.max(scheduled,1)*100+'%';graphic.querySelector('b').style.width=vacancy+'%';scenarioButtons[0].setAttribute('aria-pressed',String(downside));scenarioButtons[0].textContent=downside?'Lower-rent scenario on':'Test 10% lower rent';document.querySelector('.scenario-result-top .eyebrow').textContent=downside?'Lower-rent illustration':'Your illustrative scenario'}
ranges.forEach(r=>r.addEventListener('input',calculate));scenarioButtons[0].addEventListener('click',()=>{downside=!downside;calculate()});scenarioButtons[1].addEventListener('click',()=>{ranges.forEach((r,i)=>r.value=defaults[i]);downside=false;calculate()});
document.querySelectorAll('.analytics-settings,.analytics-banner,.analytics-settings-trigger').forEach(e=>e.remove());
'''.replace('SCENE_IMAGES',json.dumps(scenes))
html=html.replace('</body>','<script>'+script+'</script></body>')
out=root.parent/'Wiele-Cinematic-Preview.html';out.write_text(html)
print(f'Created {out.name} ({out.stat().st_size:,} bytes); images, CSS and fonts embedded.')
