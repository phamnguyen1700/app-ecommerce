"use client";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <SideDrawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Icon name="menu" />
      </DrawerTrigger>
      <DrawerContent className="w-1/5 h-full rounded-none">
        <DrawerTitle className="text-center text-lg font-semibold pt-2 pb-6 bg-gray-200 border border-b-gray-300">
          HI NGUYỄN
        </DrawerTitle>
        <div className="container flex-col gap-3 mt-4 flex-grow">
          <Button variant="link" className="hover:bg-black hover:text-white">
            <b className="text-sm">SẢN PHẨM →</b>
          </Button>
          <Button variant="link" className="hover:bg-black hover:text-white">
            <b className="text-sm">ĐƠN HÀNG →</b>
          </Button>
          <Button variant="link" className="hover:bg-black hover:text-white">
            <b className="text-sm">HÓA ĐƠN →</b>
          </Button>
          <Button variant="link" className="hover:bg-black hover:text-white">
            <b className="text-sm">NHÂN VIÊN →</b>
          </Button>
        </div>
        {/* Footer */}
        <div className="w-full border-t py-3 text-center text-xs text-gray-500">
          © 2024 HISAKI COSMETIC. All rights reserved.
        </div>
      </DrawerContent>
    </SideDrawer>
  );
}
