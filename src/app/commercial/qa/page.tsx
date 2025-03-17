"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
  id: number;
  text: string;
  rating: number;
}

interface Question {
  id: number;
  question: string;
  comments: Comment[];
}

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Làm thế nào để chọn kem dưỡng phù hợp với loại da?",
    comments: [
      { id: 1, text: "Bạn nên xem xét loại da và chọn sản phẩm phù hợp.", rating: 5 },
      { id: 2, text: "Tôi khuyên dùng kem dưỡng có chứa Hyaluronic Acid cho da khô.", rating: 4 },
    ],
  },
  {
    id: 2,
    question: "Có nên sử dụng Retinol mỗi ngày không?",
    comments: [
      { id: 3, text: "Chỉ nên sử dụng 2-3 lần/tuần rồi tăng dần.", rating: 5 },
    ],
  },
];

const SkincareQA: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: questions.length + 1, question: newQuestion, comments: [] },
      ]);
      setNewQuestion("");
    }
  };

  const handleAddComment = (questionId: number) => {
    if (commentInputs[questionId]?.trim()) {
      setQuestions(
        questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                comments: [
                  ...q.comments,
                  {
                    id: q.comments.length + 1,
                    text: commentInputs[questionId],
                    rating: 0,
                  },
                ],
              }
            : q
        )
      );
      setCommentInputs({ ...commentInputs, [questionId]: "" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Hỏi & Đáp Chăm Sóc Da</h1>
      <p className="text-center text-gray-600 mb-8">
        Câu hỏi và câu trả lời về skincare từ cộng đồng và chuyên gia.
      </p>
      <div className="mb-6 flex flex-col items-center">
        <Input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Đặt câu hỏi về chăm sóc da..."
          className="w-full max-w-lg mb-4"
        />
        <Button onClick={handleAddQuestion}>Gửi câu hỏi</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {questions.map((qa) => (
          <Card key={qa.id} className="rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{qa.question}</h2>
            <div className="mb-4">
              {qa.comments.map((comment) => (
                <div key={comment.id} className="border-b pb-2 mb-2">
                  <p className="text-gray-600">{comment.text}</p>
                  <p className="text-sm text-gray-500">Lượt thích: {comment.rating}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <Input
                value={commentInputs[qa.id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [qa.id]: e.target.value })}
                placeholder="Viết câu trả lời..."
                className="flex-1 mr-2"
              />
              <Button onClick={() => handleAddComment(qa.id)}>Trả lời</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkincareQA;
