import PackageCard from "@/components/cards/package-card";
import { Button } from "@/components/ui/button";
import { Package } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
type IProps = {
  packages: Package[];
};
const PackageProductsSection = (props: IProps) => {
  const { packages } = props;
  return (
    <section className="w-full overflow-hidden py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Shop Packages</h2>
            <p className="text-muted-foreground">
              Save with curated collections of your favorite products
            </p>
          </div>
          <Button asChild>
            <Link href="/packages">
              View All Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {packages?.map((packageData: Package) => (
            <PackageCard key={packageData._id} packageData={packageData} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageProductsSection;
