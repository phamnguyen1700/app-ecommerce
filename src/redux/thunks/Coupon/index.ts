import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCouponService } from "@/redux/services/Coupon";

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
