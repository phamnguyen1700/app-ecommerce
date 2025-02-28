"use client";
import { useState } from "react";
import Sidebar from "./sidebar";
import { SearchInput } from "../common/searchInput";
import Icon from "@/components/common/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ManagementHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Sidebar */}

      {/* Menu Icon mở sidebar */}
      <div className="flex items-center space-x-3">
        <div>
          {" "}
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        <span className="font-semibold text-lg">Admin Dashboard</span>
      </div>

      {/* Search & Icons */}
      <div className="flex items-center space-x-4">
        <SearchInput />
        <Icon name="bell" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Icon name="user" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
