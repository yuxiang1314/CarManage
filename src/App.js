import React, { Component } from "react";
// import { Button, message } from "antd";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/admin";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Routes> {/*//{在React18中，淘汰了Switch和component，替换成了Routes和element} */}
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}


