import { IProductFilter, IUpdateProduct } from "@/typings/product";
import { API } from "@/utils/Api"; 
import axios from "axios";
import { toast } from "react-toastify";

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

// Xóa mềm sản phẩm
export const softDeleteProduct = async (productId: string) => {
  try {
    const response = await API.delete(`/products/${productId}`);
    return response.data;
  } catch {
    return toast.error("Lỗi khi xóa mềm sản phẩm!");
  }
};

// Khôi phục sản phẩm đã xóa
export const reactivateProduct = async (productId: string) => {
  try {
    const response = await API.put(`/products/${productId}/reactivate`);
    return response.data;
  } catch {
    return toast.error("Lỗi khi khôi phục sản phẩm!");
  }
};

// Cập nhật sản phẩm
export const updateProductService = async (productId: string, data: IUpdateProduct) => {
  try {
    const response = await API.put(`/products/${productId}`, data);
    return response.data;
  } catch  {
    toast.error("Lỗi khi cập nhật sản phẩm!");
    return;
  }
};