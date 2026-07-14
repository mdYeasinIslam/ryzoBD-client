"use client";

import { Button } from "../ui/button";
import { Minus, Plus, ShoppingBasket, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { productOffPercent } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  updateCartQuantity,
} from "@/redux/features/cart/cart-slice";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    _id,
    name,
    sellUnit,
    price,
    featuredImage,
    averageRating,
    salePrice,
    slug,
  } = product;
  const products = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        price: salePrice,
        featuredImage,
      })
    );
  };
  const cartProduct = products.find((product) => product._id === _id);
  return (
    <Card className="group h-full relative overflow-hidden rounded-xl border-primary shadow-none transition-all duration-300">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="relative h-52 flex justify-center items-center overflow-hidden">
          {salePrice < price && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
              {productOffPercent(price, salePrice)}% OFF
            </div>
          )}
          <Link
            href={`/products/${slug}`}
            className="relative w-full h-full flex justify-center items-center"
          >
            <Image
              src={featuredImage}
              alt={name}
              width={200}
              height={200}
              className="w-44 h-auto object-contain transition-transform duration-300 group-hover:scale-110 mx-auto"
            />
          </Link>
        </div>
        <div className="mt-4">
          <div className="text-sm border border-primary/50 inline-block px-1 rounded font-medium text-gray-500 mb-2">
            {sellUnit?.toLowerCase()}
          </div>
          <Link href={`/products/${slug}`}>
            <h3 className="font-semibold text-base mb-2 h-12 line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>
          {averageRating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < averageRating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                ({averageRating})
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1 flex gap-1">
            <div className="font-bold text-lg [word-spacing:-0.25rem] text-primary">
              {salePrice} ৳
            </div>
            {salePrice < price && (
              <div className="text-sm text-gray-500 [word-spacing:-0.25rem] line-through">
                {price} ৳
              </div>
            )}
          </div>
          {cartProduct ? (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  dispatch(updateCartQuantity({ _id, quantity: -1 }))
                }
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{cartProduct.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  dispatch(updateCartQuantity({ _id, quantity: 1 }))
                }
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="rounded-full hover:scale-105 transition-transform"
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingBasket className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
