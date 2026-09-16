import type { Metadata } from "next";
import {
  AlertCircle,
  BadgeCheck,
  CreditCard,
  FileText,
  Gift,
  PackageCheck,
  RefreshCcw,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",

  description:
    "Read the Terms & Conditions for using RyzoBD, placing orders, making payments, receiving deliveries, and purchasing products or packages.",

  alternates: {
    canonical: "/terms-and-conditions",
  },

  openGraph: {
    title: "Terms & Conditions | RyzoBD",
    description:
      "Terms and conditions governing the use of RyzoBD and purchases made through our online store.",
    url: "/terms-and-conditions",
    type: "website",
  },
};

const TermsAndConditionsPage = () => {
  
  return (
    <main className="bg-background text-foreground">
      {/* =========================
          HERO
      ========================== */}
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
              <FileText className="h-4 w-4" />
              RyzoBD Policies
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              These Terms & Conditions explain the rules that apply when you
              browse RyzoBD, place an order, purchase a product or package, or
              otherwise use our services.
            </p>

            <p className="mt-5 text-xs text-muted-foreground sm:text-sm">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Introduction */}
          <div className="mb-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex gap-4">
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary sm:flex">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">Before using RyzoBD</h2>

                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  By accessing our website or placing an order through RyzoBD,
                  you agree to these Terms & Conditions and any policies
                  referenced on our website. Please read them carefully before
                  making a purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* 01 */}
            <TermSection
              number="01"
              icon={<ShoppingBag className="h-5 w-5" />}
              title="About RyzoBD"
            >
              <p>
                RyzoBD is an e-commerce and lifestyle shopping platform offering
                selected products, including lifestyle essentials, desk and home
                décor items, gifting products, curated packages, and other
                products made available through our store.
              </p>

              <p>
                Throughout these Terms, the words &quot;RyzoBD&quot;,
                &quot;we&quot;, &quot;us&quot;, and &quot;our&quot; refer to
                RyzoBD. &quot;Customer&quot;, &quot;you&quot;, and
                &quot;your&quot; refer to a person accessing or purchasing
                through our store.
              </p>
            </TermSection>

            {/* 02 */}
            <TermSection
              number="02"
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Products & Product Information"
            >
              <p>
                We aim to present product names, descriptions, specifications,
                images, prices, and other information as accurately as
                reasonably possible.
              </p>

              <p>
                Actual product appearance may vary slightly from photographs
                because of lighting, photography, screen settings, manufacturing
                variations, packaging changes, or other reasonable differences.
              </p>

              <p>
                Product availability may change without prior notice. An item
                appearing on the website does not guarantee that it will remain
                available at the time an order is processed.
              </p>
            </TermSection>

            {/* 03 */}
            <TermSection
              number="03"
              icon={<PackageCheck className="h-5 w-5" />}
              title="Orders & Order Confirmation"
            >
              <p>
                When you place an order, you are responsible for providing
                accurate information, including your name, phone number,
                delivery address, and other information necessary to process and
                deliver the order.
              </p>

              <p>
                Submission of an order does not necessarily mean that the order
                has been finally accepted. We may need to verify product
                availability, customer information, payment information, or
                delivery details before confirming an order.
              </p>

              <p>
                We may contact you using the information provided with your
                order when confirmation or clarification is necessary.
              </p>
            </TermSection>

            {/* 04 */}
            <TermSection
              number="04"
              icon={<CreditCard className="h-5 w-5" />}
              title="Pricing & Payment"
            >
              <p>
                Product and package prices are displayed on the relevant pages.
                The applicable price is generally the price displayed when an
                order is placed, subject to confirmation and correction of
                genuine technical or pricing errors.
              </p>

              <p>
                Discounts, promotional prices, package savings, coupon codes,
                and other offers may be subject to separate conditions and may
                be changed or discontinued when appropriate.
              </p>

              <p>
                Customers must use one of the payment methods currently
                supported by RyzoBD. Availability of particular payment methods
                may depend on the order, location, or services available at the
                time of checkout.
              </p>
            </TermSection>

            {/* 05 */}
            <TermSection
              number="05"
              icon={<Gift className="h-5 w-5" />}
              title="Packages & Bundled Products"
            >
              <p>
                RyzoBD may offer curated packages containing multiple products
                sold together at a package price.
              </p>

              <p>
                The products included in a package will be identified on the
                relevant package page. Package pricing may differ from the
                combined individual selling prices of the included products.
              </p>

              <p>
                Package availability may depend on the availability of the
                individual products included in that package.
              </p>

              <p>
                Any return, replacement, exchange, or cancellation involving a
                package will also be subject to the applicable RyzoBD return,
                refund, exchange, and cancellation policies.
              </p>
            </TermSection>

            {/* 06 */}
            <TermSection
              number="06"
              icon={<Truck className="h-5 w-5" />}
              title="Delivery"
            >
              <p>
                Delivery times shown or communicated by RyzoBD are estimates
                unless expressly stated otherwise. Delivery time may vary
                depending on destination, courier operations, product
                availability, public holidays, weather, or other circumstances.
              </p>

              <p>
                Customers are responsible for providing a complete and accurate
                delivery address and a reachable phone number.
              </p>

              <p>
                Applicable delivery charges, where any, will be communicated
                through the website, checkout process, or order confirmation.
              </p>
            </TermSection>

            {/* 07 */}
            <TermSection
              number="07"
              icon={<RefreshCcw className="h-5 w-5" />}
              title="Returns, Exchanges & Refunds"
            >
              <p>
                Eligibility for a return, exchange, replacement, or refund is
                governed by RyzoBD&apos;s applicable return and refund policy.
              </p>

              <p>
                Customers should inspect received products within the period
                specified in that policy and contact RyzoBD if there is an
                eligible issue with an order.
              </p>

              <p>
                Certain products or circumstances may have different return or
                exchange requirements. Please review the applicable policy
                before placing an order.
              </p>
            </TermSection>

            {/* 08 */}
            <TermSection
              number="08"
              icon={<AlertCircle className="h-5 w-5" />}
              title="Order Cancellation"
            >
              <p>
                Cancellation requests are subject to the status of the order. An
                order that has already been processed, packed, handed over for
                delivery, or delivered may not be cancellable in the same manner
                as an unprocessed order.
              </p>

              <p>
                RyzoBD may also cancel an order where fulfillment is not
                reasonably possible, including situations involving unavailable
                products, unsuccessful verification, invalid order information,
                payment issues, or genuine technical errors.
              </p>
            </TermSection>

            {/* 09 */}
            <TermSection
              number="09"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Customer Responsibilities"
            >
              <p>
                When using RyzoBD, you agree to provide accurate information and
                use the website and its services only for lawful purposes.
              </p>

              <p>
                You must not attempt to interfere with the website&apos;s
                operation, misuse its services, submit fraudulent orders,
                impersonate another person, or engage in activity intended to
                harm RyzoBD, its customers, or its service providers.
              </p>
            </TermSection>

            {/* 10 */}
            <TermSection
              number="10"
              icon={<FileText className="h-5 w-5" />}
              title="Intellectual Property"
            >
              <p>
                Unless otherwise stated, the RyzoBD brand identity and original
                website content, including relevant graphics, design elements,
                written content, and other proprietary materials, are owned by
                or licensed for use by RyzoBD.
              </p>

              <p>
                Such materials may not be copied, reproduced, distributed, or
                used commercially without appropriate authorization, except
                where permitted by applicable law.
              </p>
            </TermSection>

            {/* 11 */}
            <TermSection
              number="11"
              icon={<Scale className="h-5 w-5" />}
              title="Limitation & Availability of Services"
            >
              <p>
                We work to keep RyzoBD&apos;s website and services available and
                accurate, but temporary interruptions may occur because of
                maintenance, technical problems, third-party services, network
                issues, or circumstances outside our reasonable control.
              </p>

              <p>
                Nothing in these Terms is intended to exclude or limit rights or
                obligations that cannot lawfully be excluded or limited under
                applicable law.
              </p>
            </TermSection>

            {/* 12 */}
            <TermSection
              number="12"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Privacy"
            >
              <p>
                Information provided while using RyzoBD may be processed as
                described in our Privacy Policy. Customers should review that
                policy to understand how relevant information is collected,
                used, and handled.
              </p>
            </TermSection>

            {/* 13 */}
            <TermSection
              number="13"
              icon={<FileText className="h-5 w-5" />}
              title="Changes to These Terms"
            >
              <p>
                RyzoBD may update these Terms & Conditions when necessary to
                reflect changes to our services, business operations, policies,
                or applicable requirements.
              </p>

              <p>
                The latest version will be published on this page together with
                an updated revision date. Continued use of the website after an
                update will be subject to the then-current Terms & Conditions.
              </p>
            </TermSection>

            {/* 14 */}
            <TermSection
              number="14"
              icon={<Scale className="h-5 w-5" />}
              title="Governing Law"
            >
              <p>
                These Terms & Conditions are intended to operate in accordance
                with the applicable laws and regulations of Bangladesh.
              </p>
            </TermSection>
          </div>

          {/* =========================
              CONTACT CARD
          ========================== */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-primary/10 bg-primary text-primary-foreground sm:mt-12">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                  Need clarification?
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Questions about our terms?
                </h2>

                <p className="mt-3 text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  If you have a question about an order, product, package, or
                  any part of these Terms & Conditions, please contact RyzoBD
                  through our official support channels.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-background/90"
                >
                  Contact RyzoBD
                </Link>
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="mt-10 text-center sm:mt-12">
            <p className="text-lg font-bold">RyzoBD</p>

            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Shop Smart, Live Better
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditionsPage;

/* ========================================
   REUSABLE TERM SECTION
======================================== */

type TermSectionProps = {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const TermSection = ({ number, title, icon, children }: TermSectionProps) => {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 lg:p-7">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-bold tracking-wider text-muted-foreground">
              {number}
            </span>

            <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
          </div>

          <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
