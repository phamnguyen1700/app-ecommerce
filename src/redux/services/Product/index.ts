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

export const getProductByIdService = async (id: string) => {
  try {
    const res = await API.get(`/products/${id}`);
    console.log("data:", res.data)
    return res.data;
    
  } catch (err) {
    console.error(`Error fetching product with ID ${id}:`, err);
    throw new Error("Không thể lấy thông tin sản phẩm.");
  }
};