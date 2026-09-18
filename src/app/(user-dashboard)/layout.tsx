"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  // Settings,
  Lock,
  LogOut,
  MapPin,
  User,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProtectedRoute from "@/components/auth/protect";
import { signOut, useSession } from "next-auth/react";
import { AUTH_PROVIDERS } from "@/constants";
interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "My Packages", href: "/my-packages", icon: Package },
  {
    title: "My Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Delivery Address",
    href: "/delivery-address",
    icon: MapPin,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  // console.log("session user", session);

  if (session?.user?.authProvider === AUTH_PROVIDERS["email-password"]) {
    if (!navItems.find((item) => item.href === "/change-password")) {
      navItems.push({
        title: "Change Password",
        href: "/change-password",
        icon: Lock,
      });
    }
  }

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <ProtectedRoute>
      <div className="container relative mx-auto flex flex-col lg:flex-row py-8">
        {/* Sidebar */}
        <Card className="sticky top-32 h-full w-full hidden lg:block lg:w-72 lg:ml-4 mb-4 lg:mb-0 border-none">
          <CardContent className="p-6">
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-primary hover:text-white",
                    pathname.includes(item.href)
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 bg-transparent"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-primary hover:text-white"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 lg:ml-8">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
