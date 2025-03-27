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
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await loginService(email, password);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("refreshToken", res.refreshToken);
      toast.success("Đăng nhập thành công!");
      return res;
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Xác thực tài khoản trước khi đăng nhập!");
      } else if (error.response?.status === 401) {
        toast.error("Email hoặc mật khẩu không chính xác!");
      } else {
        toast.error("Đã có lỗi xảy ra khi đăng nhập!");
      }
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const res = await refreshTokenService(refreshToken);
      const newAccessToken = res.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (error: any) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
  toast.success("Đăng xuất thành công!");
});

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    const data: IReg = { name, email, password };
    try {
      const response = await registerService(data);
      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
      );
      return response;
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Email đã được sử dụng!");
      } else {
        toast.error("Đăng ký thất bại!");
      }
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await verifyEmail(token);
      toast.success("Xác thực email thành công!");
      return response;
    } catch (error: any) {
      toast.error("Xác thực email thất bại!");
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);
