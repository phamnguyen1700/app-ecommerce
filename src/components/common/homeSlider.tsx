"use client";

import React, { useCallback, useEffect, useState, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

interface HomeSliderProps {
  title?: string; // Thêm title (không bắt buộc)
  children: ReactNode;
}

const HomeSlider: React.FC<HomeSliderProps> = ({ title, children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Cập nhật trạng thái của nút prev/next
  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("init", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-visible">
      {/* Tiêu đề Slider */}
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      )}

      {/* Slider Container */}
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">{children}</div>
      </div>

      {/* Nút Prev */}
      <Button
        variant="link"
        className={`absolute left-0 bg-black text-white top-1/2 transform -translate-y-1/2 px-4 text-sm font-light z-[999] ${
          canScrollPrev ? "opacity-100" : "opacity-75 cursor-not-allowed"
        }`}
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
      >
        ←
      </Button>

      {/* Nút Next */}
      <Button
        variant="link"
        className={`absolute right-0 bg-black text-white top-1/2 transform -translate-y-1/2 px-4 text-sm font-light z-[999] ${
          canScrollNext ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
      >
        →
      </Button>
    </div>
  );
};

export default HomeSlider;
