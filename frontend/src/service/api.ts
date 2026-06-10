import axios from "axios";
import { API_URL } from "../config/env";

export const api=axios.create({
    baseURL:API_URL,
    withCredentials:true,
})

api.interceptors.response.use((response)=>response,
async (error)=>{
    const originalRequest=error.config;
    if(error.response?.status===401 && error.response?.data?.message==="ACCESS_TOKEN_EXPIRED" &&
        !originalRequest._retry
    ){
        originalRequest._retry=true;
        try {
            await api.post('/auth/refresh');
            return api(originalRequest)
        } catch (refreshError) {
            return Promise.reject(refreshError)
        }
    }
    return Promise.reject(error)
})