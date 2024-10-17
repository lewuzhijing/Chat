<script setup>
import { ref, onMounted, onUnmounted, onUpdated, nextTick } from 'vue';
import { useChatStore } from '@/stores/chatStore'
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { connectWebSocket, sendMessage } from '@/utils/websocket'
import { upLoadAPI } from '@/apis/user';
const route = useRoute();
console.log(route.query); // 访问查询参数

// 如果需要响应式地监听查询参数变化
const you = route.query;

// const child = ref()  //父容器最后一
const chatStore = useChatStore();
const userStore = useUserStore();
console.log(chatStore.messages)
chatStore.getChatMessage(you.yourId)
// const chatData = ref([]);
const myId = userStore.userInfo.id
const myHeaderImage = userStore.userInfo.detail.userPic

const onRead = (file) => {
  console.log(file)
}
// const  you=defineProps( {
//     yourId: {
//       type: String, // 或者是其它合适的类型
//       required: true // 如果你希望这个参数是必须的
//     },
//     yourUserName:{
//       type:String,
//       required:true
//     },
//     yourHeaderImage:{
//       type:String,
//     }
//   })


const messagesContainer = ref(null);
const imputBox = ref(null)
// 当组件挂载后或聊天消息更新时，滚动到底部
onMounted(() => scrollToBottom());
onUpdated(() => scrollToBottom());
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollHeight;
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
// my.value = {
//   "headerImage": "https://p.qqan.com/up/2021-5/16215608436164640.png",
//   "userId": "3210884103",
//   "username": "大头爸爸"

// }
// const your = ref({});
// your.value = {
//   "headerImage": "https://tse3-mm.cn.bing.net/th/id/OIP-C.DS5K4cisxxXdESh9-_8GegAAAA?rs=1&pid=ImgDetMain",
//   "userId": "2978949147",
//   "username": "小头儿子"
// }
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

// websocket聊天实现


const userId = myId; // Replace with actual user ID
const targetUserId = ref(you.yourId);
const newMessage = ref('');
const fileName = ref('12');
const fileType = ref('文本');
const fileData = ref('');
const messages = ref([]);
const fileInput = ref('')
const method = (data1) => {
  console.log(data1);
  const data = JSON.parse(data1)
  let options = {
    timeZone: 'Asia/Shanghai', // 指定时区
    hour12: false // 是否使用12小时制
  };
  console.log(data.targetUserId);
  if (data.userId != userId) {
    const receive = {
      senderId: parseInt(data.userId),
      receiverId: parseInt(data.targetUserId),
      content: data.message,
      contentType: data.fileType,
      sentAt: new Date().toLocaleString('zh-CN', options)
    }
    chatStore.addMessage(receive);
  }


}
onMounted(() => {
  connectWebSocket(userId, method);
  messages.value.push({
    senderId: myId,
    content: "Example message",
    sentAt: new Date().toISOString()
  });
});

const sendChatMessage = async () => {
  const message = {
    targetUserId: targetUserId.value,
    message: newMessage.value,
    fileName: fileName.value,
    fileType: fileType.value,
    file: fileData.value
  };

  sendMessage(JSON.stringify(message));
  let utcDate = new Date(); // 假设这是从服务器获取的UTC时间
  let options = {
    timeZone: 'Asia/Shanghai', // 指定时区
    hour12: false // 是否使用12小时制
  };
  const localMessage = {
    senderId: userId,
    receiverId: parseInt(you.yourId),
    content: newMessage.value,
    contentType: fileType.value,
    sentAt: utcDate.toLocaleString('zh-CN', options)
  }

  console.log(utcDate.toLocaleString('zh-CN', options)); // 输出东八区的本地时间
  messages.value.push({
    senderId: userId,
    content: newMessage.value,
    sentAt: utcDate.toLocaleString('zh-CN', options)
  });
  chatStore.addMessage(localMessage);

  // scrollToBottom();
  await nextTick();
  messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  newMessage.value = '';
  fileName.value = '';
  fileData.value = '';
};



// let socket;
// const messageInput = ref('');
// const messages = ref([]);

// const connectWebSocket = () => {
//     const url = 'ws://10.100.113.33:5000/webSocketServer/1';
//     socket = new WebSocket(url);

//     socket.addEventListener('message', (event) => {
//         const data = JSON.parse(event.data);
//         messages.value.push(data);
//     });

//     // Additional event listeners as in the native JavaScript example
// };


// const sendMessage = () => {
//     if (socket.readyState === WebSocket.OPEN) {
//         chatStore.addMessage({ text:  messageInput.value});
//         const message = { text: messageInput.value };
//         socket.send(JSON.stringify(message));
//         messageInput.value = '';
//     }
// };

