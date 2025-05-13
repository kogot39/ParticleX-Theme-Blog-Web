import loginView from '@/adminview/loginview/loginView.vue'
import AdminBlog from '@/adminview/AdminBlog.vue'
import Home from '@/view/homeview/home.vue'
import Blog from '@/view/blogview/blog.vue'
import BlogPage from '@/view/blogview/blogPage.vue'
import Tool from '@/view/toolview/tool.vue'

import { createRouter,createWebHistory } from 'vue-router'
import { useAppStore } from '../stores/app'

const routes = [
  { path: '/', 
    redirect: '/home'
  },
  { path:'/home',
    name: 'home',
    meta:{
      title:'Asuka\'s home' 
    },
    component:Home
  },
  {
    path:'/blog',
    name:'blog',
    meta:{
      title:'Asuka\'s blog' 
    },
    component:Blog
  },
  {
    path:'/blog/blogpage',
    name:'blogPage',
    meta:{
      title:'Asuka\'s blog' 
    } ,
    component:BlogPage,
  },
  {
    path:'/tool',
    name:'tool',
    meta:{
      title:'Asuka\'s tool'
    },
    component:Tool
  },
  {
    path:'/login',
    name:'login',
    meta:{
      title:'login' 
    },
    component:loginView
  },
  {
    path:'/admin',
    redirect: '/admin/blog'
  },
  {
    path:'/admin/blog',
    name:'adminBlog',
    component:AdminBlog
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const store = useAppStore();
  if (to.name !== 'home') {
    store.setMenuColor(false);
  }
  if (to.meta.title) { //如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  })
export default router