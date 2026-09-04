export const siteConfig = {
  name: 'MarketHub',
  url: 'https://markethub-demo.vercel.app',
  description:
    'Панель управления магазином на React, TypeScript, TanStack Query и TanStack Router.',
  ogImage: '/markethub-dashboard.png',
  keywords: [
    'MarketHub',
    'marketplace dashboard',
    'React',
    'TypeScript',
    'TanStack Query',
    'TanStack Router',
    'ecommerce admin',
    'product management'
  ],
  links: {
    github: 'https://github.com/karimover/markethub',
    demo: 'https://markethub-demo.vercel.app'
  }
} as const;

export type SiteConfig = typeof siteConfig;
