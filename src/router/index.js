import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../views/Login/login.vue'
import Register from '../views/Register/register.vue'
import PrivateChat from '../views/Chat/privateChat.vue'
import Home from '../views/Home/home.vue'
import RePassword from '../views/RePassword/rePassword.vue'
import ModInfo from '../views/ModInformation/modInformation.vue'
import { useUserStore } from '@/stores/userStore'
const userStore=useUserStore
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
      component:Home,
      meta: { requiresAuth: true } // 添加元信息标记需要认证的路由
    },
    {
      path: '/privateChat',
      name: 'privateChat',
      component:PrivateChat,
      meta: { requiresAuth: true } // 添加元信息标记需要认证的路由
      // props:true
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
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 检查路由是否需要认证
//     // if(userStore.userInfo.value.data)
//     if (!userStore.userInfo||(userStore.userInfo.value.data&&!userStore.userInfo.value.data.token)) {
//       next({
//         path: '/',
//         query: { redirect: to.fullPath } // 将当前路径作为参数传递给登录页面
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // 允许访问非受保护的路由
//   }
// });

// router.afterEach((to, from) => {
//   // 如果是从其他页面返回到主界面，则触发主界面的刷新逻辑
//   if (to.name === 'home' && from.name !== 'home') {
//     // 触发主界面的刷新，这里假设有一个全局方法可以用来刷新数据
//     // window. location.reload();
//   }
// });
export default router
