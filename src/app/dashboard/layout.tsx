"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Plane, Map, Settings, Loader2, MessageSquare, Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null; // Redirecting...
  }

  const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Trips", href: "/dashboard/trips", icon: Plane },
    { name: "AI Planner", href: "/dashboard/ai-planner", icon: Map },
    { name: "Chat with AI", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-muted/40">
      {/* Mobile Dashboard Header */}
      <div className="flex md:hidden items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-30">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Dashboard</span>
          <span className="text-sm font-bold text-foreground">
            {sidebarLinks.find(link => link.href === pathname)?.name || "Overview"}
          </span>
        </div>
        <button
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Toggle Dashboard Menu"
        >
          {isMobileDrawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r bg-background hidden md:block shrink-0">
        <div className="p-6">
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground truncate">
            Welcome back, {session.user?.name?.split(" ")[0] || "Traveler"}
          </p>
        </div>
        <nav className="space-y-1 px-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer Overlay & Sidebar */}
      {isMobileDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 border-r bg-background z-50 p-6 flex flex-col md:hidden animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
                <p className="text-xs text-muted-foreground truncate">
                  Welcome back, {session.user?.name?.split(" ")[0] || "Traveler"}
                </p>
              </div>
              <button 
                onClick={() => setIsMobileDrawerOpen(false)} 
                className="p-1 rounded-md hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
