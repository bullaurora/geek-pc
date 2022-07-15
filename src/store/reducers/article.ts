import { allChannelsActions } from "../actions/article"
export type channelsType = {
  id: number
  name: string
}[]
export type ArticleType = {
  page: number
  per_page: number
  results: any[]
  total_count: number
}
export interface stateType<T> {
  channels: T
}

export type articleState = stateType<channelsType> & ArticleType
const initialState1: articleState = {
  channels: [],
  page: 1,
  per_page: 10,
  results: [],
  total_count: 0,
}
export const article = (state = initialState1, action: allChannelsActions) => {
  if (action.type === "article/getChannels") {


    return { ...state, channels: action.payload }
  }
  if (action.type === "article/getArticles") {
    return {
      ...state,
      ...action.payload
    }
  }
  return initialState1
}
