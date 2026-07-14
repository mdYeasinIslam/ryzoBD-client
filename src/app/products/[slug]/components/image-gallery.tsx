"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const ImageGallery = (props: { images: string[] }) => {
  const { images = [] } = props;
  const [currentImage, setCurrentImage] = React.useState(0);
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };
  return (
    <div className="relative">
      <div className="sticky top-4 flex gap-6">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-4">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={cn(
                "relative h-24 w-24 rounded-xl border-2 overflow-hidden transition-all duration-200 hover:scale-105",
                currentImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-primary/50"
              )}
            >
              <Image
                src={src}
                alt={`Product view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative flex-1 aspect-square">
          <Image
            src={images[currentImage]}
            alt="Product showcase"
            fill
            className="object-contain rounded-2xl shadow-lg p-10"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={previousImage}
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextImage}
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
