
<script setup>
import { Form, Toast } from 'vant'
import { ref, toRefs } from 'vue';
import { useUserStore } from '@/stores/userStore.js'
import 'vant/es/toast/style';
import router from '@/router';
import { loginAPI } from '@/apis/user'
const userStore = useUserStore()

const qqid = ref('3210884103');
const password = ref('123456');

const checked = ref(true)
const onSubmit = async (values) => {
  if (!checked.value) {
    console.log('请同意协议');
    alert('请同意以下协议');
    return; // 阻止后续代码执行
  }

  try {
    // 尝试获取用户信息
    // userStore.getUserInfo({ qqid: values.qqid, password: values.password })
    const res = await loginAPI({ qqid: values.qqid, password: values.password })
    userStore.userInfo.qqid = values.qqid;
    userStore.userInfo.password = values.password;
    console.log('re', res);
    userStore.userInfo.value = res;
    // console.log('den',userStore.UserInfo.value.code);
    // console.log('code',userStore.userInfo.code);

    if (res && res.code === 0) {
      router.replace('/home');
    }
    else {
      alert('账号或密码错误！')
    }
  }

  catch (err) {
    console.error('在登录或获取用户信息过程中发生错误', err);
    // 这里处理可能的网络错误或其他异常
    alert('登录过程中发生错误，请重试！');
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