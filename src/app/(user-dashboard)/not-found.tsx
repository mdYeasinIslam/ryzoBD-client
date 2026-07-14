import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      key="NotFound"
      className="container mx-auto px-4 min-h-[calc(100vh-300px)] flex items-center justify-center"
    >
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary">
          404
        </h1>
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm sm:text-base"
        >
          <Button className="mt-2 sm:mt-4 h-9 sm:h-10">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
