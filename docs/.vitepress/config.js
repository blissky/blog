import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Blog',
  description: 'A minimal VitePress blog',
  base: '/blog/',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }]
  }
})
