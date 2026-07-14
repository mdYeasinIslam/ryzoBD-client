export type File = {
  url: string;
};

export type Product = {
  _id: string;
  name: string;
  featuredImage: string;
  sellUnit: string;
  price: number;
  salePrice: number;
  averageRating: number;
  category: string;
  slug: string;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};
