const fs = require('fs');
const { execSync } = require('child_process');

// Run build command
console.log('Building extension...');
execSync('npm run build', { stdio: 'inherit' });

// Copy manifest and assets
console.log('Copying manifest and assets...');
fs.copyFileSync('./public/manifest.json', './dist/manifest.json');

// Create assets directory if it doesn't exist
if (!fs.existsSync('./dist/assets')) {
  fs.mkdirSync('./dist/assets');
}

// Copy icons
console.log('Copying icons...');
if (fs.existsSync('./public/assets/icon16.png')) {
  fs.copyFileSync('./public/assets/icon16.png', './dist/assets/icon16.png');
}
if (fs.existsSync('./public/assets/icon48.png')) {
  fs.copyFileSync('./public/assets/icon48.png', './dist/assets/icon48.png');
}
if (fs.existsSync('./public/assets/icon128.png')) {
  fs.copyFileSync('./public/assets/icon128.png', './dist/assets/icon128.png');
}

// Copy content script
console.log('Copying content script...');
fs.copyFileSync('./public/content.js', './dist/content.js');

console.log('Build completed! The extension is ready in the dist directory.');