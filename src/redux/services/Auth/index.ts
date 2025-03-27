import { IReg } from "@/typings/auth";
import { API } from "@/utils/Api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await API.post("/api/auth/login", { email, password });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const res = await API.post("/api/auth/refresh", { refreshToken });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const registerService = async (data: IReg) => {
  try {
    const res = await API.post("/api/auth/register", data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const res = await API.get(`/api/auth/verify-email?token=${token}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
