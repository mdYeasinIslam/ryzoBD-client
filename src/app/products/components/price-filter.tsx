"use client";
import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { setSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

const PriceFilter = () => {
  const searchParams = useSearchParams();
  const paramsMinPrice = searchParams.get("min_price");
  const paramsMaxPrice = searchParams.get("max_price");
  const [values, setValues] = useState([
    paramsMinPrice ? +paramsMinPrice : MIN_PRICE,
    paramsMaxPrice ? +paramsMaxPrice : MAX_PRICE,
  ]);
  useEffect(() => {
    setValues([
      paramsMinPrice ? +paramsMinPrice : MIN_PRICE,
      paramsMaxPrice ? +paramsMaxPrice : MAX_PRICE,
    ]);
  }, [paramsMinPrice, paramsMaxPrice]);
  const router = useRouter();
  const handleFilter = () => {
    router.push(
      setSearchParams({
        searchParams: searchParams.toString(),
        params: {
          min_price: values[0].toString(),
          max_price: values[1].toString(),
        },
      })
    );
  };
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg pb-3">FILTER BY PRICE</h2>
      <DualRangeSlider
        label={(value) => <span>{value}৳</span>}
        value={values}
        onValueChange={setValues}
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={1}
      />
      <div className="flex justify-between items-center text-sm">
        <span>
          Price: {values[0]}৳ — {values[1]}৳
        </span>
        <Button onClick={handleFilter} variant="outline" size="sm">
          FILTER
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
