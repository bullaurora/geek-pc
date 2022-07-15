import {TokenActionType} from './actions/login'
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import {UserActionType} from './actions/user'
import { allChannelsActions } from './actions/article'
import store from "./index"
import {ArticleActionType} from './actions/article'
import { PublishType, setArticleDetailType } from './actions/publish'
//根状态类型
export type RootSate = ReturnType<typeof store.getState>
// 异步action类型
export type RootActionType = TokenActionType |UserActionType | allChannelsActions |setArticleDetailType
//异步action
export type RootThunkAction<T=void> = ThunkAction<T,RootSate,unknown,RootActionType>
//ThunkDispatch
export type AppThunkDispatch = ThunkDispatch<RootSate, unknown, RootActionType>;


export type HttpData<T> = {
    message: string,
    data:T
}
type ActionType = ArticleActionType |PublishType
export type Action<P> = {
    type:ActionType,
    payload:P
}
export type  ActionCreate<P> =(p:P)=>Action<P>

