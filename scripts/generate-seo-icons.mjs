import sharp from 'sharp';

async function createIcon(size, output) {
  const radius = Math.round(size * 0.2);
  const fontSize = Math.round(size * 0.36);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#315EFB" />
          <stop offset="1" stop-color="#15213A" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${radius}" fill="url(#gradient)" />
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="white">CT</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile(output);
}

await Promise.all([
  createIcon(180, 'public/apple-touch-icon.png'),
  createIcon(512, 'public/icon-512.png'),
]);
