"use client";
import { useEffect, useState } from "react";
import Sidebar from "./nav/sidebar";
import { SearchInput } from "../common/searchInput";
import Icon from "@/components/common/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { refreshTokenThunk } from "@/redux/thunks/Auth";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function ManagementHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/commercial/home");
    } else {
      setLoggedIn(token);
    }
  }, [router]);

  useEffect(() => {
    if (loggedIn !== null) {
      const interval = setInterval(() => {
        const refreshToken = localStorage.getItem("refreshToken") ?? "";
        dispatch(refreshTokenThunk(refreshToken));
      }, 1000 * 60 * 10);

      return () => clearInterval(interval);
    }
  }, [loggedIn, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
