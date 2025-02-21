export interface IProduct {
  _id: string;
  name: string;
  description: string;
  brand: string;
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

//type của card
export interface IProductCardProps {
    product: IProduct;
  }
