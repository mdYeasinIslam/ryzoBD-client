import { config } from "@/config";
import { getQueryString } from "@/lib/utils";

export const getCategories = async () => {
  const res = await fetch(config.API_BASE_URL + "/categories", {
    next: {
      revalidate: 60,
    },
  });
  const { data: { categories = [] } = {} } = await res.json();
  return categories;
};
export const getFeaturedProducts = async () => {
  const res = await fetch(
    config.API_BASE_URL + "/products?status=published&isFeatured=true",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await res.json();
  const { data: { products = [] } = {} } = data;
  // console.log("dataFeaturedProducts", data);
  return products;
};
export const getPopularProducts = async () => {
  const res = await fetch(config.API_BASE_URL + "/products/popular", {
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();
  const { data: { products = [] } = {} } = data;
  // console.log("dataFeaturedProducts", data);
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const res = await fetch(config.API_BASE_URL + `/products/${slug}`);
  const data = await res.json();
  const { data: { product = {} } = {} } = data;
  // console.log("dataProductBySlug", data);
  return product;
};
export const getProducts = async (query: { [key: string]: string } = {}) => {
  const queryString = getQueryString(query);
  // console.log("queryString-getProducts ->", queryString);
  const res = await fetch(config.API_BASE_URL + `/products?${queryString}`);
  const data = await res.json();
  const { data: { products = [] } = {}, pagination = {} } = data;
  // console.log("dataFeaturedProducts", data);
  return { products, pagination };
};

export const getPackages = async (
  query: { [key: string]: string } = {}
) => {
  const queryString = getQueryString(query);
  const res = await fetch(config.API_BASE_URL + `/packages?${queryString}`);
  const data = await res.json();
  const { data: { packages = [] } = {}, pagination = {} } = data;
  return { packages, pagination };
};

export const getPackageBySlug = async (slug: string) => {
  const res = await fetch(config.API_BASE_URL + `/packages/${slug}`);

  if (!res.ok) return null;

  const data = await res.json();
  const { data: { package: packageDocument = null } = {} } = data;
  return packageDocument;
};
