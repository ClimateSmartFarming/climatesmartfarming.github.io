const fs = require('fs');
const path = require('path');

const mdDir = 'C:\\Users\\Admin\\Documents\\CSF-React\\src\\content\\resources';
const tsFile = 'C:\\Users\\Admin\\Documents\\CSF-React\\src\\data\\resources.ts';

// Read all .md files and extract image/tags
const mdFiles = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
const resourceData = {};

console.log(`Found ${mdFiles.length} .md files\n`);

mdFiles.forEach(file => {
  let content = fs.readFileSync(path.join(mdDir, file), 'utf8');
  
  // Normalize line endings
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // The id is the filename without .md
  const id = file.replace('.md', '');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`  ✗ No frontmatter: ${file}`);
    return;
  }
  
  const frontmatter = frontmatterMatch[1];
  
  // Extract image
  const imageMatch = frontmatter.match(/image:\s*"([^"]+)"/);
  const image = imageMatch ? imageMatch[1] : null;
  
  // Extract tags
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
  let tags = [];
  if (tagsMatch) {
    // Parse tags array - handle both "tag" and 'tag' formats
    const tagsStr = tagsMatch[1];
    tags = tagsStr.match(/"[^"]+"|'[^']+'/g)?.map(t => t.slice(1, -1)) || [];
  }
  
  resourceData[id] = { image, tags, file };
  console.log(`  ${id}: ${tags.length} tags, image: ${image ? 'yes' : 'no'}`);
  
  // Remove tags line from .md file
  if (tagsMatch) {
    const newContent = content.replace(/tags:\s*\[.*?\]\n?/g, '');
    fs.writeFileSync(path.join(mdDir, file), newContent);
    console.log(`    → Removed tags from ${file}`);
  }
});

// Read and update resources.ts
console.log(`\nUpdating resources.ts...`);
let tsContent = fs.readFileSync(tsFile, 'utf8');

// For each resource found, add cardImage and tags
Object.entries(resourceData).forEach(([id, data]) => {
  // Escape special regex characters in id
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Find the resource block by id
  const resourceRegex = new RegExp(`(id:\\s*['"]${escapedId}['"][^}]*?)(,?\\s*\\})`, 's');
  const match = tsContent.match(resourceRegex);
  
  if (match) {
    let newFields = '';
    
    // Add cardImage if we have image data
    if (data.image) {
      newFields += `,\n    cardImage: "${data.image}"`;
    }
    
    // Add tags if we have them
    if (data.tags && data.tags.length > 0) {
      const tagsStr = data.tags.map(t => `"${t}"`).join(', ');
      newFields += `,\n    tags: [${tagsStr}]`;
    }
    
    if (newFields) {
      tsContent = tsContent.replace(resourceRegex, `$1${newFields}$2`);
      console.log(`  ✓ Updated: ${id}`);
    }
  } else {
    console.log(`  ✗ Not found in ts: ${id}`);
  }
});

// Write updated ts file
fs.writeFileSync(tsFile, tsContent);

console.log(`\n=== Complete ===`);
console.log(`Processed ${Object.keys(resourceData).length} resources`);
