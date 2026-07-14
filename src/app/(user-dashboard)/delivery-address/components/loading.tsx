import { Skeleton } from "@/components/ui/skeleton";

export default function DeliveryPageLoader() {
  return (
    <div className="p-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-6 shadow rounded-lg space-y-4 relative">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-32" />
                    {i === 0 && <Skeleton className="h-6 w-20 rounded-full" />}
                  </div>
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  {/* {i === 1 && (
                    <>
                      <Skeleton className="h-8 w-24 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </>
                  )} */}
                </div>
              </div>
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </div>
    </div>
  );
}
