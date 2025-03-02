import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface BannerProps {
    title: string;
    description?: string; // Mô tả có thể không có
  }

  const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
    <div className="relative w-fit h-auto">
      {/* Hình ảnh nền */}
      <Image
        src="https://delic.vn/storage/banner-2-2.jpg"
        alt="Banner"
        width={2000}
        height={1080}
        priority
        className="w-screen h-[40vh] md:h-[60vh] object-cover"
      />

      {/* Box chứa title + description + button */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2">
        {/* Box title */}
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg w-max">
          <h2 className="text-black font-bold font-serif text-lg">{title}</h2>
        </div>

        {/* Box description (chỉ hiển thị nếu có) */}
        {description && (
          <div className="bg-white backdrop-blur-md p-2 rounded-lg shadow-md w-max">
            <p className="text-black text-xs font-light">{description}</p>
          </div>
        )}

        {/* Button */}
        <Button
          variant="link"
          className="border-2 border-black mt-2 bg-white text-black font-light px-4 py-2 rounded-md hover:border-4 hover:border-b-8 hover:border-r-8 hover:border-black transition w-max"
        >
          Khám phá thêm →
        </Button>
      </div>
    </div>
  );
};

export default Banner;
