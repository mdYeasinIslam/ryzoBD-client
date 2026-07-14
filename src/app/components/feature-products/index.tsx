import { getFeaturedProducts } from "@/services";
import FeaturedProductsCarousel from "./feature-products-carousel";

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();
  return <FeaturedProductsCarousel products={products} />;
};

export default FeaturedProducts;
