import { refreshTokenService } from './../../services/Auth/index';
import { loginService } from "@/redux/services/Auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const res = await loginService(email, password);
        console.log(res)
        localStorage.setItem("accessToken", res.accessToken); 
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("refreshToken", res.refreshToken); 

        toast.success("Đăng nhập thành công!");
        return res;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const refreshTokenThunk = createAsyncThunk(
    "auth/refreshToken",
    async (refreshToken : string, { rejectWithValue }) => {
      try {
        const res = await refreshTokenService(refreshToken);
        const newAccessToken = res.accessToken;
        console.log(res)
        localStorage.setItem("accessToken", newAccessToken);
        console.log("Token refreshed!");
        return newAccessToken;
      } catch (error) {
        toast.error("Lỗi khi làm mới token, vui lòng đăng nhập lại!");
      return rejectWithValue(error);
      }
    }
  );

  export const logoutThunk = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
  )