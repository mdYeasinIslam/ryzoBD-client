import { notFound } from "next/navigation";
import ImageGallery from "@/app/products/[slug]/components/image-gallery";
import { getPackageBySlug } from "@/services";
import { Package } from "@/types";
import PackageDetails from "./components/package-details";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const packageData: Package | null = await getPackageBySlug(slug);

  if (!packageData) notFound();

  const images = [
    packageData.featuredImage,
    ...(packageData.gallery || []),
  ].filter(Boolean);

  return (
    <main className="container mx-auto space-y-10 px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <ImageGallery images={images} />
        <PackageDetails packageData={packageData} />
      </div>
      <section className="rounded-xl border border-primary/20 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Package Description</h2>
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: packageData.description || "" }}
        />
      </section>
    </main>
  );
}
