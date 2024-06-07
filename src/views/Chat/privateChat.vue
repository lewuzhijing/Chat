<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { useChatStore } from '@/stores/chatStore'
// const child = ref()  //父容器最后一
const chatStore = useChatStore();
console.log(chatStore.messages)
const chatData = ref([]);
const my = ref({});
function sendMessage(messageText) {
  chatStore.addMessage({ text: messageText });

}
const messagesContainer = ref(null);
// 当组件挂载后或聊天消息更新时，滚动到底部
onMounted(() => scrollToBottom());
onUpdated(() => scrollToBottom());

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
my.value = {
  "headerImage": "https://p.qqan.com/up/2021-5/16215608436164640.png",
  "userId": "3210884103",
  "username": "大头爸爸"

}
const your = ref({});
your.value = {
  "headerImage": "https://tse3-mm.cn.bing.net/th/id/OIP-C.DS5K4cisxxXdESh9-_8GegAAAA?rs=1&pid=ImgDetMain",
  "userId": "2978949147",
  "username": "小头儿子"
}
// 添加第一条消息

//    watch(
//       () => chatData,
//       () => {
//        nextTick(() => {
//       child.value.scrollIntoView() // 关键代码
//     })
//   },
//   {
//     deep: true,
//   }
// )
</script>
<template >
  <div class="header">
    <div class="header-left">


      <RouterLink to="/home">

        <van-icon name="arrow-left" class="header-exit" color="black" size="25px" />

      </RouterLink>
      大头儿子
    </div>

    <van-icon name="phone-o" class="phone" size="25" />
  </div>


  <!-- //消息 -->
  <div class="chat-container">
    <div class="background-image-container">

      <div class="main" ref="messagesContainer">


        <div class="main-a">

        </div>
        <div class="messages-container">
          <div v-for="(i, index) in chatStore.messages" :key="index">
          <div class="time">
            {{ i.timestamp }}
          </div>

          <!-- //我是消息发送者 -->
          <div v-if="i.senderQQ === my.userId">

            <div class="my-message ">
              <div class="myMessage">
                {{ i.content }}
              </div>
              <van-image round width="2rem" height="2rem" :src="my.headerImage" class="myHeader-image" />
            </div>


          </div>

          <!-- //你是消息发送者 -->
          <div v-if="i.senderQQ === your.userId">
            <div class=" your-message ">

              <van-image round width="2rem" height="2rem" :src="your.headerImage" class="header-image" />
              <div class="message">
                {{ i.content }}
              </div>

            </div>


          </div>
         




        </div>
        </div>
        

        <div class="footer-a">
          48564
        </div>



      </div>

    </div>

  </div>





  <!-- //输入框 -->
  <div class="footer">
    <div class="input">
      <input name="input">
      <van-button round type="success" size="small" class="send" @click="sendMessage">发送</van-button>
    </div>

  </div>
  <!-- 占最底部输入框的界面 -->
</template>
<script setup> 

   
</script>
<style  scoped>
/* .chat-container {
  position: relative;
  height: 50vh;
  width: 100%;
} */

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
  /* justify:space-between; */
  /* text-align:center */

}

/* .header-name{
      display:inline-flex;
      justify-content:flex-start
     } */
/* .header-exit:active{
        
        
      } */
/* flex:left; */

.header-left {
  float: left;
  font-size: 25px;
  line-height: 50px
}

.phone {
  margin-top: 15px;
  margin-right: 5px;
  float: right;
}

.background-image-container {
  position: fixed;
  top: 53px;
  left: 0;
  /* bottom: 1000px; */
  background-image: url('https://pic4.zhimg.com/v2-216928407dcb4f15530c3193717e7893_r.jpg?source=1940ef5c');
  background-size: cover;
  background-position: center;
  /* 图片位置 */
  /* inset: 0;  */
  width: 100vw;
  height: 100vh;
  
  /* margin-bottom: 70px; */
  /* 或其他高度，确保容器足够高以显示背景 */
  z-index: -1;
  /* 确保背景在聊天记录后面 */
}

.main {
  /* display:  flex; */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  top: 70;
  bottom: 60;
  width: 100vw;
  height: 100vh;
  padding: 0 10px;
  box-sizing: border-box;
  /* 包括边距在元素总宽高内 */
  /* background-color:rgb(248, 247, 247); */

}
/* 
.main-a {
  position: absolute;
  overflow-y: auto;
  width: 100%;
  height: 53px;
} */

.time {
  text-align: center;
  margin-bottom: 20px;
}

.header-image {
  flex-shrink: 0;
}

.your-message {
  display: flex;
  padding-bottom: 20px;
  margin-right: 50px
}



.myHeader-image {
  /* flex:right; */
  margin-left: 3px;
  /* flex-shrink:0; */
  flex-shrink: 0;
}



.my-message {
  display: flex;
  padding-bottom: 20px;
  margin-left: 50px
}

.message {
  padding: 5px 10px;
  display: line;
  font-size: 18px;
  margin-left: 7px;
  line-height: px;
  background-color: white;
  border-radius: 8px
}

.myMessage {
  padding: 5px 10px;
  flex: right;
  margin-left: auto;
  font-size: 18px;
  margin-right: 7px;
  line-height: px;
  background-color: white;
  border-radius: 8px
}

.footer-a {
  left: 0;
  right: 0;
  width: 100%;
  height: 118px;
 
  flex-shrink: 0;
 
  /* background-color: pink; */
}

.footer {

  width: 100%;
  height: 65px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 0px;
  background-color: rgb(248, 247, 290);
  z-index: 30;
  /* 确保背景在聊天记录后面 */
  display: block;
}

.input {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  margin-left: 20px;

}

input {
  flex: 8;
  border-radius: 5px;
  /* width:80%;  */
  height: 30px;
  margin-left: 5px;
  /* border:0px; */

}

.send {
  flex: 2;
  margin-left: 10px;
  /* margin-right:5px; */
}
</style>
