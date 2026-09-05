"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { products } from "@/data/products";
import ProductCard from "@/components/cards/product-card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function PopularProductsSection(props: Props) {
  const { products } = props;
  //   const [activeCategory, setActiveCategory] = React.useState("all");

  //   const filteredProducts = products.filter((product) =>
  //     activeCategory === "all" ? true : product.category === activeCategory
  //   );

  return (
    <section className="w-full overflow-hidden py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Popular Products
            </h2>
            <p className="text-muted-foreground">
              Explore our selection of fresh and organic products
            </p>
          </div>
          <div>
            <Link href="/products">
              <Button>
                View All Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
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

        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.length > 0 &&
            products?.slice(0,5).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
