import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative bg-background border shadow-xl rounded-full p-8 flex items-center justify-center">
          <Map className="w-24 h-24 text-muted-foreground opacity-20 absolute" />
          <Compass className="w-20 h-20 text-primary animate-spin relative z-10" style={{ animationDuration: '10s' }} />
        </div>
      </div>
      
      <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-foreground">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Off the Beaten Path
      </h2>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        Looks like you've wandered into uncharted territory. The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex gap-4">
        <Link href="/">
          <Button size="lg" className="h-12 px-8">
            Return to Civilization
          </Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline" size="lg" className="h-12 px-8">
            Explore Destinations
          </Button>
        </Link>
      </div>
    </div>
  );
}
