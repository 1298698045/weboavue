import axios from 'axios'
import { MessageBox, message,Loading  } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'
const qs = require('qs');
const round = Math.round(Math.random()*1000000000);
const baseURL = 'https://wx.phxinfo.com.cn/rest';
//const baseURL = 'http://192.168.1.200/rest';
//const baseURL = 'http://localhost:2528/IssueListQuery'
const service = axios.create({
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',
  },
  baseURL:baseURL,
  timeout: 50000 
})
// var loadingInstance = null
// var loadingInstancestatus = false
service.interceptors.request.use(
  config => {
      // if(loadingInstance==null){
      //   loadingInstance= Loading.service({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      //   loadingInstancestatus = true
      // }else{
      //   loadingInstancestatus = false
      // }
      // if(getToken()!=null){
      //   config.headers['Authorization'] = getToken()
      // }
      if(config.method==='post'){
        let data = qs.parse(config.data)
        config.data=qs.stringify({
        method:config.query.cmd,
        sessionKey:getToken(),
        round:round,
        ...data
        })
      }
      else if(config.method==='get'){
        config.params={
          method:config.params.cmd,
          sessionKey:getToken(),
          round:round,
          ...config.params
        }
      }
    return config
  },
  error => {
    console.log(error) 
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // setTimeout(() => {
    //   if(!loadingInstancestatus){
    //     loadingInstance.close()
    //     setTimeout(() => {
    //       loadingInstance = null
    //     }, 200);
    //   }
    // },200);
    const res = response.data
    return res
    // if (res.Code !== 200) {
    //   Message({
    //     message: res.Msg || '请求失败',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(res)
    // } else {
    //   return res
    // }
  },
  error => {
    //loading.close();
    //console.log('err' + error) // for debug
    //return Promise.reject(error)
  }
)

export default service
export {
  baseURL
}
