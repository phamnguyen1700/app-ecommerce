import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { IProductCardProps } from "@/typings/product";
import Image from "next/image";


export default function ProductCard({ product }: IProductCardProps) {
    return (
        <Card className="w-full max-w-sm border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
        <p className="text-sm text-gray-500">{product.brand}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <Icon name="star"></Icon>
          <span className="text-sm font-semibold">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
        </div>
        <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
        <Button className="mt-4 w-full">Add to Cart</Button>
      </CardContent>
    </Card>
    )
}