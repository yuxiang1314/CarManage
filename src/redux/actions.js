// 用于生成n个action creator模块 ， 包含同步action和异步action。
// 同步action：对象{type:'xxx' , data：数据值}
// 异步action：函数 dispatch=>{}
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from "./action-types";
import { reqLogin } from "../api";
import storeData from "../utils/storageUtils";

export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
});

export const receiveUser = (user) => ({ type: RECEIVE_USER, user });

export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

export const logout = () => {
  // 删除local中的User
  storeData.removeUser();
  // 返回action对象
  return { type: RESET_USER };
};
// 用来实现登陆的异步action
export const login = (username, password) => {
  return async (dispatch) => {
    // 1。执行异步ajax请求
    // const result = await reqLogin(username, password);
    const result = {
      status: 0,
      data: {
        _id: "610a39764f93334154bb3520",
        username: "admin",
        password: "21232f297a57a5a743894a0e4a801fc3",

        
        create_time: 1628060022887,
        __v: 0,
        role: {
          menus: [],
        },
      },
    };
    // 2.如果成功，分发成功的同步action   ； 如果失败，分发失败的action
    if (result.status === 0) {
      const user = result.data;
      storeData.saveUser(user);
      dispatch(receiveUser(user));
    } else {
      // message.error(result.msg)  第一种提示错误的方式
      dispatch(showErrorMsg(result.msg));
    }
  };
};
