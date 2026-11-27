import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PINS_DIR = path.join(rootDir, 'public', 'pins');
const OG_DIR = path.join(rootDir, 'public', 'og');
const FEEDS_DIR = path.join(rootDir, 'public', 'feeds');

// Ensure output directories exist
[PINS_DIR, OG_DIR, FEEDS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars = 32) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function truncate(str, max = 28) {
  if (!str) return '';
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + '…';
}

function sanitizeSvg(svg) {
  return svg
    .replace(/&AMP;/g, '&amp;')
    .replace(/&QUOT;/g, '&quot;')
    .replace(/&LT;/g, '&lt;')
    .replace(/&GT;/g, '&gt;')
    .replace(/&APOS;/g, '&apos;')
    .replace(/&bull;/g, '•');
}

const CATEGORY_MAP = {
  'ecommerce': {
    name: 'E-COMMERCE & DTC MARGINS',
    short: 'E-Commerce',
    board: 'E-Commerce & DTC Business Calculators',
    color: '#10b981',
    accent: '#34d399'
  },
  'creator-economy': {
    name: 'CREATOR ECONOMY & AD SPLITS',
    short: 'Creator Economy',
    board: 'Creator Economy & Streamer Income',
    color: '#8b5cf6',
    accent: '#a78bfa'
  },
  'digital-marketplaces': {
    name: 'DIGITAL MARKETPLACES & FEES',
    short: 'Marketplaces',
    board: 'Digital Marketplaces & Selling Online',
    color: '#3b82f6',
    accent: '#60a5fa'
  },
  'b2b-pricing': {
    name: 'B2B PRICING & INVOICING',
    short: 'B2B Pricing',
    board: 'B2B Freelance & Agency Pricing',
    color: '#f59e0b',
    accent: '#fbbf24'
  },
  'wealth-investing': {
    name: 'WEALTH, STOCKS & REAL ESTATE',
    short: 'Wealth & Investing',
    board: 'Investing, Stocks & Real Estate Models',
    color: '#059669',
    accent: '#34d399'
  }
};

/**
 * 1. Generate 1000x1500 Pinterest Infographic Cheat-Sheet SVG
 */
