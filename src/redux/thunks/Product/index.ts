import { getAllProductService, getProductService,getProductByIdService } from "@/redux/services/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";


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
    async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
      try {
        const data = await getProductService(page, limit);
        return {
          products: data.products,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        };
      } catch (err) {
        console.error(err);
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

  