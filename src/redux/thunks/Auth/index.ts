import {
  refreshTokenService,
  registerService,
  verifyEmail,
} from "./../../services/Auth/index";
import { loginService } from "@/redux/services/Auth";
import { IReg } from "@/typings/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await loginService(email, password);
      console.log(res);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("refreshToken", res.refreshToken);

      toast.success("Đăng nhập thành công!");
      return res;
    } catch {
      return [];
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const res = await refreshTokenService(refreshToken);
      const newAccessToken = res.accessToken;
      console.log(res);
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
});

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const data: IReg = { name, email, password };
    try {
      console.log("dữ liệu gửi đi");
      const response = await registerService(data);
      toast.success("Đăng ký thành công!");

      return response; // Trả về dữ liệu user để lưu vào Redux store
    } catch {
      return toast.error("Đăng ký thất bại!");
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string) => {
    try {
      const response = await verifyEmail(token);
      toast.success("Xác thực email thành công!");
      return response;
    } catch {
      return toast.error("Xác thực email thất bại!");
    }
  }
);
