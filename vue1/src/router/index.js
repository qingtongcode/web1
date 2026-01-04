import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleListPage from '../views/ArticleListPage.vue'
import Guestbook from '../views/Guestbook.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleListPage
  },
  {
    path: '/msg',
    name: 'Guestbook',
    component: Guestbook
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
  ,
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/ArticleDetail.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

