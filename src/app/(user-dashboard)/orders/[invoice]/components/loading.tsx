import { Skeleton } from "@/components/ui/skeleton";

export default function InvoicePageLoader() {
  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 sm:w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-32 rounded-lg ml-auto" />
          <Skeleton className="h-5 w-36 ml-auto" />
          <Skeleton className="h-4 w-40 sm:w-48 ml-auto" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </div>

      {/* Product Table */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Payment Details */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full sm:w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full sm:w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full sm:w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-2 hidden sm:block text-right">
          <Skeleton className="h-4 w-32 ml-auto" />
          <Skeleton className="h-6 w-24 ml-auto" />
        </div>
      </div>

      {/* Order Progress */}
      <div className="space-y-6">
        <Skeleton className="h-5 w-32" />
        <div className="relative">
          <div className="flex justify-between mb-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
          </div>
          <div className="flex gap-2 justify-between">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full sm:w-24" />
              ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="flex gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
