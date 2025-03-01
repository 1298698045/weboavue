import axios from "axios";
import QS from 'qs';

// axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.baseURL = '/';
if (process.env.NODE_ENV === 'production') {
    // axios.defaults.baseURL = 'http://192.168.1.200:9091/';
}

axios.interceptors.request.use( //响应拦截
    async config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        config.headers.token = localStorage.getItem('token');
        config.headers.Authorization = localStorage.getItem('token');
        // config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response); //进行中        
        } else {
            return Promise.reject(response); //失败       
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    break
                    // 403 token过期                
                    // 登录过期对用户进行提示                
                    // 清除本地token和清空vuex中token对象                
                    // 跳转登录页面                
                case 403:
                    sessionStorage.clear()
                    router.push('/login')
                    break
                    // 404请求不存在                
                case 404:
                    break;
                    // 其他错误，直接抛出错误提示                
                default:
            }
            return Promise.reject(error.response);
        }
    }
);

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export const $get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
const $post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)) //是将对象 序列化成URL的形式，以&进行拼接   
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}

export default {
    install: (app) => {
        app.config.globalProperties['$get'] = $get;
        app.config.globalProperties['$post'] = $post;
        app.config.globalProperties['$axios'] = axios;
    },
    $get: $get,
    $post: $post
}