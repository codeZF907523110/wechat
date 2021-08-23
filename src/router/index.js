import Vue from 'vue'
import VueRouter from 'vue-router'

const tabbar=()=>import('../components/tabbar/tabbar.vue')

const logon=()=>import('../views/logon/logon.vue')

const login=()=>import('../views/login/login.vue')

const elselogin=()=>import('../views/login/elselogin.vue')

const phonelogin=()=>import('../views/login/phonelogin.vue')

const myselfinfo=()=>import('../views/myself/myselfinfo.vue')

const Wechat=()=>import('../views/displaypage/displaypage.vue')

const setusername=()=>import('../views/myself/setusername')

const addfriends=()=>import('../components/addfriends/addfriends')

const searchfriend=()=>import('../components/addfriends/searchfriend')

const userhomepage=()=>import('../components/userhomepage/userhomepage')

const newfriends=()=>import('../views/mail/newfriends/newfriends')

const chatpage=()=>import('../components/chatpage/chatpage')

const addfriendpage=()=>import('../components/addfriends/addfriendpage')

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        path: '/',
        redirect: '/wechat/page0',
        meta: { requiresAuth: true }
    },{
        path:'/newfriends',
        component:newfriends,
        meta: { requiresAuth: true }
    },{
        path:'/chatpage/:id',
        component:chatpage,
        meta: { requiresAuth: true }
    },{
        path:'/addfriends',
        component:addfriends,
        meta: { requiresAuth: true }
    },{
        path:'/userhomepage/:id',
        component:userhomepage,
        meta: { requiresAuth: true }
    },{
        path:'/addfriends/searchfriend',
        component:searchfriend,
        meta: { requiresAuth: true }
    },{
        path:'/myself/setusername',
        component:setusername,
        meta: { requiresAuth: true }
    },{
        path:'/Wechat/:id',
        component:Wechat,
        meta: { requiresAuth: true }
    },
    {
        path: '/myself/myselfinfo',
        component: myselfinfo,
        meta: { requiresAuth: true }
    },
    {
        path: '/logon',
        component: logon
    }, {
        path: '/phonelogin',
        component: phonelogin
    }, {
        path: '/elselogin',
        component: elselogin
    }, {
        path: '/login',
        component: login
    },
    {
        path: '/tabbar',
        component: tabbar,
    },
    {
        path:'/addfriendpage',
        component:addfriendpage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

//导航守卫
router.beforeEach((to, from, next) => {

    if(to.meta.requiresAuth){
        //原生js获取cookie
        let prefix = 'token' + "="
        let start = document.cookie.indexOf(prefix)
        if(start==-1){
            console.log('to.meta.requiresAuth');
            router.push('/login')
        }
        let end = document.cookie.indexOf(";", start + prefix.length)
        if (end == -1) {
            end = document.cookie.length;
        }
        let token = document.cookie.substring(start + prefix.length, end)
        if(token){
            next()
        }
        
    }else{
        next()
    }
    
})
export default router