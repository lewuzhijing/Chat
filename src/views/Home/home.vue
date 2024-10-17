<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';
import { connectWebSocket } from '@/utils/websocket';
import { loginAPI } from '@/apis/user';

const search = ref('');
const userStore = useUserStore();
const chatStore = useChatStore();
const userId = userStore.id;
const detailInfo = ref(null);
const friends = reactive([]);
const userPicFallback = 'https://img.zcool.cn/community/01cfd95d145660a8012051cdb52093.png@1280w_1l_2o_100sh.png';

const method = (data1) => {
  const data = JSON.parse(data1);
  if (data.userId !== userId) {
    const receive = {
      senderId: parseInt(data.userId),
      receiverId: parseInt(data.targetUserId),
      content: data.message,
      contentType: data.fileType,
      sentAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    };
    chatStore.addMessage(receive);
  }
};

const intochat = (id) => {
  chatStore.getChatMessage(id);
};

onMounted(async () => {
  await userStore.getDetailInfo();
  detailInfo.value = userStore.userInfo.detail;
  if (detailInfo.value && !detailInfo.value.userPic) {
    detailInfo.value.userPic = userPicFallback;
  }
  friends.value = userStore.userInfo.value.data.friends;
  connectWebSocket(userId, method);
  
  const res = await loginAPI({ qqid: userStore.userInfo.qqid, password: userStore.userInfo.password });
  if (res && res.code === 0) {
    userStore.userInfo.value = res;
    friends.value = reactive(userStore.userInfo.value.data.friends);
  } else {
    alert('账号或密码错误！');
  }
});

nextTick(() => {
  connectWebSocket(userId, method);
});
</script>

<template>
  <div class="Home">
    <div class="header">
      <div class="header-left">
        <RouterLink to="/modInfo">
          <van-image round width="2rem" height="2rem" :src="detailInfo?.userPic || userPicFallback" class="header-image" />
        </RouterLink>
        <div class="myName">{{ detailInfo?.username || '' }}</div>
      </div>
      <div class="header-right">
        <van-icon name="plus" />
      </div>
    </div>
    <div>
      <van-search v-model="search" class="search" shape="round" placeholder="请输入搜索关键词" />
    </div>
    <div>
      <RouterLink 
        v-for="item in friends" 
        :key="item.id" 
        :to="{ name: 'privateChat', query: { yourId: item.id, yourUserName: item.username, yourHeaderImage: item.userPic }}" 
        @click="intochat(item.id)"
      >
        <div class="oneMessage">
          <van-image round width="3rem" height="3rem" :src="item.userPic || userPicFallback" class="header-image" />
          <div class="friedName">
            {{ item.username }}
            <div class="lastMessage">
              {{ item.lastMessage ? (item.lastMessage.contentType === 1 ? '[图片]' : item.lastMessage.content) : '' }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="footer">
      <div class="footerIcon">
        <van-icon name="chat-o" class="navMessage" size="25" />
        <van-icon name="friends-o" class="navFriend" size="25" />
        <van-icon name="contact-o" class="navPerson" size="25" />
      </div>
      <div class="footerText">
        <div class="TMessage">消息</div>
        <div class="TFriend">朋友</div>
        <div class="TPerson">个人</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Home {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
}

.header {
  display: flex;
  width: 100vw;
  height: 35px;
  background-color: rgb(248, 247, 247);
  padding: 5px;
  justify-content: space-between;
  box-sizing: border-box;
}

.header-right {
  justify-content: flex-end;
  margin-left: 5px;
}

.header-left {
  display: flex;
}

.myName {
  margin-left: 10px;
}

.search {
  border-radius: 5px;
}

.oneMessage {
  padding: 5px 0 5px 5px;
  display: flex;
}

.oneMessage:hover {
  background-color: rgb(223, 222, 222);
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

.navPerson,
.navMessage,
.navFriend,
.TMessage,
.TFriend,
.TPerson {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.footer {
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgb(230, 230, 230);
}

.footerIcon,
.footerText {
  display: flex;
}
</style>
