<template>
  <div class='logon'>
      <div class='logontop el-icon-close' >
      </div>
      <div class='phonetext'>
          手机号注册
      </div>
      <div class='logonshuru'>
          <div class='logonnicheng'>
              <span>昵称</span>
              <input v-model="logoninformation.username" type="text" placeholder="例如:戴勤">
              <div class='settouxiang' @touchstart="settouups" @touchend="settouups" :class="{settouupc:settouupIs}">
                  <li v-show="camerashowIs" class='el-icon-camera-solid' ></li>
                  <img v-show="!camerashowIs" class='touxiangimg' :src="touxiangimgurl" alt="">
                  <input type="file" accept=".jpeg, .jpg, .png"  @change="changeimg">
              </div>
          </div>
          <div class='logonnicheng coutrys' @touchstart="coutrydown" @touchend="coutrydown" :class="{coutrysdown:coutrydownIs}">
              <span>国家/地区</span>
              <a>中国大陆(+86)</a>
              
          </div>
          <div class='logonnicheng'>
              <span>手机号</span>
              <input v-model="logoninformation.phonenumber" type="text" placeholder="请填入手机号">
              
          </div>
          <div class='logonnicheng'>
              <span>密码</span>
              <input v-model="logoninformation.password" type="text" placeholder="填入密码">
          </div>
      </div>
      <div class='isagree'>
          <li v-show='!Isagreeshow' class='el-icon-circle-check li1' @touchstart="setagrees"></li>
          <li v-show='Isagreeshow' class='el-icon-success li2' @touchstart="setagrees" ></li>
          <span class='span1'>已同意并阅读</span>
          <span class='span2'>峰峰软件许可及服务协议</span>
      </div>
      <div class='logonbtn' @click='logon'
        :class='{changegreen:logoninformation.phonenumber!=""&&logoninformation.password!=""&&logoninformation.username!=""&&Isagreeshow}'
      >
          注册
      </div>
      <div class='logonbtn' @click='remove'
        :class='{changegreen:logoninformation.phonenumber!=""&&logoninformation.password!=""&&logoninformation.username!=""&&Isagreeshow}'
      >删除</div>
      <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :before-close="handleClose"
        >
        <span class='quedingtitle'>注册失败</span>
        <div class='quedingli'>
            {{warningtext}}
        </div>
        <div class='anniu'>
            <div class='anniuli' :class='{btndisappear:islogon}' style="color:black;font-weight:600" @click='dialogVisible=false'>取消</div>
            <div class='anniuli' :class='{btndisappear:!islogon}' @click='logonsure()' style="color:rgb(89, 0, 148);font-weight:600">确定</div>
        </div>
        
      </el-dialog>
  </div>
</template>

<script>
import encryption from '../../assets/js/encryption'
// import axios from 'axios'
// import {logon} from '../../api/request'
export default {
    data(){
        return{
            settouupIs:false,
            coutrydownIs:false,
            Isagreeshow:false,
            touxiangimgurl:'',
            file:'',
            camerashowIs:true,
            logoninformation:{
                username:'',
                phonenumber:'',
                country:'中国',
                password:'',
                touxiangurl:''
            },
            dialogVisible: false,
            warningtext:'',
            islogon:false
        }
    },
    methods:{
        setagrees(){
            this.Isagreeshow=!this.Isagreeshow
        },
        settouups(){
            this.settouupIs=!this.settouupIs;
        },
        coutrydown(){
            this.coutrydownIs=!this.coutrydownIs
        },
        changeimg(e){
            this.camerashowIs=false;
            this.file=e.target.files[0];
            console.log(this.file);
            let url='';
            let reader=new FileReader();
            reader.readAsDataURL(this.file);//读取指定的blob或file对象
            // console.log(this.file);
            let that=this;
            reader.onload=function(e){
                url = this.result.substring(this.result.indexOf(",") + 1);
                // console.log(that.logoninformation.txfile);
                that.touxiangimgurl = "data:image/png;base64," + url;
            }
        },
        logon(){
            new Promise((resolve,reject)=>{
                var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
                if(this.logoninformation.username!=''&&this.logoninformation.phonenumber!=''&&this.logoninformation.password!=''){
                    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.logoninformation.phonenumber))) {
                        this.dialogVisible=true
                        this.warningtext='你输入的是一个无效的手机号码'
                        reject('手机号错误')
                    }else if(!pwdRegex.test(this.logoninformation.password)){
                        this.dialogVisible=true
                        this.warningtext='密码必须是8-16位的数字、字符组合(不能是纯数字)'
                        reject('密码格式错误')
                    }else{
                        resolve('信息正确')
                    }
                }else{
                    this.dialogVisible=true
                    this.warningtext='请将信息内容补全'
                }
            }).then((res)=>{
                let userinfo={
                    username:this.logoninformation.username,
                    phonenumber:encryption(this.logoninformation.phonenumber),
                    password:encryption(this.logoninformation.password),
                    country:this.logoninformation.country
                }
                var formdata=new FormData()
                formdata.append('touxiangfile',this.file)
                formdata.append('userinfo', JSON.stringify(userinfo) )
                
                let that=this;
                async function sendmylogon(){
                    await that.$axios.logon('/logon',formdata).then((res)=>{
                        console.log(res);
                        that.dialogVisible=true
                        if(res==1){
                            that.islogon=false
                            that.warningtext='用户已存在'
                        }else if(res==0){
                            that.islogon=true
                            that.warningtext='注册成功'
                        }
                    })
                    // console.log(islogon);
                    // await this.$axios.logon('/logon',{userinfo}).then((res)=>{console.log(res)})
                }
                sendmylogon()
            })
        },
        remove(){
            this.$axios.remverything('/remverything');
        },
        handleClose(done) {  
                done();
        },
        logonsure(){
            if(this.islogon){
                this.$router.push('/phonelogin?phonenumber='+this.logoninformation.phonenumber)
            }
        }
    },
}
</script>

<style>
.btndisappear{
    display: none!important;
}
input{
    background-color: rgb(245, 245, 245);
}
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
.changegreen{
    background-color: #07c160!important;
    color: white!important;
    transition: 0.3s;
}
.touxiangimg{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
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
    overflow: hidden;
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