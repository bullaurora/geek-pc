import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./index.module.scss"
const NotFound = (): React.ReactElement => {
  const [count, setCount] = useState<number>(5)
  const timerRef = useRef<any>()
  const navigate = useNavigate()
 
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((count) => count - 1)
    }, 1000)
    return () =>clearInterval(timerRef.current)
  }, [])
  useEffect(() => {
    if (count===0) {
      navigate('/home',{replace: true})
      
    }
  },[count,navigate])
  return (
    <div className={styles.root}>
      <div>对不起，您访问的页面不存在</div>
      <p>
        将在{count}秒后，返回首页(或者：点击立即返回<Link to="/home">首页</Link>)
      </p>
    </div>
  )
}
export default NotFound
