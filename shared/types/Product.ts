export interface iProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: iRating;
  orderCount: number;
}

export interface iRating {
  rate: number;
  count: number;
}
