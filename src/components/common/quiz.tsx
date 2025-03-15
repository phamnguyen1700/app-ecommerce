import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/common/sideDrawer";

export const quizData = [
    {
      question: "Sau khi rửa mặt, khoảng 2 đến 3 giờ sau, bạn cảm thấy da mặt?",
      answers: [
        { text: "Rất thô ráp, tróc vảy hoặc sạm lại.", points: 1 },
        { text: "Căng.", points: 1 },
        { text: "Bóng và phản chiếu lại ánh sáng.", points: 1 }
      ]
    },
    {
      question: "Trong các bức ảnh, mặt bạn trông bóng?",
      answers: [
        { text: "Không bao giờ, hoặc chưa bao giờ để ý thấy điều đó.", points: 1 },
        { text: "Thỉnh thoảng.", points: 1 },
        { text: "Luôn luôn.", points: 1 }
      ]
    },
    {
      question: "Hai đến ba giờ sau khi bôi kem nền, lớp trang điểm của bạn trở nên?",
      answers: [
        { text: "Tróc vảy, mốc hoặc giả ở các vết nhăn.", points: 1 },
        { text: "Trơn tru.", points: 1 },
        { text: "Bóng hoặc bị chảy.", points: 1 }
      ]
    },
    {
      question: "Khi ở môi trường khô, nếu không bôi kem dưỡng ẩm, da bạn sẽ?",
      answers: [
        { text: "Cảm thấy rất khô và nứt nẻ.", points: 1 },
        { text: "Cảm thấy căng.", points: 1 },
        { text: "Thấy bóng nhờn.", points: 1 }
      ]
    },
    {
      question: "Bạn tự đánh giá da mình như thế nào?",
      answers: [
        { text: "Khô.", points: 1 },
        { text: "Bình thường.", points: 1 },
        { text: "Dầu.", points: 1 }
      ]
    }
  ];

export default function QuizDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-5 top-[50%] -translate-y-1/2 z-[50]">
        <Button
          variant="default"
          className="rounded-l-lg rounded-r-none rotate-90 origin-bottom-right shadow-lg bg-white text-black text-xs px-2 hover:bg-white"
          onClick={() => setOpen(true)}
        >
          <p className="mt-4">XÁC ĐỊNH LOẠI DA CỦA BẠN?</p>
        </Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-[450px] h-full fixed right-0 top-0 rounded-none overflow-y-auto overflow-x-hidden z-[200]">
      <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Trả lời Quiz</DrawerTitle>
          <p className="text-sm mb-4">Chọn đáp án phù hợp nhất cho mỗi câu hỏi.</p>
          <div className="space-y-4">
            {quizData.map((item, index) => (
              <div key={index} className="border-b pb-3">
                <h3 className="font-semibold">{index + 1}. {item.question}</h3>
                {item.answers.map((answer, idx) => (
                  <label key={idx} className="flex items-center space-x-2 text-sm">
                    <input type="radio" name={`question-${index}`} value={answer.points} />
                    <span>{answer.text}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <Button className="w-full mt-6">Gửi câu trả lời</Button>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  </>
  );
}
