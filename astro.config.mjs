import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://olehvolostnykh.com',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Elsie',
      cssVariable: '--font-display',
      weights: [400, 900],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-sans',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
});
