"use client";

import { useState, useEffect } from "react";
import { getRecentDPs, type DPRecord } from "@/lib/appwrite";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Plus, Users, Calendar, MapPin } from "lucide-react";
import SectionHeader from "@/shared/section-header";

export default function DPGalleryPage() {
  const [dps, setDps] = useState<DPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const PAGE_SIZE = 24;

  useEffect(() => {
    const fetchDPs = async () => {
      try {
        const recentDPs = await getRecentDPs(PAGE_SIZE); // Initial load
        setDps(recentDPs);
        setOffset(recentDPs.length);
      } catch (err) {
        console.error("Error fetching DPs:", err);
        setError("Failed to load profile pictures. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDPs();
  }, []);

   const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const moreDPs = await getRecentDPs(PAGE_SIZE, offset); // Fetch next page
      setDps((prev) => [...prev, ...moreDPs]);
      setOffset((prev) => prev + moreDPs.length);
    } catch (err) {
      console.error("Error loading more DPs:", err);
      setError("Failed to load more profile pictures. Please try again later.");
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-greyscale-dark mb-4">
              DevFest Community Gallery
            </h1>
            <p className="text-lg text-greyscale-dark/80 mb-8">
              Loading amazing profile pictures...
            </p>

            {/* Loading skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-greyscale-dark mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-greyscale-dark/80 mb-6">{error}</p>
          <Link href="/get-dp">
            <Button className="bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark">
              Create Your DP
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <SectionHeader
            title="Community Gallery"
            subtitle="See amazing profile pictures created by our DevFest Minna 2025 attendees!"
          />

          {/* Event Info */}
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-accent-orange mb-2" />
                <h3 className="font-bold text-greyscale-dark">
                  November 8, 2025
                </h3>
                <p className="text-greyscale-dark/70 text-sm">Save the Date</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-accent-orange mb-2" />
                <h3 className="font-bold text-greyscale-dark">
                  Rasheedat Restaurant
                </h3>
                <p className="text-greyscale-dark/70 text-sm">
                  Minna, Niger State
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-accent-orange mb-2" />
                <h3 className="font-bold text-greyscale-dark">
                  {dps.length}+ Attendees
                </h3>
                <p className="text-greyscale-dark/70 text-sm">And counting!</p>
              </div>
            </div>
          </div>

          {/* Create DP Button */}
          <Link href="/get-dp">
            <Button
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark font-bold mb-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your DP
            </Button>
          </Link>
        </div>

        {/* DPs Grid */}
        {dps.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-greyscale-dark mb-4">
              Be the First!
            </h3>
            <p className="text-greyscale-dark/80 mb-6">
              No profile pictures yet. Create the first one and start the
              community!
            </p>
            <Link href="/get-dp">
              <Button className="bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark">
                Create First DP
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
              {dps.map((dp) => (
                <Link key={dp.id} href={`/dp/${dp.id}`}>
                  <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-accent-yellow">
                    <Image
                      src={dp.imageUrl}
                      alt={`${dp.name}'s DevFest DP`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    />

                    {/* Overlay with name */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-bold text-sm text-center bg-black/50 rounded-full px-2 py-1 truncate">
                        {dp.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button (for future implementation) */}
            {dps.length >= PAGE_SIZE && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-greyscale-dark text-greyscale-dark hover:bg-greyscale-dark hover:text-white"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load More DPs"}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-greyscale-dark rounded-3xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Join the DevFest Minna 2025 Community!
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Create your profile picture and show your excitement for the biggest
            tech event in Minna
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-dp">
              <Button
                size="lg"
                className="bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark font-bold"
              >
                Create Your DP
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-greyscale-dark"
              >
                Learn More About DevFest
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
