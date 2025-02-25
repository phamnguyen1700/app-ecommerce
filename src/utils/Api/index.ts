import axios from "axios";

export const API = axios.create({
  baseURL: "https://skincare-ecom-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
