import { API } from "@/utils/Api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data; 
  } catch (error) {
    return console.log(error);
  }
};

export const refreshTokenService = async () => {
  try {
    const res = await API.post("/auth/refresh");
    return res.data;
  } catch (error) {
    return console.log(error);
  }
}