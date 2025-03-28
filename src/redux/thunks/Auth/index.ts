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

      // Validate response data
      if (!res.accessToken || !res.refreshToken || !res.user || !res.user.id) {
        throw new Error("Invalid login response data");
      }

      // Store auth data
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Đăng nhập thành công!");
      return res;
    } catch (error: any) {
      if (error.message === "Email not verified") {
        toast.error("Xác thực tài khoản trước khi đăng nhập!");
      } else if (error.message === "Invalid credentials") {
        toast.error("Email hoặc mật khẩu không chính xác!");
      } else {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
      }
      throw error;
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      if (!refreshToken || refreshToken.trim() === "") {
        console.error("Empty refresh token provided");
        throw new Error("No refresh token available");
      }

      const res = await refreshTokenService(refreshToken);
      const newAccessToken = res.accessToken;

      if (!newAccessToken) {
        console.error("No access token received in refresh response");
        throw new Error("Invalid refresh token response");
      }

      localStorage.setItem("accessToken", newAccessToken);
      console.log("Token refreshed successfully!");
      return newAccessToken;
    } catch (error: any) {
      console.error("Token refresh thunk failed:", {
        message: error?.message || "Unknown error",
        response: error?.response?.data || "No response data",
      });

      // Clear auth data on refresh failure
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
      return rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  // Clear all auth-related data
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  toast.success("Đăng xuất thành công!");
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
