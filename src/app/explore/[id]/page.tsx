import { destinations, Destination } from "@/constants/destinations";
import { ExploreDetailClient } from "./ExploreDetailClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, AlertTriangle } from "lucide-react";

interface DestinationPageProps {
  params: Promise<{ id: string }>;
}

async function getDestination(id: string): Promise<Destination | null> {
  // 1. Try to find in the static local destinations
  const staticDest = destinations.find((d) => d.id === id);
  if (staticDest) return staticDest;

  // 2. Otherwise, fetch from the backend database
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://assignment-04-server.vercel.app" : "http://localhost:8000");
    const res = await fetch(`${baseUrl}/api/destinations`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const found = data.find((d: any) => d._id === id || d.id === id);
      if (found) {
        // Map dynamic database properties to the full Destination interface
        return {
          id: found._id || found.id,
          title: found.title,
          location: found.location,
          price: found.price,
          priceAmount: found.priceAmount || (found.price === "low" ? "$800" : found.price === "medium" ? "$1,500" : "$3,000"),
          climate: found.climate,
          rating: found.rating || 5,
          image: found.image,
          images: found.images || [found.image],
          tagline: found.tagline || `Discover the amazing wonders of ${found.title}.`,
          description: found.description || `Explore ${found.title} located in ${found.location}. Enjoy the perfect ${found.climate} climate and a curated selection of sights.`,
          duration: found.duration || "5 Days / 4 Nights",
          bestTimeToVisit: found.bestTimeToVisit || "All year round",
          activities: found.activities || ["Local Sightseeing", "Cultural Experience", "Culinary Tour"],
          highlights: found.highlights || [`Beautiful sights in ${found.location}`, `${found.climate} climate experiences`],
          itinerary: found.itinerary || [
            { day: 1, title: "Arrival & Orientation", activities: ["Airport pickup", "Check-in at hotel", "Evening welcome dinner"] },
            { day: 2, title: "Exploring Key Sights", activities: ["Guided city tour", "Local food tasting", "Sunset viewpoint visit"] },
            { day: 3, title: "Adventure & Activities", activities: ["Outdoor experience", "Nature trail walk", "Free evening"] },
            { day: 4, title: "Cultural Immersion", activities: ["Visit historical monuments", "Traditional craft workshop", "Dinner show"] },
            { day: 5, title: "Departure", activities: ["Souvenir shopping", "Hotel checkout", "Transfer to airport"] }
          ],
          reviews: found.reviews || [
            { author: "Alex M.", rating: 5, text: `Absolutely incredible experience visiting ${found.title}! Highly recommend.`, date: "July 2026" },
            { author: "Taylor K.", rating: 4, text: `Beautiful location and great atmosphere. The Agentic AI planner made it super easy.`, date: "June 2026" }
          ],
          weather: found.weather || {
            season: "Vibrant Season",
            tempRange: "22°C - 30°C",
            info: `The local climate is ${found.climate}, making it pleasant for outdoor tours.`
          }
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch dynamic destination from server:", error);
  }

  return null;
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { id } = await params;
  const destination = await getDestination(id);
  
  if (!destination) {
    return {
      title: "Destination Not Found | NomadAI",
      description: "The requested destination could not be found on NomadAI.",
    };
  }

  return {
    title: `${destination.title} - Travel Guide & AI Planner | NomadAI`,
    description: destination.tagline,
  };
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 text-amber-500 rounded-full mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3">Destination Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          We couldn't find the destination you were looking for. It may have been removed or the ID is incorrect.
        </p>
        <Link href="/explore">
          <Button className="gap-2">
            <Compass className="w-4 h-4" />
            Back to Explore
          </Button>
        </Link>
      </div>
    );
  }

  return <ExploreDetailClient destination={destination} />;
}
