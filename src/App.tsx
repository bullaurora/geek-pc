import React from "react"
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import "./App.scss"
import { AuthRoute } from "@/components/AuthRoute"
import { MyBrowserRouter } from "./utils/history"
import {  Spin } from "antd"
const Layout = React.lazy(() =>import("@/pages/Layout"))
const Login = React.lazy(() =>import("@/pages/Login"))
const NotFound = React.lazy(() =>import("@/pages/NotFound"))
function App(): React.ReactElement {
  return (
    <MyBrowserRouter>
      <React.Suspense fallback={<div className="loading">
        <Spin tip="加载中。。。"/>
      </div>}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home/*" element={<AuthRoute><Layout /></AuthRoute>}/>
          
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      </React.Suspense>
    </MyBrowserRouter>
  )
}

export default App
