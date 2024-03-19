// 能发送异步ajax请求的函数模块 , 封装了axios库,而且函数的返回值是一个promise对象，

// 优化：统一处理请求异常 , 在外层包一个自己创建的promise对象，在请求出错时，不reject(error)，而是显示错误
// 优化2：异步得到不是response，而是response.data。在请求成功resolve时，reslove(response.data)
import axios from "axios";
import { message } from "antd";
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    // 1.异步执行ajax请求
      let promise
    if (type === "GET") {
      promise =  axios.get(url, {
        params: data,
      });
    } else {
      promise = axios.post(url, data);
    }
    // 2.如果成功，调用resolve(value)
      promise.then(response => resolve(response.data))
        // 3.如果失败，不调用reject(reason) , 而是提示异常信息  
          .catch(error => {
            message.error('请求出错' + error.message)
          }
        
    )
    
      
  });
}

// // 请求登录接口
// ajax("/login", { username: "Tom", password: "12345" }, "POST").then();

// // 添加用户
// ajax(
//   "/manage/user/add",
//   { username: "Tom", password: "12345", phone: "12345678901" },
//   "POST"
// ).then();
