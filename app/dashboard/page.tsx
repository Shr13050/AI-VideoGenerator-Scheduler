"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Video,
  Plus,
  Play,
  TrendingUp,
  Clock,
  Eye,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-zinc-900 border-l-2 border-indigo-600 pl-3">Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-4 transition-all hover:shadow-lg hover:shadow-zinc-200">
            <Plus className="h-4 w-4 mr-2" /> New Video
          </Button>
          <div className="h-8 w-px bg-zinc-200 mx-1" />
          <UserButton afterSignOutUrl="/" appearance={{
            elements: {
              avatarBox: "h-8 w-8 rounded-lg"
            }
          }} />
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back!</h2>
            <p className="text-zinc-500 mt-1">Here's what's happening with your video series today.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-zinc-200 shadow-sm">
            <Button variant="ghost" size="sm" className="rounded-lg text-xs font-semibold">Last 7 days</Button>
            <Button variant="secondary" size="sm" className="rounded-lg text-xs font-semibold bg-zinc-100">Last 30 days</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Videos", value: "12", trend: "+2 this week", icon: Video, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Views", value: "2.4k", trend: "+12.5%", icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Watch Time", value: "148h", trend: "+8.2%", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Growth", value: "+24%", trend: "Above average", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((stat) => (
            <div key={stat.label} className="group bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="bg-zinc-50 text-zinc-500 hover:bg-zinc-100 border-none font-medium">
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-600 to-blue-700 p-8 text-white shadow-xl shadow-indigo-100">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-indigo-300 animate-pulse" />
              New feature: AI Scriptwriter is here!
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Ready to create your next viral hit?</h2>
              <p className="text-indigo-100 text-lg leading-relaxed">
                Describe your video idea and our AI will handle the script, visuals, and voiceover in seconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-zinc-100 rounded-xl px-8 font-bold shadow-lg shadow-black/10">
                <Play className="h-4 w-4 mr-2 fill-current" /> Generate Video
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-xl border border-white/20">
                Learn how it works <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Abstract Decorations */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
          <Video className="absolute -right-8 bottom-8 h-48 w-48 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
}
