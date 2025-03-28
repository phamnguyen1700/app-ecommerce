import { API } from "@/utils/Api";

interface QuizAnswer {
  questionId: string;
  answerId: string;
  points: number;
}

interface QuizSubmission {
  userId: string;
  answers: QuizAnswer[];
}

interface QuizData {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
  }>;
}

export const getAllQuizzesService = async () => {
  try {
    const res = await API.get("/quizzes");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching quizzes:", error);
    throw error?.response?.data || error;
  }
};

export const addQuizService = async (data: QuizData) => {
  try {
    if (!data.title || !data.questions || data.questions.length === 0) {
      throw new Error("Invalid quiz data. Title and questions are required.");
    }

    const res = await API.post("/quizzes", data);
    return res.data;
  } catch (error: any) {
    console.error("Error adding quiz:", error);
    throw error?.response?.data || error;
  }
};

export const deleteQuizService = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Quiz ID is required");
    }

    const res = await API.delete(`/quizzes/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Error deleting quiz:", error);
    throw error?.response?.data || error;
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
  } catch (error: any) {
    console.error("Error updating quiz:", error);
    throw error?.response?.data || error;
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
  } catch (error: any) {
    // Enhanced error logging
    console.error("Quiz submission error:", {
      status: error.response?.status || "No status",
      data: typeof error.response?.data === "object" 
        ? JSON.stringify(error.response.data) 
        : String(error.response?.data || "No data"),
      message: error.message || "No message",
      config: {
        url: error.config?.url || "No URL",
        method: error.config?.method || "No method",
        hasAuth: Boolean(error.config?.headers?.Authorization),
        requestData: error.config?.data ? JSON.parse(error.config.data) : "No request data"
      },
    });

    throw new Error(
      error.response?.data?.message || error.message || "Quiz submission failed"
    );
  }
};
