import { API } from "@/utils/Api"; 

export const getProductService = async () => {
    const res = await API.get("/products");
    console.log(res.data); 
    return res.data;
};
