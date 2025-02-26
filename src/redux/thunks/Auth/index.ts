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
        toast.success("Đăng nhập thành công!");
        return res;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );