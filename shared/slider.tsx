"use client";
import React, { useMemo } from "react";
import Image from "next/image";

interface Logo {
  id: string;
  image: string;
  name: string;
  width: number;
  height: number;
}

interface SliderProps {
  logos: Logo[];
  duplicate?: boolean;
  duplicateCount?: number;
  slideWidth?: number;
  gap?: number;
  animationDuration?: number;
  direction?: "left" | "right";
}

export default function Slider({
  logos,
  duplicate = true,
  duplicateCount = 8,
  slideWidth = 161.2,
  gap = 50,
  animationDuration = 30,
  direction = "left",
}: SliderProps) {
  const displayLogos = useMemo(() => {
    if (!duplicate) {
      return logos;
    }

    // Create duplicated array for infinite scrolling
    const duplicatedLogos = [];
    for (let i = 0; i < duplicateCount; i++) {
      duplicatedLogos.push(
        ...logos.map((logo, index) => ({
          ...logo,
          id: `${logo.id}-duplicate-${i}-${index}`,
        }))
      );
    }
    return duplicatedLogos;
  }, [logos, duplicate, duplicateCount]);

  const singleSetWidth = displayLogos.length * (slideWidth + gap);

  return (
    <div className='py-4 mb-5 slider-container bg-[#ffe7a5] overflow-hidden'>
      <div className='relative'>
        <div
          className={`flex slider-track ${direction === "left" ? "slide-left" : "slide-right"}`}
          style={
            {
              gap: `${gap}px`,
              "--single-set-width": `${singleSetWidth}px`,
              "--animation-duration": `${animationDuration}s`,
            } as React.CSSProperties
          }
        >
          {/* First set of logos */}
          {displayLogos.map((logo) => (
            <div
              key={logo.id}
              className='flex-shrink-0'
              style={{ width: `${slideWidth}px` }}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className='h-auto w-fit mx-auto hover:opacity-100 transition-opacity duration-300 hover:grayscale-0'
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {displayLogos.map((logo) => (
            <div
              key={`${logo.id}-duplicate`}
              className='flex-shrink-0'
              style={{ width: `${slideWidth}px` }}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className='h-auto w-fit mx-auto hover:opacity-100 transition-opacity duration-300 hover:grayscale-0'
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slide-left {
          animation: slideLeft var(--animation-duration) linear infinite;
        }

        .slide-right {
          animation: slideRight var(--animation-duration) linear infinite;
        }

        .slider-container:hover .slider-track {
          animation-play-state: paused;
        }

        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--single-set-width)));
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(calc(-1 * var(--single-set-width)));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
