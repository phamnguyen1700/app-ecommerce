"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { IBrand, IBrandFilter } from "@/typings/brand";
import { TableColumn } from "@/typings/table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createBrandThunk,
  updateBrandThunk,
  deleteBrandThunk,
  reactiveBrandThunk,
  manageBrandThunk,
} from "@/redux/thunks/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageBrandPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [newBrand, setNewBrand] = useState("");
  const [editBrand, setEditBrand] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // 🟢 Bộ lọc người dùng nhập
  const [filterParams, setFilterParams] = useState<IBrandFilter>({
    brandName: "",
    isDeleted: "",
  });

  // 🟢 Params thực tế được gửi khi tìm kiếm
  const [params, setParams] = useState<IBrandFilter>({
    page: 1,
    limit: 20,
    brandName: "",
  });

  // 🟢 Lấy danh sách thương hiệu từ API
  const fetchBrands = useCallback(async () => {
    try {
      const result = await dispatch(manageBrandThunk(params)).unwrap();
      setBrands(result.brands);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", err);
    }
  }, [dispatch, params]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // 🟢 Xử lý khi bấm tìm kiếm
  const handleSearch = () => {
    setParams({ ...filterParams });
  };

  // 🟢 Tạo thương hiệu mới
  const handleCreateBrand = async () => {
    if (!newBrand) return;
    try {
      await dispatch(createBrandThunk(newBrand)).unwrap();
      fetchBrands();
    } catch (err) {
      console.error("Lỗi khi tạo thương hiệu:", err);
    }
  };

  // 🟢 Cập nhật thương hiệu
  const handleUpdateBrand = async () => {
    if (!editBrand) return;
    try {
      await dispatch(
        updateBrandThunk({ brandId: editBrand.id, brandName: editBrand.name })
      ).unwrap();
      setEditBrand(null);
      fetchBrands();
    } catch (err) {
      console.error("Lỗi khi cập nhật thương hiệu:", err);
    }
  };

  // 🟢 Xóa thương hiệu
  const handleDeleteBrand = async (brandId: string) => {
    try {
      await dispatch(deleteBrandThunk(brandId)).unwrap();
      fetchBrands();
    } catch (err) {
      console.error("Lỗi khi xóa thương hiệu:", err);
    }
  };

  // 🟢 Kích hoạt lại thương hiệu
  const handleReactiveBrand = async (brandId: string) => {
    try {
      await dispatch(reactiveBrandThunk(brandId)).unwrap();
      fetchBrands();
    } catch (err) {
      console.error("Lỗi khi kích hoạt lại thương hiệu:", err);
    }
  };

  // 🟢 Cột bảng hiển thị thương hiệu
  const brandColumns: TableColumn<IBrand>[] = [
    {
      colName: "Tên thương hiệu",
      render: (record: IBrand) => (
        <div className="text-left">{record.brandName}</div>
      ),
    },
    {
      colName: "Trạng thái",
      render: (record: IBrand) => (
        <div
          className={`text-center ${
            record.isDeleted ? "text-red-500" : "text-green-500"
          }`}
        >
          {record.isDeleted ? "Bị xóa" : "Hoạt động"}
        </div>
      ),
    },
    {
      colName: "Hành động",
      render: (record: IBrand) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              setEditBrand({ id: record._id, name: record.brandName })
            }
          >
            Sửa
          </Button>
          {!record.isDeleted ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteBrand(record._id)}
            >
              Xóa
            </Button>
          ) : (
            <Button size="sm" onClick={() => handleReactiveBrand(record._id)}>
              Kích hoạt lại
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quản lý Thương Hiệu</h1>

      {/* 🟢 Thanh tìm kiếm */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Tìm kiếm thương hiệu..."
          value={filterParams.brandName}
          onChange={(e) =>
            setFilterParams((prev) => ({ ...prev, brandName: e.target.value }))
          }
        />

        <Select
          value={filterParams.isDeleted}
          onValueChange={(value) =>
            setFilterParams((prev) => ({ ...prev, isDeleted: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="false">Hoạt động</SelectItem>
            <SelectItem value="true">Bị xóa</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      {/* 🟢 Form tạo / cập nhật thương hiệu */}
      <div className="flex gap-4 mb-4">
        {editBrand ? (
          <>
            <Input
              value={editBrand.name}
              onChange={(e) =>
                setEditBrand({ ...editBrand, name: e.target.value })
              }
              placeholder="Nhập tên thương hiệu mới..."
            />
            <Button onClick={handleUpdateBrand}>Lưu</Button>
            <Button variant="destructive" onClick={() => setEditBrand(null)}>
              Hủy
            </Button>
          </>
        ) : (
          <>
            <Input
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="Nhập tên thương hiệu..."
            />
            <Button onClick={handleCreateBrand}>Thêm</Button>
          </>
        )}
      </div>

      {/* 🟢 Bảng danh sách thương hiệu */}
      <CustomTable columns={brandColumns} records={brands} />
    </div>
  );
}
