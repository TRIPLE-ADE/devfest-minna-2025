import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/shared/section-header";

const Venue = () => {
  return (
    <section className='bg-[#f8d8d8] py-16 md:py-24'>
      <div className='container mx-auto px-4 lg:px-8 xl:px-12'>
        <SectionHeader title="Venue" subtitle="Discover the venue for DevFest Minna 2025." />
        <div className='max-w-7xl mx-auto'>
          <div className='bg-white rounded-3xl overflow-hidden shadow-xl'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div>
                <Image
                  src='/assets/main.webp'
                  alt='Rasheedat Restaurant - DevFest Minna Venue'
                  width={800}
                  height={600}
                  className='object-contain h-full w-full'
                />
              </div>
              <div className='p-8 md:p-12 flex flex-col justify-center'>
                <Image
                  src='/assets/gif/SaveTheDate.gif'
                  alt='Save The Date'
                  width={800}
                  height={600}
                  className='object-contain h-full w-full'
                />

                <Link
                  href='https://www.google.com/maps/dir/?api=1&destination=Rasheeday+Restaurant+Shehu+Kangiwa+Road+Minna+Nigeria'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-fit items-center h-10 sm:h-12 px-4 sm:px-5 rounded-full gap-2 mt-6 text-black bg-accent-orange font-semibold hover:gap-3 hover:scale-105 transition-all'
                >
                  Get Directions
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
