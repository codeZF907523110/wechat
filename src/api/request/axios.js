import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://127.0.0.1:3006';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    
    //原生js获取cookie
    var prefix = 'token' + "="
    var start = document.cookie.indexOf(prefix)
    
    if (start == -1) {
      return config;
    }else{
      var end = document.cookie.indexOf(";", start + prefix.length)
      if (end == -1) {
          end = document.cookie.length;
      }
      var token = document.cookie.substring(start + prefix.length, end)
    }
    if(token){
      config.headers.token = token
      return config;
    }
    
  },(error) => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */


export function get(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, data)
      .then(res => {
        resolve(data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res.data);
      }, err => {
        reject(err)
      })
  })
}
