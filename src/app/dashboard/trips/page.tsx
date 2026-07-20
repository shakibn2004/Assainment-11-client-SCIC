"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Plus, CheckCircle2, CreditCard, Calendar as CalendarIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function TripsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paymentIntent = searchParams?.get("payment_intent");
    const redirectStatus = searchParams?.get("redirect_status");
    const purchaseType = searchParams?.get("purchase_type");
    const purchaseTitle = searchParams?.get("title");

    if (paymentIntent && redirectStatus === "succeeded" && purchaseType === "trip") {
      // Verify payment with backend
      const verifyPayment = async () => {
        try {
          const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
          const res = await fetch(`${baseUrl}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ paymentIntentId: paymentIntent }),
          });

          if (res.ok) {
            setSuccessMessage(`🎉 Congratulations! Your booking for ${purchaseTitle || "your trip"} was successful!`);
            // Clean up URL so we don't verify again on refresh
            router.replace("/dashboard/trips", { scroll: false });
          }
        } catch (error) {
          console.error("Payment verification failed", error);
        }
      };

      verifyPayment();
    }
  }, [searchParams, router]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
        const res = await fetch(`${baseUrl}/api/trips`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setTrips(data);
        }
      } catch (error) {
        console.error("Failed to fetch trips", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [successMessage]); // Re-fetch when a new booking is confirmed

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner message="Loading trips..." />
      </div>
    );
  }

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

      {successMessage && (
        <Card className="border-green-500/20 bg-green-500/5 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-green-700 dark:text-green-400 text-lg">Booking Confirmed!</h3>
              <p className="text-green-600 dark:text-green-500/80">{successMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip._id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative">
                {/* Fallback image if we don't store actual images per trip */}
                <img
                  src={trip.imageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80"}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary capitalize">
                  {trip.status}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Booked on {new Date(trip.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">${(trip.amount / 100).toFixed(2)}</span>
                  <div className="flex gap-2">
                    {trip.paymentDetails?.receiptUrl && (
                      <Link href={trip.paymentDetails.receiptUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">Receipt</Button>
                      </Link>
                    )}
                    <Dialog>
                      <DialogTrigger render={<Button variant="default" size="sm" />}>
                        View Details
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl border-none">
                        <div className="relative h-64 w-full">
                          <img 
                            src={trip.imageUrl || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80"}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <DialogHeader>
                              <DialogTitle className="text-3xl font-black text-white text-left">{trip.title}</DialogTitle>
                            </DialogHeader>
                            <p className="text-white/80 font-medium flex items-center gap-1 text-sm mt-1">
                              <MapPin className="w-4 h-4" /> Destination
                            </p>
                          </div>
                        </div>
                        <div className="p-6 space-y-6 bg-card">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-primary" /> Booking Date
                              </p>
                              <p className="font-semibold text-lg">{new Date(trip.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="text-primary font-bold text-lg leading-none">$</span> Amount Paid
                              </p>
                              <p className="font-semibold text-lg">${(trip.amount / 100).toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="border-t pt-6 space-y-4">
                            <h4 className="font-bold flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-primary" /> Payment Information
                            </h4>
                            {trip.paymentDetails && (trip.paymentDetails.brand || trip.paymentDetails.last4) ? (
                              <div className="bg-muted/50 rounded-xl p-4 flex justify-between items-center">
                                <div>
                                  <p className="font-medium capitalize">{trip.paymentDetails.brand} ending in {trip.paymentDetails.last4}</p>
                                  <p className="text-sm text-muted-foreground">Payment successfully captured.</p>
                                </div>
                                {trip.paymentDetails.receiptUrl && (
                                  <Link href={trip.paymentDetails.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm">View Receipt</Button>
                                  </Link>
                                )}
                              </div>
                            ) : (
                              <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                                Detailed payment method information is not available for this trip.
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed shadow-none">
          <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <Plane className="w-8 h-8" />
            </div>
            <CardTitle className="text-xl">No trips planned yet</CardTitle>
            <CardDescription className="max-w-md">
              You haven&apos;t generated any itineraries yet. Head over to the AI Planner to craft your next dream vacation!
            </CardDescription>
            <Link href="/dashboard/ai-planner">
              <Button variant="outline" className="mt-4">
                Try the AI Planner
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function TripsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner message="Loading trips..." />
      </div>
    }>
      <TripsContent />
    </Suspense>
  );
}
