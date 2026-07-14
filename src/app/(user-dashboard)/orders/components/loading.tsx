import { Skeleton } from "@/components/ui/skeleton";

export default function OrderPageLoader() {
  return (
    <div className="p-4 space-y-6 mx-auto">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="space-y-4">
        {/* First Order Item */}
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-4 shadow rounded-lg space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-64" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-16 rounded" />
      </div>
    </div>
  );
}
