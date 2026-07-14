import { getCategories } from "@/services";
import { Category } from "@/types";
import CategoriesList from "./categories-list";

const Categories = async () => {
  const categories: Category[] = await getCategories();
  // console.log(categories);
  if (categories.length === 0) {
    return null;
  }
  return <CategoriesList categories={categories} />;
};

export default Categories;
