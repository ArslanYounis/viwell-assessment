export interface IReviewType {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface IProductType {
  id: number;
  brand: string;
  category: string;
  thumbnail: string;
  tags: string[];
  title: string;
  description: string;
  price: number;
  rating: number;
  sku: string;
  stock: number;
  weight: number;
  reviews: IReviewType[];
}

export interface PagedProductApiResponse {
  limit: number;
  skip: number;
  total: number;
  products: IProductType[];
}
