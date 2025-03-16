import { banUserService, getAllUserService, unbanUserService } from "@/redux/services/User";
import { IUser, IUserState } from "@/typings/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUserThunk = createAsyncThunk<IUserState, Partial<IUser>>(
  "user/getAll",
  async (params: Partial<IUser>, { rejectWithValue }) => {
    try {
      const data = await getAllUserService(params);
      return data as IUserState;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const toggleBanUserThunk = createAsyncThunk<
  { id: string; isBanned: boolean }, 
  { id: string; isBanned: boolean }, 
  { rejectValue: string }
>(
  "user/toggleBan",
  async ({ id, isBanned }, { rejectWithValue }) => {
    try {
      if (isBanned) {
        await banUserService(id);
      } else {
        await unbanUserService(id);
      }
      return { id, isBanned };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định";
      return rejectWithValue(errorMessage);
    }
  }
);