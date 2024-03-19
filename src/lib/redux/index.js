//redux库的主要模块
// 根据指定的reducer函数，创建指定的对象
export function createStore(reducer) {
// 用来存储内部状态数据的变量,初始值为调用reducer函数返回的结果
    let state = reducer(undefined, { type: '@@redux/init' }) 
    // 这个参数用来存储监听state更新回调函数的数组容器
    let listeners = []
    // 返回当前内部的state数据
    function getState() {
        return state
    }
    // 分发action，触发reducer调用，产生新的state，保存新的state，调用所有已存在的监视回调函数
    function dispatch(action) {
        const newState = reducer(state, action)
        state = newState
        listeners.forEach(listener => listener())
    }
    // 绑定内部state改变的监听回调，还可以绑定多个监听
    // 可以给一个store绑定多个监听
    function subscribe(listener) {
    // 保存到缓存listener的容器数组中
        listeners.push(listener)
    }


    return {getState,dispatch,subscribe}
}
//   整合传入参数对象中的reducer函数，返回一个新的reducer，新的reducer管理的总状态：{r1:state1 ， r2:state2}  reducer的结构：{属性名：函数 ， 属性名：函数，... }
export function combineReducers(reducers) {
    // 返回一个新的总的reducer函数
    // state：总状态
    
    return (state = {}, action) => {
        // 执行reducers中所有的reducer函数，得到一个新的子状态，并封装到一个对象容器中
        // 下面是一个reducer版本的处理
        // const newState = Object.keys(reducers).reduce((preState, key) => {  //Object.keys()方法是得到对象中所有属性组成的数组，本例中是['headerTitle' , 'user']
        //     preState[key] = reducers[key](state[key], action)
        //     return preState
        // }, {})
        // 下面是简单版本的处理
        const newState = {}
        Object.keys(reducers).forEach(key => {
            newState[key] = reducers[key](state[key] , action)
        })
        return newState
    }
}