import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFeedback, ICreateFeedbackDTO } from "@/typings/feedback";
import { feedbackService } from"../../services/Feedback";

export const getFeedbacksByProductThunk = createAsyncThunk<IFeedback[], string>(
  "feedback/getByProduct",
 
  async (productId, { rejectWithValue }) => { // eslint-disable-line
    try {
        const data = await feedbackService.getFeedbacksByProduct(productId);
        console.log("feedback data:",data);
        return data;
    } catch (err) {
        return rejectWithValue(err);
    }
} 
);

export const createFeedbackThunk = createAsyncThunk<IFeedback, ICreateFeedbackDTO>(
  "feedback/create",
  async (data) => {
    return await feedbackService.createFeedback(data);
  }
);

export const updateFeedbackThunk = createAsyncThunk<
  IFeedback,
  { id: string; data: Partial<ICreateFeedbackDTO> }
>(
  "feedback/update",
  async ({ id, data }) => {
    return await feedbackService.updateFeedback(id, data);
  }
);

export const deleteFeedbackThunk = createAsyncThunk<void, string>(
  "feedback/delete",
  async (id) => {
    return await feedbackService.deleteFeedback(id);
  }
);
