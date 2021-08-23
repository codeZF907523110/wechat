<template>
  <div class='login'>
      <div class='logontop el-icon-close'>
      </div>
      <div class='phonetext'>
          手机号登录
      </div>
      <div class='logonshuru'>
          
          <div class='logonnicheng coutrys' @touchstart="coutrydown" @touchend="coutrydown" :class="{coutrysdown:coutrydownIs}">
              <span>国家/地区</span>
              <a>中国大陆(+86)</a>
          </div>
          <div class='logonnicheng'>
              <span>手机号</span>
              <input type="text" v-model="phonenumber" placeholder="请填入手机号" >
              
          </div>
      </div>
      <div class='loginmode'>
          <span @touchstart="$router.push('/elselogin')">用微信号</span>
          <span>/</span>
          <span  @touchstart="$router.push('/elselogin')">QQ号</span>
          <span>/</span>
          <span @touchstart="$router.push('/elselogin')">邮箱登录</span>
      </div>
      <div class='logonbtn' @click='phoneloginnext' :class='{changegreen:phonenumber!=""}'>
         下一步
      </div>
      <div class='loginbotts'>
          <loginbott  @showtanchuang="showtc() "></loginbott>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction">
        <div class='tanchuang'>
            <div class='tanchuang1'
               v-for="(item,index1) in items" 
               :key='item.id' 
               :class='{changegrey:index1==isgrey}'  
               @touchstart='clickitem(index1)' 
               @touchend='isgrey=-1'>
               {{item}}
            </div>
            <div class='tanchuang1 quxiao' @click=' drawer=false'>取消</div>
        </div>
      </el-drawer>
  </div>
</template>

<script>
import loginbott from '../../components/loginzujian/loginbott.vue'
import encryption from '../../assets/js/encryption'
export default {
  components: { loginbott },

    data(){
        return{
            coutrydownIs:false,
            Isagreeshow:false,
            touxiangimgurl:'',
            file:'',
            camerashowIs:true,
            phonenumber:'',
            drawer: false,
            direction: 'btt',
            items:['登录其它账号','注册','微信安全中心'],
            isgrey:-1
        }
    },
    methods:{
        setagrees(){
            this.Isagreeshow=!this.Isagreeshow
        },
        coutrydown(){
            this.coutrydownIs=!this.coutrydownIs
        },
        phoneloginnext(){
            this.$axios.phoneloginnext('/isphonenumber',{phonenumber:encryption(this.phonenumber)}).then((res)=>{
                console.log(res);
                if(res==0){
                    alert('此账号不存在')
                }else{
                    alert('账号正确')
                    this.$router.push('/phonelogin?phonenumber='+this.phonenumber)
                }
            })
        },
        handleClose(done) {
                done();
        },
        showtc(){
            console.log('aaaaaa');
            this.drawer = true
        },
        clickitem(index){
            this.isgrey=index
        }
    }
}
</script>

<style >
.changegreen{
    background-color: #07c160!important;
    color: white!important;
    transition: 0.3s;
}
.changegrey{
    background-color: rgb(226, 226, 226);
}
.quxiao{
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    
}
.el-drawer{
    height: 25%!important;
}
.el-drawer__header{
    display: none;
}
.tanchuang{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.tanchuang1{
    height:40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid rgb(240, 240, 240);
}
.loginbotts{    
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
}
.loginmode{
  margin-top: 10px;
  margin-bottom: 10px;
}
.loginmode span{
  color: rgb(29, 0, 134);
  font-size: 14px;
  margin-left: 10px;
  padding-top: 20px!important;
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
    background-color: rgb(245, 245, 245);;
}
.logontop{
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    margin-top: 10px;
    margin-left: 10px;
    }
</style>