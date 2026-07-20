"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Compass, UserCircle, Loader2, Menu, X, Crown, Gem } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";

const PlanBadge = ({ plan }: { plan?: string }) => {
  if (plan === "enterprise") {
    return (
      <span className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-purple-400/50">
        <Gem className="w-3.5 h-3.5" />
        ENTERPRISE
      </span>
    );
  }
  if (plan === "pro") {
    return (
      <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-amber-300/50">
        <Crown className="w-3.5 h-3.5" />
        PRO
      </span>
    );
  }
  // Default to Free
  return (
    <span className="flex items-center gap-1.5 bg-gradient-to-r from-slate-400 to-slate-500 text-white px-2.5 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-slate-300/50">
      <UserCircle className="w-3.5 h-3.5" />
      FREE
    </span>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">NomadAI</span>
        </Link>
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            ) : isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
            <div className="ml-2 border-l pl-4 border-border">
              <ThemeToggle />
            </div>
          </div>

          {/* Hamburger Menu Toggle for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background/95 backdrop-blur px-4 py-4 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t pt-4 flex flex-col gap-3">
            {isPending ? (
              <div className="flex justify-center py-2">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-4 w-full">
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                    <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                  </Link>
                </div>
                <Button variant="outline" className="w-full justify-start" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full justify-start">Get Started</Button>
                </Link>
              </>
            )}
            <div className="flex items-center justify-between border-t pt-4 px-2">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
