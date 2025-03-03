"use client";

import { useEffect, useState } from "react";
import { CART_STORAGE_KEY } from "@/constants/storageKey";
import { Button } from "@/components/ui/button";
import {
  Drawer as SideDrawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/common/sideDrawer";
import Icon from "@/components/common/icon";
import Image from "next/image";

interface CartItem {
  product: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function ViewCartButton() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const updateCart = () => {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    setCart(storedCart);
  };

  useEffect(() => {
    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product !== productId);
    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));

  };

  const handleQuantityChange = (productId: string, change: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCart(updatedCart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

  };

  return (
    <SideDrawer direction="right">
      <DrawerTrigger asChild>
        <div className="relative cursor-pointer">
          <Icon name="shoppingBag" className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cart.length}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-72 p-4">
        <h3 className="text-lg text-center">Your Cart</h3>
        {cart.length === 0 ? (
          <div className="text-center py-6 text-lg font-semibold">
            YOUR CART IS EMPTY
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {cart.map((item) => (
              <div
                key={item.product}
                className="flex items-center gap-4 border-b pb-2"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>{" "}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">{item.name}</p>
                    <button
                      onClick={() => handleRemoveItem(item.product)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <Icon name="trash" className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="w-6 h-6 p-0 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.product, -1)}
                      >
                        -
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        className="w-6 h-6 p-0 flex items-center justify-center"
                        onClick={() => handleQuantityChange(item.product, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Checkout
            </Button>
          </div>
        )}
      </DrawerContent>
    </SideDrawer>
  );
}
