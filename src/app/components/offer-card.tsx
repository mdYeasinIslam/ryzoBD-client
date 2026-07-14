import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OfferCardSection() {
  return (
    <section className="w-full py-6">
      <div className="mx-auto container px-4 grid gap-6 md:grid-cols-2">
        <div className="group flex flex-col justify-end relative min-h-[300px] rounded-lg bg-primary/20 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/card-bg.png')] opacity-10" />
          <div
            className="absolute inset-0 z-[5] rounded-lg"
            style={{
              background:
                "linear-gradient(90deg, #53B175 50%, transparent 50%), linear-gradient(90deg, #53B175 50%, transparent 50%), linear-gradient(0deg, #53B175 50%, transparent 50%), linear-gradient(0deg, #53B175 50%, transparent 50%)",
              backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
              backgroundSize: "15px 2px, 15px 2px, 2px 15px, 2px 15px",
              backgroundPosition: "0px 0px, 200% 100%, 0px 200%, 100% 0px",
              padding: "1px",
            }}
          />
          <div className="absolute -top-8 -right-12 w-48 md:w-64">
            <Image
              src="/images/offer1.png"
              alt="Fresh organic vegetables"
              width={256}
              height={256}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="relative z-[5]">
            <p className="mb-2 text-lg font-semibold text-primary">
              Farm Fresh
            </p>
            <h3 className="mb-2 text-3xl font-bold tracking-tight">
              Local Farm Vegetables
            </h3>
            <p className="mb-4 text-muted-foreground">
              Get fresh vegetables directly from local farmers with convenient
              delivery options
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="group flex flex-col justify-end relative min-h-[300px] rounded-lg bg-primary/20 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/card-bg.png')] opacity-10" />
          <div
            className="absolute inset-0 z-[5] rounded-lg"
            style={{
              background:
                "linear-gradient(90deg, #53B175 50%, transparent 50%), linear-gradient(90deg, #53B175 50%, transparent 50%), linear-gradient(0deg, #53B175 50%, transparent 50%), linear-gradient(0deg, #53B175 50%, transparent 50%)",
              backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
              backgroundSize: "15px 2px, 15px 2px, 2px 15px, 2px 15px",
              backgroundPosition: "0px 0px, 200% 100%, 0px 200%, 100% 0px",
              padding: "1px",
            }}
          />
          <div className="absolute -top-8 -right-12 w-48 md:w-64">
            <Image
              src="/images/offer1.png"
              alt="Organic honey products"
              width={256}
              height={256}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="relative z-[5]">
            <p className="mb-2 text-lg font-semibold text-primary">
              Organic Food
            </p>
            <h3 className="mb-2 text-3xl font-bold tracking-tight">
              Organic Food Bundle
            </h3>
            <p className="mb-4 text-muted-foreground">
              Enjoy a variety of organic fruits, vegetables, and honey sourced
              from local farms
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Order Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
