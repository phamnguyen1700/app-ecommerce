import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderService } from "@/redux/services/Order";
import { IOrder } from "@/typings/order/order";
import { toast } from "react-toastify";

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData: IOrder, { rejectWithValue }) => {
    try {
      const data = await createOrderService(orderData);
      return data;
      console.log(data);
    } catch (err) {
      toast.error("Đặt hàng không thành công!");
      return rejectWithValue(err);
    }
  }
);
