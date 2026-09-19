import { getPackages } from "@/services";
import PackageProductsSection from "./PackageProductsSection";

const PackagesSection = async () => {
  const {packages} = await getPackages({ limit: "5", sort: "-createdAt" });
  console.log("packages", packages);
  // if (packages.length === 0) return null;

  return <PackageProductsSection packages={packages} />;
};
export default PackagesSection;
