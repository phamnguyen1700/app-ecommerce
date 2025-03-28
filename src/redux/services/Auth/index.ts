import { APIError, IReg } from "@/typings/auth";
import { API } from "@/utils/Api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    if (!res.data || !res.data.user || !res.data.user.id) {
      throw new Error("Invalid response data");
    }
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Login error:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    console.log("Attempting to refresh token");
    const res = await API.post("/auth/refresh", { refreshToken });
    console.log("Token refresh successful");
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Token refresh failed:", {
      status: apiError.response?.status || "No status",
      message:
        apiError.response?.data?.message || apiError.message || "Unknown error",
      data: apiError.response?.data || "No data",
    });
    throw apiError.response?.data || apiError;
  }
};

export const registerService = async (data: IReg) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Registration error:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const res = await API.get(`/auth/verify-email?token=${token}`);
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Email verification error:", apiError);
    throw apiError.response?.data || apiError;
  }
};
