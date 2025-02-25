"use client";
import { Drawer as SideDrawer, DrawerContent, DrawerTrigger } from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <SideDrawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="absolute top-4 left-4 z-50" onClick={() => setOpen(true)}>
          <Icon name="menu" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-64 bg-gray-900 text-white h-full p-4">
        <div className="text-lg font-semibold pb-4">Admin Menu</div>
        <Button variant="ghost" className="w-full text-left text-white">Dashboard</Button>
        <Button variant="ghost" className="w-full text-left text-white">Products</Button>
        <Button variant="ghost" className="w-full text-left text-white">Orders</Button>
        <Button variant="ghost" className="w-full text-left text-white">Users</Button>
        <Button variant="ghost" className="w-full text-left text-white">Settings</Button>
      </DrawerContent>
    </SideDrawer>
  );
}
