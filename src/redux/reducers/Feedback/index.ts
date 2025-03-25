import { createSlice } from "@reduxjs/toolkit";
import { IFeedback } from "@/typings/feedback";
import {
  getFeedbacksByProductThunk,
  createFeedbackThunk,
  updateFeedbackThunk,
  deleteFeedbackThunk,
} from "../../thunks/Feedback";

interface FeedbackState {
  feedbacks: IFeedback[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Feedbacks
    builder.addCase(getFeedbacksByProductThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFeedbacksByProductThunk.fulfilled, (state, action) => {
      state.loading = false;
      console.log("Feedbacks in Redux:", action.payload);
      state.feedbacks = action.payload;
    });
    
    builder.addCase(getFeedbacksByProductThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Có lỗi xảy ra";
    });

    // Create Feedback
    builder.addCase(createFeedbackThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createFeedbackThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbacks.unshift(action.payload);
    });
    builder.addCase(createFeedbackThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Có lỗi xảy ra";
    });

    // Update Feedback
    builder.addCase(updateFeedbackThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFeedbackThunk.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.feedbacks.findIndex((f) => f._id === action.payload._id);
      if (index !== -1) {
        state.feedbacks[index] = action.payload;
      }
    });
    builder.addCase(updateFeedbackThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Có lỗi xảy ra";
    });

    // Delete Feedback
    builder.addCase(deleteFeedbackThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFeedbackThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbacks = state.feedbacks.filter(
        (f) => f._id !== action.meta.arg
      );
    });
    builder.addCase(deleteFeedbackThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Có lỗi xảy ra";
    });
  },
});

export default feedbackSlice.reducer; 