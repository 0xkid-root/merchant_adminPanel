"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  
  // Create a simple breadcrumb from the pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : "Dashboard";

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 xl:px-8 dark:border-slate-800 dark:bg-slate-950">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-500" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        
        <div className="hidden items-center text-sm font-medium text-slate-500 sm:flex">
          <span>Overview</span>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span>
        </div>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Global Search */}
        <div className="relative hidden w-64 md:block lg:w-80 xl:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="search" 
            placeholder="Search merchants, payouts, transactions..." 
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-[13px] font-medium text-slate-900 transition-all placeholder:text-slate-400 hover:bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-900 dark:focus:bg-slate-950"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
