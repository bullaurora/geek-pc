import {createStore,applyMiddleware} from 'redux'
import {rootReducer} from './reducers'
import thunk from 'redux-thunk'



let middlewares

if (process.env.NODE_ENV === 'production') {
  // 生产环境，只启用 thunk 中间件
  middlewares = applyMiddleware(thunk)
} else {
  // 开发环境
  const { composeWithDevTools } = require('redux-devtools-extension')
  middlewares = composeWithDevTools(applyMiddleware(thunk))
}


//创建 store
const store = createStore(rootReducer,middlewares)
// export type RootSate = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export default store