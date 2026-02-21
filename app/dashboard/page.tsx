"use client";

import { 
  Video, 
  Plus, 
  Play, 
  TrendingUp, 
  Clock, 
  Eye, 
  ArrowRight,
  MoreVertical,
  Edit2,
  Trash2,
  Pause,
  History,
  Zap,
  ExternalLink,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserButton, useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { toast } from "sonner";

const VIDEO_STYLES = [
  { id: "realistic", name: "Realistic", image: "/videoStyle/realistic.png" },
  { id: "cinematic", name: "Cinematic", image: "/videoStyle/cinematic.png" },
  { id: "anime", name: "Anime", image: "/videoStyle/anime.png" },
  { id: "cyberpunk", name: "Cyberpunk", image: "/videoStyle/cyberpunk.png" },
  { id: "gta", name: "GTA Style", image: "/videoStyle/gta.png" },
  { id: "3d-render", name: "3D Render", image: "/videoStyle/3d-render.png" }
];

export default function DashboardPage() {
  const { user } = useUser();
  const [series, setSeries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSeries();
    }
  }, [user]);

  const fetchSeries = async () => {
    try {
      const response = await fetch("/api/get-series");
      if (!response.ok) throw new Error("Failed to fetch series");
      const data = await response.json();
      setSeries(data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
      toast.error("Failed to load series");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "paused" ? "scheduled" : "paused";
    try {
      const { error } = await supabase
        .from("video_series")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      setSeries(series.map(s => s.id === id ? { ...s, status: newStatus } : s));
      toast.success(`Series ${newStatus === "paused" ? "paused" : "resumed"}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteSeries = async (id: string) => {
    if (!confirm("Are you sure you want to delete this series?")) return;
    try {
      const { error } = await supabase
        .from("video_series")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setSeries(series.filter(s => s.id !== id));
      toast.success("Series deleted");
    } catch (error) {
      toast.error("Failed to delete series");
    }
  };

  const triggerGeneration = async (id: string) => {
    toast.info("Generation triggered! This will appear in your videos soon.");
    // In a real app, this would call an edge function or queue a job
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-50/50 min-h-screen">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-zinc-900 border-l-2 border-indigo-600 pl-3">My Scheduled Series</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/create">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 transition-all hover:shadow-lg hover:shadow-indigo-200">
              <Plus className="h-4 w-4 mr-2" /> New Series
            </Button>
          </Link>
          <div className="h-8 w-px bg-zinc-200 mx-1" />
          <UserButton afterSignOutUrl="/" appearance={{
            elements: {
              avatarBox: "h-8 w-8 rounded-lg"
            }
          }} />
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">My Scheduled Series</h2>
              <p className="text-zinc-500 text-sm mt-1">Manage and monitor your automated video content.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[400px] rounded-3xl bg-white border border-zinc-200 animate-pulse" />
              ))}
            </div>
          ) : series.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-zinc-200">
              <div className="p-4 bg-zinc-50 rounded-full mb-4">
                <Video className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No series scheduled</h3>
              <p className="text-zinc-500 mb-6">Create your first automated video series to get started.</p>
              <Link href="/dashboard/create">
                <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 font-bold">
                  Create New Series
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {series.map((item) => {
                const styleInfo = VIDEO_STYLES.find(s => s.id === item.video_style);
                return (
                  <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 overflow-hidden">
                    {/* Thumbnail Section */}
                    <div className="relative aspect-4/5 overflow-hidden m-2 rounded-[2rem]">
                      <img 
                        src={styleInfo?.image || '/placeholder-thumb.png'} 
                        alt={item.series_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Edit Button on Thumbnail */}
                      <Link href={`/dashboard/create?id=${item.id}`}>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute top-4 right-4 h-9 w-9 rounded-xl bg-white/90 backdrop-blur-md border shadow-lg hover:scale-110 transition-transform"
                        >
                          <Edit className="h-4 w-4 text-zinc-900" />
                        </Button>
                      </Link>

                      {/* Status Badge */}
                      <Badge className={cn(
                        "absolute bottom-4 left-4 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border-none",
                        item.status === 'paused' ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"
                      )}>
                        {item.status}
                      </Badge>
                    </div>

                    {/* Content Section */}
                    <div className="px-5 pb-5 pt-2 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-zinc-900 truncate text-lg leading-tight">{item.series_name}</h3>
                          <div className="flex items-center gap-1.5 text-zinc-400 mt-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-[10px] font-bold tracking-wider uppercase">
                              Created {format(new Date(item.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-48 p-1 rounded-xl shadow-2xl border-zinc-200">
                            <div className="flex flex-col">
                              <Link href={`/dashboard/create?id=${item.id}`} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors">
                                <Edit2 className="h-4 w-4" /> Edit Series
                              </Link>
                              <button 
                                onClick={() => toggleStatus(item.id, item.status)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors w-full text-left"
                              >
                                {item.status === 'paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                                {item.status === 'paused' ? "Resume Series" : "Pause Series"}
                              </button>
                              <div className="h-px bg-zinc-100 my-1" />
                              <button 
                                onClick={() => deleteSeries(item.id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                              >
                                <Trash2 className="h-4 w-4" /> Delete Series
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Link href={`/dashboard/videos?series=${item.id}`} className="w-full">
                          <Button variant="outline" size="sm" className="w-full rounded-xl h-10 border-zinc-200 hover:bg-zinc-50 font-bold text-[10px] uppercase tracking-wider text-zinc-600 gap-2">
                            <History className="h-3.5 w-3.5" /> Videos
                          </Button>
                        </Link>
                        <Button 
                          onClick={() => triggerGeneration(item.id)}
                          size="sm" 
                          className="w-full rounded-xl h-10 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-wider gap-2 shadow-sm"
                        >
                          <Zap className="h-3.5 w-3.5" /> Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
