"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";

export default function PricingPage() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const userPlan = (session?.user as any)?.plan?.toLowerCase() || "explorer";
  const isPro = userPlan === "pro";

  const tiers = [
    {
      name: "Explorer",
      price: "Free",
      description: "Perfect for casual travelers planning occasional trips.",
      features: [
        "Up to 3 AI-generated itineraries per month",
        "Basic destination recommendations",
        "Standard support",
      ],
      popular: false,
    },
    {
      name: "Nomad Pro",
      price: "$15/mo",
      description: "Advanced AI features for frequent travelers.",
      features: [
        "Unlimited AI-generated itineraries",
        "Real-time adaptation & weather updates",
        "Export to Google Calendar / PDF",
        "Priority AI processing",
        "24/7 Email support",
      ],
      popular: true,
    },
    {
      name: "Wanderlust Team",
      price: "$40/mo",
      description: "Collaborative travel planning for groups and families.",
      features: [
        "Everything in Nomad Pro",
        "Up to 5 team members",
        "Real-time itinerary collaboration",
        "Group voting on destinations",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  const getButtonState = (tierName: string) => {
    if (tierName === "Wanderlust Team") {
      return {
        text: "Contact Sales",
        variant: "outline",
        href: "/contact",
        disabled: false,
        isCurrent: false,
      };
    }

    if (!isLoggedIn) {
      if (tierName === "Nomad Pro") {
        return { text: "Upgrade to Pro", variant: "default", href: "/checkout", disabled: false, isCurrent: false };
      }
      return { text: "Get Started", variant: "outline", href: "/login", disabled: false, isCurrent: false };
    }

    // Logged in user
    if (tierName === "Nomad Pro") {
      if (isPro) {
        return { text: "Current Plan", variant: "outline", href: "#", disabled: true, isCurrent: true };
      }
      return { text: "Upgrade to Pro", variant: "default", href: "/checkout", disabled: false, isCurrent: false };
    }

    // Explorer tier for logged in user
    if (!isPro) {
      return { text: "Current Plan", variant: "outline", href: "#", disabled: true, isCurrent: true };
    }
    return { text: "Free Plan", variant: "outline", href: "#", disabled: true, isCurrent: false };
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500 overflow-hidden">
      {/* Header Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background z-0" />
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 inline-block">
              Upgrade Your Journey
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
              Simple, transparent <span className="text-primary">pricing</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Choose the perfect plan to unlock the full potential of Agentic AI for your next adventure.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerDelay={0.12}>
            {tiers.map((tier, index) => {
              const btn = getButtonState(tier.name);
              return (
                <ScrollRevealItem key={index} variant="fade-up" className="flex flex-col h-full">
                  <Card 
                    className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-lg overflow-visible ${
                      tier.popular ? "border-primary shadow-md md:-translate-y-4 bg-card" : "border-border bg-card/50"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md z-10 select-none whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription className="min-h-[40px] mt-2">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-8 text-center">
                        <span className="text-5xl font-extrabold">{tier.price}</span>
                      </div>
                      <ul className="space-y-4 flex-1">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pb-8 pt-4">
                      {btn.disabled ? (
                        <Button 
                          variant={btn.variant as any} 
                          disabled
                          className={`w-full h-12 text-base font-bold ${
                            btn.isCurrent 
                              ? "bg-primary/10 text-primary border-2 border-primary opacity-100 cursor-default" 
                              : "opacity-60"
                          }`}
                        >
                          {btn.isCurrent && <CheckCircle2 className="w-4 h-4 mr-2 text-primary shrink-0" />}
                          {btn.text}
                        </Button>
                      ) : (
                        <Link href={btn.href} className="w-full">
                          <Button 
                            variant={btn.variant as any} 
                            className={`w-full h-12 text-base font-semibold ${tier.popular ? 'shadow-md' : ''}`}
                          >
                            {btn.text}
                          </Button>
                        </Link>
                      )}
                    </CardFooter>
                  </Card>
                </ScrollRevealItem>
              );
            })}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* Custom Plans CTA */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal variant="scale-up">
            <h2 className="text-3xl font-bold mb-4">Enterprise & Custom Plans</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Need a custom solution for your travel agency or a larger team? We offer flexible enterprise API access and dedicated support.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium">Contact Enterprise Sales</Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
