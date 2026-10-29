import sharp from 'sharp';
import { readFile,copyFile } from 'node:fs/promises';
const dir='assets-source/social-pages/global-ambition-2026-10-29';
for(const c of JSON.parse(await readFile(`${dir}/layout.json`,'utf8'))){
 const layers=[];
 if(c.photo)layers.push({input:await sharp('public/property/apartment-exterior.webp').resize(c.photo,c.height,{fit:'cover'}).modulate({brightness:.7}).toBuffer(),left:0,top:0});
 layers.push({input:await sharp('public/property-identity/launch/wiele-wordmark-gold.webp').resize(c.logo).toBuffer(),left:Math.round(c.cx-c.logo/2),top:c.top});
 layers.push({input:await readFile(`${dir}/${c.name}-type.svg`),left:0,top:0});
 await sharp({create:{width:c.width,height:c.height,channels:3,background:'#171a19'}}).composite(layers).jpeg({quality:95}).toFile(`${dir}/${c.name}-global-ambition.jpg`);
}
await copyFile(`${dir}/share-global-ambition.jpg`,'public/property/og-global-ambition.jpg');
console.log(dir);
