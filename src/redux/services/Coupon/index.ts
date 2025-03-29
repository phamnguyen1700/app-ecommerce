import { ICoupon } from "@/typings/coupon";
import { API } from "@/utils/Api";

export const getAllCouponService = async () => {
  const response = await API.get("/coupons");
  return response.data;
};


export const redeemCouponService = async (data: ICoupon) => {
  const response = await API.post("/coupons/redeem", data);
  return response.data;
}