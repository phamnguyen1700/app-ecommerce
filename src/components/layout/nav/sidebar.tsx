"use client";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { title: "SẢN PHẨM", path: "/management/products" },
  { title: "ĐƠN HÀNG", path: "/management/orders" },
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

  return (
    <SideDrawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Icon name="menu" />
      </DrawerTrigger>
      <DrawerContent className="max-w-44 h-full rounded-none">
        <DrawerTitle className="text-center text-lg font-semibold pt-2 pb-6 bg-gray-200 border border-b-gray-300">
          HI NGUYỄN
        </DrawerTitle>
        <div className="container flex-col gap-3 mt-4 flex-grow">
          {sidebarItems.map((item) => (
            <Button
              key={item.path}
              variant="link"
              className="hover:bg-black hover:text-white text-left px-4"
              onClick={() => router.push(item.path)}
            >
              {item.title} →
            </Button>
          ))}
        </div>
        {/* Footer */}
        <div className="w-full border-t py-3 text-center text-xs text-gray-500">
          © 2024 HISAKI COSMETIC. All rights reserved.
        </div>
      </DrawerContent>
    </SideDrawer>
  );
}
