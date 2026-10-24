import sharp from 'sharp';
const dir='public/property-identity/editorial/';
for(const name of ['forest','ivory','champagne','black'])await sharp(dir+`wiele-property-primary-${name}.svg`).resize(1800,740).png().toFile(dir+`wiele-property-primary-${name}.png`);
await sharp('assets-source/property-identity/identity-preview.svg').png().toFile('assets-source/property-identity/identity-preview.png');
for(const [file,size]of [['apple-touch-icon.png',180],['favicon-16x16.png',16],['favicon-32x32.png',32],['icon-192.png',192],['icon-512.png',512]])await sharp(dir+'favicon.svg').resize(size,size).png().toFile('public/'+file);
const bg=await sharp('public/property/premium-residence.webp').resize(1200,630,{fit:'cover'}).modulate({brightness:.36}).toBuffer();
const logo=await sharp(dir+'wiele-property-primary-ivory.svg').resize(650).toBuffer();
await sharp(bg).composite([{input:logo,gravity:'centre'}]).jpeg({quality:88}).toFile('public/property/og-property-editorial.jpg');
await sharp('public/property/og-property-editorial.jpg').png().toFile('public/og-image.png');
