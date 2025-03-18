"use client";

import "@/app/globals.css";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/common/productCard";
import { getProductThunk } from "@/redux/thunks/Product";
import { AppDispatch } from "@/redux/store";
import { IProduct, IProductFilter } from "@/typings/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PriceSlider from "@/components/common/priceSlider";
import { Button } from "@/components/ui/button";
import { getBrandThunk } from "@/redux/thunks/Brand";
import { IBrand } from "@/typings/brand";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]); // Lưu danh sách brand

  const [filterParams, setFilterParams] = useState({
    category: "",
    brandName: "",
    skinType: "",
    minPrice: "",
    maxPrice: "",
  });
  const [params, setParams] = useState({
    category: "",
    brandName: "",
    skinType: "",
    minPrice: "",
    maxPrice: "",
  });

  const updateFilterParams = <K extends keyof IProductFilter>(
    key: K,
    value: IProductFilter[K]
  ) => {
    setFilterParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      page: 1, // Reset về trang 1 khi tìm kiếm
    }));
  };

  const getbrandAPI = useCallback(async () => {
    try {
      const res = await dispatch(getBrandThunk()).unwrap();
      setBrands(res.brands);
    } catch {
      console.error("Lỗi khi gọi API");
    }
  }, [dispatch]);

  const getProductAPI = useCallback(async () => {
    try {
      const res = await dispatch(
        getProductThunk({
          ...params,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
        })
      ).unwrap();
      setProducts(res.products);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  }, [dispatch, params]);

  useEffect(() => {
    getProductAPI();
    getbrandAPI();
  }, [dispatch, getProductAPI, getbrandAPI]);

  return (
    <div className="container mx-auto p-4">
      {/*  <ProductFilter  */}
      <div className="flex gap-4 mb-4 border-b-2 border-gray-200 py-4">
        <Select
          value={filterParams.brandName}
          onValueChange={(value) => updateFilterParams("brandName", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn thương hiệu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand._id} value={brand.brandName}>
                {brand.brandName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filterParams.category}
          onValueChange={(value) => updateFilterParams("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="Cleanser">Cleanser</SelectItem>
            <SelectItem value="Moisturizer">Moisturizer</SelectItem>
            <SelectItem value="Serum">Serum</SelectItem>
            <SelectItem value="Sunscreen">Sunscreen</SelectItem>
            <SelectItem value="Toner">Toner</SelectItem>
            <SelectItem value="Mask">Mask</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterParams.skinType}
          onValueChange={(value) => updateFilterParams("skinType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Loại da" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--">Tất cả</SelectItem>
            <SelectItem value="oily">Oily</SelectItem>
            <SelectItem value="dry">Dry</SelectItem>
            <SelectItem value="combination">Combination</SelectItem>
            <SelectItem value="sensitive">Sensitive</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>

        <PriceSlider
          minPrice={Number(filterParams.minPrice) || 0}
          maxPrice={Number(filterParams.maxPrice) || 50000000}
          minLimit={0}
          maxLimit={50000000}
          step={10000}
          onChange={([min, max]) => {
            updateFilterParams("minPrice", min.toString());
            updateFilterParams("maxPrice", max.toString());
          }}
        />

        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
