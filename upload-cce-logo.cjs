const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '239711925638228',
  api_secret: '2fVQ8xK3-8GoBYJ8ENygd7dBnDM'
});

async function upload() {
  try {
    const result = await cloudinary.uploader.upload('C:/Users/Admin/Pictures/Final/CCE_Logo_Stacked___WEB_Red_Modern.png', {
      folder: 'csf/logos',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto'
    });
    console.log('Uploaded:', result.public_id);
    console.log('URL:', result.secure_url);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

upload();