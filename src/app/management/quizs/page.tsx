"use client";

import { useState } from "react";
import CustomTable from "@/components/common/customTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { quizData } from "@/components/common/quiz";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IIQuizQuestion, IQuizAnswer } from "@/typings/quiz";

export default function QuizAdminPage() {
  const [questions, setQuestions] = useState(quizData);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [points, setPoints] = useState([1, 1, 1]);

  const handleAddQuestion = () => {
    const questionToAdd = {
      question: newQuestion,
      answers: answers.map((text, idx) => ({ text, points: points[idx] })),
    };

    setQuestions([...questions, questionToAdd]);
    setAnswers(["", "", ""]);
    setPoints([1, 1, 1]);
    setNewQuestion("");
  };

  const columns = [
    { colName: "Câu hỏi", render: (item: IIQuizQuestion) => item.question },
    {
      colName: "Câu trả lời",
      render: (item: IIQuizQuestion) => (
        <ul className="list-disc pl-4">
          {item.answers.map((ans: IQuizAnswer, idx: number) => (
            <li key={idx}>
              {ans.text} ({ans.points} điểm)
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quản trị Quiz</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Thêm câu hỏi</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Thêm câu hỏi</DialogTitle>
          <Input
            placeholder="Nhập câu hỏi mới"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="mb-2"
          />

          {answers.map((answer, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                placeholder={`Câu trả lời ${idx + 1}`}
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[idx] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />
              <Input
                type="number"
                placeholder="Điểm"
                value={points[idx]}
                onChange={(e) => {
                  const newPoints = [...points];
                  newPoints[idx] = Number(e.target.value);
                  setPoints(newPoints);
                }}
              />
            </div>
          ))}

          <Button onClick={handleAddQuestion}>Thêm câu hỏi mới</Button>
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        <CustomTable records={questions} columns={columns} />
      </div>
    </div>
  );
}
