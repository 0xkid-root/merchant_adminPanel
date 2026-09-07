"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

export function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  if (!item.href) return null;

  const Icon = item.icon;
  // Check exact match or sub-route match
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.title : undefined}
      className={cn(
        "group relative flex items-center rounded-xl py-2.5 text-[14px] font-medium transition-all duration-200 outline-none my-0.5",
        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
        isActive
          ? "bg-white text-[#5244e1] shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 dark:text-white"
          : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-900 focus-visible:bg-slate-200/50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
      )}
    >

      <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />

      {!isCollapsed && (
        <span className="truncate">{item.title}</span>
      )}
    </Link>
  );
}
