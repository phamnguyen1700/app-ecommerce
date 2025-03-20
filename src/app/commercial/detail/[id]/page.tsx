"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByIdThunk,
  getAllProductThunk,
} from "@/redux/thunks/Product";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Heart, Share2, Star, Edit2, Trash2 } from "lucide-react";
import clsx from "clsx";
import { getCookie, setCookie } from "cookies-next";
import { AddToCartButton } from "@/components/common/addToCartButton";
import { IProduct } from "@/typings/product";
import {
  getFeedbacksByProductThunk,
  createFeedbackThunk,
  updateFeedbackThunk,
  deleteFeedbackThunk,
} from "@/redux/thunks/Feedback";
import { IFeedback } from "@/typings/feedback";
import { toast } from "react-toastify";

interface RecentlyViewedProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const [product, setProduct] = useState<IProduct>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>(
    []
  );
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>(
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("accessToken");
  const [feedbackState, setFeedbackState] = useState({
    rating: 0,
    comment: "",
    editingFeedback: null as IFeedback | null,
  });
  const feedbacks = useSelector(
    (state: RootState) => state.feedback.feedbacks || []
  );

  const getProductAPI = useCallback(
    async (id: string) => {
      try {
        const res = await dispatch(getProductByIdThunk(id)).unwrap();
        console.log("Product data:", res);
        setProduct(res); // ✅ Chỉ cập nhật khi có dữ liệu mới

        // Add to recently viewed
        const recentlyViewedCookie = getCookie("recentlyViewed");
        let recentlyViewedProducts: RecentlyViewedProduct[] =
          recentlyViewedCookie
            ? JSON.parse(recentlyViewedCookie as string)
            : [];

        const newProduct = {
          _id: res._id,
          name: res.name,
          price: res.price,
          image: res.images[0],
        };

        // Remove if already exists and add to front
        recentlyViewedProducts = recentlyViewedProducts.filter(
          (p) => p._id !== res._id
        );
        recentlyViewedProducts.unshift(newProduct);

        // Keep only last 4 products
        recentlyViewedProducts = recentlyViewedProducts.slice(0, 4);

        setCookie("recentlyViewed", JSON.stringify(recentlyViewedProducts));
        setRecentlyViewed(recentlyViewedProducts);

        // Get all products and filter for recommendations
        const allProductsRes = await dispatch(getAllProductThunk()).unwrap();
        console.log("All products:", allProductsRes);

        // Filter products with same category
        const filtered = allProductsRes.filter(
          (p: IProduct) =>
            p._id !== res._id && // Exclude current product
            p.category === res.category // Same category
        );

        // Limit to 4 recommendations
        setRecommendedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );
  const getFeedbackApi = useCallback(
    async (id: string) => {
      try {
        const feedbackRes = await dispatch(
          getFeedbacksByProductThunk(id)
        ).unwrap();
        console.log("Feedback data:", feedbackRes);
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  ); // ✅ Chỉ thay đổi khi `dispatch` thay đổi
  
  const getRecommendedProductApi = useCallback(async () => {
    try {
      const allProductsRes = await dispatch(getAllProductThunk()).unwrap();
      console.log("All products:", allProductsRes);

      if (!product) return; // ✅ Tránh lỗi nếu `product` chưa có dữ liệu

      // ✅ Sử dụng `product` từ state thay vì `res`
      const filtered = allProductsRes.filter(
        (p: IProduct) =>
          p._id !== product._id && p.category === product.category
      );

      setRecommendedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, product]); // ✅ Thêm `product` vào dependencies để tránh lỗi dữ liệu cũ

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("token", token);
    if (!token) {
      toast.error("Vui lòng đăng nhập để gửi đánh giá");
      return;
    }

    if (feedbackState.rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return;
    }

    try {
      if (feedbackState.editingFeedback) {
        await dispatch(
          updateFeedbackThunk({
            id: feedbackState.editingFeedback._id,
            data: {
              rating: feedbackState.rating,
              comment: feedbackState.comment,
            },
          })
        ).unwrap();
      } else {
        await dispatch(
          createFeedbackThunk({
            productId: productId as string,
            rating: feedbackState.rating,
            comment: feedbackState.comment,
          })
        ).unwrap();
        toast.success("Đã gửi đánh giá thành công");
      }

      setFeedbackState({ rating: 0, comment: "", editingFeedback: null });

      // Refresh feedbacks
      dispatch(getFeedbacksByProductThunk(productId as string));
    } catch {
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  const handleEditFeedback = (feedback: IFeedback) => {
    setFeedbackState({
      rating: feedback.rating,
      comment: feedback.comment || "",
      editingFeedback: feedback,
    });
  };

  const handleDeleteFeedback = async (feedback: IFeedback) => {
    if (!token) return;

    try {
      await dispatch(deleteFeedbackThunk(feedback._id)).unwrap();
      toast.success("Đã xóa đánh giá thành công");
      dispatch(getFeedbacksByProductThunk(productId as string));
    } catch {
      toast.error("Có lỗi xảy ra khi xóa đánh giá");
    }
  };
  useEffect(() => {
    if (productId) {
      getProductAPI(productId);
    }
  }, [productId, getProductAPI]); // ✅ Chỉ chạy khi `productId` thay đổi
  useEffect(() => {
    if (product) {
      getFeedbackApi(product._id);
      getRecommendedProductApi();
    }
  }, [product,getFeedbackApi, getRecommendedProductApi]); // ✅ Chỉ chạy khi `product` đã được cập nhật

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: product.category,
              href: `/category/${product.category.toLowerCase()}`,
            },
            { label: product.name, href: "#" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Product Images */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 && (
              <>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map(
                    (image, idx) =>
                      image && (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={clsx(
                            "relative aspect-square overflow-hidden rounded-lg",
                            selectedImage === idx
                              ? "ring-2 ring-black"
                              : "hover:opacity-75"
                          )}
                        >
                          <Image
                            src={image}
                            alt={`${product.name} ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      )
                  )}
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500 mt-1">{product.category}</p>
              </div>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="text-2xl font-bold">${product.price}</div>

            {/* Skin Type */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Suitable for Skin Types:</h3>
              <div className="flex flex-wrap gap-2">
                {product.skinType?.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Ingredients */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.ingredients?.map((ingredient, idx) => (
                  <li key={idx} className="text-gray-600">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="sticky bottom-0 bg-white pt-4">
              <AddToCartButton product={product} variant="detail" />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">

          {/* Review Form */}
          {user?.role !== "admin" && (
          <form
            onSubmit={handleSubmitFeedback}
            className="mb-8 bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="font-semibold mb-4">
              {feedbackState.editingFeedback
                ? "Chỉnh sửa đánh giá"
                : "Viết đánh giá"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Đánh giá</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFeedbackState((prev) => ({ ...prev, rating: star }))
                    }
                    className="focus:outline-none"
                  >
                    <Star
                      className={clsx(
                        "w-6 h-6",
                        star <= feedbackState.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nhận xét</label>
              <textarea
                value={feedbackState.comment}
                onChange={(e) =>
                  setFeedbackState((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {feedbackState.editingFeedback ? "Cập nhật" : "Gửi đánh giá"}
              </button>
              {feedbackState.editingFeedback && (
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackState({
                      rating: 0,
                      comment: "",
                      editingFeedback: null,
                    })
                  }
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
          )}
          {/* Reviews List */}
          <div className="mt-16">
  <h2 className="text-2xl font-bold mb-6">Reviews</h2>

  <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
    <div className="flex gap-4">
      {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
        feedbacks.map((feedback, index) => (
          <div
            key={feedback._id || `feedback-${index}`}
            className="bg-white p-6 rounded-lg shadow-sm flex-shrink-0 w-80"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {feedback.userId ? feedback.userId.name : "Ẩn danh"}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={clsx(
                          "w-4 h-4",
                          i < feedback.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{feedback.comment}</p>
                <span className="text-sm text-gray-500 mt-1 block">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </span>
              </div>

              {console.log("Feedback userId:", feedback.userId)}
              {console.log("Current user ID:", user?.id)}

              {user && user.role !== "admin" && feedback.userId?._id === user.id && (
                <div className="flex gap-2">
                  <button onClick={() => handleEditFeedback(feedback)} className="p-1 hover:bg-gray-100 rounded">
                    <Edit2 className="w-4 h-4 text-blue-500" />
                  </button>
                  <button onClick={() => handleDeleteFeedback(feedback)} className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
        </div>
      )}
    </div>
  </div>
</div>

        </div>

        {/* Recently Viewed Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <a
                key={item._id}
                href={`/commercial/detail/${item._id}`}
                className="group"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={item.image || "/assets/pictures/image.png"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500">${item.price}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Similar Products in {product.category}
            </h2>
          </div>

          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((item) => (
                <a
                  key={item._id}
                  href={`/commercial/detail/${item._id}`}
                  className="group"
                >
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={item.images[0] || "/assets/pictures/image.png"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">${item.price}</p>
                  {item.skinType && (
                    <div className="mt-1 text-sm text-gray-500">
                      Suitable for {item.skinType.join(", ")} skin
                    </div>
                  )}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No similar products found in {product.category}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
