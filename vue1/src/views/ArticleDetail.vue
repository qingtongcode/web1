<template>
  <div class="article-detail">
    <div class="container">
      <nav class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span>→</span>
        <span>{{ article.title || '文章' }}</span>
      </nav>

      <div class="meta-wrap">
        
        <h1 class="title">{{ article.title }}</h1>
        <div class="meta">{{ article.author || '作者' }} —— {{ article.time }}</div>
      </div>

      <div class="content" v-if="articleContent" v-html="articleContent"></div>
      <div v-else class="loading">加载文章中...</div>
      
          <section class="comments">
            <h3 class="comments-title">评论 ({{ comments.length }})</h3>

            <div v-if="commentsLoading" class="loading">加载评论中...</div>
            <div v-else-if="commentsError" class="error">{{ commentsError }}</div>
            <div v-else>
              <div v-if="comments.length === 0" class="no-comments">还没有评论，来抢沙发吧！</div>
              <div v-else class="comment-list">
                <div class="comment" v-for="c in comments" :key="c.id">
                  <div class="comment-meta">
                    <span class="comment-name">{{ c.name }}</span>
                    <span class="comment-time">{{ formatDate(c.time) }}</span>
                  </div>
                  <div class="comment-body">{{ c.content }}</div>
                </div>
              </div>
            </div>

            <form class="comment-form" @submit.prevent="postComment(article.value.id || id)">
              <input v-model="newComment.name" placeholder="你的称呼（可选）" />
              <textarea v-model="newComment.content" placeholder="写下你的评论..." rows="4"></textarea>
              <div class="form-actions">
                <button type="submit" :disabled="posting">{{ posting ? '提交中...' : '发表评论' }}</button>
              </div>
            </form>
          </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.params.id

const article = ref({})
const articleContent = ref('')

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})



// 格式化日期（若无则返回空）
const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// 评论相关
const comments = ref([])
const commentsLoading = ref(false)
const commentsError = ref('')
const newComment = ref({ name: '', content: '' })
const posting = ref(false)

const fetchComments = async (articleId) => {
  commentsLoading.value = true
  commentsError.value = ''
  try {
    let res
    // 尝试常见评论接口
    try {
      res = await api.get(`/articles/${articleId}/comments`)
    } catch (e1) {
      try {
        res = await api.get(`/comments`, { params: { articleId } })
      } catch (e2) {
        res = { data: [] }
      }
    }
    const data = res.data && (res.data.data || res.data) || []
    comments.value = Array.isArray(data) ? data.map(c => ({
      id: c.id || c._id || Date.now(),
      name: c.name || c.user || '匿名',
      content: c.content || c.body || '',
      time: c.time || c.createdAt || c.date || ''
    })) : []
  } catch (err) {
    console.error('获取评论失败', err)
    commentsError.value = err.message || '获取评论失败'
    comments.value = []
  } finally {
    commentsLoading.value = false
  }
}

const postComment = async (articleId) => {
  if (!newComment.value.content.trim()) {
    commentsError.value = '评论内容不能为空'
    return
  }
  posting.value = true
  commentsError.value = ''
  try {
    let res
    const payload1 = { name: newComment.value.name || '匿名', content: newComment.value.content }
    // 先尝试 /articles/:id/comments
    try {
      res = await api.post(`/articles/${articleId}/comments`, payload1)
    } catch (e1) {
      // 再尝试通用 /comments 接口，带 articleId
      res = await api.post(`/comments`, { ...payload1, articleId })
    }

    const created = res.data && (res.data.data || res.data) || null
    const commentToPush = created ? ({
      id: created.id || created._id || Date.now(),
      name: created.name || payload1.name,
      content: created.content || payload1.content,
      time: created.time || created.createdAt || new Date().toISOString()
    }) : ({
      id: Date.now(),
      name: payload1.name,
      content: payload1.content,
      time: new Date().toISOString()
    })

    // 将新评论追加到列表
    comments.value.unshift(commentToPush)
    // 清空表单
    newComment.value.name = ''
    newComment.value.content = ''
  } catch (err) {
    console.error('提交评论失败', err)
    commentsError.value = err.message || '提交评论失败'
  } finally {
    posting.value = false
  }
}

const fetchArticle = async (id) => {
  try {
    // 尝试常见的后端接口路径
    let res
    try {
      res = await api.get(`/articles/${id}`)
    } catch (e) {
      res = await api.get(`/article/${id}`)
    }

    const data = res.data && (res.data.data || res.data) || res
    // 支持后端直接返回对象或 {data: {}} 格式
    const art = Array.isArray(data) ? data[0] : data
    article.value = art || {}
    // 内容字段名可能为 content, body, html
    articleContent.value = article.value.content || article.value.body || article.value.html || ''
    // 加载评论
    if (article.value.id || id) {
      fetchComments(article.value.id || id)
    }
  } catch (err) {
    console.error('获取文章失败', err)
    article.value = route.state && route.state.article ? route.state.article : {}
    articleContent.value = article.value.content || ''
  }
}

onMounted(() => {
  // 如果通过路由 state 传递了 article，优先使用
  if (route.state && route.state.article) {
    article.value = route.state.article
    articleContent.value = article.value.content || article.value.body || article.value.html || ''
    // 加载评论
    if (article.value.id) fetchComments(article.value.id)
  } else if (id) {
    fetchArticle(id)
  }
})

// 在 fetchArticle 成功后加载评论
// patch fetchArticle to load comments after article fetched
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 20px;
}
.breadcrumb {
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}
.breadcrumb a { color: #666; text-decoration: none }
.meta-wrap { margin-bottom: 30px }
.category { color: #2b6cb0; font-size: 13px; margin-bottom: 10px }
.title { font-size: 42px; margin: 0 0 14px 0; font-weight: 800; color: #111 }
.meta { color: #777; font-size: 14px; margin-bottom: 30px }
.content { font-size: 16px; line-height: 1.9; color: #333 }
.content p { margin-bottom: 18px }
.loading { color: #666; padding: 40px 0; text-align: center }

.comments { margin-top: 40px; border-top: 1px solid #eee; padding-top: 28px }
.comments-title { font-size: 18px; margin: 0 0 16px 0; color: #111 }
.comment-list { display: flex; flex-direction: column; gap: 18px; margin-bottom: 18px }
.comment { padding: 14px; background: #fff; border: 1px solid #f0f0f0; border-radius: 6px }
.comment-meta { font-size: 13px; color: #666; margin-bottom: 8px }
.comment-name { color: #111; font-weight: 600; margin-right: 8px }
.comment-time { color: #999 }
.comment-body { color: #333; line-height: 1.6 }
.no-comments { color: #777; padding: 12px 0 }

.comment-form { display: flex; flex-direction: column; gap: 10px; margin-top: 18px }
.comment-form input, .comment-form textarea { width: 100%; padding: 10px 12px; border: 1px solid #e6e6e6; border-radius: 6px; font-size: 14px }
.form-actions { display: flex; justify-content: flex-end }
.form-actions button { background: #2563eb; color: #fff; padding: 8px 14px; border-radius: 6px; border: none; cursor: pointer }
.form-actions button[disabled] { opacity: 0.6; cursor: not-allowed }

@media (max-width: 768px) {
  .title { font-size: 28px }
}
</style>
