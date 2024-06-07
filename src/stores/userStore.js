// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI ,getDetailInfoAPI} from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ qqid, password }) => {
    const res = await loginAPI({ qqid, password })
    console.log('res',res);
    if(!res.avatarUrl)
    res.avatarUrl='https://p.qqan.com/up/2021-5/16215608436164640.png'
    // https://tse2-mm.cn.bing.net/th/id/OIP-C.4wgKhs-PxZzVtDbWY3j2pwAAAA?rs=1&pid=ImgDetMain
    userInfo.value = res
   
   
  
  }
  const getDetailInfo =async ()=>{
    console.log('11');
    
    const res =await getDetailInfoAPI({});
    console.log('DetailInfo',res);
    userInfo.value.detail=res.data;
    

  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    getDetailInfo,
    clearUserInfo,
  }
}, {
  persist: true,
})

