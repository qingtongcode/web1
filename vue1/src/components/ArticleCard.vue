<template>
  <article class="article-card">
    <div class="article-meta">
      <span class="categories">{{ article.categories.join(', ') }}</span>
      <span class="date">{{ article.date }}</span>
    </div>
    <h2 class="article-title">{{ article.title }}</h2>
    <p class="article-excerpt">{{ article.excerpt }}</p>
    <a :href="article.link" class="read-more">阅读更多</a>
  </article>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.article-card {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s;
}

.article-card:hover {
  background-color: #fafafa;
}

.article-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666666;
}

.categories {
  color: #333333;
}

.date {
  color: #999999;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 12px;
  line-height: 1.4;
}

.article-excerpt {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
}

.read-more:hover {
  color: #666666;
  text-decoration: underline;
}
</style>

