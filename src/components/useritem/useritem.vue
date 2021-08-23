<template>
  <div class='useritem' @touchstart='changebackcolor()' @touchend='changebackcolor()' :class='{changecolor1:isitemcolor}'>
      <div class='tximg'>
          <img :src="touxiangurl" alt="" @click='gotouserhome()' @click.stop>
      </div> 
      <div class='useritemr'>
          <span>{{username}}</span>
      </div>
  </div>
</template>
<script>
import load from '../load/load.vue';
export default {
  components: { load },
data(){
    return{
        isitemcolor:false,
        username:'',
        friendinfo:{},
        touxiangurl:''
    }
},
methods:{
    changebackcolor(){
     this.isitemcolor=!this.isitemcolor
   },
   gotouserhome(){
       if(this.userid){
           console.log(this.usertext,'lalallalalalla');
            this.$router.push('/userhomepage/'+this.userid)
       }
       
   }
},
props:{
    touxiangimg:'',
    usertext:'',
    userid:'',
    remarksname:''
},
async mounted(){
    
    //请求信息
    if(this.userid!=undefined){
        await this.$axios.getfriendinfo('/getfriendinfo',{userid:this.userid}).then(async(res)=>{
            this.friendinfo=res
            if(this.friendinfo._id){
                console.log(this.friendinfo,'this.friendinfo');
            }
        })
        console.log(this.friendinfo,'this.friendinfo');
        if(this.friendinfo._id){  
        }else{
            await this.$router.go(0)
        }
    }
    //判断文字
    if(this.usertext!=undefined){
        this.username=this.usertext
    }else{
        if(this.remarksname){
            this.username=this.remarksname
        }
        this.username=this.friendinfo.username
    }
    //判断头像
    if(this.touxiangimg==undefined){
         this.touxiangurl=this.$baseURL+this.friendinfo.touxiangurl
    }else{
        this.touxiangurl=this.touxiangimg
    }

    
    // console.log(this.userid);
},
}
</script>

<style>
.tximg{
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    margin-left: 10px;
    float: left;
    margin-top: 3px;
}
.useritem{
    width: 100%;
    height: 45px;
    /* border:1px solid red; */
    line-height: 45px;
    background-color: white;
    
}
.useritem img{
    width: 40px;
    /* height: 40px; */
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    
}
.useritem span{
    font-size: 13px;
    font-weight: 550;
    /* border:1px solid red; */
}
.useritemr{
    width: 83%;
    border-bottom: 1px solid rgb(238, 238, 238);
    height: 44px;
    float: left;
    margin-left: 10px;
}
</style>