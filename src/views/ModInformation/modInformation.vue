<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { ref } from 'vue';
import { upLoadAPI, updateAvatarAPI } from '@/apis/user.js'
import router from '@/router';
const userStore = useUserStore()
const reHeaderImage = ref([{ url: '' },]);
// https://p.qqan.com/up/2021-5/16215608436164640.png

const fileInput = ref(null);

const uploadFile = () => {
  console.log('', fileInput);

  const file = fileInput.value.files[0];
  const formData = new FormData();
  formData.append('file', file);

  upLoadAPI(formData).then(data => {
    // 处理后端返回的文件存储地址
    const file = data;
    console.log('文件上传成功，存储地址：', file);
    updateAvatarAPI(file.data).then((result) => {
      console.log('更改成功', result);
      router.replace('/home')

    }).catch((err) => {
      console.log('', err);

    });
    // 在页面上显示文件存储地址或者进行其他操作
  })
    .catch(error => {
      console.error('文件上传失败:', error);
    });
};

</script>
<template>
  <!-- 顶部导航 -->
  <div class="header">
    <div class="header-left">
      <RouterLink to="/home">
        <van-icon name="arrow-left" class="header-exit" color="black" size="25px" />
      </RouterLink>
    </div>
    <div class="header-left">
      编辑头像
    </div>
  </div>
  <!--表单信息 -->
  <div class="main-a">
    <img class="avatar"
      :src="userStore.userInfo.detail.userPic ? userStore.userInfo.detail.userPic : 'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png'">

    <div>
      <input type="file" ref="fileInput">
      <button @click="uploadFile">上传头像</button>

    </div>


  </div>


  <!-- <van-field name="uploader" label="修改头像">
      <template #input>
    -->
  <!-- <van-uploader v-model="reHeaderImage" />
    </template>
  </van-field> -->
  <!-- <van-uploader :after-read="onRead">
  <van-icon name="photograph" />
</van-uploader> -->
</template>
<style scoped>
.header {
  width: 100%;
  height: 53px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: white;
  border-bottom: 0.5px solid rgb(235, 228, 228);
  display: float;
  /* justify:space-between; 
      text-align:center */

}

.header-left {
  float: left;
  font-size: 25px;
  line-height: 50px
}

.header-center {
  float: center;
  font-size: 25px;
  line-height: 50px
}

.avatar {
  display: block;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  width: 200px;
  height: auto;
  object-fit: cover;
  /* 或者其他适合的填充方式，比如 contain */
  max-width: 100%;
  max-height: 100%;
}

.main-a {
  display: block;
  width: 100%;
  height: 300px;
  margin-top: 100px;
}
</style>