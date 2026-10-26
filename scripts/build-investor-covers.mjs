import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const output = 'assets-source/social-pages/investor-2026-10-26';
await mkdir(output, { recursive: true });
const scene = 'public/property/premium-residence.webp';
const wordmark = 'public/property-identity/launch/wiele-wordmark-gold.webp';
async function cover({ width, height, photoWidth, logoWidth, logoTop, font, line1, line2, audience1, audience2, out }) {
 const centre = photoWidth + (width-photoWidth)/2;
 const field = Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#17332e"/></svg>`);
 const photo = await sharp(scene).resize(photoWidth,height,{fit:'cover',position:'centre'}).modulate({brightness:.76}).toBuffer();
 const logo = await sharp(wordmark).resize(logoWidth).toBuffer();
 const text = Buffer.from(`<svg width="${width}" height="${height}"><g fill="#f8f5ef" text-anchor="middle"><text x="${centre}" y="${line1}" font-family="Georgia,serif" font-size="${font}">Property with purpose.</text><text x="${centre}" y="${line2}" font-family="Georgia,serif" font-style="italic" font-size="${font}">Income in focus.</text><text x="${centre}" y="${audience1}" font-family="Arial,sans-serif" font-size="${font*.36}">Malta investment property</text><text x="${centre}" y="${audience2}" font-family="Arial,sans-serif" font-size="${font*.3}">International investors &amp; consortiums</text></g><text x="${photoWidth/2}" y="${height-24}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${height*.024}" fill="#f8f5ef">AI-created architectural concept · Not a property listing</text></svg>`);
 await sharp(field).composite([{input:photo,left:0,top:0},{input:logo,left:Math.round(centre-logoWidth/2),top:logoTop},{input:text,left:0,top:0}]).jpeg({quality:94}).toFile(`${output}/${out}`);
}
await cover({width:4200,height:700,photoWidth:1800,logoWidth:730,logoTop:48,font:108,line1:350,line2:460,audience1:555,audience2:615,out:'linkedin-investor-cover.jpg'});
await cover({width:1702,height:630,photoWidth:760,logoWidth:400,logoTop:65,font:65,line1:315,line2:390,audience1:465,audience2:510,out:'facebook-investor-cover.jpg'});
console.log(output);
