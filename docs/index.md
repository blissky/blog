---
layout: home

hero:
  name: blissky | Blog
  text: Notes on software, tools, and experiments
  actions:
    - theme: brand
      text: Browse posts
      link: /toc/
    - theme: alt
      text: Browse tags
      link: /tags/
---

<script setup>
import PostIndex from './.vitepress/components/PostIndex.vue'
</script>

## Latest posts

<PostIndex view="latest" />
