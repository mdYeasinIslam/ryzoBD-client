"use client";
import { setSearchParams } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoriesList = (props: { categories: Category[] }) => {
  const { categories } = props;
  const searchParams = useSearchParams();

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
          className="flex items-center"
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
            key={category.name}
            className="flex items-center"
          >
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
