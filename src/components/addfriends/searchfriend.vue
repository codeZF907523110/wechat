<template>
    <div class='searchfriend'>
        <div>
            <div class='searchinput'>
            <i class='el-icon-search'></i>
            <input type="text" name="" id="" placeholder="峰信号/手机号" v-model="friendphone" maxlength='20'>
            </div>
            <span class='cancelsearch' @click='$router.back()'>取消</span>
        </div>
        <div class='issearch' :class='{changecolor:ischangecolor}' v-show="friendphone!=''" @touchstart='ischangecolor=!ischangecolor' @touchend='ischangecolor=!ischangecolor' @click='getfriendinfo()'>
            <div class='addfrdimg'><img :src="require('assets/img/addfriend.png')" alt=""></div>
            <span class='issearchspan1'>搜索:</span>
            <span class='issearchspan2'>{{friendphone}}</span>
        </div>
    </div>
</template>

<script>
import encryption from '../../assets/js/encryption'
export default {
    data(){
        return{
            friendphone:'',
            ischangecolor:false
        }
    },
    methods:{
        async getfriendinfo(){
            await this.$axios.getfriendinfo('/getfriendinfo',{friendphone:encryption(this.friendphone)}).then((res)=>{
                if(res){
                    console.log(res);
                    this.$router.push('/userhomepage/'+res._id)
                }
                
            })
        }
    }
}
</script>

<style>
.changecolor{
    background-color: rgba(184, 184, 184,0.2)!important;
}
.issearch span{
    font-size: 14px;
    font-family: '微软雅黑';
}
.issearch .issearchspan1{
    margin-left: 60px;
}
.issearch .issearchspan2{
    color:rgb(0, 221, 29)
}
.issearch{
    width: 100%;
    height: 50px;
    /* border:1px solid red; */
    background-color: white;
    position: absolute;
    top: 40px;
    line-height: 50px;
}
.addfrdimg{
    width: 40px;
    height: 40px;
    background-color: rgb(0, 194, 81);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    border-radius: 3px;
}
.addfrdimg img{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 53%;
    transform: translate(-50%,-50%);
}

.searchfriend{
    margin-top: 10px;
}
.searchinput{
    width: 85%;
    margin-left: 6px;
    height: 25px;
    background-color: white;
    position: relative;
    line-height: 25px;
    color: rgb(189, 189, 189);
    padding-left: 3px;
    border-radius: 3px;
    
}
.searchinput i{
    /* border:1px solid red; */
    font-weight: 600;
}
.searchinput input{
    width: 80%;
    /* width: 100%; */
    height: 100%;
    border:none;
    outline: none;
    margin-left:8px;
    caret-color: rgb(0, 221, 29);
}
.searchinput{
    float: left;
}
.searchfriend .cancelsearch{
    float: left;
}
.cancelsearch{
    display: block;
    line-height: 25px;
    height: 25px;
    font-size: 12px;
    margin-left: 10px;
    color: rgb(0, 33, 179);
}
</style>