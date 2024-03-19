import React from "react";
import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Category from "../category";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Product from "../product";
import Role from "../role";
import User from "../user";
import Home from "../home";
import NotFound from "../Login/not-found";
const { Footer, Sider, Content } = Layout;

function Admin(props) {
  const user = props.user;
  if (!user || !user._id) {
    // 自动跳转到登录(在render()中)
    return <Navigate to="/login" />;
  } else {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: "#fff" }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/product/*" element={<Product />} />
              <Route path="/role" element={<Role />} />
              <Route path="/user" element={<User />} />
              <Route path="/charts/bar" element={<Bar />} />
              <Route path="/charts/line" element={<Line />} />
              <Route path="/charts/pie" element={<Pie />} />
              <Route  element={<NotFound/>} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  state => ({user : state.user}),
  {}
)(Admin)