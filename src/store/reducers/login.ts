import { TokenActionType } from "../actions/login"
import { getToken } from '@/utils/token'
const initialState = getToken()
export const login = (state =initialState, action:TokenActionType):string |null  => {
  switch (action.type) {
    case 'login/setToken':
      return action.payload
    default:
      return state
  }
}
