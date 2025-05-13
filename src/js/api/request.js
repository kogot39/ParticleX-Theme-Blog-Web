import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const request= axios.create({
  baseURL: '/api',
  timeout: 60000
})

request.interceptors.request.use(
  (config) => {
    let url=config.url;
    if(url.split('/')[1]=="admin"){
      // /admin请求要携带token
      let adminToken=localStorage.getItem("adminToken");
      if(adminToken){
        config.headers.token=adminToken;
      }
    }
    return config
  }
)

// request 拦截器同一接收响应的数据
request.interceptors.response.use(
  response => {// 成功回调
    return response.data
  },
  error => {// 失败回调
    if(error.response && error.response.status === 401){
      ElMessage.error('登录信息已过期，请重新登录');
      if(localStorage.getItem('adminToken')){
        // 清除原来的token
        localStorage.removeItem('adminToken');
      }
      // 跳转到登录页面
      window.location.href="/login";
    }else{
      ElMessage.error('服务器错误');
    }
    return Promise.reject(error)
  }
)

export default request
