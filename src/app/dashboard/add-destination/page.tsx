"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddDestinationPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("low");
  const [climate, setClimate] = useState("tropical");
  const [rating, setRating] = useState("5");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("climate", climate);
      formData.append("rating", rating);
      formData.append("image", imageFile);

      const baseUrl = process.env.NODE_ENV === "production" ? "" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
      
      const res = await fetch(`${baseUrl}/api/destinations`, {
        method: "POST",
        credentials: "include", // Send auth cookie
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to add destination");
      }

      setSuccess(true);
      // Reset form
      setTitle("");
      setLocation("");
      setImageFile(null);
      setRating("5");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Destination</CardTitle>
          <CardDescription>
            Upload a new destination to the Explore page. The image will be hosted on ImgBB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Kyoto Temples" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Japan" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select value={price} onValueChange={(val) => setPrice(val || "low")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Budget</SelectItem>
                    <SelectItem value="medium">Mid-Range</SelectItem>
                    <SelectItem value="high">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Climate</Label>
                <Select value={climate} onValueChange={(val) => setClimate(val || "tropical")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tropical">Tropical</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="arid">Arid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rating (1-5)</Label>
                <Input type="number" min="1" max="5" step="0.1" required value={rating} onChange={(e) => setRating(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Destination Image</Label>
              <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }} 
              />
              <p className="text-xs text-muted-foreground">The image will be securely uploaded to ImgBB.</p>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 rounded-md bg-emerald-500/10 text-emerald-500 text-sm font-medium">
                Destination successfully uploaded! It should now appear on the Explore page.
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Destination
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
