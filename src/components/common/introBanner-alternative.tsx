"use client";

import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

interface IntroBannerProps {
  title: string;
  description: string[];
  logo?: string;
  backgroundImage?: string;
}

const IntroBanner: React.FC<IntroBannerProps> = ({
  title,
  description,
  logo,
  backgroundImage,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-black"></div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto py-20 md:py-28 px-6">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* Left side - Title and logo */}
          <div className="md:col-span-5 text-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {logo && (
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Brand Logo"
                  width={80}
                  height={80}
                  className="mb-6"
                />
              )}
              <h2 className="font-bold uppercase text-3xl md:text-4xl lg:text-5xl leading-tight">
                {title}
              </h2>
              <div className="h-1 w-20 bg-primary"></div>
              <Button
                variant="outline"
                className="mt-6 border-white text-white hover:bg-white hover:text-black"
              >
                Khám phá thêm
              </Button>
            </motion.div>
          </div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-7 text-white"
          >
            <div className="space-y-6">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </div>
  );
};

export default IntroBanner;
