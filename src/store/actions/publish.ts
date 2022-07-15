import { http } from "@/utils";
import { detailType } from "../reducers/publish";
import { ActionCreate, HttpData, RootThunkAction } from "../rootStore";


export const updateArticleAsyncAction = (data:any,isDraft:boolean,id?:string):RootThunkAction=>{
    return async  ()=>{
       if (id) {
        await http.put(`/mp/articles/${id}?draft=${isDraft}`,data)
       }else {
        const res = await http.post(`/mp/articles?draft=${isDraft}`,data)
        console.log(res);
       }
        
    }
}   
//获取文章详情

export const getArticleDetailById = (id:string):RootThunkAction =>{
    return async ():Promise<detailType>=>{
        const res = await http.get<HttpData<detailType>>(`/mp/articles/${id}`)
        // dispatch(setArticleDetail(res.data.data))
        return res.data.data
    }
}

export const setArticleDetail:ActionCreate<detailType>= (payload)=>({type:"publishType/setArticleDetail",payload})
export type PublishType =  'publishType/setArticleDetail'
export type  setArticleDetailType = ReturnType<typeof setArticleDetail>