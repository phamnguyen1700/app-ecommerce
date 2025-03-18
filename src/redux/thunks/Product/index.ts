import { getAllProductService, getProductService } from "@/redux/services/Product";
import { IProductFilter } from "@/typings/product";
import { createAsyncThunk } from "@reduxjs/toolkit";


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

  