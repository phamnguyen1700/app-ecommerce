"use client";

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
      [name]: value || undefined,
    }));
  };

  const handleSearch = () => {
    setFilterState({
      ...inputFilterState,
      page: 1,
      limit: 10,
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
  }, [dispatch, getUsersAPI]);

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

  const userColumns: TableColumn<IUser>[] = [
    {
      colName: "Tên",
      render: (record: IUser) => (
        <div className="text-xs text-left">{record.name}</div>
      ),
    },
    {
      colName: "Email",
      render: (record: IUser) => (
        <div className="text-xs text-left">{record.email}</div>
      ),
    },
    {
      colName: "Vai trò",
      render: (record: IUser) => (
        <div className="text-xs text-center">{record.role}</div>
      ),
    },
    {
      colName: "Xác minh",
      render: (record: IUser) => (
        <div className="text-xs text-center">
          {record.isVerified ? "✅" : "❌"}
        </div>
      ),
    },
    {
      colName: "Loại da",
      render: (record: IUser) => (
        <div className="text-xs text-center">{record.skinType || "N/A"}</div>
      ),
    },
    {
      colName: "Địa chỉ",
      render: (record: IUser) =>
        record.address
          ? `${record.address.street},${record.address.district}, ${record.address.city}`
          : "N/A",
    },
    {
      colName: "Số điện thoại",
      render: (record: IUser) => (
        <div className="text-xs text-left">{record.email}</div>
      ),
    },
    {
      colName: "Ngày tạo",
      render: (record: IUser) => (
        <div className="text-xs text-center">
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý người dùng</h1>
      </div>

      <div className="flex gap-4 mb-4 border-b-2 border-gray-300 pb-4">
        <Input
          name="name"
          placeholder="Tên người dùng"
          onChange={handleFilterChange}
        />
        <Input name="email" placeholder="Email" onChange={handleFilterChange} />

        <Select onValueChange={(value) => handleSelectChange("role", value)}>
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

        <Select
          onValueChange={(value) => handleSelectChange("isVerified", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Xác minh" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="true">Đã xác minh</SelectItem>
            <SelectItem value="false">Chưa xác minh</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      <CustomTable columns={userColumns} records={users} />
    </div>
  );
}
