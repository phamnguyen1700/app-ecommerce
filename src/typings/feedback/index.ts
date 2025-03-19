import { IUser } from "../auth"; // Đường dẫn phù hợp với dự án của bạn

export interface IFeedback {
  id: string;
  productId: string;
  userId: {
    id: string;
    name: string;
    email: string;
  }; // Định nghĩa riêng vì API trả về `userId`
  rating: number;
  comment?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface ICreateFeedbackDTO {
  productId: string;
  rating: number;
  comment?: string | null; // Cho phép không có comment khi tạo feedback mới
}
