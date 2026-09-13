import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/providers";
import Wrapper from "@/components/wrappers";
import { Suspense } from "react";

const quickSand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quick-sand",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ryzobd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "RyzoBD",

  title: {
    default: "RyzoBD | Shop Smart, Live Better",
    template: "%s | RyzoBD",
  },

  description:
    "Shop thoughtfully selected lifestyle products, desk accessories, home décor, gift packages and everyday essentials at RyzoBD. Shop Smart, Live Better.",

  keywords: [
    "RyzoBD",
    "Ryzo BD",
    "online shopping Bangladesh",
    "ecommerce Bangladesh",
    "lifestyle products Bangladesh",
    "gift shop Bangladesh",
    "gift packages Bangladesh",
    "desk accessories Bangladesh",
    "desk decor Bangladesh",
    "home decor Bangladesh",
    "unique gifts Bangladesh",
    "online gift shop Bangladesh",
  ],

  authors: [
    {
      name: "RyzoBD",
    },
  ],

  creator: "RyzoBD",
  publisher: "RyzoBD",

  category: "E-commerce",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_BD",

    url: "/",

    siteName: "RyzoBD",

    title: "RyzoBD | Shop Smart, Live Better",

    description:
      "Discover thoughtfully selected lifestyle products, desk accessories, home décor, gifts and everyday essentials from RyzoBD.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RyzoBD - Shop Smart, Live Better",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "RyzoBD | Shop Smart, Live Better",

    description:
      "Discover thoughtfully selected lifestyle products, desk accessories, home décor, gifts and everyday essentials from RyzoBD.",

    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quickSand.variable} ${inter.variable} antialiased`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {
              if(f.fbq)return;
              n=f.fbq=function(){
                n.callMethod
                  ? n.callMethod.apply(n,arguments)
                  : n.queue.push(arguments)
              };

              if(!f._fbq)f._fbq=n;

              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];

              t=b.createElement(e);
              t.async=!0;
              t.src=v;

              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);

            }(
              window,
              document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js'
            );

            fbq('init', '1624502275904993');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1624502275904993&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Suspense>
          <Provider>
            <Wrapper>
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
