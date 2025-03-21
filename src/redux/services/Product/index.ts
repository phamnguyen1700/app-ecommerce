import { IProductFilter } from "@/typings/product";
import { API } from "@/utils/Api"; 
import axios from "axios";

export const getAllProductService = async () => {
    const res = await API.get("/products");
    console.log(res.data); 
    return res.data;
};


export const getProductService = async (params: Partial<IProductFilter>) => {
  const response = await API.get("/products", { params });
  return response.data;
};

export const addProductService = async (data: FormData) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, data, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ Quan trọng
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // ✅ Giữ token
    },
  });
  return response.data;
};
