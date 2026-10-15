const fs = require('fs');
const path = require('path');

const replacements = [
  // Header
  { from: /h-20/g, to: 'h-16' },
  { from: /text-4xl font-black tracking-tighter/g, to: 'text-3xl font-black tracking-tighter' },
  
  // Footer
  { from: /text-\[80px\] md:text-\[140px\]/g, to: 'text-6xl md:text-8xl' },
  
  // Hero
  { from: /min-h-\[85vh\]/g, to: 'min-h-[70vh]' },
  
  // Component Heights & Padding
  { from: /h-\[400px\]/g, to: 'h-[300px]' }, // any lingering 400px
  { from: /h-\[300px\]/g, to: 'h-[250px]' }, // scale 300px to 250px
  { from: /min-h-\[300px\]/g, to: 'min-h-[250px]' },
  { from: /min-h-\[200px\]/g, to: 'min-h-[150px]' },
  { from: /py-20/g, to: 'py-12' },
  { from: /py-16/g, to: 'py-10' },
  { from: /p-6/g, to: 'p-4' }, // tighter card padding
  
  // Product Page specific
  { from: /p-12/g, to: 'p-8' },
  { from: /py-24/g, to: 'py-16' },
  { from: /rounded-\[2rem\]/g, to: 'rounded-2xl' }, // tighten borders further
  { from: /rounded-\[3rem\]/g, to: 'rounded-2xl' },
  
  // Layout Gaps
  { from: /gap-16/g, to: 'gap-10' },
  { from: /gap-12/g, to: 'gap-8' },
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
      const originalContent = content;
      
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
