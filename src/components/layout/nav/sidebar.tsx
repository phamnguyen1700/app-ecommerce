"use client";

import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const sidebarItems = [
  { title: "SẢN PHẨM", path: "/management/products", icon: "shoppingBasket" },
  { title: "ĐƠN HÀNG", path: "/management/orders", icon: "shoppingBag" },
  { title: "THƯƠNG HIỆU", path: "/management/brands", icon: "star" },
  { title: "NGƯỜI DÙNG", path: "/management/users", icon: "user" },
  { title: "QUIZ", path: "/management/quizs", icon: "bell" },
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
          <Icon name="menu" className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[280px] sm:max-w-[320px] h-full rounded-none border-r shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DrawerTitle className="text-center py-4 bg-gray-100 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mb-2">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
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
                    <Icon
                      name={item.icon}
                      className={`mr-3 h-5 w-5 ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    />
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

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-sm"
              onClick={() => {
                // Handle logout logic here
                router.push("/login");
                setOpen(false);
              }}
            >
              <Icon name="user" className="mr-2 h-4 w-4" />
              Đăng xuất
            </Button>
            <div className="mt-4 text-center text-xs text-gray-500">
              © 2024 HISAKI COSMETIC. All rights reserved.
            </div>
          </div>
        </div>
      </DrawerContent>
    </SideDrawer>
  );
}
