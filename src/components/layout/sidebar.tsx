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
  ArrowRightLeft,
  CheckSquare,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Grouped navigation structure
const sidebarGroups = [
  {
    label: "Overview",
    links: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Operations",
    links: [
      { title: "Merchants", href: "/merchant", icon: Store },
      { title: "Beneficiaries", href: "/beneficiaries", icon: Users },
      { title: "Payouts", href: "/payouts", icon: ArrowRightLeft },
      { title: "Transactions", href: "/transactions", icon: FileText },
    ],
  },
  {
    label: "Finance",
    links: [
      { title: "Wallet", href: "/wallet", icon: Wallet },
      { title: "Settlements", href: "/settlements", icon: FileText },
    ],
  },
  {
    label: "Control",
    links: [
      { title: "Approvals", href: "/approvals", icon: CheckSquare },
      { title: "Reports", href: "/reports", icon: FileText },
    ],
  },
  {
    label: "System",
    links: [
      { title: "Settings", href: "/settings", icon: Settings },
    ],
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
        "relative z-20 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950",
        isCollapsed ? "w-[72px]" : "w-[248px]",
        className
      )}
    >
      {/* Branding Area */}
      <div className={cn("flex h-[72px] items-center border-b border-slate-100 px-4", isCollapsed ? "justify-center" : "justify-between")}>
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-bold">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">AtMoonPe</span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">Admin Console</span>
            </div>
          )}
        </Link>

        {onClose && (
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={onClose}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Collapse Toggle Button (Desktop Only) */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-[80px] hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 lg:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white z-50"
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      )}
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 scrollbar-hide">
        <nav className="flex flex-col gap-6 px-3">
          {sidebarGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-1">
              {!isCollapsed && (
                <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {group.label}
                </div>
              )}
              {isCollapsed && <div className="mx-auto mb-2 h-px w-6 bg-slate-100" />}

              {group.links.map((link, linkIndex) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                
                return (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    onClick={onClose}
                    title={isCollapsed ? link.title : undefined}
                    className={cn(
                      "group relative flex items-center rounded-lg py-2.5 text-[14px] font-medium transition-all duration-200",
                      isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                      isActive
                        ? "bg-primary/5 text-primary"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                    )}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    
                    <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                    
                    {!isCollapsed && (
                      <span className="truncate">{link.title}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Profile Area */}
      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <button className={cn(
          "flex w-full items-center rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[13px] font-bold text-primary">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="w-full truncate text-[14px] font-semibold text-slate-900 dark:text-white">John Doe</span>
                <span className="w-full truncate text-[12px] font-medium text-slate-500">Administrator</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
}
