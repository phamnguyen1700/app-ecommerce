import axios from "axios";
import { RefreshError } from "@/typings/auth";

export const API = axios.create({
  baseURL: "https://skincare-ecom-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// Add request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Log token format for debugging
      console.log("Token format:", {
        token: token.substring(0, 20) + "...", // Only show first 20 chars for security
        length: token.length,
      });

      // Always ensure token has Bearer prefix
      const bearerToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      config.headers["Authorization"] = bearerToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Import the refresh token service
import { refreshTokenService } from "@/redux/services/Auth";

// Add response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
      });
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    // Create a safe copy of error details that can be logged
    const safeErrorDetails = {
      status: error.response.status,
      statusText: error.response.statusText || "No status text",
      url: originalRequest?.url || "Unknown URL",
      method: originalRequest?.method || "Unknown method",
      data:
        typeof error.response.data === "object"
          ? JSON.stringify(error.response.data)
          : String(error.response.data || "No response data"),
      message: error.response.data?.message || "No message provided",
      headers: JSON.stringify(originalRequest?.headers || {}),
    };

    // Handle 403 (Forbidden) with token refresh
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Log auth error details with more information
        console.error(
          "Auth error, attempting token refresh:",
          safeErrorDetails
        );

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Use the auth service for token refresh
        const response = await refreshTokenService(refreshToken);
        const { accessToken } = response;

        if (!accessToken) {
          throw new Error("No access token received");
        }

        // Update token in localStorage
        localStorage.setItem("accessToken", accessToken);

        // Update Authorization header
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // Retry the original request
        return API(originalRequest);
      } catch (error: unknown) {
        const refreshError = error as RefreshError;
        // Create a safe copy of refresh error details
        const safeRefreshErrorDetails = {
          message: refreshError?.message || "Unknown refresh error",
          response: refreshError?.response?.data
            ? JSON.stringify(refreshError.response.data)
            : "No response data",
          stack: refreshError?.stack || "No stack trace",
        };

        console.error("Token refresh failed:", safeRefreshErrorDetails);

        // Clear auth data on refresh failure
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Throw a more descriptive error
        return Promise.reject(
          new Error(
            refreshError?.message ||
              "Authentication failed. Please login again."
          )
        );
      }
    }

    // Handle other specific status codes
    switch (error.response.status) {
      case 400:
        console.error("Bad Request:", safeErrorDetails);
        return Promise.reject(
          new Error(error.response.data?.message || "Invalid request")
        );
      case 401:
        console.error("Unauthorized:", safeErrorDetails);
        return Promise.reject(new Error("Please login to continue"));
      case 404:
        console.error("Not Found:", safeErrorDetails);
        return Promise.reject(
          new Error(error.response.data?.message || "Resource not found")
        );
      case 500:
        console.error("Server Error:", safeErrorDetails);
        return Promise.reject(
          new Error("Server error. Please try again later")
        );
      default:
        console.error("API Error:", safeErrorDetails);
        return Promise.reject(
          error.response.data?.message
            ? new Error(error.response.data.message)
            : error
        );
    }
  }
);
