import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Menu } from "antd";
import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuConfig";

import { setHeadTitle } from "../../redux/actions";
// 左侧导航的组件
// export default function LeftNav() {
//   function getItem(label, key, icon, children, type) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//       type,
//     };
//   }

//   const items = [
//     getItem("首页", "1", <PieChartOutlined />),
//     getItem("商品", "sub1", <MailOutlined />, [
//       getItem("品类管理", "2", <MailOutlined />),
//       getItem("商品管理", "3", <MailOutlined />),
//     ]),
//     getItem("用户管理", "4", <DesktopOutlined />),
//     getItem("角色管理", "5", <ContainerOutlined />),

//     getItem("图形图表", "sub2", <AppstoreOutlined />, [
//       getItem("柱形图", "9", <MailOutlined />),
//       getItem("折线图", "10", <MailOutlined />),
//       getItem("饼图", "11", <MailOutlined />),
//     ]),
//   ];
// //   const [collapsed] = useState(false);

//   return (
//     <div className="left-nav">
//       <Link to="/home" className="left-nav-header">
//         <img src={logo} alt="" />
//         <h1>硅谷后台</h1>
//       </Link>
//       <Menu
//         defaultSelectedKeys={["1"]}
//         defaultOpenKeys={["sub1"]}
//         mode="inline"
//         theme="dark"
//         iscollapsed='false'
//         items={items}
//       />
//     </div>
//   );
// }

const { SubMenu } = Menu;

function LeftNav(props) {
  const state = {
    collapsed: false,
  };
  let path = "/home";
  const location = useLocation();
  //  const toggleCollapsed = () => {
  //     this.setState({
  //       collapsed: !this.state.collapsed,
  //     });
  //   };
  //   根据menu的数据数组生成对应的标签数组,使用map()+递归调用
  //   getMenuNodes_map = (menuList) => {
  //     return menuList.map((item) => {
  //       if (!item.children) {
  //         return (
  //           <Menu.Item key={item.key}>
  //             <Link to={item.key}>
  //               <PieChartOutlined />
  //               <span>{item.title}</span>
  //             </Link>
  //           </Menu.Item>
  //         );
  //       } else {
  //         return (
  //           <SubMenu
  //             key={item.key}
  //             title={
  //               <span>
  //                 <PieChartOutlined />
  //                 <span>{item.title}</span>
  //               </span>
  //             }
  //           >
  //             {this.getMenuNodes(item.children)}
  //           </SubMenu>
  //         );
  //       }
  //     });
  //   };
  // 根据menu的数据数组生成对应的标签数组,使用reduce()+递归调用

  // 判断当前登录用户对item是否都有权限
  const hasAuth = (item) => {
    const { key, isPublic } = item;
    const menus = props.user.role.menus;
    const username = props.user.username;

    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }
    return false;
  };

  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      //  向pre中添加<Menu.Item> , 和<SubMenu>
      if (hasAuth(item)) {
        if (!item.children) {
          if (item.key === location.pathname || location.pathname.indexOf(item.key) === 0) {
            //判断item是否是当前对应的item
            props.setHeadTitle(item.title); //更新设置headTitle状态
          }
          pre.push(
            <Menu.Item key={item.key}>
              <Link
                to={item.key}
                onClick={() => props.setHeadTitle(item.title)}
              >
                <PieChartOutlined />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find(
            (cItem) => location.pathname.indexOf(cItem.key) === 0
          );
          if (cItem) {
            path = item.key;
          }

          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <PieChartOutlined />
                  <span>{item.title}</span>
                </span>
              }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }

      return pre;
    }, []);
  };

  //   得到当前请求的路由路径
  // let path =
  let menuNode = getMenuNodes(menuList);
  let pathArray = location.pathname.split("/");
  let pathLocation = pathArray[0] === "" ? pathArray[1] : pathArray[0];
  pathLocation = "/" + pathLocation;

  return (
    <div className="left-nav">
      <Link to="/home" className="left-nav-header">
        <img src={logo} alt="" />
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        selectedKeys={[pathLocation]}
        defaultOpenKeys={[path]}
        mode="inline"
        theme="dark"
        inlineCollapsed={state.collapsed}
      >
        {menuNode}
        {/* {this.getMenuNodes_map(menuList)} */}
      </Menu>
    </div>
  );
}
export default connect((state) => ({user:state.user}), { setHeadTitle })(LeftNav);
