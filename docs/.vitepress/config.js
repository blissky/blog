import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'blissky | Blog',
  description: 'Notes on software, tools, and experiments',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tags', link: '/tags/' },
      { text: '文章目录', link: '/toc/' }
    ]
  }
})
