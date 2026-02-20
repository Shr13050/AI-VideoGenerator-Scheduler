"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Video, 
  Library, 
  Compass, 
  CreditCard, 
  Settings, 
  Plus, 
  Zap, 
  UserCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Series",
    icon: Library,
    href: "/dashboard/series",
  },
  {
    name: "Videos",
    icon: Video,
    href: "/dashboard/videos",
  },
  {
    name: "Guides",
    icon: Compass,
    href: "/dashboard/guides",
  },
  {
    name: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

const footerOptions = [
  {
    name: "Upgrade",
    icon: Zap,
    href: "/dashboard/upgrade",
    highlight: true
  },
  {
    name: "Profile Settings",
    icon: UserCircle,
    href: "/dashboard/profile",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-zinc-100 px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <Video className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-600">
            VidGen
          </span>
        </Link>
      </div>

      {/* Create New Series Button */}
      <div className="px-4 py-6">
        <Button 
          className="w-full justify-start gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-xl h-11"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
            <Plus className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-sm">New Series</span>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
          Menu
        </p>
        {sidebarOptions.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-4 w-4 transition-colors",
                  isActive ? "text-indigo-600" : "text-zinc-400 group-hover:text-zinc-700"
                )} />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-100 p-3 space-y-1">
        {footerOptions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              item.highlight 
                ? "bg-amber-50 text-amber-700 hover:bg-amber-100" 
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <item.icon className={cn(
              "h-4 w-4",
              item.highlight ? "text-amber-500" : "text-zinc-400 group-hover:text-zinc-700"
            )} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
