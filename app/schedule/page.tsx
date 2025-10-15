'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import SectionHeader from '@/shared/section-header';


const schedulePage = () => {
return(
    <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-16">
            <div className='[&_h2]:text-5xl [&_h2]:md:text-5xl [&_h2]:lg:text-6xl'>
                <SectionHeader
                title="Explore our Very Demure Schedule"
                subtitle="Stay tuned for the detailed schedule of DevFest Minna 2025. Exciting sessions and activities are on the way!"
            />
            </div>
        </div>
        <div className='mt-3 grid grid-cols-1 gap-6 px-4'>
            <div className='card'>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-black'>
                        <span className='text-sm font-sans text-white'>Outside</span>
                    </Button>
                    <h4 className='text-md font-normal'>8:30 AM - 9:30 AM</h4>
                    <h2 className='text-2xl font-bold my-5'>Arrival and Check-in</h2>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-blue-600'>
                        <span className='text-sm font-sans text-white'>Intro</span>
                    </Button>
                    <h4 className='text-md font-normal'>9:30 AM - 9:35 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Welcome Address & Keynote</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Umar Saidu</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-green-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>9:35 AM - 9:50 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Ethics in AI-driven Testing: who tests the tester?</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Temidayo Akintoye</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-accent-orange'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>9:50 AM - 10:05 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Maximizing Your CPU to Scale Your Backend Vertically on Google cloud run</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Gabriella Amaefule</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-red-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>10:05 AM - 10:20 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>The New Renaissance: How AI is Democratizing Creativity in Tech</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Daniel Egbe</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-blue-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>10:20 AM - 10:35 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Building Better Experiences Through Product Documentation</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Fauziya Mohammed</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-green-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>10:35 AM - 10:50 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Escaping the Hustle Trap: Building a Tech Career Without a Computer Science Background</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Shehu Ibrahim Muhammad</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-accent-orange'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>10:50 AM - 11:05 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>AI Without Code: Scaling Startups and Empowering Developers Through Intelligent Integrations</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Samuel Adeniyi</h4>
                </div>
                <div className='h-55 sm:h-50 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-red-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>11:05 AM - 11:20 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Developing Bidirectional IoT with Flutter and Firebase from Sensor Data to Device Control.</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Muiz Aminu</h4>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-blue-600'>
                        <span className='text-sm font-sans text-white'>Speaker</span>
                    </Button>
                    <h4 className='text-md font-normal'>11:20 AM - 11:35 AM</h4>
                    <h2 className='text-xl sm:text-2xl font-bold my-1 break-words'>Gemma: Inferences and building a MaaS</h2>
                    <h4 className='text-sm sm:text-md font-bold break-words'>Mudasiru Rasheed Taiwo</h4>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-black'>
                        <span className='text-sm font-sans text-white'>Outside</span>
                    </Button>
                    <h4 className='text-md font-normal'>11:35 AM - 12:30 PM</h4>
                    <h2 className='text-2xl font-bold my-5'>Break, Pictures  & Visit to Sponsors Stand</h2>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-green-600'>
                        <span className='text-sm font-sans text-white'>Sponsor</span>
                    </Button>
                    <h4 className='text-md font-normal'>12:00 PM - 12:37 PM</h4>
                    <h2 className='text-2xl font-bold my-5'>Timart</h2>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-accent-orange'>
                        <span className='text-sm font-sans text-white'>Sponsor</span>
                    </Button>
                    <h4 className='text-md font-normal'>12:00 PM - 1:05 PM</h4>
                    <h2 className='text-2xl font-bold my-5'>Starnet Tech</h2>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-red-600'>
                        <span className='text-sm font-sans text-white'>Close</span>
                    </Button>
                    <h4 className='text-md font-normal'>1:05 PM - 1:08 PM</h4>
                    <h2 className='text-2xl font-bold my-5'>Closing Remark</h2>
                </div>
                <div className='h-47 w-full my-2 px-6 bg-white'>
                    <Button className='my-5 w-25 h-10 bg-blue-600'>
                        <span className='text-sm font-sans text-white'>Network</span>
                    </Button>
                    <h4 className='text-md font-normal'></h4>
                    <h2 className='text-2xl font-bold my-5'>Networking</h2>
                </div>
            </div>
        </div>
    </div>
);
};
export default schedulePage;