import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  link: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Các thành phần dưỡng da tốt nhất theo chuyên gia",
    excerpt: "Những thành phần như Hyaluronic Acid, Niacinamide và Retinol có tác dụng gì với làn da?",
    description: "Chuyên gia da liễu chia sẻ về các thành phần quan trọng cần có trong sản phẩm chăm sóc da để giúp da khỏe mạnh và rạng rỡ hơn.",
    image: "https://source.unsplash.com/600x400/?skincare,ingredients",
    link: "https://www.webmd.com/beauty/best-skincare-ingredients",
  },
  {
    id: 2,
    title: "Lợi ích của kem chống nắng và cách chọn sản phẩm phù hợp",
    excerpt: "Kem chống nắng có thực sự quan trọng? Cách chọn kem chống nắng đúng cho từng loại da?",
    description: "Các bác sĩ da liễu khuyên rằng việc sử dụng kem chống nắng hằng ngày giúp ngăn ngừa lão hóa sớm và bảo vệ da khỏi tác hại của tia UV.",
    image: "https://source.unsplash.com/600x400/?sunscreen,beauty",
    link: "https://www.healthline.com/health/best-sunscreens",
  },
  {
    id: 3,
    title: "Xu hướng skincare mới nhất năm 2025",
    excerpt: "Cùng khám phá những xu hướng làm đẹp và chăm sóc da nổi bật trong năm tới.",
    description: "Từ mỹ phẩm chứa probiotics đến chăm sóc da bằng công nghệ AI, các xu hướng mới đang định hình tương lai của ngành làm đẹp.",
    image: "https://source.unsplash.com/600x400/?beauty,trends",
    link: "https://www.vogue.com/article/skincare-trends-2025",
  },
];

const SkincareNews: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Tin Tức Skincare Mới Nhất</h1>
      <p className="text-center text-gray-600 mb-8">
        Cập nhật những thông tin hữu ích về chăm sóc da từ các nguồn uy tín như WebMD, Healthline và Vogue.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden rounded-lg shadow-lg">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.excerpt}</p>
              <p className="text-gray-500 text-sm mb-4">{article.description}</p>
              <Button asChild>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  Đọc thêm
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkincareNews;
