import { API } from "@/utils/Api";
import { APIError } from "@/typings/auth";
import { QuizData } from "@/typings/quiz";

export const getAllQuizzesService = async () => {
  try {
    const res = await API.get("/quizzes");
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Error fetching quizzes:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const addQuizService = async (data: QuizData) => {
  try {
    if (!data.title || !data.questions || data.questions.length === 0) {
      throw new Error("Invalid quiz data. Title and questions are required.");
    }

    const res = await API.post("/quizzes", data);
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Error adding quiz:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const deleteQuizService = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Quiz ID is required");
    }

    const res = await API.delete(`/quizzes/${id}`);
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Error deleting quiz:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const updateQuizService = async (
  id: string,
  data: Partial<QuizData>
) => {
  try {
    if (!id) {
      throw new Error("Quiz ID is required");
    }

    if (Object.keys(data).length === 0) {
      throw new Error("No update data provided");
    }

    const res = await API.put(`/quizzes/${id}`, data);
    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error("Error updating quiz:", apiError);
    throw apiError.response?.data || apiError;
  }
};

export const submitQuizAnswersService = async (data: {
  quizId: string;
  userId: string;
  answers: Array<{
    questionId: string;
    answerId: string;
    points: number;
  }>;
}) => {
  try {
    console.log("Submitting quiz with data:", {
      quizId: data.quizId,
      userId: data.userId,
      answerCount: data.answers.length,
    });

    // Send data in the format expected by the API
    const res = await API.post("/quizzes/submit", {
      quizId: data.quizId,
      userId: data.userId,
      answers: data.answers,
    });

    return res.data;
  } catch (error: unknown) {
    const apiError = error as APIError;
    // Enhanced error logging
    console.error("Quiz submission error:", {
      status: apiError.response?.status || "No status",
      data:
        typeof apiError.response?.data === "object"
          ? JSON.stringify(apiError.response.data)
          : String(apiError.response?.data || "No data"),
      message: apiError.message || "No message",
      config: {
        url: apiError.config?.url || "No URL",
        method: apiError.config?.method || "No method",
        hasAuth: Boolean(apiError.config?.headers?.Authorization),
        requestData: apiError.config?.data
          ? JSON.parse(apiError.config.data)
          : "No request data",
      },
    });

    throw new Error(
      apiError.response?.data?.message ||
        apiError.message ||
        "Quiz submission failed"
    );
  }
};
