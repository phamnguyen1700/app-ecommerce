import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/common/icon";
import { IProduct } from "@/typings/product";
import Image from "next/image";
import { AddToCartButton } from "./addToCartButton";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/hooks/formatMoney";

interface IProductCardProps {
  product: IProduct;
  onCompare?: (product: IProduct) => void;
}

export default function ProductCard({ product, onCompare }: IProductCardProps) {
  const router = useRouter();
  const productImage =
    product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : "/assets/pictures/image.png";

  const handleCardClick = () => {
    router.push(`/commercial/products/${product._id}`);
  };

  return (
    <Card
      className="w-full max-w-xs border border-gray-200 rounded-lg shadow-md overflow-hidden hover:border-black hover:border-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-64">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="rounded-t-lg object-cover"
          sizes="100%"
        />

        <button
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking heart
            onCompare?.(product); // Truyền sản phẩm vào CompareDialog
          }}
        >
          <Icon name="compare" className="w-5 h-5 text-gray-700" />
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
          <p className="text-sm font-semibold">{formatMoney(product.price)}</p>
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
