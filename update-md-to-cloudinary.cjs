const fs = require('fs');
const path = require('path');

// Load the cloudinary URLs mapping
const mappingFile = path.join(__dirname, 'cloudinary-urls.json');
if (!fs.existsSync(mappingFile)) {
  console.log('Error: cloudinary-urls.json not found. Run the upload script first.');
  process.exit(1);
}

const cloudinaryUrls = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Build a lookup map: original filename -> cloudinary URL
const urlMap = {};
cloudinaryUrls.forEach(item => {
  // Map by folder/filename
  const key = `${item.folder}/${item.original}`;
  urlMap[key] = item.cloudinary;
  
  // Also map just by filename for flexibility
  urlMap[item.original] = item.cloudinary;
});

console.log(`Loaded ${Object.keys(urlMap).length} Cloudinary URL mappings\n`);

// Content directories to scan for .md files
const contentDirs = [
  path.join(__dirname, 'src', 'content', 'network'),
  path.join(__dirname, 'src', 'content', 'farmerstories'),
  path.join(__dirname, 'src', 'content', 'news'),
  path.join(__dirname, 'src', 'content', 'resources'),
  path.join(__dirname, 'src', 'content', 'tools'),
  path.join(__dirname, 'src', 'content', 'videos'),
  path.join(__dirname, 'src', 'content', 'programs'),
];

// Source directories to scan for .ts/.tsx files
const srcDirs = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components'),
];

let filesUpdated = 0;
let imagesReplaced = 0;
let imagesSkipped = 0;

// Function to process files
function processFile(filePath, fileType) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const fileName = path.basename(filePath);
  
  // Find all image references like /images/folder/filename.ext
  const imagePattern = /\/images\/(network|farmerstories|news|resources|tools|banner)\/([^"\s\)\'\`]+)/g;
  
  content = content.replace(imagePattern, (match, folder, filename) => {
    const key = `${folder}/${filename}`;
    
    if (urlMap[key]) {
      console.log(`  ✓ ${fileName}: ${match} -> Cloudinary`);
      modified = true;
      imagesReplaced++;
      return urlMap[key];
    } else if (urlMap[filename]) {
      console.log(`  ✓ ${fileName}: ${match} -> Cloudinary`);
      modified = true;
      imagesReplaced++;
      return urlMap[filename];
    } else {
      console.log(`  - ${fileName}: ${match} - SKIPPED (not in Cloudinary)`);
      imagesSkipped++;
      return match;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    filesUpdated++;
  }
}

// Function to recursively get all files with specific extensions
function getFilesRecursively(dir, extensions) {
  let results = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      results.push(fullPath);
    }
  });
  
  return results;
}

console.log('=== Processing .md files ===\n');

// Process markdown files
contentDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    processFile(filePath, 'md');
  });
});

console.log('\n=== Processing .ts/.tsx files ===\n');

// Process TypeScript files
srcDirs.forEach(dir => {
  const files = getFilesRecursively(dir, ['.ts', '.tsx']);
  
  files.forEach(filePath => {
    processFile(filePath, 'ts');
  });
});

console.log(`\n========================================`);
console.log(`✓ Files updated: ${filesUpdated}`);
console.log(`✓ Images replaced: ${imagesReplaced}`);
console.log(`- Images skipped (not in Cloudinary): ${imagesSkipped}`);
