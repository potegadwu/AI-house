const fs = require('fs');

const files = ['index.html', 'en/index.html'];

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // Regex to match the h3 containing the text-cap span followed by another span
    const regex = /(<h3>\s*<span class="text-cap"[^>]*>.*?<\/span>)\s*<span[^>]*>.*?<\/span>\s*(<\/h3>)/g;
    
    const newContent = content.replace(regex, '$1$2');

    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }

  } catch (err) {
    console.error(`Error updating ${file}:`, err);
  }
}
