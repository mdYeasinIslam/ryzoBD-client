"use client";
import { Button } from "@/components/ui/button";
import { removeSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ClearFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasAnySearchParams = searchParams.size;
  //   const paramsCategory = searchParams.get("category");
  const paramsMinPrice = searchParams.get("min_price");
  const paramsMaxPrice = searchParams.get("max_price");
  const search = searchParams.get("search");

  const clearFilters = () => {
    router.push("/products");
  };
  const removeParams = (...keys: string[]) => {
    router.push(
      removeSearchParams({
        searchParams: searchParams.toString(),
        keys,
      })
    );
  };
  return (
    <div className="space-y-3">
      {search && (
        <span className="text-muted-foreground">
          Search results for &#34;
          <span className="font-bold text-foreground">{search}</span>&#34;
        </span>
      )}
      <div className="flex gap-2">
        {hasAnySearchParams > 0 && (
          <>
            <Button
              variant="secondary"
              onClick={clearFilters}
              className="h-7 px-4"
            >
              <span className="text-destructive">&#x2715;</span> Clear filters
            </Button>
            {paramsMinPrice && (
              <Button
                onClick={() => removeParams("min_price")}
                variant="secondary"
                className="h-7 px-4"
              >
                <span className="text-destructive">&#x2715;</span> Min Price
              </Button>
            )}
            {paramsMaxPrice && (
              <Button
                onClick={() => removeParams("max_price")}
                variant="secondary"
                className="h-7 px-4"
              >
                <span className="text-destructive">&#x2715;</span> Max Price
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClearFilters;
