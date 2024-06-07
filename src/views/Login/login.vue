
<script setup>
import { Form, Toast } from 'vant'
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js'
import 'vant/es/toast/style';
import router from '@/router';
const userStore = useUserStore()

const qqid = ref('3210884103');
const password = ref('123456');
const checked = ref(false)
const onSubmit = async (values) => {
  if (!checked.value) {
    console.log('请同意协议');
    alert('请同意以下协议');
    return; // 阻止后续代码执行
  }

  try {
    // 尝试登录
    
    
     
    await userStore.getUserInfo({ qqid:'3210884103',password:'123456'});
    // 登录成功判断
    if (userStore.userInfo) {
      // Toast({
      //   type: 'success',
      //   message: '登录成功',
      // });
      console.log('submit', values);
      console.log(userStore.userInfo.message);
      console.log('登录成功');
      router.replace('/home');
      
      // 可能的后续操作，如页面跳转
    } else {
      // 登录失败的处理，可以是显示错误信息等
      console.error('登录失败');
      // Toast({
      //   type: 'error',
      //   message: '登录失败，请检查账户信息',
      // });
    }
  } catch (error) {
    // 网络错误或其他异常处理
    console.error('登录请求出错:', error);
    // Toast({
    //   type: 'error',
    //   message: '登录请求出错，请稍后重试',
    // });
  }
};
const isprove = function () {

  console.log(checked.value);

}

</script>
<template>
  <h1>登录</h1>
  <Form>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="qqid" name="qqid" label="登录账号" placeholder="登录账号"
          :rules="[{ required: true, message: '请填写登录QQ账号' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>

      <div style="margin: 16px;">

        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>


      <div>
        <van-checkbox v-model="checked" class="ischecked" @click="isprove">已经阅读并同意服务协议和隐私保护指引</van-checkbox>
      </div>
      <div class="other">
        <div class="register">
          <van-button round type="success" RouterLink to="/register">注册账号</van-button>
        </div>
        <div class="rePassword">
          <van-button round type="success" RouterLink to="/rePassword">忘记密码</van-button>
        </div>


      </div>

    </van-form>
  </Form>
</template>
<style scoped>
h1 {
  text-align: center;
}

.ischecked {
  padding-left: 35px;
}

.register {
  position: fixed;
  left: 70%;
  bottom: 30;
}

.other {
  margin-top: 20px;
}

.rePassword {
  margin-left: 30px;
}
</style>