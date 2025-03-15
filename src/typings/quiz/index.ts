// ngay trên phần import hoặc trong file quizData.ts
export interface IQuizAnswer {
    text: string;
    points: number;
  }
  
  export interface IIQuizQuestion {
    question: string;
    answers: IQuizAnswer[];
  }
  