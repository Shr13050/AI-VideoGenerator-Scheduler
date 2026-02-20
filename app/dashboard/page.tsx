"use client";

import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Video,
  Calendar,
  Settings,
  BarChart3,
  Search,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 space-y-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Video className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">DigitalWorld</span>
        </div>

        <nav className="space-y-2">
          {[
            { name: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, active: true },
            { name: "My Videos", icon: <Video className="h-4 w-4" /> },
            { name: "Scheduler", icon: <Calendar className="h-4 w-4" /> },
            { name: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
            { name: "Settings", icon: <Settings className="h-4 w-4" /> },
          ].map((item) => (
            <div 
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search videos..." 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" /> New Video
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div className="flex gap-2 text-sm text-zinc-500">
              <span>Home</span>
              <span>/</span>
              <span className="text-white">Dashboard</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "Total Videos", value: "0", trend: "+0%" },
              { label: "Scheduled", value: "0", trend: "+0%" },
              { label: "Total Views", value: "0", trend: "+0%" },
              { label: "Engagement", value: "0%", trend: "+0%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                <p className="text-sm text-zinc-500 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-green-500">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Section Preview */}
          <div className="bg-linear-to-br from-blue-600/20 via-zinc-900 to-zinc-900 border border-blue-500/20 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Video className="h-32 w-32" />
            </div>
            <div className="max-w-xl space-y-4">
              <h2 className="text-xl font-bold">Ready to create your next viral hit?</h2>
              <p className="text-zinc-400">Describe your video idea and our AI will handle the script, visuals, and voiceover.</p>
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
                Generate Video
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
