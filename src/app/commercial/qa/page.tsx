"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, HelpCircle } from "lucide-react";
import "@/app/globals.css";

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqData: FAQItemProps[] = [
  {
    question: "Sản phẩm có chính hãng không?",
    answer:
      "Tất cả sản phẩm của chúng tôi đều được nhập khẩu và phân phối từ các nhà cung cấp uy tín, đảm bảo nguồn gốc và chất lượng chính hãng.",
  },
  {
    question: "Làm thế nào để đặt hàng?",
    answer:
      "Bạn có thể duyệt qua danh mục sản phẩm, chọn sản phẩm ưa thích, thêm vào giỏ hàng và tiến hành thanh toán thông qua quy trình đơn giản trên website. Nếu cần hỗ trợ, hãy liên hệ bộ phận chăm sóc khách hàng.",
  },
  {
    question: "Các hình thức thanh toán nào được hỗ trợ?",
    answer:
      "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng và ví điện tử, giúp bạn lựa chọn phương thức phù hợp nhất.",
  },
  {
    question: "Chính sách đổi trả và hoàn tiền như thế nào?",
    answer:
      "Nếu sản phẩm có lỗi kỹ thuật hoặc không đúng với mô tả, bạn có thể yêu cầu đổi trả hoặc hoàn tiền trong vòng 7 ngày kể từ ngày nhận hàng. Vui lòng liên hệ hỗ trợ để được hướng dẫn chi tiết.",
  },
  {
    question: "Thời gian giao hàng dự kiến là bao lâu?",
    answer:
      "Thời gian giao hàng thường dao động từ 2-5 ngày làm việc, tùy theo địa điểm giao hàng của bạn.",
  },
  {
    question: "Làm thế nào để theo dõi đơn hàng?",
    answer:
      "Sau khi đặt hàng thành công, bạn sẽ nhận được mã đơn hàng. Hãy đăng nhập vào tài khoản của bạn để theo dõi tình trạng đơn hàng theo thời gian thực.",
  },
  {
    question: "Có chương trình khuyến mãi nào không?",
    answer:
      "Chúng tôi thường xuyên có các chương trình khuyến mãi và ưu đãi đặc biệt. Hãy đăng ký nhận bản tin hoặc theo dõi website để cập nhật thông tin mới nhất.",
  },
  {
    question: "Sản phẩm phù hợp với loại da nào?",
    answer:
      "Mỗi sản phẩm đều có thông tin chi tiết về loại da phù hợp và công dụng cụ thể. Bạn có thể tham khảo mô tả sản phẩm hoặc liên hệ tư vấn viên để được tư vấn chính xác.",
  },
  {
    question: "Tôi gặp vấn đề khi thanh toán, tôi nên làm gì?",
    answer:
      "Nếu gặp khó khăn trong quá trình thanh toán, vui lòng liên hệ ngay với bộ phận hỗ trợ khách hàng qua số điện thoại, email hoặc chat trực tuyến.",
  },
  {
    question: "Tôi cần tư vấn thêm về sản phẩm, tôi có thể liên hệ ở đâu?",
    answer:
      "Bạn có thể liên hệ trực tiếp với đội ngũ tư vấn của chúng tôi qua mục 'Liên hệ' trên website để nhận được sự hỗ trợ nhanh chóng.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              Tìm câu trả lời cho những câu hỏi phổ biến về sản phẩm, dịch vụ và quy trình mua hàng của chúng tôi
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FAQItem question={item.question} answer={item.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors py-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800">{question}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          >
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
