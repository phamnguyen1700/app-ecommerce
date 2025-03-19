import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBrandService,
  createBrandService,
  updateBrandService,
  deleteBrandService,
  reactiveBrandService,
  manageBrandService,
} from "@/redux/services/Brand";
import { IBrandFilter } from "@/typings/brand";
import { toast } from "sonner";

// 🟢 Lấy danh sách thương hiệu
export const getBrandThunk = createAsyncThunk(
  "brand/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBrandService();
      return response.data; // Trả về danh sách brands
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Tạo thương hiệu mới
export const createBrandThunk = createAsyncThunk(
  "brand/create",
  async (brandName: string, { rejectWithValue }) => {
    try {
      const response = await createBrandService(brandName);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Cập nhật thương hiệu
export const updateBrandThunk = createAsyncThunk(
  "brand/update",
  async (
    { brandId, brandName }: { brandId: string; brandName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateBrandService(brandId, brandName);
      return response.data; // Trả về thương hiệu đã cập nhật
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBrandThunk = createAsyncThunk(
  "brand/delete",
  async (brandId: string) => {
    try {
      const response = await deleteBrandService(brandId);
      toast.success("Thương hiệu đã được xóa thành công!");
      return response.data;
    } catch {
      toast.error("Không thể xóa thương hiệu đang được sử dụng!");
      return [];
    }
  }
);

// 🟢 Kích hoạt lại thương hiệu
export const reactiveBrandThunk = createAsyncThunk(
  "brand/reactivate",
  async (brandId: string, { rejectWithValue }) => {
    try {
      const response = await reactiveBrandService(brandId);
      return response.data; // Trả về kết quả kích hoạt lại
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 🟢 Quản lý thương hiệu (Admin)
export const manageBrandThunk = createAsyncThunk(
  "brand/manage",
  async (params: IBrandFilter, { rejectWithValue }) => {
    try {
      const response = await manageBrandService(params);
      return response.data; // Trả về danh sách brands có phân quyền admin
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
