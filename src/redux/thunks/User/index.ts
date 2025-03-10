import { getAllUserService } from "@/redux/services/User";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllUserThunk = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getAllUserService();
            console.log(data);
            return data.users;
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);
        }
    }
);