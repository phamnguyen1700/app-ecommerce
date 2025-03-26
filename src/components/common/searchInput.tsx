"use client";

import { Input } from "@/components/ui/input";
import Icons from "@/components/common/icon";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getProductThunk } from "@/redux/thunks/Product";
import { ISearchProduct } from "@/typings/product";

export function SearchInput() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState<ISearchProduct[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const keyword = inputValue.trim();

      if (keyword !== "") {
        dispatch(getProductThunk({ keyword }))
          .unwrap()
          .then((res) => {
            setProducts(res.products);
            setOpen(true);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setProducts([]);
            setOpen(false);
          });
      } else {
        setOpen(false);
        setProducts([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, dispatch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-[200px] sm:w-[250px] md:w-[300px]">
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="pl-3 pr-10 h-8 bg-gray-200 border rounded-none focus:outline-none"
          />
          <Icons
            name="search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-500"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0 z-[400]">
        <Command>
          <CommandEmpty>Không tìm thấy sản phẩm nào.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {products.map((product) => (
              <CommandItem
                key={product._id}
                onSelect={() => {
                  router.push(`/commercial/products/${product._id}`);
                  setOpen(false);
                }}
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  src={product.images[0] || "/assets/pictures/image.png"}
                  alt="/assets/pictures/image.png"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover rounded"
                  />
                <div className="flex flex-col">
                  <span className="text-xs font-light">{product.name}</span>
                  <span className="text-xs text-red-500">
                    {product.price.toLocaleString()}đ
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
