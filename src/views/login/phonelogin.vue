<template>
  <div class='login'>
      <div class='logontop el-icon-close' @touchstart="$router.go(-1)">
      </div>
      <div class='phonetext'>
          手机号登录
      </div>
      <div class='logonshuru'>
          <div class='logonnicheng'>
              <span>手机号</span>
              <input v-model="logininformation.phonenumber" readonly="true" type="text" >
          </div>
          <div class='logonnicheng'>
              <span v-if="logintype">密码</span>
              <span v-else>验证码</span>
              <input v-if="logintype" v-model="logininformation.password" type="text" placeholder="请填入密码">
              <div v-else>
                  <input  v-model="logininformation.password" type="text" placeholder="请填入验证码">
                  <div class='getyanzheng' @click="dialogVisible = true">获取验证码</div>
              </div>
              
          </div>
      </div>
      <div class='loginmode' @click='logintype=!logintype' >
          <span v-if="logintype">用短信验证登录</span>
          <span v-else>用密码登录</span>
      </div>
      <div class='logonbtn'  @click='phonelogin' :class='{changegreen:logininformation.phonenumber!=""&&logininformation.password!=""}'>
         登录
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose"
        >
        <span class='quedingtitle'>确认手机号码</span>
        <div class='quedingli'>
            我们将发送验证码短信到这个号<br>码:<br>13848267339
        </div>
        <div class='anniu'>
            <div class='anniuli anniu1' style="color:black;font-weight:600" @click='dialogVisible=false'>取消</div>
            <div class='anniuli' style="color:rgb(89, 0, 148);font-weight:600">确定</div>
        </div>
        
      </el-dialog>
  </div>
</template>

<script>
import encryption from '../../assets/js/encryption'
export default {
    data(){
        return{
            coutrydownIs:false,
            Isagreeshow:false,
            touxiangimgurl:'',
            file:'',
            camerashowIs:true,
            logininformation:{
                phonenumber:this.$route.query.phonenumber,
                password:''
            },
            logintype:true,//true为密码登录,
            dialogVisible: false
        }
    },
    methods:{
        setagrees(){
            this.Isagreeshow=!this.Isagreeshow
        },
        coutrydown(){
            this.coutrydownIs=!this.coutrydownIs
        },
        setCookie() {
              
            },
        phonelogin(){
            let logininformation={
                phonenumber:encryption(this.logininformation.phonenumber),
                password:encryption(this.logininformation.password)
            }
            this.$axios.phonelogin('/phonelogin',{logininformation:logininformation}).then(async(res)=>{
                // console.log(res);
                if(res.islogin==2){
                    await this.$cookies.set('token',res.token,{expiresIn: '365d'})
                    await this.$router.push('/wechat/page0')
                }
                
            })
        },
        handleClose(done) {  
                done();
        }
        
    },
    created(){
    }
}
</script>

<style>
.el-dialog__body{
    padding:10px 20px;
    padding-top: 20px;
    padding-bottom: 0px;
}
.anniu{
    height: 40px;
    border-top:0.05rem solid rgb(221, 221, 221);
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
     
}
.quedingli{
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
    line-height: 22px;
}
.quedingtitle{
    color: black;
    font-weight:600;
    display: block;
    text-align: center;

}
.el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    margin-top: 0!important;
}
.el-dialog__header{
    display: none;
}
.getyanzheng{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
}
.changegreen{
    background-color: #07c160!important;
    color: white!important;
}
input{
    background-color: rgb(245, 245, 245);
}
.loginmode{
    font-size: 12px;
    margin-left: 10px;
    margin-top: 10px;
    color: rgb(89, 0, 148);
}
.touxiangimg{
    width: 50px;
    
}
.settouxiang input{
    position: absolute!important;
    left: 0!important;
    width: 50px;
    height: 50px;
    opacity: 0;
}
.logonbtn2{
    background-color:rgb(0, 197, 89) ;
    color: white;
}
.logonbtn{
    width: 95%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgb(238, 237, 237);
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 10px;
    color:rgb(184, 184, 184) ;
}
.isagree li{
    font-size: 14px;
}
.isagree .li2{
    color:rgb(0, 197, 89) ;
}
.isagree .span1{
    color: rgb(204, 204, 204);
    margin-left: 5px;
}
.isagree .span2{
    color: rgb(0, 6, 94);
    margin-left: 5px;
}
.isagree{
    height:20px;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
}
.coutrysdown{
    background-color: rgb(211, 211, 211);
}
.logonnicheng a{
    color: rgb(0, 197, 89);
    font-size:14px ;
    position: absolute;
    left: 70px;
    font-weight: 500;
}
.settouupc{
    background-color:rgb(0, 197, 89)!important;
}
.settouxiang li{
    color: white;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.settouxiang{
    width: 50px;
    height: 50px;
    background-color: rgb(236, 236, 236);
    position: absolute;
    right: 0;
    top: -10px;
}
.phonetext{
    margin-top: 10px;
    margin-left: 10px;
}
.logonshuru{
    width: 95%;
    margin: 0 auto;
    /* border:1px solid red; */
    margin-top:20px;
}
.logonnicheng{
    height: 40px;
    line-height: 40px;
    /* width: 80%; */
    border-bottom: 1px solid rgb(233, 233, 233);
    position: relative;
    margin-top: 5px;
}
.logonnicheng span{
    float: left;
    font-size: 13px;
}
.logonnicheng input{
    border:none;
    outline:medium;
    /* float: left; */
    position: absolute;
    left: 70px;
    top: 50%;
    transform: translateY(-50%);
}
.logontop{
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 10px;
    }
.logon{
    width: 100vw;
    height: 100vh;
}
</style>