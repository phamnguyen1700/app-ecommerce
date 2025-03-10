import { API } from "@/utils/Api";

export const getAllUserService = async () => {
    const res = await API.get("/user/profile");
    console.log(res.data); 
    return res.data;
};