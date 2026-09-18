"use client";
import Link from "next/link";
import { CartProductCard } from "@/components/common/cart-sheet";
import { PackageCartReview, usePackageCartReview } from "@/components/packages/cart-review";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateCartQuantity } from "@/redux/features/cart/cart-slice";
export default function CartPage() {
  const products = useAppSelector(s => s.cart.products);
  const dispatch = useAppDispatch();
  const review = usePackageCartReview();
  return <main className="container max-w-3xl mx-auto px-4 py-8 space-y-5">
    <h1 className="text-3xl font-bold">Your Cart</h1>
    <PackageCartReview review={review} />
    {products.map(item => <CartProductCard key={`${item.productType}:${item._id}`} item={item}
      updateQuantity={(_id, productType, quantity) => dispatch(updateCartQuantity({ _id, productType, quantity }))}
      removeItem={(_id, productType) => dispatch(removeFromCart({ _id, productType }))} />)}
    {!products.length ? <p>Your cart is empty. <Link href="/my-packages" className="underline">View My Packages</Link></p> : <>
      <p className="text-xl font-bold">Subtotal: ৳{products.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</p>
      {review.ready ? <Link className={buttonVariants()} href="/checkout">Proceed to Checkout</Link> : <p>Review your custom packages above before continuing.</p>}
    </>}
  </main>;
}
