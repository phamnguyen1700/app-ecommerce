"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDispatch } from "@/redux/store";
import {
  cancelOrderThunk,
  createDeliveryThunk,
  getOrderAdminThunk,
  updateOrderStatusThunk,
} from "@/redux/thunks/Order";
import { IOrder, IOrderState, IOrderStatus } from "@/typings/order/order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DEFAULT_PARAMS: IOrderState = {
  page: 1,
  limit: 10,
  status: "Pending",
  search: undefined,
};

export default function ProductsPage() {
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
    // isPaid: undefined,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter({ ...inputFilter, search: e.target.value });
  };

  // const handleSelectChange = (value: string) => {
  //   setInputFilter({ ...inputFilter, isPaid: value === "all" ? undefined : value === "true" });
  // };

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      search: inputFilter.search || undefined,
      // isPaid: inputFilter.isPaid,
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

  const handleShipping = async (orderId: string) => {
    try {
      await dispatch(createDeliveryThunk(orderId)).unwrap();
      window.location.reload(); // Làm mới trang sau khi cập nhật trạng thái
    } catch {
    }
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

  const columns = [
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
          <span className="px-3 py-1 rounded text-center min-w-[140px] inline-block bg-gray-500 text-white cursor-not-allowed">
            Đã hủy
          </span>
        ) : (
          <span
            className={`px-3 py-1 rounded text-center min-w-[140px] inline-block transition-all duration-200 ${
              order.isPaid
                ? "bg-green-500 text-green-900 hover:bg-green-500 hover:text-white cursor-pointer"
                : "bg-red-500 text-red-900 hover:bg-red-500 hover:text-white cursor-pointer"
            }`}
            onMouseEnter={() => setHoveredOrder(order._id || null)}
            onMouseLeave={() => setHoveredOrder(null)}
            onClick={() => {
              if (order.isPaid) {
                if (order.orderStatus === "Processing") {
                  handleShipping(order._id || "");
                } else {
                  handleProcess(order._id || "", "Processing");
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản Lý Đơn Hàng</h1>

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
        <TabsList className="flex space-x-5 border-b-2 border-gray-300 pb-7 pt-2">
          {orderStatusTabs.map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className={`w-full px-4 py-2 rounded-md text-sm font-semibold ${
                params.status === status
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex gap-4 mb-4 border-b-2 border-gray-300 pb-2 pt-2">
          <Input
            name="search"
            placeholder="Tìm theo email"
            value={inputFilter.search}
            onChange={handleFilterChange}
          />

          {/* <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn trạng thái thanh toán" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="true">Đã thanh toán</SelectItem>
            <SelectItem value="false">Chưa thanh toán</SelectItem>
          </SelectContent>
        </Select> */}

          <Button onClick={handleSearch}>Tìm kiếm</Button>
        </div>

        {orderStatusTabs.map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <CustomTable columns={columns} records={orders} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
