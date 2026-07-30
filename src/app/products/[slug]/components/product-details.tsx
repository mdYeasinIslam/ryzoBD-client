"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { productOffPercent } from "@/lib/utils";
import { addToCart } from "@/redux/features/cart/cart-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  CircleCheck,
  Clock,
  // CreditCard,
  // Heart,
  Minus,
  // Package,
  Plus,
  // RefreshCcw,
  // ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  price: number;
  salePrice: number;
  averageRating: number;
  totalReviews: number;
  id: string;
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
  sellUnit: string;
  // unit: string;
  // availableQuantity: number;
  shortDescription: string;
  tags: string[];
  featuredImage: string;
};

const ProductDetails = (props: Props) => {
  const {
    name,
    price,
    salePrice,
    // averageRating,
    categories,
    totalReviews,
    id,
    sellUnit,
    // availableQuantity,
    shortDescription,
    tags,
    featuredImage,
  } = props;
  const [quantity, setQuantity] = React.useState(1);
  const percentage = productOffPercent(price, salePrice);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: id,
        name,
        price: salePrice,
        featuredImage,
        quantity,
      })
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        {percentage && percentage > 0 ? (
          <Badge className="bg-yellow-400/20 text-yellow-700 text-sm px-3 py-1 rounded-full  hover:text-white">
            {percentage}% OFF
          </Badge>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-muted-foreground">{shortDescription}</p>
        {/* TODO: will implement review and average review showing feature later here */}
        {totalReviews > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {[...Array(2)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-gray-200"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              {totalReviews} Reviews
            </span>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-primary">৳ {salePrice}</span>
        {price > salePrice && (
          <span className="text-sm text-muted-foreground line-through">
            ${price}
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div>
          {/* TODO: Will add stoke later with the status is stock visible or not */}
          {/* <span className="font-medium text-gray-700">
            {availableQuantity}
            {unit} available
          </span> */}
          <div className="flex gap-3 mt-2">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              {sellUnit?.toLowerCase()}
            </Badge>
            {/* <Badge variant="outline" className="px-4 py-1.5 text-sm">
              500gm
            </Badge> */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-9 w-9 hover:bg-primary/40 border-2"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-9 w-9 hover:bg-primary/40 border-2"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 h-11 text-base font-semibold"
          >
            Add To Cart
          </Button>
          {/* <Button variant="outline" size="icon" className="h-11 w-11">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-11 w-11">
            <RefreshCcw className="h-5 w-5" />
          </Button> */}
        </div>
      </div>

      <div className="grid gap-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-6">
          {categories.length > 0 && (
            <div className="flex gap-2">
              <span className="font-medium">Category:</span>
              <span className="text-muted-foreground">
                {categories.map((category) => (
                  <Link
                    className="underline hover:text-primary transition-colors"
                    key={category._id}
                    href={`/products?category=${category.slug}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </span>
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex gap-2">
              <span className="font-medium">Type:</span>
              <span className="text-muted-foreground flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    className="underline hover:text-primary transition-colors"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          )}
          {/* TODO: will implement sku feature later */}
          {/* <div className="flex gap-2">
            <span className="font-medium">SKU:</span>
            <span className="text-muted-foreground">ROSH556</span>
          </div> */}
        </div>
      </div>

      {/* TODO: will implement this section with real content later */}
      <Card className="mt-4 bg-gray-50/50 border-none">
        <div className="grid gap-6 sm:grid-cols-2 p-6">
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-primary" />
            <div>
              <p className="font-medium">24/7 Customer Support</p>
              <p className="text-sm text-muted-foreground">
                We&apos;re here to help you anytime
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CircleCheck className="h-10 w-10 text-primary" />
            <div>
              <p className="font-medium">Top Quality Products</p>
              <p className="text-sm text-muted-foreground">
                We ensure the best quality for all our products
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Truck className="h-10 w-10 text-primary" />
            <div>
              <p className="font-medium">Fast and reliable shipping</p>
              <p className="text-sm text-muted-foreground">
                Delivered within 3-5 business days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Wallet className="h-10 w-10 text-primary" />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">
                Pay when you receive your order
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
