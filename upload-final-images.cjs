const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'evqzzm9k',
  api_key: '239711925638228',
  api_secret: '2fVQ8xK3-8GoBYJ8ENygd7dBnDM'
});

const uploads = [
  {
    file: 'C:/Users/Admin/Pictures/Final/Screenshot-2025-09-04-at-4.40.36-PM.png',
    folder: 'csf/news'
  },
  {
    file: 'C:/Users/Admin/Pictures/Final/Screenshot-2024-06-12-at-8.47.47-AM.png',
    folder: 'csf/news'
  },
  {
    file: 'C:/Users/Admin/Pictures/Final/Screenshot-2024-08-09-at-4.07.01-PM.png',
    folder: 'csf/news'
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