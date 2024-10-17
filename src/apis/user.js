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

//发送验证码
export const sendEmailCodeAPI = (email)=>{
  return request({
    url:'/user/sendEmailCode',
    method:'POST',
    params:{
      email:email
    }
  })
}

//注册
export const registerAPI = (params)=>{
  return request({
    url:'/user/register',
    method:'POST',
    params
  })
}

//改密
export const rePasswordAPI = (params)=>{
  return request({
    url:'/user/resetPassword',
    method:'POST',
    params
  })
}
//上传图片获得地址
export const upLoadAPI = (formData) => {
  return request({
    url:'/user/upload',
    method:'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data', // 设置正确的Content-Type
    },
    
  })
}



export const updateAvatarAPI  = (avatarUrl)=>{
  
  // console.log(urlEncodedData);
  
  return request({
    url:'/user/updateAvatar',
    method:'Patch',
    params:{
      avatarUrl:avatarUrl
    }
    
  })
}

export const getChatMessageAPI = (friendId)=>{
  return request({
    url:'/user/withFriend',
    method:'Get',
    params:{
      friendId:friendId
    }
  })
}