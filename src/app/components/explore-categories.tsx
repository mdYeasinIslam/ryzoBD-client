import * as React from "react";
import Image from "next/image";
import Link from "next/link";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getCategories } from "@/services";

type Category = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};

export default async function ExploreCategoriesSection() {
  const categories: Category[] = await getCategories();
  // console.log(categories);
  if (categories.length === 0) {
    return null;
  }
  return (
    <section className="w-full py-6">
      <div className="mx-auto container px-4">
        <h2 className="mb-6 text-2xl font-bold">Explore Categories</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 flex justify-center">
              {/* TODO: need to remove this hardcoded number */}
              {/* {Array(12)
                .fill(...categories) */}
              {categories.map((category: Category) => (
                <CarouselItem
                  key={category._id}
                  className="basis-1/2 lg:basis-1/4 xl:basis-1/6"
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    className={cn(
                      "flex flex-col items-center rounded-lg p-4 transition-colors bg-muted/50"
                    )}
                  >
                    <div className="mb-3 aspect-square w-full">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="text-base text-center font-inter font-medium">
                      {category.name}
                    </h3>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full" />
            <CarouselNext className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full" />
            {/* <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button> */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
