import { getChannelsAsyncAction } from "@/store/actions/article"
import { articleState } from "@/store/reducers/article"
import { RootSate } from "@/store/rootStore"
import { useMyDispatch } from "@/store/useMyDispatch"
import { Select } from "antd"
import { DraftValueType, RawValueType } from "rc-select/lib/Select"
import { useEffect } from "react"
import { useSelector } from "react-redux"
interface propsTypes {
    value?: RawValueType | null,
    onChange?:(value: DraftValueType, option: unknown) => void;
    width?:number
}
export const ChannelInput: React.FC<propsTypes> = ({value,onChange,width}) => {

    const { channels} = useSelector<
    RootSate,
    articleState
  >((state) => state.article)
  const dispatch = useMyDispatch()
  useEffect(() => {
    dispatch(getChannelsAsyncAction())
  }, [dispatch])
  return (
    <Select style={{ width }} placeholder="请选择文章列表" value={value} onChange={onChange}>
      {channels?.map((channel) => (
        <Select.Option key={channel.id} value={channel.id}>
          {channel.name}
        </Select.Option>
      ))}
    </Select>
  )
}