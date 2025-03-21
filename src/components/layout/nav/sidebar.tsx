"use client";

import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/common/sideDrawer";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const sidebarItems = [
  { title: "SẢN PHẨM", path: "/management/products" },
  { title: "ĐƠN HÀNG", path: "/management/orders" },
  { title: "THƯƠNG HIỆU", path: "/management/brands" },
  { title: "NGƯỜI DÙNG", path: "/management/users" },
  { title: "QUIZ", path: "/management/quizs" },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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

  // Close sidebar after navigation on mobile
  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <SideDrawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Open menu"
        >
          <span className="h-6 w-6">☰</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[280px] sm:max-w-[320px] h-full rounded-none border-r shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DrawerTitle className="text-center py-4 bg-gray-100 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <span className="font-semibold">HI NGUYỄN</span>
            </div>
          </DrawerTitle>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={`w-full justify-start py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-black text-white hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <span className="flex-1">{item.title}</span>
                    <ChevronRight
                      className={`h-4 w-4 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </DrawerContent>
    </SideDrawer>
  );
}