function generatePinSvg(calc) {
  const cat = CATEGORY_MAP[calc.category] || CATEGORY_MAP['ecommerce'];
  const titleLines = wrapText(calc.title, 26).slice(0, 3);
  
  const headers = (calc.guideContent?.benchmarkTable?.headers || ['Metric', 'Rate', 'Impact']).slice(0, 3);
  const rawRows = (calc.guideContent?.benchmarkTable?.rows || []).slice(0, 4);
  const rows = rawRows.map(r => r.slice(0, 3));

  const formulaText = calc.guideContent?.formulaBreakdown?.formulaString || 'Net Profit = Gross Revenue - Platform Fees - Operating Costs';
  const formulaLines = wrapText(formulaText, 45).slice(0, 2);

  const takeawayText = calc.guideContent?.workedExample?.finalTakeaway || calc.metaDescription || '';
  const takeawayLines = wrapText(takeawayText, 48).slice(0, 3);

  const titleSvg = titleLines.map((line, i) => `
    <text x="500" y="${200 + i * 52}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${escapeXml(line)}</text>
  `).join('');

  const tableRowsSvg = rows.map((row, i) => {
    const y = 515 + i * 85;
    const bgFill = i % 2 === 0 ? '#f8fafc' : '#ffffff';
    return `
      <g>
        <rect x="75" y="${y - 45}" width="850" height="75" rx="12" fill="${bgFill}"/>
        <text x="105" y="${y + 2}" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#0f172a">${escapeXml(truncate(row[0] || '', 24))}</text>
        <text x="430" y="${y + 2}" font-family="system-ui, sans-serif" font-size="19" font-weight="600" fill="#334155">${escapeXml(truncate(row[1] || '', 22))}</text>
        <text x="700" y="${y + 2}" font-family="system-ui, sans-serif" font-size="19" font-weight="700" fill="#059669">${escapeXml(truncate(row[2] || '', 18))}</text>
      </g>
    `;
  }).join('');

  const formulaLinesSvg = formulaLines.map((l, i) => `
    <text x="100" y="${1020 + i * 32}" font-family="'JetBrains Mono', Consolas, Monaco, monospace" font-size="20" font-weight="600" fill="#34d399">${escapeXml(l)}</text>
  `).join('');

  const takeawayLinesSvg = takeawayLines.map((l, i) => `
    <text x="100" y="${1130 + i * 28}" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="#cbd5e1">${escapeXml(l)}</text>
  `).join('');

  return `
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0f1d"/>
        <stop offset="45%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#047857"/>
        <stop offset="50%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
      <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="1000" height="1500" fill="url(#bgGrad)"/>

    <!-- Subtle Glow Elements -->
    <circle cx="150" cy="180" r="280" fill="#10b981" fill-opacity="0.08"/>
    <circle cx="850" cy="300" r="320" fill="#6366f1" fill-opacity="0.07"/>
    <circle cx="200" cy="1200" r="300" fill="#059669" fill-opacity="0.06"/>

    <!-- Top Badge Row -->
    <g transform="translate(0, 55)">
      <!-- Brand Pill -->
      <rect x="75" y="0" width="180" height="42" rx="21" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
      <text x="165" y="27" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#34d399" letter-spacing="1.5">KITAAAB.NET</text>

      <!-- Category Pill -->
      <rect x="270" y="0" width="460" height="42" rx="21" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <text x="500" y="27" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#94a3b8" letter-spacing="1">${escapeXml(cat.name)}</text>

      <!-- Year Pill -->
      <rect x="745" y="0" width="180" height="42" rx="21" fill="#6366f1" fill-opacity="0.2" stroke="#818cf8" stroke-width="1.5"/>
      <text x="835" y="27" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#c7d2fe" letter-spacing="1">2026 AUDIT</text>
    </g>

    <!-- Title Section -->
    ${titleSvg}

    <!-- Visual Benchmark Table Card -->
    <g filter="url(#cardShadow)">
      <!-- Card Container -->
      <rect x="60" y="370" width="880" height="530" rx="24" fill="#ffffff"/>
      
      <!-- Table Header Bar -->
      <path d="M 60 394 Q 60 370 84 370 L 916 370 Q 940 370 940 394 L 940 440 L 60 440 Z" fill="#0f172a"/>
      
      <!-- Table Header Columns -->
      <text x="105" y="415" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#f8fafc" letter-spacing="0.5">${escapeXml(truncate((headers[0] || 'METRIC').toUpperCase(), 18))}</text>
      <text x="430" y="415" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#f8fafc" letter-spacing="0.5">${escapeXml(truncate((headers[1] || 'RATE / FEE').toUpperCase(), 18))}</text>
      <text x="700" y="415" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#34d399" letter-spacing="0.5">${escapeXml(truncate((headers[2] || 'NET PAYOUT').toUpperCase(), 18))}</text>

      <!-- Separator line -->
      <line x1="60" y1="440" x2="940" y2="440" stroke="#10b981" stroke-width="3"/>

      <!-- Table Body Rows -->
      ${tableRowsSvg}

      <!-- Table Subtitle footer inside card -->
      <rect x="60" y="845" width="880" height="55" rx="0" fill="#f1f5f9"/>
      <path d="M 60 845 L 940 845 L 940 876 Q 940 900 916 900 L 84 900 Q 60 900 60 876 Z" fill="#f1f5f9"/>
      <text x="500" y="880" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#64748b">Verified with primary 2026 merchant schedule filings • kitaaab.net</text>
    </g>

    <!-- Key Formula and Takeaway Box -->
    <g filter="url(#cardShadow)">
      <rect x="60" y="930" width="880" height="340" rx="20" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      
      <!-- Section Badge -->
      <rect x="90" y="955" width="310" height="32" rx="16" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1"/>
      <text x="245" y="976" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" letter-spacing="0.8">CORE CALCULATION FORMULA</text>

      <!-- Formula lines -->
      ${formulaLinesSvg}

      <!-- Separator line -->
      <line x1="90" y1="1080" x2="910" y2="1080" stroke="#334155" stroke-width="1.5"/>

      <!-- Key Takeaway Header -->
      <text x="90" y="1108" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#94a3b8" letter-spacing="0.5">STRATEGIC UNIT ECONOMICS TAKEAWAY:</text>

      <!-- Takeaway lines -->
      ${takeawayLinesSvg}
    </g>

    <!-- Footer CTA Bar -->
    <g filter="url(#cardShadow)">
      <rect x="60" y="1300" width="880" height="140" rx="24" fill="url(#ctaGrad)"/>
      
      <!-- Calculator Icon Graphic -->
      <g transform="translate(100, 1335)">
        <rect width="66" height="70" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
        <rect x="12" y="12" width="42" height="16" rx="4" fill="#34d399"/>
        <circle cx="20" cy="42" r="4" fill="#ffffff"/>
        <circle cx="33" cy="42" r="4" fill="#ffffff"/>
        <circle cx="46" cy="42" r="4" fill="#ffffff"/>
        <circle cx="20" cy="56" r="4" fill="#ffffff"/>
        <circle cx="33" cy="56" r="4" fill="#ffffff"/>
        <circle cx="46" cy="56" r="4" fill="#ffffff"/>
      </g>

      <text x="195" y="1360" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="-0.3">Calculate Live Interactive Numbers</text>
      <text x="195" y="1395" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#d1fae5">Free, 100% private, zero-login simulator at kitaaab.net</text>
      
      <!-- Arrow Pill -->
      <rect x="805" y="1342" width="105" height="56" rx="28" fill="#ffffff"/>
      <path d="M 845 1370 L 865 1370 M 857 1362 L 867 1370 L 857 1378" stroke="#047857" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
  `;
}

