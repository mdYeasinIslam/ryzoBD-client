import * as React from "react";
import { Smile, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGallery from "./components/image-gallery";
import ProductDetails from "./components/product-details";
import { getProductBySlug } from "@/services";

interface ReviewCardProps {
  initials: string;
  name: string;
  rating: number;
  timeAgo: string;
  review: string;
}

const ReviewCard = ({
  initials,
  name,
  rating,
  timeAgo,
  review,
}: ReviewCardProps) => {
  return (
    <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-primary h-10 w-10 rounded-full flex items-center justify-center text-primary-foreground font-medium">
            {initials}
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">{name}</p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">{timeAgo}</p>
            </div>
          </div>
        </div>
        <Badge variant="secondary">Verified Purchase</Badge>
      </div>
      <p className="text-gray-600 leading-relaxed">{review}</p>
    </div>
  );
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const queryParams = await params;
  const product = await getProductBySlug(queryParams.slug);
  // console.log("queryParams slug", queryParams.slug);
  // console.log("productData", product);

  const images: string[] = [];
  if (product.featuredImage) {
    images.push(product.featuredImage);
  }
  if (product.gallery) {
    images.push(...product.gallery);
  }

  const reviews = [];

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <ImageGallery images={images} />
          {/* Product Details */}
          <ProductDetails
            name={product.name}
            price={product.price}
            salePrice={product.salePrice}
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
            id={product._id}
            categories={product.categories}
            // unit={product.unit}
            sellUnit={product.sellUnit}
            shortDescription={product.shortDescription}
            // availableQuantity={product.availableQuantity}
            tags={product.tags || []}
            featuredImage={product.featuredImage}
          />
        </div>
      </div>
      <div className="w-full container mx-auto p-4 border-2 border-primary/20">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full sm:w-auto bg-gray-50/80 p-1 rounded-xl">
            <TabsTrigger
              value="description"
              className="flex-1 sm:flex-none rounded-lg text-sm font-medium"
            >
              Description
            </TabsTrigger>
            {/* <TabsTrigger
              value="additional"
              className="flex-1 sm:flex-none rounded-lg text-sm font-medium"
            >
              Additional Information
            </TabsTrigger> */}
            <TabsTrigger
              value="reviews"
              className="flex-1 sm:flex-none rounded-lg text-sm font-medium"
            >
              Reviews (0)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-8">
            <div
              className="space-y-8"
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            ></div>
          </TabsContent>
          {/* <TabsContent value="additional" className="mt-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50/80 p-6 rounded-2xl hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-medium text-gray-900 mb-3">Weight</h3>
                  <p className="text-gray-600">500g</p>
                </div>
                <div className="bg-gray-50/80 p-6 rounded-2xl hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-medium text-gray-900 mb-3">Dimensions</h3>
                  <p className="text-gray-600">10 × 20 × 15 cm</p>
                </div>
                <div className="bg-gray-50/80 p-6 rounded-2xl hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-medium text-gray-900 mb-3">Storage</h3>
                  <p className="text-gray-600">Keep refrigerated</p>
                </div>
                <div className="bg-gray-50/80 p-6 rounded-2xl hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-medium text-gray-900 mb-3">Shelf Life</h3>
                  <p className="text-gray-600">5 days</p>
                </div>
              </div>
            </div>
          </TabsContent> */}
          <TabsContent value="reviews" className="mt-8">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Smile className="h-16 w-16 text-primary" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  No Reviews Yet
                </h2>
                <p className="text-gray-600 mt-2">
                  Be the first to review this product!
                </p>
                <p className="mt-2 text-gray-600">We value your feedback!</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Customer Reviews
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        4.8 out of 5
                      </span>
                      <span className="text-sm text-gray-500">
                        (128 reviews)
                      </span>
                    </div>
                  </div>
                  {/* <Button variant="outline" className="hidden sm:flex">
                Write a Review
              </Button> */}
                </div>
                {/* TODO: need to work with review system. now it is static */}
                <div className="space-y-6">
                  <ReviewCard
                    initials="JD"
                    name="John Doe"
                    rating={5}
                    timeAgo="2 days ago"
                    review="Great product! Fresh and crispy. Will definitely buy again. The packaging was excellent and delivery was prompt."
                  />
                  <ReviewCard
                    initials="JS"
                    name="Jane Smith"
                    rating={4}
                    timeAgo="1 week ago"
                    review="The quality is consistently good. Highly recommended! I've been ordering this product regularly and never been disappointed."
                  />
                  <Button variant="outline" className="w-full sm:hidden">
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
