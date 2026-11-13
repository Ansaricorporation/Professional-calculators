import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'creatorcalclab.com';
const BASE_URL = `https://${HOST}`;
const INDEXNOW_KEY = 'c4b8e2197f4a41d996d91bb3a2072e91';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// Read all calculators from JSON files
const categories = ['ecommerce', 'creator-economy', 'digital-marketplaces', 'b2b-pricing'];
const calculatorSlugs = [];

for (const cat of categories) {
  const filePath = path.join(rootDir, 'src', 'data', 'calculators', `${cat}.json`);
  if (fs.existsSync(filePath)) {
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    for (const item of rawData) {
      if (item.slug) {
        calculatorSlugs.push(item.slug);
      }
    }
  }
}

// Static Core and Category Pages
const staticUrls = [
  `${BASE_URL}/`,
  `${BASE_URL}/all-calculators/`,
  `${BASE_URL}/category/ecommerce/`,
  `${BASE_URL}/category/creator-economy/`,
  `${BASE_URL}/category/digital-marketplaces/`,
  `${BASE_URL}/category/b2b-pricing/`,
  `${BASE_URL}/about/`,
  `${BASE_URL}/contact/`,
  `${BASE_URL}/privacy-policy/`,
  `${BASE_URL}/terms/`
];

const calculatorUrls = calculatorSlugs.map(slug => `${BASE_URL}/calculator/${slug}/`);
const allUrls = [...staticUrls, ...calculatorUrls];

console.log(`\n========================================================================`);
console.log(`⚡  CREATORCALCLAB INDEXNOW BATCH SUBMISSION UTILITY`);
console.log(`========================================================================`);
console.log(`Host:          ${HOST}`);
console.log(`Key File:      ${KEY_LOCATION}`);
console.log(`Total URLs:    ${allUrls.length} (${staticUrls.length} static + ${calculatorUrls.length} calculators)`);
console.log(`------------------------------------------------------------------------`);

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls
};

async function submitIndexNow() {
  try {
    console.log(`Dispatching batch submission payload to https://api.indexnow.org/indexnow ...`);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow Submission Succeeded (HTTP ${response.status})!`);
      console.log(`All ${allUrls.length} URLs submitted to search engines (Bing, Yandex, Seznam, Naver).`);
    } else {
      const text = await response.text();
      console.warn(`⚠️  IndexNow API returned HTTP ${response.status}: ${text}`);
      console.log(`Note: Search engines will also discover URLs automatically via sitemap.xml.`);
    }
  } catch (err) {
    console.warn(`⚠️  IndexNow network request notice: ${err.message}`);
    console.log(`Payload prepared and validated. URLs remain accessible via sitemap.xml.`);
  }
  console.log(`========================================================================\n`);
}

submitIndexNow();
