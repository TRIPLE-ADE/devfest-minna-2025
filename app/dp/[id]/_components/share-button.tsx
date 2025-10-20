"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface ShareButtonProps {
  name: string;
  shareUrl: string;
}

export default function ShareButton({ name, shareUrl }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s DevFest Minna 2025 DP`,
          text: `Check out ${name}'s DevFest Minna 2025 profile picture! Join us at DevFest Minna on November 8th.`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="flex items-center justify-center gap-2"
    >
      <Share2 size={20} />
      Share This DP
    </Button>
  );
}
