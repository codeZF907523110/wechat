<template>
  <div class='userhomepage' v-show="true">
      <tobbar :tobbartext="''" :isshowicn="false"></tobbar>
      <div class='userinfoa'>
        <div class='usertouxiang'>
          <img :src="require('assets/img/touxiang.jpg')" alt="">
        </div>
        <div class='uerinfotext'>
          <div class='userinfotext1'>{{friendinfo.username}}</div>
          <div class='userinfotext2'>峰信号:{{friendinfo.accounts}}</div>
          <div class='userinfotext3'>地区:{{friendinfo.country}}</div>
        </div>
      </div>
      <div v-for="(item,index) in textitem1" :key="index">
        <setitem :span1text="item" :span2text="phonenumber[index]"></setitem>
      </div>
      <div v-for="(item,index) in isaddtext1" :key="item.id" >
        <div class='isadd'  v-if="isaddtext1[index]!=''"  @touchstart='changebackcolor(index,0)' @touchend='changebackcolor(index,1)' :class='{changecolor1:isitemcolor==index}'>
          {{isaddtext1[index]}}
        </div>
      </div>
  </div>
</template>

<script>
import Setitem from '../../components/setitem/setitem.vue'
import tobbar from '../../components/tobbar/tobbar.vue'
export default {
  data(){
    return{
      textitem1:['电话号码','设置备注和标签','个性签名','朋友圈'],
      isaddtext1:['添加到通讯录','发消息','音视频通话'],
      isitemcolor:-1,
      friendid:this.$route.params.id,
      friendinfo:{},
      phonenumber:[],
      iscreated:false,
    }
  },
  components: { tobbar, Setitem },
  methods:{
    changebackcolor(index,num){
      if(num==0){
        this.isitemcolor=index
      }else{
        this.isitemcolor=-1
        if(index==0){
          this.$axios.getuserinfo('/getuserinfo').then((res)=>{
            // console.log(res._id,'userinfo');
            this.$router.push('/addfriendpage?'+'friendid='+this.$route.params.id)
          })
          
        }
      }
      
    },
    
  },
  mounted(){
      this.$axios.getfriendinfo('/getfriendinfo',{userid:this.$route.params.id}).then((res)=>{
          console.log(res);
          if(res){
              this.friendinfo=res
              console.log(this.friendinfo);
          }
          
      })
  }
  
  }
</script>
<style scoped>
.changecolor1{
  background-color: rgb(230, 230, 230)!important;
  transition: 0.3s;
}
.isadd2{
  margin-top: 0px!important;
}
.isadd{
  border-bottom: 1px solid rgb(238, 238, 238);
  height: 40px;
  width: 100%;
  background-color: white;
  line-height: 40px;
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(0, 76, 143);
  transition: .2s;
}
.phonenumber{
  background-color: white;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 15px;
  border-bottom: 1px solid rgb(238, 238, 238);
  transition: .2s;
}
.phonespan1{
  margin-left: 10px;
}
.phonespan2{
  color: rgb(0, 27, 148);
  margin-left: 20px;
}
.userinfotext1{
  font-size: 17px;
  font-weight:600;
  font-family: '微软雅黑';
}
.userinfotext3,.userinfotext2{
  color:rgb(173, 173, 173) ;
  font-size: 13px;
  margin-top: 5px;
}
.uerinfotext{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left:90px;
}
.usertouxiang{
  float: left;
}
.userhomepage{
  margin-top: 40px;
  position: relative;
}
.userinfoa{
  height: 120px;
  /* border:1px solid red; */
  width: 100%;
  background-color: white;
  position: relative;
  border-bottom: 1px solid rgb(238, 238, 238);
}
.userinfoa .usertouxiang{
  width: 60px;
  height: 100%;
  position: relative;
}
.usertouxiang img{
  width:60px;
  height: 60px;
  border-radius:8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}
</style>