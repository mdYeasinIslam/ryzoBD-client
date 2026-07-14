import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 to-primary/20">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] opacity-10" />

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Content */}
          <div className="relative space-y-4">
            <div className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
              100% ORGANIC AND FRESH FOOD
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Pure & Healthy
              <br />
              <span className="text-primary">Organic Food</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-600">
              Indulge in the goodness of nature with our organic products.
              Experience pure, wholesome flavors free from harmful additives.
            </p>
            <div>
              <Link href="/products">
                <Button className="rounded-full px-8 text-lg h-12 font-bold">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative right-0 ml-auto h-[300px] w-full max-w-[800px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="/images/hero-img2.png"
              alt="Fresh organic vegetables in a basket"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
