const https = require('https');

const logos = [
    { name: 'NRCC-banner', url: 'https://res.cloudinary.com/evqzzm9k/image/upload/fl_getinfo/v1784697147/csf/logos/NRCC-banner.png' },
    { name: 'CCE_Logo_Stacked', url: 'https://res.cloudinary.com/evqzzm9k/image/upload/fl_getinfo/v1786510232/csf/logos/CCE_Logo_Stacked___WEB_Red_Modern.png' },
    { name: 'NYSoilHealthLogo', url: 'https://res.cloudinary.com/evqzzm9k/image/upload/fl_getinfo/v1784746364/csf/logos/NYSoilHealthLogo.png' },
    { name: 'ai-leaf-full-logo', url: 'https://res.cloudinary.com/evqzzm9k/image/upload/fl_getinfo/v1784686264/csf/logos/ai-leaf-full-logo.png' },
    { name: 'NEclimatehub1', url: 'https://res.cloudinary.com/evqzzm9k/image/upload/fl_getinfo/v1784696809/csf/logos/NEclimatehub1.png' }
];

logos.forEach(logo => {
    https.get(logo.url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const info = JSON.parse(data);
                console.log(`${logo.name}: ${info.input.width}x${info.input.height}`);
            } catch(e) {
                console.log(`${logo.name}: Error parsing`);
            }
        });
    }).on('error', (e) => {
        console.log(`${logo.name}: Error - ${e.message}`);
    });
});