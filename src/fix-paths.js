const fs = require('fs');
const files = ['build/index.html', 'build/404.html'];
const jsFile = 'main.7035b682.js';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/main\.js/g, jsFile);
  fs.writeFileSync(file, content);
});