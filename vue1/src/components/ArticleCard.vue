<template>
  <article class="article-card">
    <div class="article-meta">
      <span class="date">{{ article.time }}</span>
    </div>
    <h2 class="article-title">
      <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">{{ article.title }}</router-link>
    </h2>
    <p v-if="showContent" class="article-excerpt">{{ article.content }}</p>
    <router-link v-if="showContent" :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="read-more">阅读更多</router-link>
  </article>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  },
  showContent: {
    type: Boolean,
    default: false
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
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
  line-height: 1.4;
  position: relative;
  padding-left: 12px;
  transition: color 0.18s ease, transform 0.18s ease;
}

.article-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: linear-gradient(180deg, #ff7a18 0%, #af002d 100%);
  border-radius: 2px;
}

.article-title a {
  color: inherit;
  text-decoration: none;
  display: inline-block;
  transition: color 0.18s ease, transform 0.12s ease;
}

.article-title a:hover {
  color: #60A5FA;
  transform: translateY(-2px);
  text-decoration: none;
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
  color: #60A5FA;
  text-decoration: underline;
}
</style>

