import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)
    //实例化
const store = new Vuex.Store({
    state: {
        aaa: 0,
        userinfo:{},
        msgonetoone:[]
        
    },
    mutations:{
        getuserinfo(){
            state.userinfo=req.data.userinfo
            // console.log(state.userinfo);
        },
        updatamsgonetoone(state,msg){
            state.msgonetoone=msg
        }
    }
     
})
export default store