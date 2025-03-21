"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { getProductThunk } from "@/redux/thunks/Product";
import { IProduct, IProductFilter } from "@/typings/product";
import { TableColumn } from "@/typings/table";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBrand } from "@/typings/brand";
import { getBrandThunk } from "@/redux/thunks/Brand";
import PriceSlider from "@/components/common/priceSlider";
import { Filter, Plus, Search, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function ManageProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]); // Lưu danh sách brand
  const [filterParams, setFilterParams] = useState({
    keyword: "",
    category: "",
    brandName: "",
    skinType: "",
    minPrice: "",
    maxPrice: "",
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    category: "",
    brandName: "",
    skinType: "",
    minPrice: "",
    maxPrice: "",
  });

  const [totalPages, setTotalPages] = useState(1);

  const updateFilterParams = <K extends keyof IProductFilter>(
    key: K,
    value: IProductFilter[K]
  ) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // Reset về trang 1 khi tìm kiếm
    }));
  };

  const clearFilters = () => {
    setFilterParams({
      keyword: "",
      category: "",
      brandName: "",
      skinType: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const getbrandAPI = useCallback(async () => {
    try {
      const res = await dispatch(getBrandThunk()).unwrap();
      setBrands(res.brands);
    } catch {
      console.error("Lỗi khi gọi API");
    }
  }, [dispatch]);

  const getProductAPI = useCallback(async () => {
    try {
      const res = await dispatch(
        getProductThunk({
          ...params,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
        })
      ).unwrap();
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  }, [dispatch, params]);

  useEffect(() => {
    getProductAPI();
    getbrandAPI();
  }, [getProductAPI, params.page, getbrandAPI]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setParams((prev) => ({
        ...prev,
        page,
      }));
    }
  };

  // Desktop columns
  const productColumns: TableColumn<IProduct>[] = [
    {
      colName: "Hình ảnh",
      render: (record: IProduct) => (
        <div className="max-w-50 max-h-50">
          {record.images.length > 0 ? (
            <Image
              src={record.images[0] || "/placeholder.svg"}
              alt={record.name}
              width={50}
              height={50}
              className="rounded-md"
            />
          ) : (
            "No Image"
          )}
        </div>
      ),
    },
    { colName: "Tên sản phẩm", render: (record: IProduct) => record.name },
    {
      colName: "Thương hiệu",
      render: (record: IProduct) => (
        <div className="text-sm text-center">{record.brand?.brandName}</div>
      ),
    },
    {
      colName: "Danh mục",
      render: (record: IProduct) => (
        <div className="text-sm text-center">{record.category}</div>
      ),
    },
    {
      colName: "Giá",
      render: (record: IProduct) => (
        <div className="text-sm text-center">
          {record.price.toLocaleString()} VNĐ
        </div>
      ),
    },
    {
      colName: "Số lượng",
      render: (record: IProduct) => (
        <div className="text-center">{record.stock}</div>
      ),
    },
    {
      colName: "Đánh giá",
      render: (record: IProduct) => (
        <div className="text-sm text-center">{record.rating} ⭐</div>
      ),
    },
    {
      colName: "Ngày tạo",
      render: (record: IProduct) => (
        <div className="text-sm text-center">
          {new Date(record.createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  // Mobile columns
  const mobileProductColumns: TableColumn<IProduct>[] = [
    {
      colName: "Sản phẩm",
      render: (record: IProduct) => (
        <div className="flex items-center gap-3 py-2">
          <div className="flex-shrink-0">
            {record.images.length > 0 ? (
              <Image
                src={record.images[0] || "/placeholder.svg"}
                alt={record.name}
                width={50}
                height={50}
                className="rounded-md"
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-gray-200 rounded-md flex items-center justify-center text-xs">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{record.name}</div>
            <div className="text-xs text-gray-500">
              {record.brand?.brandName}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded mr-2">
                {record.category}
              </span>
              <span className="text-xs">
                {record.price.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>

        <div className="flex gap-2">
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
                  <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                </SheetHeader>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Tìm kiếm
                    </label>
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={filterParams.keyword}
                      onChange={(e) =>
                        updateFilterParams("keyword", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Thương hiệu
                    </label>
                    <Select
                      value={filterParams.brandName}
                      onValueChange={(value) =>
                        updateFilterParams("brandName", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thương hiệu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="--">Tất cả</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand._id} value={brand.brandName}>
                            {brand.brandName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Danh mục
                    </label>
                    <Select
                      value={filterParams.category}
                      onValueChange={(value) =>
                        updateFilterParams("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="--">Tất cả</SelectItem>
                        <SelectItem value="Cleanser">Cleanser</SelectItem>
                        <SelectItem value="Moisturizer">Moisturizer</SelectItem>
                        <SelectItem value="Serum">Serum</SelectItem>
                        <SelectItem value="Sunscreen">Sunscreen</SelectItem>
                        <SelectItem value="Toner">Toner</SelectItem>
                        <SelectItem value="Mask">Mask</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Loại da
                    </label>
                    <Select
                      value={filterParams.skinType}
                      onValueChange={(value) =>
                        updateFilterParams("skinType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Loại da" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="--">Tất cả</SelectItem>
                        <SelectItem value="oily">Oily</SelectItem>
                        <SelectItem value="dry">Dry</SelectItem>
                        <SelectItem value="combination">Combination</SelectItem>
                        <SelectItem value="sensitive">Sensitive</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Khoảng giá
                    </label>
                    <div className="px-2 py-4">
                      <PriceSlider
                        minPrice={Number(filterParams.minPrice) || 0}
                        maxPrice={Number(filterParams.maxPrice) || 50000000}
                        minLimit={0}
                        maxLimit={50000000}
                        step={10000}
                        onChange={([min, max]) => {
                          updateFilterParams("minPrice", min.toString());
                          updateFilterParams("maxPrice", max.toString());
                        }}
                      />
                    </div>
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

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex flex-wrap gap-3 mb-4 border-b border-gray-200 pb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={filterParams.keyword}
          onChange={(e) => updateFilterParams("keyword", e.target.value)}
          className="w-[250px]"
        />

        <Select
          value={filterParams.brandName}
          onValueChange={(value) => updateFilterParams("brandName", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn thương hiệu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand._id} value={brand.brandName}>
                {brand.brandName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filterParams.category}
          onValueChange={(value) => updateFilterParams("category", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="Cleanser">Cleanser</SelectItem>
            <SelectItem value="Moisturizer">Moisturizer</SelectItem>
            <SelectItem value="Serum">Serum</SelectItem>
            <SelectItem value="Sunscreen">Sunscreen</SelectItem>
            <SelectItem value="Toner">Toner</SelectItem>
            <SelectItem value="Mask">Mask</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterParams.skinType}
          onValueChange={(value) => updateFilterParams("skinType", value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Loại da" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="oily">Oily</SelectItem>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="combination">Combination</SelectItem>
            <SelectItem value="sensitive">Sensitive</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-[300px] px-2">
          <PriceSlider
            minPrice={Number(filterParams.minPrice) || 0}
            maxPrice={Number(filterParams.maxPrice) || 50000000}
            minLimit={0}
            maxLimit={50000000}
            step={10000}
            onChange={([min, max]) => {
              updateFilterParams("minPrice", min.toString());
              updateFilterParams("maxPrice", max.toString());
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>

          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Xóa bộ lọc
          </Button>
        </div>
      </div>

      {/* Mobile Table */}
      <div className="sm:hidden">
        <CustomTable columns={mobileProductColumns} records={products} />
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <CustomTable columns={productColumns} records={products} />
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center sm:justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(params.page - 1)}
                disabled={params.page === 1}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else {
                const startPage = Math.max(1, params.page - 2);
                pageNumber = startPage + index;
                if (pageNumber > totalPages) return null;
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={params.page === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(params.page + 1)}
                disabled={params.page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
