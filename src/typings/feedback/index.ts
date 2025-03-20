

export interface IFeedback {
  _id: string;
  productId: string;
  userId: {
    _id: string;
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
