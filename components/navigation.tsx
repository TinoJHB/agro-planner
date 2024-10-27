"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Sprout,
  Calendar,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Farms",
    icon: Sprout,
    href: "/farms",
    color: "text-emerald-500",
  },
  {
    label: "Planning",
    icon: Calendar,
    href: "/planning",
    color: "text-violet-500",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center">
          <Sprout className="h-6 w-6 text-emerald-500" />
          <span className="ml-2 text-xl font-bold">AgroPlanner</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4 ml-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center ml-auto space-x-4">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden ml-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-lg",
                    pathname === route.href
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}