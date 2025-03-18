import { IBrandFilter } from "@/typings/brand";
import { API } from "@/utils/Api";

export const getBrandService = async () => {
  return await API.get("/brands");
};

export const createBrandService = async (brandName: string) => {
  return await API.post("/brands", {brandName});
};

export const updateBrandService = async (brandId: string, brandName: string) => {
  return await API.put(`/brands/${brandId}`, brandName);
};

export const deleteBrandService = async (brandId: string) => {
  return await API.delete(`/brands/${brandId}`);
}

export const reactiveBrandService = async (brandId: string) => {
    return await API.put(`/brands/${brandId}/reactivate`);
}

export const manageBrandService = async (params: IBrandFilter) => {
    return await API.get('/brands/admin', { params });
}