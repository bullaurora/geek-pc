import { Navigate, useLocation } from "react-router-dom"
import React from "react"

import { useSelector } from "react-redux"
import { RootSate } from "@/store/rootStore"
interface PropsType {
  children: React.ReactElement
}
export const AuthRoute: React.FC<PropsType> = ({ children }) => {
  const login = useSelector<RootSate,string|null>(state=>state.login)
  const {pathname} = useLocation()  
 
  return login ? children : <Navigate to="/login" state={{from:pathname}}/>
}
