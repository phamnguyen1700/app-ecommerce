import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { IProductCardProps } from "@/typings/product";
import Image from "next/image";

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <Card className="w-full max-w-xs border border-gray-200 rounded-lg shadow-md overflow-hidden hover:border-black hover:border-2">
      {/* Hình ảnh sản phẩm */}
      <div className="relative w-full h-64">
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />

        {/* Nút trái tim (Yêu thích) */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
          <Icon name="heart" className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Nội dung */}
      <CardContent className="p-4">
        {/* Hàng 1: Tên sản phẩm + Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-md font-light line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Icon name="star" className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-light">{product.rating}</span>
          </div>
        </div>

        {/* Hàng 2: Giá tiền + Nút giỏ hàng */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
          <Button className="flex items-center gap-2 bg-slate-200 text-black hover:border-4 hover:border-b-black hover:border-r-black hover:bg-bg-slate-200 transition">
            <Icon name="shoppingBasket" className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
