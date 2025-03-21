"use client";

import React from "react";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDispatch } from "@/redux/store";
import {
  cancelOrderThunk,
  getOrderAdminThunk,
  updateOrderStatusThunk,
} from "@/redux/thunks/Order";
import { IOrder, IOrderState, IOrderStatus } from "@/typings/order/order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Filter,
  Search,
  X,
  Calendar,
  ShoppingBag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const DEFAULT_PARAMS: IOrderState = {
  page: 1,
  limit: 10,
  status: "Pending",
  search: undefined,
};

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const orderStatusTabs = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [hoveredOrder, setHoveredOrder] = useState<string | null>(null);
  const [inputFilter, setInputFilter] = useState({
    search: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter({ ...inputFilter, search: e.target.value });
  };

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      search: inputFilter.search || undefined,
    }));
  };

  const handleProcess = (id: string, orderStatus: IOrderStatus) => {
    dispatch(updateOrderStatusThunk({ id, orderStatus }));
    window.location.reload();
  };

  const handleCancel = (id: string) => {
    dispatch(cancelOrderThunk({ id }));
    window.location.reload();
  };

  const handleShipping = () => {
    alert("Giao hàng thành công!");
  };

  const getOrdersAPI = useCallback(async () => {
    try {
      const res = await dispatch(getOrderAdminThunk(params)).unwrap();
      setOrders(res.orders);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, params]);

  useEffect(() => {
    getOrdersAPI();
  }, [getOrdersAPI]);

  // Desktop columns
  const desktopColumns = [
    {
      colName: "Mã Đơn Hàng",
      render: (order: IOrder) => (
        <div className="text-xs text-center">{order._id}</div>
      ),
    },
    {
      colName: "Khách Hàng",
      render: (order: IOrder) => (
        <div className="text-xs text-center">{order.user?.name || "N/A"}</div>
      ),
    },
    {
      colName: "Tổng Tiền",
      render: (order: IOrder) => (
        <div className="text-xs text-center">{`${order.totalAmount} VNĐ`}</div>
      ),
    },
    {
      colName: "Phương Thức",
      render: (order: IOrder) => (
        <div className="text-xs text-center">{order.paymentMethod}</div>
      ),
    },
    {
      colName: "Trạng Thái",
      render: (order: IOrder) => {
        return order.orderStatus === "Cancelled" ? (
          <span className="px-2 sm:px-3 py-1 rounded text-center min-w-[100px] sm:min-w-[140px] inline-block bg-gray-500 text-white cursor-not-allowed text-xs">
            Đã hủy
          </span>
        ) : (
          <span
            className={`px-2 sm:px-3 py-1 rounded text-center min-w-[100px] sm:min-w-[140px] inline-block transition-all duration-200 text-xs ${
              order.isPaid
                ? "bg-green-500 text-green-900 hover:bg-green-500 hover:text-white cursor-pointer"
                : "bg-red-500 text-red-900 hover:bg-red-500 hover:text-white cursor-pointer"
            }`}
            onMouseEnter={() => setHoveredOrder(order._id || null)}
            onMouseLeave={() => setHoveredOrder(null)}
            onClick={() => {
              if (order.isPaid) {
                if (order.orderStatus === "Processing") {
                  handleProcess(order._id || "", "Processing");
                } else {
                  handleShipping();
                }
              } else {
                handleCancel(order._id || "");
              }
            }}
          >
            {hoveredOrder === order._id
              ? order.isPaid
                ? order.orderStatus === "Processing"
                  ? "Giao hàng →"
                  : "Duyệt →"
                : "Hủy đơn →"
              : order.isPaid
              ? "Đã thanh toán"
              : "Chưa thanh toán"}
          </span>
        );
      },
    },
    {
      colName: "Ngày Đặt",
      render: (order: IOrder) => (
        <div className="text-xs text-center">
          {formatDateToDisplay(order.createdAt!)}
        </div>
      ),
    },
  ];

  // Mobile columns
  const mobileColumns = [
    {
      colName: "Đơn hàng",
      render: (order: IOrder) => (
        <div className="py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-medium truncate max-w-[120px]">
                {order._id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-xs">
                {formatDateToDisplay(order.createdAt!)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">
              {order.user?.name || "N/A"}
            </div>
            <div className="text-sm font-bold">{`${order.totalAmount} VNĐ`}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">{order.paymentMethod}</div>
            {order.orderStatus === "Cancelled" ? (
              <span className="px-2 py-1 rounded text-center inline-block bg-gray-500 text-white text-xs">
                Đã hủy
              </span>
            ) : (
              <div className="flex gap-2">
                {order.isPaid ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 text-xs h-8 px-2"
                    onClick={() => {
                      if (order.orderStatus === "Processing") {
                        handleProcess(order._id || "", "Processing");
                      } else {
                        handleShipping();
                      }
                    }}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {order.orderStatus === "Processing" ? "Giao hàng" : "Duyệt"}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50 text-xs h-8 px-2"
                    onClick={() => handleCancel(order._id || "")}
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Hủy đơn
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-3 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quản Lý Đơn Hàng</h1>

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
                <SheetTitle>Bộ lọc đơn hàng</SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Tìm kiếm
                  </label>
                  <Input
                    name="search"
                    placeholder="Tìm theo email"
                    value={inputFilter.search}
                    onChange={handleFilterChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Trạng thái
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {orderStatusTabs.map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        className={`text-xs ${
                          params.status === status ? "bg-black text-white" : ""
                        }`}
                        onClick={() =>
                          setParams({
                            ...params,
                            status: status as
                              | "Pending"
                              | "Processing"
                              | "Shipped"
                              | "Delivered"
                              | "Cancelled",
                          })
                        }
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Tìm kiếm
                </Button>
              </div>

              <SheetClose className="absolute top-4 right-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs
        value={params.status || "Pending"}
        onValueChange={(status) =>
          setParams({
            ...params,
            status: status as
              | "Pending"
              | "Processing"
              | "Shipped"
              | "Delivered"
              | "Cancelled",
          })
        }
      >
        {/* Desktop Tabs */}
        <div className="hidden sm:block overflow-x-auto pb-2">
          <TabsList className="flex space-x-2 sm:space-x-5 border-b-2 border-gray-300 pb-4 sm:pb-7 pt-2 w-max min-w-full">
            {orderStatusTabs.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  params.status === status
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Desktop Search */}
        <div className="hidden sm:flex gap-4 mb-4 border-b-2 border-gray-300 pb-4 pt-2">
          <Input
            name="search"
            placeholder="Tìm theo email"
            value={inputFilter.search}
            onChange={handleFilterChange}
            className="max-w-md"
          />

          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
        </div>

        {/* Mobile Status Indicator */}
        <div className="sm:hidden mb-4">
          <div className="text-sm font-medium text-gray-500">
            Trạng thái:{" "}
            <span className="font-bold text-black">{params.status}</span>
          </div>
        </div>

        {orderStatusTabs.map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            {/* Mobile Table */}
            <div className="sm:hidden">
              <CustomTable columns={mobileColumns} records={orders} />
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <CustomTable columns={desktopColumns} records={orders} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
