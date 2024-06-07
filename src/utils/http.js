import axios from 'axios'
import { Toast } from 'vant';
import { useUserStore } from '@/stores/userStore';
const httpInstance = axios.create({
  //测试环境
  baseURL:'http://47.121.140.11:5000',
  //云端mock
  // baseURL:'https://mock.apipark.cn/m1/3937836-0-default',
  timeout: 5000,

})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  
  
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.data;
  console.log('token',token);
  
  
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  // Toast({
  //   type: 'warning',
  //   message: e.response.data.message
  // })
  return Promise.reject(e)
})


export default httpInstance