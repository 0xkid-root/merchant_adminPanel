"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  Users,
  Wallet,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Merchant",
    href: "/merchant",
    icon: Store,
  },
  {
    title: "Beneficiaries",
    href: "/beneficiaries",
    icon: Users,
  },
  {
    title: "Wallet",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({
  className,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: {
  className?: string;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 relative z-20",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className={cn("flex h-16 items-center border-b px-4", isCollapsed ? "justify-center" : "justify-between")}>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            A
          </div>
          {!isCollapsed && <span>AtmoonPe</span>}
        </Link>
        {!isCollapsed && onToggleCollapse && (
          <Button variant="ghost" size="icon" className="hidden lg:flex shrink-0" onClick={onToggleCollapse}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        {isCollapsed && onToggleCollapse && (
          <Button variant="ghost" size="icon" className="hidden lg:flex shrink-0 mt-4 absolute -right-4 top-12 bg-white border shadow-sm rounded-full h-8 w-8 z-50 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onToggleCollapse}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {onClose && (
          <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onClose}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-auto py-6 px-4">
        <nav className="grid gap-2">
          {sidebarLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            return (
              <Link
                key={index}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-lg py-2.5 text-sm font-medium transition-all hover:text-primary overflow-hidden",
                  isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                )}
                title={isCollapsed ? link.title : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                {!isCollapsed && <span className="truncate">{link.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto border-t p-4">
        <div className={cn("flex items-center rounded-lg bg-muted/50 p-2", isCollapsed ? "justify-center" : "gap-3")}>
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">John Doe</span>
              <span className="text-xs text-muted-foreground truncate">Admin</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
