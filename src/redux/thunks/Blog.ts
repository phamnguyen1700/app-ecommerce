import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBlogsService, getBlogByIdService } from "../services/Blog";

export const getAllBlogsThunk = createAsyncThunk(
  "blog/getAll",
  async () => {
    const response = await getAllBlogsService();
    return response.data;
  }
);

export const getBlogByIdThunk = createAsyncThunk(
  "blog/getById",
  async (id: string) => {
    const response = await getBlogByIdService(id);
    return response.data;
  }
); 