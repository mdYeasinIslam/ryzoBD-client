import Link from "next/link";
import { siteInfo } from "@/config/site-info";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import facebook from "../../../public/svg/facebook.svg";
import instagram from "../../../public/svg/instagram.svg";
import youtube from "../../../public/svg/youtube.svg";

const FOOTER_SECTIONS = [
  {
    title: "Account",
    items: ["Wishlist", "Cart", "Track Order", "Shipping Details"],
  },
  {
    title: "Useful Links",
    items: ["About", "Contact", "FAQ", "Terms & Conditions"],
  },
  {
    title: "Help Center",
    items: ["Support", "Live Chat", "Privacy Policy", "Returns"],
  },
];

const SOCIAL_LINKS = [
  { src: facebook, alt: "facebook", href: "facebook", size: "w-7 h-7" },
  { src: youtube, alt: "youtube", href: "youtube", size: "w-9 h-9" },
  { src: instagram, alt: "instagram", href: "instagram", size: "w-7 h-7" },
];

const LinkItem = ({ item }: { item: string }) => (
  <li>
    <Link
      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
      className="text-gray-600 hover:text-primary transition-colors"
    >
      {item}
    </Link>
  </li>
);

const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div>
    <h2 className="text-xl font-bold mb-6">{title}</h2>
    <ul className="space-y-3">
      {items.map((item) => (
        <LinkItem key={item} item={item} />
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 border-t border-gray-200">
          {/* Company Info */}
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
              <li>
                <a
                  href={`tel:${siteInfo.supportPhone}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="text-primary h-5 w-5" />
                  <span className="font-medium">{siteInfo.supportPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.supportEmail}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="text-primary h-5 w-5" />
                  <span className="font-medium">{siteInfo.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-8 pb-20 lg:pb-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gray-600">
              © {currentYear}{" "}
              <Link href="/" className="text-primary font-medium">
                {siteInfo.copyrightOwnerName}
              </Link>
              . All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ src, alt, href, size }) => (
                <Link
                  key={alt}
                  target="_blank"
                  href={
                    siteInfo.socialLinks[
                      href as keyof typeof siteInfo.socialLinks
                    ]
                  }
                >
                  <Image src={src} priority alt={alt} className={size} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
