"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft,
  Ghost, 
  Zap, 
  Lightbulb, 
  Film, 
  Wrench, 
  Cpu,
  CheckCircle2,
  Lock,
  Search,
  Plus,
  MessageSquare,
  Globe,
  Mic2,
  PlayCircle,
  PauseCircle,
  Volume2,
  Music,
  Image as ImageIcon,
  Type,
  Instagram,
  Youtube,
  Mail,
  Clock
} from "lucide-react";
import { CaptionPreview, CAPTION_STYLES } from "@/components/dashboard/CaptionStyles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const STEPS = [
  "Niche",
  "Language & Voice",
  "Music",
  "Video Style",
  "Caption Style",
  "Series Details"
];

const LANGUAGES = [
  { "language": "English", "countryCode": "US", "countryFlag": "🇺🇸", "modelName": "deepgram", "modelLangCode": "en-US" },
  { "language": "Spanish", "countryCode": "MX", "countryFlag": "🇲🇽", "modelName": "deepgram", "modelLangCode": "es-MX" },
  { "language": "German", "countryCode": "DE", "countryFlag": "🇩🇪", "modelName": "deepgram", "modelLangCode": "de-DE" },
  { "language": "Hindi", "countryCode": "IN", "countryFlag": "🇮🇳", "modelName": "fonadalab", "modelLangCode": "hi-IN" },
  { "language": "Marathi", "countryCode": "IN", "countryFlag": "🇮🇳", "modelName": "fonadalab", "modelLangCode": "mr-IN" },
  { "language": "Telugu", "countryCode": "IN", "countryFlag": "🇮🇳", "modelName": "fonadalab", "modelLangCode": "te-IN" },
  { "language": "Tamil", "countryCode": "IN", "countryFlag": "🇮🇳", "modelName": "fonadalab", "modelLangCode": "ta-IN" },
  { "language": "French", "countryCode": "FR", "countryFlag": "🇫🇷", "modelName": "deepgram", "modelLangCode": "fr-FR" },
  { "language": "Dutch", "countryCode": "NL", "countryFlag": "🇳🇱", "modelName": "deepgram", "modelLangCode": "nl-NL" },
  { "language": "Italian", "countryCode": "IT", "countryFlag": "🇮🇹", "modelName": "deepgram", "modelLangCode": "it-IT" },
  { "language": "Japanese", "countryCode": "JP", "countryFlag": "🇯🇵", "modelName": "deepgram", "modelLangCode": "ja-JP" }
];

const DEEPGRAM_VOICES = [
  { "model": "deepgram", "modelName": "aura-2-odysseus-en", "preview": "deepgram-aura-2-odysseus-en.wav", "gender": "male" },
  { "model": "deepgram", "modelName": "aura-2-thalia-en", "preview": "deepgram-aura-2-thalia-en.wav", "gender": "female" },
  { "model": "deepgram", "modelName": "aura-2-amalthea-en", "preview": "deepgram-aura-2-amalthea-en.wav", "gender": "female" },
  { "model": "deepgram", "modelName": "aura-2-andromeda-en", "preview": "deepgram-aura-2-andromeda-en.wav", "gender": "female" },
  { "model": "deepgram", "modelName": "aura-2-apollo-en", "preview": "deepgram-aura-2-apollo-en.wav", "gender": "male" }
];

const FONADALAB_VOICES = [
  { "model": "fonadalab", "modelName": "vaanee", "preview": "fonadalab-Vaanee.mp3", "gender": "female" },
  { "model": "fonadalab", "modelName": "chaitra", "preview": "fonadalab-Chaitra.mp3", "gender": "female" },
  { "model": "fonadalab", "modelName": "meghra", "preview": "fonadalab-Meghra.mp3", "gender": "female" },
  { "model": "fonadalab", "modelName": "nirvani", "preview": "fonadalab-Nirvani.mp3", "gender": "female" }
];

