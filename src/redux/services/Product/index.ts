import { API } from "@/utils/Api"; 

export const getAllProductService = async () => {
    const res = await API.get("/products");
    console.log(res.data); 
    return res.data;
};


export const getProductService = async (page: number, limit: number) => {
    try {
      const res = await API.get(`/products?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching products:", err);
      throw err;
    }
  };