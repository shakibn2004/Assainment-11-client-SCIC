"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Star } from "lucide-react";
import Link from "next/link";
import { ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [climateFilter, setClimateFilter] = useState("all");
  
  const [dynamicDestinations, setDynamicDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
        const res = await fetch(`${baseUrl}/api/destinations`);
        if (res.ok) {
          const data = await res.json();
          // Map MongoDB _id to id if necessary
          const formatted = data.map((d: any) => ({
            ...d,
            id: d._id || d.id
          }));
          setDynamicDestinations(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const filtered = dynamicDestinations.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPrice = priceFilter === "all" || d.price === priceFilter;
    const matchClimate = climateFilter === "all" || d.climate === climateFilter;
    return matchSearch && matchPrice && matchClimate;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
        <p className="text-muted-foreground">Find the perfect spot for your next Agentic AI planned journey.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title or location..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={priceFilter} onValueChange={(val) => setPriceFilter(val || "all")}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Budget</SelectItem>
            <SelectItem value="medium">Mid-Range</SelectItem>
            <SelectItem value="high">Luxury</SelectItem>
          </SelectContent>
        </Select>
        <Select value={climateFilter} onValueChange={(val) => setClimateFilter(val || "all")}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Climate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Climates</SelectItem>
            <SelectItem value="tropical">Tropical</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="temperate">Temperate</SelectItem>
            <SelectItem value="arid">Arid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <LoadingSpinner message="Fetching destinations..." />
        </div>
      ) : (
        <div className="overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No destinations found matching your criteria.
            </div>
          ) : (
            <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
              {filtered.map(dest => (
                <ScrollRevealItem key={dest.id} variant="fade-up" className="flex flex-col h-full">
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all h-[400px] flex flex-col group">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={dest.image} 
                        alt={dest.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur px-2 py-1 rounded text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {dest.rating}
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-1">{dest.title}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" /> {dest.location}
                      </p>
                      <div className="flex gap-2 mb-4">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">{dest.price}</span>
                        <span className="text-xs bg-secondary/50 px-2 py-1 rounded capitalize">{dest.climate}</span>
                      </div>
                      <div className="mt-auto">
                        <Link href={`/explore/${dest.id}`}>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollRevealItem>
              ))}
            </ScrollRevealContainer>
          )}
        </div>
      )}
    </div>
  );
}
