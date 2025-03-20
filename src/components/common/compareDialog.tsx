import { useState, useEffect, useCallback } from "react";
import { IProduct } from "@/typings/product";
import Icon from "@/components/common/icon";

interface CompareDialogProps {
  product?: IProduct;
  onReset: () => void;
}

export default function CompareDialog({
  product,
  onReset,
}: CompareDialogProps) {
  const [product1, setProduct1] = useState<IProduct | null>(null);
  const [product2, setProduct2] = useState<IProduct | null>(null);

  useEffect(() => {
    if (product) {
      // Đợi React render xong rồi reset
      setTimeout(() => {
        onReset();
      }, 0);
    }
  }, [product, onReset]);

  // Lấy dữ liệu từ Local Storage khi component mount
  useEffect(() => {
    const storedProduct1 = localStorage.getItem("compareProduct1");
    const storedProduct2 = localStorage.getItem("compareProduct2");

    if (storedProduct1) setProduct1(JSON.parse(storedProduct1));
    if (storedProduct2) setProduct2(JSON.parse(storedProduct2));
  }, []);

  // Cập nhật Local Storage mỗi khi thay đổi product1 hoặc product2
  useEffect(() => {
    if (product1) {
      localStorage.setItem("compareProduct1", JSON.stringify(product1));
    } else {
      localStorage.removeItem("compareProduct1");
    }
  }, [product1]);

  useEffect(() => {
    if (product2) {
      localStorage.setItem("compareProduct2", JSON.stringify(product2));
    } else {
      localStorage.removeItem("compareProduct2");
    }
  }, [product2]);

  const addProductToCompare = useCallback((newProduct: IProduct) => {
    if (product1 && product1._id === newProduct._id) {
      setProduct1(null);
      localStorage.removeItem("compareProduct1"); // Xóa khỏi Local Storage
    } else if (product2 && product2._id === newProduct._id) {
      setProduct2(null);
      localStorage.removeItem("compareProduct2"); // Xóa khỏi Local Storage
    } else if (!product1) {
      setProduct1(newProduct);
      localStorage.setItem("compareProduct1", JSON.stringify(newProduct)); // Cập nhật Local Storage
    } else if (!product2) {
      setProduct2(newProduct);
      localStorage.setItem("compareProduct2", JSON.stringify(newProduct)); // Cập nhật Local Storage
    } else {
      setProduct1(newProduct);
      localStorage.setItem("compareProduct1", JSON.stringify(newProduct)); // Cập nhật Local Storage
    }
  }, [product1, product2]);

  const removeProduct = (productId: string) => {
    if (product1 && product1._id === productId) {
      setProduct1(null);
    } else if (product2 && product2._id === productId) {
      setProduct2(null);
    }
  };

  // Tự động thêm sản phẩm nếu có sản phẩm được truyền vào
  useEffect(() => {
    if (product) {
      addProductToCompare(product);
    }
  }, [product, addProductToCompare]);

  if (!product1 && !product2) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white bg-opacity-40 shadow-lg rounded-lg border backdrop-blur-md p-3 w-fit">
      <h3 className="text-lg font-semibold text-center mb-3">
        Thông tin sản phẩm
      </h3>

      <div
        className={`grid ${
          product1 && product2 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {/* Sản phẩm 1 */}
        {product1 && (
          <div className="p-2 rounded-lg relative border-r border-gray-300">
            <button
              className="absolute top-[-10px] right-[-5px] text-gray-500 rounded-full p-1"
              onClick={() => removeProduct(product1._id)}
            >
              <Icon name="x" className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <p className="text-left">Tên:</p>
                <p className="text-right">{product1.name}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Thương hiệu:</p>
                <p className="text-right">
                  {product1.brand?.brandName || "Không có thương hiệu"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Danh mục:</p>
                <p className="text-right">{product1.category}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Loại da:</p>
                <p className="text-right">
                  {product1.skinType?.length
                    ? product1.skinType.join(", ")
                    : "Không xác định"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Thành phần:</p>
                <p className="text-right">
                  {product1.ingredients?.length
                    ? product1.ingredients.join(", ")
                    : "Không xác định"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Giá:</p>
                <p className="text-right">${product1.price}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Đánh giá:</p>
                <p className="text-right">{product1.rating}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sản phẩm 2 */}
        {product2 && (
          <div className="p-2 rounded-lg relative">
            <button
              className="absolute top-[-10px] right-[-5px] text-gray-500 rounded-full p-1"
              onClick={() => removeProduct(product2._id)}
            >
              <Icon name="x" className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <p className="text-left">Tên:</p>
                <p className="text-right">{product2.name}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Thương hiệu:</p>
                <p className="text-right">
                  {product2.brand?.brandName || "Không có thương hiệu"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Danh mục:</p>
                <p className="text-right">{product2.category}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Loại da:</p>
                <p className="text-right">
                  {product2.skinType?.length
                    ? product2.skinType.join(", ")
                    : "Không xác định"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Thành phần:</p>
                <p className="text-right">
                  {product2.ingredients?.length
                    ? product2.ingredients.join(", ")
                    : "Không xác định"}
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Giá:</p>
                <p className="text-right">${product2.price}</p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <p className="text-left">Đánh giá:</p>
                <p className="text-right">{product2.rating}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
