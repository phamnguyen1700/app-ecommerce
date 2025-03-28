export interface IQuizAnswer {
  _id: string;
  text: string;
  points: number;
}

export interface IQuizQuestion {
  _id: string;
  question: string;
  answers: IQuizAnswer[];
}

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  questions: IQuizQuestion[];
}

export interface QuizData {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    answers: Array<{
      text: string;
      points: number;
    }>;
  }>;
}

export interface QuizSubmission {
  quizId: string;
  answers: {
    questionId: string;
    answerId: string;
  }[];
}
