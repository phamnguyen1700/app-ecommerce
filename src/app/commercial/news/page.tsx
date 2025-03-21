"use client";

import "@/app/globals.css";

const newsData = [
  {
    id: 1,
    title: " Xu hướng thời trang 2025",
    description:
      "Khám phá những xu hướng thời trang nổi bật trong năm 2025 và cách phối đồ để luôn nổi bật.",
    date: "21/03/2025",
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
  },
  {
    id: 2,
    title: " Bí quyết chăm sóc da mùa hè",
    description:
      "Học cách chăm sóc da hiệu quả trong mùa hè để luôn giữ được làn da khỏe mạnh và rạng rỡ.",
    date: "20/03/2025",
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
  },
  {
    id: 3,
    title: "Tin tức 3: Công nghệ mới trong ngành mỹ phẩm",
    description:
      "Cập nhật những công nghệ mới nhất trong ngành mỹ phẩm giúp cải thiện làn da và sắc đẹp.",
    date: "19/03/2025",
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
  },
];

export default function NewsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tin Tức</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{news.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{news.date}</p>
              <p className="text-sm text-gray-800">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
