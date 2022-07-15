import { setArticleDetailType } from "../actions/publish"

export type detailType = {
  channel_id: number
  content: string
  cover: {
    type: number
    images: string[]
  }
  id: string
  pub_date: string
  title: string
}
const initialState:Partial<detailType> ={
  content: "",
}

export const publish = (state=initialState,action:setArticleDetailType )=>{
    if (action.type==="publishType/setArticleDetail") {
        return action.payload       
    }
    return state
}