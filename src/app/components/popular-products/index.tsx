import { getPopularProducts } from "@/services";
import PopularProductsSection from "./popular-products-section";

const PopularProducts = async () => {
  const products = await getPopularProducts();
  return <PopularProductsSection products={products} />;
};

export default PopularProducts;
