import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users, Crown } from "lucide-react";
import SectionHeader from "@/shared/section-header";

export default function Host() {
  const hosts = [
    {
      id: "gdg-minna",
      name: "GDG Minna",
      description:
        "Google Developer Group Minna is a vibrant community of developers passionate about Google technologies and open-source development.",
      image: "/assets/gdg.png",
    },
    {
      id: "gdg-cloud-minna",
      name: "GDG Cloud Minna",
      description:
        "Focused on Google Cloud technologies, helping developers build scalable and innovative cloud solutions.",
      image: "/assets/gdg.png",
    },
    {
      id: "wtm-minna",
      name: "Women Techmakers Minna",
      description:
        "Empowering women in technology through mentorship, networking, and skill development programs.",
      image: "/assets/wtmm.webp",
    },
    {
      id: "wtm-cloud-minna",
      name: "Women Techmakers Cloud Minna",
      description:
        "Supporting women in cloud computing and helping them advance their careers in cloud technologies.",
      image: "/assets/wtmm.webp",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white ">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Hosts"
            subtitle={`DevFest Minna 2025 is proudly hosted by a coalition of passionate tech communities working together to foster innovation and growth in Minna's tech ecosystem.`}
          />
          {/* Host Organizations */}
          <div className="grid rounded-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {hosts.map((host, index) => (
              <div
                key={host.id}
                className="group rounded-3xl transition-all duration-300 overflow-hidden animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Host Card Content */}
                <div className="p-5">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden  bg-gray-200 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={host.image}
                        alt={`${host.name} Logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 128px, 160px"
                      />
                    </div>
                  </div>

                  {/* Organization Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-greyscale-dark">
                      {host.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
