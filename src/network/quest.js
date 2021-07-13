// 1.首先引入我们的axios框架
import axios from 'axios';

// 6.最终的返回结果方案！！！！！！！
export function request3(config){
  
    // 6.1创建axios的实例
    const instance = axios.create({
      baseURL:'http://152.136.185.210:7878/api/m5',
      timeout:50000,
    })
    

    // 拦截器
    instance.interceptors.request.use(config => {
      // console.log(config);
      return config
    },err => {
      console.log(err);
    })

    // 再说响应拦截
    instance.interceptors.request.use(res => {
      // console.log(res);
      return res;
    },err => {
      console.log(err);
    })


    // 6.3因为，axios本身实例返回的就是一个 promise 对象
    // 所以，我们可以直接 return,然后后续调用的时候，就可以直接 .then
    return instance(config)
  

};