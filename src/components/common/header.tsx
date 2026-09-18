"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  Boxes,
  Home,
  Lock,
  LogOut,
  MapPin,
  // Menu,
  // Menu,
  Phone,
  // Search,
  // Settings,
  ShoppingBag,
  ShoppingCart,
  // Tag,
  // Ticket,
  User,
  CopyPlus,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import CartSheet from "./cart-sheet";
import { signOut, useSession } from "next-auth/react";
import { AUTH_PROVIDERS } from "@/constants";
import { useGetCategoriesQuery } from "@/redux/features/category/category-api";
import { cn, setSearchParams } from "@/lib/utils";
import { siteInfo } from "@/config/site-info";
// import MobileSidebarSheet from "./mobile-sidebar-sheet";
const accountsNavItems = [
  { icon: User, label: "Profile", href: "/profile" },
  {
    icon: Package,
    label: "My-packages",
    href: "/my-packages",
  },
  { icon: ShoppingBag, label: "Orders", href: "/orders" },
  {
    icon: MapPin,
    label: "Delivery Address",
    href: "/delivery-address",
  },
];
export default function Component() {
  const [isOpenCartSheet, setIsOpenCartSheet] = React.useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);
  // TODO: Mobile menu will be added later if needed
  // const [isOpenMobileSidebarSheet, setIsOpenMobileSidebarSheet] =
  //   React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const products = useAppSelector((state) => state.cart.products);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const isProductsPage = pathname === "/products";

  // TODO: will be implemented loader for product loading for search
  // const [, startTransition] = React.useTransition();
  const { data: { data: { categories = [] } = {} } = {} } =
    useGetCategoriesQuery({
      limit: 999,
      status: "published",
    });
  const [categoryName, setCategoryName] = React.useState<string | null>("All");

  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = React.useCallback(() => {
    signOut({ redirect: true, callbackUrl: "/" });
    setIsDrawerOpen(false);
  }, []);

  const totalItems = React.useMemo(
    () => products.reduce((acc, product) => acc + product.quantity, 0),
    [products],
  );

  const mainNavLinks = React.useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/products", label: "Shop" },
      { href: "/packages", label: "Packages" },
      { href: "/packages/create", label: "Create Packages" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    [],
  );

  const mobileNavLinks = React.useMemo(
    () => [
      { href: "/", label: "Home", icon: Home },
      { href: "/products", label: "Shop", icon: ShoppingBag },
      { href: "/packages", label: "Packages", icon: Boxes },
      { href: "/packages/crate", label: "Create Packages", icon: CopyPlus },
      // { href: "/about", label: "About", icon: ShoppingBag },
    ],
    [],
  );

  const handleSearch = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const query = (form.get("query") as string | null)?.trim() ?? "";

      if (!query) return;

      if (!isProductsPage) {
        router.push(`/products?search=${encodeURIComponent(query)}`);
        return;
      }

      router.push(
        setSearchParams({
          searchParams: searchParams.toString(),
          params: { search: query },
        }),
      );
    },
    [isProductsPage, router, searchParams],
  );

  const getCategoryHref = React.useCallback(
    (category: string) => {
      const baseParams = isProductsPage ? searchParams.toString() : "";

      return isProductsPage
        ? setSearchParams({
            searchParams: baseParams,
            params: { category },
            removeParams: ["page"],
          })
        : setSearchParams({
            path: "/products",
            searchParams: baseParams,
            params: { category },
            removeParams: ["page"],
          });
    },
    [isProductsPage, searchParams],
  );
  return (
    <>
      <header className="border-b border-b-muted sticky top-0 z-40 bg-background">
        <CartSheet isOpen={isOpenCartSheet} setIsOpen={setIsOpenCartSheet} />
        {/* TODO: Mobile sidebar will be added later */}
        {/* <MobileSidebarSheet
          isOpen={isOpenMobileSidebarSheet}
          setIsOpen={setIsOpenMobileSidebarSheet}
          categories={categories}
        /> */}
        <div className="container mx-auto flex px-4 py-2 items-center">
          <div className="flex w-full items-center justify-between gap-4 lg:gap-6">
            <Link href="/" className="lg:hidden block">
              <Image
                src={siteInfo.smLogo}
                alt="logo"
                objectFit="contain"
                width={200}
                height={200}
                className="h-[50px] w-auto"
              />
            </Link>
            <Link href="/" className="hidden lg:block">
              <Image
                src={siteInfo.logo}
                alt="logo"
                objectFit="contain"
                width={200}
                height={50}
                className=""
              />
            </Link>
            <form onSubmit={handleSearch} className="flex max-w-2xl flex-1">
              <Input
                name="query"
                defaultValue={
                  pathname === "/products" && searchQuery ? searchQuery : ""
                }
                className="rounded-r-none bg-muted border-none focus-visible:ring-0"
                placeholder="Search for items..."
                type="search"
              />
              <Button
                type="submit"
                className="rounded-l-none font-semibold h-12 w-20"
              >
                Search
              </Button>
            </form>
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={() => setIsOpenCartSheet(true)}
                variant="ghost"
                size="icon"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute flex items-center justify-center -right-1 -top-1 h-5 w-5 rounded-full p-0">
                  {totalItems}
                </Badge>
                <span className="sr-only">Cart</span>
              </Button>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus-visible:outline-none">
                    <button className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 focus-visible:rounded-full">
                      <Image
                        src={session.user?.avatar || siteInfo.defaultUserAvatar}
                        alt="avatar"
                        objectFit="cover"
                        fill
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="absolute -right-4 top-2 min-w-60 border p-0">
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3 rounded-lg bg-muted p-3 py-2">
                        <button className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow ring-2 ring-primary/20 focus-visible:rounded-full">
                          <Image
                            src={
                              session.user?.avatar || siteInfo.defaultUserAvatar
                            }
                            alt="avatar"
                            objectFit="cover"
                            fill
                          />
                        </button>
                        <div className="space-y-0.5">
                          <h3 className="text-base font-medium">
                            {session.user?.name}
                          </h3>
                          <h4 className="max-w-40 break-words text-[12px] font-normal text-muted-foreground">
                            {session.user?.email}
                          </h4>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-muted dark:bg-muted-foreground" />
                    {[
                      { href: "/profile", icon: User, label: "Profile" },
                      {
                        href: "/my-packages",
                        icon: Package,
                        label: "My-packages",
                      },
                      { href: "/orders", icon: ShoppingBag, label: "Orders" },
                    ].map((item) => (
                      <DropdownMenuItem
                        key={item.href}
                        asChild
                        className="cursor-pointer gap-2 rounded-md px-2 ps-4 py-3 font-semibold transition-colors hover:text-primary focus:bg-secondary focus:text-primary"
                      >
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" /> {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-muted dark:bg-muted-foreground" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer gap-2 rounded-md px-2 ps-4 py-3 font-semibold transition-colors hover:text-primary focus:bg-secondary focus:text-primary"
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <button className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-primary/20 focus-visible:rounded-full">
                    <Image
                      src={siteInfo.defaultUserAvatar}
                      alt="avatar"
                      objectFit="cover"
                      fill
                    />
                    {/* <User className="h-5 w-5" /> */}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <nav className="border-t border-t-muted py-2 hidden lg:block bg-primary/30 mb-2">
          <div className="container mx-auto px-4 flex items-center justify-between gap-6">
            <div className="">
              {pathname === "/products" ? (
                <div className="min-w-[214px] min-h-9"></div>
              ) : (
                <>
                  <DropdownMenu
                    open={isCategoryMenuOpen}
                    onOpenChange={setIsCategoryMenuOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button className="font-bold focus-visible:outline-none font-inter">
                        {/* <Menu className="h-5 w-5 mr-2" /> */}
                        Browse All Categories
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {/* <DropdownMenuItem
                        onSelect={() => setIsCategoryMenuOpen(false)}
                      >
                        <Link
                          // href={setSearchParams({
                          //   searchParams: searchParams.toString(),
                          //   params: { category: "" },
                          //   removeParams: ["page"],
                          // })}
                          href={getCategoryHref("")}
                          onClick={() => setCategoryName("All")}
                          className={cn(
                            "flex items-center justify-center w-full text-sm font-semibold cursor-pointer  hover:bg-primary  hover:text-white transition-colors rounded-md px-2 py-1",
                            categoryName === "All" && "bg-primary text-white",
                          )}
                        >
                          <span>All</span>
                        </Link>
                      </DropdownMenuItem> */}
                      {categories?.map(
                        (category: {
                          _id: string;
                          image: string;
                          name: string;
                          slug: string;
                        }) => (
                          <Link
                            // href={setSearchParams({
                            //   searchParams: searchParams.toString(),
                            //   params: { category: category.slug },
                            //   removeParams: ["page"],
                            // })}
                            key={category._id}
                            href={getCategoryHref(category.slug)}
                            onClick={() => setCategoryName(category.slug)}
                            className={cn(
                              "flex items-center gap-2 hover:text-white focus:text-white  hover:bg-primary py-2 cursor-pointer",
                            )}
                          >
                            <DropdownMenuItem
                              onSelect={() => setIsCategoryMenuOpen(false)}
                              // onMouseOut={() => setIsCategoryMenuOpen(false)}
                              className={cn(
                                "flex items-center focus:bg-primary focus:text-white hover:bg-primary cursor-pointer",
                                // category.slug === categoryName &&
                                //   "bg-primary text-white",
                              )}
                            >
                              <Image
                                src={category.image}
                                alt={category.name}
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                              <span className="text-sm font-bold font-inter">
                                {category.name}
                              </span>
                            </DropdownMenuItem>
                          </Link>
                        ),
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
            {/* nav links */}
            <div className="flex items-center gap-4">
              {mainNavLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  className={cn(
                    "flex items-center gap-1 text-base font-semibold hover:underline cursor-pointer",
                    pathname === href && "text-primary underline",
                  )}
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center  gap-2 ">
              <a
                href={`tel:${siteInfo.supportPhone}`}
                className="flex items-center gap-2 hover:underline text-primary font-bold"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">{siteInfo.supportPhone}</span>
              </a>
              <span className="text-sm text-muted-foreground">
                24/7 support center
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed z-10 bottom-0 left-0 right-0 border-t bg-background lg:hidden">
        <nav className="container mx-auto flex items-center justify-between px-2 py-2">
          {/* TODO: Mobile menu option will be added later */}
          {/* <button
            onClick={() => setIsOpenMobileSidebarSheet((prev) => !prev)}
            className="flex flex-col items-center gap-1"
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs font-medium">Menu</span>
          </button> */}
          {mobileNavLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap- w-fit  text-center",
                pathname === href && "text-primary",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-semibold px-0.5">{label}</span>
            </Link>
          ))}
          {/* <Link href="#" className="flex flex-col items-center gap-1 relative">
            <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            <Badge className="absolute -right-1 top-0 h-5 w-5 rounded-full p-0">
              2
            </Badge>
            <span className="text-xs font-semibold">Cart</span>
          </Link> */}
          <Button
            onClick={() => setIsOpenCartSheet(true)}
            variant="ghost"
            size="icon"
            className="relative flex flex-col items-center gap-1 hover:bg-transparent"
          >
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute flex items-center justify-center -right-1 -top-2 h-5 w-5 rounded-full p-0">
              {totalItems}
            </Badge>
            <span className="text-xs font-semibold">Cart</span>
          </Button>
          {/* <Link href="#" className="flex flex-col items-center gap-1">
            <Tag className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Offer</span>
          </Link> */}
          {session ? (
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent"
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                <User className="h-6 w-6" />
                <span className="text-xs">Account</span>
              </Button>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>My Account</DrawerTitle>
                  <DrawerDescription>
                    Manage your account settings and preferences.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-4 p-4">
                  {accountsNavItems?.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="flex items-center justify-start gap-2"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        router.push(item.href);
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                  {session.user?.authProvider ===
                    AUTH_PROVIDERS["email-password"] && (
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start gap-2"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        router.push("/change-password");
                      }}
                    >
                      <Lock className="h-5 w-5" />
                      Change Password
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto p-0 hover:bg-transparent"
              onClick={() => router.push("/login")}
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-semibold">Account</span>
            </Button>
          )}
        </nav>
      </div>
    </>
  );
}
