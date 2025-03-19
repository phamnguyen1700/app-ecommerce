"use client";

import { useState } from "react";
import CustomTable from "@/components/common/customTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { quizData } from "@/components/common/quiz";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { IIQuizQuestion, IQuizAnswer } from "@/typings/quiz";

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
            <li key={idx} className="text-sm break-words">
              {ans.text} ({ans.points} điểm)
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Quản trị Quiz</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">Thêm câu hỏi</Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-md sm:w-full p-4 sm:p-6">
            <DialogTitle className="text-lg font-bold mb-4">
              Thêm câu hỏi
            </DialogTitle>
            <Input
              placeholder="Nhập câu hỏi mới"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="mb-3"
            />

            {answers.map((answer, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-3">
                <Input
                  placeholder={`Câu trả lời ${idx + 1}`}
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[idx] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="flex-1"
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
                  className="w-full sm:w-20"
                />
              </div>
            ))}

            <Button
              onClick={handleAddQuestion}
              className="w-full sm:w-auto mt-2"
            >
              Thêm câu hỏi mới
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 overflow-x-auto">
        <CustomTable records={questions} columns={columns} />
      </div>
    </div>
  );
}
