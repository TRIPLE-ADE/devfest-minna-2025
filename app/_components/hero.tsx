"use client";
import React, { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function getEventStatus(startDate: Date, endDate: Date) {
  const now = new Date();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const currentTime = now.getTime();

  if (currentTime < startTime) {
    const diff = startTime - currentTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      status: "before" as const,
      timeLeft: {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      },
    };
  } else if (currentTime >= startTime && currentTime <= endTime) {
    return {
      status: "during" as const,
      timeLeft: null,
    };
  } else {
    return {
      status: "after" as const,
      timeLeft: null,
    };
  }
}

export default function Hero() {
  const eventStartDate = useMemo(() => {
    return new Date("2025-11-08T09:00:00Z");
  }, []);

  const eventEndDate = useMemo(() => {
    return new Date("2025-11-08T18:00:00Z");
  }, []);

  const [eventState, setEventState] = useState(
    getEventStatus(eventStartDate, eventEndDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setEventState(getEventStatus(eventStartDate, eventEndDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventStartDate, eventEndDate]);

  const colors = [
    "bg-pastel-blue",
    "bg-pastel-red",
    "bg-pastel-yellow",
    "bg-pastel-green",
  ];

  return (
    <section className="flex relative flex-col items-center justify-center min-h-[80vh] pb-10 px-4 md:px-12 font-sans text-center">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
                linear-gradient(to right, #1e1e1e 1px, transparent 1px),
                linear-gradient(to bottom, #1e1e1e 1px, transparent 1px)
              `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="w-full max-w-6xl relative container">
        <div>
          <Image
            src="/assets/devfest-logo-2.webp"
            alt="DevFest Minna 2025 Logo"
            width={1200}
            height={500}
            className="mx-auto w-full max-w-5xl h-auto"
            priority
          />
        </div>

        {/* Dynamic content based on event status */}
        {eventState.status === "before" && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-5 font-sans">
              Countdown to the main event
            </h2>

            <div className="flex justify-center gap-4 flex-wrap">
              {Object.entries(eventState.timeLeft!).map(
                ([unit, value], index) => (
                  <div
                    key={unit}
                    className={`${colors[index]} text-black rounded-2xl shadow-lg p-6 min-w-[100px] text-center border-4 border-[#1e1e1e] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                    animate-pulse-slow relative overflow-hidden`}
                  >
                    <div className="text-5xl md:text-6xl font-black">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs font-bold mt-2 uppercase tracking-wide">
                      {unit}
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}

        {eventState.status === "during" && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-5 font-sans">
              🎉 DevFest Minna 2025 is Live! 🎉
            </h2>
            <div className="bg-red-500 text-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-4 border-[#1e1e1e] animate-pulse">
              <div className="text-2xl md:text-3xl font-black mb-4">
                EVENT IN PROGRESS
              </div>
              <div className="text-lg font-semibold">
                Join us for an amazing day of learning and networking!
              </div>
            </div>
          </div>
        )}

        {eventState.status === "after" && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-5 font-sans">
              Thank You for Joining DevFest Minna 2025! 🙏
            </h2>
            <div className="bg-green-500 text-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-4 border-[#1e1e1e]">
              <div className="text-2xl md:text-3xl font-black mb-4">
                EVENT COMPLETED
              </div>
              <div className="text-lg font-semibold mb-4">
                We hope you had an amazing experience!
              </div>
              <div className="text-base">
                Stay connected for updates on future events and resources.
              </div>
            </div>
          </div>
        )}

        {/* Action buttons - contextual based on event status */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 max-w-2xl mx-auto">
          <Link
            href="/get-dp"
            className="bg-accent-orange hover:scale-105 text-[#1e1e1e] hover:bg-background font-bold px-8 py-4 rounded-full border border-black shadow-sm hover:shadow-md transition-all duration-200 text-lg md:text-2xl flex-1 text-center font-sans"
          >
            Generate DP
          </Link>

          {eventState.status === "before" && (
            <Link
              href="https://gdg.community.dev/events/details/google-gdg-minna-presents-devfest-minna-2025/cohost-gdg-minna"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background hover:scale-105 hover:bg-accent-orange border border-black text-[#1e1e1e] font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-lg md:text-2xl flex-1 text-center font-sans"
            >
              Register for Event
            </Link>
          )}

          {eventState.status === "during" && (
            <Link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 hover:scale-105 hover:bg-red-600 border border-black text-white font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-lg md:text-2xl flex-1 text-center font-sans"
            >
              Join Live Event
            </Link>
          )}

          {eventState.status === "after" && (
            <Link
              href="/speakers"
              className="bg-background hover:scale-105 hover:bg-accent-orange border border-black text-[#1e1e1e] font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-lg md:text-2xl flex-1 text-center font-sans"
            >
              View Speakers
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
