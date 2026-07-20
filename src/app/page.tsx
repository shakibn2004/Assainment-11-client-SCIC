"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles, Navigation, Globe, Shield, Star, Sun, Tent, Building, Mountain, MessageSquare, ChevronDown, CheckCircle2 } from "lucide-react";
import { AnimatedFeatures } from "@/components/ui/animated-features";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";

const HERO_SLIDES = [
  {
    bgImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
    titleAccent: "Agentic AI",
    description: "NomadAI uses context-aware Agentic AI to plan, adapt, and personalize your travel itineraries in real-time. No more generic trips.",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop",
    titleAccent: "Instant Adaptability",
    description: "Flight delayed? Bad weather? Our intelligent agent automatically adjusts reservations, routes, and schedules dynamically.",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    titleAccent: "Tailored Journeys",
    description: "Curated experiences built around your unique preferences, budget, and travel style. Discover the world, your way.",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 md:py-24 text-white">
        {/* Background Image Container with Premium Crossfade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.02 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${HERO_SLIDES[currentSlide].bgImage}')` }}
            />
          </AnimatePresence>
        </div>
        {/* Dark Tint Overlay to look gorgeous and high contrast in both light/dark modes */}
        <div className="absolute inset-0 bg-slate-950/70 z-0 backdrop-blur-[1.5px]" />
        
        {/* Fades to transparent at the bottom to transition smoothly to the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent z-0" />
        
        {/* Floating Info Cards (Hidden on Mobile) */}
        <div className="hidden lg:block absolute left-8 xl:left-16 top-1/3 z-10 max-w-[260px]">
          <ScrollReveal variant="fade-right" delay={0.5}>
            <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">🗺️</span>
                <span className="font-semibold text-xs text-white uppercase tracking-wider">Itinerary Generated</span>
              </div>
              <p className="text-xs text-slate-300">Kyoto 5-Day Culture Tour planned in 3.4 seconds.</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="hidden lg:block absolute right-8 xl:right-16 bottom-1/4 z-10 max-w-[280px]">
          <ScrollReveal variant="fade-left" delay={0.6}>
            <div className="bg-slate-900/85 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl animate-pulse">⚡</span>
                <span className="font-semibold text-xs text-white uppercase tracking-wider">Agentic Action</span>
              </div>
              <p className="text-xs text-slate-300">Flight delay detected. Adjusting dining reservations automatically.</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center relative">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 bg-slate-900/60 backdrop-blur px-4 py-2 rounded-full border border-slate-800 shadow-xl inline-flex text-white">
              <div className="flex -space-x-3">
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="User 1" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="User 2" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="User 3" />
                <img className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" alt="User 4" />
              </div>
              <div className="text-sm font-medium flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-slate-200">Loved by <strong className="text-white">10,000+</strong> happy explorers</span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2} key={`title-${currentSlide}`}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-white">
              Discover the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{HERO_SLIDES[currentSlide].titleAccent}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.3} key={`desc-${currentSlide}`}>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl font-medium min-h-[60px]">
              {HERO_SLIDES[currentSlide].description}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/explore">
                <Button size="lg" className="h-12 px-8 text-base bg-white hover:bg-slate-100 text-slate-950 border-none shadow-md hover:shadow-lg transition-all font-semibold">
                  Start Exploring
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-sm hover:shadow-md transition-all font-semibold">
                  <Sparkles className="w-5 h-5 text-emerald-400" /> Chat with AI
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Slide Indicators */}
          <div className="flex gap-2 mt-8 z-10">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Sticky Scroll */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose NomadAI?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Experience the future of travel planning with intelligent automation and personalization.</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.2}>
            <AnimatedFeatures />
          </ScrollReveal>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 border-y">
        <ScrollRevealContainer className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
          <ScrollRevealItem variant="scale-up">
            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
            <div className="text-muted-foreground">Destinations</div>
          </ScrollRevealItem>
          <ScrollRevealItem variant="scale-up">
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Itineraries Generated</div>
          </ScrollRevealItem>
          <ScrollRevealItem variant="scale-up">
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Happy Travelers</div>
          </ScrollRevealItem>
          <ScrollRevealItem variant="scale-up">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">AI Support</div>
          </ScrollRevealItem>
        </ScrollRevealContainer>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Popular Travel Styles</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Discover itineraries curated for your preferred way of exploring the world.</p>
            </div>
          </ScrollReveal>
          <ScrollRevealContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: <Sun className="w-8 h-8 mb-4 text-orange-500" />, title: "Tropical Escapes" },
              { icon: <Mountain className="w-8 h-8 mb-4 text-emerald-600" />, title: "Mountain Adventures" },
              { icon: <Building className="w-8 h-8 mb-4 text-blue-600" />, title: "City Breaks" },
              { icon: <Tent className="w-8 h-8 mb-4 text-amber-700" />, title: "Camping & Nature" },
            ].map((category, index) => (
              <ScrollRevealItem key={index} variant="fade-up">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
                  <CardContent className="pt-8 pb-8 flex flex-col items-center">
                    {category.icon}
                    <h3 className="font-semibold">{category.title}</h3>
                  </CardContent>
                </Card>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Explorers Say</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Real stories from travelers who transformed their journeys with NomadAI.</p>
            </div>
          </ScrollReveal>
          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              { name: "Sarah L.", role: "Solo Traveler", text: "The AI suggested a hidden cafe in Rome I would have never found. It literally saved my rainy afternoon!" },
              { name: "James & Emma", role: "Honeymooners", text: "Planning our trip to Bali was effortless. NomadAI adapted our itinerary instantly when our flight was delayed." },
              { name: "David K.", role: "Digital Nomad", text: "As someone who travels full-time, the smart recommendations based on my budget and internet needs are a game-changer." },
            ].map((testimonial, index) => (
              <ScrollRevealItem key={index} variant="fade-up">
                <Card className="border-none shadow-md bg-background h-full">
                  <CardContent className="pt-8 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex gap-1 mb-4 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-muted-foreground italic mb-6">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Got questions? We've got answers.</p>
            </div>
          </ScrollReveal>
          <ScrollRevealContainer className="space-y-4" staggerDelay={0.08}>
            {[
              { q: "How does the Agentic AI work?", a: "Our AI learns your preferences, analyzes real-time data like weather and events, and proactively adapts your itinerary without manual intervention." },
              { q: "Is NomadAI free to use?", a: "We offer a generous free tier for casual travelers. Advanced AI features and unlimited itineraries require a premium subscription." },
              { q: "Can I collaborate with friends?", a: "Yes! You can share your itineraries and invite friends to co-edit and vote on destinations in real-time." },
              { q: "What destinations are covered?", a: "NomadAI covers over 50,000 destinations globally, constantly updated by our community and data partners." },
            ].map((faq, index) => (
              <ScrollRevealItem key={index} variant="fade-up">
                <Card className="border shadow-sm">
                  <CardContent className="p-6 flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 z-0" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <ScrollReveal variant="scale-up" duration={0.6}>
            <h2 className="text-4xl font-bold mb-6">Ready to plan your next adventure?</h2>
            <p className="text-xl text-muted-foreground mb-8">Join thousands of travelers who are using Agentic AI to craft perfect journeys.</p>
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold">
                Create Free Account
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
