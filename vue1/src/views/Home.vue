<template>
  <div class="home-page">
    <ArticleList :show-content="true" />
  </div>
</template>

<script setup>
import ArticleList from '../components/ArticleList.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>

