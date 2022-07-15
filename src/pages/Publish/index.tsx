import {
  Card,
  Breadcrumb,
  Form,
  Upload,
  Button,
  Input,
  Space,
  Radio,
  UploadFile,
  RadioChangeEvent,
  message,
} from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import styles from "./index.module.scss"
import { ChannelInput } from "@/components/Channel"
import { useEffect, useRef, useState } from "react"
import { UploadChangeParam } from "antd/lib/upload"
import { useMyDispatch } from "@/store/useMyDispatch"
import {
  updateArticleAsyncAction,
  getArticleDetailById,
} from "@/store/actions/publish"


const Publish: React.FC = () => {
  const [form] = Form.useForm()
  const [type, setType] = useState(1)
  //创建存储所有图片的ref对象
  const fileListRef = useRef<Array<UploadFile>>([])
  const [fileList, setFileList] = useState<Array<UploadFile>>([])
  const dispatch = useMyDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  // const detail = useSelector<RootSate>(state=>state.publish)
  useEffect(() => {
    const loadDetail = async () => {
      if (id) {
        const detail:any = await dispatch(getArticleDetailById(id))
        const {title,channel_id,cover:{type,images},content} = detail
        form.setFieldsValue({title,channel_id,type,content})
        const  newFileList =images.map((item:any) =>({url:item}))
        setFileList(newFileList)
        setType(type)
        fileListRef.current= newFileList
      }
    }
    loadDetail()
  }, [dispatch, id,form])
  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    fileListRef.current = info.fileList
    setFileList(info.fileList)
  }
  const onTypeChange = (e: RadioChangeEvent) => {
    const count = e.target.value
    setType(e.target.value)
    if (count === 1) {
      const newFileList = fileListRef.current[0] ? [fileListRef.current[0]] : []
      setFileList(newFileList)
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }
  //封装发布或编辑文章
  const saveArticles = async (values: any, msg: string, isDraft: boolean) => {
    if(values.type !==fileList.length) return message.warning('封面数量与所选类型不匹配')
    const { type, ...restValues } = values
    const data = {
      ...restValues,
      cover: {
        type,
        images: fileList.map((file) => {
          if (file.response) {
           return file.response.data.url
          }else {
           return file.url
          }
        }),
      },
    }
    console.log(data);
    
    
    
 

    await dispatch(updateArticleAsyncAction(data, isDraft,id))
    message.success(msg, 0.5, () => {
      navigate("/home/article")
    })
  }
  const onFinish = async (values: any) => {
    try {
      saveArticles(values,id?"编辑成功": "发表成功", false)
    } catch (error) {}
  }

  const saveDraft = async () => {
    try {
      const values = await form.validateFields()
      saveArticles(values, "存入草稿成功", true)
    } catch {}
  }
  // 频道数据
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? "编辑文章" : "发布文章"}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          initialValues={{ type: 1, content: "" }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="文章标题：" name="title">
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="文章封面：">
            {/* 一个FormItem只能有一个元素 */}
            <Form.Item style={{ marginBottom: 0 }} name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 这个位置放Upload组件 */}
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://toutiao.itheima.net/v1_0/upload"
                  multiple={type === 3}
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label="所属频道：" name="channel_id">
            <ChannelInput width={400} />
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <ReactQuill
              placeholder="请输入文章内容"
              theme="snow"
              className="ql-editor"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {id ? "编辑文章" : "发布文章"}
              </Button>
              <Button type="primary" onClick={saveDraft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Publish
