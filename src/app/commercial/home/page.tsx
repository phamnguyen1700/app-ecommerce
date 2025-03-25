"use client";

import "@/app/globals.css";
import IntroBanner from "@/components/common/introBanner";
import Banner from "@/components/common/banner";
import BlogCard from "@/components/common/blogCard";
import HomeSlider from "@/components/common/homeSlider";
import ProductCard from "@/components/common/productCard";
import { AppDispatch } from "@/redux/store";
import { getAllProductThunk } from "@/redux/thunks/Product";
import { IProduct } from "@/typings/product";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Danh sách blog mẫu
const blogs = [
  {
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
    title: "ADIZERO EVO SL. FEEL FAST.",
    description:
      "For you to run in — or not. Evo SL gives you fast in all aspects of life.",
    link: "/blog/adizero-evo-sl",
  },
  {
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
    title: "THE NEW RUNNING ERA",
    description:
      "Experience the next level of comfort and speed with our latest collection.",
    link: "/blog/new-running-era",
  },
  {
    image:
      "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/exercise_burnout_hero_d_215_994975_77b7589ad2.gif",
    title: "STREET STYLE MEETS PERFORMANCE",
    description:
      "Blend fashion with functionality in our newest urban collection.",
    link: "/blog/street-style-performance",
  },
];

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [user, setUser] = useState<{ skinType?: string } | null>(null);

  const filteredProducts =
    user?.skinType && user.skinType !== ""
      ? products.filter((product: IProduct) =>
          product.skinType?.includes(user.skinType ?? "")
        )
      : products; // Nếu không có user, hiển thị toàn bộ sản phẩm

  const getProductAPI = useCallback(async () => {
    try {
      const res = await dispatch(getAllProductThunk()).unwrap();
      setProducts(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // 🔹 Lấy dữ liệu từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // 🔹 Parse JSON và lưu vào state
    }
    getProductAPI();
  }, [dispatch, getProductAPI]);

  return (
    <div className="container min-w-fit">
      <Banner title="OIL SKIN"/>

      {user ? (
        <div className="w-full px-4 pt-2 pb-2">
          {products.length > 0 && (
            <HomeSlider title="Dành cho bạn">
              {(filteredProducts?.length ? filteredProducts : products).map(
                (product, index) => (
                  <div
                    className="flex-shrink-0 w-1/4"
                    key={product._id || index}
                  >
                    <ProductCard product={product} />
                  </div>
                )
              )}
            </HomeSlider>
          )}
        </div>
      ) : (
        <div className="w-full px-4 pt-2 pb-2">
          <HomeSlider title="Best seller">
            {products.map((product, index) => (
              <div className="flex-shrink-0 w-1/4" key={product._id || index}>
                <ProductCard product={product} />
              </div>
            ))}
          </HomeSlider>
        </div>
      )}

      <Banner title="OIL SKIN" description="Cho làn da khô thoáng!" />
      {/* Slider cho Blog */}
      <div className="w-full px-4 pt-2 pb-2">
        <HomeSlider title="Bài viết nổi bật">
          {blogs.map((blog, index) => (
            <div className="flex-shrink-0 w-1/3" key={index}>
              <BlogCard {...blog} />
            </div>
          ))}
        </HomeSlider>
      </div>
      <div className="w-full px-4 pt-2 pb-2">
        <HomeSlider title="Best seller">
          {products.map((product, index) => (
            <div className="flex-shrink-0 w-1/4" key={product._id || index}>
              <ProductCard product={product} />
            </div>
          ))}
        </HomeSlider>
      </div>
      <IntroBanner
        title="CHĂM SÓC DA CHUYÊN NGHIỆP TỪ NĂM 2010"
        description={[
          "Chúng tôi lấy cảm hứng từ các chuyên gia da liễu. Từ những công thức đầu tiên được tạo ra trong phòng thí nghiệm, việc tạo ra các sản phẩm chăm sóc da tốt nhất cho mọi loại da là động lực thúc đẩy chúng tôi theo đuổi các đột phá công nghệ và đổi mới thiết kế.",
          "Các sản phẩm của chúng tôi đã xuất hiện trên các kệ làm đẹp trên khắp thế giới, nhưng chúng cũng có ảnh hưởng vượt xa lĩnh vực chăm sóc da...",
          "Dòng sản phẩm chăm sóc da tự nhiên của chúng tôi là sự bổ sung hoàn hảo cho các bộ sưu tập cao cấp. Các công thức của chúng tôi kết hợp từ các thành phần truyền thống để tạo nên phong cách hiện đại cho các sản phẩm kinh điển...",
        ]}
        ctaLink="/commercial/blogs"
        ctaText="Về chúng tôi"
      />

    </div>
  );
}
