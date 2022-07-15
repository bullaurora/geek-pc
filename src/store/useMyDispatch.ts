import { useDispatch } from "react-redux"
import { AppThunkDispatch } from "./rootStore"
export const useMyDispatch = (): AppThunkDispatch => useDispatch()
