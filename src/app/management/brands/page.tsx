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
import { Filter, Plus, Search, X, Edit, Trash, RefreshCw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

  const clearFilters = () => {
    setFilterParams({
      brandName: "",
      isDeleted: "",
    });
  };

  // 🟢 Tạo thương hiệu mới
  const handleCreateBrand = async () => {
    if (!newBrand) return;
    try {
      await dispatch(createBrandThunk(newBrand)).unwrap();
      fetchBrands();
      setNewBrand("");
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

  // Desktop columns
  const brandColumns: TableColumn<IBrand>[] = [
    {
      colName: "Tên thương hiệu",
      render: (record: IBrand) => (
        <div className="text-sm">{record.brandName}</div>
      ),
    },
    {
      colName: "Trạng thái",
      render: (record: IBrand) => (
        <div
          className={`text-center px-2 py-1 rounded text-xs inline-block ${
            record.isDeleted
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
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
            variant="outline"
            onClick={() =>
              setEditBrand({ id: record._id, name: record.brandName })
            }
          >
            <Edit className="h-4 w-4 mr-1" />
            Sửa
          </Button>
          {!record.isDeleted ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDeleteBrand(record._id)}
            >
              <Trash className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => handleReactiveBrand(record._id)}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Kích hoạt
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Mobile columns
  const mobileBrandColumns: TableColumn<IBrand>[] = [
    {
      colName: "Thương hiệu",
      render: (record: IBrand) => (
        <div className="py-2">
          <div className="font-medium">{record.brandName}</div>
          <div className="mt-1">
            <span
              className={`text-center px-2 py-1 rounded text-xs inline-block ${
                record.isDeleted
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {record.isDeleted ? "Bị xóa" : "Hoạt động"}
            </span>
          </div>
        </div>
      ),
    },
    {
      colName: "Hành động",
      render: (record: IBrand) => (
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() =>
              setEditBrand({ id: record._id, name: record.brandName })
            }
          >
            <Edit className="h-4 w-4 mr-1" />
            Sửa
          </Button>
          {!record.isDeleted ? (
            <Button
              size="sm"
              variant="destructive"
              className="w-full"
              onClick={() => handleDeleteBrand(record._id)}
            >
              <Trash className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => handleReactiveBrand(record._id)}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Kích hoạt
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý Thương Hiệu</h1>

        {/* Mobile Filter Button */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <SheetHeader className="mb-4">
                <SheetTitle>Bộ lọc thương hiệu</SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Tên thương hiệu
                  </label>
                  <Input
                    placeholder="Tìm kiếm thương hiệu..."
                    value={filterParams.brandName}
                    onChange={(e) =>
                      setFilterParams((prev) => ({
                        ...prev,
                        brandName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Trạng thái
                  </label>
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
          placeholder="Tìm kiếm thương hiệu..."
          value={filterParams.brandName}
          onChange={(e) =>
            setFilterParams((prev) => ({ ...prev, brandName: e.target.value }))
          }
          className="w-[250px]"
        />

        <Select
          value={filterParams.isDeleted}
          onValueChange={(value) =>
            setFilterParams((prev) => ({ ...prev, isDeleted: value }))
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="false">Hoạt động</SelectItem>
            <SelectItem value="true">Bị xóa</SelectItem>
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

      {/* Form tạo / cập nhật thương hiệu */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-medium mb-3">
          {editBrand ? "Cập nhật thương hiệu" : "Thêm thương hiệu mới"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {editBrand ? (
            <>
              <Input
                value={editBrand.name}
                onChange={(e) =>
                  setEditBrand({ ...editBrand, name: e.target.value })
                }
                placeholder="Nhập tên thương hiệu mới..."
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button onClick={handleUpdateBrand}>
                  <Edit className="h-4 w-4 mr-2" />
                  Lưu
                </Button>
                <Button variant="outline" onClick={() => setEditBrand(null)}>
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
              </div>
            </>
          ) : (
            <>
              <Input
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                placeholder="Nhập tên thương hiệu..."
                className="flex-1"
              />
              <Button onClick={handleCreateBrand}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Table */}
      <div className="sm:hidden">
        <CustomTable columns={mobileBrandColumns} records={brands} />
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <CustomTable columns={brandColumns} records={brands} />
      </div>
    </div>
  );
}
