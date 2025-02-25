import { API } from "@/utils/Api"; // Thay đổi cách import

export const getProductService = async () => {
    const res = await API.get("/products");
    return res.data;
};
