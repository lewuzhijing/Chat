import request from '@/utils/http'

import { jsonToUrlEncoded } from '@/utils/helpers'; // 假设您将jsonToUrlEncoded函数放在了此处
export const loginAPI = ({qqid,password})=>{
  const urlEncodedData = jsonToUrlEncoded({ qqid, password });
  // console.log(urlEncodedData);
  
  return request({
    url:'/user/login',
    method:'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 设置正确的Content-Type
    },
    data: urlEncodedData, // 使用序列化后数据
    
  })
}

export const getDetailInfoAPI = ()=>{
  return request({
    url:'/user/userinfo',
    method:'GET',
  })
}


// export const updateAvatarAPI  = (avatarUrl)=>{
  
//   // console.log(urlEncodedData);
  
//   return request({
//     url:'/user/updateAvatar',
//     method:'Patch',
//     params:{
//       avatarUrl:avatarUrl
//     }
    
//   })
// }