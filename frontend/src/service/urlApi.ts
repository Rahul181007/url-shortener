
import type { PaginatedUrls, Url } from "../types/url";
import { api } from "./api";

export const createUrl=async(originalUrl:string):Promise<Url>=>{
    const response=await api.post("/urls",{
        originalUrl
    })
    return response.data
}

export const getUrls=async(page:number=1,limit:number=10):Promise<PaginatedUrls>=>{
    const response=await api.get("/urls", {
  params: {
    page,
    limit,
  },
});
    return response.data
}

export const deleteUrl=async(id:string):Promise<void>=>{
    await api.delete(`/urls/${id}`);
}