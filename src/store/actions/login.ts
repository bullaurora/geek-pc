import { inputValue } from "@/pages/Login"
import { clearToken, setToken } from "@/utils/token"
import type { RootThunkAction } from "../rootStore"
import {http} from '@/utils/http'
import { setUserInfoAction } from "./user"



export const loginAsyncAction = (loginData:inputValue):RootThunkAction=>{
    return async (dispatch)=>{
      const res =  await http.post('/authorizations',loginData)
      const {data:{token},message} = res.data
      if (message ==='OK') {
        setToken(token)
        dispatch(setTokenAction(token))
      }else{
        return Promise.reject('登陆失败')
      }
    }
}

export const loginOutAsyncAction = ():RootThunkAction=>{
  return async (dispatch)=>{  
      clearToken()
      dispatch(setTokenAction(null))
      dispatch(setUserInfoAction({}))
  }
}

export const setTokenAction = (token:string |null) =>({
    type: 'login/setToken' as const,
    payload:token
})

export type setTokenActionType = ReturnType<typeof setTokenAction>

export type TokenActionType = setTokenActionType