"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { AppDispatch } from "@/redux/store";
import { getProductThunk } from "@/redux/thunks/Product";
import { IProduct } from "@/typings/product";
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

export default function ManageProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10; // Giới hạn 10 sản phẩm mỗi trang

  const getProductAPI = useCallback(
    async (page: number) => {
      try {
        const res = await dispatch(getProductThunk({ page, limit: productsPerPage })).unwrap();
        setProducts(res.products);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    },
    [dispatch, productsPerPage] 
  );
  useEffect(() => {
    getProductAPI(currentPage);
  }, [currentPage, getProductAPI]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
    { colName: "Tên sản phẩm", render: (record: IProduct) => record.name },
    {
      colName: "Thương hiệu",
      render: (record: IProduct) => (
        <div className="text-xs text-center">{record.brand}</div>
      ),
    },
    {
      colName: "Danh mục",
      render: (record: IProduct) => (
        <div className="text-xs text-center">{record.category}</div>
      ),
    },
    {
      colName: "Giá",
      render: (record: IProduct) => (
        <div className="text-xs text-center">
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
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
        <Button>Thêm sản phẩm</Button>
      </div>

      <div>FILTER</div>

      
      <CustomTable columns={productColumns} records={products} />
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
