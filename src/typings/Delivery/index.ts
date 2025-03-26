export interface IDelivery {
    _id: string;
    orderId: string;
    shippingFee: number;
    deliveryStatus: "Pending" | "Shipped" | "Delivered" | "Cancelled"; // tuỳ bạn dùng enum gì
    estimatedDeliveryTime: string; // ISO Date string
    createdAt: string;
    updatedAt: string;
  }
  