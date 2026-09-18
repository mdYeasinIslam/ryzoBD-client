"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cart-slice";
import { CustomPackage, packageCartItem, packageTitle, useBuilderProductsQuery, useSaveMyPackageMutation } from "@/redux/features/packages/packages-api";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Selection = { product: Product; quantity: number };
export default function PackageBuilder({ initial }: { initial?: CustomPackage }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector(s => s.auth);
  const [name, setName] = useState(initial ? packageTitle(initial.name) : "");
  const [description, setDescription] = useState(initial?.description || "");
  const [items, setItems] = useState<Selection[]>(initial?.products.filter(i => i.product).map(i => ({ product: i.product!, quantity: i.quantity })) || []);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [ready, setReady] = useState(false);
  const key = useRef("");
  const busy = useRef(false);
  const [save, saveState] = useSaveMyPackageMutation();
  const draftKey = `custom-package-draft:${user._id || "guest"}`;
  useEffect(() => {
    if (status === "loading") return;
    if (!initial) {
      try {
        const raw = sessionStorage.getItem(draftKey) || sessionStorage.getItem("custom-package-draft:guest");
        if (raw) {
          const draft = JSON.parse(raw);
          setName(draft.name || ""); setDescription(draft.description || "");
          setItems(Array.isArray(draft.items) ? draft.items : []); key.current = draft.key || "";
        }
      } catch { /* Ignore an unreadable browser draft. */ }
    }
    if (!key.current) key.current = crypto.randomUUID();
    setReady(true);
  }, [initial, draftKey, status]);
  useEffect(() => {
    if (ready && !initial) sessionStorage.setItem(draftKey, JSON.stringify({ name, description, items, key: key.current }));
  }, [ready, initial, draftKey, name, description, items]);
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  const products = useBuilderProductsQuery({ search: debouncedSearch, page });
  const total = items.reduce((sum, i) => sum + i.product.salePrice * i.quantity, 0);
  async function submit(continueToCart: boolean) {
    if (busy.current) return;
    if (status !== "authenticated") {
      localStorage.setItem("redirectUrl", "/packages/create"); router.push("/login"); return;
    }
    if (!name.trim() || !items.length || items.some(i => !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 100)) {
      toast({ title: "Enter a name and select products with quantities from 1 to 100.", variant: "destructive" }); return;
    }
    busy.current = true;
    try {
      const { data: { package: p } } = await save({ id: initial?._id, body: {
        name: name.trim(), description: description.trim(), ...(!initial ? { creationKey: key.current } : {}),
        products: items.map(i => ({ product: i.product._id, quantity: i.quantity })),
      } }).unwrap();
      sessionStorage.removeItem(draftKey); sessionStorage.removeItem("custom-package-draft:guest");
      setReady(false);
      toast({ title: "Your private package has been saved." });
      if (continueToCart && p.available) { dispatch(addToCart(packageCartItem(p))); router.push("/cart"); }
      else router.push("/my-packages");
    } catch (error) {
      toast({ title: (error as { data?: { message?: string } }).data?.message || "Could not save your package. Please try again.", variant: "destructive" });
    } finally { busy.current = false; }
  }
  return <main className="container mx-auto px-4 py-8 space-y-6">
    <div><h1 className="text-3xl font-bold">{initial ? "Edit your package" : "Create your own package"}</h1>
      <p className="mt-2 text-muted-foreground">Choose your products and quantities. Your package is private and stays in your account for later.</p>
      <Link className="text-primary underline" href="/my-packages">My Packages</Link></div>
    <fieldset disabled={saveState.isLoading || !ready} className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-4">
        <label className="block">Search products<input aria-label="Search products" value={search} onChange={e => setSearch(e.target.value)} className="mt-2 w-full rounded border p-3 bg-background" placeholder="Search by product name" /></label>
        {products.isFetching && <p role="status">Loading products…</p>}
        {products.isError && <p role="alert">Unable to load products. <button type="button" className="underline" onClick={() => products.refetch()}>Retry</button></p>}
        <div className="grid gap-3 sm:grid-cols-2">
          {products.data?.data.products.map(p => <div key={p._id} className="rounded-xl border p-4 space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.featuredImage} alt={p.name} className="h-28 w-full object-contain" />
            <p className="font-medium">{p.name}</p><p>৳{p.salePrice.toFixed(2)} / {p.sellUnit}</p>
            <Button type="button" disabled={items.some(i => i.product._id === p._id) || items.length >= 50} onClick={() => setItems(current => [...current, { product: p, quantity: 1 }])}> {items.some(i => i.product._id === p._id) ? "Selected" : "Add"}</Button>
          </div>)}
        </div>
        {products.data?.data.products.length === 0 && <p>No products found.</p>}
        <div className="flex justify-between"><Button type="button" variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button><span>Page {page}</span><Button type="button" variant="outline" disabled={page >= (products.data?.pagination.totalPages || 1)} onClick={() => setPage(page + 1)}>Next</Button></div>
      </section>
      <section className="space-y-4 rounded-xl border p-5 h-fit">
        <label className="block">Package name<input maxLength={100} value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded border p-3 bg-background" placeholder="My weekly essentials" /></label>
        <label className="block">Description (optional)<textarea maxLength={1000} value={description} onChange={e => setDescription(e.target.value)} className="mt-2 w-full rounded border p-3 bg-background" /></label>
        {initial?.products.some(i => !i.product) && <p className="text-destructive">Deleted products were removed. Review your selection before saving.</p>}
        {!items.length && <p>Select at least one product to start.</p>}
        {items.map(i => <div key={i.product._id} className="border-b pb-3 space-y-2">
          <p className="font-medium">{i.product.name}</p>
          <div className="flex items-center gap-3"><label>Quantity <input aria-label={`Quantity of ${i.product.name}`} type="number" min={1} max={100} value={i.quantity} onChange={e => setItems(current => current.map(item => item.product._id === i.product._id ? { ...item, quantity: Number(e.target.value) } : item))} className="w-20 rounded border p-2 bg-background" /></label><span>৳{(i.quantity * i.product.salePrice).toFixed(2)}</span><button type="button" className="text-destructive underline" onClick={() => setItems(current => current.filter(item => item.product._id !== i.product._id))}>Remove</button></div>
        </div>)}
        <p className="text-xl font-bold">Estimated total: ৳{total.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Prices are checked when you save and order. Saving does not reserve products or prices.</p>
        <div className="flex flex-wrap gap-3"><Button type="button" variant="outline" disabled={saveState.isLoading} onClick={() => submit(false)}>Save Package</Button><Button type="button" disabled={saveState.isLoading} onClick={() => submit(true)}>{saveState.isLoading ? "Saving…" : "Continue to Cart"}</Button></div>
      </section>
    </fieldset>
  </main>;
}
