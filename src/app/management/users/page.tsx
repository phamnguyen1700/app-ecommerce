"use client";

import type React from "react";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { IUser, IUserFilter } from "@/typings/user";
import { TableColumn } from "@/typings/table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserThunk, toggleBanUserThunk } from "@/redux/thunks/User";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function ManageUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [inputFilterState, setInputFilterState] = useState<
    Partial<IUserFilter>
  >({
    name: "",
    email: "",
    role: undefined,
    isVerified: undefined,
  });

  const [filterState, setFilterState] = useState<Partial<IUserFilter>>({
    page: 1,
    limit: 10,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFilterState((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setInputFilterState((prev) => ({
      ...prev,
      [name]: value === "--" ? undefined : value,
    }));
  };

  const handleSearch = () => {
    setFilterState({
      ...inputFilterState,
      page: 1,
      limit: 10,
    });
  };

  const clearFilters = () => {
    setInputFilterState({
      name: "",
      email: "",
      role: undefined,
      isVerified: undefined,
    });
  };

  const getUsersAPI = useCallback(async () => {
    try {
      const res = await dispatch(getAllUserThunk(filterState)).unwrap();
      setUsers(res.users);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  }, [dispatch, filterState]);

  useEffect(() => {
    getUsersAPI();
  }, [getUsersAPI]);

  // ✅ Hàm xử lý khi bật/tắt switch
  const handleBanToggle = async (id: string, isBanned: boolean) => {
    try {
      await dispatch(toggleBanUserThunk({ id, isBanned })).unwrap();
      // Cập nhật trạng thái user sau khi ban/unban thành công
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isBanned } : user
        )
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái ban:", err);
    }
  };

  // Mobile-optimized columns
  const mobileUserColumns: TableColumn<IUser>[] = [
    {
      colName: "Người dùng",
      render: (record: IUser) => (
        <div className="py-2">
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500">{record.email}</div>
          <div className="flex items-center mt-1 text-xs">
            <span className="bg-gray-100 px-2 py-0.5 rounded mr-2">
              {record.role}
            </span>
            <span>{record.isVerified ? "✅" : "❌"}</span>
          </div>
        </div>
      ),
    },
    {
      colName: "Trạng thái",
      render: (record: IUser) => (
        <div className="flex justify-end">
          <Switch
            checked={record.isBanned}
            onCheckedChange={() =>
              handleBanToggle(record._id, !record.isBanned)
            }
          />
        </div>
      ),
    },
  ];

  // Desktop columns
  const desktopUserColumns: TableColumn<IUser>[] = [
    {
      colName: "Tên",
      render: (record: IUser) => <div className="text-sm">{record.name}</div>,
    },
    {
      colName: "Email",
      render: (record: IUser) => <div className="text-sm">{record.email}</div>,
    },
    {
      colName: "Vai trò",
      render: (record: IUser) => (
        <div className="text-sm text-center">{record.role}</div>
      ),
    },
    {
      colName: "Xác minh",
      render: (record: IUser) => (
        <div className="text-sm text-center">
          {record.isVerified ? "✅" : "❌"}
        </div>
      ),
    },
    {
      colName: "Loại da",
      render: (record: IUser) => (
        <div className="text-sm text-center">{record.skinType || "N/A"}</div>
      ),
    },
    {
      colName: "Địa chỉ",
      render: (record: IUser) =>
        record.address
          ? `${record.address.street}, ${record.address.city}, ${record.address.province}`
          : "N/A",
    },
    {
      colName: "Số điện thoại",
      render: (record: IUser) => (
        <div className="text-sm">{record.email || "N/A"}</div>
      ),
    },
    {
      colName: "Ngày tạo",
      render: (record: IUser) => (
        <div className="text-sm text-center">
          {new Date(record.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      colName: "Banned",
      render: (record: IUser) => (
        <Switch
          checked={record.isBanned}
          onCheckedChange={() => handleBanToggle(record._id, !record.isBanned)}
        />
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý người dùng</h1>

        {/* Mobile Filter Button */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader className="mb-4">
                <SheetTitle>Bộ lọc</SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Tên người dùng
                  </label>
                  <Input
                    name="name"
                    placeholder="Nhập tên người dùng"
                    value={inputFilterState.name || ""}
                    onChange={handleFilterChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Email
                  </label>
                  <Input
                    name="email"
                    placeholder="Nhập email"
                    value={inputFilterState.email || ""}
                    onChange={handleFilterChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Vai trò
                  </label>
                  <Select
                    value={inputFilterState.role || "--"}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="--">Tất cả</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Xác minh
                  </label>
                  <Select
                    value={
                      inputFilterState.isVerified !== undefined
                        ? String(inputFilterState.isVerified)
                        : "--"
                    }
                    onValueChange={(value) =>
                      handleSelectChange("isVerified", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trạng thái xác minh" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="--">Tất cả</SelectItem>
                      <SelectItem value="true">Đã xác minh</SelectItem>
                      <SelectItem value="false">Chưa xác minh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>

              <SheetClose className="absolute top-4 right-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex flex-wrap gap-3 mb-4 border-b border-gray-200 pb-4">
        <Input
          name="name"
          placeholder="Tên người dùng"
          value={inputFilterState.name || ""}
          onChange={handleFilterChange}
          className="w-[200px]"
        />
        <Input
          name="email"
          placeholder="Email"
          value={inputFilterState.email || ""}
          onChange={handleFilterChange}
          className="w-[200px]"
        />

        <Select
          value={inputFilterState.role || "--"}
          onValueChange={(value) => handleSelectChange("role", value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Chọn vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={
            inputFilterState.isVerified !== undefined
              ? String(inputFilterState.isVerified)
              : "--"
          }
          onValueChange={(value) => handleSelectChange("isVerified", value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Xác minh" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="true">Đã xác minh</SelectItem>
            <SelectItem value="false">Chưa xác minh</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Tìm kiếm
        </Button>

        <Button variant="outline" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </div>

      {/* Mobile Table */}
      <div className="sm:hidden">
        <CustomTable columns={mobileUserColumns} records={users} />
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <CustomTable columns={desktopUserColumns} records={users} />
      </div>
    </div>
  );
}
