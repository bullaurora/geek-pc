import type { setUserInfoActionType } from "../actions/user"
export type userType ={
  id?: string
  photo?: string
  name?: string
  mobile?: string
  gender?: number |string 
  birthday?: string
  intro?: string
}
const initialState = {}
export const user = (state :userType= initialState, action: setUserInfoActionType) => {
  switch (action.type) {
    case "user/getInfo":
      return action.payload
    default:
      return state
  }
}
