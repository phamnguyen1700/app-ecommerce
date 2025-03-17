interface ProductInfoProps {
    name: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
  }
  
  export default function ProductInfo({ name, description, brand, category, price, rating, reviews }: ProductInfoProps) {
    return (
      <div>
        {/* Tên sản phẩm */}
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
  
        {/* Đánh giá */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg">⭐ {rating}</span>
          <span className="ml-2 text-gray-500">({reviews} đánh giá)</span>
        </div>
  
        {/* Thương hiệu & danh mục */}
        <p className="text-black-600 mt-2">Thương hiệu: {brand}</p>
        <p className="text-black-600 mt-2">Danh mục: {category}</p>
  
        {/* Giá tiền */}
        <p className="text-2xl text-black-600 mt-4">${price.toFixed(2)}</p>
      </div>
    );
  }
  