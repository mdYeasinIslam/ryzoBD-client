"use client";

import { Button } from "@/components/ui/button";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { setSearchParams } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 5000;

const PriceFilterCopy = () => {
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
      }),
    );
  };

  return (
    <div className="w-full space-y-3">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold font-inter tracking-widest uppercase">
          Price
        </h2>

        <ChevronUp className="h-4 w-4 stroke-[1.8]" />
      </div>

      {/* Min / Max inputs */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="number"
            min={MIN_PRICE}
            max={values[1]}
            value={values[0]}
            onChange={(e) => {
              const value = Number(e.target.value);

              setValues([
                Math.min(Math.max(value, MIN_PRICE), values[1]),
                values[1],
              ]);
            }}
            placeholder="Min ৳"
            className="h-8 w-full border border-primary/20 bg-white px-3 text-[15px] outline-none transition placeholder:text-neutral-500 focus:border-neutral-400"
          />
        </div>

        <span className="text-black">−</span>

        <div className="relative flex-1">
          <input
            type="number"
            min={values[0]}
            max={MAX_PRICE}
            value={values[1]}
            onChange={(e) => {
              const value = Number(e.target.value);

              setValues([
                values[0],
                Math.max(Math.min(value, MAX_PRICE), values[0]),
              ]);
            }}
            placeholder="Max ৳"
            className="h-8 w-full border border-primary/20 bg-white px-3 text-[15px] outline-none transition placeholder:text-neutral-500 focus:border-neutral-400"
          />
        </div>
      </div>

      {/* Existing range slider */}
      <div className="px-1 pt-">
        <DualRangeSlider
          value={values}
          onValueChange={setValues}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
        />
      </div>

      {/* Apply button */}
      <Button
        onClick={handleFilter}
        variant="outline"
        className=" w-full rounded-md  border-primary/20 bg-white text-[15px] font-semibold text-primary shadow-sm transition-all hover:bg-primary/20"
      >
        Apply price
      </Button>
    </div>
  );
};

export default PriceFilterCopy;
