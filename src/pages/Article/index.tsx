import React, { useEffect, useRef } from "react"
import { Form, Button, Card, Breadcrumb, Radio, DatePicker, Modal } from "antd"
import { Link, useNavigate } from "react-router-dom"
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { Table, Space } from "antd"
import "moment/locale/zh-cn"
import locale from "antd/es/date-picker/locale/zh_CN"
import styles from "./index.module.scss"
import { useMyDispatch } from "@/store/useMyDispatch"
import {
  getArticlesAsyncAction,
  delArticlesAsyncAction,
} from "@/store/actions/article"
import { useSelector } from "react-redux"
import { RootSate } from "@/store/rootStore"
import { articleState } from "@/store/reducers/article"
import img404 from "@/assets/error.png"
import Tag from "antd/es/tag"
import { ChannelInput } from "@/components/Channel"
const Article: React.FC = () => {
  const { page, per_page, results, total_count } = useSelector<
    RootSate,
    articleState
  >((state) => state.article)
  const dispatch = useMyDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getArticlesAsyncAction({}))
  }, [dispatch])
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover: any) => (
        <img src={cover ?? img404} width={200} height={150} alt="" />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (data: any) => {
        switch (data) {
          case 0:
            return <Tag color={"yellow"}>草稿</Tag>
          case 1:
            return <Tag color={"blue"}>待审核</Tag>
          case 2:
            return <Tag color={"green"}>已通过</Tag>
          case 3:
            return <Tag color={"red"}>已拒绝</Tag>
          default:
            return <Tag color={"green"}>默认</Tag>
        }
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (data: any) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/home/publish/${data.id}`)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteArticle(data.id)}
          />
        </Space>
      ),
    },
  ]
  const onDeleteArticle = (id: number | string) => {
    Modal.confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "此操作将永远删除文章，是否继续？",
      onOk() {
        dispatch(delArticlesAsyncAction(id, paramsRef.current))
      },
    })
  }
  let paramsRef = useRef<any>({})
  const onFinish = (values: any) => {
    
    const { status, channel_id, dateArr } = values
    const params: any = {}
    if (status !== undefined) {
      params.status = status
    }
    if (channel_id !== undefined) {
      params.channel_id = channel_id
    }
    if (typeof dateArr !== "undefined" && dateArr !== null) {
      params.begin_pubdate = dateArr[0].format("YYYY-MM-DD HH:mm:ss")
      params.end_pubdate = dateArr[1].format("YYYY-MM-DD HH:mm:ss")
    }
    paramsRef.current = params
    dispatch(getArticlesAsyncAction(params))
  }
  const changePage: (page: number, pageSize: number) => void = (
    page,
    pageSize
  ) => {
    const params = { ...paramsRef.current, page, per_page: pageSize }
    paramsRef.current = params
    dispatch(getArticlesAsyncAction(params))
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form onFinish={onFinish} initialValues={{channel_id:0}}>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <ChannelInput width={289}/>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <DatePicker.RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={`根据筛选条件共查询到 ${total_count} 条结果：`}
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={results}
          pagination={{
            current: page,
            pageSize: per_page,
            total: total_count,
            showSizeChanger: true,
            position: ["bottomCenter"],
            onChange: changePage,
          }}
          rowKey="id"
        ></Table>
      </Card>
    </div>
  )
}
export default Article
