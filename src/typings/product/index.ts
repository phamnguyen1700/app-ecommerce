import { IBrand } from "../brand";


export interface IProduct {
  _id: string;
  name: string;
  description: string;
  brand?: IBrand;
  category: string;
  price: number;
  stock: number;
  skinType: string[];
  ingredients: string[];
  rating: number;
  reviews: number;
  images: string[];
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCardProps {
  product: IProduct;
  onCompare?: (product: IProduct) => void; 
}

export interface IProductFilter {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  brandName?: string;
  skinType?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface IUpdateProduct {
  name: string;
  price: number;
}