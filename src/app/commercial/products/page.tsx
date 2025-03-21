"use client";

import "@/app/globals.css";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "@/components/common/productCard";
import { getProductThunk } from "@/redux/thunks/Product";
import type { AppDispatch } from "@/redux/store";
import type { IProduct, IProductFilter } from "@/typings/product";
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
import type { IBrand } from "@/typings/brand";
import { Filter, Search, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import CompareDialog from "@/components/common/compareDialog";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]); // Lưu danh sách brand
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined
  );

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
    }));

    // Count active filters for the badge
    let count = 0;
    if (filterParams.category && filterParams.category !== "--") count++;
    if (filterParams.brandName && filterParams.brandName !== "--") count++;
    if (filterParams.skinType && filterParams.skinType !== "--") count++;
    if (filterParams.minPrice || filterParams.maxPrice) count++;
    setActiveFilters(count);
  };

  const clearFilters = () => {
    setFilterParams({
      category: "",
      brandName: "",
      skinType: "",
      minPrice: "",
      maxPrice: "",
    });
    setActiveFilters(0);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, params]);

  useEffect(() => {
    getProductAPI();
    getbrandAPI();
  }, [dispatch, getProductAPI, getbrandAPI]);

  const handleCompare = (product: IProduct) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Sản phẩm</h1>

        {/* Mobile Filter Button */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
                {activeFilters > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader className="mb-4">
                <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 px-1">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Thương hiệu
                  </label>
                  <Select
                    value={filterParams.brandName}
                    onValueChange={(value) =>
                      updateFilterParams("brandName", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Danh mục
                  </label>
                  <Select
                    value={filterParams.category}
                    onValueChange={(value) =>
                      updateFilterParams("category", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Loại da
                  </label>
                  <Select
                    value={filterParams.skinType}
                    onValueChange={(value) =>
                      updateFilterParams("skinType", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Khoảng giá
                  </label>
                  <div className="px-2 py-4">
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
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleSearch();
                      const sheetClose = document.querySelector(
                        "[data-sheet-close]"
                      ) as HTMLElement;
                      if (sheetClose) sheetClose.click();
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Áp dụng
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>

              <SheetClose className="absolute top-4 right-4" data-sheet-close>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:block mb-6">
        <div className="flex flex-wrap gap-3 border-b-2 border-gray-200 py-4">
          <Select
            value={filterParams.brandName}
            onValueChange={(value) => updateFilterParams("brandName", value)}
          >
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[150px]">
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

          <div className="w-[300px] px-2">
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
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>

            <Button variant="outline" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      </div>

      {/* Active filters display for mobile */}
      {activeFilters > 0 && (
        <div className="sm:hidden mb-4 flex flex-wrap gap-2">
          {filterParams.brandName && filterParams.brandName !== "--" && (
            <div className="bg-gray-100 text-sm px-2 py-1 rounded-full">
              {filterParams.brandName}
            </div>
          )}
          {filterParams.category && filterParams.category !== "--" && (
            <div className="bg-gray-100 text-sm px-2 py-1 rounded-full">
              {filterParams.category}
            </div>
          )}
          {filterParams.skinType && filterParams.skinType !== "--" && (
            <div className="bg-gray-100 text-sm px-2 py-1 rounded-full">
              {filterParams.skinType}
            </div>
          )}
          {(filterParams.minPrice || filterParams.maxPrice) && (
            <div className="bg-gray-100 text-sm px-2 py-1 rounded-full">
              {Number(filterParams.minPrice).toLocaleString()} -{" "}
              {Number(filterParams.maxPrice).toLocaleString()} VNĐ
            </div>
          )}
        </div>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-md aspect-square mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onCompare={handleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">Không tìm thấy sản phẩm nào</div>
          <Button variant="outline" onClick={clearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      )}
      <CompareDialog
        product={selectedProduct}
        onReset={() => setSelectedProduct(undefined)}
      />
    </div>
  );
}
