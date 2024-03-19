import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductHome from "./home";
import ProductAddUpdate from "./add-update";
import ProductDetail from "./detail";
import './index.less'

// 商品
export default class Product extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<ProductHome />} exact></Route>
        <Route path="/addupdate" element={<ProductAddUpdate />} />
        <Route path="/detail" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
}
