"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, removeFromCart } from "@/redux/features/cart/cart-slice";
import { packageCartItem, packageTitle, useMyPackagesQuery, useDeleteMyPackageMutation, useLazyMyPackageQuery } from "@/redux/features/packages/packages-api";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function MyPackagesPage() {
  const owner = useAppSelector(s => s.auth.user._id) || "";
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const result = useMyPackagesQuery({ owner, page }, { skip: !owner, refetchOnMountOrArgChange: true });
  const [remove] = useDeleteMyPackageMutation();
  const [load] = useLazyMyPackageQuery();
  const dispatch = useAppDispatch();
  const router = useRouter();
  async function action(id: string, deleting: boolean) {
    if (busy || (deleting && !window.confirm("Delete this saved package? Existing orders will stay unchanged."))) return;
    setBusy(true);
    try {
      if (deleting) { await remove(id).unwrap(); dispatch(removeFromCart({ _id: id, productType: "package" })); toast({ title: "Package deleted" }); }
      else {
        const { data: { package: p } } = await load({ id, owner }, false).unwrap();
        if (!p.available) throw new Error("This package has unavailable products. Please edit it first.");
        dispatch(addToCart(packageCartItem(p))); router.push("/cart");
      }
    } catch (error) { toast({ title: error instanceof Error ? error.message : "Could not complete the action. Please try again.", variant: "destructive" }); }
    finally { setBusy(false); }
  }
  return <section className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">My Packages</h1><Link className={buttonVariants()} href="/packages/create">Create Custom Package</Link></div>
    <p className="text-muted-foreground">Only you and the shop can access these packages. Save them for later or order them again.</p>
    {result.isFetching && <p role="status">Loading packages…</p>}
    {result.isError && <p role="alert">Could not load packages. <button className="underline" onClick={() => result.refetch()}>Retry</button></p>}
    {result.currentData?.data.packages.length === 0 && <p>You have no packages on this page. Create a package to get started.</p>}
    {result.currentData?.data.packages.map(p => <article key={p._id} className="rounded-xl border bg-card p-5 space-y-3">
      <h2 className="text-xl font-semibold">{packageTitle(p.name)}</h2>
      <div className="flex flex-wrap gap-3">{p.products.map((i, index) => <div key={i.product?._id || index} className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {i.product && <img src={i.product.featuredImage} alt="" className="h-10 w-10 object-contain" />}<span>{i.quantity} × {i.product?.name || "Unavailable product"}</span>
      </div>)}</div>
      <p className="font-semibold">Current total: ৳{p.salePrice.toFixed(2)}</p>
      {!p.available && <p className="text-destructive">This package is currently unavailable. Review the products or contact the shop.</p>}
      <div className="flex gap-3"><Button disabled={busy || !p.available} onClick={() => action(p._id, false)}>Add to Cart</Button><Link className={buttonVariants({ variant: "outline" })} href={`/my-packages/${p._id}`}>Edit</Link><Button variant="outline" disabled={busy} onClick={() => action(p._id, true)}>Delete</Button></div>
    </article>)}
    <div className="flex gap-4"><Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button><span>Page {page}</span><Button variant="outline" disabled={page >= (result.currentData?.pagination.totalPages || 1)} onClick={() => setPage(page + 1)}>Next</Button></div>
  </section>;
}
