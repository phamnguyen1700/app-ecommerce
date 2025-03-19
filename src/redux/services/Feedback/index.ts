import { IFeedback, ICreateFeedbackDTO } from "@/typings/feedback";
import { API } from "@/utils/Api";

export const feedbackService = {
  async getFeedbacksByProduct(productId: string): Promise<IFeedback[]> {
    const response = await API.get(`/feedback/product/${productId}`);
    console.log("API response:", response.data); // Debug API response
    return response.data.data || []; // ✅ Trả về đúng mảng
  },

  async createFeedback(data: ICreateFeedbackDTO): Promise<IFeedback> {
    const response = await API.post("/feedback", data);
    return response.data;
  },

  async updateFeedback(id: string, data: Partial<ICreateFeedbackDTO>): Promise<IFeedback> {
    const response = await API.put(`/feedback/${id}`, data);
    return response.data;
  },

  async deleteFeedback(id: string): Promise<void> {
    await API.delete(`/feedback/${id}`);
  }
};
