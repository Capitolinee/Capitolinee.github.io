import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署到 GitHub Pages：
//  A. repo 叫 <帳號>.github.io → 只改 site，base 不用設（推薦）
//  B. repo 叫其他名字         → site 照填，並把 base 打開改成 '/repo名稱'
//  C. 自訂網域               → site 改成網域，public/ 放 CNAME 檔

export default defineConfig({
  site: 'https://capitolinee.github.io',
  // base: '/repo名稱',
  integrations: [
    // 產生 sitemap-index.xml，讓 Google 知道網站有哪些頁面
    sitemap({
      filter: (page) => !page.includes('/search/'),
    }),
  ],
});
