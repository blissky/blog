<script setup>
import { data } from '../posts.data.js'

const props = defineProps({
  view: {
    type: String,
    required: true,
    validator: (value) => ['latest', 'tags', 'archive'].includes(value)
  }
})

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`))
</script>

<template>
  <div v-if="props.view === 'latest'" class="post-list">
    <article v-for="post in data.posts.slice(0, 5)" :key="post.url" class="post-card">
      <div class="post-heading">
        <a class="post-title" :href="post.url">{{ post.title }}</a>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>
      <p>{{ post.description }}</p>
      <div class="tag-list" aria-label="Tags">
        <a v-for="tag in post.tags" :key="tag" :href="`/tags/#tag-${encodeURIComponent(tag.toLowerCase()).replaceAll('%', '-')}`">
          #{{ tag }}
        </a>
      </div>
    </article>
    <p v-if="!data.posts.length" class="empty-state">No published posts yet.</p>
  </div>

  <div v-else-if="props.view === 'tags'">
    <p class="summary">{{ data.posts.length }} post · {{ data.tagGroups.length }} tags</p>
    <nav class="tag-index" aria-label="Tag index">
      <a v-for="group in data.tagGroups" :key="group.name" :href="`#${group.id}`">
        #{{ group.name }} <span>{{ group.posts.length }}</span>
      </a>
    </nav>

    <section v-for="group in data.tagGroups" :id="group.id" :key="group.name" class="tag-section">
      <h2>#{{ group.name }}</h2>
      <article v-for="post in group.posts" :key="post.url" class="post-row">
        <a :href="post.url">{{ post.title }}</a>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </article>
    </section>
  </div>

  <div v-else>
    <p class="summary">{{ data.posts.length }} published post</p>
    <section v-for="group in data.yearGroups" :key="group.year" class="year-section">
      <h2>{{ group.year }}</h2>
      <div class="post-list">
        <article v-for="post in group.posts" :key="post.url" class="post-card">
          <div class="post-heading">
            <a class="post-title" :href="post.url">{{ post.title }}</a>
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          </div>
          <p>{{ post.description }}</p>
          <div class="tag-list" aria-label="Tags">
            <a v-for="tag in post.tags" :key="tag" :href="`/tags/#tag-${encodeURIComponent(tag.toLowerCase()).replaceAll('%', '-')}`">
              #{{ tag }}
            </a>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.summary {
  color: var(--vp-c-text-2);
  margin: 0 0 24px;
}

.post-list {
  display: grid;
  gap: 16px;
}

.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-1);
}

.post-card p {
  color: var(--vp-c-text-2);
  margin: 10px 0 14px;
}

.post-heading,
.post-row {
  align-items: baseline;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.post-title,
.post-row a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.post-heading time,
.post-row time {
  color: var(--vp-c-text-3);
  flex: none;
  font-size: 14px;
}

.tag-list,
.tag-index {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-list a,
.tag-index a {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  line-height: 28px;
  padding: 0 10px;
  text-decoration: none;
}

.tag-index {
  margin-bottom: 36px;
}

.tag-index span {
  color: var(--vp-c-text-3);
  margin-left: 4px;
}

.tag-section,
.year-section {
  scroll-margin-top: 88px;
}

.tag-section + .tag-section,
.year-section + .year-section {
  margin-top: 36px;
}

.post-row {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 0;
}

.empty-state {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .post-card {
    padding: 16px;
  }

  .post-heading,
  .post-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
