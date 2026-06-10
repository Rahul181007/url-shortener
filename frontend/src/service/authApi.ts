import type { User } from "../types/user"
import { api } from "./api"

export const login=async(email:string,password:string)=>{
    const response=await api.post('/auth/login',{
        email,
        password
    })
    return response.data
}

export const registerUser=async(name:string,email:string,password:string)=>{
    const response=await api.post('/auth/register',{
        email,
        name,
        password
    })
    return response.data
}

export const getMe = async ():Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout=async()=>{
    const response=await api.post('/auth/logout');
    return response.data
}
