import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
//  bg-gradient-to-bl from-primary/30 to-primary/20 bg-gradient-to-t from-[#F9DFC8] to-[#FDE6CE] 
export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-[#E3CDB8]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] opacity-10" />

      <div className="container mx-auto  py-8 md:py-8 lg:py-0">
        <div className="grid items-center justify-between gap-8 lg:grid-cols-2">
          {/* Content */}
          <div className="relative space-y-4 px-4 w-full">
            <div className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
              Trusted by Customers Across Bangladesh
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Everything You Need,
              <br />
              <span className="text-primary">All in One Place</span>
            </h1>

            <p className="max-w-xl text-lg text-gray-600">
              Shop premium products at competitive prices with fast delivery and
              a secure shopping experience.
            </p>
            <div>
              <Link href="/products">
                <Button className="rounded-full px-8 text-lg h-12 font-bold">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative  min-h-[auto]">
            <Image
              src="/images/home/hero-img2.png"
              // src="https://m.media-amazon.com/images/I/61qUluIhdTL._AC_UF894,1000_QL80_.jpg"

              alt="Fresh organic vegetables in a basket"
              width={500}
              height={500}
              className="w-full h-full object-container "
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
