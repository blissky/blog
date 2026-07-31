import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Blog',
  description: 'A minimal VitePress blog',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }]
  }
})
