"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Linkedin, Twitter, Globe, MapPin, Clock, Users, ArrowRight, Filter } from "lucide-react";
import SectionHeader from "@/shared/section-header";

const SpeakersPage = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const speakers = [
    {
      id: 1,
      name: "Mudasiru Rasheed Taiwo",
      title: "Google Developer Expert | DevOps Engineer",
      sessionTitle: "Gemma: Inferences and building a MaaS",
      image: "/assets/speakers/mudasiru-rasheed-taiwo.webp",
      bio: "Google Developer Expert focused on building Machine Learning as a Service solutions with cutting-edge AI technologies.",
      fullBio: "Mudasiru is a seasoned DevOps Engineer and Google Developer Expert who specializes in building scalable ML infrastructure and MaaS solutions. With extensive experience in cloud technologies and AI deployment, he helps organizations leverage machine learning capabilities at scale.",
      track: "AI & Machine Learning",
      level: "Advanced",
      location: "Lagos, Nigeria",
      linkedin: "https://www.linkedin.com/in/rasheedtaiwo/",
      twitter: "https://x.com/taiwrash",
      website: "",
      sessionDescription: "Explore how to build and deploy Machine Learning as a Service using Google's Gemma models, covering inference optimization and scalable deployment strategies."
    },
    {
      id: 2,
      name: "Temidayo Akintoye",
      title: "Software QA Engineer at R3mot3",
      sessionTitle: "Ethics in AI-driven Testing: who tests the testers?",
      image: "/assets/speakers/temidayo-akintoye.webp",
      bio: "Quality Assurance Engineer passionate about ethical AI testing and building reliable software systems.",
      fullBio: "Temidayo Akintoye is the Software Quality Assurance Engineer at R3mot3, where she drives the quality strategy for building secure, scalable, and high-performing solutions for remote teams across the globe. She is passionate about ethical AI testing and mentoring the next generation of QA professionals in Africa.",
      track: "Others",
      level: "Introductory",
      location: "Abuja, Nigeria",
      linkedin: "https://www.linkedin.com/in/temidayo-akintoye-b90476110/",
      twitter: "https://x.com/97th_noir",
      website: "",
      sessionDescription: "As AI systems take on the role of writing, executing, and even evaluating tests, this session explores the ethical dimensions of AI in software testing, focusing on transparency, accountability, and fairness."
    },
    {
      id: 3,
      name: "Gabriella Amaefule",
      title: "Backend Engineer - Fintech",
      sessionTitle: "Maximizing Your CPU to Scale Your Backend Vertically on Google Cloud Run",
      image: "/assets/speakers/gabriella-amaefule.webp",
      bio: "Backend Engineer passionate about building scalable and reliable backend servers with expertise in cloud architecture.",
      fullBio: "Software Engineer passionate about building and deploying scalable and reliable backend servers, with a passion for sharing practical insights on software architecture and API design. Gabriella specializes in cloud-native solutions and performance optimization.",
      track: "Web",
      level: "Intermediate",
      location: "Abuja, Nigeria",
      linkedin: "https://www.linkedin.com/in/gabriellaamah/",
      twitter: "https://x.com/Amaefule_Gabbie",
      website: "https://github.com/GabriellaAmah",
      sessionDescription: "Explore how Node.js and Go approach CPU utilization differently, comparing single-threaded event loops vs goroutines for I/O heavy and CPU intensive workloads on Google Cloud Run."
    },
    {
      id: 4,
      name: "Daniel Egbe",
      title: "Content Strategist & Video Editor",
      sessionTitle: "The New Renaissance: How AI is Democratizing Creativity in Tech",
      image: "/assets/speakers/daniel-egbe.webp",
      bio: "Content writer turned video editor specializing in educational content creation and AI-powered creative workflows.",
      fullBio: "Daniel is a content writer turned video editor who creates engaging content for YouTube Shorts, Instagram Reels, and TikTok. With 5 years of experience, he works with international clients and prominent Nigerian creators, specializing in educational and productivity-driven content.",
      track: "AI & Machine Learning",
      level: "Introductory",
      location: "FUTMINNA, Niger State",
      linkedin: "https://www.linkedin.com/in/danielegbe/",
      twitter: "https://x.com/DeethePublisher",
      website: "https://ojdaniel.netlify.app",
      sessionDescription: "Explore the intersection of AI and creativity, discussing how artificial intelligence is democratizing content creation, video editing, and design while examining the limitations and future of creative AI tools."
    },
    {
      id: 5,
      name: "Fauziya Mohammed",
      title: "Experience Design Manager at Ashoka Changemakers",
      sessionTitle: "Building Better Experiences Through Product Documentation",
      image: "/assets/speakers/fauziya-mohammed.webp",
      bio: "Design leader with 8+ years experience creating impactful user experiences for social change and innovation.",
      fullBio: "Fauziya Mohammed (Ziya) is an Experience Design Manager at Ashoka Changemakers, where she leads design initiatives that foster social innovation. With more than eight years of experience designing for social change, she has collaborated with organizations like She Code Africa, where she served as Lead Designer.",
      track: "UI/UX",
      level: "Intermediate",
      location: "Abuja, Nigeria",
      linkedin: "http://www.linkedin.com/in/MohammedFauziya",
      twitter: "https://x.com/Ziya_mg",
      website: "",
      sessionDescription: "Address the critical gap in product documentation within the Nigerian tech ecosystem, sharing strategies for creating comprehensive design documentation that helps teams build better products at scale."
    },
    {
      id: 6,
      name: "Shehu Ibrahim Muhammad",
      title: "Head of MIS, Abdulkadir Kure University",
      sessionTitle: "Escaping the Hustle Trap: Building a Tech Career Without a CS Background",
      image: "/assets/speakers/shehu-ibrahim-muhammad.webp",
      bio: "Self-taught ICT specialist who transitioned from Counseling Psychology to leading digital transformation in education.",
      fullBio: "Self-taught ICT specialist and technology advocate who transitioned from Counseling Psychology into software development, data science, and AI. Currently serves as Head of Management Information System at Abdulkadir Kure University, leading digital transformation initiatives.",
      track: "Others",
      level: "Introductory",
      location: "Minna, Niger State",
      linkedin: "",
      twitter: "https://x.com/Shehu_Hikmah",
      website: "",
      sessionDescription: "Learn practical strategies for breaking into tech without a Computer Science degree, including leveraging free resources, building projects, and creating opportunities through skills and consistency."
    },
    {
      id: 7,
      name: "Samuel Adeniyi",
      title: "CEO, Binarify",
      sessionTitle: "AI Without Code: Scaling Startups Through Intelligent Integrations",
      image: "/assets/speakers/samuel-adeniyi.webp",
      bio: "CEO leading AI-powered no-code solutions for business automation and workflow optimization across Africa.",
      fullBio: "Samuel Adeniyi is the Co-Founder & CEO of Binarify, leading the development of Syncleon, an AI-powered no-code integration engine. With over six years of experience in software engineering and AI integration, he has delivered solutions across GovTech, AgricTech, and EdTech.",
      track: "AI & Machine Learning",
      level: "Introductory",
      location: "Minna, Niger State",
      linkedin: "https://www.linkedin.com/in/samuel-adeniyi-862279149/",
      twitter: "https://x.com/samdimsx",
      website: "https://binarifylimited.com",
      sessionDescription: "Discover how no-code AI can help African startups scale faster through intelligent integrations, with practical examples and opportunities for developers to build and extend these solutions."
    },
    {
      id: 8,
      name: "Muiz Aminu",
      title: "Embedded Systems & Mobile App Developer",
      sessionTitle: "Developing Bidirectional IoT with Flutter and Firebase",
      image: "/assets/speakers/muiz-aminu.webp",
      bio: "IoT specialist creating smart, connected solutions by merging hardware and software with Flutter applications.",
      fullBio: "Muiz Aminu is an Embedded Systems and Mobile App Developer who enjoys merging hardware and software to create smart, connected solutions. He designs end-to-end IoT projects using microcontrollers, cloud platforms, and Flutter for cross-platform apps.",
      track: "Mobile",
      level: "Introductory",
      location: "Minna, Niger State",
      linkedin: "https://www.linkedin.com/in/muiz-aminu/",
      twitter: "",
      website: "",
      sessionDescription: "Learn to build real-time IoT systems that collect sensor data and control actuators using Flutter and Firebase, covering ESP32 setup, database organization, and creating responsive dashboards."
    }
  ];

  const trackColors = {
    "AI & Machine Learning": "bg-accent-blue text-white",
    "Web": "bg-accent-green text-white",
    "Mobile": "bg-accent-orange text-white",
    "UI/UX": "bg-accent-red text-white",
    "Others": "bg-accent-yellow text-greyscale-dark"
  };

  const levelColors = {
    "Introductory": "bg-pastel-green text-greyscale-dark",
    "Intermediate": "bg-pastel-yellow text-greyscale-dark",
    "Advanced": "bg-pastel-red text-greyscale-dark"
  };

  // Get unique tracks from speakers
  const tracks = useMemo(() => {
    const uniqueTracks = Array.from(new Set(speakers.map(speaker => speaker.track).filter(track => track !== "Others")));
    return ["All", ...uniqueTracks, "Others"];
  }, [speakers]);

  // Filter speakers based on selected track
  const filteredSpeakers = useMemo(() => {
    if (selectedTrack === "All") return speakers;
    return speakers.filter(speaker => speaker.track === selectedTrack);
  }, [speakers, selectedTrack]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Sliding Cards */}
      <section className='container mx-auto px-4 lg:px-8 xl:px-12 overflow-hidden '>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Side - Title */}
            <div className='relative'>
              <h1 className='text-5xl uppercase md:text-7xl font-black leading-tight mb-4 text-greyscale-dark'>
                Meet Our Speakers
              </h1>
              <h2 className='text-lg md:text-xl font-semibold mb-8 text-greyscale-dark/80'>
                Learn from industry experts and thought leaders shaping the future
                of technology across Africa.
              </h2>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <h3 className="text-2xl font-black text-greyscale-dark">{speakers.length}</h3>
                  <p className="text-sm text-greyscale-dark/80 font-semibold">Speakers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-greyscale-dark">8+</h3>
                  <p className="text-sm text-greyscale-dark/80 font-semibold">Sessions</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black text-greyscale-dark">{tracks.length - 1}</h3>
                  <p className="text-sm text-greyscale-dark/80 font-semibold">Tracks</p>
                </div>
              </div>
            </div>

            {/* Right Side - Sliding Speaker Cards */}
            <div className='relative h-[600px]'>
              <div className='flex gap-4 h-full'>
                {/* Column 1 - Slides Up */}
                <div className='flex-1 relative overflow-hidden'>
                  <div className='animate-slide-up hover:pause-animation flex flex-col gap-4'>
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className='flex flex-col gap-4'>
                        {speakers.slice(0, 3).map((speaker) => (
                          <div key={`up-${speaker.id}-${setIndex}`} className='relative rounded-3xl overflow-hidden border-4 border-accent-yellow shadow-lg'>
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              width={300}
                              height={400}
                              className='w-full h-auto object-cover'
                            />
                            <div className='absolute bottom-4 left-4 bg-greyscale-dark text-white px-4 py-2 rounded-full'>
                              <p className='font-bold text-sm'>{speaker.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 - Slides Down */}
                <div className='flex-1 relative overflow-hidden'>
                  <div className='animate-slide-down hover:pause-animation flex flex-col gap-4'>
                    {[...Array(2)].map((_, setIndex) => (
                      <div key={setIndex} className='flex flex-col gap-4'>
                        {speakers.slice(3, 6).map((speaker) => (
                          <div key={`down-${speaker.id}-${setIndex}`} className='relative rounded-3xl overflow-hidden border-4 border-accent-yellow shadow-lg'>
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              width={300}
                              height={400}
                              className='w-full h-auto object-cover'
                            />
                            <div className='absolute bottom-4 left-4 bg-greyscale-dark text-white px-4 py-2 rounded-full'>
                              <p className='font-bold text-sm'>{speaker.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <SectionHeader 
            title="Our Speakers" 
            subtitle="Meet the experts who will share their knowledge and experience at DevFest Minna 2025" 
          />
          
          {/* Filter Section */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {tracks.map((track) => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedTrack === track
                      ? track === "All"
                        ? "bg-greyscale-dark text-white"
                        : `${trackColors[track as keyof typeof trackColors] || "bg-accent-yellow text-greyscale-dark"}`
                      : "bg-greyscale-light text-greyscale-dark hover:bg-greyscale-dark/10"
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Speaker Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Track Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${trackColors[speaker.track as keyof typeof trackColors] || trackColors.Others}`}>
                    {speaker.track}
                  </div>
                  
                  {/* Level Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${levelColors[speaker.level as keyof typeof levelColors] || levelColors["Introductory"]}`}>
                    {speaker.level}
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-greyscale-dark mb-2">
                    {speaker.name}
                  </h3>
                  <p className="text-accent-orange font-semibold mb-3">
                    {speaker.title}
                  </p>
                  
                  {/* Session Title */}
                  <h4 className="text-lg font-bold text-greyscale-dark mb-3 leading-tight">
                    {speaker.sessionTitle}
                  </h4>
                  
                  {/* Bio */}
                  <p className="text-greyscale-dark/80 mb-4 text-sm leading-relaxed">
                    {speaker.bio}
                  </p>
                  {/* Social Links */}
                  <div className="flex gap-3 mb-4">
                    {speaker.linkedin && (
                      <Link
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                        aria-label={`${speaker.name} LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {speaker.twitter && (
                      <Link
                        href={speaker.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                        aria-label={`${speaker.name} Twitter`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {speaker.website && (
                      <Link
                        href={speaker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                        aria-label={`${speaker.name} Website`}
                      >
                        <Globe size={18} />
                      </Link>
                    )}
                  </div>

                  {/* Session Description Preview */}
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs text-greyscale-dark/60 leading-relaxed mb-3">
                      {speaker.sessionDescription.length > 120 
                        ? `${speaker.sessionDescription.substring(0, 120)}...`
                        : speaker.sessionDescription
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-greyscale-dark mb-6">
            Ready to Learn from the Best?
          </h2>
          <p className="text-xl font-semibold text-greyscale-dark/80 mb-8 max-w-2xl mx-auto">
            Join us at DevFest Minna 2025 and network with these amazing speakers and the tech community.
          </p>
          <Link
            href="/get-dp"
            className="inline-flex items-center h-14 px-8 rounded-full gap-3 bg-greyscale-dark text-white font-bold hover:bg-greyscale-dark/80 transition-all duration-300 hover:gap-4 hover:shadow-lg transform hover:-translate-y-1"
          >
            Get Your DevFest Profile Picture
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SpeakersPage;
