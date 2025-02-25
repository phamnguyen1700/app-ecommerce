import { getProductService } from "@/redux/services/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductThunk = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProductService();
            console.log(data);
            return data.products;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    }
)