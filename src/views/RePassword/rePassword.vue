
<script setup>
import { Form} from 'vant'
import { ref} from 'vue';
import {sendEmailCodeAPI,rePasswordAPI} from '@/apis/user'
import 'vant/es/toast/style';
import router from '@/router';

    const userId = ref('3210884103@qq.com');
    // const username = ref('');
    const password = ref('');
    const repassword = ref('');
    const isdisabled=ref(false);
    const countdownText = ref('获取验证码');
    const count = ref(60);
    
    const sms=ref('');


    const onSubmit = (values) => {
      if(password.value!=repassword.value){
          alert('密码不一致');
      }
     
     else {
        // TODO
         console.log('submit', values);
         rePasswordAPI(values).then((result) => {
          if(result.code===0){
            console.log('改密成功',result);
            router.replace('/');
          }
          else{
            console.log('验证码错误');
            
          }
          
         }).catch((err) => {
          console.log(err);
          
         });
  
        
      }
    };
    
   
     const  getAuth=async ()=>{
      isdisabled.value=true;
      console.log('userId',userId.value);
      
       const res= await sendEmailCodeAPI(userId.value);
       console.log('重置密码验证码',res);
       
      var t= setInterval(() => {
        count.value--;
        
        console.log(count.value);
        countdownText.value = `重新发送(${count.value})`;
        if(count.value<=0){

         clearInterval(t);
         count.value=60;
         isdisabled.value=false;
         countdownText.value = '获取验证码';
        }
      }, 1000);
    }


</script>
<template>
  <!-- 我是login -->
  <!-- <Button/> -->
  <RouterLink to="/">

<van-icon name="arrow-left"  class="header-exit" color="black" size="25px"/>

</RouterLink>
  <Form >
     <h1>重置密码</h1>
     <van-form @submit="onSubmit">
     <van-cell-group inset>
     <van-field
      v-model="userId"
      name="email"
      label="QQ账号"
      placeholder="登录账号"
      :rules="[{ required: true, message: '请填写注册QQ邮箱账号' }]"
    />
    <van-cell-group inset>
    <van-field
    v-model="sms"
    center
    clearable
    name="code"
    label="QQ邮箱验证"
    placeholder="请输入QQ邮箱验证码"
    
  >
    <template #button>
      <van-button size="small" type="primary"  :disabled="isdisabled" @click="getAuth">{{countdownText}}</van-button>
    </template>
    
  </van-field>


</van-cell-group>


  
    <van-field
      v-model="password"
      type="password"
      name="newPassword"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="repassword"
      
      label="密码"
      placeholder="再次输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
     确认
    </van-button>
  </div>

</van-form>
  </Form>
 


</template>
<style scoped>
   h1{
      text-align: center;
   }
   .ischecked{
       padding-left: 35px;
   }
   .register{
    display: flex;
    justify-content:center;
    align-items: center;
   }
   .reLogin{
     color:black;
     display:float;
     float:right;
     margin-right:20%
    
   }

</style>