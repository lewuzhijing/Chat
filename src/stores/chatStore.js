// stores/chatStore.js
import { defineStore } from 'pinia';
import {reactive, ref} from 'vue'
import {getChatMessageAPI } from '@/apis/user'
export const useChatStore = defineStore('chat', {
  state: () => ({
    chatMessages: loadMessagesFromLocalStorage() ||[]
    

    // messages: [
    //   {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:45:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12345,
    // },
    // {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:45:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",

    //   "id": 12345,
    // },
    // {
    //   "senderQQ": "3210884103",
    //   "receiverQQ": "2978949147",
    //   "timestamp": "2024/04/02/15:50:00",
    //   "content": "随便，你决定吧。",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12346,
    // },
    // {
    //   "senderQQ": "3210884103",
    //   "receiverQQ": "2978949147",
    //   "timestamp": "2024/04/02/15:50:00",
    //   "content": "随便，你决定吧。",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12346,
    // },
    // {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:45:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12345,
    // },
    // {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:45:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12345,
    // },
    // {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:45:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12345,
    // },
    // {
    //   "senderQQ": "2978949147",
    //   "receiverQQ": "3210884103",
    //   "timestamp": "2024/04/02/15:51:00",
    //   "content": "嗨，晚上想吃什么？",
    //   "messageType": "text",
    //   "readStatus": "unread",
    //   "id": 12345,
    // },
   

    // ], // 存储聊天记录
  }),
  getters: {
    // 可以定义一些getter来处理状态
  },
  actions: {
    addMessage(message) {
      const lastMessage=message
      this.chatMessages.push(lastMessage);
      saveMessagesToLocalStorage(this.chatMessages)
      // this.scrollToBottom(); // 添加消息后自动滚动到底部
    },
    // scrollToBottom() {
    //   // 假设你有一个滚动容器的ref，在组件中调用这个方法以滚动到底部 
    //   // 这部分逻辑应在组件内部实现，这里仅作示意
    //   this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
    // },
     getChatMessage(friendId){
      getChatMessageAPI(friendId).then((result) => {
        console.log('朋友消息',result.data);
        this.chatMessages=result.data
        saveMessagesToLocalStorage( this.chatMessages)
        
      }).catch((err) => {
        console.log('获取朋友消息失败',err);
        
        
      });
    },
    

   
  },
  
},

{
  persist: true,
}
);
// 辅助函数：将消息保存到localStorage
function saveMessagesToLocalStorage(messages) {
  try {
    localStorage.setItem('chat', JSON.stringify(messages))
  } catch (e) {
    console.error('Failed to save messages to local storage.', e)
  }
}
// 辅助函数：从localStorage加载消息
function loadMessagesFromLocalStorage() {
  try {
    const storedMessages = localStorage.getItem('chat')
    return storedMessages ? JSON.parse(storedMessages) : null
  } catch (e) {
    console.error('Failed to load messages from local storage.', e)
    return null
  }
}