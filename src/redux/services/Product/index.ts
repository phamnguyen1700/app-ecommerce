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
  

  