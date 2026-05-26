export interface Product {
  id: string | number;
  name: string;
  img: string;
  price: number | string;
  desc: string;
  [key: string]: unknown;
}

export interface Review {
  id: string | number;
  author_name: string;
  author: string;
  text: string;
  [key: string]: unknown;
}
