"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Linkedin, Twitter } from "lucide-react";
import SectionHeader from "@/shared/section-header";

const Speakers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPending, startTransition] = useTransition();
  const [showContent, setShowContent] = useState(true);

  const speakers = [
    {
      id: 1,
      name: "Mudasiru Rasheed Taiwo",
      title: "Google Developer Expert | DevOps Engineer",
      image: "/assets/speakers/mudasiru-rasheed-taiwo.webp",
      bio: "Gemma: Inferences and building a MaaS",
      linkedin: "https://www.linkedin.com/in/rasheedtaiwo/",
      twitter: "https://x.com/taiwrash"
    },
    {
      id: 2,
      name: "Temidayo Akintoye",
      title: "Software QA Engineer",
      image: "/assets/speakers/temidayo-akintoye.webp",
      bio: "Ethics in AI-driven Testing: who tests the testers?",
      linkedin: "https://www.linkedin.com/in/temidayo-akintoye-b90476110/",
      twitter: "https://x.com/97th_noir"
    },
    {
      id: 3,
      name: "Gabriella Amaefule",
      title: "Backend Engineer - Fintech",
      image: "/assets/speakers/gabriella-amaefule.webp",
      bio: "Maximizing Your CPU to Scale Your Backend Vertically on Google cloud run",
      linkedin: "https://www.linkedin.com/in/gabriellaamah/",
      twitter: "https://x.com/Amaefule_Gabbie"
    },
    {
      id: 4,
      name: "Daniel Egbe",
      title: "Content strategist: Migraine Disorder",
      image: "/assets/speakers/daniel-egbe.webp",
      bio: "The New Renaissance: How AI is Democratizing Creativity in Tech",
      linkedin: "https://www.linkedin.com/in/danielegbe/",
      twitter: "https://x.com/DeethePublisher"
    },
    {
      id: 5,
      name: "Fauziya Mohammed",
      title: "Experience Design Manager at Ashoka Changemakers",
      image: "/assets/speakers/fauziya-mohammed.webp",
      bio: "Building Better Experiences Through Product Documentation",
      linkedin: "http://www.linkedin.com/in/MohammedFauziya",
      twitter: "https://x.com/Ziya_mg"
    },
    {
      id: 6,
      name: "Shehu Ibrahim Muhammad",
      title: "Head of Management Information System, Abdulkadir Kure University, Minna",
      image: "/assets/speakers/shehu-ibrahim-muhammad.webp",
      bio: "Escaping the Hustle Trap: Building a Tech Career Without a Computer Science Background",
      linkedin: "",
      twitter: "https://x.com/Shehu_Hikmah"
    },
    {
      id: 7,
      name: "Samuel Adeniyi",
      title: "CEO, Binarify",
      image: "/assets/speakers/samuel-adeniyi.webp",
      bio: "AI Without Code: Scaling Startups and Empowering Developers Through Intelligent Integrations",
      linkedin: "https://www.linkedin.com/in/samuel-adeniyi-862279149/",
      twitter: "https://x.com/samdimsx"
    },
    {
      id: 8,
      name: "Muiz Aminu",
      title: "Embedded Systems & Mobile App Developer",
      image: "/assets/speakers/muiz-aminu.webp",
      bio: "Developing Bidirectional IoT with Flutter and Firebase from Sensor Data to Device Control.",
      linkedin: "https://www.linkedin.com/in/muiz-aminu/",
      twitter: ""
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setShowContent(false);
      startTransition(() => {
        setDirection("next");
        setCurrentSlide((prev) => (prev + 1) % speakers.length);
        setTimeout(() => setShowContent(true), 100);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, speakers.length, startTransition]);

  const handleSlideChange = (
    newIndex: number,
    slideDirection: "next" | "prev"
  ) => {
    if (isPending) return;

    setShowContent(false);
    startTransition(() => {
      setDirection(slideDirection);
      setCurrentSlide(newIndex);
      setTimeout(() => setShowContent(true), 50);
    });
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % speakers.length;
    handleSlideChange(newIndex, "next");
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + speakers.length) % speakers.length;
    handleSlideChange(newIndex, "prev");
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide || isPending) return;
    const slideDirection = index > currentSlide ? "next" : "prev";
    handleSlideChange(index, slideDirection);
  };

  const currentSpeaker = speakers[currentSlide];

  return (
    <section>
      <div className='container py-20 md:py-24 mx-auto px-4 relative'>
        <SectionHeader
          title='Speakers'
          subtitle='Get a glimpse of our amazing speakers who will share their expertise at DevFest Minna 2025'
        />
        <div
          className='max-w-6xl mx-auto relative'
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Featured Speaker Card */}
          <div className='bg-white rounded-3xl overflow-hidden shadow-2xl relative'>
            <div className='grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px]'>
              {/* Speaker Image */}
              <div className='relative h-[400px] lg:h-[500px] overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10' />
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isPending
                      ? direction === "next"
                        ? "transform translate-x-full opacity-0"
                        : "transform -translate-x-full opacity-0"
                      : "transform translate-x-0 opacity-100"
                  }`}
                >
                  <Image
                    src={currentSpeaker.image}
                    alt={currentSpeaker.name}
                    fill
                    className='object-cover transition-transform duration-700 ease-out hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 50vw'
                  />
                </div>
                {/* Floating accent element */}
                <div
                  className={`absolute top-6 right-6 w-12 h-12 bg-accent-yellow rounded-full animate-pulse-slow z-20 transition-all duration-300 ${
                    isPending ? "opacity-0 scale-75" : "opacity-100 scale-100"
                  }`}
                />
              </div>

              {/* Speaker Info */}
              <div className='p-8 lg:p-12'>
                <div
                  key={currentSpeaker.id}
                  className={`transition-all duration-500 ease-in-out ${
                    isPending
                      ? direction === "next"
                        ? "transform translate-x-8 opacity-0"
                        : "transform -translate-x-8 opacity-0"
                      : "transform translate-x-0 opacity-100"
                  }`}
                >
                  <div
                    className={`inline-block px-3 py-1 bg-accent-yellow/60 rounded-full text-sm font-bold text-greyscale-dark mb-4 transition-all duration-300 ${
                      showContent && !isPending
                        ? "animate-stagger-1"
                        : "opacity-0"
                    }`}
                  >
                    Featured Speaker
                  </div>
                  <h3
                    className={`text-3xl md:text-4xl font-black text-greyscale-dark mb-2 transition-all duration-400 ${
                      showContent && !isPending
                        ? "animate-stagger-2"
                        : "opacity-0"
                    }`}
                  >
                    {currentSpeaker.name}
                  </h3>
                  <p
                    className={`text-xl font-semibold text-accent-orange mb-4 transition-all duration-450 ${
                      showContent && !isPending
                        ? "animate-stagger-3"
                        : "opacity-0"
                    }`}
                  >
                    {currentSpeaker.title}
                  </p>
                  <p
                    className={`text-greyscale-dark/80 mb-6 leading-relaxed transition-all duration-500 ${
                      showContent && !isPending
                        ? "animate-stagger-4"
                        : "opacity-0"
                    }`}
                  >
                    {currentSpeaker.bio}
                  </p>

                  {/* Social Media Links */}
                  <div
                    className={`flex gap-4 mb-8 transition-all duration-500 ${
                      showContent && !isPending
                        ? "animate-stagger-4"
                        : "opacity-0"
                    }`}
                  >
                    {currentSpeaker.linkedin && (
                      <Link
                        href={currentSpeaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                        aria-label={`${currentSpeaker.name} LinkedIn profile`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {currentSpeaker.twitter && (
                      <Link
                        href={currentSpeaker.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                        aria-label={`${currentSpeaker.name} Twitter profile`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                  </div>

                  {/* Call to Action Button */}
                  <div
                    className={`${
                      showContent && !isPending
                        ? "animate-stagger-4"
                        : "opacity-0"
                    }`}
                  >
                    <Link
                      href='/speakers'
                      className='inline-flex w-fit hover:scale-105 items-center h-10 sm:h-12 px-4 sm:px-5 rounded-full gap-2  text-black bg-accent-orange font-semibold hover:gap-3 transition-all'
                    >
                      View All Speakers
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={isPending}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 ${
                isPending ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
              aria-label='Previous speaker'
            >
              <ChevronLeft size={24} className='text-greyscale-dark' />
            </button>
            <button
              onClick={nextSlide}
              disabled={isPending}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 ${
                isPending ? "opacity-50 cursor-not-allowed" : "opacity-100"
              }`}
              aria-label='Next speaker'
            >
              <ChevronRight size={24} className='text-greyscale-dark' />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className='flex justify-center mt-6 gap-2'>
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isPending}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-accent-yellow shadow-md"
                    : "w-2 bg-greyscale-dark/30 hover:bg-greyscale-dark/50"
                } ${
                  isPending ? "opacity-50 cursor-not-allowed" : "opacity-100"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className='absolute top-20 left-10 w-20 h-20 bg-halftone-yellow/30 rounded-full animate-pulse-slow' />
        <div
          className='absolute bottom-20 right-10 w-16 h-16 bg-halftone-blue/30 rounded-full animate-pulse-slow'
          style={{ animationDelay: "1s" }}
        />
        <div
          className='absolute top-1/2 left-5 w-12 h-12 bg-halftone-red/30 rounded-full animate-pulse-slow'
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  );
};

export default Speakers;
