
const GEEK_TOKEN_KEY = 'geek-pc-token'
//创建获取token
export const getToken = ()=>localStorage.getItem(GEEK_TOKEN_KEY )

// 创建设置token
export const setToken = (token:string)=>localStorage.setItem(GEEK_TOKEN_KEY ,token)

//创建 清楚 token
export const clearToken = ()=>localStorage.removeItem(GEEK_TOKEN_KEY )

//是否登陆
export const isAuth = ()=>!!getToken()