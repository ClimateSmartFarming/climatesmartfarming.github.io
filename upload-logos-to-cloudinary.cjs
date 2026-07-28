const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '251528356599793',
  api_secret: '4fnZRmaEBb1j9HafhUqFIfYtFrY'
});

const logosDir = "C:\\Users\\Admin\\Pictures\\logos";

async function uploadLogos() {
  const files = fs.readdirSync(logosDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  
  console.log(`Found ${files.length} logos to upload\n`);
  
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(logosDir, file);
    const fileName = path.basename(file, path.extname(file));
    const publicId = `csf/logos/${fileName}`;
    
    console.log(`[${i + 1}/${files.length}] Uploading: ${file}`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image'
      });
      
      results.push({
        folder: 'logos',
        original: file,
        cloudinary: result.secure_url
      });
      
      console.log(`    ✓ ${result.secure_url}`);
    } catch (error) {
      console.log(`    ✗ Error: ${error.message}`);
    }
  }
  
  // Append to existing cloudinary-urls.json
  const mappingFile = path.join(__dirname, 'cloudinary-urls.json');
  let existingUrls = [];
  if (fs.existsSync(mappingFile)) {
    existingUrls = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
  }
  
  // Add new results
  const allUrls = [...existingUrls, ...results];
  fs.writeFileSync(mappingFile, JSON.stringify(allUrls, null, 2));
  
  console.log(`\n=== Complete ===`);
  console.log(`Uploaded: ${results.length} logos`);
  console.log(`Total URLs in mapping: ${allUrls.length}`);
}

uploadLogos().catch(console.error);
