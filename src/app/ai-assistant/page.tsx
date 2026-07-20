"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, User, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

function ChatContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      content: "Hi there! I'm NomadAI. I can help you brainstorm your next vacation, give packing advice, or recommend top destinations. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  
  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (prompt) {
      setInput(prompt);
    }
  }, [searchParams]);

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

  const [showLimitModal, setShowLimitModal] = useState(false);
  const [tokenUsage, setTokenUsage] = useState(0);

  useEffect(() => {
    const savedTokens = localStorage.getItem("nomad_ai_public_tokens");
    if (savedTokens) {
      setTokenUsage(parseInt(savedTokens, 10));
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (tokenUsage >= 5000) {
      setShowLimitModal(true);
      return;
    }

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
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
      
      if (data.tokenCount) {
        setTokenUsage((prev) => {
          const newTotal = prev + data.tokenCount;
          localStorage.setItem("nomad_ai_public_tokens", newTotal.toString());
          return newTotal;
        });
      }
    } catch (error: unknown) {
      const err = error as Error;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: `**Error:** ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="flex flex-col h-[calc(100vh-14rem)] max-w-4xl mx-auto space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Public AI Assistant</h1>
          <p className="text-muted-foreground">Try out our smart travel AI before you sign up.</p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden bg-background shadow-lg border-primary/20">
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
                placeholder="Where should I go for a 3-day weekend? (Shift + Enter for new line)"
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

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md mx-4 shadow-xl border-primary/20 p-6 flex flex-col gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Token Limit Reached</h2>
              <p className="text-muted-foreground mb-6">
                You have used your free allocation of 5000 tokens for the public AI chat. Please log in or register to continue planning your amazing trips with NomadAI!
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/login" className="w-full">
                <Button className="w-full">Log In</Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">Create Free Account</Button>
              </Link>
              <Button variant="ghost" onClick={() => setShowLimitModal(false)} className="mt-2 text-muted-foreground">
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function PublicChatPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <LoadingSpinner message="Loading NomadAI Assistant..." />
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
