"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Sort = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSortBy = (value: string) => {
    if (value === "default") {
      value = "";
    }
    router.push(
      setSearchParams({
        searchParams: searchParams.toString(),
        params: { sort: value },
      })
    );
  };
  const sort = searchParams.get("sort");
  return (
    <Select defaultValue={sort || ""} onValueChange={handleSortBy}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="popularity">Sort by popularity</SelectItem> */}
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="salePrice">Price: Low to High</SelectItem>
        <SelectItem value="-salePrice">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Sort;
