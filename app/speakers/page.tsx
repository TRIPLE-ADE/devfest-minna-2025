import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className='container mx-auto px-4 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left Side - Title */}
          <div className='relative'>
            <h1 className='text-5xl uppercase md:text-7xl font-black leading-tight mb-4'>
              Meet Our Speakers
            </h1>
            <h2 className='text-lg md:text-xl font-semibold mb-8'>
              Learn from industry experts and thought leaders shaping the future
              of technology.
            </h2>
          </div>

          {/* Right Side - Sliding Speaker Cards */}
          <div className='relative h-[600px]'>
            <div className='flex gap-4 h-full'>
              {/* Column 1 - Slides Up */}
              <div className='flex-1 relative overflow-hidden'>
                <div className='animate-slide-up hover:pause-animation flex flex-col gap-4'>
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className='flex flex-col gap-4'>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-woman-tech-executive.png'
                          alt='Speaker 1'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Aisha Mohammed</p>
                        </div>
                      </div>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-man-software-engineer.jpg'
                          alt='Speaker 2'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Ibrahim Sani</p>
                        </div>
                      </div>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-woman-mobile-developer.jpg'
                          alt='Speaker 3'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Fatima Bello</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 - Slides Down */}
              <div className='flex-1 relative overflow-hidden'>
                <div className='animate-slide-down hover:pause-animation flex flex-col gap-4'>
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className='flex flex-col gap-4'>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-man-devops-engineer.jpg'
                          alt='Speaker 4'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Musa Abdullahi</p>
                        </div>
                      </div>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-woman-ux-designer.jpg'
                          alt='Speaker 5'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Zainab Usman</p>
                        </div>
                      </div>
                      <div className='relative rounded-3xl overflow-hidden border-4 border-[#F9AB00] shadow-lg'>
                        <Image
                          src='/professional-african-man-machine-learning-engineer.jpg'
                          alt='Speaker 6'
                          width={300}
                          height={400}
                          className='w-full h-auto object-cover'
                        />
                        <div className='absolute bottom-4 left-4 bg-[#1e1e1e] text-white px-4 py-2 rounded-full'>
                          <p className='font-bold text-sm'>Yusuf Ahmed</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
