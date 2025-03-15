"use client";

import "@/app/globals.css";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/common/productCard";
import { getAllProductThunk } from "@/redux/thunks/Product";
import { AppDispatch } from "@/redux/store";
import { IProduct } from "@/typings/product";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProductAPI = useCallback(async () => {
    try {
      const res = await dispatch(getAllProductThunk()).unwrap();
      setProducts(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },[dispatch]);

  useEffect(() => {
    getProductAPI();
  }, [dispatch, getProductAPI]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
