import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../views/Login/login.vue'
import Register from '../views/Register/register.vue'
import PrivateChat from '../views/Chat/privateChat.vue'
import Home from '../views/Home/home.vue'
import RePassword from '../views/RePassword/rePassword.vue'
import ModInfo from '../views/ModInformation/modInformation.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component:Login
    },
    {
      path: '/register',
      name: 'register',
      component:Register

    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path: '/privateChat',
      name: 'privateChat',
      component:PrivateChat
    },
    {
      path:'/rePassword',
      name:'rePassword',
      component: RePassword
    },
    {
      path:'/modInfo',
      name: 'modInfo',
      component: ModInfo
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
