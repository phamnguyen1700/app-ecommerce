"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import {
  getProductThunk,
  reactivateProductThunk,
  softDeleteProductThunk,
  updateProductThunk,
} from "@/redux/thunks/Product";
import { IProduct, IProductFilter, IUpdateProduct } from "@/typings/product";
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
import AddProductDialog from "@/components/common/addProductForm";
import { toast } from "react-toastify";

export default function ManageProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]); // Lưu danh sách brand
  const [editingProducts, setEditingProducts] = useState<{
    [key: string]: Partial<IProduct>;
  }>({});
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

  const handleSoftDelete = async (productId: string) => {
    try {
      await dispatch(softDeleteProductThunk(productId)).unwrap();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, isDeleted: true } : product
        )
      );
    } catch {
      return;
    }
  };

  const handleReactivate = async (productId: string) => {
    try {
      await dispatch(reactivateProductThunk(productId)).unwrap();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, isDeleted: false } : product
        )
      );
    } catch {
      return;
    }
  };

  const handleEditChange = <K extends keyof IProduct>(
    productId: string,
    key: K,
    value: IProduct[K]
  ) => {  
    setEditingProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value,
      },
    }));
  };

  const handleUpdateProduct = async (productId: string) => {
    try {
      const updatedData = editingProducts[productId];

      // Chỉ lấy name và price nếu chúng tồn tại
      const updatePayload: Partial<IUpdateProduct> = {};

      if (updatedData.name !== undefined) {
        updatePayload.name = updatedData.name;
      }

      if (updatedData.price !== undefined) {
        updatePayload.price = updatedData.price;
      }

      if (Object.keys(updatePayload).length === 0) {
        toast.warn("Không có thay đổi nào để cập nhật!");
        return;
      }

      await dispatch(
        updateProductThunk({ productId, data: updatePayload as IUpdateProduct })
      ).unwrap();

      setEditingProducts((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });

      toast.success("Sản phẩm đã được cập nhật!");
      getProductAPI(); // Load lại danh sách sản phẩm
    } catch {
      toast.error("Cập nhật sản phẩm thất bại!");
    }
  };

  const productColumns: TableColumn<IProduct>[] = [
    {
      colName: "Hình ảnh",
      render: (record: IProduct) => (
        <div className="max-w-50 max-h-50">
          {record.images.length > 0 ? (
            <Image
              src={record.images[0]}
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
    {
      colName: "Tên sản phẩm",
      render: (record: IProduct) => (
        <Input
          type="text"
          value={editingProducts[record._id]?.name ?? record.name}
          onChange={(e) => handleEditChange(record._id, "name", e.target.value)}
        />
      ),
    },
    {
      colName: "Thương hiệu",
      render: (record: IProduct) => (
        <div className="text-xs text-center">{record.brand?.brandName}</div>
      ),
    },
    {
      colName: "Danh mục",
      render: (record: IProduct) => (
        <div className="text-xs text-center">{record.category}</div>
      ),
    },
    {
      colName: "Giá (VNĐ)",
      render: (record: IProduct) => (
        <Input
          type="number"
          value={editingProducts[record._id]?.price ?? record.price}
          onChange={(e) =>
            handleEditChange(record._id, "price", parseFloat(e.target.value))
          }
        />
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
        <div className="text-xs text-center">{record.rating} ⭐</div>
      ),
    },
    {
      colName: "Ngày tạo",
      render: (record: IProduct) => (
        <div className="text-xs text-center">
          {new Date(record.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      colName: "Hành động",
      render: (record: IProduct) => (
        <div className="flex gap-2 justify-center">
          {!record.isDeleted ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleSoftDelete(record._id)}
            >
              Xóa
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleReactivate(record._id)}
            >
              Khôi Phục
            </Button>
          )}
          <>
            {editingProducts[record._id] && (
              <Button size="sm" onClick={() => handleUpdateProduct(record._id)}>
                Cập Nhật
              </Button>
            )}
          </>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
        <Button onClick={() => setOpenAddDialog(true)}>Thêm sản phẩm</Button>
      </div>

      {/*  <ProductFilter  */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={filterParams.keyword}
          onChange={(e) => updateFilterParams("keyword", e.target.value)}
        />

        <Select
          value={filterParams.brandName}
          onValueChange={(value) => updateFilterParams("brandName", value)}
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

        <Select
          value={filterParams.category}
          onValueChange={(value) => updateFilterParams("category", value)}
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

        <Select
          value={filterParams.skinType}
          onValueChange={(value) => updateFilterParams("skinType", value)}
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

        <PriceSlider
          minPrice={Number(filterParams.minPrice) || 0}
          maxPrice={Number(filterParams.maxPrice) || 2000000}
          minLimit={0}
          maxLimit={2000000}
          step={10000}
          onChange={([min, max]) => {
            updateFilterParams("minPrice", min.toString());
            updateFilterParams("maxPrice", max.toString());
          }}
        />

        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      <CustomTable columns={productColumns} records={products} />

      {/* Pagination */}
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(params.page - 1)}
              disabled={params.page === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={params.page === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(params.page + 1)}
              disabled={params.page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <AddProductDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </div>
  );
}
