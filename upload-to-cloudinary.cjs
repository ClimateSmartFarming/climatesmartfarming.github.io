const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '251528356599793',
  api_secret: '4fnZRmaEBb1j9HafhUqFIfYtFrY'
});

// Base directory for organized images
const baseDir = "C:\\Users\\Admin\\Pictures\\Network\\media_library_export-climate_smart_farming-2026_07_16_22_25_15\\media_library_export-climate_smart_farming-2026_07_16_22_25_15";

// Folders to upload
const folders = ['network', 'farmerstories', 'news', 'resources', 'tools', 'banner'];

// Function to get all image files from a folder
function getImageFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Folder not found: ${dir}`);
    return [];
  }
  
  const files = fs.readdirSync(dir);
  return files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
              .map(file => path.join(dir, file));
}

// Upload function
async function uploadImages() {
  const results = [];
  let totalUploaded = 0;
  
  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    const images = getImageFiles(folderPath);
    
    console.log(`\n=== ${folder.toUpperCase()} (${images.length} images) ===\n`);
    
    for (let i = 0; i < images.length; i++) {
      const imagePath = images[i];
      const fileName = path.basename(imagePath, path.extname(imagePath));
      
      // Create public_id: csf/folder/filename
      const publicId = `csf/${folder}/${fileName}`;
      
      console.log(`[${i + 1}/${images.length}] Uploading: ${path.basename(imagePath)}`);
      
      try {
        const result = await cloudinary.uploader.upload(imagePath, {
          public_id: publicId,
          overwrite: true,
          resource_type: 'image'
        });
        
        results.push({
          folder: folder,
          original: path.basename(imagePath),
          cloudinary: result.secure_url
        });
        
        console.log(`    ✓ Done`);
        totalUploaded++;
      } catch (error) {
        console.log(`    ✗ Error: ${error.message}`);
      }
    }
  }
  
  // Save mapping file
  const mappingFile = path.join(process.cwd(), 'cloudinary-urls.json');
  fs.writeFileSync(mappingFile, JSON.stringify(results, null, 2));
  
  console.log(`\n========================================`);
  console.log(`✓ Done! Total uploaded: ${totalUploaded}`);
  console.log(`URL mapping saved to: cloudinary-urls.json`);
}

uploadImages().catch(console.error);
