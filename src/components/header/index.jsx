import React, { useState , useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import { Modal } from "antd";
import {connect} from 'react-redux'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./index.css";
import formateDate from "../../utils/dateUtils";

import { reqWeather } from "../../api";
import logo晴天 from "../../assets/images/Weather/晴天.png";
// import menuList from "../../config/menuConfig";
import LinkButton from "../link-button";
import { logout } from "../../redux/actions";

const {confirm} = Modal
// 头部组件
function Header(props) {
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
  const [weather, setWeather] = useState("");
  // 第一次render之后执行。一般在此执行异步操作，发ajax请求/启动定时器
  // const location = useLocation();
  const navigates = useNavigate();
  useEffect(() => {
    getTime();
    getWeather();
  }, []);

  const showConfirm = () => {
    confirm({
      title: "是否退出登录?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // 删除保存的user数据，并跳转到Login页面
        props.logout()
        navigates("/login", { replace: true });
      },
      onCancel() {
      },
    });
  };



  const getTime = () => {
    setInterval(() => {
      // 每隔一秒钟获取当前时间，更新当前时间
      const currentTime = formateDate(Date.now());
      setCurrentTime( currentTime );
    }, 1000);
  };
  const getWeather = async () => {
    const { weather } = await reqWeather("北京");
    setWeather( weather );
  };
  // const getTitle = () => {
  //   const path = location.pathname
  //   let title
  //   menuList.forEach(item => {
  //     if (item.key === path) {   //如果当前item对象的key与path一样，item的title就是需要显示的title
  //      title = item.title
  //     } else if (item.children) {
  //       // 在所有的子item中查找匹配的
  //     const citem =  item.children.find(citem=>citem.key === path)
  //       if (citem) {
  //       title = citem.title
  //     }
  //     }
  //   })
  //   return title
  // }

  const logout = () => {
    showConfirm()

  }

  const username = props.user.username;
  const title = props.headTitle
  return (
    <div className="Header">
      <div className="header-top">
        <span>欢迎，{username}</span>
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className="header-buttom">
        <div className="header-buttom-left">{ title}</div>
        <div className="header-buttom-right">
          <span>{currentTime}</span>
          <img src={logo晴天} alt="weather" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
}
export default connect(
  state => ({headTitle:state.headTitle , user:state.user}),
  {logout}
)(Header)