const BG_MUSIC_OPTIONS = [
  {
    id: "trending",
    name: "Trending Reels",
    description: "Catchy and modern vibes",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3"
  },
  {
    id: "basketball",
    name: "Basketball Energy",
    description: "High performance & bounce",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3"
  },
  {
    id: "marketing-1",
    name: "Marketing Flow",
    description: "Cool & professional rhythm",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3"
  },
  {
    id: "marketing-2",
    name: "Business Growth",
    description: "Inspiring & upbeat tunes",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3"
  },
  {
    id: "dramatic-hiphop",
    name: "Dramatic Jazz/Hip-Hop",
    description: "Sophisticated storytelling beats",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3"
  }
];

const VIDEO_STYLES = [
  { id: "realistic", name: "Realistic", image: "/videoStyle/realistic.png" },
  { id: "cinematic", name: "Cinematic", image: "/videoStyle/cinematic.png" },
  { id: "anime", name: "Anime", image: "/videoStyle/anime.png" },
  { id: "cyberpunk", name: "Cyberpunk", image: "/videoStyle/cyberpunk.png" },
  { id: "gta", name: "GTA Style", image: "/videoStyle/gta.png" },
  { id: "3d-render", name: "3D Render", image: "/videoStyle/3d-render.png" }
];

interface FormState {
  niche: string;
  nicheType: "available" | "custom";
  language: string;
  voice: string;
  music: string[];
  videoStyle: string;
  captionStyle: string;
  seriesName: string;
  duration: string;
  platforms: string[];
  publishDate: Date;
}

const AVAILABLE_NICHES = [
  {
    id: "scary-stories",
    name: "Scary Stories",
    description: "Haunting tales that will keep you awake at night.",
    icon: Ghost,
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    id: "motivational",
    name: "Motivational",
    description: "Fuel your ambition with powerful stories of success.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    id: "fun-facts",
    name: "Fun Facts",
    description: "Fascinating trivia that will blow your mind.",
    icon: Lightbulb,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    id: "documentary",
    name: "Documentary",
    description: "Deep dives into historical events and wonders.",
    icon: Film,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    id: "life-hacks",
    name: "Life Hacks",
    description: "Clever solutions to everyday problems.",
    icon: Wrench,
    color: "text-rose-600",
    bg: "bg-rose-50"
  },
  {
    id: "ai-news",
    name: "AI News",
    description: "Stay ahead with the latest in AI technology.",
    icon: Cpu,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  }
];

