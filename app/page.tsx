import React from "react";
import Hero from "@/app/_components/hero";
import Slider from "@/app/_components/slider";
import Community from "@/app/_components/community";
import Faqs from "@/app/_components/faqs";
import Host from "@/app/_components/host";
import Venue from "@/app/_components/venue";
import Speakers from "@/app/_components/speakers";

export default function Home() {
  const logos = [
    {
      id: "devfest-logo-5",
      image: "/assets/devfest-logo-5.webp",
      name: "DevFest Logo 5",
      width: 200,
      height: 160,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Hero />
        <Slider
          logos={logos}
          duplicate
          duplicateCount={5}
          animationDuration={15}
        />
        <Slider logos={logos} animationDuration={15} direction="right" />
        <Speakers />
        <Venue />
        <Host />
        <Community />
        <Faqs />
      </main>
    </div>
  );
}
