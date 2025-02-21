import "@/app/globals.css";
import ProductCard from "@/components/common/productCard";
const fakeProducts = [
  {
    _id: "67b6e552c19c01781a7ccd1f",
    name: "Hydrating Face Cream",
    description: "A deeply hydrating cream for dry and sensitive skin.",
    brand: "GlowSkin",
    category: "Moisturizer",
    price: 29.99,
    stock: 50,
    skinType: ["dry", "sensitive"],
    ingredients: ["Hyaluronic Acid", "Ceramides"],
    rating: 4.5,
    reviews: 10,
    images: [
      "https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-skin1004-cho-da-nhay-cam-spf-50-50ml_img_385x385_622873_fit_center.jpg",
      "https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-skin1004-cho-da-nhay-cam-spf-50-50ml_img_385x385_622873_fit_center.jpg",
    ],
    isFeatured: false,
    isDeleted: false,
    createdAt: "2025-02-20T08:18:26.326Z",
    updatedAt: "2025-02-20T08:18:26.330Z",
  },
  {
    _id: "67b6e552c19c01781a7ccd20",
    name: "Brightening Serum",
    description: "A serum that helps brighten skin and even out skin tone.",
    brand: "LuxeSkin",
    category: "Serum",
    price: 49.99,
    stock: 30,
    skinType: ["all"],
    ingredients: ["Vitamin C", "Niacinamide"],
    rating: 4.8,
    reviews: 25,
    images: [
      "https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-skin1004-cho-da-nhay-cam-spf-50-50ml_img_385x385_622873_fit_center.jpg",
      "https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-skin1004-cho-da-nhay-cam-spf-50-50ml_img_385x385_622873_fit_center.jpg",
    ],
    isFeatured: true,
    isDeleted: false,
    createdAt: "2025-02-21T10:10:00.000Z",
    updatedAt: "2025-02-21T10:15:00.000Z",
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fakeProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
