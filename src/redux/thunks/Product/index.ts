import { getAllProductService, getProductService } from "@/redux/services/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllProductThunk = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getAllProductService();
            console.log(data);
            return data.products;
        } catch (err) {
            console.log(err);
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

  