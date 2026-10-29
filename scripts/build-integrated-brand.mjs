import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root='/Users/jonathanlandman/Documents/Wiele Properties/Brand/2026-10-29-integrated-logo';
const image='public/property/modern-malta-apartments-concept.webp';
const master=await fs.readFile(path.join(root,'wiele-properties-malta-reverse.svg'));
const ink='#171a19';
async function cover(file,w,h,logoX,logoY,logoW,photoX){
 const photoW=w-photoX;
 const photo=await sharp(image).resize(photoW,h,{fit:'cover',position:'centre'}).jpeg({quality:94}).toBuffer();
 const logo=await sharp(master).resize(logoW).png().toBuffer();
 await sharp({create:{width:w,height:h,channels:3,background:ink}}).composite([{input:photo,left:photoX,top:0},{input:logo,left:logoX,top:logoY}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toFile(path.join(root,file));
}
await cover('linkedin-cover-4200x700.jpg',4200,700,1040,65,1180,2440);
await cover('facebook-cover-1702x630.jpg',1702,630,280,110,750,1110);
await cover('website-share-1200x630.jpg',1200,630,52,168,610,730);
// Instagram square: clean charcoal lower panel keeps the entire slogan legible.
const scene=await sharp(image).resize(1080,640,{fit:'cover'}).toBuffer();
const logo=await sharp(master).resize(850).toBuffer();
await sharp({create:{width:1080,height:1080,channels:3,background:ink}}).composite([{input:scene,left:0,top:0},{input:logo,left:115,top:680}]).jpeg({quality:95}).toFile(path.join(root,'instagram-brand-1080x1080.jpg'));
const mono=await sharp(path.join(root,'wiele-properties-malta-monogram-reverse.svg')).resize(600).png().toBuffer();
await sharp({create:{width:800,height:800,channels:3,background:ink}}).composite([{input:mono,left:100,top:100}]).png().toFile(path.join(root,'social-avatar-800.png'));
await fs.copyFile(path.join(root,'website-share-1200x630.jpg'),'public/property/og-integrated-malta.jpg');
console.log('Matching platform artwork exported from a single master.');

for (const size of [32,64,180]) await sharp(path.join(root,'social-avatar-800.png')).resize(size,size).png().toFile(`public/property-identity/integrated/icon-${size}.png`);
