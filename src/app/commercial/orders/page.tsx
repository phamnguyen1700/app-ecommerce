"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/typings/order/order";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { confirmShippingThunk, getOrdersThunk } from "@/redux/thunks/Order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import CheckoutButton from "@/components/common/checkoutButton";
import Image from "next/image";
import { IProduct } from "@/typings/product";
import { getAllProductThunk } from "@/redux/thunks/Product";
import { formatMoney } from "@/hooks/formatMoney";

export default function OrdersPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [clientSecret, setClientSecret] = useState<string | null>(null); // Trạng thái thanh toán
  const dispatch = useDispatch<AppDispatch>();

  const getProductsAPI = useCallback(async () => {
    try {
      const res = await dispatch(getAllProductThunk()).unwrap();
      setProducts(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getProductsAPI();
  }, [getProductsAPI]);

  const getOrdersAPI = useCallback(async () => {
    try {
      const res = await dispatch(getOrdersThunk()).unwrap();
      setOrders(res.orders);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getOrdersAPI();
  }, [getOrdersAPI]);

  useEffect(() => {
    setClientSecret(null);
  }, [selectedOrder]);

  useEffect(() => {
    if (orders.length > 0 && !selectedOrder) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]); // eslint-disable-line

  const handleConfirmReceived = async (orderId: string) => {
    try {
      await dispatch(confirmShippingThunk(orderId)).unwrap();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Delivered" } : order
        )
      );
    } catch {
      return;
    }
  };

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
                  className={`px-2 py-1 w-[150px] inline-block text-center rounded font-semibold transition-all duration-300 ${
                    order.orderStatus === "Cancelled"
                      ? "bg-gray-300 text-gray-700"
                      : order.orderStatus === "Shipped"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-700 animate-pulse"
                      : order.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-700 animate-pulse"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
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
                onClick={() => handleConfirmReceived(order._id || "")}
                disabled={order.orderStatus !== "Shipped"}
              >
                Xác nhận đã nhận hàng
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
                {selectedOrder.items.map((item, idx) => {
                  const productDetails = products.find(
                    (p) => p._id === item.product
                  );
                  return (
                    <Card key={idx} className="mb-2 relative overflow-hidden">
                      <CardContent className="flex gap-4 items-center p-2">
                        {!productDetails ? (
                          <div className="flex-1 text-center text-gray-500">
                            <p>Sản phẩm không tồn tại hoặc đã bị xóa</p>
                          </div>
                        ) : (
                          <>
                            {/* Ảnh sản phẩm */}
                            <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded">
                              <Image
                                src={
                                  productDetails.images[0] ??
                                  "/assets/pictures/image.png"
                                }
                                alt={productDetails.name}
                                width={500}
                                height={300}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>

                            {/* Thông tin sản phẩm */}
                            <div className="flex-1 relative">
                              <div className="flex justify-between mb-14">
                                <div className="font-semibold uppercase text-sm">
                                  {productDetails.name}
                                </div>
                                <div className="font-bold text-sm ml-auto">
                                  {formatMoney(item.price)}
                                </div>
                              </div>

                              {/* Số lượng góc dưới phải */}
                              <span className="absolute bottom-0 right-0 text-xs text-gray-500">
                                Số lượng: {item.quantity}
                              </span>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="mb-2 flex justify-between items-center font-semibold">
                <div>Tổng</div>
                <p>{formatMoney(selectedOrder.totalAmount ?? 0)}</p>
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
