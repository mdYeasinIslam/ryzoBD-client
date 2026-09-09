import Link from "next/link";
import {
  ArrowRight,
  Gift,
  Heart,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const AboutPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* =========================================
          HERO
      ========================================== */}
      <section className="relative border-b border-border">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full bg-premium/10 blur-3xl sm:-right-32 sm:-top-40 sm:h-[420px] sm:w-[420px]" />

          <div className="absolute -bottom-28 -left-24 h-[260px] w-[260px] rounded-full bg-accent/80 blur-3xl sm:-bottom-40 sm:-left-32 sm:h-[360px] sm:w-[360px]" />
        </div>

        <div className="container relative mx-auto grid items-center gap-4 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 md:gap-14 md:pb-24 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-28 lg:pt-10 xl:gap-20 2xl:px-4">
          {/* Left */}
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-premium/30 bg-premium/10 px-3 py-1.5 text-xs font-medium text-premium-foreground sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-premium sm:h-4 sm:w-4" />
              About RyzoBD
            </div>

            <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight xs:text-4xl sm:text-5xl md:text-[3.4rem] lg:text-[3.4rem] xl:text-6xl">
              Everyday choices,
              <span className="mt-1 block text-primary sm:mt-2">
                made a little more special.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-base sm:leading-7 md:text-lg md:leading-8 lg:mx-0">
              RyzoBD is a Bangladeshi e-commerce and lifestyle brand focused on
              thoughtfully selected products for your home, desk, daily life and
              meaningful gifting.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7 lg:mx-0">
              We believe a good product should do more than simply look good. It
              should feel useful, suitable for the occasion and worth choosing.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:w-auto"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-medium transition hover:bg-secondary sm:w-auto"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:max-w-none">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-2xl border border-border bg-secondary sm:aspect-[4/4.3] sm:rounded-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent" />

              {/* Lifestyle card */}
              <div className="absolute left-[7%] top-[8%] h-[43%] w-[48%] rounded-2xl border border-border bg-card p-4 shadow-sm sm:left-[10%] sm:top-[11%] sm:h-[42%] sm:w-[44%] sm:rounded-[1.75rem] sm:p-6 xl:p-7">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-11 sm:w-11 sm:rounded-xl lg:h-12 lg:w-12">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:text-[10px] md:text-xs md:tracking-[0.2em]">
                      Lifestyle
                    </p>

                    <p className="mt-1.5 text-sm font-semibold leading-tight sm:mt-2 sm:text-lg xl:text-xl">
                      Products chosen with purpose.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gift card */}
              <div className="absolute bottom-[7%] right-[6%] h-[46%] w-[51%] rounded-2xl bg-primary p-4 text-primary-foreground shadow-xl sm:bottom-[10%] sm:right-[8%] sm:h-[45%] sm:w-[48%] sm:rounded-[1.75rem] sm:p-6 xl:p-7">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 sm:h-11 sm:w-11 sm:rounded-xl lg:h-12 lg:w-12">
                    <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-primary-foreground/60 sm:text-[10px] md:text-xs md:tracking-[0.2em]">
                      Gifting
                    </p>

                    <p className="mt-1.5 text-sm font-semibold leading-tight sm:mt-2 sm:text-lg xl:text-xl">
                      Thoughtful choices for meaningful moments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[10%] left-[7%] h-12 w-12 rounded-full border border-premium/40 bg-premium/20 sm:bottom-[12%] sm:left-[9%] sm:h-20 sm:w-20" />

              <div className="absolute right-[9%] top-[8%] h-9 w-9 rounded-full bg-premium sm:right-[12%] sm:top-[11%] sm:h-14 sm:w-14" />
            </div>

            {/* Floating brand card */}
            <div className="absolute -bottom-5 left-1/2 w-[90%] -translate-x-1/2 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:w-[78%] sm:rounded-2xl sm:px-5 sm:py-4 lg:w-[85%] xl:w-[75%]">
              <div className="flex items-center justify-between gap-3 sm:gap-5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold sm:text-sm">RyzoBD</p>

                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                    Shop Smart, Live Better
                  </p>
                </div>

                <div className="h-7 w-px shrink-0 bg-border sm:h-8" />

                <p className="shrink-0 text-right text-[9px] leading-4 text-muted-foreground sm:text-xs sm:leading-5">
                  Useful.
                  <br />
                  Thoughtful. Refined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          OUR STORY
      ========================================== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28">
        <div className="grid gap-7 md:grid-cols-[0.85fr_1.15fr] md:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-premium sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              Our Story
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              More than just another online store.
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            <p>
              RyzoBD was built around a simple idea: finding the right product
              should feel easier and more intentional.
            </p>

            <p>
              Instead of filling our store with random products, we focus on
              items that can add something useful, attractive or meaningful to
              everyday life. From desk and home décor to practical lifestyle
              products and carefully considered gifts, every category has a
              reason to be part of RyzoBD.
            </p>

            <p>
              Our goal is to create a shopping experience where customers can
              find products for themselves as naturally as they can find
              something special for another person.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          PRODUCT DIRECTION
      ========================================== */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-premium sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              What You&apos;ll Find
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Products for real moments and real spaces.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
              Our collection is developed around how people actually live,
              decorate, work and give.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {[
              {
                icon: ShoppingBag,
                title: "Lifestyle Essentials",
                description:
                  "Useful products selected to make everyday routines simpler, better and more enjoyable.",
              },
              {
                icon: Sparkles,
                title: "Décor & Desk",
                description:
                  "Distinctive pieces that add personality and character to desks, rooms and workspaces.",
              },
              {
                icon: Gift,
                title: "Thoughtful Gifts",
                description:
                  "Products and combinations designed for birthdays, celebrations and meaningful occasions.",
              },
              {
                icon: Heart,
                title: "Cultural & Meaningful",
                description:
                  "Selected items that reflect meaningful traditions, values and culturally relevant gifting.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-6"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground sm:mb-6 sm:h-12 sm:w-12 sm:rounded-xl">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <h3 className="text-base font-semibold sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          OUR APPROACH
      ========================================== */}
      <section className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Visual */}
          <div className="relative order-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary p-5 text-primary-foreground sm:mt-8 sm:rounded-3xl sm:p-6 md:p-8 lg:mt-12">
                <PackageCheck className="h-7 w-7 text-premium sm:h-8 sm:w-8" />

                <h3 className="mt-8 text-lg font-semibold sm:mt-12 sm:text-xl lg:mt-16">
                  Carefully selected
                </h3>

                <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                  We focus on products that make sense for our customers rather
                  than simply increasing the number of items in our store.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 sm:rounded-3xl sm:p-6 md:p-8">
                <ShieldCheck className="h-7 w-7 text-premium sm:h-8 sm:w-8" />

                <h3 className="mt-8 text-lg font-semibold sm:mt-12 sm:text-xl lg:mt-16">
                  Customer focused
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Product presentation, ordering and support are designed to
                  make shopping straightforward and dependable.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-premium sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              The RyzoBD Approach
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Selection matters more than quantity.
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base">
              E-commerce makes it easy to offer thousands of products. We prefer
              to be more selective.
            </p>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
              We consider how a product looks, how useful it is, who it is
              suitable for and whether it fits naturally within the RyzoBD
              collection.
            </p>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {[
                "Useful enough for everyday life",
                "Presentable enough for thoughtful gifting",
                "Selected with quality and value in mind",
                "Suitable for modern Bangladeshi customers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-premium/15">
                    <div className="h-2 w-2 rounded-full bg-premium" />
                  </div>

                  <span className="text-sm font-medium leading-6 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          VALUES
      ========================================== */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
          <div className="mb-8 max-w-xl sm:mb-10 lg:mb-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-premium sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              What We Value
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Simple principles behind every choice.
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-xl border border-border bg-border gap-px md:grid-cols-3 sm:rounded-2xl">
            {[
              {
                number: "01",
                title: "Thoughtful Selection",
                text: "We aim to offer products with a clear purpose rather than creating an unfocused catalogue.",
              },
              {
                number: "02",
                title: "Value for Customers",
                text: "We care about the balance between product appeal, usefulness, quality and price.",
              },
              {
                number: "03",
                title: "A Better Experience",
                text: "From browsing to receiving an order, every interaction should feel simple and considered.",
              },
            ].map((value) => (
              <div
                key={value.number}
                className="bg-background p-5 sm:p-7 lg:p-8"
              >
                <span className="text-xs font-semibold text-premium sm:text-sm">
                  {value.number}
                </span>

                <h3 className="mt-6 text-lg font-semibold sm:mt-8 sm:text-xl">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:leading-7">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          BRAND STATEMENT
      ========================================== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-premium/10 blur-3xl sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 lg:py-32">
          <Sparkles className="mx-auto h-6 w-6 text-premium sm:h-7 sm:w-7" />

          <p className="mx-auto mt-5 max-w-4xl text-2xl font-medium leading-snug tracking-tight sm:mt-7 sm:text-3xl md:text-4xl md:leading-tight lg:text-5xl">
            “For your own space, your everyday life, or someone important —
            <span className="text-primary">
              {" "}
              the choice should feel special.
            </span>
            ”
          </p>

          <div className="mx-auto mt-6 h-px w-10 bg-premium sm:mt-8 sm:w-12" />

          <p className="mt-4 text-xs font-medium tracking-[0.15em] text-muted-foreground sm:mt-5 sm:text-sm">
            RYZOBD
          </p>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================== */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24 xl:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary sm:rounded-[2rem]">
          <div className="relative px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-16 xl:px-14">
            <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-primary-foreground/10" />

            <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-primary-foreground/10" />

            <div className="relative max-w-2xl text-center lg:text-left">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
                Discover RyzoBD
              </p>

              <h2 className="text-2xl font-semibold text-primary-foreground sm:text-3xl lg:text-4xl">
                Find something worth choosing.
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-primary-foreground/70 sm:mt-4 sm:text-base sm:leading-7 lg:mx-0">
                Explore products selected for everyday use, better spaces and
                meaningful moments.
              </p>
            </div>

            <div className="relative mt-7 flex justify-center lg:mt-0 lg:shrink-0">
              <Link
                href="/products"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-sm font-semibold text-primary transition hover:opacity-90 sm:w-auto lg:h-12"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
