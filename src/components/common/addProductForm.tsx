"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addProductThunk } from "@/redux/thunks/Product";
import { getBrandThunk } from "@/redux/thunks/Brand";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddProductDialog({
  open,
  onClose,
}: AddProductDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [brands, setBrands] = useState<{ _id: string; brandName: string }[]>(
    []
  );
  const categories = [
    "Cleanser",
    "Moisturizer",
    "Serum",
    "Sunscreen",
    "Toner",
    "Mask",
  ];
  const skinTypes = ["oily", "dry", "combination", "sensitive", "all"];
  const ingredients = [
    "Hyaluronic Acid",
    "Vitamin E",
    "Retinol",
    "Niacinamide",
  ];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    skinType: "",
    ingredients: "",
    image: null as File | null,
  });
  useEffect(() => {
    if (open) {
      const fetchBrands = async () => {
        try {
          const res = await dispatch(getBrandThunk()).unwrap();
          setBrands(res.brands);
          console.log("BRANDS:", res.brands);
        } catch {
          console.error("Lỗi khi lấy danh sách thương hiệu");
        }
      };
      fetchBrands();
    }
  }, [dispatch, open]); // Chạy lại mỗi khi open thay đổi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("🖼 File selected:", file);
      setFormData((prev) => ({ ...prev, image: file })); // Lưu file vào state
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();

    // ✅ Đảm bảo `image` là File trước khi gửi
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    } else {
      console.error("⚠️ Lỗi: Image không phải là File", formData.image);
    }

    // ✅ Append các trường khác dưới dạng `string`
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image" && value !== null) {
        data.append(key, value.toString());
      }
    });

    console.log("📦 Payload gửi lên API:", Object.fromEntries(data.entries())); // Debug FormData

    try {
      await dispatch(addProductThunk(data)).unwrap();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            name="name"
            placeholder="Tên sản phẩm"
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="Mô tả"
            onChange={handleChange}
          />

          <Select onValueChange={(value) => handleSelectChange("brand", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn thương hiệu" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand._id} value={brand._id}>
                  {" "}
                  {/* ✅ Gửi _id thay vì brandName */}
                  {brand.brandName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="price"
            type="number"
            placeholder="Giá"
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Số lượng"
            onChange={handleChange}
          />

          <Select
            onValueChange={(value) => handleSelectChange("skinType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Loại da" />
            </SelectTrigger>
            <SelectContent>
              {skinTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleSelectChange("ingredients", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Thành phần" />
            </SelectTrigger>
            <SelectContent>
              {ingredients.map((ingredient) => (
                <SelectItem key={ingredient} value={ingredient}>
                  {ingredient}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
