import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/common/icon";
import { IProductCardProps } from "@/typings/product";
import Image from "next/image";
import { AddToCartButton } from "./addToCartButton";
import { Button } from "../ui/button";

export default function ProductCard({ product, onCompare }: IProductCardProps) {
  const productImage =
    product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : "/assets/pictures/image.png";

  return (
    <Card className="relative w-full max-w-xs border border-gray-200 rounded-lg shadow-md overflow-hidden hover:border-black hover:border-2 group">
      <div className="relative w-full h-64">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="rounded-t-lg object-cover"
          sizes="100%"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
          <Icon name="heart" className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Nút so sánh xuất hiện khi hover */}
      <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 transition-all duration-300 group-hover:right-2">
        <Button
          variant="outline"
          size="icon"
          className="p-3 bg-white shadow-lg rounded-md hover:bg-gray-200"
          onClick={() => onCompare && onCompare(product)}
          >
          <Icon name="compare" className="w-6 h-6 text-gray-700" />
        </Button>
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
