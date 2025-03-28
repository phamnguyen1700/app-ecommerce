import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllQuizzesService,
  addQuizService,
  deleteQuizService,
  updateQuizService,
  submitQuizAnswersService,
} from "@/redux/services/Quiz";
import { APIError } from "@/typings/auth";
import { toast } from "react-toastify";
import { QuizData } from "@/typings/quiz";

export const getAllQuizzesThunk = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllQuizzesService();
      return data;
    } catch (error: unknown) {
      const apiError = error as APIError;
      return rejectWithValue(apiError);
    }
  }
);

export const addQuizThunk = createAsyncThunk(
  "quizzes/addQuiz",
  async (data: QuizData) => {
    try {
      const response = await addQuizService(data);
      toast.success("Thêm câu hỏi thành công");
      return response;
    } catch (error: unknown) {
      console.error("Error adding quiz:", error);
      toast.error("Thêm câu hỏi không thành công");
      return null;
    }
  }
);

export const deleteQuizThunk = createAsyncThunk(
  "quizzes/deleteQuiz",
  async (id: string) => {
    try {
      await deleteQuizService(id);
      toast.success("Xóa câu hỏi thành công");
      return id;
    } catch (error: unknown) {
      console.error("Error adding quiz:", error);
      toast.error("Xóa câu hỏi không thành công");
      return;
    }
  }
);

export const updateQuizThunk = createAsyncThunk(
  "quizzes/updateQuiz",
  async ({ id, data }: { id: string; data: Partial<QuizData> }) => {
    try {
      const response = await updateQuizService(id, data);
      toast.success("Cập nhật câu hỏi thành công");
      return response;
    } catch (error: unknown) {
      console.error("Error updating quiz:", error);
      toast.error("Cập nhật câu hỏi không thành công");
      return null;
    }
  }
);

export const submitQuizAnswersThunk = createAsyncThunk(
  "quizzes/submitAnswers",
  async (
    data: {
      quizId: string;
      userId: string;
      answers: Array<{
        questionId: string;
        answerId: string;
        points: number;
      }>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await submitQuizAnswersService(data);
      toast.success("Gửi câu trả lời thành công!");
      return response;
    } catch (error: unknown) {
      const apiError = error as APIError;
      toast.error(apiError.message || "Gửi câu trả lời không thành công!");
      return rejectWithValue(apiError);
    }
  }
);
