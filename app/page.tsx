"use client";

import { motion } from "framer-motion";
import { FloatingElements } from "@/components/FloatingElements";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Video, 
  Calendar, 
  Youtube, 
  Instagram, 
  Mail, 
  Zap, 
  Globe, 
  Shield, 
  ArrowRight,
  Play
} from "lucide-react";
import Image from "next/image";
import { 
  SignedIn, 
  SignedOut, 
  UserButton,
  SignInButton,
  SignUpButton
} from "@clerk/nextjs";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-blue-500/30">
      <FloatingElements />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DigitalWorld</span>
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Features</a>
            <a href="#platforms" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Platforms</a>
            <SignedIn>
              <a href="/dashboard" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Dashboard</a>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-zinc-400 transition-colors hover:text-white cursor-pointer">Dashboard</button>
              </SignInButton>
            </SignedOut>
            <a href="#pricing" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-zinc-400 hover:text-white">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 px-4 py-1 text-blue-400">
              New: AI Video Scheduling 2.0
            </Badge>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
            Generate & Schedule <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Short Videos</span> with AI
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl text-lg text-zinc-400 sm:text-xl">
            The all-in-one SaaS to automate your social media presence. Generate viral content for YouTube, Instagram, and Email subscribers on autopilot.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
            <SignedIn>
              <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700">
                  Start Generating for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10">
              Watch Demo <Play className="ml-2 h-5 w-4 fill-white" />
            </Button>
          </motion.div>

          {/* Interactive Preview Element */}
          <motion.div 
            variants={itemVariants}
            className="relative mt-16 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-2 backdrop-blur-sm animate-bounce-subtle"
          >
            <div className="aspect-video w-full rounded-xl bg-linear-to-br from-zinc-800 to-black p-8 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-center space-y-4">
                <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-blue-600/20 border border-blue-500/30">
                  <Video className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Video Generation Dashboard</h3>
                <p className="text-zinc-500">Previewing the AI generation engine...</p>
              </div>
              
              {/* Decorative elements for the dashboard preview */}
              <div className="absolute top-4 left-4 h-3 w-48 rounded-full bg-zinc-800" />
              <div className="absolute top-10 left-4 h-3 w-32 rounded-full bg-zinc-800" />
              <div className="absolute bottom-4 right-4 h-12 w-12 rounded-lg bg-blue-600/10 border border-blue-500/20" />
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <section id="features" className="mt-40 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to go viral</h2>
            <p className="text-zinc-400">Scale your content creation without lifting a finger.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "AI Generation",
                description: "Turn any text or idea into a stunning high-definition short video using our advanced AI models.",
                icon: <Zap className="h-6 w-6 text-yellow-400" />,
              },
              {
                title: "Auto-Scheduler",
                description: "Set your posting schedule once and let our AI handle the rest. consistent growth on autopilot.",
                icon: <Calendar className="h-6 w-6 text-blue-400" />,
              },
              {
                title: "Multi-Platform",
                description: "Native support for YouTube Shorts, Instagram Reels, and even Email video campaigns.",
                icon: <Globe className="h-6 w-6 text-indigo-400" />,
              }
            ].map((feature, i) => (
              <Card key={i} className="group relative overflow-hidden border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:bg-zinc-800/50">
                <div className="mb-4 inline-flex rounded-lg bg-white/5 p-3 ring-1 ring-white/10 group-hover:ring-blue-500/50">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-zinc-400 line-height-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Scheduler Highlight Section */}
        <section className="mt-40 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">Auto-Pilot Mode</Badge>
            <h2 className="text-4xl font-bold leading-tight">Sleep While Your Content Grows</h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Our advanced auto-scheduler doesn't just post; it analyzes peak engagement times for your specific audience and schedules AI video generation to happen exactly when it's needed.
            </p>
            <ul className="space-y-4">
              {[
                "Automatic captioning and hashtags",
                "Cross-platform synchronization",
                "Email list integration for video drops",
                "Real-time performance tracking"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border border-white/10 bg-zinc-900 rounded-2xl p-8 backdrop-blur-xl animate-bounce-subtle">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-semibold">Weekly Schedule</span>
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className="text-xs text-zinc-500">{day}</span>
                      <div className={`h-16 w-full rounded-md border border-white/5 ${i % 2 === 0 ? 'bg-blue-600/20 ring-1 ring-blue-500/30' : 'bg-zinc-800'}`} />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-white/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Batch complete: 7 videos ready</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Scheduled</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Showcase */}
        <section id="platforms" className="mt-40">
          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/50 to-black p-12 text-center backdrop-blur-sm">
            <h2 className="mb-12 text-3xl font-bold">One Dashboard, Every Platform</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-20">
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-red-600/10 border border-red-500/20 group-hover:bg-red-600/20 transition-all">
                  <Youtube className="h-10 w-10 text-red-500" />
                </div>
                <span className="font-semibold text-zinc-400 group-hover:text-white">YouTube Shorts</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-pink-600/10 border border-pink-500/20 group-hover:bg-pink-600/20 transition-all">
                  <Instagram className="h-10 w-10 text-pink-500" />
                </div>
                <span className="font-semibold text-zinc-400 group-hover:text-white">Instagram Reels</span>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/20 group-hover:bg-blue-600/20 transition-all">
                  <Mail className="h-10 w-10 text-blue-500" />
                </div>
                <span className="font-semibold text-zinc-400 group-hover:text-white">Email Campaigns</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/10 bg-black py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">DigitalWorld</span>
              </div>
              <p className="text-sm text-zinc-500">
                Automating the future of video content. Powered by AI, designed for creators.
              </p>
            </div>
            
            <div>
              <h4 className="mb-6 font-bold text-white">Product</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Legal</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-sm text-zinc-500">
              © 2026 DigitalWorld AI Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Youtube className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer" />
              <Mail className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
