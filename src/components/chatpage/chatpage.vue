<template>
  <div class='chatpage'>
      <!-- {{this.$store.state.msgonetoone}}hhhhh -->
      <!-- {{thisallmsg}} -->
      <tobbar :tobbartext="myfriendsuserinfo.username" :isshowicn="false"></tobbar>
      <div class='chatcontent'>
        <riqibox></riqibox>
        <!-- <div class='chatboxcontent' v-for="(item) in $store.state.msgonetoone" :key="item.id" v-show="$store.state.msgonetoone">
          <div v-if="item.substring(0,24)==firendid&&myfriendsuserinfo.touxiangurl">
            <chatboxleft :touxiangurl="webid+myfriendsuserinfo.touxiangurl" :chattext="item.substring(24)"></chatboxleft>
          </div>
          <div v-else>
            <chatboxright :chattext="item.substring(24)"></chatboxright>
          </div> -->
          <!-- {{item.substring(0,24)}} -->
          <!-- hshshshhhhhh -->
        <!-- </div> -->
        
        
        <keep-alive>
          <chatpagebot :socket="socket"></chatpagebot>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import tobbar from '../tobbar/tobbar.vue'
import Chatpagebot from './chatpagebot.vue'
import Chatboxleft from './chatboxleft.vue'
import Chatboxright from './chatboxright.vue'
import Riqibox from './riqibox.vue'
// import soc from 'socket.io/client-dist/socket.io'
// 
export default {
  data(){
    return{
      myfriendsuserinfo:{},
      msgarr:[],
      allmsgarr:[],
      myid:this.$store.state.userinfo._id,
      firendid:this.$route.params.id,
    }
  },
  components: { tobbar, Chatpagebot, Chatboxleft, Chatboxright, Riqibox },
  created(){
     
    
     },
   
  mounted(){
       
  },
  
}
</script>

<style>
.chatcontent{
  margin-top: 50px;
  margin-bottom: 40px;
}
</style>