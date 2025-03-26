import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCouponService, redeemCouponService } from "@/redux/services/Coupon";
import { ICoupon } from "@/typings/coupon";

export const getAllCouponThunk = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    try {
      const data = await getAllCouponService();
      return data.coupons;
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      return [];
    }
  }
);

export const redeemCouponThunk = createAsyncThunk(
  "coupons/redeemCoupon",
  async (data: ICoupon) => {
    try {
      const res = await redeemCouponService(data);
      return res;
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      return null;
    }
  }
);