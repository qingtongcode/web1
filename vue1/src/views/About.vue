<template>
  <div class="about-page">
    <h2 class="page-title">关于</h2>
    <div class="about-content">
      <div class="about-section">
        <h3>关于这个博客</h3>
        <p>
          欢迎来到"新的原野"，这是一个充满爱与善良的博客空间。在这里，我们分享思考、记录生活、探讨人生。
        </p>
        <p>
          这个博客致力于提供一个自由、开放、真诚的交流平台，让每一个声音都能被听见，每一份思考都能被尊重。
        </p>
      </div>
      
      <div class="about-section">
        <h3>博客主题</h3>
        <ul class="theme-list">
          <li>生活感悟</li>
          <li>社会观察</li>
          <li>个人成长</li>
          <li>杂谈随笔</li>
        </ul>
      </div>
      
      <div class="about-section">
        <h3>联系方式</h3>
        <p>如果您有任何问题或建议，欢迎通过留言板与我联系。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-page {
  width: 100%;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000000;
}

.about-content {
  max-width: 800px;
}

.about-section {
  margin-bottom: 40px;
}

.about-section h3 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000000;
}

.about-section p {
  font-size: 15px;
  line-height: 1.8;
  color: #666666;
  margin-bottom: 15px;
}

.theme-list {
  list-style: none;
  padding: 0;
}

.theme-list li {
  font-size: 15px;
  color: #666666;
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
}

.theme-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #000000;
  font-weight: bold;
}
</style>

