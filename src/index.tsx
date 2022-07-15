import React from "react"
import ReactDOM from "react-dom/client"
import "antd/dist/antd.min.css"
import "./index.scss"
import App from "./App"
import { Provider } from "react-redux"
import store from "./store"
import { ConfigProvider } from "antd"
import locale from 'antd/es/locale/zh_CN';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
      {/* <Demo /> */}
    </ConfigProvider>
  </Provider>
)
