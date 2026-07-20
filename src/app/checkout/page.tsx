"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Lock, ShieldCheck, Check, Zap, ArrowLeft, Plane } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

function CheckoutForm({ displayAmount, purchaseType, title }: { displayAmount: string, purchaseType: string, title: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/${purchaseType === "trip" ? "trips" : "chat"}?purchase_type=${purchaseType}&title=${encodeURIComponent(title)}`, // Redirect on success
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="space-y-6">
      {/* Payment Options (Visual only for now) */}
      <div className="flex gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 border-2 border-primary bg-primary/5 rounded-lg py-3 cursor-pointer transition-all shadow-sm">
          <CreditCard className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">Card</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 border border-border bg-card rounded-lg py-3 opacity-50 cursor-not-allowed">
          <Wallet className="w-5 h-5" />
          <span className="font-semibold text-sm">PayPal</span>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm font-medium mt-2">
          {errorMessage}
        </div>
      )}

      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-primary/40"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" /> Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="w-5 h-5" /> Pay ${displayAmount}
            </span>
          )}
        </Button>
      </div>
      
      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        Secured by Stripe
      </p>
    </form>
  );
}

function CheckoutContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState("");
  const [initializationError, setInitializationError] = useState<string | null>(null);

  const titleParam = searchParams?.get("title");
  const amountParam = searchParams?.get("amount");
  const typeParam = searchParams?.get("type");
  const imageUrlParam = searchParams?.get("imageUrl");

  const title = titleParam || "Nomad Pro";
  const type = typeParam || "subscription";
  const amount = amountParam ? parseInt(amountParam, 10) : 1500;
  let imageUrl = imageUrlParam || "";
  if (imageUrl === "undefined") imageUrl = "";
  const displayAmount = (amount / 100).toFixed(2);

  useEffect(() => {
    if (!isPending && !session) {
      const callbackPath = `/checkout?title=${titleParam || ""}&amount=${amountParam || ""}&type=${typeParam || ""}&imageUrl=${encodeURIComponent(imageUrlParam || "")}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
    }
  }, [session, isPending, router, titleParam, amountParam, typeParam, imageUrlParam]);

  useEffect(() => {
    if (!session) return;
    
    // Fetch client secret from backend
    const fetchClientSecret = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        
        // Prevent double booking for trips
        if (type === "trip") {
          const tripRes = await fetch(`${baseUrl}/api/trips`, { credentials: "include" });
          if (tripRes.ok) {
            const tripsData = await tripRes.json();
            if (tripsData.some((trip: any) => trip.title === title)) {
              setInitializationError(`You have already booked the ${title} trip. Head to your dashboard to view it.`);
              return;
            }
          }
        }

        const response = await fetch(`${baseUrl}/api/payment/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, purchaseType: type, title, imageUrl }),
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch client secret");
        }

        setClientSecret(data.clientSecret);
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Error fetching client secret:", err);
        setInitializationError(err.message || "Could not connect to payment server.");
      }
    };

    fetchClientSecret();
  }, [session, amount]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner message="Verifying session..." />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const appearance = {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#0f172a',
      colorBackground: 'transparent',
      colorText: '#f8fafc',
    },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden bg-background w-full">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Left Column: Payment Details */}
        <div className="lg:col-span-7 w-full">
          <div className="mb-8">
            <Link href={type === "trip" ? "/explore" : "/pricing"} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to {type === "trip" ? "Explore" : "Pricing"}
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Checkout</h1>
            <p className="text-muted-foreground">
              {type === "trip" ? `Complete your booking for ${title}.` : "Complete your subscription to Nomad Pro."}
            </p>
          </div>

          <Card className="border-border/50 shadow-xl bg-card/60 backdrop-blur-xl relative overflow-hidden">
            {/* Subtle glow border effect inside card */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </CardTitle>
              <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent>
              {initializationError ? (
                <div className="py-12 flex flex-col justify-center items-center text-center space-y-4">
                  <div className="text-red-500 font-medium text-lg">Failed to load checkout</div>
                  <div className="text-sm text-muted-foreground">{initializationError}</div>
                  <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
                </div>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                  <CheckoutForm displayAmount={displayAmount} purchaseType={type} title={title} />
                </Elements>
              ) : (
                <div className="py-12 flex justify-center items-center">
                  <div className="animate-pulse flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5" /> Initializing secure checkout...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 w-full">
          <Card className="border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 via-card to-background lg:sticky lg:top-24 mt-8 lg:mt-0">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-primary">{title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type === "trip" ? "One-time booking" : "Monthly subscription"}
                  </p>
                </div>
                <div className="text-2xl font-black">${displayAmount}</div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                {type === "trip" ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Plane className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90">Curated Travel Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90">24/7 Priority Support</span>
                    </div>
                  </>
                ) : (
                  [
                    "Unlimited AI-generated itineraries",
                    "Real-time adaptation & updates",
                    "Export to Google Calendar",
                    "Priority AI processing"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90">{feature}</span>
                    </div>
                  ))
                )}
              </div>

            </CardContent>
            <CardFooter className="flex-col gap-4 bg-muted/20 border-t border-border/50 pt-6 rounded-b-xl">
              <div className="w-full flex justify-between items-center font-bold text-xl">
                <span>Total Due Today</span>
                <span className="text-primary">${displayAmount}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. 
                {type === "subscription" && ` You will be charged $${displayAmount} every month until you cancel.`}
              </p>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner message="Loading checkout..." />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
