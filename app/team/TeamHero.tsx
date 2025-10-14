import { MapPin, Calendar } from "lucide-react";
import "./team.module.css";
import React from "react";
import Image from "next/image";

const TeamHero = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-3 mb-6">
            <h1 className="text-9xl uppercase md:text-9xl font-black leading-tight mb-4 bungee-shade-regular">
              Meet The Team
            </h1>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed subtitle-muted">
              Meet the brilliant minds and passionate hearts powering DevFest
              Minna 2025, the organizers and volunteers shaping Minna’s biggest
              tech experience. Driven by collaboration. United by innovation.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeamHero;
