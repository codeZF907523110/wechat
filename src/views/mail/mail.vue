<template>
  <div class='wechat' >
    <div v-if='!isload'>
      <div class='wechattop'></div>
      <tobbar :tobbartext="'通讯录'" :isshowicn="true"></tobbar>
      <div class='useritems'>
        <div  v-for="(item,index) in 4" :key="item.id" @click="gotonewfriend(index)">
            <useritem :usertext="usertext[index]" :touxiangimg="touxiangimg[index]"></useritem>
        </div>
      </div>
      <div class='useritemss' v-for="(item,index) in myfriendlist" :key="item.id">
        <keep-alive>
          <useritem  :remarksname="item.remarksname"  :userid="item.friendid" @click.native='gotochatpage(index)' @click.stop></useritem>
        </keep-alive>
      </div>
    </div>
      
      <load v-else></load>
  </div>
</template>
<script>
import Load from '../../components/load/load.vue'
import Tobbar from '../../components/tobbar/tobbar.vue'
const Useritem=()=>import('../../components/useritem/useritem.vue')
export default {
  components: {  Tobbar, Useritem, Load },
  data(){
    return{
      touxiangimg:[require('assets/img/addff.png'),require('assets/img/addff.png'),require('assets/img/addff.png'),require('assets/img/addff.png')],
      usertext:['新的朋友','群聊','标签','公众号'],
      myfriendsuserinfo:{},
      myfriendlist:[],
      isload:false
    }
  },
  methods:{
    gotonewfriend(index){
      if(index==0){
        this.$router.push('/newfriends')
      }
    },
    gotochatpage(index){
      console.log(this.myfriendsuserinfo[index],'hhshshs');
      this.$router.push('/chatpage/'+this.myfriendsuserinfo[index]._id)
    },
    getfriendlist(){
      if(this.$route.path=='/wechat/page1'){
        if(this.myfriendlist.length==0){
          console.log(this.myfriendlist,'this.myfriendlist');
          this.isload=true
        }
        
        this.$axios.getuserinfo('/getuserinfo').then((res)=>{
            this.myfriendlist=res.myfriends
            // console.log(this.myfriendlist,'this.myfriendlist');
            if(this.myfriendlist==undefined){
              console.log('页面刷新失败');
              this.$router.go(0)
            }
            if(this.myfriendlist){
                setTimeout(() => {
                  this.$forceUpdate()
                  this.isload=false
                }, 500);
                
            }
            
        })
      }
    }
  },
  watch:{
    '$route.path': function (newVal, oldVal) {
      // this.methods.loaduserinfo()
      // console.log(methods);
      this.getfriendlist()
    }
  },
  mounted(){
    this.getfriendlist()
    
    
  }
  
}
</script>

<style>
.wechattop{
  height: 40px;
}
.useritems{
  padding-bottom: 10px;
}
</style>