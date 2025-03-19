import { getAllProductService, getProductService,getProductByIdService } from "@/redux/services/Product";
import { IProductFilter } from "@/typings/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllProductThunk = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => { // eslint-disable-line
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
  