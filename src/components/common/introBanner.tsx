import React from "react";
import Image from "next/image";

interface TextBannerProps {
  title: string;
  description: string[];
  logo?: string;
}

const TextBanner: React.FC<TextBannerProps> = ({ title, description, logo }) => {
  return (
    <div className="bg-black text-white py-12 px-4 md:px-10 flex flex-col items-center text-center">
      {/* Tiêu đề */}
      <h2 className="font-bold uppercase text-xl md:text-3xl">{title}</h2>

      {/* Nội dung mô tả */}
      <div className="max-w-4xl mt-4 space-y-4 text-base md:text-lg">
        {description.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </div>

      {/* Logo */}
      {logo && (
        <div className="mt-8">
          <Image src={logo} alt="Brand Logo" width={50} height={50} className="w-10 md:w-14" />
        </div>
      )}
    </div>
  );
};

export default TextBanner;
