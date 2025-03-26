"use client";

import React, { useEffect, useState } from "react";
import { redeemCouponThunk } from "@/redux/thunks/Coupon";
import { ICoupon } from "@/typings/coupon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { getUserService } from "@/redux/services/User";
import { IUser } from "@/typings/user";

const COUPONS: ICoupon[] = [
  { points: 50, discount: 10 },
  { points: 100, discount: 25 },
  { points: 150, discount: 40 },
];

export default function CouponList() {
  const dispatch = useDispatch<AppDispatch>();
  const [userPoints, setUserPoints] = useState<number>(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return; // Không có user thì không gọi API

    getUserService()
      .then((res: IUser) => {
        setUserPoints(res.points);
      })
      .catch((error: unknown) => console.error("Failed to fetch user:", error));
  }, [shouldRefetch]);

  const handleRedeem = async (coupon: ICoupon) => {
    if (userPoints < coupon.points) {
      toast("Không đủ điểm để đổi coupon này");
      return;
    }

    const result = await dispatch(redeemCouponThunk(coupon)).unwrap();
    if (result) {
      toast(`Đổi thành công coupon giảm ${coupon.discount}%`);
      setShouldRefetch((prev) => !prev); // 👈 Kích hoạt useEffect chạy lại
    } else {
      toast("Đổi coupon thất bại");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">
        Số điểm hiện tại: <span className="text-blue-600">{userPoints}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {COUPONS.map((coupon, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>Giảm {coupon.discount}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cần {coupon.points} điểm
              </p>
              <Button
                disabled={userPoints < coupon.points}
                onClick={() => handleRedeem(coupon)}
              >
                Đổi ngay
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
