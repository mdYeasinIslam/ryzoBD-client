"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { Package } from "@/types";
import { productOffPercent } from "@/lib/utils";
import { addToCart } from "@/redux/features/cart/cart-slice";
import { useAppDispatch } from "@/redux/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function PackageDetails({
  packageData,
}: {
  packageData: Package;
}) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const discount = productOffPercent(packageData.price, packageData.salePrice);

  const addPackage = () => {
    dispatch(
      addToCart({
        _id: packageData._id,
        productType: "package",
        name: packageData.name,
        price: packageData.salePrice,
        featuredImage: packageData.featuredImage,
        quantity,
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge>Package</Badge>
          {discount !== null && discount > 0 && (
            <Badge className="bg-yellow-400/20 text-yellow-700 hover:text-white">
              {discount}% OFF
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{packageData.name}</h1>
        <p className="text-muted-foreground">{packageData.shortDescription}</p>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-primary">
          ৳ {packageData.salePrice}
        </span>
        {packageData.price > packageData.salePrice && (
          <span className="text-muted-foreground line-through">
            ৳ {packageData.price}
          </span>
        )}
      </div>

      <Badge variant="secondary">{packageData.sellUnit}</Badge>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 border-2"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 border-2"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full h-11 flex-1 font-semibold" onClick={addPackage}>
          <ShoppingBasket className="h-5 w-5" /> Add Package To Cart
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What&apos;s included</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {packageData.products.map((item) => (
            <Link
              key={item.product._id}
              href={`/products/${item.product.slug}`}
              className="flex items-center justify-between gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.product.featuredImage}
                  alt={item.product.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.product.sellUnit}
                  </p>
                </div>
              </div>
              <Badge variant="outline">× {item.quantity}</Badge>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
