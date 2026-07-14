"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function FeatureProductCard() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 42,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                <Image
                  src="/images/image.png"
                  alt="Featured Product"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              <div className="p-8 lg:p-12 space-y-8">
                <div className="space-y-4">
                  <span className="text-sm font-medium text-primary">
                    Today&apos;s Hot Deals
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Original Stock Honey Combo Package
                  </h1>
                  <p className="text-muted-foreground">
                    Cur tantas regiones barbarorum obiit, tot maria transmisit
                    summo bono fruitur id est voluptate barbarorum
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-4 max-w-md">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center rounded-lg p-3"
                    >
                      <span className="text-2xl sm:text-3xl font-bold tabular-nums">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Deal of The Day
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
