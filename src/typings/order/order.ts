import { IAddress } from "../auth";

export interface IOrderItem {
    product: string; 
    quantity: number;
    price: number;
  }
 
export interface IOrder {
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: "Stripe" | "PayPal" | "COD"; 
    shippingAddress: Omit<IAddress, "_id">; 
  }