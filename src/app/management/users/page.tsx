"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { IUser, IUserFilter } from "@/typings/user";
import { TableColumn } from "@/typings/table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { getAllUserThunk, toggleBanUserThunk } from "@/redux/thunks/User";
import { Switch } from "@/components/ui/switch";

export default function ManageUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [filterState, setFilterState] = useState<Partial<IUserFilter>>({
    page: 1,
    limit: 10,
    name: "",
    email: "",
    role: undefined,
    isVerified: undefined,
  });

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
          prevUsers.map((user) => (user._id === id ? { ...user, isBanned } : user))
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
      render: (record: IUser) => (
        <div>Trả cho t cái địa chỉ theo model address nha lộc</div>
      ),
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

      <div>FILTER</div>

      <CustomTable columns={userColumns} records={users} />
    </div>
  );
}
