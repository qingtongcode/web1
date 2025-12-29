<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <header class="top-header">
      <nav class="top-nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/articles" class="nav-link">文章列表</router-link>
        <router-link to="/guestbook" class="nav-link">留言板</router-link>
        <router-link to="/about" class="nav-link">关于</router-link>
      </nav>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 博客标题区域 -->
      <div class="blog-header">
        <h1 class="blog-title">新的原野</h1>
        <p class="blog-subtitle">一片新的原野,一个充满爱与善良的博客</p>
      </div>

      <!-- 二级导航 -->
      <div class="secondary-nav">
        <nav class="nav-links">
          <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">首页</router-link>
          <router-link to="/articles" class="nav-item" :class="{ active: $route.path === '/articles' }">文章列表</router-link>
          <router-link to="/guestbook" class="nav-item" :class="{ active: $route.path === '/guestbook' }">留言板</router-link>
          <router-link to="/about" class="nav-item" :class="{ active: $route.path === '/about' }">关于</router-link>
        </nav>
        <div class="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </div>

      <!-- 路由视图 -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background-color: #f5f5f5;
}

.app {
  min-height: 100vh;
}

/* 顶部导航栏 */
.top-header {
  background-color: #2c2c2c;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  padding: 0 20px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

.nav-link.router-link-active {
  opacity: 0.9;
}

/* 主内容区域 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: calc(100vh - 50px);
  padding: 40px 20px;
}

/* 博客标题区域 */
.blog-header {
  text-align: center;
  margin-bottom: 40px;
}

.blog-title {
  font-size: 42px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
}

.blog-subtitle {
  font-size: 16px;
  color: #666666;
}

/* 二级导航 */
.secondary-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  padding-bottom: 5px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #666666;
}

.nav-item.active {
  border-bottom: 2px solid #000000;
}

.search-icon {
  cursor: pointer;
  color: #666666;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #000000;
}
</style>
