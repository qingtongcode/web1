<template>
  <div class="article-list">
    <ArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArticleCard from './ArticleCard.vue'

const articles = ref([
  {
    id: 1,
    categories: ['优', '杂谈集'],
    date: '2025年12月28日',
    title: '屠登学',
    excerpt: '就像勃学是失败学一样。我现在正式提出"野学",也就是"屠登学"。中国的所有的问题,都在于60后文革老登没死。这些老登占据了社会的各个重要位置,他们的思维方式和价值观已经严重阻碍了中国的发展。我们需要一个新的理论体系来分析和解决这些问题。',
    link: '#'
  },
  {
    id: 2,
    categories: ['未分类'],
    date: '2025年12月21日',
    title: '中国房地产会再跌90%',
    excerpt: '香港的火灾来自于40年旧高层维护。而很多中国大陆的普通人没有意识到,房子是需要维护的。房子本质上和车子、衣服一样,都是消耗品,需要定期维护和更新。随着中国房地产市场的调整,未来房价可能会面临更大的下跌压力。',
    link: '#'
  },
  {
    id: 3,
    categories: ['往事如烟'],
    date: '2025年12月8日',
    title: '如果李新野晚出生几年,能在清华大学追到章泽天吗?',
    excerpt: '首先,我没那么老。我和奶茶妹差了一年,不需要晚出生几年。我在清华偶遇过奶茶妹。她真人比照片还要好看。而且在清华这样的环境中,每个人都有自己的故事和选择。时间无法倒流,但回忆总是美好的。',
    link: '#'
  },
  {
    id: 4,
    categories: ['往事如烟', '杂谈集'],
    date: '2025年12月4日',
    title: '关于清华男生找清华女朋友',
    excerpt: '找清华女生当女朋友非常非常难。我不怕丢脸的告诉大家,我在清华读书的时候,一个都找不到。原因其实非常简单也非常复杂,涉及到环境、性格、机遇等多方面因素。但这些都是青春的记忆,值得珍藏。',
    link: '#'
  }
])
</script>

<style scoped>
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .article-list {
    grid-template-columns: 1fr;
  }
}
</style>

