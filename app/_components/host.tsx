import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Users, Crown, ArrowRight } from "lucide-react";
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

  const partners = [
    {
      id: "timart",
      name: "Timart",
      descrition: "",
      image: "/assets/timart.webp",
    },
  ];

  return (
    <section className='py-16 md:py-24 relative overflow-hidden bg-white '>
      <div className='container mx-auto px-4 lg:px-8 xl:px-12 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <SectionHeader
            title='Hosts'
            subtitle={`DevFest Minna 2025 is proudly hosted by a coalition of passionate tech communities working together to foster innovation and growth in Minna's tech ecosystem.`}
          />
          {/* Host Organizations */}
          <div className='grid rounded-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
            {hosts.map((host, index) => (
              <div
                key={host.id}
                className='group rounded-3xl transition-all duration-300 overflow-hidden animate-fade-in-up'
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Host Card Content */}
                <div className='p-5'>
                  {/* Logo */}
                  <div className='flex justify-center mb-6'>
                    <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden  bg-gray-200 group-hover:scale-110 transition-transform duration-300'>
                      <Image
                        src={host.image}
                        alt={`${host.name} Logo`}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 128px, 160px'
                      />
                    </div>
                  </div>

                  {/* Organization Info */}
                  <div className='text-center'>
                    <h3 className='text-2xl font-black text-greyscale-dark'>
                      {host.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader
            title='Sponsors'
            subtitle='Thanks to our sponsors for supporting DevFest Minna 2025.'
          />

          {/* Sponsor Organizations */}
          <div className='grid rounded-3xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className='group rounded-3xl transition-all duration-300 overflow-hidden animate-fade-in-up'
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Partner Card Content */}
                <div className='p-5'>
                  {/* Logo */}
                  <div className='flex justify-center mb-6'>
                    <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden  bg-gray-200 group-hover:scale-110 transition-transform duration-300'>
                      <Image
                        src={partner.image}
                        alt={`${partner.name} Logo`}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 128px, 160px'
                      />
                    </div>
                  </div>

                  {/* Organization Info */}
                  <div className='text-center'>
                    <h3 className='text-2xl font-black text-greyscale-dark'>
                      {partner.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sponsorship Deck Button and Info */}
          <div className='flex flex-col items-center'>
            <div className='mt-4 text-center'>
              <h4 className='text-lg font-bold mb-2'>
                Available Sponsorship Tiers
              </h4>
              <p className='text-xs text-greyscale-dark/70 mt-2 max-w-md mx-auto'>
                DevFest Minna offers 4 top-tier sponsorship packages to fit your
                budget and maximize your impact.
              </p>
              <div className='flex flex-wrap gap-3 justify-center my-4'>
                <button className='px-5 py-2 font-bold text-white bg-red-600 shadow hover:bg-red-700 transition'>
                  Diamond Package
                </button>
                <button className='px-5 py-2 font-bold text-white bg-blue-600 shadow hover:bg-blue-700 transition'>
                  Platinum Package
                </button>
                <button className='px-5 py-2 font-bold text-white bg-green-600 shadow hover:bg-green-700 transition'>
                  Gold Package
                </button>
                <button className='px-5 py-2 font-bold text-black bg-yellow-400 shadow hover:bg-yellow-500 transition'>
                  Silver Package
                </button>
              </div>
            </div>
            <Link
              href='https://docs.google.com/presentation/d/14ZA3KDQQBa-B6zlcW97mBWr0TiHjhwtYJtMaJqQyrcI/edit?usp=sharing'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex w-fit items-center gap-2 bg-gradient-to-r from-accent-orange to-accent-yellow text-black font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:gap-3 transition-all duration-300 hover:scale-105 transform'
            >
              View Full Sponsorship Deck
              <ArrowRight size={20} />
            </Link>

            <p className='text-greyscale-dark text-center text-sm my-2'>
              Interested in becoming a sponsor? <br />
              <span className='font-semibold'>Contact us at</span>
              <a
                href='mailto:gdgminna@gmail.com'
                className='underline ml-1 text-accent-orange'
              >
                gdgminna@gmail.com
              </a>
              <br />
              We'll help you choose the best package for your brand!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
