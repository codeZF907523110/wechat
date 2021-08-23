<template>
  <div class='useritem1' @touchstart='changebackcolor()' @touchend='changebackcolor()' :class='{changecolor1:isitemcolor}'>
      <div class='touximg' @click.stop>
          <img :src="touxiangimg" alt="">
      </div>
      
      <div class='useritem1r'>
          <span>{{usertext}}</span>
          <div class='applytext'>请求添加你为好友 <span>  {{applycontent}}</span></div>
      </div>
      <div class='istianjia' @click.stop='addfriend()'>
          <div>
              <span v-if='isadd'>添加</span>
              <span v-else>已添加</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
data(){
    return{
        isitemcolor:false,
        isadd:true,
        friendinfo:{}
    }
},
methods:{
    changebackcolor(){
     this.isitemcolor=!this.isitemcolor
   },
   addfriend(){
       this.friendinfo={
           friendid:this.friendid,
           remarksname:this.remarksname,
           touxiangurl:this.touxiangimg,
           username:this.usertext
       }
       this.$axios.addfriend('/addfriend',this.friendinfo).then((res)=>{
           console.log(res);
       })
   }
},
props:{
    touxiangimg:'',
    usertext:'',
    applycontent:'',
    friendid:'',
    remarksname:''
}
}
</script>

<style scoped>
.changecolor1{
    background-color: rgb(235, 235, 235)!important;
}
.istianjia{
    width: 50px;
    height: 20px;
    /* float: left; */
    /* border:1px solid red; */
    font-size: 12px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    line-height: 20px;  
    text-align: center;
    
}
.istianjia div{
    width: 100%;
    height: 100%;
    /* border:1px solid red; */
    border-radius: 3px;
    background-color: rgb(0, 219, 84);
    color: white;
}
.istianjia span{
    font-size: 12px!important;
}
.useritem1{
    width: 100%;
    height: 45px;
    position: relative;
    background-color: white;
}
.useritem1 img{
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    
}
.touximg{
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: relative;
    margin-left: 10px;
    border-radius: 5px;
    margin-top:2px;
    float: left;
}
.useritem1 span{
    font-size: 13px;
    font-weight: 550;
    /* border:1px solid red; */
}
.useritem1r div{
    font-size: 5px;
    margin-top:5px;
    color:rgb(173, 173, 173) ;
}
.useritem1r{
    width:60%;
    border-bottom: 1px solid rgb(238, 238, 238);
    height: 44px;
    margin-left:10px;
    float: left;
}
</style>