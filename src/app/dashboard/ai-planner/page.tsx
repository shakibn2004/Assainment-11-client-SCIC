"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, Map } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIPlannerPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("Moderate");
  const [style, setStyle] = useState("Relaxing");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
      const res = await fetch(`${baseUrl}/api/ai/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days: Number(days), budget, style }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate itinerary.");
      }

      setItinerary(data.itinerary);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Travel Planner</h1>
        <p className="text-muted-foreground">Let NomadAI craft your perfect itinerary.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              Trip Details
            </CardTitle>
            <CardDescription>Enter your preferences and we'll do the rest.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Input 
                  placeholder="e.g., Kyoto, Japan" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Days)</label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="30" 
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget</label>
                  <select 
                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Budget">Budget-friendly</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Style</label>
                <select 
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option value="Relaxing">Relaxing</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nightlife">Nightlife</option>
                  <option value="Family">Family-friendly</option>
                </select>
              </div>
              <Button type="submit" className="w-full gap-2" disabled={loading || !destination}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Crafting Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Itinerary
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="min-h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>Your Itinerary</CardTitle>
            <CardDescription>
              {itinerary ? "Here is your personalized travel plan." : "Your generated plan will appear here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <LoadingSpinner message="Analyzing destinations & writing the best plan for you..." />
              </div>
            )}
            {!loading && error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                <p className="font-medium">Error generating plan</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            {!loading && itinerary && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
            )}
            {!loading && !itinerary && !error && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
                <Sparkles className="w-12 h-12 opacity-20" />
                <p>Waiting for instructions.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
