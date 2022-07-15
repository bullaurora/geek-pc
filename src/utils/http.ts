import axios from "axios"
import store from "@/store"
import { message } from "antd"
import { customHistory } from "./history"
import { loginOutAsyncAction } from "@/store/actions/login"
export const baseURL = process.env.REACT_APP_URL


const http = axios.create({
  baseURL:'/api',
  timeout: 5000,
})
//请求拦截器
http.interceptors.request.use((config) => {
  const { login: token } = store.getState()
  if (config.headers && !config.url?.startsWith("/authorizations")) {
    config.headers.Authorization = "Bearer " + token
  }
  return config
})
//响应拦截器
http.interceptors.response.use(undefined, (error) => {
  if (!error.response) {
    message.error('网络繁忙，请稍后再试')
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    message.error("登陆超时，请重新登陆", 0.5, () => {
      customHistory.push("/login", {
        from: customHistory.location.pathname,
      })
      //触发action
      store.dispatch<any>(loginOutAsyncAction())
    })
  }
  return Promise.reject(error)
})
export { http }
