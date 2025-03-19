import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/reducers/Product"; 
import authReducer from "@/redux/reducers/Auth"; 
import feedbackReducer from "@/redux/reducers/Feedback/feedback";

export const store = configureStore({
  reducer: {
    product: productReducer, 
    auth: authReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
