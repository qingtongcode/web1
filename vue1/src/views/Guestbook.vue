<template>
  <div class="guestbook-page">
    <h2 class="page-title">留言板</h2>
    <div class="guestbook-content">
      <div class="message-form">
        <h3>留下您的留言</h3>
        <form @submit.prevent="submitMessage">
          <div class="form-group">
            <label for="name">姓名：</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="message">留言内容：</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn" :disabled="submitting">
            {{ submitting ? '提交中...' : '提交留言' }}
          </button>
        </form>
      </div>
      
      <div class="messages-list">
        <h3>留言列表</h3>
        <div v-if="loading" class="loading">
          加载中...
        </div>
        <div v-else-if="messages.length === 0" class="no-messages">
          暂无留言，快来成为第一个留言的人吧！
        </div>
        <div v-for="msg in messages" :key="msg.id" class="message-item">
          <div class="message-header">
            <span class="message-name">{{ msg.name }}</span>
          </div>
          <div class="message-content">{{ msg.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 创建 axios 实例，配置 baseURL
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

const messages = ref([])
const loading = ref(true)
const submitting = ref(false)
const form = ref({ name: '', message: '' })

// 加载远程留言数据
async function loadUsers() {
  loading.value = true
  try {
    const response = await api.get('/msg')
    const payload = response.data || {}
    const data = Array.isArray(payload.data) ? payload.data : []
    messages.value = data.map((u) => {
      return {
        name: u.name || '匿名',
        message: u.msg || ''
      }
    })
  } catch (err) {
    console.error('加载留言失败：', err)
    messages.value = []
  } finally {
    loading.value = false
  }
}

// 提交留言
async function submitMessage() {
  if (!form.value.name || !form.value.message) {
    alert('请填写完整信息')
    return
  }

  submitting.value = true
  try {
    const response = await api.post('/msg/guestbook', {
      name: form.value.name.trim(),
      msg: form.value.message.trim()
    })

    // 根据后端返回格式处理
    if (response.data.code === 1) {
      alert('留言提交成功！')
      form.value = { name: '', message: '' }
      // 重新加载留言列表
      await loadUsers()
    } else {
      alert('留言提交失败: ' + (response.data.msg || '未知错误'))
    }
  } catch (err) {
    console.error('提交留言失败：', err)
    alert(err.response?.data?.msg || err.message || '提交留言失败，请检查网络连接或稍后重试')
  } finally {
    submitting.value = false
  }
}

// 生命周期钩子：组件挂载时自动加载
onMounted(() => {
  loadUsers()
})


</script>

<style scoped>
.guestbook-page {
  width: 100%;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000000;
}

.guestbook-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.message-form,
.messages-list {
  background-color: #fafafa;
  padding: 25px;
  border-radius: 8px;
}

.message-form h3,
.messages-list h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #000000;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333333;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #000000;
}

.submit-btn {
  background-color: #000000;
  color: #ffffff;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #333333;
}

.submit-btn:disabled {
  background-color: #999999;
  cursor: not-allowed;
}

.loading {
  color: #666666;
  text-align: center;
  padding: 40px 0;
}

.no-messages {
  color: #999999;
  text-align: center;
  padding: 40px 0;
}

.message-item {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 4px;
  border-left: 3px solid #000000;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.message-name {
  font-weight: bold;
  color: #000000;
}

.message-date {
  color: #999999;
  font-size: 13px;
}

.message-content {
  color: #666666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .guestbook-content {
    grid-template-columns: 1fr;
  }
}
</style>

