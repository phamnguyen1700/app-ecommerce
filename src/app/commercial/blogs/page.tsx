import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cách chăm sóc da mặt đúng cách mỗi ngày",
    excerpt: "Học cách chăm sóc da đúng chuẩn từ các chuyên gia da liễu với quy trình đơn giản nhưng hiệu quả.",
    description: "Chăm sóc da mặt là một quy trình quan trọng để duy trì làn da khỏe mạnh. Bài viết này hướng dẫn bạn các bước chăm sóc da hàng ngày dựa trên nghiên cứu từ các chuyên gia da liễu hàng đầu.",
    image: "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/building_your_perfect_skincare_routine_slideshow/getty_rf_photo_of_girls_with_different_skin_types.jpg?resize=652px:*&output-quality=75",
    link: "https://www.webmd.com/beauty/ss/slideshow-skincare-routine",
  },
  {
    id: 2,
    title: "Tại sao kem chống nắng quan trọng?",
    excerpt: "Tìm hiểu tầm quan trọng của kem chống nắng và cách chọn sản phẩm phù hợp cho từng loại da.",
    description: "Kem chống nắng không chỉ giúp ngăn ngừa lão hóa mà còn bảo vệ da khỏi tia UV có hại. Hãy cùng tìm hiểu lý do tại sao đây là bước không thể thiếu trong chu trình chăm sóc da.",
    image: "https://media.post.rvohealth.io/wp-content/uploads/2022/06/female-applying-face-cream-732-549-feature-thumb-732x549.jpg",
    link: "https://www.healthline.com/health/beauty-skin-care/best-sunscreens",
  },
  {
    id: 3,
    title: "Các thành phần cần có trong routine chăm sóc da",
    excerpt: "Những thành phần như Hyaluronic Acid, Niacinamide, và Retinol mang lại lợi ích gì cho làn da?",
    description: "Việc lựa chọn sản phẩm chăm sóc da phù hợp đòi hỏi hiểu biết về các thành phần quan trọng. Bài viết này sẽ giúp bạn biết cách chọn lựa sản phẩm tốt nhất cho làn da của mình.",
    image: "https://media.post.rvohealth.io/wp-content/uploads/2022/08/washing-face-beauty-732x549-thumbnail-732x549.jpg",
    link: "https://www.webmd.com/beauty/ss/slideshow-best-skincare-ingredients",
  },
];

const SkincareBlog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Chăm Sóc Da</h1>
      <p className="text-center text-gray-600 mb-8">
        Cung cấp thông tin hữu ích về chăm sóc da từ các nguồn uy tín như WebMD và Healthline.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden rounded-lg shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <p className="text-gray-500 text-sm mb-4">{post.description}</p>
              <Button asChild>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
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

export default SkincareBlog;
