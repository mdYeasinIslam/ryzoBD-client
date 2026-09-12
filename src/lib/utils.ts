/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function productOffPercent(price: number, salePrice: number) {
  if (!salePrice || !price) return null;
  return Math.round(((price - salePrice) / price) * 100);
}

export const getCart = () => {
  try {
    const cart =
      typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const parsedCart = cart ? JSON.parse(cart) : [];

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.map((item) => ({
      ...item,
      productType: item.productType === "package" ? "package" : "product",
    }));
  } catch {
    return [];
  }
};

export const getQueryString = (query: { [key: string]: any } = {}) => {
  if (Object.keys(query).length === 0) return "";
  return Object.entries(query)
    .map(([key, value]) => {
      if (value && typeof value === "object") {
        return Object.keys(value)
          .map((k) => {
            return `${key}[${k}]=${value[k]}`;
          })
          .join("&");
      }
      if (value) {
        return `${key}=${value}`;
      }
      return "";
    })
    .filter((value) => value !== "")
    .join("&");
};

export const setSearchParams = ({
  path,
  searchParams,
  params,
  removeParams,
}: {
  path?: string;
  searchParams: string;
  params: { [key: string]: string };
  removeParams?: string[];
}) => {
  // const newSearchParams = {
  //   ...params,
  //   [param]: value,
  // };
  // const searchParamsStr = getQueryString(newSearchParams);
  // console.log("search params str", searchParamsStr, newSearchParams);
  const urlParams = new URLSearchParams(searchParams);
  // console.log("params from utils", urlParams);
  if (Object.keys(params).length > 0) {
    // console.log("object keys", Object.keys(params));
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        // console.log("value", params[key]);
        urlParams.set(key, params[key]);
      } else {
        urlParams.delete(key);
      }
    });
  }
  if (removeParams) {
    removeParams.forEach((param) => {
      urlParams.delete(param);
    });
  }
  // console.log(urlParams.toString());
  return path ? `${path}?${urlParams.toString()}` : `?${urlParams.toString()}`;
};

export const removeSearchParams = ({
  searchParams,
  keys,
  path,
}: {
  path?: string;
  searchParams: string;
  keys: string[];
}) => {
  const urlParams = new URLSearchParams(searchParams);
  keys.forEach((key) => {
    urlParams.delete(key);
  });
  return path ? `${path}?${urlParams.toString()}` : `?${urlParams.toString()}`;
};

export const generateQueryParams = (filter: any): string => {
  let str: string = "";
  if (!filter) return str;
  const others = Object.keys(filter)
    .filter(
      (key) =>
        key !== "limit" &&
        key !== "page" &&
        key !== "search" &&
        key !== "sort" &&
        filter[key] !== "default" &&
        filter[key] !== "none" &&
        filter[key]
    )
    .map((key) => `${key}=${filter[key]}`)
    .join("&");

  if (others.length) str += `${others}`;
  if (filter.search) str += `&search=${filter.search}`;
  if (filter.limit) str += `&limit=${filter.limit}`;
  if (filter.page) str += `&page=${filter.page}`;
  if (filter.sort) {
    const sortString: string = filter.sort
      ?.filter(({ value }: any) => (value ? true : false))
      .map(({ value }: { value: string }) => value)
      .join(",");
    if (sortString) str += `&sort=${sortString}`;
  }
  return str;
};

export const formatDate = (
  ISODateString: string,
  formatAs = "dd MMM, yyyy"
) => {
  try {
    return format(new Date(ISODateString), formatAs);
  } catch {
    return null;
  }
};

export const formatTime = (
  ISODateString: string,
  time?: string,
  formatAs = "hh:mm a"
) => {
  try {
    if (!time) {
      return format(new Date(ISODateString), formatAs);
    }
    const [hours, minutes] = time.split(":");
    const date = new Date(ISODateString);
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return format(new Date(date), formatAs);
  } catch {
    return "N/A";
    // return "--:-- --";
  }
};

export const formatDateTime = (ISODateString: string) => {
  return `${formatDate(ISODateString)}, ${formatTime(ISODateString)}`;
};
