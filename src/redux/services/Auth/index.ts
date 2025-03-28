import { IReg } from "@/typings/auth";
import { API } from "@/utils/Api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    if (!res.data || !res.data.user || !res.data.user.id) {
      throw new Error("Invalid response data");
    }
    return res.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error?.response?.data || error;
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    console.log("Attempting to refresh token");
    const res = await API.post("/auth/refresh", { refreshToken });
    console.log("Token refresh successful");
    return res.data;
  } catch (error: any) {
    console.error("Token refresh failed:", {
      status: error?.response?.status || "No status",
      message:
        error?.response?.data?.message || error?.message || "Unknown error",
      data: error?.response?.data || "No data",
    });
    throw error?.response?.data || error;
  }
};

export const registerService = async (data: IReg) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (error: any) {
    console.error("Registration error:", error);
    throw error?.response?.data || error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const res = await API.get(`/auth/verify-email?token=${token}`);
    return res.data;
  } catch (error: any) {
    console.error("Email verification error:", error);
    throw error?.response?.data || error;
  }
};
