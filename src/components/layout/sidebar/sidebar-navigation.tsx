"use client";

import { NAVIGATION_CONFIG } from "@/config/navigation";
import { SidebarGroup } from "./sidebar-group";

export function SidebarNavigation() {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 scrollbar-hide">
      <nav className="flex flex-col gap-6 px-3">
        {NAVIGATION_CONFIG.map((group, index) => (
          <SidebarGroup key={index} group={group} />
        ))}
      </nav>
    </div>
  );
}
