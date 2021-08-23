<template>
  <div class='addfriendpage'>
    <load v-show='isload'></load>
    <tobbar :tobbartext="'申请添加朋友'" :isshowicn="false"></tobbar>
    <div class='addfriendli'>
        <div>
            <div class='addspan'>发送添加好友申请</div>
            <textarea class='shenqingcontent inputs' v-model="applycontent"  name="" id="" cols="30" rows="10" maxlength="50"></textarea>
        </div>
        <div>
            <div class='addspan'>设置备注</div>
            <input type="text" class='beizhu inputs' v-model="remarksname" maxlength="20">
        </div>
        <div>
            <div class='addspan'>标签</div>
            <div class='biaoqian inputs'>添加标签</div>
        </div>
        <div>
            <div class='addspan'>设置朋友权限</div>
            <div></div>
        </div>
        <div>
            <div class='addspan'>朋友圈和状态</div>
            <div></div>
        </div>
        <div class='send' @click='applysend()'>发送</div>
        <div class='send1' @click='removelist()'>删除</div>
    </div>
        
        
  </div>
</template>

<script>
import Load from '../load/load.vue'
import tobbar from '../tobbar/tobbar.vue'
export default {
  data(){
      return{
          applycontent:"",
          isload:false,
          myid:'',
          remarksname:''
      }
  },
  components: { tobbar, Load },
  methods:{
      applysend(){
          this.isload=true
          let friendid=this.$route.query.friendid
          this.$axios.applysend('/addapplysend',{friendid:friendid,myid:this.myid,applycontent:this.applycontent,remarksname:this.remarksname}).then((res)=>{
              console.log(res,'res');
              if(res==3){
                  console.log('申请成功');
                  setTimeout(() => {
                      this.isload=false
                  }, 500);
              }else if(res==0){
                  console.log('申请失败');
                  setTimeout(() => {
                      this.isload=false
                  }, 500);
              }else if(res==2){
                  console.log('已申请');
                  setTimeout(() => {
                      this.isload=false
                  }, 500);
              }
          })
      },
      removelist(){
          this.$axios.removelist('/removelist',{friendid:this.$route.query.friendid})
      }
  },
  mounted(){
      this.$axios.getuserinfo("/getuserinfo").then((res)=>{
          console.log(res);
          this.applycontent='我是'+res.username
          this.myid=res._id
          this.remarksname=res.username
      })
  }
}
</script>

<style>

.send{
    width: 70px;
    height: 30px;
    background-color: #07c160;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    line-height: 30px;
    font-size: 14px;
}
.addfriendpage{
    background-color: white!important;
    height: 100vh;
}
.addfriendli{
    width: 90%;
    /* border:1px solid red; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 40px;
}
.addspan{
    font-size: 12px;
    color: rgb(202, 202, 202);
    margin-bottom: 5px;
    margin-top: 5px;
}
.inputs{
    width: 98%;
    background-color: rgb(241, 241, 241);
    border:none;
    border-radius: 10px;
    resize: none;
    outline :none;
    font-size: 15px;
    font-weight: 900;
}
.shenqingcontent{
    height: 100px;
    padding-left: 10px;
    padding-top: 5px;
}
.beizhu{
    height: 40px;
    padding-left: 10px;
}
.biaoqian{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
}
</style>