import { http } from "@/utils";
import { ArticleType, channelsType, stateType } from "../reducers/article";
import { HttpData, RootThunkAction,ActionCreate } from "../rootStore";

export const getChannelsAsyncAction = ():RootThunkAction=>{
    return async (dispatch) =>{
       const res = await http.get<HttpData<stateType<channelsType>>>('/channels')
       const {channels} = res.data.data
       dispatch(getChannelsAction(channels));
    }
}

export const getArticlesAsyncAction = (params :any):RootThunkAction =>{
    return async dispatch => {
        const res = await http.get<HttpData<ArticleType>>('/mp/articles',{
            params
        })
        const {page,per_page,results,total_count} = res.data.data
        dispatch(getArticlesAction({
            page,
            per_page,
            results:results.map(item=>{
                return {
                    ...item,
                    cover:item.cover.images[0]
                }
            }),
            total_count
        }))
    }
}


export const delArticlesAsyncAction = (id:number|string,params:any):RootThunkAction =>{
    return async dispatch => {
        await http.delete<HttpData<null>>(`/mp/articles/${id}`)
        dispatch(getArticlesAsyncAction(params))
        
    }
}
export const getChannelsAction = (channels:channelsType)=>({type:'article/getChannels' as const,payload:channels})
export const getArticlesAction:ActionCreate<ArticleType>= (payload)=>({type:'article/getArticles',payload})
export type  getChannelsActionType =ReturnType<typeof getChannelsAction>
export type  getArticlesActionType = ReturnType<typeof getArticlesAction>
export type allChannelsActions = getChannelsActionType | getArticlesActionType
export type ChannelsType =  'article/getChannels'
export type ArticlesType = 'article/getArticles'
export type ArticleActionType =ChannelsType | ArticlesType 

