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
            <label for="email">邮箱：</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">留言内容：</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">提交留言</button>
        </form>
      </div>
      
      <div class="messages-list">
        <h3>留言列表</h3>
        <div v-if="messages.length === 0" class="no-messages">
          暂无留言，快来成为第一个留言的人吧！
        </div>
        <div v-for="msg in messages" :key="msg.id" class="message-item">
          <div class="message-header">
            <span class="message-name">{{ msg.name }}</span>
            <span class="message-date">{{ msg.date }}</span>
          </div>
          <div class="message-content">{{ msg.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const messages = ref([
  {
    id: 1,
    name: '访客',
    date: '2025年12月28日',
    message: '这是一个很好的博客！'
  }
])

const submitMessage = () => {
  const newMessage = {
    id: messages.value.length + 1,
    name: form.value.name,
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    message: form.value.message
  }
  messages.value.unshift(newMessage)
  form.value = { name: '', email: '', message: '' }
  alert('留言提交成功！')
}
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

.submit-btn:hover {
  background-color: #333333;
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

