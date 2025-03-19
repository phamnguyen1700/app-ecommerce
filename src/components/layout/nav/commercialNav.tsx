"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const navItems = [
  { title: "Trang chủ", path: "/commercial/home" },
  { title: "Sản phẩm", path: "/commercial/products" },
  { title: "Blogs", path: "/commercial/blogs" },
  { title: "Tin tức", path: "/commercial/news" },
  { title: "Q/A", path: "/commercial/qa" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <nav className={isMobile ? "w-full" : "flex justify-center items-center"}>
      {/* Mobile Navigation */}
      {isMobile ? (
        <div className="w-full py-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.title}
                onClick={() => router.push(item.path)}
                variant="ghost"
                className={`w-full justify-start py-3 mb-1 rounded-md text-left ${
                  isActive
                    ? "bg-gray-100 font-medium text-black"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{item.title}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      ) : (
        /* Desktop Navigation */
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.title}
                onClick={() => router.push(item.path)}
                variant="link"
                className={`relative px-2 font-light no-underline ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {item.title}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[3px] bg-black transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  }`}
                ></span>
              </Button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
