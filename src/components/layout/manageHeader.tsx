"use client";
import { SearchInput } from "../common/searchInput";
import Icon from "@/components/common/icon";

export default function ManagementHeader() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Icon name="menu" className="cursor-pointer" />
        <span className="font-semibold text-lg">Admin Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <SearchInput />
        <Icon name="bell" />
        <Icon name="user" />
      </div>
    </header>
  );
}
