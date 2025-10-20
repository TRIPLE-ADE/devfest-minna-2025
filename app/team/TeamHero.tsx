import { MapPin, Calendar } from "lucide-react";
import "./team.module.css";
import React from "react";
import Image from "next/image";

const TeamHero = () => {
  return (
    <header className='bg-card'>
      <div className='container mx-auto px-4 py-12 md:py-16'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-5xl uppercase md:text-7xl font-black leading-tight mb-4 text-greyscale-dark'>
            Meet The Team
          </h1>
          <h2 className='text-lg md:text-xl font-semibold mb-8 text-greyscale-dark/80'>
            Meet the brilliant minds and passionate hearts powering DevFest
            Minna 2025, the organizers and volunteers shaping Minna’s biggest
            tech experience. Driven by collaboration. United by innovation.
          </h2>
        </div>
      </div>
    </header>
  );
};

export default TeamHero;
