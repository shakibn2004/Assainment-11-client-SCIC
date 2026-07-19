import Link from "next/link";
import { Compass, Globe, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">NomadAI</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            Your personal Agentic AI travel assistant. Discover, plan, and experience the world effortlessly.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Globe size={20}/></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Mail size={20}/></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Phone size={20}/></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><MapPin size={20}/></Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">Destinations</Link></li>
            <li><Link href="#" className="hover:text-foreground">Itineraries</Link></li>
            <li><Link href="/ai-assistant" className="hover:text-foreground">AI Assistant</Link></li>
            <li><Link href="#" className="hover:text-foreground">Recommendations</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
            <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NomadAI. All rights reserved.</p>
      </div>
    </footer>
  );
};
