import { API } from "@/utils/Api";
import { IOrder } from "@/typings/order/order";

export const createOrderService = async (orderData: IOrder) => {
  try {
    const res = await API.post("/orders", orderData);
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};
