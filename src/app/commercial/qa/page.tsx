"use client";

import "@/app/globals.css";

const qaData = [
  {
    question: "Làm thế nào để đặt hàng trên website?",
    answer:
      "Bạn có thể đặt hàng bằng cách chọn sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán qua các bước hướng dẫn trên website.",
  },
  {
    question: "Tôi có thể đổi trả sản phẩm không?",
    answer:
      "Có, bạn có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên tem, nhãn và chưa qua sử dụng.",
  },
  {
    question: "Phương thức thanh toán nào được hỗ trợ?",
    answer:
      "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD).",
  },
  {
    question: "Thời gian giao hàng là bao lâu?",
    answer:
      "Thời gian giao hàng thường từ 3-5 ngày làm việc, tùy thuộc vào địa chỉ của bạn.",
  },
  {
    question: "Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?",
    answer:
      "Bạn có thể liên hệ với chúng tôi qua email support@example.com hoặc gọi đến hotline 1800-123-456.",
  },
];

export default function QAPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hỏi & Đáp</h1>
      <div className="space-y-4">
        {qaData.map((qa, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-2">{qa.question}</h2>
            <p className="text-sm text-gray-700">{qa.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
