import { IAddress } from "../auth";
import { IUser } from "../user";

export interface IOrderState {
  page?: number;
  limit?: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  search?: string;
}

export interface IOrderItem {
    product: string; 
    quantity: number;
    price: number;
  }
 
export interface IOrder {
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: "Stripe"; 
    shippingAddress: Omit<IAddress, "_id">; 
    user?: IUser;
    isRefunded?: boolean;
    isPaid?: boolean;
    paymentStatus?: "Pending" | "Completed" | "Failed";
    orderStatus?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
  }