import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const offers = [
  {
    eyebrow: "Gifts & Gadgets",
    title: "Stylish Tech\nGift Bundle",
    description:
      "Curated gadgets and stylish accessories, perfect for gifting tech lovers.",
    buttonText: "Shop Gifts",
    href: "/products",
    image: "/images/home/offer-tech-bundle.png",
    alt: "Premium tech gift bundle with watch, earbuds and smart speaker",
  },
  {
    eyebrow: "Smart Living",
    title: "Smart Home\nStarter Kit",
    description:
      "Smart and practical essentials designed to upgrade everyday living.",
    buttonText: "Browse Collection",
    href: "/products",
    image: "/images/home/offer-smart-home.png",
    alt: "Smart home products including speaker, lamp and useful gadgets",
  },
];

export default function OfferCardSectionPro() {
  return (
    <section className="w-full py-8 md:py-10">
      <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-2">
        {offers?.map((offer) => (
          <article
            key={offer.title}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl border border-border/60 bg-card md:min-h-[360px] "
          >
            {/* Background image */}
            <Image
              src={offer?.image}
              alt={offer?.alt}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[65%_center] transition-transform duration-700 group-hover:scale-[1.025] md:object-right xl:object-center"
            />

            {/* 
              Main overlay:
              Keeps the left side clean/readable while allowing
              the lifestyle image to remain visible on the right.
            */}
            <div className="absolute md:hidden inset-0 bg-gradient-to-r from-[#FCF8F3] via-[#FCF8F3]/95 to-[#FCF8F3]/20 md:from-[#FCF8F3] md:via-[#FCF8F3]/90 md:to-transparent" />

            {/* subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-0 flex min-h-[320px] max-w-[75%] flex-col justify-center p-6 sm:max-w-[65%] md:min-h-[360px] md:max-w-[58%] md:p-8 lg:p-4 xl:max-w-[55%] xl:p-10">
              <p className="mb-3 text-sm font-semibold tracking-wide text-primary sm:text-base">
                {offer.eyebrow}
              </p>

              <h3 className="mb-4 whitespace-pre-line text-2xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-3xl xl:text-[34px]">
                {offer.title}
              </h3>

              <div className="mb-5 h-px w-10 bg-primary/40" />

              <p className="mb-6 max-w-[360px] text-sm leading-6 text-muted-foreground sm:text-[15px]">
                {offer.description}
              </p>

              <div>
                <Link href={offer.href}>
                  <Button className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">
                    {offer.buttonText}

                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
