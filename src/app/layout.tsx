import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/providers";
import Wrapper from "@/components/wrappers";
import { Suspense } from "react";
// import NavbarOld from "@/components/common/navbar-old";

// TODO: need to remove commented these fonts
// const heebo = localFont({
//   src: "./fonts/Heebo-VariableFont_wght.ttf",
//   variable: "--font-heebo",
//   weight: "100 900",
// });
// const alfaSlabOne = localFont({
//   src: "./fonts/AlfaSlabOne-Regular.ttf",
//   variable: "--font-alfa-slab-one",
//   weight: "100 900",
// });

const quickSand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quick-sand",
  weight: "100 900",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",

  // Optional explicit fallbacks
  fallback: ["Arial", "sans-serif"],
});
export const metadata: Metadata = {
  title: "RayzoShop",
  description:
    "It's an e-commerce website for RayzoShop. You can buy your favorite products from here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable} ${inter.variable} antialiased`}>
        {/* TODO: This suspense boundary added cause without this boundary build error happening */}
        <Suspense>
          <Provider>
            <Wrapper>
              {/* <NavbarOld /> */}
              <Header />
              {children}
              <Toaster />
              <Footer />
            </Wrapper>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
