import { API } from "@/utils/Api";
import { IOrder, IOrderState, IOrderStatus } from "@/typings/order/order";

export const createOrderService = async (orderData: IOrder) => {
  try {
    const res = await API.post("/orders", orderData);
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

export const getOrdersService = async () => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (err) {
    console.error("Error getting orders:", err);
    throw err;
  }
};

export const checkoutOrderService = async (id: string) => {
  try {
    const res = await API.post(`/orders/${id}/pay`);
    return res.data;
  } catch (err) {
    console.error("Error checking out order:", err);
    throw err;
  }
};

export const updatePaidStatusService = async (
  orderId: string,
  paymentIntentId: string
) => {
  try {
    console.log("🚀 Đang gửi request lên backend với dữ liệu:", {
      orderId,
      paymentIntentId,
    });

    const res = await API.put(`/orders/${orderId}/pay`, {
      paymentIntentId,
    });
    return res.data;
  } catch (err) {
    console.error("Error updating paid status:", err);
    throw err;
  }
};

export const getOrderAdminService = async (params: IOrderState) => {
  try {
    const response = await API.get("/orders/admin/getAll", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw error;
  }
};

export const updateOrderStatusService = async (
  orderId: string,
  orderStatus: IOrderStatus
) => {  
  try {
    const res = await API.put(`/orders/${orderId}/status`, { orderStatus });
    return res.data;
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
}

export const cancelOrderService = async (id: string) => {
  try {
    const res = await API.put(`/orders/${id}/cancel`);
    return res.data;
  } catch (err) {
    console.error("Error cancelling order:", err);
    throw err;
  }
}

export const createDeliService = async (id: string) => {
  const res = await API.post(`/deliveries/${id}`);
  return res.data;
}

export const markAsShippingService = async (id: string) => {
  const res = await API.put(`/deliveries/${id}/shipping`);
  return res.data;
}

export const confirmShippingService = async (id: string) => {
  const res = await API.put(`/deliveries/${id}/confirm`);
  return res.data;
}

export const markAsShipped = async (id: string) => {
  const res = await API.put(`/deliveries/${id}/mark-shipped`);
  return res.data;
}