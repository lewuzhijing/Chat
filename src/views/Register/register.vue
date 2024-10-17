
<script setup>
import { Form} from 'vant'
import { ref , onUnmounted} from 'vue';
import { registerAPI,sendEmailCodeAPI} from '@/apis/user.js'
import 'vant/es/toast/style';

    const userEmail = ref('');
    const userName = ref('');
    const password = ref('');
    const repassword = ref('');
    const isdisabled=ref(false);
    const countdownText = ref('获取验证码');
    const count = ref(60);
    const checked=ref(false);
    const sms=ref('');
     
       

    const onSubmit = (values) => {
      if(password.value!=repassword.value){
          alert('密码不一致');
      }
     else if (!checked.value){
      console.log('请同意协议');
      
     alert('请同意以下协议')
     }
     else if( checked.value===true){
        // TODO
         console.log('submit', values);
         registerAPI(values).then((result) => {
          console.log('relust',result);
          if(result.code===1)alert(result.message)
          
         }).catch((err) => {
          console.log('err',err);
          
         });
         
      }
    };
    
    const isprove = function(){
      console.log(checked.value);
    }
     const  getAuth=async ()=>{
      sendEmailCodeAPI(userEmail.value).then((result) => {
       
        
       console.log('获取验证码成功',result);
    
    }).catch((err) => {
      console.log(err);
      
    });
      isdisabled.value=true;
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
     <h1>注册账号</h1>
     <van-form @submit="onSubmit">
     <van-cell-group inset>
     <van-field
      v-model="userEmail"
      name="email"
      label="QQ邮箱账号"
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
      v-model="userName"
      type="text"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
      v-model="repassword"
      type="password"
      name="password"
      label="确认密码"
      placeholder="再次输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      注册账号
    </van-button>
  </div>
  <div>  
     <van-checkbox v-model="checked" class="ischecked" @click="isprove">已经阅读并同意服务协议和隐私保护指引</van-checkbox>
     
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