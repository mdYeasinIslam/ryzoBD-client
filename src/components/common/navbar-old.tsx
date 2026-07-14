"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/svg/logo.svg";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import CartSheet from "./cart-sheet";
import { useAppSelector } from "@/redux/hooks";
import { siteInfo } from "@/config/site-info";
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-primary/80",
        pathname === href ? "text-primary" : ""
      )}
    >
      {children}
    </Link>
  );
};

const UserMenu = ({ session }: { session: Session | null }) => {
  return session ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-none">
          <button className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20 focus-visible:rounded-full">
            <Image
              src={session.user?.avatar || siteInfo.defaultUserAvatar}
              alt="avatar"
              objectFit="cover"
              fill
            />
          </button>
        </DropdownMenuTrigger>
        {/* <DropdownMenuTrigger className="px-4 py-2 flex items-center gap-3 rounded-lg border border-primary/20 bg-background hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
            <Image
              src={session.user?.avatar || siteInfo.defaultUserAvatar}
              alt="avatar"
              objectFit="cover"
              fill
            />
          </div>
          <span className="font-medium text-primary/90">
            {session.user?.name}
          </span>
          <ChevronDown className="w-4 h-4 text-primary/60" />
        </DropdownMenuTrigger> */}
        <DropdownMenuContent className="p-2 border border-primary/20 shadow-lg shadow-primary/10 absolute -right-4 top-2">
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-normal text-muted-foreground">
            {session.user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 bg-primary/10" />
          <DropdownMenuItem
            asChild
            className="px-2 py-1.5 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 rounded-md transition-colors"
          >
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="px-2 py-1.5 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 rounded-md transition-colors"
          >
            <Link href="/orders">Orders</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link href="/dashboard/help">Help Center</Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="px-2 py-1.5 cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50 rounded-md transition-colors"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Link href="/login">
      <Button>Log in</Button>
    </Link>
  );
};

const NavbarOld = () => {
  const products = useAppSelector((state) => state.cart.products);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpenCartSheet, setIsOpenCartSheet] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const { data: session } = useSession();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full">
      <CartSheet isOpen={isOpenCartSheet} setIsOpen={setIsOpenCartSheet} />
      <nav className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-between px-4 py-4">
          <div className="flex justify-between items-center lg:w-40">
            <Link
              href="/"
              className="flex items-center w-40 transition-opacity hover:opacity-90"
            >
              <Image src={logo} priority alt="logo" />
            </Link>

            <button
              onClick={toggleMenu}
              className="lg:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {showMenu ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className={cn(
              "lg:flex lg:flex-row gap-4 lg:gap-8 lg:justify-between w-full lg:ml-[15%]",
              "transform transition-all duration-300 ease-in-out",
              showMenu
                ? "opacity-100 max-h-[500px] visible"
                : "opacity-0 max-h-0 lg:opacity-100 lg:max-h-none invisible lg:visible"
            )}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center text-base font-semibold">
              {navLinks.map(({ href, label }) => (
                <li
                  key={href}
                  className="transform transition-transform duration-200 hover:translate-x-2 lg:hover:translate-x-0"
                >
                  <NavLink href={href}>{label}</NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 lg:mt-0 flex gap-6 items-center">
              <div className="border-r-2 border-primary pr-4">
                <p className="text-sm text-muted-foreground">Call For Order</p>
                <h1 className="text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
                  017xxxxxxx
                </h1>
              </div>

              <Button
                onClick={() => setIsOpenCartSheet(true)}
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Open shopping cart"
              >
                <ShoppingCart className="h-10 w-10" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {products.length}
                </span>
              </Button>

              <button
                className="hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <UserMenu session={session} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarOld;
