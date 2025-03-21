import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogsThunk, getBlogByIdThunk } from "../../thunks/Blog";
import { IBlog } from "@/typings/blog";

interface BlogState {
  blogs: IBlog[];
  currentBlog: IBlog | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  status: "idle",
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllBlogsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(getAllBlogsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi lấy danh sách blog";
      })
      .addCase(getBlogByIdThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBlogByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBlog = action.payload;
      })
      .addCase(getBlogByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi lấy chi tiết blog";
      });
  },
});

export default blogSlice.reducer; 