import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import storeData from "./utils/storageUtils";
import memoryUtils from "../src/utils/memoryUtils";
import "./index.css";
import App from "./App";
import "antd/dist/antd.less";
import store from "./redux/store";

// 读取Local中的user，保存到内存中去
let user = storeData.getUser();
memoryUtils.user = user;

// 将APP组件渲染到index页面上。这种渲染方式，是新的方式，
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
