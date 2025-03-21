import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface IntroBannerProps {
  title: string;
  description: string[];
  logo?: string;
  ctaLink?: string;
  ctaText?: string;
}

const IntroBanner: React.FC<IntroBannerProps> = ({
  title,
  description,
  ctaLink = "/about",
  ctaText = "Tìm hiểu thêm",
}) => {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-60 md:h-60 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto py-16 md:py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title with decorative line */}
          <div className="flex flex-col items-center mb-10 md:mb-16">
            <div className="h-1 w-12 bg-primary mb-6"></div>
            <h2 className="font-bold uppercase text-2xl md:text-4xl lg:text-5xl text-center leading-tight">
              {title}
            </h2>
            <div className="h-1 w-12 bg-primary mt-6"></div>
          </div>

          {/* Description paragraphs with staggered animation */}
          <div className="space-y-6 md:space-y-8">
            {description.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-base md:text-lg text-gray-300 leading-relaxed text-center md:text-left"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex justify-center md:justify-start">
            <Link
              href={ctaLink}
              className="group inline-flex items-center border border-white px-6 py-3 text-sm md:text-base font-medium transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span>{ctaText}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </div>
  );
};

export default IntroBanner;
