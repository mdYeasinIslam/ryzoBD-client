import Link from "next/link";
import React from "react";
// import payment from "../../../public/svg/Payment.svg";
import instagram from "../../../public/svg/instagram.svg";
import youtube from "../../../public/svg/youtube.svg";
import facebook from "../../../public/svg/facebook.svg";
import bestPrice from "../../../public/svg/best-price.svg";
import refund from "../../../public/svg/refund.svg";
import delivery from "../../../public/svg/free-delivery.svg";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteInfo } from "@/config/site-info";

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
          <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
            <div className="bg-transparent p-3 rounded-lg">
              <Image
                src={bestPrice}
                priority
                alt="best price"
                className="w-14 h-12"
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground">
                Best Price & Deals
              </h4>
              <p className="text-muted-foreground">
                Do not miss our daily amazing deals and unbeatable prices
              </p>
            </div>
          </div>
          <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
            <div className="bg-transparent p-3 rounded-lg">
              <Image
                src={refund}
                priority
                alt="refund policy"
                className="w-14 h-12"
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground">
                Money Back Guarantee
              </h4>
              <p className="text-muted-foreground">
                If your items have any damage, we agree to refund it promptly
              </p>
            </div>
          </div>
          <div className="bg-background/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex items-center gap-4 border border-primary">
            <div className="bg-transparent p-3 rounded-lg">
              <Image
                src={delivery}
                priority
                alt="delivery"
                className="w-14 h-12"
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground">
                Quality Assurance
              </h4>
              <p className="text-muted-foreground">
                We ensure the best quality of our products for your satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 border-t border-gray-200">
          <div className="space-y-4">
            <Link href="/">
              <Image
                src={siteInfo.logo}
                alt="logo"
                objectFit="contain"
                width={160}
                height={50}
              />
            </Link>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3 hover:text-primary transition-colors">
                <MapPin className="text-primary h-5 w-5" />
                <span className="font-medium">{siteInfo.location}</span>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors">
                <a
                  href={`tel:${siteInfo.supportPhone}`}
                  className="flex items-center gap-3"
                >
                  <Phone className="text-primary h-5 w-5" />
                  <span className="font-medium">{siteInfo.supportPhone}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors">
                <a
                  href={`mailto:${siteInfo.supportEmail}`}
                  className="flex items-center gap-3"
                >
                  <Mail className="text-primary h-5 w-5" />
                  <span className="font-medium">{siteInfo.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">Account</h2>
            <ul className="space-y-3">
              {["Wishlist", "Cart", "Track Order", "Shipping Details"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">Useful Links</h2>
            <ul className="space-y-3">
              {["About Us", "Contact", "FAQ", "Terms & Conditions"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">Help Center</h2>
            <ul className="space-y-3">
              {["Support", "Live Chat", "Privacy Policy", "Returns"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 pb-20 lg:pb-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gray-600">
              © {new Date().getFullYear()}{" "}
              <Link href="/" className="text-primary font-medium">
                {siteInfo.copyrightOwnerName}
              </Link>
              . All rights reserved.
            </p>

            {/* <Image
              src={payment}
              priority
              alt="Payment Methods"
              className="h-8 object-contain"
            /> */}

            <div className="flex items-center gap-4">
              <Link target="_blank" href={siteInfo.socialLinks.facebook}>
                <Image
                  src={facebook}
                  priority
                  alt="facebook"
                  className="w-7 h-7"
                />
              </Link>
              <Link target="_blank" href={siteInfo.socialLinks.youtube}>
                <Image
                  src={youtube}
                  priority
                  alt="facebook"
                  className="w-9 h-9"
                />
              </Link>
              <Link target="_blank" href={siteInfo.socialLinks.instagram}>
                <Image
                  src={instagram}
                  priority
                  alt="facebook"
                  className="w-7 h-7"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
