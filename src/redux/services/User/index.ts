import { IUser } from "@/typings/user";
import { API } from "@/utils/Api";

export const getAllUserService = async (params?: Partial<IUser>) => {
    try {
      const res = await API.get("/user/all", { params });
      return res.data;  
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh sách người dùng:", error);
      throw error;
    }
  };

  export const banUserService = async (id: string) => {
    const res = await API.put(`/user/ban/${id}`);
    return res.data;
  };
  
  export const unbanUserService = async (id: string) => {
    const res = await API.put(`/user/unban/${id}`);
    return res.data;
  };