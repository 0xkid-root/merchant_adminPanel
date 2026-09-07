"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronRight, MessageSquare, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

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
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search */}
        <div className="relative hidden w-64 md:block lg:w-80 xl:w-96 group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="Search anything..."
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50/50 pl-9 pr-12 text-[13px] font-medium text-slate-900 transition-all placeholder:text-slate-500 hover:bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-900 dark:focus:ring-primary"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-1">
          <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-md border border-slate-200 bg-white shadow-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-md border border-slate-200 bg-white shadow-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <MessageSquare className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-1 h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-800">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
