import { IProductFilter } from "@/typings/product";
import { API } from "@/utils/Api"; 

export const getAllProductService = async () => {
    const res = await API.get("/products");
    console.log(res.data); 
    return res.data;
};


export const getProductService = async (params: Partial<IProductFilter>) => {
  const response = await API.get("/products", { params });
  return response.data;
};