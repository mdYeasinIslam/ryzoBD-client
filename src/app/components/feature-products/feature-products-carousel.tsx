"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/cards/product-card";
import { Product } from "@/types";

export default function FeaturedProductsCarousel({
  products,
}: {
  products: Product[];
}) {
  // const [activeCategory, setActiveCategory] = React.useState("all");

  // const filteredProducts = products.filter((product) =>
  //   activeCategory === "all" ? true : product.category === activeCategory
  // );

  return (
    <section className="w-full overflow-hidden py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Explore our selection of fresh and organic products
            </p>
          </div>
          {/* <Tabs
            defaultValue="all"
            className="w-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-background border border-input">
              <TabsTrigger
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="vegetables"
              >
                Vegetables
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="fruits"
              >
                Fruits
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="coffee"
              >
                Coffee & Teas
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="meat"
              >
                Meat
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>

        <div className="relative">
          {products.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className="pl-2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 md:pl-4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full" />
              <CarouselNext className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full" />
            </Carousel>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-muted-foreground max-w-md">
                We don&apos;t have any products in this category yet. Please
                check back later or explore other categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
