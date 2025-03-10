"use client";

import "@/app/globals.css";
import CustomTable from "@/components/common/customTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDispatch } from "@/redux/store";
import { getOrderAdminThunk } from "@/redux/thunks/Order";
import { IOrder, IOrderState } from "@/typings/order/order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DEFAULT_PARAMS: IOrderState = {
  page: 1,
  limit: 10,
  status: undefined,
  search: undefined,
};

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const orderStatusTabs = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getOrdersAPI = async () => {
    try {
      const res = await dispatch(getOrderAdminThunk(params)).unwrap();
      setOrders(res.orders);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrdersAPI();
  }, [dispatch, params]);

  const columns = [
    { colName: "Mã Đơn Hàng", render: (order: IOrder) => order._id },
    {
      colName: "Khách Hàng",
      render: (order: IOrder) => order.user?.name || "N/A",
    },
    {
      colName: "Tổng Tiền",
      render: (order: IOrder) => `${order.totalAmount} VNĐ`,
    },
    { colName: "Phương Thức", render: (order: IOrder) => order.paymentMethod },
    {
      colName: "Trạng Thái",
      render: (order: IOrder) => (
        <span
          className={`px-2 py-1 rounded ${
            order.orderStatus === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : order.orderStatus === "Processing"
              ? "bg-blue-100 text-blue-700"
              : order.orderStatus === "Shipped"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.orderStatus}
        </span>
      ),
    },
    {
      colName: "Ngày Đặt",
      render: (order: IOrder) => formatDateToDisplay(order.createdAt!),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Quản Lý Đơn Hàng</h1>

      <Tabs
        value={params.status || "Pending"}
        onValueChange={(status) => setParams({ ...params, status })}
      >
        <TabsList className="flex space-x-4 border-b border-gray-200 pb-2">
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
        {orderStatusTabs.map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <CustomTable columns={columns} records={orders} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
