import { API } from "@/utils/Api";
import { IOrder, IOrderState } from "@/typings/order/order";

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
