// 包含应用中所有接口请求函数的模块
import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

// 登录接口
// export function reqLogin(username, password) {
//  return  ajax("/login", { username, password }, "POST");
// }
const BASE = "http://localhost:3000/api";
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

// 添加/更新用户接口
export const reqAddOrUpdateUsers = (user) =>
  ajax(BASE + "/manage/user/" + (user._id ? "update" : "add"), user, "POST");

// 获取一级/二级分类列表
export const reqCategorys = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });
// 添加分类
export const reqAddCategorys = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

// 更新分类
export const reqUpdateCategorys = (categoryId, categoryName) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// 获取商品分页列表
export const reqGetProduct = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", {
    pageNum,
    pageSize,
  });

//搜索商品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName, //想让一个变量作为属性名的时候，只需要加上中括号
  });

//获取一个分类
export const reqGetCategory = (categoryId) =>
  ajax(BASE + "/manage/category/info", {
    categoryId,
  });
// 更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId, status) =>
  ajax(
    BASE + "/manage/product/updateStatus",
    {
      productId,
      status,
    },
    "POST"
  );

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + "/manage/role/list");

// 添加角色
export const reqAddRoles = (roleName) =>
  ajax(BASE + "/manage/role/add", { roleName }, "POST");

// 更新角色权限
export const reqUpdateRoles = (role) =>
  ajax(BASE + "/manage/role/update", role, "POST");

// 获取所有用户的列表

export const reqGetUsers = () => ajax(BASE + "/manage/user/list");

// 删除指定用户
export const reqDeleteUser = (userId) =>
  ajax(BASE + "/manage/user/delete", { userId }, "POST");

// json请求的接口

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=262e0eb67269085979147cd97cd6919a&city=${city}`; //city为城市的编码
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "1") {
        const { weather } = data.lives[0];
        resolve({ weather });
      } else {
        message.error("获取天气信息失败");
      }
    });
  });
};
