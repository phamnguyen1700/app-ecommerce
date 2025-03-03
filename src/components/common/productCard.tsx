import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/common/icon";
import { IProductCardProps } from "@/typings/product";
import Image from "next/image";
import { AddToCartButton } from "./addToCartButton";

export default function ProductCard({ product }: IProductCardProps) {
  const productImage =
    product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : "/assets/image.pnj";

  return (
    <Card className="w-full max-w-xs border border-gray-200 rounded-lg shadow-md overflow-hidden hover:border-black hover:border-2">
      <div className="relative w-full h-64">
        <Image
          src={productImage}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
          <Icon name="heart" className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-light line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Icon name="star" className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-light">{product.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}
