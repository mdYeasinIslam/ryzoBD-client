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
          <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-premium/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-accent/80 blur-3xl" />
        </div>

        <div className="relative mx-auto grid container items-center gap-12 px-4 pb-16 sm:px-6 md:pb-24 lg:grid-cols-2 lg:px-8 lg:pb-28 pt-5">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-premium/30 bg-premium/10 px-4 py-2 text-sm font-medium text-premium-foreground">
              <Sparkles className="h-4 w-4 text-premium" />
              About RyzoBD
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Everyday choices,
              <span className="block text-primary">
                made a little more special.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              RyzoBD is a Bangladeshi e-commerce and lifestyle brand focused on
              thoughtfully selected products for your home, desk, daily life and
              meaningful gifting.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              We believe a good product should do more than simply look good. It
              should feel useful, suitable for the occasion and worth choosing.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-medium transition hover:bg-secondary"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[2rem] border border-border bg-secondary">
              {/* Main visual block */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-accent" />

              <div className="absolute left-[10%] top-[11%] h-[42%] w-[44%] rounded-[1.75rem] border border-border bg-card p-5 shadow-sm sm:p-7">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Lifestyle
                    </p>
                    <p className="mt-2 text-xl font-semibold">
                      Products chosen with purpose.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[10%] right-[8%] h-[45%] w-[48%] rounded-[1.75rem] bg-primary p-5 text-primary-foreground shadow-xl sm:p-7">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                    <Gift className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
                      Gifting
                    </p>
                    <p className="mt-2 text-xl font-semibold">
                      Thoughtful choices for meaningful moments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[12%] left-[9%] h-20 w-20 rounded-full border border-premium/40 bg-premium/20" />
              <div className="absolute right-[12%] top-[11%] h-14 w-14 rounded-full bg-premium" />
            </div>

            {/* Floating brand card */}
            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-lg backdrop-blur sm:w-[75%]">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold">RyzoBD</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Shop Smart, Live Better
                  </p>
                </div>

                <div className="h-8 w-px bg-border" />

                <p className="text-right text-xs leading-5 text-muted-foreground">
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-premium">
              Our Story
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              More than just another online store.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted-foreground">
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-premium">
              What You&apos;ll Find
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Products for real moments and real spaces.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Our collection is developed around how people actually live,
              decorate, work and give.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                  className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
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
      <section className="container mx-auto  px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-12 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
                <PackageCheck className="h-8 w-8 text-premium" />

                <h3 className="mt-16 text-xl font-semibold">
                  Carefully selected
                </h3>

                <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
                  We focus on products that make sense for our customers rather
                  than simply increasing the number of items in our store.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <ShieldCheck className="h-8 w-8 text-premium" />

                <h3 className="mt-16 text-xl font-semibold">
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
          <div className="order-1 lg:order-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-premium">
              The RyzoBD Approach
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Selection matters more than quantity.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              E-commerce makes it easy to offer thousands of products. We prefer
              to be more selective.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              We consider how a product looks, how useful it is, who it is
              suitable for and whether it fits naturally within the RyzoBD
              collection.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Useful enough for everyday life",
                "Presentable enough for thoughtful gifting",
                "Selected with quality and value in mind",
                "Suitable for modern Bangladeshi customers",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-premium/15">
                    <div className="h-2 w-2 rounded-full bg-premium" />
                  </div>

                  <span className="text-sm font-medium sm:text-base">
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-premium">
              What We Value
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">
              Simple principles behind every choice.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
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
              <div key={value.number} className="bg-background p-7 sm:p-8">
                <span className="text-sm font-semibold text-premium">
                  {value.number}
                </span>

                <h3 className="mt-8 text-xl font-semibold">{value.title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-premium/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <Sparkles className="mx-auto h-7 w-7 text-premium" />

          <p className="mx-auto mt-7 max-w-4xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl md:leading-tight">
            “For your own space, your everyday life, or someone important —
            <span className="text-primary">
              {" "}
              the choice should feel special.
            </span>
            ”
          </p>

          <div className="mx-auto mt-8 h-px w-12 bg-premium" />

          <p className="mt-5 text-sm font-medium tracking-[0.15em] text-muted-foreground">
            RYZOBD
          </p>
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================== */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary">
          <div className="relative px-6 py-14 sm:px-10 md:px-14 md:py-16 lg:flex lg:items-center lg:justify-between">
            <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full border border-primary-foreground/10" />
            <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border border-primary-foreground/10" />

            <div className="relative max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white">
                Discover RyzoBD
              </p>

              <h2 className="text-3xl font-semibold text-primary-foreground sm:text-4xl">
                Find something worth choosing.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/70">
                Explore products selected for everyday use, better spaces and
                meaningful moments.
              </p>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-sm font-semibold text-primary transition hover:opacity-90"
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
