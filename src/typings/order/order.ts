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
  image: string;
}

export type IOrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | undefined;

export interface IOrder {
  items: IOrderItem[];
  totalAmount?: number;
  paymentMethod: "Stripe";
  shippingAddress: Omit<IAddress, "_id">;
  user?: IUser;
  isRefunded?: boolean;
  isPaid?: boolean;
  paymentStatus?: "Pending" | "Completed" | "Failed";
  orderStatus?: IOrderStatus;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  couponCode?: string;
}