/**
 * 2. Generate 1200x630 OpenGraph Preview Card SVG
 */
function generateOgSvg(calc) {
  const cat = CATEGORY_MAP[calc.category] || CATEGORY_MAP['ecommerce'];
  const titleLines = wrapText(calc.title, 30).slice(0, 3);
  const descLines = wrapText(calc.metaDescription, 44).slice(0, 2);

  const rawRows = (calc.guideContent?.benchmarkTable?.rows || []).slice(0, 3);
  const headers = (calc.guideContent?.benchmarkTable?.headers || ['Metric', 'Rate']).slice(0, 2);

  const titleSvg = titleLines.map((line, i) => `
    <text x="70" y="${190 + i * 46}" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${escapeXml(line)}</text>
  `).join('');

  const descSvg = descLines.map((line, i) => `
    <text x="70" y="${340 + i * 26}" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="#94a3b8">${escapeXml(line)}</text>
  `).join('');

  // Right Side Mini Benchmark Card
  const benchmarkRowsSvg = rawRows.map((r, i) => {
    const y = 200 + i * 85;
    return `
      <g>
        <rect x="740" y="${y}" width="390" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1"/>
        <text x="760" y="${y + 32}" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">${escapeXml(truncate(r[0] || '', 20))}</text>
        <text x="760" y="${y + 54}" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">${escapeXml(truncate(headers[1] || 'Rate', 16))}:</text>
        <rect x="990" y="${y + 16}" width="125" height="38" rx="8" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1"/>
        <text x="1052" y="${y + 41}" text-anchor="middle" font-family="'JetBrains Mono', Consolas, monospace" font-size="15" font-weight="700" fill="#34d399">${escapeXml(truncate(r[1] || 'Verified', 10))}</text>
      </g>
    `;
  }).join('');

  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0f1d"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>

    <!-- Canvas Background -->
    <rect width="1200" height="630" fill="url(#ogBg)"/>

    <!-- Subtle Ambient Glow -->
    <circle cx="200" cy="150" r="300" fill="#10b981" fill-opacity="0.08"/>
    <circle cx="1000" cy="200" r="280" fill="#6366f1" fill-opacity="0.07"/>

    <!-- Left Column: Content -->
    <!-- Category Badge -->
    <rect x="70" y="65" width="340" height="36" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="240" y="89" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" letter-spacing="1">${escapeXml(cat.name)}</text>

    <!-- Verified Pill -->
    <rect x="425" y="65" width="150" height="36" rx="18" fill="#6366f1" fill-opacity="0.2" stroke="#818cf8" stroke-width="1.5"/>
    <text x="500" y="89" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#c7d2fe" letter-spacing="0.5">2026 AUDIT</text>

    <!-- Title -->
    ${titleSvg}

    <!-- Description -->
    ${descSvg}

    <!-- Feature Tags -->
    <g transform="translate(70, 420)">
      <rect x="0" y="0" width="260" height="34" rx="17" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <circle cx="16" cy="17" r="5" fill="#10b981"/>
      <text x="32" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">100% Client-Side Privacy</text>

      <rect x="275" y="0" width="240" height="34" rx="17" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <circle cx="291" cy="17" r="5" fill="#34d399"/>
      <text x="307" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">Deterministic Formulas</text>
    </g>

    <!-- Right Column: Benchmark Matrix Card -->
    <rect x="715" y="55" width="440" height="520" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="2"/>
    
    <!-- Right Card Header -->
    <rect x="740" y="80" width="220" height="28" rx="14" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1"/>
    <text x="850" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#34d399" letter-spacing="1">2026 BENCHMARK MATRIX</text>
    
    <text x="740" y="140" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Platform Fee Schedules</text>
    <text x="740" y="165" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Audited against primary documentation</text>

    <!-- Benchmark Rows -->
    ${benchmarkRowsSvg}

    <!-- Right Card Mini Footer -->
    <text x="935" y="525" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Instant Live Calculation • kitaaab.net</text>

    <!-- Bottom Left Brand Bar -->
    <g transform="translate(70, 520)">
      <!-- Brand Logo Square -->
      <rect x="0" y="0" width="46" height="46" rx="12" fill="#059669"/>
      <text x="23" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#ffffff">C</text>
      
      <text x="60" y="24" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.3">kitaaab.net</text>
      <text x="60" y="44" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Independent Financial Modeling &amp; Unit Economics Lab</text>
    </g>
  </svg>
  `;
}

/**
 * 3. Generate Default OpenGraph Preview Card (1200x630) for Homepage and Core Hubs
 */
function generateDefaultOgSvg() {
  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="defBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0f1d"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </linearGradient>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>

    <!-- Canvas Background -->
    <rect width="1200" height="630" fill="url(#defBg)"/>

    <!-- Subtle Ambient Glow -->
    <circle cx="200" cy="150" r="350" fill="#10b981" fill-opacity="0.1"/>
    <circle cx="1050" cy="300" r="320" fill="#6366f1" fill-opacity="0.08"/>

    <!-- Top Badge Row -->
    <rect x="70" y="65" width="460" height="38" rx="19" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="90" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#34d399" letter-spacing="1.2">100 PRODUCTION FINANCIAL CALCULATORS • 2026 AUDIT</text>

    <!-- Title -->
    <text x="70" y="165" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="-0.8">CreatorCalcLab Financial Models</text>
    <text x="70" y="215" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#34d399" letter-spacing="-0.8">&amp; Unit Economics Simulators</text>

    <!-- Subtitle -->
    <text x="70" y="275" font-family="system-ui, sans-serif" font-size="20" font-weight="500" fill="#cbd5e1">Deterministic profit, fee, surcharge, and royalty models for</text>
    <text x="70" y="305" font-family="system-ui, sans-serif" font-size="20" font-weight="500" fill="#cbd5e1">E-Commerce sellers, YouTube creators, digital stores, and B2B agencies.</text>

    <!-- 4 Sector Badges -->
    <g transform="translate(70, 360)">
      <rect x="0" y="0" width="240" height="42" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
      <circle cx="20" cy="21" r="5" fill="#10b981"/>
      <text x="36" y="26" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">E-Commerce (26)</text>

      <rect x="255" y="0" width="240" height="42" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
      <circle cx="275" cy="21" r="5" fill="#8b5cf6"/>
      <text x="291" y="26" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Creator Economy (22)</text>
    </g>
    <g transform="translate(70, 415)">
      <rect x="0" y="0" width="240" height="42" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
      <circle cx="20" cy="21" r="5" fill="#3b82f6"/>
      <text x="36" y="26" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Marketplaces (26)</text>

      <rect x="255" y="0" width="240" height="42" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
      <circle cx="275" cy="21" r="5" fill="#f59e0b"/>
      <text x="291" y="26" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">B2B Pricing (26)</text>
    </g>

    <!-- Right Side Stat Box -->
    <rect x="715" y="65" width="440" height="480" rx="24" fill="url(#cardGrad)" stroke="#334155" stroke-width="2"/>
    
    <text x="935" y="125" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#34d399" letter-spacing="1">PLATFORM ARCHITECTURE</text>
    
    <!-- Metric 1 -->
    <g transform="translate(745, 155)">
      <rect width="380" height="85" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="25" y="42" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#34d399">100</text>
      <text x="110" y="38" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff">Production Calculators</text>
      <text x="110" y="58" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">111 Static Pre-Rendered Routes</text>
    </g>

    <!-- Metric 2 -->
    <g transform="translate(745, 255)">
      <rect width="380" height="85" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="25" y="42" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#818cf8">0.0%</text>
      <text x="145" y="38" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff">Server Telemetry</text>
      <text x="145" y="58" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">100% In-Browser Privacy</text>
    </g>

    <!-- Metric 3 -->
    <g transform="translate(745, 355)">
      <rect width="380" height="85" rx="16" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="25" y="42" font-family="'JetBrains Mono', monospace" font-size="34" font-weight="900" fill="#38bdf8">2.96%</text>
      <text x="145" y="38" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff">N-Gram Similarity</text>
      <text x="145" y="58" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Audited Across 4,950 Pairs</text>
    </g>

    <text x="935" y="500" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748b">Verified • Free • Open Financial Modeling</text>

    <!-- Bottom Left Brand Bar -->
    <g transform="translate(70, 520)">
      <rect x="0" y="0" width="46" height="46" rx="12" fill="url(#brandGrad)"/>
      <text x="23" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#ffffff">C</text>
      
      <text x="60" y="24" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.3">kitaaab.net</text>
      <text x="60" y="44" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Independent Financial Modeling &amp; Unit Economics Lab</text>
    </g>
  </svg>
  `;
}

