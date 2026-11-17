/**
 * Path Resolution Utility for CreatorCalcLab
 * 
 * Safely resolves all internal links, assets, and canonical URLs against Astro's
 * configured BASE_URL. Guarantees 0 broken links whether deployed to:
 * 1. Root custom domain (https://kitaaab.net/) -> base: '/'
 * 2. GitHub Pages repository subpath -> base: '/Professional-calculators/'
 * 3. Local development server (http://localhost:4321/)
 */

export function withBase(path: string = ''): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.replace(/\/$/, '');

  if (!path || path === '/') {
    return base ? `${base}/` : '/';
  }

  // Preserve external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Prevent duplicating base if already prefixed
  if (base && path.startsWith(base)) {
    return path.replace(/\/+/g, '/');
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const combined = `${base}${cleanPath}`;
  return combined.replace(/\/+/g, '/');
}

// Alias getPath to withBase for backwards compatibility across existing components
export const getPath = withBase;

export function getCanonicalUrl(canonicalPath: string = '', siteUrl: string = ''): string {
  const rawSite = siteUrl || 'https://kitaaab.net';
  let origin = rawSite;
  try {
    const parsed = new URL(rawSite);
    origin = parsed.origin;
  } catch (e) {
    origin = rawSite.replace(/\/$/, '');
  }

  const resolvedPath = withBase(canonicalPath);
  return `${origin}${resolvedPath}`.replace(/([^:])\/\/+/g, '$1/');
}
