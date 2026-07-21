"use client";
import { cn, setSearchParams } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const CategoriesList = (props: { categories: Category[] }) => {
  const { categories } = props;
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState<string | null>("All");
  console.log("category", categoryName);
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">CATEGORIES</h2>
      <div className="space-y-2">
        <Link
          href={setSearchParams({
            searchParams: searchParams.toString(),
            params: { category: "" },
            removeParams: ["page"],
          })}
          onClick={() => setCategoryName("All")}
          className={cn(
            "flex items-center font-semibold cursor-pointer  hover:bg-primary  hover:text-white transition-colors rounded-md px-2 py-1",
            categoryName === "All" && "bg-primary text-white",
          )}
        >
          <span>All</span>
        </Link>
        {categories.map((category) => (
          <Link
            href={setSearchParams({
              searchParams: searchParams.toString(),
              params: { category: category.slug },
              removeParams: ["page"],
            })}
            onClick={() => setCategoryName(category.slug)}
            key={category.name}
            className={cn(
              "flex items-center font-semibold cursor-pointer  hover:bg-primary  hover:text-white transition-colors rounded-md px-2 py-1",
              category.slug === categoryName && "bg-primary text-white",
            )}
          >
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
