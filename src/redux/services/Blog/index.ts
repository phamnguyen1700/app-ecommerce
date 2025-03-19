import { API } from "@/utils/Api";
import { IBlog } from "@/typings/blog";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getAllBlogsService = async () => {
  const response = await API.get<ApiResponse<IBlog[]>>("/blogs");
  return response.data;
};

export const getBlogByIdService = async (id: string) => {
  const response = await API.get<ApiResponse<IBlog>>(`/blogs/${id}`);
  return response.data;
}; 