// Script to import Storyblok components via API
// Usage: STORYBLOK_SPACE_ID=your_space_id STORYBLOK_TOKEN=your_management_token node scripts/import-components.js

import fs from 'fs';
import https from 'https';

const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const TOKEN = process.env.STORYBLOK_TOKEN; // Personal Access Token from Account Settings

if (!SPACE_ID || !TOKEN) {
  console.error('❌ Missing environment variables!');
  console.error('Usage: STORYBLOK_SPACE_ID=123456 STORYBLOK_TOKEN=your_token node scripts/import-components.js');
  console.error('\nGet your token from: https://app.storyblok.com/#/me/account?tab=token');
  process.exit(1);
}

const components = JSON.parse(fs.readFileSync('./storyblok-components.json', 'utf8'));

async function createComponent(component) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ component });

    const options = {
      hostname: 'mapi.storyblok.com',
      port: 443,
      path: `/v1/spaces/${SPACE_ID}/components/?token=${TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to create ${component.name}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log(`📦 Importing ${components.components.length} components to space ${SPACE_ID}...\n`);

  for (const component of components.components) {
    try {
      await createComponent(component);
      console.log(`✅ Created: ${component.display_name} (${component.name})`);
    } catch (error) {
      console.error(`❌ Failed: ${component.display_name} - ${error.message}`);
    }
  }

  console.log('\n✨ Import complete!');
}

main();
