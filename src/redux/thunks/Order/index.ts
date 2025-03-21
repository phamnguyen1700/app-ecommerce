import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelOrderService, checkoutOrderService, confirmShippingService, createDeliService, createOrderService, getOrderAdminService, getOrdersService, markAsShipped, markAsShippingService, updateOrderStatusService, updatePaidStatusService } from "@/redux/services/Order";
import { IOrder, IOrderState, IOrderStatus } from "@/typings/order/order";
import { toast } from "react-toastify";

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData: IOrder, { rejectWithValue }) => {
    try {
      const data = await createOrderService(orderData);
      console.log("du lieu tra ve cua dat order:", data);
      return data;
    } catch (err) {
      toast.error("Đặt hàng không thành công!");
      return rejectWithValue(err);
    }
  }
);

export const getOrdersThunk = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersService();
      console.log("orders:", data)
      return data;
    } catch (err) {
      toast.error("Lấy danh sách đơn hàng không thành công!");
      return rejectWithValue(err);
    }
  }
);

export const checkoutOrderThunk = createAsyncThunk(
  "orders/checkoutOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await checkoutOrderService(id);
      console.log("clientSercret", data)
      return data;
    } catch (err) {
      toast.error("Thanh toán không thành công!");
      return rejectWithValue(err);
    }
  }
);

export const updatePaidStatusThunk = createAsyncThunk(
  "orders/updatePaidStatus",
  async ({ orderId, paymentIntentId }: { orderId: string; paymentIntentId: string }, { rejectWithValue }) => {
    try {
      console.log("orderId:", orderId);
      console.log("paymentIntentId:", paymentIntentId);
      const data = await updatePaidStatusService(orderId, paymentIntentId);
      console.log("Kết quả cập nhật Stripe:", data);
      toast.success("Thanh toán thành công!");
      return data;
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái thanh toán:", err);
      toast.error("Đã có lỗi xảy ra trong quá trình thanh toán!");
      return rejectWithValue(err);
    }
  }
);

export const getOrderAdminThunk = createAsyncThunk(
  "orders/getOrderAdmin",
  async (params: IOrderState, { rejectWithValue }) => {
    try {
      const data = await getOrderAdminService(params);
      console.log("orders:", data)
      return data;
    } catch (err) {
      toast.error("Lấy danh sách đơn hàng không thành công!");
      return rejectWithValue(err);
    }
  }
)

export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, orderStatus }: { id: string; orderStatus: IOrderStatus }, { rejectWithValue }) => {
    try {
      const data = await updateOrderStatusService(id, orderStatus);
      toast.success("Cập nhật trạng thái đơn hàng thành công!");

      return data;
    } catch (err) {
      toast.error("Cập nhật trạng thái đơn hàng không thành công!");
      return rejectWithValue(err);
    }
  } 
)

export const cancelOrderThunk = createAsyncThunk(
  "orders/cancelOrder",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const data = await cancelOrderService(id);
      toast.success("Hủy đơn hàng thành công!");

      return data;
    } catch (err) {
      toast.error("Hủy đơn hàng không thành công!");
      return rejectWithValue(err);
    }
  }
)


export const createDeliveryThunk = createAsyncThunk(
  "delivery/create",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await createDeliService(orderId);
      toast.success("Yêu cầu giao hàng đã được tạo thành công!");
      return response;
    } catch (error) {
      toast.error("Lỗi khi tạo yêu cầu giao hàng!");
      return rejectWithValue(error);
    }
  }
);

export const markAsShippingThunk = createAsyncThunk(
  "delivery/update",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await markAsShippingService(orderId);
      toast.success("Đơn hàng đang được giao!");
      return response;
    } catch (error) {
      toast.error("Lỗi khi tạo yêu cầu giao hàng!");
      return rejectWithValue(error);
    }
  }
);

export const confirmShippingThunk = createAsyncThunk(
  "delivery/confirmconfirm",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await confirmShippingService(orderId);
      toast.success("Đơn hàng đã được giao!");
      return response;
    } catch (error) {
      toast.error("Lỗi khi tạo yêu cầu giao hàng!");
      return rejectWithValue(error);
    }
  }
);

export const markAsShippedThunk = createAsyncThunk(
  "delivery/update",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await markAsShipped(orderId);
      toast.success("Đơn hàng đang được giao!");
      return response;
    } catch (error) {
      toast.error("Lỗi khi tạo yêu cầu giao hàng!");
      return rejectWithValue(error);
    }
  }
);