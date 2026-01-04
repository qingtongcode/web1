<template>
  <div class="article-list">
    <div v-if="loading" class="loading">
      加载中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="articles.length === 0" class="no-articles">
      暂无文章
    </div>
    <ArticleCard
      v-else
      v-for="article in articles"
      :key="article.id"
      :article="article"
      :show-content="showContent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, toRef } from 'vue'
import ArticleCard from './ArticleCard.vue'
import axios from 'axios'

// 创建 axios 实例，配置 baseURL
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

const props = defineProps({
  showContent: {
    type: Boolean,
    default: false
  }
})

const showContent = toRef(props, 'showContent')

const articles = ref([])
const loading = ref(false)
const error = ref('')

// 获取文章列表
const fetchArticles = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get('/')
    const result = response.data
    articles.value = result.data.map((u) => {
      return {
        id: u.id || '',
        title: u.title || '无标题',
        time: u.time || '',
        content: u.content || ''
      }
    })
  } catch (err) {
    console.error('获取文章列表失败:', err)
    error.value = err.message || '获取文章列表失败，请稍后重试'
    articles.value = []
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取文章列表
onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.loading,
.error,
.no-articles {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #666666;
}

.error {
  color: #d32f2f;
}

@media (max-width: 768px) {
  .article-list {
    grid-template-columns: 1fr;
  }
}
</style>

