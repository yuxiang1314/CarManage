import React from "react";
// 登陆的路由界面
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import logo from "../../assets/images/logo.png";

import "./Login.less";

function Login(props) {
  const navigates = useNavigate();
  let user = props.user;
  if (user._id && user) {
    navigates("/home", { replace: true });
  }

  const handleFinish = (value) => {
    const { username, password } = value;
    props.login(username, password);

    // reqLogin(username, password)
    //   .then((response) => {
    //     console.log("成功", response.data);
    //   })
    //   .catch((error) => {
    //     console.log("失败", error);
    //   });

    // const result = await reqLogin(username, password);

    // if (result.status === 0) {
    //   // 提示登录成功
    //   message.success("登陆成功");
    //   const User = result.data;
    //   memoryUtils.user = User; //保存到内存中
    //   storeData.saveUser(User); // 保存到local中
    //   // 跳转到其他页面(不需要回退)
    //   navigates("/home", { replace: true });
    // } else {
    //   message.error(result.msg);
    // }
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React项目:后台管理系统</h1>
      </header>
      <section className="login-content">
        <div className={user.errorMsg ? "error-msg show" : "error-msg"}>
          {user.errorMsg}
        </div>
        <h2>用户登录</h2>
        <Form
          onFinish={handleFinish}
          name="normal_login"
          className="login-form"
        >
          <Form.Item
            name="username"
            //配置对象，属性名是特定的
            // 声明式验证：直接使用别人定义好的验证规则进行验证
            // 自定义验证：
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                min: 4,
                message: "The minest of length is 4",
              },
              {
                max: 12,
                message: "The maxest of length is 12",
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "The Username must be this rules",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}
export default connect((state) => ({ user: state.user }), { login })(Login);

/*
高阶函数：
    1.一类特别的函数：
        a. 接收函数类型的参数
        b.返回值是函数
    2.常见
        定时器，Promise，数组遍历的方法，闭包，函数对象的bind方法

高阶组件：
    1.本质就是一个函数
    2.接收一个组件（被包装组件），返回一个新的组件（包装组件），新组件内部渲染被包装组件传入特定属性
    作用：扩展组件的功能
    高阶组件也是高阶函数，接收一个组件函数，返回一个新的组件函数
*/

/*
  async和await
  1.作用
    简化promise对象的使用，不再使用then()来指定成功/失败的回调函数
    以同步编码（没有回调函数）方式来实现异步流程
  2.哪里写await
    在返回promise的表达式左侧写await：主要返回promise异步执行的成功的value数据
  3.哪里写async
    在await所在最近的函数定义的左侧写async

    上述过程使用try catch方法进行包裹使用
 */
