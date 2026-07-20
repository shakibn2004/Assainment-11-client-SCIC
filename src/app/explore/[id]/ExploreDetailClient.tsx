"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Star, 
  Sun, 
  Cloud, 
  Thermometer, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Compass, 
  DollarSign, 
  Info,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Destination } from "@/constants/destinations";

interface ExploreDetailClientProps {
  destination: Destination;
}

export function ExploreDetailClient({ destination }: ExploreDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "reviews">("overview");

  // Dynamic AI prompt creation
  const aiPrompt = encodeURIComponent(
    `Hi! I am looking at the ${destination.title} package in ${destination.location}. I'd love to customize the itinerary to focus more on adventure activities and local culinary experiences. Can you help me adapt it?`
  );

  const { data: session } = useSession();
  const [hasBooked, setHasBooked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    const fetchTrips = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
        const res = await fetch(`${baseUrl}/api/trips`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.some((trip: any) => trip.title === destination.title)) {
            setHasBooked(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchTrips();
  }, [session, destination.title]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      {/* Back button */}
      <Link 
        href="/explore" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Explore
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Image Gallery and Tabs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-[300px] md:h-[480px] w-full rounded-2xl overflow-hidden shadow-lg border border-border/20">
              <img 
                src={destination.images[activeImageIndex] || destination.image} 
                alt={destination.title} 
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 border border-border/20">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 
                <span>{destination.rating}</span>
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
              {destination.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === index 
                      ? "border-primary scale-[1.03] shadow-md" 
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${destination.title} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Heading Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full capitalize flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                {destination.climate} climate
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-full capitalize">
                {destination.price} budget
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{destination.title}</h1>
            <p className="text-muted-foreground flex items-center gap-1.5 text-lg">
              <MapPin className="w-5 h-5 text-red-500 shrink-0" />
              {destination.location}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-border/50">
            <div className="flex gap-6 md:gap-8">
              {(["overview", "itinerary", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-semibold capitalize transition-all relative ${
                    activeTab === tab 
                      ? "text-primary font-bold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[200px]">
            
            {/* Overview Panel */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-foreground/95 italic border-l-4 border-primary pl-4 py-0.5">
                    &quot;{destination.tagline}&quot;
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {destination.description}
                  </p>
                  <p className="text-xl italic text-muted-foreground leading-relaxed">
                    &quot;{destination.aiDescription}&quot;
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Key Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-3 items-start bg-card/45 p-4 rounded-xl border border-border/10">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather Info */}
                <div className="bg-gradient-to-br from-primary/5 via-card to-background p-6 rounded-2xl border border-primary/10 space-y-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    Weather & Climate Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block">Current Season</span>
                      <span className="font-bold flex items-center gap-1">
                        <Cloud className="w-4 h-4 text-blue-400" />
                        {destination.weather.season}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block">Avg Temperature</span>
                      <span className="font-bold flex items-center gap-1">
                        <Thermometer className="w-4 h-4 text-orange-400" />
                        {destination.weather.tempRange}
                      </span>
                    </div>
                    <div className="space-y-1 sm:col-span-3">
                      <span className="text-xs text-muted-foreground block">Weather Guide</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{destination.weather.info}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Itinerary Panel */}
            {activeTab === "itinerary" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Agentic AI Generated Smart Itinerary
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">Optimized in real time</span>
                </div>
                
                <div className="relative pl-6 border-l-2 border-border/80 space-y-8 py-2">
                  {destination.itinerary.map((item) => (
                    <div key={item.day} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                        {item.day}
                      </span>
                      
                      <div className="space-y-3">
                        <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                          Day {item.day}: {item.title}
                        </h4>
                        <ul className="space-y-2.5">
                          {item.activities.map((act, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Panel */}
            {activeTab === "reviews" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4 bg-muted/20 p-6 rounded-xl border">
                  <div className="text-center shrink-0">
                    <span className="block text-4xl font-extrabold text-foreground">{destination.rating}</span>
                    <span className="text-xs text-muted-foreground block mt-1">out of 5.0</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on active traveler feedback and AI evaluation ratings.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {destination.reviews.map((rev, index) => (
                    <div key={index} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{rev.author}</h4>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(rev.rating) ? "fill-current" : "text-muted/40"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        &quot;{rev.text}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <Card className="border-primary/20 shadow-2xl bg-gradient-to-b from-card to-background relative overflow-hidden">
            {/* Top accent glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            
            <CardContent className="p-6 space-y-6">
              
              {/* Cost breakdown */}
              <div className="space-y-2 pb-4 border-b">
                <span className="text-xs text-muted-foreground block font-medium">Estimated Base Cost</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">{destination.priceAmount}</span>
                  <span className="text-sm text-muted-foreground">/ person</span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    Duration
                  </span>
                  <span className="font-bold">{destination.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2 font-medium">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    Best Time to Visit
                  </span>
                  <span className="font-bold text-right max-w-[180px]">{destination.bestTimeToVisit.split(" (")[0]}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2 font-medium">
                    <Compass className="w-4 h-4 text-primary shrink-0" />
                    Climate Style
                  </span>
                  <span className="font-bold capitalize">{destination.climate}</span>
                </div>
              </div>

              {/* Core CTA Actions */}
              <div className="space-y-3 pt-2">
                {hasBooked ? (
                  <Button 
                    className="w-full h-12 text-sm font-bold shadow-lg shadow-green-500/20 transition-all hover:scale-[1.01] bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      toast.info(`You have already booked ${destination.title}!`);
                      router.push("/dashboard/trips");
                    }}
                  >
                    Already Booked - View My Trips
                  </Button>
                ) : (
                  <Link href={`/checkout?type=trip&title=${encodeURIComponent(destination.title)}&amount=${Math.round(parseFloat(destination.priceAmount.replace(/[^0-9.]/g, '')) * 100)}&imageUrl=${encodeURIComponent(destination.image)}`}>
                    <Button className="w-full h-12 text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] hover:shadow-primary/30">
                      Book Trip Now
                    </Button>
                  </Link>
                )}
                <Link href={`/ai-assistant?prompt=${aiPrompt}`}>
                  <Button variant="outline" className="w-full h-12 text-sm font-bold gap-2 transition-all hover:bg-primary/5 hover:text-primary">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    Customize with AI
                  </Button>
                </Link>
              </div>

              {/* Small details */}
              <div className="space-y-3 pt-4 border-t text-xs text-muted-foreground">
                <div className="flex gap-2 items-center">
                  <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>AI itineraries adapt dynamically during flight delays or weather changes.</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick AI tips card */}
          <div className="bg-muted/30 border rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold flex items-center gap-1.5 text-foreground/90">
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              NomadAI Travel Suggestion
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Based on the climate and rating, we recommend booking flights at least 6 weeks in advance to secure the base rate of <span className="font-semibold text-foreground">{destination.priceAmount}</span>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
