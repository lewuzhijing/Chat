<script setup>

import {ref} from 'vue';
const reHeaderImage = ref([
      { url: 'https://p.qqan.com/up/2021-5/16215608436164640.png' },
    ]);
  
</script>
<template>
    <!-- 顶部导航 -->
   <div class="header">
         <div class="header-left">
          
            
          <RouterLink to="/home">

           <van-icon name="arrow-left"  class="header-exit" color="black" size="25px"/>
         
          </RouterLink>
                 
         </div>
         <div class="header-left">
          编辑资料
         </div>
      </div>
      <!--表单信息 -->
      <div class="main-a">
      
      </div>
     
      <van-field name="uploader" label="修改头像">
  <template #input>
   
    <van-uploader v-model="reHeaderImage" />
    </template>
  </van-field>


</template>
<style scoped>
  .header{
      width:100%;
      height:53px;
      position: fixed;
      left:0;
      top:0;
      z-index:999;
      background-color:white;
      border-bottom:0.5px solid rgb(235, 228, 228);
      display:float;
      /* justify:space-between; 
      text-align:center */

  }
  .header-left{
         float:left;
         font-size:25px;
         line-height:50px
       
     }
     .header-center{
         float:center;
         font-size:25px;
         line-height:50px
     }
     .main-a{
      width:100%;
      height:53px;
     }
</style>