import { API } from "@/utils/Api";

export const getAllCouponService = async () => {
  const response = await API.get("/coupons");
  return response.data;
};
