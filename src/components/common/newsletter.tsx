"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Leaf } from "lucide-react";
import Image from "next/image";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    // console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="container mx-auto px-4">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/30 to-primary/20 p-6 md:p-0">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] opacity-10" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 opacity-20">
          <Leaf className="h-40 w-40 rotate-45 text-primary/40" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-30">
          <Leaf className="h-32 w-32 -rotate-45 text-primary/40" />
        </div>

        <div className="relative mx-auto ">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center ">
            {/* Left column - Text content */}
            <div className="space-y-2 lg:space-y-4 p-4 lg:p-10">
              {/* Newsletter Header with Ribbon Effect */}
              <div className="relative inline-block mb-2 lg:mb-8">
                <div className="bg-primary text-primary-foreground text-xl lg:text-2xl font-bold py-2 px-6 relative">
                  Newsletter
                  {/* Left ribbon tail */}
                  <div className="absolute left-0 bottom-0 translate-y-full border-l-[20px] border-l-transparent border-t-[12px] border-t-primary/50"></div>
                  {/* Right ribbon tail */}
                  <div className="absolute right-0 bottom-0 translate-y-full border-r-[20px] border-r-transparent border-t-[12px] border-t-primary/50"></div>
                </div>
              </div>

              <h2 className="text-3xl md:text-2xl lg:text-4xl font-bold text-primary">
                Subscribe Newsletter
                <span className="block">to get Offers</span>
              </h2>
              <p className="text-muted-foreground max-lg:text-sm max-w-md">
                Enjoy early access to sales, new product launches, expert
                advice, and special offers delivered straight to your inbox.
              </p>

              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="relative flex shadow-lg rounded-md overflow-hidden bg-background">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Send size={18} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-0 pl-10 pr-0 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    className="px-6 h-12 rounded-none font-bold"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>

            {/* Right column - Image */}
            <div className="relative hidden  md:block w-full h-full max-lg:min-h-[auto]">
              <div className=" h-full">
                <Image
                  src="https://storage.googleapis.com/giftlist-31067.appspot.com/blog/assets/heroes/eid-gift-etiquette-for-non-muslims.webp?v=r2"
                  // src="/images/newsletter.png"
                  alt="RyzoBD Newsletter"
                  fill
                  className="w-full h-full  rounded-lg object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
