import Link from "next/link";
import PackageCard from "@/components/cards/package-card";
import ProductPagination from "@/app/products/components/pagination";
import { getPackages } from "@/services";
import { Package } from "@/types";

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const { packages, pagination } = await getPackages({
    page: params.page || "1",
    limit: "12",
    sort: params.sort || "-createdAt",
  });

  return (
    <main className="container mx-auto space-y-6 px-4 pb-12 pt-4">
      <div>
        <Link href="/packages/create" className="float-right rounded-lg bg-primary px-4 py-2 text-primary-foreground">Create Custom Package</Link>
        <h1 className="text-3xl font-bold">Shop Packages</h1>
        <p className="mt-2 text-muted-foreground">
          Save with curated collections of products sold as one package.
        </p>
      </div>
      {packages.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((packageData: Package) => (
              <PackageCard key={packageData._id} packageData={packageData} />
            ))}
          </div>
          <ProductPagination
            totalPages={pagination.totalPages || 0}
            currentPage={pagination.currentPage || 1}
          />
        </>
      ) : (
        <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold">No Packages Available</h2>
          <p className="mt-2 text-muted-foreground">
            Published packages will appear here.
          </p>
        </div>
      )}
    </main>
  );
}
