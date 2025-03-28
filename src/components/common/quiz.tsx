"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/common/sideDrawer";
import {
  getAllQuizzesThunk,
  submitQuizAnswersThunk,
} from "@/redux/thunks/Quiz";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { IProduct } from "@/typings/product";

export default function QuizDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: { answerId: string; points: number };
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Add the missing state variable for recommended products
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );
  // Add state to control showing results
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await dispatch(getAllQuizzesThunk()).unwrap();
        console.log("Fetched quizzes:", response.quizzes);
        setQuizzes(response.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Không thể tải câu hỏi. Vui lòng thử lại sau!");
      }
    };
    fetchQuizzes();
  }, [dispatch]);

  const handleAnswerSelect = (
    questionId: string,
    answerId: string,
    points: number
  ) => {
    console.log("Selected answer:", {
      questionId,
      answerId,
      points,
    });

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: { answerId, points },
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Get all question IDs that need to be answered
    const expectedQuestionIds = quizzes.reduce((ids: string[], quiz) => {
      if (quiz.questions && quiz.questions[0] && quiz.questions[0]._id) {
        ids.push(quiz.questions[0]._id);
      }
      return ids;
    }, []);

    // Check if all questions are answered
    const answeredQuestionIds = Object.keys(selectedAnswers);
    const unansweredQuestions = expectedQuestionIds.filter(
      (id) => !answeredQuestionIds.includes(id)
    );

    if (unansweredQuestions.length > 0) {
      console.log("Missing answers for questions:", unansweredQuestions);
      toast.error("Vui lòng trả lời tất cả các câu hỏi!");
      return;
    }

    try {
      setIsSubmitting(true);

      // Check authentication
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Vui lòng đăng nhập để gửi câu trả lời!");
        setIsSubmitting(false);
        return;
      }

      // Get the quiz ID from the first quiz in the list
      const quizId = quizzes[0]?._id;
      if (!quizId) {
        toast.error("Không tìm thấy ID của bài kiểm tra!");
        setIsSubmitting(false);
        return;
      }

      // Use the admin user ID for submission
      const adminUserId = "67b5a7575594ddec0f909de2"; // Admin user ID

      // Format answers as expected by the API
      const formattedAnswers = Object.entries(selectedAnswers).map(
        ([questionId, { answerId, points }]) => ({
          questionId,
          answerId,
          points,
        })
      );

      console.log("Submitting quiz answers:", {
        quizId,
        userId: adminUserId,
        answers: formattedAnswers,
      });

      const response = await dispatch(
        submitQuizAnswersThunk({
          quizId,
          userId: adminUserId,
          answers: formattedAnswers,
        })
      ).unwrap();

      console.log("Quiz submission successful:", response);

      // Show recommended products if available
      if (
        response.recommendedProducts &&
        response.recommendedProducts.length > 0
      ) {
        setRecommendedProducts(response.recommendedProducts);
        setShowResults(true); // Show results section
      } else {
        // If no recommendations, just close the drawer
        toast.success("Cảm ơn bạn đã hoàn thành bài kiểm tra!");
        setOpen(false);
      }
    } catch (error: any) {
      console.error("Error submitting answers:", {
        error: error.toString(),
        message: error.message || "Unknown error",
        stack: error.stack || "No stack trace",
      });
      toast.error(error.message || "Có lỗi xảy ra khi gửi câu trả lời!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add function to close results and reset
  const handleCloseResults = () => {
    setShowResults(false);
    setOpen(false);
    setSelectedAnswers({});
    toast.success("Cảm ơn bạn đã hoàn thành bài kiểm tra!");
  };

  return (
    <>
      <div className="fixed right-5 top-[50%] -translate-y-1/2 z-[500]">
        <Button
          variant="default"
          className="rounded-l-lg rounded-r-none rotate-90 origin-bottom-right shadow-lg bg-white text-black text-xs px-2 hover:bg-white"
          onClick={() => setOpen(true)}
        >
          <p className="mt-4">XÁC ĐỊNH LOẠI DA CỦA BẠN?</p>
        </Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="w-[450px] h-full fixed right-0 top-0 rounded-none overflow-y-auto overflow-x-hidden z-[500]">
          <DrawerHeader>
            {!showResults ? (
              // Quiz questions section
              <>
                <DrawerTitle className="text-xl font-bold">
                  Trả lời Quiz
                </DrawerTitle>
                <p className="text-sm mb-4">
                  Chọn đáp án phù hợp nhất cho mỗi câu hỏi.
                </p>
                <div className="space-y-4">
                  {quizzes.map((quiz, index) => (
                    <div key={quiz._id} className="border-b pb-3">
                      <h3 className="font-semibold">
                        {index + 1}. {quiz.questions[0].question}
                      </h3>
                      {quiz.questions[0].answers.map((answer: any) => (
                        <label
                          key={answer._id}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <input
                            type="radio"
                            name={`question-${quiz.questions[0]._id}`}
                            checked={
                              selectedAnswers[quiz.questions[0]._id]
                                ?.answerId === answer._id
                            }
                            onChange={() =>
                              handleAnswerSelect(
                                quiz.questions[0]._id,
                                answer._id,
                                answer.points
                              )
                            }
                          />
                          <span>{answer.text}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi câu trả lời"}
                </Button>
              </>
            ) : (
              // Results section with recommended products
              <>
                <DrawerTitle className="text-xl font-bold">
                  Sản phẩm phù hợp với bạn
                </DrawerTitle>
                <p className="text-sm mb-4">
                  Dựa trên câu trả lời của bạn, chúng tôi đề xuất những sản phẩm
                  sau:
                </p>
                <div className="space-y-4">
                  {recommendedProducts.map((product) => (
                    <div key={product._id} className="border rounded-md p-3">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        <Button
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/commercial/products/${product._id}`)
                          }
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" onClick={handleCloseResults}>
                  Đóng
                </Button>
              </>
            )}
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
