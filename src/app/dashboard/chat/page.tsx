"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Hi there! I'm your NomadAI travel assistant. Where would you like to explore next? I can help with recommendations, travel tips, and packing lists!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status");
    const purchaseType = searchParams.get("purchase_type");
    const purchaseTitle = searchParams.get("title");

    if (paymentIntent && redirectStatus === "succeeded") {
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
            const successMessage = purchaseType === "trip"
              ? `🎉 **Congratulations!** Your booking for **${purchaseTitle || "your trip"}** was successful! Our AI is ready to help you customize your itinerary.`
              : `🎉 **Congratulations!** Your payment was successful and you are now subscribed to Nomad Pro. You can now access advanced AI features and real-time adaptations.`;
            
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                role: "model",
                content: successMessage,
              }
            ]);
            // Clean up URL so we don't verify again on refresh
            router.replace("/dashboard/chat");
          }
        } catch (error) {
          console.error("Failed to verify payment:", error);
        }
      };

      verifyPayment();
    }
  }, [searchParams, router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send message along with history to the backend API
      const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
      const res = await fetch(`${baseUrl}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          history: messages.map(msg => ({ role: msg.role, content: msg.content })) 
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response.");
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: `**Error:** ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat with AI</h1>
        <p className="text-muted-foreground">Your 24/7 personal travel companion.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-background">
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.role === "model" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted text-foreground rounded-2xl px-4 py-3 max-w-[80%] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm">Nomad is thinking...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSend} className="flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Ask about travel tips, packing lists, or places to visit... (Shift + Enter for new line)"
              className="flex-1 min-h-[60px] max-h-[200px] resize-none"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} className="mb-1">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
