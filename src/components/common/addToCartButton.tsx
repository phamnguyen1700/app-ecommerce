"use client";

import { Button } from "@/components/ui/button";
import Icon from "./icon";
import { IProduct } from "@/typings/product";
import { CART_STORAGE_KEY } from "@/constants/storageKey";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  product: IProduct;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

    const existingIndex = cart.findIndex((item: { product: string }) => item.product === product._id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Thêm mới sản phẩm thành công!");
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="flex items-center gap-2 bg-white text-black hover:border-2 hover:border-black hover:bg-white transition"
    >
      <Icon name="shoppingBasket" className="w-5 h-5" />
    </Button>
  );
};
