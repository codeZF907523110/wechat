<template>
  <div class='myself'>
      <!-- {{userinfo.txfile}} -->
      <div class='userinfor' @click="$router.push('/myself/myselfinfo')">
        <div class='userinfos'>
            <img :src="'http://127.0.0.1:3006'+userinfo.touxiangurl" alt="">
            <div class='usertext'>
              <span class='nicheng'>{{userinfo.username}}</span>
              <div class='fxnumber'>
                <span>峰信号:fxid_tankasndkjsn</span> 
                <i class='el-icon-arrow-right'></i>
              </div>
              <div class='ztbq'>
                <div class='ztbq1'><span>+</span>状态</div>
                <div class='ztbq2'>...</div>
              </div>
            </div>
        </div>
      </div>
      <div class='fxitem1' v-for="(item,index) in fxitemtexts" :key="index"> 
        <div class='kongge' v-show="index==0||index==1||index==5"></div>
        <keep-alive>
          <fxitem :fxitemimg="fxitemimgs[index]" :fxitemtext="item"></fxitem>
        </keep-alive>
      </div>
      <!-- <button @click='btn()'>点击</button> -->
  </div>
</template>
<script>
import fxitem from '../../components/fxitem/fxitem.vue';
export default {
  components: { fxitem },
  data(){
    return{
      userinfo:{},
      isvisit:0,
      fxitemimgs:[require('assets/img/fxitemimgs/zhifu.png'),require('assets/img/fxitemimgs/shoucang.png'),require('assets/img/fxitemimgs/pyquan.png'),require('assets/img/fxitemimgs/kabao.png'),require('assets/img/fxitemimgs/biaoqing.png'),require('assets/img/fxitemimgs/shezhi.png')],
      fxitemtexts:['支付','收藏','朋友圈','卡包','表情','设置'],
      touxiangimgurl:'',
    }
  },
  methods:{
    getinfo(){
      if(this.$route.path=='/wechat/page3'){
          this.$axios.getuserinfo('/getuserinfo').then((res)=>{
            this.userinfo=res;
            if(this.userinfo._id){
              console.log(this.userinfo,'this.userinfo');
            }else{
              this.$router.go(0)
            }
            console.log(this.userinfo);
          })    
      }
    }
  },
  watch:{
    '$route.path': function (newVal, oldVal) {
      this.getinfo()
    }
  },
  mounted(){
      this.getinfo()
  }
}
</script>

<style>
.kongge{
  height: 8px;
}

.userinfor{
  width: 100%;
  height: 110px;
  padding-top: 50px;
  margin-top: 0;
  /* border:1px solid red; */
  background-color: white;
}
.userinfos{
  width: 95%;
  height:60px;
  /* border:1px solid red; */
  margin:0 auto;
}
.userinfos img{
  width: 60px;
  height: 60px;
  border-radius: 5px;
  line-height: 45px;
  float: left;
}
.nicheng{
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-top: 7px;
}
.fxnumber{
  margin-top: 10px;
  font-size: 12px;
  color: rgb(173, 173, 173);
}
.usertext{
  float: left;
  margin-left: 10px;
}
.fxnumber i{
  font-weight: 600;
  margin-left: 100px;
}
.ztbq1{
  width: 50px;
  height: 20px;
  margin-top: 10px;
  font-size: 12px;
  border:1px solid rgb(173, 173, 173);
  text-align: center;
  line-height: 20px;
  border-radius: 15px;
  color: rgb(173, 173, 173);
  float: left;
}
.ztbq2{
  height: 20px;
  width: 20px;
  border:1px solid rgb(173, 173, 173);
  border-radius: 50%;
  color: rgb(173, 173, 173);
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  text-align: center;
  line-height:5px;
  font-size: 25px;
}
</style>