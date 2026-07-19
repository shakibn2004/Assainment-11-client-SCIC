"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Plus } from "lucide-react";
import Link from "next/link";

export default function TripsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
          <p className="text-muted-foreground">Manage your upcoming and past itineraries.</p>
        </div>
        <Link href="/dashboard/ai-planner">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      <Card className="border-dashed shadow-none">
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <Plane className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl">No trips planned yet</CardTitle>
          <CardDescription className="max-w-md">
            You haven't generated any itineraries yet. Head over to the AI Planner to craft your next dream vacation!
          </CardDescription>
          <Link href="/dashboard/ai-planner">
            <Button variant="outline" className="mt-4">
              Try the AI Planner
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
