import sharp from 'sharp';
// Typography is outlined Cormorant Garamond and Manrope from the approved Wiele brand kit.
await sharp('assets-source/legal-compliance/share-card.svg').jpeg({quality:94}).toFile('public/property/og-legal-compliance-20261031.jpg');
console.log('Legal guide share card rendered from approved source artwork.');
