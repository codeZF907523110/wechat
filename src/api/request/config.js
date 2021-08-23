const axios =require('./axios')


module.exports={
    // async logon(url,data){
    //     return new Promise(async (resolve,reject)=>{
    //         await axios.post(url,data).then((res)=>{
    //             // console.log(res);
    //             resolve(res)
    //         })
    //     })
    // },
    //登录
    async logon(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data).then((res)=>{
                // console.log(res);
                resolve(res)
            })
        })
    },
    //删除
    async remverything(url){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url).then((res)=>{
                // console.log(res);
                resolve(res)
            })
        })
    },
    //手机登录
    async phonelogin(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                // console.log(res);
                resolve(res)
            })
        })
    },
    //验证用户是否存在
    async phoneloginnext(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                // console.log(res);
                resolve(res)
            })
        })
    },
    //获取用户个人信息
    async getuserinfo(url){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //更改头像
    async changetouxiang(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //更改昵称
    async changeusername(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //获取好友主页内容
    async getfriendinfo(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //发送要添加好友的申请
    async applysend(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //删除申请好友列表
    async removelist(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
    //添加好友
    async addfriend(url,data){
        return new Promise(async (resolve,reject)=>{
            await axios.post(url,data)
            .then((res)=>{
                resolve(res)
            })
        })
    },
}

