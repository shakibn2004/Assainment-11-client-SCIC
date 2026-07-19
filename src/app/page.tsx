import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles, Navigation, Globe, Shield, Star, Sun, Tent, Building, Mountain, MessageSquare, ChevronDown, CheckCircle2 } from "lucide-react";
import { AnimatedFeatures } from "@/components/ui/animated-features";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-fade-in">
            Meet Your Next Generation Travel Planner
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
            Discover the World with <span className="text-primary">Agentic AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            NomadAI uses context-aware Agentic AI to plan, adapt, and personalize your travel itineraries in real-time. No more generic trips.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="h-12 px-8 text-base">Start Exploring</Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base gap-2">
                <Sparkles className="w-5 h-5" /> Chat with AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Sticky Scroll */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose NomadAI?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Experience the future of travel planning with intelligent automation and personalization.</p>
          </div>
          
          <AnimatedFeatures />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 border-y">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50k+</div>
            <div className="text-muted-foreground">Destinations</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Itineraries Generated</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Happy Travelers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">AI Support</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Travel Styles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Discover itineraries curated for your preferred way of exploring the world.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Sun className="w-8 h-8 mb-4 text-orange-500" />, title: "Tropical Escapes" },
              { icon: <Mountain className="w-8 h-8 mb-4 text-emerald-600" />, title: "Mountain Adventures" },
              { icon: <Building className="w-8 h-8 mb-4 text-blue-600" />, title: "City Breaks" },
              { icon: <Tent className="w-8 h-8 mb-4 text-amber-700" />, title: "Camping & Nature" },
            ].map((category, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer">
                <CardContent className="pt-8 pb-8 flex flex-col items-center">
                  {category.icon}
                  <h3 className="font-semibold">{category.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Explorers Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real stories from travelers who transformed their journeys with NomadAI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah L.", role: "Solo Traveler", text: "The AI suggested a hidden cafe in Rome I would have never found. It literally saved my rainy afternoon!" },
              { name: "James & Emma", role: "Honeymooners", text: "Planning our trip to Bali was effortless. NomadAI adapted our itinerary instantly when our flight was delayed." },
              { name: "David K.", role: "Digital Nomad", text: "As someone who travels full-time, the smart recommendations based on my budget and internet needs are a game-changer." },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md bg-background">
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground italic mb-6">"{testimonial.text}"</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Got questions? We've got answers.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "How does the Agentic AI work?", a: "Our AI learns your preferences, analyzes real-time data like weather and events, and proactively adapts your itinerary without manual intervention." },
              { q: "Is NomadAI free to use?", a: "We offer a generous free tier for casual travelers. Advanced AI features and unlimited itineraries require a premium subscription." },
              { q: "Can I collaborate with friends?", a: "Yes! You can share your itineraries and invite friends to co-edit and vote on destinations in real-time." },
              { q: "What destinations are covered?", a: "NomadAI covers over 50,000 destinations globally, constantly updated by our community and data partners." },
            ].map((faq, index) => (
              <Card key={index} className="border shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to plan your next adventure?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of travelers who are using Agentic AI to craft perfect journeys.</p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold text-primary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
