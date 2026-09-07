import NewsletterSubscription from "@/components/common/newsletter";
import Banner from "./components/banner";
import ExploreCategoriesSection from "./components/explore-categories";
import FeaturedProducts from "./components/feature-products";
import PopularProducts from "./components/popular-products";
import OfferCardSectionPro from "./components/offer-cardPro";
import FeatureSection from "@/components/common/FeatureSection";
// import FeatureProductCard from "./components/product";

export default async function Home() {
  // { searchParams }: { searchParams: any }
  // console.log("searchParams", await searchParams);
  return (
    <>
      <Banner />
      <ExploreCategoriesSection />
      <FeaturedProducts />
      <OfferCardSectionPro />
      {/* <FeatureProductCard /> */}
      <PopularProducts />
      <FeatureSection />
      <NewsletterSubscription />
    </>
  );
}
