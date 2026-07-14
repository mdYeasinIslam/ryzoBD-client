import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsPageLoader() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Skeleton className="absolute inset-0 rounded-lg" />
          </div>
          <div className="flex gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="aspect-square w-20 rounded-md" />
              ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </div>

          <div className="flex items-center gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            <Skeleton className="h-4 w-24 ml-2" />
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 border rounded-lg"
                >
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="space-y-6">
        <div className="flex gap-4 py-1 border-b">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <ul className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-4 w-full max-w-sm" />
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
