/**
 * Path Resolution Utility for CreatorCalcLab
 * 
 * Safely resolves all internal links, assets, and canonical URLs against Astro's
 * configured BASE_URL. Guarantees 0 broken links whether deployed to:
 * 1. Root custom domain (https://creatorcalclab.com/) -> base: '/'
 * 2. GitHub Pages repository subpath (https://ansaricorporation.github.io/Professional-calculators/) -> base: '/Professional-calculators/'
 * 3. Local development server (http://localhost:4321/)
 */

export function getPath(path: string = ''): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.replace(/\/$/, '');

  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getCanonicalUrl(canonicalPath: string = '', siteUrl: string = ''): string {
  const resolvedPath = getPath(canonicalPath);
  const baseDomain = (siteUrl || 'https://creatorcalclab.com').replace(/\/$/, '');
  return `${baseDomain}${resolvedPath}`;
}