export default function CreateVideoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({
    niche: "",
    nicheType: "available",
    language: "English",
    voice: "",
    music: [],
    videoStyle: "",
    captionStyle: "vibrant-yellow",
    seriesName: "",
    duration: "30-50sec",
    platforms: [],
    publishDate: new Date(),
  });
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateFormData = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.niche.trim().length > 0;
      case 2:
        return formData.language.length > 0 && formData.voice.length > 0;
      case 3:
        return formData.music.length > 0;
      case 4:
        return formData.videoStyle.length > 0;
      case 5:
        return formData.captionStyle.length > 0;
      case 6:
        return formData.seriesName.trim().length > 0 && formData.platforms.length > 0;
      default:
        return true;
    }
  };

  const getVoicesForLanguage = () => {
    const lang = LANGUAGES.find(l => l.language === formData.language);
    if (lang?.modelName === "fonadalab") return FONADALAB_VOICES;
    return DEEPGRAM_VOICES;
  };

  const togglePreview = (previewFile: string) => {
    // Stop currently playing audio
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }

    // If clicking the same voice, just stop
    if (playingVoice === previewFile) {
      setPlayingVoice(null);
      setAudioPlayer(null);
      return;
    }

    // Play new audio
    try {
      const audio = new Audio(previewFile);

      audio.addEventListener('ended', () => {
        setPlayingVoice(null);
        setAudioPlayer(null);
      });

      audio.addEventListener('error', (e) => {
        console.error('Error playing audio:', e);
        setPlayingVoice(null);
        setAudioPlayer(null);
      });

      audio.play().then(() => {
        setPlayingVoice(previewFile);
        setAudioPlayer(audio);
      }).catch((error) => {
        console.error('Failed to play audio:', error);
        setPlayingVoice(null);
      });
    } catch (error) {
      console.error('Error creating audio:', error);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    };
  }, [audioPlayer]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-zinc-50/50 pb-20">
      {/* Header / Progress Section */}
      <div className="bg-white border-b border-zinc-200 px-8 py-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-zinc-900">Create New Video</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-500">Step {currentStep} of {STEPS.length}</span>
              <div className="h-1.5 w-24 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
                  style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 -z-10" />
            
            {STEPS.map((step, index) => {
              const stepNum = index + 1;
              const isActive = stepNum === currentStep;
              const isCompleted = stepNum < currentStep;

              return (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                    isActive ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110" : 
                    isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : 
                    "bg-white border-zinc-200 text-zinc-400"
                  )}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : stepNum}
                  </div>
                  <span className={cn(
                    "text-xs font-semibold whitespace-nowrap transition-colors",
                    isActive ? "text-indigo-600" : isCompleted ? "text-emerald-600" : "text-zinc-400"
                  )}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/50 overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex-1">
            {/* Step 1: Niche Selection */}
            {currentStep === 1 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Select your niche</h2>
                  <p className="text-zinc-500">Choose the style of video you want to generate.</p>
                </div>

                <Tabs 
                  value={formData.nicheType} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, nicheType: val as "available" | "custom", niche: "" }))} 
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 p-1 bg-zinc-100 rounded-xl mb-6">
                    <TabsTrigger value="available" className="rounded-lg py-2.5">Available Niche</TabsTrigger>
                    <TabsTrigger value="custom" className="rounded-lg py-2.5">Custom Niche</TabsTrigger>
                  </TabsList>

                  <TabsContent value="available" className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="Search for a niche..." 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>

                    {/* Niche List Container */}
                    <div className="max-h-[340px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                      {AVAILABLE_NICHES.map((niche) => (
                        <div 
                          key={niche.id}
                          onClick={() => updateFormData("niche", niche.id)}
                          className={cn(
                            "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
                            formData.niche === niche.id 
                              ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/10 shadow-sm" 
                              : "bg-white border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50"
                          )}
                        >
                          <div className={cn(
                            "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-sm",
                            niche.bg,
                            niche.color
                          )}>
                            <niche.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-zinc-900">{niche.name}</h3>
                            <p className="text-sm text-zinc-500 leading-tight">{niche.description}</p>
                          </div>
                          {formData.niche === niche.id && (
                            <div className="bg-indigo-600 rounded-full p-1 shadow-md shadow-indigo-200">
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="custom" className="space-y-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <p className="text-sm text-indigo-700 font-medium leading-tight">
                          Describe your specific niche in detail. Our AI will adapt its style accordingly.
                        </p>
                      </div>
                      <div className="relative">
                        <Textarea 
                          placeholder="Example: True crime stories focused on mysterious disappearances in the 1920s with a noir storytelling style..."
                          className="min-h-[220px] rounded-2xl border-zinc-200 bg-zinc-50/50 p-5 focus:ring-indigo-500/20 transition-all resize-none text-base leading-relaxed"
                          value={formData.niche}
                          onChange={(e) => updateFormData("niche", e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          AI Assisted
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Step 2: Language & Voice Selection */}
            {currentStep === 2 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Language & Voice</h2>
                  <p className="text-zinc-500">Select the language and the voice profile for your videos.</p>
                </div>

                <div className="space-y-6">
                  {/* Language Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-indigo-600" />
                      Select Language
                    </label>
                    <Select 
                      value={formData.language} 
                      onValueChange={(val) => {
                        updateFormData("language", val);
                        updateFormData("voice", ""); // Reset voice when language changes
                      }}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-zinc-200 bg-zinc-50 text-base font-medium">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4} className="rounded-2xl border-zinc-200 shadow-xl w-(--radix-select-trigger-width)">
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.language} value={lang.language} className="py-3 rounded-xl cursor-pointer">
                            <span className="flex items-center gap-3">
                              <span className="text-sm font-bold text-zinc-400 w-6">{lang.countryCode}</span>
                              <span className="font-medium text-zinc-900">{lang.language}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Voice Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                      <Mic2 className="h-4 w-4 text-indigo-600" />
                      Voice Style
                    </label>
                    
                    <div className="max-h-[320px] overflow-y-auto pr-2 space-y-3 custom-scrollbar border rounded-3xl p-4 bg-zinc-50/50">
                      {getVoicesForLanguage().map((voice) => (
                        <div 
                          key={voice.modelName}
                          onClick={() => updateFormData("voice", voice.modelName)}
                          className={cn(
                            "group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer relative",
                            formData.voice === voice.modelName
                              ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-500/5" 
                              : "bg-white/50 border-zinc-100 hover:border-zinc-300 hover:bg-white"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                            voice.gender === "male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                          )}>
                            <Volume2 className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-zinc-900 truncate">{voice.modelName}</h3>
                              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-zinc-200 bg-zinc-50">
                                {voice.model}
                              </Badge>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium capitalize flex items-center gap-1 mt-0.5">
                              <span className={cn(
                                "h-1 w-1 rounded-full",
                                voice.gender === "male" ? "bg-blue-400" : "bg-pink-400"
                              )} />
                              {voice.gender} Voice
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className={cn(
                                "h-10 w-10 rounded-xl transition-all",
                                playingVoice === `/voices/${voice.preview}` ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePreview(`/voices/${voice.preview}`);
                              }}
                            >
                              {playingVoice === `/voices/${voice.preview}` ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                            </Button>
                            
                            {formData.voice === voice.modelName && (
                              <div className="bg-indigo-600 text-white rounded-full p-1 shadow-lg shadow-indigo-200">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Background Music Selection */}
            {currentStep === 3 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Background Music</h2>
                  <p className="text-zinc-500">Pick the perfect tracks to set the mood of your video.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                      <Music className="h-4 w-4 text-indigo-600" />
                      Available Tracks
                    </label>
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 font-medium">
                      {formData.music.length} Selected
                    </Badge>
                  </div>
                  
                  <div className="max-h-[380px] overflow-y-auto pr-2 space-y-3 custom-scrollbar border rounded-3xl p-4 bg-zinc-50/50">
                    {BG_MUSIC_OPTIONS.map((track) => {
                      const isSelected = formData.music.includes(track.url);
                      return (
                        <div 
                          key={track.id}
                          onClick={() => {
                            if (isSelected) {
                              setFormData(prev => ({
                                ...prev,
                                music: prev.music.filter(m => m !== track.url)
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                music: [...prev.music, track.url]
                              }));
                            }
                          }}
                          className={cn(
                            "group flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer relative",
                            isSelected
                              ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-500/5" 
                              : "bg-white/50 border-zinc-100 hover:border-zinc-300 hover:bg-white"
                          )}
                        >
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                            isSelected ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-400"
                          )}>
                            <Music className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-zinc-900 truncate">{track.name}</h3>
                            <p className="text-xs text-zinc-500 font-medium truncate">
                              {track.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className={cn(
                                "h-10 w-10 rounded-xl transition-all",
                                playingVoice === track.url ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePreview(track.url);
                              }}
                            >
                              {playingVoice === track.url ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                            </Button>
                            
                            {isSelected && (
                              <div className="bg-indigo-600 text-white rounded-full p-1 shadow-lg shadow-indigo-200">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest text-center">
                    Multiple selection enabled • Previews use cloud streaming
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Video Style Selection */}
            {currentStep === 4 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Choose Video Style</h2>
                  <p className="text-zinc-500">Visual style defines the look and feel of your AI generated scenes.</p>
                </div>

                <div className="relative group">
                  {/* Indicators for scroll */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex gap-5 overflow-x-auto pb-8 pt-2 px-1 scroll-smooth custom-scrollbar no-scrollbar-on-mobile">
                    {VIDEO_STYLES.map((style) => {
                      const isSelected = formData.videoStyle === style.id;
                      return (
                        <div 
                          key={style.id}
                          onClick={() => updateFormData("videoStyle", style.id)}
                          className={cn(
                            "flex-none w-[200px] group/item cursor-pointer",
                            "transition-all duration-300 transform"
                          )}
                        >
                          <div className={cn(
                            "relative aspect-9/16 rounded-[2rem] overflow-hidden border-4 transition-all duration-300",
                            isSelected 
                              ? "border-indigo-600 shadow-xl shadow-indigo-200 scale-105" 
                              : "border-zinc-100 hover:border-zinc-300 grayscale-[0.3] hover:grayscale-0"
                          )}>
                            <img 
                              src={style.image} 
                              alt={style.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className={cn(
                              "absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5 transition-opacity",
                              isSelected ? "opacity-100" : "opacity-60 group-hover/item:opacity-90"
                            )}>
                              <h3 className="text-white font-bold text-lg leading-tight">{style.name}</h3>
                              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                                {isSelected ? "Selected" : "Pick Style"}
                              </p>
                            </div>

                            {isSelected && (
                              <div className="absolute top-4 right-4 bg-indigo-600 text-white rounded-full p-1.5 shadow-lg animate-in zoom-in duration-300">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Badge variant="outline" className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-4 py-1.5 rounded-full border-zinc-200">
                    Scroll horizontally to see all styles
                  </Badge>
                </div>
              </div>
            )}

            {/* Step 5: Caption Style Selection */}
            {currentStep === 5 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Caption Style</h2>
                  <p className="text-zinc-500">How your story will appear on screen. These styles are fully animated.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  {CAPTION_STYLES.map((style) => {
                    const isSelected = formData.captionStyle === style.id;
                    return (
                      <div 
                        key={style.id}
                        onClick={() => updateFormData("captionStyle", style.id)}
                        className={cn(
                          "group relative flex flex-col p-1 rounded-3xl border-2 transition-all cursor-pointer overflow-hidden",
                          isSelected 
                            ? "border-indigo-600 bg-indigo-50/30 shadow-lg shadow-indigo-100 scale-[1.02]" 
                            : "border-zinc-100 hover:border-zinc-300 bg-white hover:bg-zinc-50"
                        )}
                      >
                        {/* Style Preview Container */}
                        <div className="relative aspect-video rounded-2xl bg-zinc-900 overflow-hidden mb-3">
                          {/* Mock Video Background */}
                          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80')] bg-cover bg-center opacity-40" />
                          
                          {/* Content Preview */}
                          <CaptionPreview 
                            styleId={style.id} 
                            className="absolute inset-0"
                            text="Dynamic AI Caption"
                          />

                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full p-1.5 shadow-lg border-2 border-white z-20">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        {/* Style Info */}
                        <div className="px-4 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Type className={cn("h-4 w-4", isSelected ? "text-indigo-600" : "text-zinc-400")} />
                            <h3 className="font-bold text-zinc-900">{style.name}</h3>
                          </div>
                          <p className="text-xs text-zinc-500 leading-tight">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center flex-col items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Used by 2,000+ creators this week
                  </p>
                </div>
              </div>
            )}

            {/* Step 6: Series Details Selection */}
            {currentStep === 6 && (
              <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold text-zinc-900">Series Details</h2>
                  <p className="text-zinc-500">Configure your automation settings and publishing schedule.</p>
                </div>

                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-zinc-700">Name</label>
                    <input
                      type="text"
                      placeholder="Enter series name"
                      className="w-full h-14 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                      value={formData.seriesName}
                      onChange={(e) => updateFormData("seriesName", e.target.value)}
                    />
                  </div>

                  {/* Duration Dropdown */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-zinc-700">Duration</label>
                    <Select 
                      value={formData.duration} 
                      onValueChange={(val) => updateFormData("duration", val)}
                    >
                      <SelectTrigger className="w-full h-14 rounded-2xl border-zinc-200 bg-zinc-50 text-base font-medium px-5">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-zinc-200 shadow-xl">
                        <SelectItem value="30-50sec" className="py-3 rounded-xl cursor-pointer">30-50 sec video</SelectItem>
                        <SelectItem value="60-70sec" className="py-3 rounded-xl cursor-pointer">60-70 sec video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Platform Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-zinc-700 flex items-center justify-between">
                      <span>Publish On</span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Select multiple</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'instagram', icon: Instagram, label: 'Instagram' },
                        { id: 'youtube', icon: Youtube, label: 'YouTube' },
                        { id: 'mail', icon: Mail, label: 'Mail' }
                      ].map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => {
                            const isSelected = formData.platforms.includes(platform.id);
                            if (isSelected) {
                              setFormData(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform.id) }));
                            } else {
                              setFormData(prev => ({ ...prev, platforms: [...prev.platforms, platform.id] }));
                            }
                          }}
                          className={cn(
                            "group flex flex-col items-center justify-center p-4 h-16 rounded-2xl border-2 transition-all relative overflow-hidden",
                            formData.platforms.includes(platform.id)
                              ? "border-zinc-900 bg-zinc-900 text-white shadow-lg"
                              : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:bg-zinc-50"
                          )}
                        >
                          <platform.icon className={cn("h-6 w-6 transition-transform duration-300 group-hover:scale-110", !formData.platforms.includes(platform.id) && "text-zinc-400")} />
                          {formData.platforms.includes(platform.id) && (
                            <div className="absolute top-1 right-1">
                              <CheckCircle2 className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Publish Date & Time */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <label className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        Publish Date & Time
                      </label>
                      <div className="flex items-center gap-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "flex-1 h-12 justify-start text-left font-medium rounded-xl border-zinc-200 bg-white",
                                !formData.publishDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400" />
                              {formData.publishDate ? format(formData.publishDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-2xl border-zinc-200 shadow-2xl" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.publishDate}
                              onSelect={(date) => date && setFormData(prev => ({ ...prev, publishDate: date }))}
                              initialFocus
                              className="p-3"
                            />
                          </PopoverContent>
                        </Popover>

                        <Select 
                          value={format(formData.publishDate, "h:00 a")} 
                          onValueChange={(val) => {
                            const [time, ampm] = val.split(' ');
                            const [hours] = time.split(':');
                            let hour = parseInt(hours);
                            if (ampm === 'PM' && hour !== 12) hour += 12;
                            if (ampm === 'AM' && hour === 12) hour = 0;
                            
                            const newDate = new Date(formData.publishDate);
                            newDate.setHours(hour, 0, 0, 0);
                            setFormData(prev => ({ ...prev, publishDate: newDate }));
                          }}
                        >
                          <SelectTrigger className="w-[140px] h-12 rounded-xl border-zinc-200 bg-white text-sm font-bold shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-zinc-200 shadow-xl max-h-[200px]">
                            {Array.from({ length: 24 }).map((_, i) => {
                              const hour = i % 12 || 12;
                              const ampm = i < 12 ? 'AM' : 'PM';
                              const time = `${hour}:00 ${ampm}`;
                              return (
                                <SelectItem key={time} value={time} className="rounded-lg">{time}</SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="relative group p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-start gap-4 transition-all hover:bg-indigo-50">
                      <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-200 shrink-0">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-indigo-900">Automation Notice</p>
                        <p className="text-xs text-indigo-700/80 font-medium leading-relaxed">
                          Your video will begin generating <span className="font-bold underline">3-6 hours before</span> the selected time to ensure optimal quality and availability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Unified Navigation Footer */}
          <div className="border-t border-zinc-100 p-6 bg-zinc-50/30 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={cn(
                "rounded-xl px-6 font-semibold transition-all",
                currentStep === 1 ? "opacity-0 cursor-default" : "hover:bg-zinc-100"
              )}
            >
              <ChevronLeft className="mr-2 h-5 w-5" /> Back
            </Button>

            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-10 py-6 font-bold shadow-lg shadow-zinc-200 transition-all active:scale-[0.98] group"
            >
              {currentStep === STEPS.length ? "Schedule" : "Continue"}
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f4f4f5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
      `}</style>
    </div>
  );
}
