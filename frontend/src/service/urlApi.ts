
import type { Url } from "../types/url";
import { api } from "./api";

export const createUrl=async(originalUrl:string):Promise<Url>=>{
    const response=await api.post("/urls",{
        originalUrl
    })
    return response.data
}

export const getUrls=async():Promise<Url[]>=>{
    const response=await api.get("/urls");
    return response.data
}

export const deleteUrl=async(id:string):Promise<void>=>{
    await api.delete(`/urls/${id}`);
}