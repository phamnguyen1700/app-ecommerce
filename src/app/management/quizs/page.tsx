"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomTable from "@/components/common/customTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IIQuizQuestion, IQuizAnswer } from "@/typings/quiz";
import {
  getAllQuizzesThunk,
  addQuizThunk,
  deleteQuizThunk,
  updateQuizThunk,
} from "@/redux/thunks/Quiz";
import { AppDispatch } from "@/redux/store";
import { Pencil, Trash2 } from "lucide-react";

export default function QuizAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [points, setPoints] = useState([1, 1, 1]);
  const [open, setOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await dispatch(getAllQuizzesThunk()).unwrap();
        setQuizzes(response.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [dispatch]);

  const handleAddQuestion = async () => {
    const questionData = {
      title: "Quiz Question",
      description: "",
      questions: [
        {
          question: newQuestion,
          answers: answers.map((text, idx) => ({
            text,
            points: points[idx],
          })),
        },
      ],
    };

    try {
      await dispatch(addQuizThunk(questionData)).unwrap();
      const response = await dispatch(getAllQuizzesThunk()).unwrap();
      setQuizzes(response.quizzes);
      setAnswers(["", "", ""]);
      setPoints([1, 1, 1]);
      setNewQuestion("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      try {
        await dispatch(deleteQuizThunk(id)).unwrap();
        const response = await dispatch(getAllQuizzesThunk()).unwrap();
        setQuizzes(response.quizzes);
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handleEditQuiz = (quiz: any) => {
    setEditingQuiz(quiz);
    setNewQuestion(quiz.questions[0].question);
    setAnswers(quiz.questions[0].answers.map((ans: any) => ans.text));
    setPoints(quiz.questions[0].answers.map((ans: any) => ans.points));
    setOpen(true);
  };

  const handleUpdateQuestion = async () => {
    if (!editingQuiz) return;

    const questionData = {
      title: editingQuiz.title,
      description: editingQuiz.description,
      questions: [
        {
          question: newQuestion,
          answers: answers.map((text, idx) => ({
            text,
            points: points[idx],
          })),
        },
      ],
    };

    try {
      await dispatch(
        updateQuizThunk({ id: editingQuiz._id, data: questionData })
      ).unwrap();
      const response = await dispatch(getAllQuizzesThunk()).unwrap();
      setQuizzes(response.quizzes);
      setAnswers(["", "", ""]);
      setPoints([1, 1, 1]);
      setNewQuestion("");
      setEditingQuiz(null);
      setOpen(false);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const columns = [
    {
      colName: "Câu hỏi",
      render: (item: any) => item.questions[0].question,
    },
    {
      colName: "Câu trả lời",
      render: (item: any) => (
        <div className="min-w-[300px]">
          <ul className="list-none m-0 space-y-1">
            {item.questions[0].answers.map((ans: any, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground shrink-0 mt-[2px]"></span>
                <span>
                  {ans.text} ({ans.points} điểm)
                </span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      colName: "Thao tác",
      render: (item: any) => (
        <div className="flex gap-1 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleEditQuiz(item)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleDeleteQuiz(item._id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quản trị Quiz</h2>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Thêm câu hỏi</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {editingQuiz ? "Sửa câu hỏi" : "Thêm câu hỏi"}
          </DialogTitle>
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

          <Button
            onClick={editingQuiz ? handleUpdateQuestion : handleAddQuestion}
          >
            {editingQuiz ? "Cập nhật" : "Thêm câu hỏi mới"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="mt-8">
        <CustomTable records={quizzes} columns={columns} />
      </div>
    </div>
  );
}
