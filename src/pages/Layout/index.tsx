import { Layout, Menu, Popconfirm, Button } from "antd"
import styles from "./index.module.scss"
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Link, Route, Routes, useLocation } from "react-router-dom"

import React, { useEffect } from "react"
import { useMyDispatch } from "../../store/useMyDispatch"
import {getUserInfoAsyncAction} from '@/store/actions/user'
import { useSelector } from "react-redux"
import { RootSate } from "@/store/rootStore"
import { userType } from "@/store/reducers/user"
import { loginOutAsyncAction } from "@/store/actions/login"
const Home = React.lazy(() =>import("../Home"))
const Article = React.lazy(() =>import("../Article"))
const Publish = React.lazy(() =>import("../Publish"))
const { Header, Sider, Content } = Layout

const GeekLayout: React.FunctionComponent = (): React.ReactElement=> {
  const location =useLocation()
  const menuSelectKey = location.pathname.startsWith('/home/publish')?'/home/publish':location.pathname
  const dispatch = useMyDispatch()
 const {name} = useSelector<RootSate,userType>(state=>state.user)
  const items = [
    {
      label: <Link to="/home">数据面板</Link>,
      key: "/home",
      icon: <PieChartOutlined />,
    },
    { label: <Link to="/home/article">内容管理</Link>, key: "/home/article" ,icon: <SolutionOutlined />},
    { label: <Link to="/home/publish">发布文章</Link>, key: "/home/publish" ,icon: <FileWordOutlined />},
  ]
  useEffect(()=>{
    dispatch(getUserInfoAsyncAction())
  },[dispatch])
  const onLogout = ()=>{
    dispatch(loginOutAsyncAction()) 
  }
  return (
    <Layout className={styles["geek-layout"]}>
      <Sider width={148}>
        <div className="logo"></div>
        <Menu
          defaultSelectedKeys={[menuSelectKey]}
          selectedKeys={[menuSelectKey]}
          mode="inline"
          theme="dark"
          items={items}
        ></Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          <Routes>
            <Route path="" element={<Home/>}></Route>
            <Route path="article" element={<Article/>}></Route>
            <Route path="/publish" element={<Publish/>}></Route>
            <Route path="/publish/:id" element={<Publish/>}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
