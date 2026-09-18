"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { packageCartItem, useReviewPackagesQuery } from "@/redux/features/packages/packages-api";
import { refreshCartPackage, removeFromCart } from "@/redux/features/cart/cart-slice";
import { Button } from "@/components/ui/button";
export function usePackageCartReview(active = true) {
  const items = useAppSelector(s => s.cart.products).filter(i => i.ownerId);
  const owner = useAppSelector(s => s.auth.user._id) || "";
  const ids = items.map(i => i._id);
  const result = useReviewPackagesQuery({ ids, owner }, {
    skip: !active || !owner || !ids.length,
    refetchOnMountOrArgChange: true, pollingInterval: active ? 15000 : 0,
  });
  const ready = !items.length || Boolean(owner && !result.isFetching && !result.isError &&
    items.every((item, index) => item.ownerId === owner && result.currentData?.packages[index]?.available && result.currentData.packages[index]?.quote === item.packageQuote));
  return { items, owner, result, ready };
}
export function PackageCartReview({ review }: { review: ReturnType<typeof usePackageCartReview> }) {
  const dispatch = useAppDispatch();
  if (!review.items.length) return null;
  if (!review.owner) return <p className="my-3">Please <Link href="/login" className="underline">sign in</Link> to review your private packages.</p>;
  return <div className="space-y-3 my-3">
    {review.result.isFetching && <p role="status">Checking custom package prices and availability…</p>}
    {review.result.isError && <p role="alert">Could not check your packages. <button type="button" className="underline" onClick={() => review.result.refetch()}>Retry</button></p>}
    {review.items.map((item, index) => {
      const current = review.result.currentData?.packages[index];
      const wrongOwner = item.ownerId !== review.owner;
      if (!wrongOwner && (!review.result.currentData || (current?.available && current.quote === item.packageQuote))) return null;
      return <div key={item._id} className="rounded-lg border border-primary bg-primary/10 p-3 space-y-2">
        <p className="font-semibold">{item.name}</p>
        <p>{wrongOwner ? "This package belongs to another account. Remove it to continue." : !current?.available ? "This package is unavailable. Remove it or edit it in My Packages." : "This package has changed. Review and accept the current contents and price."}</p>
        {!wrongOwner && current?.available && <><ul className="text-sm">{packageCartItem(current).contents.map((line, i) => <li key={i}>{line}</li>)}</ul><p>Current package price: ৳{current.salePrice.toFixed(2)}</p><Button type="button" disabled={review.result.isFetching} onClick={() => dispatch(refreshCartPackage(packageCartItem(current)))}>Accept updated package</Button></>}
        <Button type="button" variant="outline" onClick={() => dispatch(removeFromCart({ _id: item._id, productType: "package" }))}>Remove from cart</Button>
      </div>;
    })}
  </div>;
}
