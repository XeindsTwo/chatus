import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/i18n/seo';

const routes = ['/', '/rules', '/privacy', '/privacy-website', '/agreement', '/ru', '/ru/rules', '/ru/privacy', '/ru/privacy-website', '/ru/agreement', '/id', '/id/rules', '/id/privacy', '/id/privacy-website', '/id/agreement'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => {
    const isHome = route === '/';
    const isLocaleHome = route === '/ru' || route === '/id';
    const isLegal = route.includes('rules') || route.includes('privacy') || route.includes('agreement');

    return {
      url: `${siteOrigin}${isHome ? '' : route}`,
      lastModified,
      changeFrequency: isLegal ? 'monthly' : 'weekly',
      priority: isHome ? 1 : isLocaleHome ? 0.9 : 0.7,
    };
  });
}
