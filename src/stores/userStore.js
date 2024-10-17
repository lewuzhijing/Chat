// 管理用户数据相关

import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { loginAPI, getDetailInfoAPI ,} from "@/apis/user";

export const useUserStore = defineStore("user",() => {
    const userInfo = reactive({});
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ qqid, password }) => {
        const res=  await  loginAPI({ qqid, password })
          console.log("登录", res);
          userInfo.value = res;
          console.log('23',userInfo.value.code);
          // if(res.code==0)
        }
    const getDetailInfo =  () => {
       getDetailInfoAPI({}).then((result) => {
         console.log('r',result);
         
          userInfo.detail = result.data;
        })
        .catch((err) => {
          console.log("err", err);
        });
      // console.log('DetailInfo',res);
    };

    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      // 执行清除购物车的action
    };
    // 3. 以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      getDetailInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
