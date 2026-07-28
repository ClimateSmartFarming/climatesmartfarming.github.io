const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '251528356599793',
  api_secret: '4fnZRmaEBb1j9HafhUqFIfYtFrY'
});

const sourceDir = "C:\\Users\\Admin\\Pictures\\Recourse-extra";

async function uploadImages() {
  const files = fs.readdirSync(sourceDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  
  console.log(`Found ${files.length} images to upload\n`);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(sourceDir, file);
    const fileName = path.basename(file, path.extname(file));
    const publicId = `csf/resources/${fileName}`;
    
    console.log(`[${i + 1}/${files.length}] Uploading: ${file}`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image'
      });
      
      console.log(`    ✓ ${result.secure_url}`);
    } catch (error) {
      console.log(`    ✗ Error: ${error.message}`);
    }
  }
  
  console.log(`\n=== Complete ===`);
}

uploadImages().catch(console.error);
