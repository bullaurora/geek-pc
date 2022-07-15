import {combineReducers} from 'redux'
//导入子reducer
import {login} from './login'
import {user} from './user'
import {article}  from './article'
import {publish}  from './publish'
export const rootReducer = combineReducers({login,user,article,publish})