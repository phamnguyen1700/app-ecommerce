"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IOrder } from "@/typings/order/order";
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getOrdersThunk } from "@/redux/thunks/Order";
import { formatDateToDisplay } from "@/utils/formatDateToDisplay";
import CheckoutButton from "@/components/common/checkoutButton";
import Image from "next/image";
import type { IProduct } from "@/typings/product";
import { getAllProductThunk } from "@/redux/thunks/Product";

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

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 md:px-6 flex flex-col md:flex-row gap-4">
      {/* Danh sách order (trái trên mobile, trái trên desktop) */}
      <div className="w-full md:w-1/2 lg:w-2/5">
        <h2 className="text-xl font-bold mb-4 md:hidden">Đơn hàng của bạn</h2>
        {orders.map((order) => (
          <Card
            key={order._id}
            className={`mb-4 hover:border-2 hover:border-black cursor-pointer ${
              selectedOrder?._id === order._id ? "border-black border-2" : ""
            }`}
            onClick={() => setSelectedOrder(order)}
          >
            <CardHeader className="p-3 md:p-4">
              <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto">
                  <strong className="text-sm">Mã đơn hàng:</strong>{" "}
                  <p className="text-sm font-extralight truncate max-w-[150px] sm:max-w-[200px]">
                    {order._id}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 w-full sm:w-[150px] text-sm inline-block text-center rounded font-semibold transition-all duration-300 ${
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
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4 pt-0 md:pt-0">
              <div className="mb-2 sm:mb-0 text-sm">
                <strong>Ngày đặt hàng:</strong>{" "}
                {order.createdAt ? formatDateToDisplay(order.createdAt) : "N/A"}
              </div>
              <Button
                className="bg-white border-2 border-black text-black hover:border-b-4 hover:border-r-4 hover:bg-white text-sm w-full sm:w-auto"
                variant="default"
              >
                Mua lại
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chi tiết order (phải trên mobile, phải trên desktop) */}
      {selectedOrder && (
        <div className="w-full md:w-1/2 lg:w-3/5">
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-lg md:text-xl">
                Chi tiết đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <div className="max-h-[300px] md:max-h-[400px] overflow-auto">
                {selectedOrder.items.map((item, idx) => {
                  const productDetails = products.find(
                    (p) => p._id === item.product
                  );
                  return (
                    <Card key={idx} className="mb-2 relative overflow-hidden">
                      <CardContent className="flex gap-2 md:gap-4 items-center p-2 md:p-3">
                        {!productDetails ? (
                          <div className="flex-1 text-center text-gray-500 text-sm">
                            <p>Sản phẩm không tồn tại hoặc đã bị xóa</p>
                          </div>
                        ) : (
                          <>
                            {/* Ảnh sản phẩm */}
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 flex-shrink-0 rounded">
                              <Image
                                src={
                                  productDetails.images[0] ??
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
                              <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-14">
                                <div className="font-semibold uppercase text-xs sm:text-sm">
                                  {productDetails.name}
                                </div>
                                <div className="font-bold text-xs sm:text-sm mt-1 sm:mt-0 sm:ml-auto">
                                  {item.price}
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
              <div className="mb-2 flex justify-between items-center font-semibold mt-4">
                <div>Tổng</div>
                <p>{selectedOrder.totalAmount}</p>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <div>Phương thức thanh toán</div>{" "}
                <p>{selectedOrder.paymentMethod}</p>
              </div>
              <CheckoutButton
                isPaid={selectedOrder.isPaid ?? false}
                orderId={selectedOrder._id!}
                clientSecret={clientSecret}
                setClientSecret={setClientSecret}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
