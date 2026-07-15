"use client";

import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateCartQuantity,
} from "@/redux/features/cart/cart-slice";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  featuredImage: string;
}

export const CartProductCard = ({
  item,
  updateQuantity,
  removeItem,
  className = "",
}: {
  item: CartItem;
  updateQuantity: (id: string, change: number) => void;
  removeItem: (id: string) => void;
  className?: string;
}) => {
  return (
    <div
      key={item?._id}
      className={cn(
        "flex items-center gap-4 py-6 border-b last:border-b-0",
        className
      )}
    >
      <div className="w-10 h-10 shrink-0 border bg-muted rounded-full overflow-hidden">
        <Image
          src={item?.featuredImage}
          alt={item?.name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full space-y-1">
        <div className="flex-1 space-y-1">
          <h3 className="font-medium">{item?.name}</h3>
          <p className="text-sm text-muted-foreground">
            Item Price {item?.price.toFixed(2)}৳
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <span className="font-medium [word-spacing:-0.25rem]">
            {(item?.price * item?.quantity).toFixed(2)} ৳
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              type="button"
              onClick={() => updateQuantity(item?._id, -1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item?.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              type="button"
              onClick={() => updateQuantity(item?._id, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              type="button"
              onClick={() => removeItem(item?._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CartSheet(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { isOpen, setIsOpen } = props;
  const products = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();

  const updateQuantity = (id: string, change: number) => {
    dispatch(updateCartQuantity({ _id: id, quantity: change }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const total = products.reduce(
    (sum, item) => sum + item?.price * item?.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="sticky top-0 z-20 bg-background px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Shopping Cart
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {products.map((item) => (
            <CartProductCard
              key={item?._id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingCart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-center">
                No items added in your cart. Please add product to your cart
                list.
              </p>
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className="sticky bottom-0 z-20 bg-background px-6 py-4 border-t">
            <Link onClick={() => setIsOpen(false)} href="/checkout">
              <Button className="w-full" size="lg">
                Proceed To Checkout
                <span className="[word-spacing:-0.25rem] font-bold">
                  {total.toFixed(2)} ৳
                </span>
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
