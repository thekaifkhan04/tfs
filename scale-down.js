const fs = require('fs');
const path = require('path');

const replacements = [
  // Typography
  { from: /text-8xl/g, to: 'text-6xl' },
  { from: /text-7xl/g, to: 'text-5xl' },
  { from: /text-6xl/g, to: 'text-4xl' },
  { from: /text-5xl/g, to: 'text-4xl' },
  { from: /text-4xl/g, to: 'text-3xl' },
  // Layout Paddings
  { from: /py-32/g, to: 'py-20' },
  { from: /py-24/g, to: 'py-16' },
  // Heights
  { from: /h-\[500px\]/g, to: 'h-[400px]' },
  { from: /h-\[400px\]/g, to: 'h-[300px]' },
  // Border radius
  { from: /rounded-\[3rem\]/g, to: 'rounded-[2rem]' },
  { from: /rounded-\[2rem\]/g, to: 'rounded-3xl' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(({ from, to }) => {
        content = content.replace(from, to);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory('./app/(store)');
processDirectory('./components');
