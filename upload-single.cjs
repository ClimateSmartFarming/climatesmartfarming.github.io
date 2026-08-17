const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '239711925638228',
  api_secret: '2fVQ8xK3-8GoBYJ8ENygd7dBnDM'
});

async function upload() {
  try {
    const result = await cloudinary.uploader.upload('C:/Users/Admin/Pictures/Final/Screen-Shot-2016-11-23-at-1.28.02-PM.png', {
      folder: 'csf/news',
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