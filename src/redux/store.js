// redux中最核心的管理对象，store

// 向外默认暴露一个store

import {
  legacy_createStore as createStore,
  applyMiddleware,
//   compose,
} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from "./reducer";
// 这里的更改是因为最新版本的问题，需要进行更改
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
