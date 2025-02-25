import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/reducers/Product"; 
import authReducer from "@/redux/reducers/Auth"; 

export const store = configureStore({
  reducer: {
    product: productReducer, 
    auth: authReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
