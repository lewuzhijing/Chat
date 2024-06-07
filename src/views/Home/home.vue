<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
const search = ref('');
const userStore=useUserStore();

console.log('info',userStore.userInfo);

   userStore.getDetailInfo(); 
  console.log('detail',userStore.userInfo.detail);
 
 
 
 
</script>
<template >
  <div class="Home">

    <div class="header">


      <div class="header-left">
        <RouterLink to="/modInfo">
          <van-image round width="2rem" height="2rem" :src="userStore.userInfo.avatarUrl"
            class="header-image" />
        </RouterLink>

        <div class="myName">
          小头爸爸
        </div>

      </div>
      <div class="header-right">
        <van-icon name="plus" />
      </div>




    </div>
    <div>
      <van-search v-model="search" class="search" shape="round" placeholder="请输入搜索关键词" />

    </div>
    <div>


      <RouterLink to="/privateChat">
        <div class="oneMessage">
          <van-image round width="3rem" height="3rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="header-image" />
          <div class="friedName">
            大头儿子
            <div class="lastMessage">
              最后一条消息
            </div>
          </div>
        </div>
      </RouterLink>
      <RouterLink to="/privateChat">
        <div class="oneMessage">
          <van-image round width="3rem" height="3rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="header-image" />
          <div class="friedName">
            大头儿子
            <div class="lastMessage">
              最后一条消息
            </div>
          </div>
        </div>
      </RouterLink>
      <RouterLink to="/privateChat">
        <div class="oneMessage">
          <van-image round width="3rem" height="3rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="header-image" />
          <div class="friedName">
            大头儿子
            <div class="lastMessage">
              最后一条消息
            </div>
          </div>
        </div>
      </RouterLink>
      <RouterLink to="/privateChat">
        <div class="oneMessage">
          <van-image round width="3rem" height="3rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="header-image" />
          <div class="friedName">
            大头儿子
            <div class="lastMessage">
              最后一条消息
            </div>
          </div>
        </div>
      </RouterLink>


    </div>

    <div class="footer">
      <!-- <van-icon name="chat-o" badge="9" /> -->
      <div class="footerIcon">
        <van-icon name="chat-o" badge="" class="navMessage" size="25" />
        <van-icon name="friends-o" class="navFriend" size="25" />
        <van-icon name="contact-o" class="navPerson" size="25" />
      </div>


      <div class="footerText">
        <div class="TMessage">
          消息
        </div>
        <div class="TFriend">
          朋友

        </div>
        <div class="TPerson">
          个人
        </div>

      </div>


    </div>


  </div>
</template>

<style scoped>
.Home {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  /* 包括边距在元素总宽高内 */
  /* background-color: pink; */
}

.header {
  display: flex;
  /* flex:right; */
  width: 100vw;
  height: 35px;
  background-color: rgb(248, 247, 247);
  padding: 5px;
  justify-content: space-between;
  box-sizing: border-box;
  /* 包括边距在元素总宽高内 */
}

.header-right {
  justify-content: flex-end;
  margin-left: 5px
}

.header-left {
  display: flex
}

.myName {
  margin-left: 10px;
}

.search {
  border-radius: 5px;
}

.oneMessage {
  padding-left: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 0px;
  display: flex;

}

.oneMessage:hover {
  background-color: rgb(223, 222, 222)
}

.friedName {
  margin-left: 7px;
  color: black;

}

.lastMessage {
  color: grey;
  margin-top: 5px;
  font-size: 13px;
}

.navPerson {
  flex: 1;
  justify-content: center;
  text-align: center
}

.footer {
  width: 100%;
  height: 40px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgb(230, 230, 230);

}

.footerIcon {
  display: flex;
}

.footerText {
  display: flex;
}

.navMessage {
  flex: 1;
  justify-content: center;
  text-align: center
}

.navFriend {
  flex: 1;
  justify-content: center;
  text-align: center
}

.TMessage {
  flex: 1;
  justify-content: center;
  text-align: center
}

.TFriend {
  flex: 1;
  justify-content: center;
  text-align: center
}

.TPerson {
  flex: 1;
  justify-content: center;
  text-align: center
}
</style>