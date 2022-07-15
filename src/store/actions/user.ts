import type { RootThunkAction } from "../rootStore"
import { http } from "@/utils/http"
import type {userType} from '../reducers/user'
export const getUserInfoAsyncAction = (): RootThunkAction => {
  return async (dispatch) => {
    const res =await http.get("/user/profile")
    
   dispatch(setUserInfoAction(res.data.data))
  }
}

export const setUserInfoAction = (payload:userType) => ({
  type: "user/getInfo" as const,
  payload
})

export type setUserInfoActionType = ReturnType<typeof setUserInfoAction>

export type UserActionType = setUserInfoActionType
