 import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "evqzzm9k",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DIST = "C:/Users/Admin/Documents/CSF-React/dist";

const uploads = [
  { file: `${DIST}/carousel-2.JPG`, id: "csf/carousel/carousel-2" },
  { file: `${DIST}/carousel-3.jpeg`, id: "csf/carousel/carousel-3" },
  { file: `${DIST}/carousel-4.jpeg`, id: "csf/carousel/carousel-4" },
  { file: `${DIST}/carousel-5.JPG`, id: "csf/carousel/carousel-5" },
  { file: `${DIST}/csf-logo.png`, id: "csf/brand/csf-logo" },
  { file: `${DIST}/header-bg.jpg`, id: "csf/brand/header-bg" },

  { file: `${DIST}/images/farmerstories/1000025156-1.jpg`, id: "csf/farmerstories/1000025156-1" },
  { file: `${DIST}/images/farmerstories/Brian-McGarry-1.jpg`, id: "csf/farmerstories/Brian-McGarry-1" },
  { file: `${DIST}/images/farmerstories/cairy-calf.jpg`, id: "csf/farmerstories/cairy-calf" },
  { file: `${DIST}/images/farmerstories/D2S_0224-22-1.jpg`, id: "csf/farmerstories/D2S_0224-22-1" },
  { file: `${DIST}/images/farmerstories/Emily-McCarthy-headshot-1.jpg`, id: "csf/farmerstories/Emily-McCarthy-headshot-1" },
  { file: `${DIST}/images/farmerstories/Ficken-Family-New-Moon-Farms-20221003_104930-800x963-1-1.jpg`, id: "csf/farmerstories/Ficken-Family-New-Moon-Farms" },
  { file: `${DIST}/images/farmerstories/IMG_2496-1.jpeg`, id: "csf/farmerstories/IMG_2496-1" },
  { file: `${DIST}/images/farmerstories/IMG_5135-1.jpeg`, id: "csf/farmerstories/IMG_5135-1" },
  { file: `${DIST}/images/farmerstories/rick-villnave-farm.jpeg`, id: "csf/farmerstories/rick-villnave-farm" },
  { file: `${DIST}/images/farmerstories/Screenshot-2026-01-03-at-2.06.06-PM.png`, id: "csf/farmerstories/Screenshot-2026-01-03" },
  { file: `${DIST}/images/farmerstories/Screenshot-2026-01-12-at-7.16.01-PM.png`, id: "csf/farmerstories/Screenshot-2026-01-12" },
  { file: `${DIST}/images/farmerstories/tim-4379-3_pp-1.jpg`, id: "csf/farmerstories/tim-4379-3_pp-1" },
  { file: `${DIST}/images/farmerstories/tim-terry-cow.jpg`, id: "csf/farmerstories/tim-terry-cow" },
  { file: `${DIST}/images/farmerstories/UNY-Spec-Emily-Kenny-cover-crops-20230926-004.jpeg`, id: "csf/farmerstories/UNY-Spec-Emily-Kenny-cover-crops" },
];

for (const { file, id } of uploads) {
  try {
    const res = await cloudinary.uploader.upload(file, { public_id: id, overwrite: true });
    console.log(`${id}\n  -> ${res.secure_url}\n`);
  } catch (err) {
    console.error(`FAILED ${file}: ${err.message}`);
  }
}