"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronRight, MessageSquare } from "lucide-react";
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
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-[#f8f8f9] px-4 md:px-6 xl:px-8 dark:border-slate-800 dark:bg-slate-950">
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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search */}
        <div className="relative hidden w-64 md:block lg:w-80 xl:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-full border-none bg-white pl-10 pr-4 text-[13px] font-medium text-slate-900 transition-all placeholder:text-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm dark:bg-slate-900 dark:text-white dark:focus:ring-slate-800"
          />
        </div>



        <div className="flex items-center gap-2 ml-1">
          <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-full border-transparent bg-white shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-all hover:scale-105">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-full border-transparent bg-white shadow-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-all hover:scale-105">
            <MessageSquare className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>

          {/* Profile Avatar */}
          <button className="ml-1 h-10 w-10 overflow-hidden rounded-full border-[3px] border-white bg-slate-200 shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
