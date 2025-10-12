import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Heart, Globe } from "lucide-react";

export default function Community() {
  return (
    <section className='py-20 md:py-32 bg-black relative overflow-hidden'>
      {/* Background Pattern */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(to right, #F9AB00 1px, transparent 1px),
            linear-gradient(to bottom, #F9AB00 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className='container mx-auto px-4 lg:px-8 xl:px-12 relative z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            {/* Left Side - Content */}
            <div className='text-white order-2 lg:order-1'>
              <div className='mb-8'>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight'>
                  Join Our <span className='text-accent-orange'>Community</span>
                </h2>
                <p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
                  Be part of the vibrant Google Developer Groups (GDG) Minna
                  community. Connect with passionate developers, tech
                  enthusiasts, and industry professionals who are shaping the
                  future of technology in Nigeria.
                </p>
              </div>

              {/* Community Stats/Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
                <div className='flex items-center gap-3'>
                  <div className='bg-accent-orange rounded-full p-3'>
                    <Users className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <p className='text-accent-orange font-bold text-lg'>500+</p>
                    <p className='text-gray-400 text-sm'>Active Members</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-accent-orange rounded-full p-3'>
                    <Heart className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <p className='text-accent-orange font-bold text-lg'>60+</p>
                    <p className='text-gray-400 text-sm'>Tech Events</p>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-accent-orange rounded-full p-3'>
                    <Globe className='w-6 h-6 text-black' />
                  </div>
                  <div>
                    <p className='text-accent-orange font-bold text-lg'>
                      Local
                    </p>
                    <p className='text-gray-400 text-sm'>Impact</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className='space-y-4'>
                <Link
                  href='https://gdg.community.dev/gdg-minna/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-fit items-center gap-2 bg-gradient-to-r from-accent-orange to-accent-yellow text-black font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:gap-3 transition-all duration-300 hover:scale-105 transform'
                >
                  Join GDG Minna Community
                  <ArrowRight size={20} />
                </Link>

                <p className='text-gray-400 text-sm'>
                  Free to join • Open to all skill levels • Networking
                  opportunities
                </p>
              </div>
            </div>

            {/* Right Side - GIF Animation */}
            <div className='order-1 lg:order-2 flex justify-center lg:justify-end'>
              <div className='relative'>
                {/* Decorative border/frame */}
                {/* <div className="absolute -inset-4 bg-gradient-to-r from-accent-orange to-accent-yellow rounded-3xl blur-lg opacity-30 animate-pulse-slow" /> */}

                <div className='relative bg-white rounded-2xl'>
                  <Image
                    src='/assets/gif/JoinUs.gif'
                    alt='Join GDG Minna Community Animation'
                    width={400}
                    height={400}
                    className='w-full h-auto max-w-md rounded-xl'
                    unoptimized // Important for GIFs to maintain animation
                  />
                </div>

                {/* Floating elements */}
                <div className='absolute -top-6 -right-6 bg-accent-orange text-black font-bold px-4 py-2 rounded-full text-sm shadow-lg animate-bounce'>
                  Join Now! 🚀
                </div>

                <div className='absolute -bottom-4 -left-4 bg-accent-yellow text-black font-bold px-3 py-1 rounded-full text-xs shadow-lg'>
                  Free Community
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Additional Info */}
          <div className='mt-16 pt-12 border-t border-gray-800'>
            <div className='text-center'>
              <h3 className='text-2xl md:text-3xl font-bold text-white mb-6'>
                What You'll Get as a Member
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
                <div className='text-center'>
                  <div className='bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-accent-orange transition-colors duration-300'>
                    <h4 className='text-accent-orange font-bold text-lg mb-3'>
                      Tech Workshops
                    </h4>
                    <p className='text-gray-300 text-sm'>
                      Hands-on workshops on the latest Google technologies and
                      industry best practices
                    </p>
                  </div>
                </div>

                <div className='text-center'>
                  <div className='bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-accent-orange transition-colors duration-300'>
                    <h4 className='text-accent-orange font-bold text-lg mb-3'>
                      Networking
                    </h4>
                    <p className='text-gray-300 text-sm'>
                      Connect with like-minded developers and build meaningful
                      professional relationships
                    </p>
                  </div>
                </div>

                <div className='text-center'>
                  <div className='bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-accent-orange transition-colors duration-300'>
                    <h4 className='text-accent-orange font-bold text-lg mb-3'>
                      Career Growth
                    </h4>
                    <p className='text-gray-300 text-sm'>
                      Access to job opportunities, mentorship, and skill
                      development resources
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
