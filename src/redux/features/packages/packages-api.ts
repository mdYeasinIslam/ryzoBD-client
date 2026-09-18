import { apiSlice } from "@/redux/api-slice";
import { Package, Product } from "@/types";
export type CustomPackage = Omit<Package, "products"> & {
  products: { product: (Product & { status?: string }) | null; quantity: number }[];
  available: boolean;
  quote: string;
  createdByCustomer: string;
};
export type PackageInput = { name: string; description: string; creationKey?: string; products: { product: string; quantity: number }[] };
export const packageTitle = (name: string) => name.replace(/ #[a-f0-9]{24}$/, "");
export const packageCartItem = (p: CustomPackage) => ({
  _id: p._id, productType: "package" as const, name: packageTitle(p.name), price: p.salePrice,
  featuredImage: p.featuredImage, packageQuote: p.quote, ownerId: p.createdByCustomer,
  contents: p.products.map(i => `${i.quantity} × ${i.product?.name || "Unavailable product"} (${i.product?.sellUnit || ""})`),
});
export const packagesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    reviewPackages: builder.query<{ packages: (CustomPackage | null)[] }, { ids: string[]; owner: string }>({
      async queryFn({ ids }, _api, _extra, baseQuery) {
        const responses = await Promise.all(ids.map(id => baseQuery(`/packages/mine/${id}`)));
        const error = responses.find(response => response.error && response.error.status !== 404);
        if (error?.error) return { error: error.error };
        return { data: { packages: responses.map(response => response.data ? (response.data as { data: { package: CustomPackage } }).data.package : null) } };
      },
      providesTags: ["my-packages"],
    }),
    builderProducts: builder.query<{ data: { products: Product[] }; pagination: { totalPages: number } }, { search: string; page: number }>({
      query: ({ search, page }) => `/products?${new URLSearchParams({ search, page: String(page), limit: "12", status: "published" })}`,
    }),
    myPackages: builder.query<{ data: { packages: CustomPackage[] }; pagination: { totalPages: number } }, { owner: string; page: number }>({
      query: ({ page }) => `/packages/mine?page=${page}`,
      providesTags: ["my-packages"],
    }),
    myPackage: builder.query<{ data: { package: CustomPackage } }, { id: string; owner: string }>({
      query: ({ id }) => `/packages/mine/${id}`,
      providesTags: ["my-packages"],
    }),
    saveMyPackage: builder.mutation<{ data: { package: CustomPackage } }, { id?: string; body: PackageInput }>({
      query: ({ id, body }) => ({ url: `/packages/mine${id ? `/${id}` : ""}`, method: id ? "PATCH" : "POST", body }),
      invalidatesTags: ["my-packages"],
    }),
    deleteMyPackage: builder.mutation<void, string>({
      query: id => ({ url: `/packages/mine/${id}`, method: "DELETE" }),
      invalidatesTags: ["my-packages"],
    }),
  }),
});
export const { useReviewPackagesQuery, useBuilderProductsQuery, useMyPackagesQuery, useMyPackageQuery, useSaveMyPackageMutation, useDeleteMyPackageMutation, useLazyMyPackageQuery } = packagesApi;
