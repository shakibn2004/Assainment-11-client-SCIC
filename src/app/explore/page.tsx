"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Star } from "lucide-react";
import Link from "next/link";

const dummyDestinations = [
  { id: "1", title: "Bali Retreat", location: "Indonesia", price: "medium", climate: "tropical", rating: 4.8, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80" },
  { id: "2", title: "Swiss Alps", location: "Switzerland", price: "high", climate: "cold", rating: 4.9, image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80" },
  { id: "3", title: "Kyoto Gardens", location: "Japan", price: "medium", climate: "temperate", rating: 4.7, image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" },
  { id: "4", title: "Sahara Desert", location: "Morocco", price: "low", climate: "arid", rating: 4.5, image: "https://images.unsplash.com/photo-1509662536033-fd381e43b4e7?auto=format&fit=crop&w=800&q=80" },
  { id: "5", title: "Santorini Getaway", location: "Greece", price: "high", climate: "temperate", rating: 4.9, image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" },
  { id: "6", title: "Phuket Shores", location: "Thailand", price: "low", climate: "tropical", rating: 4.6, image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80" },
  { id: "7", title: "Banff National Park", location: "Canada", price: "medium", climate: "cold", rating: 4.8, image: "https://images.unsplash.com/photo-1553184118-d20774c4c197?auto=format&fit=crop&w=800&q=80" },
  { id: "8", title: "Dubai Skyline", location: "UAE", price: "high", climate: "arid", rating: 4.7, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [climateFilter, setClimateFilter] = useState("all");

  const filtered = dummyDestinations.filter(d => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(dest => (
          <Card key={dest.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all h-[400px] flex flex-col group">
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
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No destinations found matching your filters.
        </div>
      )}
    </div>
  );
}
