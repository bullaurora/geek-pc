import React, { useRef } from "react"
import { Card, Form, Input, Checkbox, message } from "antd"
import "./index.scss"
import { Button } from "antd"
import logo from "@/assets/logo.png"
import { useLocation, useNavigate } from "react-router-dom"
import { loginAsyncAction } from "@/store/actions/login"
import { useMyDispatch } from "@/store/useMyDispatch"
export type inputValue = {
  mobile: string
  code: string
  remember?: boolean | undefined
}
const Login = (): React.ReactElement => {
  const dispatch = useMyDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const nameRule = useRef<any[]>([
    { required: true, message: "请输入手机号" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "手机格式不正确",
      validateTrigger: "onBlur",
    },
  ])
  const passWordRule = useRef<any[]>([
    { required: true, message: "请输入验证码" },
    { len: 6, message: "验证码6个字符串", validateTrigger: "onBlur" },
  ])
  const onFinish = async (values: inputValue) => {
    try {
      await dispatch(
        loginAsyncAction({ mobile: values.mobile, code: values.code })
      )
      //成功提示
      message.success("登陆成功", 0.2, () => {
        navigate((location.state as {from:string}|undefined)?.from || "/home", { replace: true })
      })
    } catch (error: any) {
      message.warning(error.response?.data?.message || "登陆失败")
    }
  }
  return (
    <div className="login">
      <Card
        className="login-wrapper"
        bordered={false}
        style={{ width: 300 }}
        bodyStyle={{ padding: 20 }}
      >
        <img src={logo} alt="" className="login-logo" />
        <Form
          size="large"
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
          initialValues={{
            mobile: "13911111111",
            code: "246810",
            remember: true,
          }}
        >
          <Form.Item name="mobile" rules={nameRule.current}>
            <Input maxLength={11} placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item name="code" rules={passWordRule.current}>
            <Input maxLength={6} placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login
