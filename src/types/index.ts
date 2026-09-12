export type File = {
  url: string;
};

export type Product = {
  _id: string;
  productType?: "product";
  name: string;
  featuredImage: string;
  sellUnit: string;
  price: number;
  salePrice: number;
  averageRating: number;
  category: string;
  slug: string;
};

export type PackageProduct = {
  product: Product & { status?: string };
  quantity: number;
};

export type Package = {
  _id: string;
  productType: "package";
  name: string;
  slug: string;
  sku?: string;
  featuredImage: string;
  gallery?: string[];
  products: PackageProduct[];
  categories: Category[];
  unit: string;
  sellUnit: string;
  price: number;
  salePrice: number;
  shortDescription: string;
  description: string;
  tags?: string[];
  isFeatured?: boolean;
  status: string;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};
