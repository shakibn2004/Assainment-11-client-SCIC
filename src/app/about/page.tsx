import { Compass, Users, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About NomadAI</h1>
        <p className="text-xl text-muted-foreground">
          We are redefining the way you explore the world using the power of Agentic AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Travel planning has always been tedious and generic. NomadAI was born from the desire to create truly personalized, context-aware itineraries that adapt to you. 
          </p>
          <p className="text-muted-foreground">
            Our autonomous AI agents work behind the scenes to find the best spots, considering everything from your budget to the current weather at the destination.
          </p>
        </div>
        <div className="h-[300px] bg-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
           <Compass className="w-32 h-32 text-primary opacity-20 absolute" />
           <div className="text-center z-10">
              <div className="text-4xl font-bold text-primary mb-2">2026</div>
              <div className="font-semibold text-foreground">Founded</div>
           </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 text-center mb-20">
        <div className="p-6 bg-muted/20 rounded-xl border">
          <Users className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
          <p className="text-muted-foreground text-sm">Powered by insights from millions of travelers.</p>
        </div>
        <div className="p-6 bg-muted/20 rounded-xl border">
          <Target className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Hyper Personalized</h3>
          <p className="text-muted-foreground text-sm">Every itinerary is uniquely tailored to you.</p>
        </div>
        <div className="p-6 bg-muted/20 rounded-xl border">
          <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Safe & Verified</h3>
          <p className="text-muted-foreground text-sm">We ensure all recommendations meet strict safety standards.</p>
        </div>
      </div>
    </div>
  );
}
