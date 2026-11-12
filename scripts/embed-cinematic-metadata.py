"""Embed descriptive XMP in new WebP copies without re-encoding image pixels."""
from pathlib import Path
import struct, hashlib, json
from xml.sax.saxutils import escape
from PIL import Image
root=Path(__file__).resolve().parents[1]
folder=root/'public/property'
items=[
 ('premium-residence.webp','wiele-malta-residence-concept.webp','Mediterranean residence concept | Wiele Investments','AI-created Mediterranean residence and pool concept for Wiele Investments, Malta investment real estate. Fictional architecture; not an actual property, location, completed project or property for sale.','Wiele Investments / OpenAI image generation','AI-created architectural concept'),
 ('modern-malta-apartments-concept.webp','wiele-malta-apartments-concept.webp','Contemporary apartment concept | Wiele Investments','AI-created Malta-inspired limestone apartment architecture for Wiele Investments. Fictional concept; not an actual building, documented Malta location or advertised property.','Wiele Investments / OpenAI image generation','AI-created architectural concept'),
 ('premium-detail.webp','wiele-malta-material-detail-concept.webp','Natural material study | Wiele Investments','AI-created limestone and natural interior material study for Wiele Investments, Malta property marketing and maintenance. Decorative fictional concept; not a completed project or property for sale.','Wiele Investments / OpenAI image generation','AI-created material concept'),
 ('premium-interior.webp','wiele-mediterranean-interior-concept.webp','Mediterranean interior concept | Wiele Investments','AI-created Mediterranean interior concept for Wiele Investments, serving Malta property buyers and owners. Fictional interior and outlook; not an actual property or available listing.','Wiele Investments / OpenAI image generation','AI-created interior concept'),
 ('malta-harbour.webp','wiele-valletta-waterfront.webp','Valletta waterfront, Malta | Wiele Investments','Valletta waterfront and skyline across the harbour in Malta. Photograph by Ludovica Dri on Unsplash. Location photography, not a Wiele property listing.','Ludovica Dri','Location photograph / Unsplash Licence'),
]
ledger=[]
for original,name,title,description,creator,classification in items:
 source=folder/original;raw=source.read_bytes();assert raw[:4]==b'RIFF' and raw[8:12]==b'WEBP'
 chunks=[];pos=12
 while pos<len(raw):
  kind=raw[pos:pos+4];length=struct.unpack('<I',raw[pos+4:pos+8])[0];body=raw[pos+8:pos+8+length];pos+=8+length+(length%2)
  if kind!=b'XMP ':chunks.append((kind,body))
 image=Image.open(source);before=hashlib.sha256(image.tobytes()).hexdigest();width,height=image.size
 if chunks[0][0]==b'VP8X':
  head=bytearray(chunks[0][1]);head[0]|=4;chunks[0]=(b'VP8X',bytes(head))
 else:
  flags=4|(16 if 'A' in image.mode else 0)
  chunks.insert(0,(b'VP8X',bytes([flags,0,0,0])+(width-1).to_bytes(3,'little')+(height-1).to_bytes(3,'little')))
 keywords=['Wiele Investments','Malta investment real estate','Malta property',classification]
 xmp=f'''<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"><dc:title><rdf:Alt><rdf:li xml:lang="x-default">{escape(title)}</rdf:li></rdf:Alt></dc:title><dc:description><rdf:Alt><rdf:li xml:lang="x-default">{escape(description)}</rdf:li></rdf:Alt></dc:description><dc:creator><rdf:Seq><rdf:li>{escape(creator)}</rdf:li></rdf:Seq></dc:creator><dc:subject><rdf:Bag>{''.join('<rdf:li>'+escape(k)+'</rdf:li>' for k in keywords)}</rdf:Bag></dc:subject><dc:rights><rdf:Alt><rdf:li xml:lang="x-default">{escape(classification)}. See https://wielegroup.com/credits for attribution and usage context.</rdf:li></rdf:Alt></dc:rights><xmp:MetadataDate>2026-11-12</xmp:MetadataDate><Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource"><Iptc4xmpCore:CiUrlWork>https://wielegroup.com/</Iptc4xmpCore:CiUrlWork></Iptc4xmpCore:CreatorContactInfo></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>'''.encode()
 chunks.append((b'XMP ',xmp))
 payload=b'WEBP'+b''.join(kind+struct.pack('<I',len(body))+body+(b'\x00' if len(body)%2 else b'') for kind,body in chunks)
 dest=folder/name;dest.write_bytes(b'RIFF'+struct.pack('<I',len(payload))+payload)
 assert hashlib.sha256(Image.open(dest).tobytes()).hexdigest()==before,'Pixel content changed'
 assert b'dc:description' in dest.read_bytes()
 ledger.append(dict(source=original,file=name,title=title,description=description,creator=creator,classification=classification,width=width,height=height,pixel_sha256=before))
(folder/'cinematic-image-metadata.json').write_text(json.dumps(ledger,indent=2)+'\n')
print('PASS embedded XMP in',len(items),'new WebP copies; original files and decoded pixels preserved.')