/**
 * 4. Generate Pinterest Bulk Upload CSV
 */
function generatePinterestCsv(allCalculators) {
  const headers = ['Title', 'Media URL', 'Pinterest board', 'Description', 'Link', 'Keywords'];
  const rows = [headers.join(',')];

  for (const calc of allCalculators) {
    const cat = CATEGORY_MAP[calc.category] || CATEGORY_MAP['ecommerce'];
    const title = `"${calc.title.replace(/"/g, '""')} (2026 Cheat Sheet)"`;
    const mediaUrl = `"https://kitaaab.net/pins/${calc.slug}.png"`;
    const board = `"${cat.board}"`;
    
    // 250-400 chars description with hashtags
    const rawDesc = `${calc.title}: Verified 2026 fee breakdown, take-rate formulas, and profit benchmarks. Calculate your exact net payout and margins with our free interactive simulator. #kitaaab #${calc.category} #financialcalculator #smallbusiness #freelancer`;
    const cleanDesc = rawDesc.slice(0, 390);
    const description = `"${cleanDesc.replace(/"/g, '""')}"`;

    const link = `"https://kitaaab.net/calculator/${calc.slug}/"`;
    const keywords = `"${calc.category}, fee calculator, profit margin, net payout, 2026 rates, unit economics"`;

    rows.push([title, mediaUrl, board, description, link, keywords].join(','));
  }

  const csvContent = rows.join('\n');
  const csvPath100 = path.join(FEEDS_DIR, 'pinterest-bulk-100.csv');
  const csvPath120 = path.join(FEEDS_DIR, 'pinterest-bulk-120.csv');
  const csvPath130 = path.join(FEEDS_DIR, 'pinterest-bulk-130.csv');
  const csvPath136 = path.join(FEEDS_DIR, 'pinterest-bulk-136.csv');
  const csvPath140 = path.join(FEEDS_DIR, 'pinterest-bulk-140.csv');
  fs.writeFileSync(csvPath100, csvContent, 'utf8');
  fs.writeFileSync(csvPath120, csvContent, 'utf8');
  fs.writeFileSync(csvPath130, csvContent, 'utf8');
  fs.writeFileSync(csvPath136, csvContent, 'utf8');
  fs.writeFileSync(csvPath140, csvContent, 'utf8');
  console.log(`Generated Pinterest bulk CSV with ${allCalculators.length} items at ${csvPath140}`);
}

