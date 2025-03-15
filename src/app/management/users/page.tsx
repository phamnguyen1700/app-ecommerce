"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { IUser } from "@/typings/user";
import { TableColumn } from "@/typings/table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { getAllUserThunk } from "@/redux/thunks/User";

export default function ManageUserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsersAPI = useCallback(async () => {
    try {
      const res = await dispatch(getAllUserThunk()).unwrap();
      setUsers(res.users);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  }, [dispatch]); 

  useEffect(() => {
    getUsersAPI();
  }, [dispatch, getUsersAPI]);

  const userColumns: TableColumn<IUser>[] = [
    { colName: "Tên", render: (record: IUser) => record.name },
    { colName: "Email", render: (record: IUser) => record.email },
    { colName: "Vai trò", render: (record: IUser) => record.role },
    {
      colName: "Xác minh",
      render: (record: IUser) => (record.isVerified ? "✅" : "❌"),
    },
    {
      colName: "Loại da",
      render: (record: IUser) => record.skinType || "N/A",
    },
    {
      colName: "Địa chỉ",
      render: (record: IUser) =>
        `${record.address.street}, ${record.address.city}, ${record.address.province}`,
    },
    {
      colName: "Số điện thoại",
      render: (record: IUser) => record.address.phone,
    },
    {
      colName: "Ngày tạo",
      render: (record: IUser) =>
        new Date(record.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý người dùng</h1>
        <Button>Thêm người dùng</Button>
      </div>

      <div>FILTER</div>

      <CustomTable columns={userColumns} records={users} />
    </div>
  );
}