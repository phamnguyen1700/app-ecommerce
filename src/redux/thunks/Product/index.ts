import {
  addProductService,
  getAllProductService,
  getProductService,
  reactivateProduct,
  softDeleteProduct,
  updateProductService,
  getProductByIdService,
} from "@/redux/services/Product";
import { IProductFilter, IUpdateProduct } from "@/typings/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

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
        Object.entries(params).filter(
          ([value]) => value !== "--" && value !== ""
        )
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
      console.log(
        "📦 Payload gửi lên API:",
        Object.fromEntries(data.entries())
      ); // Debug dữ liệu

      const response = await addProductService(data);
      toast.success("Thêm sản phẩm thành công");

      return response; // ✅ Trả về dữ liệu để Redux cập nhật state
    } catch {
      toast.error("Thêm sản phẩm không thành công");
      return;
    }
  }
);

// Thunk để xóa mềm sản phẩm
export const softDeleteProductThunk = createAsyncThunk(
  "products/softDelete",
  async (productId: string) => {
    try {
      await softDeleteProduct(productId);
      toast.success("Sản phẩm đã được xóa mềm!");
      return { productId }; // Trả về ID sản phẩm để Redux cập nhật state
    } catch {
      toast.error("Lỗi khi xóa sản phẩm!");
      return [];
    }
  }
);

// Thunk để khôi phục sản phẩm
export const reactivateProductThunk = createAsyncThunk(
  "products/reactivate",
  async (productId: string) => {
    try {
      await reactivateProduct(productId);
      toast.success("Sản phẩm đã được khôi phục!");
      return { productId }; // Trả về ID sản phẩm để Redux cập nhật state
    } catch {
      toast.error("Lỗi khi khôi phục sản phẩm!");
      return [];
    }
  }
);

// Thunk cập nhật sản phẩm
export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, data }: { productId: string; data: IUpdateProduct }) => {
    try {
      const response = await updateProductService(productId, data);
      return response;
    } catch {
      toast.error("Lỗi khi cập nhật sản phẩm!");
      return;
    }
  }
);
export const getRecommendedProducts = createAsyncThunk(
  'product/getRecommendedProducts',
  async (skinType: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/recommended?skinType=${skinType}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
); 
export const getProductByIdThunk = createAsyncThunk(
  "products/fetchProductById",
  async (id : string, { rejectWithValue }) => {
    try {
      const data = await getProductByIdService(id); // Gọi API lấy sản phẩm theo ID
      console.log("thunk:", data)
      return data; // Trả về dữ liệu sản phẩm

    } catch (err) {
      console.error(`Error fetching product with ID ${id}:`, err);

      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }

      return rejectWithValue("Không thể lấy thông tin sản phẩm.");
    }
  }
);
