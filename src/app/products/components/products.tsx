"use client";
import ProductCard from "@/components/cards/product-card";
import { Product } from "@/types";
// import { useState } from "react";

const Products = ({ products }: { products: Product[] }) => {
  //   const [displayedProducts, setDisplayedProducts] = useState(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Products;