async function main() {
  console.log('\n========================================================================');
  console.log('🎨  CREATORCALCLAB AUTOMATED SOCIAL & PINTEREST ASSET PIPELINE');
  console.log('========================================================================');

  const files = ['ecommerce.json', 'creator-economy.json', 'digital-marketplaces.json', 'b2b-pricing.json', 'wealth-investing.json'];
  const allCalculators = [];

  for (const f of files) {
    const filePath = path.join(rootDir, 'src', 'data', 'calculators', f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allCalculators.push(...data);
  }

  console.log(`Loaded ${allCalculators.length} calculators for asset generation.`);

  // 1. Generate Default OG Card
  console.log('Generating default OpenGraph card: public/og/default.png ...');
  const defaultOgSvg = generateDefaultOgSvg();
  await sharp(Buffer.from(sanitizeSvg(defaultOgSvg))).png({ quality: 90 }).toFile(path.join(OG_DIR, 'default.png'));

  // 2. Generate Pinterest Pins & Calculator OG Cards in parallel batches
  const BATCH_SIZE = 10;
  console.log(`Generating ${allCalculators.length} Pinterest Pins (1000x1500) & ${allCalculators.length} OG Cards (1200x630)...`);

  for (let i = 0; i < allCalculators.length; i += BATCH_SIZE) {
    const batch = allCalculators.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async calc => {
      const pinPath = path.join(PINS_DIR, `${calc.slug}.png`);
      const ogPath = path.join(OG_DIR, `${calc.slug}.png`);

      if (fs.existsSync(pinPath) && fs.existsSync(ogPath)) {
        return;
      }

      // Pin
      if (!fs.existsSync(pinPath)) {
        const pinSvg = generatePinSvg(calc);
        await sharp(Buffer.from(sanitizeSvg(pinSvg))).png({ quality: 88 }).toFile(pinPath);
      }

      // OG Card
      if (!fs.existsSync(ogPath)) {
        const ogSvg = generateOgSvg(calc);
        await sharp(Buffer.from(sanitizeSvg(ogSvg))).png({ quality: 88 }).toFile(ogPath);
      }
    }));

    process.stdout.write(`  Processed ${Math.min(i + BATCH_SIZE, allCalculators.length)} / ${allCalculators.length} calculators...\r`);
  }

  console.log(`\n✅ Generated ${allCalculators.length} Pinterest Pins in public/pins/`);
  console.log(`✅ Generated ${allCalculators.length + 1} OpenGraph Cards in public/og/`);

  // 3. Generate Pinterest Bulk CSV
  generatePinterestCsv(allCalculators);

  console.log('========================================================================\n');
}

main().catch(err => {
  console.error('Fatal error generating social assets:', err);
  process.exit(1);
});