// onMounted(() => {
//     connectWebSocket();
// });

// onUnmounted(() => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.close();
//     }
// });
function openFileInput() {
  // 触发文件输入框的点击事件
  fileInput.value.click();
}
function uploadFile(event) {
  // 创建 FormData 对象，并将文件添加进去
  const file = event.target.files[0];
  console.log('选中的文件:', file);
  // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif','image/jpg']; // 允许上传的图片格式
  if (file) {
    // 如果文件存在且类型符合要求
    // 可以继续处理文件，比如上传
    console.log('上传图片:', file);
    const formData = new FormData();
    formData.append('file', file);

    // 调用上传文件的接口
    try {
      upLoadAPI(formData).then((result) => {

        console.log('上传成功:', result.data);
        newMessage.value = result.data
        fileType.value = 1
        sendChatMessage();
        // chatStore.addMessage(localPhoto);
      }).catch((err) => {
        console.log('', err);

      });

    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败')
    }
  } else {
    // 文件类型不符合要求，给出提示
    console.error('请选择图片文件');
    alert('请选择图片文件')
  }


}
</script>
<template >
  <div class="header">
    <div class="header-left">


      <RouterLink to="/home">

        <van-icon name="arrow-left" class="header-exit" color="black" size="25px" />

      </RouterLink>
      {{ you.yourUserName }}
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
          <div v-for="(i) in chatStore.chatMessages" :key="i.sendAt">
            <div class="time">
              {{ i.sentAt }}
            </div>
            <!-- //我是消息发送者 -->
            <div v-if="i.senderId === myId">
              <div class="my-message">
                <div v-if="i.contentType != 1" class="myMessage">
                  {{ i.content }}
                </div>

                <img v-else :src="i.content" alt="" class="message-image-right">

                <van-image round width="2rem" height="2rem" :src="myHeaderImage" class="myHeader-image" />
              </div>
            </div>
            <!-- //你是消息发送者 -->
            <div v-if="i.senderId == you.yourId">
              <div class=" your-message ">
                <van-image round width="2rem" height="2rem" :src="you.yourHeaderImage" class="header-image" />
                <div v-if="i.contentType
                  != 1" class="message">
                  {{ i.content }}
                </div>
                <img v-else :src="i.content" alt="" class="message-image-left">
              </div>
            </div>
          </div>
        </div>


        <div class="footer-a">
          <input type="file" ref="fileInput" class="photo" @change="uploadFile" accept="image/*">
        </div>



      </div>

    </div>

  </div>





  <!-- //输入框 -->
  <div class="footer" ref="inputBox">

    <div class="input">
      <div class="footer-photo">

        <!-- <button @click="uploadFile">上传头像</button> -->
        <van-icon name="photograph" size="35px" class="tu" @click="openFileInput" />
      </div>
      <input name="input" v-model="newMessage" @keyup.enter="sendChatMessage">
      <van-button round type="success" size="small" class="send" @click="sendChatMessage">发送</van-button>
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
.message-image-right {
  max-width: 40%;
  /* 图片的最大宽度 */
  height: auto;
  /* 自适应高度 */
  /* display: block; 让图片水平居中 */
  margin-left: auto;
  border-radius: 10px;
  /* 图片的圆角 */
  display: flex;
  padding-bottom: 20px;
  margin-right: 10px;
  overflow: hidden;
  /* 裁剪超出的部分 */
}

.message-image-left {
  max-width: 40%;
  /* 图片的最大宽度 */
  height: auto;
  /* 自适应高度 */
  /* display: block; 让图片水平居中 */
  margin-right: auto;
  border-radius: 10px;
  /* 图片的圆角 */
  display: flex;
  padding-bottom: 20px;
  margin-left: 10px;
  overflow: hidden;
  /* 裁剪超出的部分 */
}

.chat-container {
  /* visibility: hidden; */
  margin-bottom: 100px;
}

.footer-photo {
  flex: 2;
  width: 12;
  /* visibility: hidden; */

}

.tu {
  display: fixed;
  top: 0;
  left: 0px;
}

.photo {
  /* display: none; */
  /* visibility: hidden; */
  /* display: fixed; */
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  /* width: 100%;
    height: 100%; */
  cursor: pointer;
  /* background-color: white; */
}

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
  margin-bottom: 70px;
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
  height: 200px;

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
  margin-left: 10px;

}

input {
  flex: 10;
  border-radius: 5px;
  /* width:90%;  */
  height: 30px;
  margin-left: 5px;
  /* border:0px; */

}

.send {
  flex: 2;
  margin-left: 10px;
  /* margin-right:5px; */
}</style>
