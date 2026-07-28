const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '251528356599793',
  api_secret: '4fnZRmaEBb1j9HafhUqFIfYtFrY'
});

const projectDir = __dirname;
const publicImagesDir = path.join(projectDir, 'public', 'images');

// Load existing cloudinary URLs mapping (if exists)
const mappingFile = path.join(projectDir, 'cloudinary-urls.json');
let cloudinaryUrls = [];
const existingUrls = new Set();

if (fs.existsSync(mappingFile)) {
  cloudinaryUrls = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  cloudinaryUrls.forEach(item => {
    existingUrls.add(`${item.folder}/${item.original}`);
    existingUrls.add(item.original);
  });
  console.log(`Loaded ${existingUrls.size} existing Cloudinary images\n`);
}

// Content directories to scan for .md files
const contentDirs = [
  path.join(projectDir, 'src', 'content', 'network'),
  path.join(projectDir, 'src', 'content', 'farmerstories'),
  path.join(projectDir, 'src', 'content', 'news'),
  path.join(projectDir, 'src', 'content', 'resources'),
  path.join(projectDir, 'src', 'content', 'tools'),
  path.join(projectDir, 'src', 'content', 'videos'),
  path.join(projectDir, 'src', 'content', 'programs'),
];

// Source directories to scan for .ts/.tsx files
const srcDirs = [
  path.join(projectDir, 'src', 'pages'),
  path.join(projectDir, 'src', 'components'),
];

// Function to recursively get all files with specific extensions
function getFilesRecursively(dir, extensions) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
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

// Find all image references in files
function findImageReferences() {
  const images = new Set();
  const imagePattern = /\/images\/(network|farmerstories|news|resources|tools|banner)\/([^"\s\)\'\`\n]+)/g;
  
  // Scan .md files
  contentDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      let match;
      while ((match = imagePattern.exec(content)) !== null) {
        images.add({ folder: match[1], filename: match[2], fullPath: match[0] });
      }
    });
  });
  
  // Scan .ts/.tsx files
  srcDirs.forEach(dir => {
    const files = getFilesRecursively(dir, ['.ts', '.tsx']);
    files.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      let match;
      while ((match = imagePattern.exec(content)) !== null) {
        images.add({ folder: match[1], filename: match[2], fullPath: match[0] });
      }
    });
  });
  
  return Array.from(images);
}

// Upload missing images to Cloudinary
async function uploadMissingImages() {
  const imageRefs = findImageReferences();
  console.log(`Found ${imageRefs.length} image references in code\n`);
  
  let uploaded = 0;
  let skipped = 0;
  let notFound = 0;
  
  for (const img of imageRefs) {
    const key = `${img.folder}/${img.filename}`;
    
    // Skip if already in Cloudinary
    if (existingUrls.has(key) || existingUrls.has(img.filename)) {
      console.log(`  - SKIP (already in Cloudinary): ${key}`);
      skipped++;
      continue;
    }
    
    // Check if file exists in public/images
    const localPath = path.join(publicImagesDir, img.folder, img.filename);
    
    if (!fs.existsSync(localPath)) {
      console.log(`  ✗ NOT FOUND locally: ${localPath}`);
      notFound++;
      continue;
    }
    
    // Upload to Cloudinary
    const publicId = `csf/${img.folder}/${path.basename(img.filename, path.extname(img.filename))}`;
    
    console.log(`  ↑ Uploading: ${key}`);
    
    try {
      const result = await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image'
      });
      
      // Add to mapping
      cloudinaryUrls.push({
        folder: img.folder,
        original: img.filename,
        cloudinary: result.secure_url
      });
      
      existingUrls.add(key);
      existingUrls.add(img.filename);
      
      console.log(`    ✓ Done: ${result.secure_url}`);
      uploaded++;
    } catch (error) {
      console.log(`    ✗ Error: ${error.message}`);
    }
  }
  
  // Save updated mapping
  fs.writeFileSync(mappingFile, JSON.stringify(cloudinaryUrls, null, 2));
  
  console.log(`\n========================================`);
  console.log(`✓ Uploaded: ${uploaded}`);
  console.log(`- Skipped (already in Cloudinary): ${skipped}`);
  console.log(`✗ Not found locally: ${notFound}`);
  console.log(`\nMapping saved to: cloudinary-urls.json`);
}

uploadMissingImages().catch(console.error);
