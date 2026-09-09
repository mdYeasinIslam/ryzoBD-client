/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts } from "@/services";
import Products from "./components/products";
import ProductPagination from "./components/pagination";
// import { LayoutGrid, List } from "lucide-react";
// import Image from "next/image";

// import { Badge } from "@/components/ui/badge";
import Categories from "./components/categories";
import PriceFilter from "./components/price-filter";
// import { Button } from "@/components/ui/button";
import Sort from "./components/sort";
import ClearFilters from "./components/clear-filters";
import PriceFilterCopy from "./components/price-filter-copy";
import { Divide } from "lucide-react";
import LeftSideContent from "./components/left-side";

export default async function ProductsPageContent({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    page: string;
    min_price: string;
    max_price: string;
    sort: string;
    search: string;
  }>;
}) {
  const params = await searchParams;
  // console.log("categoryParam", params);
  const query: { [key: string]: any } = {
    category: params.category,
    page: params.page,
    sort: params.sort,
    limit: "9",
    search: params.search,
  };
  if (params.min_price) query.salePrice = { gte: params.min_price };
  if (params.max_price)
    query.salePrice = { ...query.salePrice, lte: params.max_price };
  const { products, pagination } = await getProducts(query);
  // const products: Product[] = await getProducts({ category: query.category });

  // const bestSellers = [
  //   { name: "Cherry", price: 30, image: "/images/image.png" },
  //   { name: "Asparagus", price: 12, image: "/images/image.png" },
  //   { name: "Eggplant", price: 18, image: "/images/image.png" },
  //   { name: "Carrot", price: 17, image: "/images/image.png" },
  // ];

  // const tags = ["Food", "Green", "Vegetables", "Organic", "Farm"];

  return (
    <>
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex flex-col gap-0 md:gap-4 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5 md:space-y-6 ">
            <LeftSideContent />
            {/* Best Sellers */}
            {/* TODO: Need to add best sellers products */}
            {/* <div className="space-y-4">
              <h2 className="font-semibold text-lg">BEST SELLERS</h2>
              <div className="space-y-4">
                {bestSellers.map((product) => (
                  <div key={product.name} className="flex space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-primary">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            {/* Tags */}
            {/* <div className="space-y-4">
              <h2 className="font-semibold text-lg">SEARCH BY TAGS</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div> */}
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 space-y-2 lg:space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-lg md:text-base lg:text-xl font-semibold font-inter tracking-widest">All Products</h1>
              {/* Search and Filter Bar */}
              <div className="flex flex-col space-y-0 md:flex-row md:justify-between md:items-center">
                <ClearFilters />
                <div className="flex items-center gap-2 lg:gap-4">
                  <span className="w-full text-sm md:text-end text-muted-foreground">
                    Showing{" "}
                    {(pagination.currentPage - 1) * pagination.limit + 1}–
                    {(pagination.currentPage - 1) * pagination.limit +
                      products.length}{" "}
                    of {pagination.totalItems}{" "}
                    <span className="hidden lg:inline-block">results</span>
                  </span>
                  {/* Sort By */}
                  <Sort />
                  {/* TODO: Need to add view toggling */}
                  {/* <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <List className="h-4 w-4" />
                  </Button>
                </div> */}
                </div>
              </div>
            </div>
            {products.length > 0 ? (
              <div>
                <Products products={products} />
                {/* Pagination */}
                <ProductPagination
                  totalPages={pagination?.totalPages || 0}
                  currentPage={pagination?.currentPage || 1}
                />
              </div>
            ) : (
              <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 py-16">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Products Found
                </h2>
                <p className="text-gray-500">
                  We couldn&apos;t find any products matching your search
                  criteria. Try adjusting your filters or search terms.
                </p>
                {/* <ClearFilters /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// import { Suspense } from "react";
// import { getProducts } from "@/services";
// import Products from "./components/products";
// import ProductPagination from "./components/pagination";

// async function ProductsContent({
//   searchParams,
// }: {
//   searchParams: Promise<{ category: string; page: string }>;
// }) {
//   const query = await searchParams;
//   const { products, pagination } = await getProducts({
//     category: query.category,
//     page: query.page,
//     limit: "10", // TODO: Need to remove this
//   });

//   return (
//     <div>
//       <Products products={products} />
//       <ProductPagination
//         totalPages={pagination?.totalPages || 0}
//         currentPage={pagination?.currentPage || 1}
//       />
//     </div>
//   );
// }

// export default function ProductsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ category: string; page: string }>;
// }) {
//   return (
//     <Suspense fallback={<div>Loading suspense...</div>}>
//       <ProductsContent searchParams={searchParams} />
//     </Suspense>
//   );
// }
