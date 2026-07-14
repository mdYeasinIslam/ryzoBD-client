"use client";

import { ChevronRight, ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function MobileSidebarSheet(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: { _id: string; name: string; slug: string; image: string }[];
}) {
  const { isOpen, setIsOpen, categories = [] } = props;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-lg flex flex-col p-0"
      >
        <SheetHeader className="sticky top-0 z-20 bg-background px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Categories
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <div className="sticky top-0 z-20 bg-background px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              All Categories
            </SheetTitle>
          </div>
        </div>
        <div className="overflow-y-auto px-6 py-4">
          {categories.map((category) => (
            <Button
              variant="ghost"
              // href={`/products?category=${category.slug}`}
              className="flex border-none w-full items-center justify-between p-4 border-b hover:bg-gray-100 hover:text-primary"
              key={category._id}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={20}
                  height={20}
                  className="rounded-md"
                />
                <span>{category.name}</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
