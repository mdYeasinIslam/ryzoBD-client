import { siteInfo } from "@/config/site-info";
import {
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

const ContactPage = () => {
  return (
    <main className="bg-background text-foreground">
      {/* =========================================
          HERO
      ========================================== */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-primary/20">
          <div className="absolute -right-32 -top-36 h-[400px] w-[400px] rounded-full bg-premium/10 blur-3xl" />
          <div className="absolute  -bottom-36 -left-28 h-[340px] w-[340px] rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-24 pt-5">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-premium/30 bg-premium/10 px-4 py-2 text-sm font-medium">
              <MessageCircle className="h-4 w-4 text-premium" />
              Contact RyzoBD
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              We&apos;re here to help.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question about a product, order, delivery or anything else?
              Send us a message and our team will get back to you as soon as
              possible.
            </p>

            <p className="mt-5 text-sm font-medium text-muted-foreground">
              RyzoBD —{" "}
              <span className="text-foreground">Shop Smart, Live Better</span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT CONTENT
      ========================================== */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-premium">
              Get in touch
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Need assistance?
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Whether you need help choosing a product, checking an order or
              getting more information, you can reach RyzoBD through any of the
              channels below.
            </p>

            <div className="mt-10 space-y-4">
              {/* Phone */}
              <a
                href={`tel:${siteInfo.supportPhone}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-premium/40 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Call us</p>
                  <p className="mt-1 font-semibold">{siteInfo.supportPhone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@ryzobd.com"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-premium/40 hover:shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email us</p>
                  <p className="mt-1 font-semibold">{siteInfo.supportEmail}</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="mt-1 font-semibold">{siteInfo.location}</p>
                </div>
              </div>

              {/* Business hours */}
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Customer support
                  </p>
                  <p className="mt-1 font-semibold">
                    {siteInfo.customerSupport.days}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {siteInfo.customerSupport.time}
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-10">
              <p className="text-sm font-semibold">Follow RyzoBD</p>

              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Facebook className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="#"
                  aria-label="Messenger"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* =========================================
              CONTACT FORM
          ========================================== */}
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-premium">
                Send a message
              </p>

              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                How can we help you?
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Fill out the form below and provide as much detail as possible.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/10"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/10"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/10"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="product">Product Information</option>
                  <option value="order">Order Related</option>
                  <option value="delivery">Delivery Related</option>
                  <option value="return">Return / Exchange</option>
                  <option value="gift">Gift & Bundle Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Order ID */}
              <div>
                <label
                  htmlFor="orderId"
                  className="mb-2 block text-sm font-medium"
                >
                  Order ID
                  <span className="ml-1 font-normal text-muted-foreground">
                    (optional)
                  </span>
                </label>

                <input
                  id="orderId"
                  name="orderId"
                  type="text"
                  placeholder="Example: RYZ-12345"
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/10"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                By sending this form, you allow RyzoBD to contact you regarding
                your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================
          QUICK HELP
      ========================================== */}
      <section className="border-y border-border bg-secondary/60">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-premium">
                Quick Help
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Looking for a quick answer?
              </h2>

              <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                For common questions about ordering, delivery, returns and
                payments, our support information can help you faster.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Order & Payment",
                  text: "Questions about placing an order, payment options or order confirmation.",
                },
                {
                  title: "Delivery",
                  text: "Information about delivery areas, expected timelines and delivery updates.",
                },
                {
                  title: "Returns & Exchange",
                  text: "Need help with a damaged, incorrect or exchangeable product?",
                },
                {
                  title: "Product Support",
                  text: "Ask us about product features, availability or choosing the right item.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL BRAND STRIP
      ========================================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary">
          <div className="relative px-6 py-12 text-center sm:px-10 lg:py-16">
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full border border-primary-foreground/10" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full border border-primary-foreground/10" />

            <p className="relative text-sm uppercase tracking-[0.22em] text-white">
              RyzoBD
            </p>

            <h2 className="relative mt-4 text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Shop Smart, Live Better
            </h2>

            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-primary-foreground/70 sm:text-base">
              Thoughtfully selected products for everyday life, better spaces
              and meaningful moments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
