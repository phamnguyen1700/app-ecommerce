import { addProductService, getAllProductService, getProductService } from "@/redux/services/Product";
import { IProductFilter } from "@/typings/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const getAllProductThunk = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => { 
        try {
            const data = await getAllProductService();
            console.log(data);
            return data.products;
        } catch (err) {
            return rejectWithValue(err);
        }
    }   
);

export const getProductThunk = createAsyncThunk(
  "products/fetchProducts",
  async (params: Partial<IProductFilter>, { rejectWithValue }) => {
    try {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([value]) => value !== "--" && value !== "")
      );

      const data = await getProductService(filteredParams);
      return {
        products: data.products,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      };
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      return rejectWithValue(err);
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (data: FormData) => {
    try {
      console.log("📦 Payload gửi lên API:", Object.fromEntries(data.entries())); // Debug dữ liệu

      const response = await addProductService(data);
      toast.success("Thêm sản phẩm thành công");

      return response; // ✅ Trả về dữ liệu để Redux cập nhật state
    } catch  {
      toast.error("Thêm sản phẩm không thành công");      return;
    }
  }
);
