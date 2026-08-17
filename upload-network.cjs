const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '239711925638228',
  api_secret: '2fVQ8xK3-8GoBYJ8ENygd7dBnDM'
});

const uploads = [
  {
    file: 'C:/Users/Admin/Pictures/Final/Johannes.jpg',
    folder: 'csf/network'
  },
  {
    file: 'C:/Users/Admin/Pictures/Final/Kristin Benson_HeadShot.jpg',
    folder: 'csf/network'
  }
];

async function uploadAll() {
  for (const item of uploads) {
    try {
      const result = await cloudinary.uploader.upload(item.file, {
        folder: item.folder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: 'auto'
      });
      console.log('Uploaded:', result.public_id);
      console.log('URL:', result.secure_url);
      console.log('---');
    } catch (err) {
      console.error('Error uploading', item.file, ':', err.message);
    }
  }
}

uploadAll();