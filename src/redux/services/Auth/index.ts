import { IReg } from "@/typings/auth";
import { API } from "@/utils/Api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const res = await API.post("/auth/refresh", { refreshToken });
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const registerService = async (data : IReg) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
}

export const verifyEmail = async (token: string) => {
  try {
    const res = await API.get(`/auth/verify-email/${token}`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
}