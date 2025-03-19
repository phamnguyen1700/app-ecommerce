import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/reducers/Product"; 
import authReducer from "@/redux/reducers/Auth"; 
import blogReducer from "@/redux/reducers/Blog";

export const store = configureStore({
  reducer: {
    product: productReducer, 
    auth: authReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
