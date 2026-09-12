"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { Package } from "@/types";
import { productOffPercent } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  updateCartQuantity,
} from "@/redux/features/cart/cart-slice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PackageCard({ packageData }: { packageData: Package }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.products);
  const cartItem = cartItems.find(
    (item) =>
      item._id === packageData._id && item.productType === "package"
  );
  const discount = productOffPercent(packageData.price, packageData.salePrice);

  const updateQuantity = (quantity: number) => {
    dispatch(
      updateCartQuantity({
        _id: packageData._id,
        productType: "package",
        quantity,
      })
    );
  };

  const addPackage = () => {
    dispatch(
      addToCart({
        _id: packageData._id,
        productType: "package",
        name: packageData.name,
        price: packageData.salePrice,
        featuredImage: packageData.featuredImage,
      })
    );
  };

  return (
    <Card className="group h-full overflow-hidden rounded-xl border-primary shadow-none transition-all duration-300">
      <CardContent className="flex h-full flex-col justify-between p-0">
        <Link
          href={`/packages/${packageData.slug}`}
          className="relative flex aspect-square items-center justify-center overflow-hidden"
        >
          {discount !== null && discount > 0 && (
            <Badge className="absolute left-2 top-2 z-10">
              {discount}% OFF
            </Badge>
          )}
          <Image
            src={packageData.featuredImage}
            alt={packageData.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">Package</Badge>
            <span className="text-xs text-muted-foreground">
              {packageData.products?.length || 0} products
            </span>
          </div>
          <Link href={`/packages/${packageData.slug}`}>
            <h2 className="line-clamp-2 min-h-12 font-semibold hover:text-primary">
              {packageData.name}
            </h2>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {packageData.shortDescription}
          </p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-primary">
                {packageData.salePrice} ৳
              </span>
              {packageData.salePrice < packageData.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {packageData.price} ৳
                </span>
              )}
            </div>
            {cartItem ? (
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(-1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{cartItem.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button size="sm" className="rounded-full" onClick={addPackage}>
                <ShoppingBasket className="h-5 w-5" /> Add
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
