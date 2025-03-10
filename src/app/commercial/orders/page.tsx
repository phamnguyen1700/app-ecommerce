"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/typings/order/order";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getOrdersThunk } from "@/redux/thunks/Order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import CheckoutButton from "@/components/common/checkoutButton";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Trạng thái thanh toán
  const dispatch = useDispatch<AppDispatch>();

  const getOrdersAPI = async () => {
    try {
      const res = await dispatch(getOrdersThunk()).unwrap();
      setOrders(res.orders);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrdersAPI();
  }, [dispatch]);

  useEffect(() => {
    setClientSecret(null);
  }, [selectedOrder]);

  return (
    <div className="container mx-auto py-8 flex gap-4">
      {/* Danh sách order (trái) */}
      <div className="w-1/2">
        {orders.map((order) => (
          <Card
            key={order._id}
            className={`mb-4 hover:border-2 hover:border-black cursor-pointer ${
              selectedOrder?._id === order._id ? "border-black border-2" : ""
            }`}
            onClick={() => setSelectedOrder(order)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex gap-2">
                  <strong>Mã đơn hàng:</strong>{" "}
                  <p className="text-lg font-extralight">{order._id}</p>
                </div>
                <span
                  className={`${
                    order.orderStatus === "Shipped"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  } px-2 py-1 rounded`}
                >
                  {order.orderStatus}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="mb-2">
                <strong>Ngày đặt hàng:</strong>{" "}
                {order.createdAt ? formatDateToDisplay(order.createdAt) : "N/A"}
              </div>
              <Button
                className="bg-white border-2 border-black text-black hover:border-b-4 hover:border-r-4 hover:bg-white"
                variant="default"
              >
                Mua lại
              </Button>
            </CardContent>
          </Card>
        ))}
        {/* Chi tiết order (phải) */}
      </div>
      {selectedOrder && (
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-auto">
                {selectedOrder.items.map((item, idx) => (
                  <Card key={idx} className="mb-2 relative overflow-hidden">
                    <CardContent className="flex gap-4 items-center p-2">
                      {/* Ảnh sản phẩm */}
                      <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded">
                        <img
                          src={item.image}
                          alt={item.product}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Thông tin sản phẩm */}
                      <div className="flex-1 relative">
                        <div className="flex justify-between mb-14">
                          <div className="font-semibold uppercase text-sm">
                            {item.product}
                          </div>
                          <div className="font-bold text-sm ml-auto">
                            {item.price}
                          </div>
                        </div>

                        {/* Số lượng góc dưới phải */}
                        <span className="absolute bottom-0 right-0 text-xs text-gray-500">
                          Số lượng: {item.quantity}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mb-2 flex justify-between items-center font-semibold">
                <div>Tổng</div>
                <p>{selectedOrder.totalAmount}</p>
              </div>
              <div className="mb-2 flex justify-between items-center">
                <div>Phương thức thanh toán</div>{" "}
                <p>{selectedOrder.paymentMethod}</p>
              </div>
              <CheckoutButton
                isPaid={selectedOrder.isPaid ?? false}
                orderId={selectedOrder._id!}
                clientSecret={clientSecret}
                setClientSecret={setClientSecret}
              />{" "}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
