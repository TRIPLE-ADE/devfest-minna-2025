"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import SectionHeader from "@/shared/section-header";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "what-is-devfest",
    question: "What is DevFest?",
    answer:
      "DevFest is the ultimate technology gathering that brings people together worldwide! This incredible conference is organized by Google Developer Groups from all corners of the globe, and guess what? We're celebrating its 14th year in 2025! You can find all the exciting details about DevFest on developers.google.com Join us in this global technology celebration! 💻🎉",
  },
  {
    id: "what-is-devfest-minna",
    question: "What is DevFest Minna 2025?",
    answer:
      "DevFest Minna 2025 is a community-led developer festival hosted by Google Developer Groups (GDG) Minna. It's a day-long event featuring technical talks, workshops, networking opportunities, and hands-on experiences with the latest Google technologies and industry best practices.",
  },
  {
    id: "who-can-attend",
    question: "Who can attend DevFest Minna?",
    answer:
      "DevFest is open to everyone! Whether you're a beginner just starting your tech journey, an experienced developer, a student, or a tech enthusiast, you're welcome to join us. We have content and activities suitable for all skill levels.",
  },
  {
    id: "registration-cost",
    question: "Is there a registration fee?",
    answer:
      "No, DevFest Minna 2025 is completely free to attend! This includes access to all sessions, workshops, networking opportunities, refreshments, and swag. Our goal is to make tech education accessible to everyone in the community.",
  },
  {
    id: "what-to-bring",
    question: "What should I bring to the event?",
    answer:
      "Bring your laptop, phone charger, a notebook for taking notes, and most importantly, your enthusiasm to learn! We'll provide power outlets, WiFi, refreshments, and all the learning materials you'll need during workshops.",
  },
  {
    id: "event-schedule",
    question: "What time does the event start and end?",
    answer:
      "DevFest Minna 2025 runs from 9:00 AM to 6:00 PM on November 8th, 2025. The day includes registration, opening ceremony, technical sessions, workshops, lunch break, networking sessions, and closing ceremony. Detailed schedule will be shared closer to the event date.",
  },
  {
    id: "networking-opportunities",
    question: "Will there be networking opportunities?",
    answer:
      "Absolutely! DevFest is designed to foster connections within the tech community. You'll have opportunities to network during breaks, lunch, dedicated networking sessions, and after-party. It's a great chance to meet fellow developers, potential collaborators, and industry professionals.",
  },
  {
    id: "technologies-covered",
    question: "What technologies will be covered?",
    answer:
      "We'll cover a wide range of Google technologies including Android development, Web development, Cloud technologies, Machine Learning/AI, Flutter, Firebase, and more. Our speakers will also share insights on industry trends and best practices.",
  },
  {
    id: "parking-transport",
    question: "Is parking available at the venue?",
    answer:
      "Yes, there is parking available at Rasheedat Restaurant. The venue is also accessible by public transportation. We recommend carpooling with fellow attendees to reduce environmental impact and make new connections on the way!",
  },
];

export default function Faqs() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <section className='py-16 md:py-24 bg-background relative overflow-hidden'>
      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          {/* Section Header */}
          <div className='text-center'>
            <div className='inline-flex items-center gap-3 bg-accent-orange/10 text-accent-orange px-6 py-3 rounded-full font-semibold mb-6 animate-fade-in-up'>
              <HelpCircle size={20} />
              Frequently Asked Questions
            </div>
            <SectionHeader
              title='Got Questions?'
              subtitle="Find answers to the most common questions about DevFest Minna 2025. Can't find what you're looking for? Feel free to reach out to us!"
            />
          </div>

          {/* FAQ Items */}
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up overflow-hidden'
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className='w-full px-6 md:px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 group'
                  aria-expanded={isOpen(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3 className='text-lg md:text-xl font-bold text-greyscale-dark pr-8 group-hover:text-accent-orange transition-colors duration-200'>
                    {faq.question}
                  </h3>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center group-hover:bg-accent-orange group-hover:text-white transition-all duration-200'>
                    {isOpen(faq.id) ? (
                      <ChevronUp
                        size={20}
                        className='text-accent-orange group-hover:text-white'
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className='text-accent-orange group-hover:text-white'
                      />
                    )}
                  </div>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen(faq.id)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className='px-6 md:px-8 pb-6'>
                    <div className='border-t border-gray-100 pt-4'>
                      <p className='text-gray-600 leading-relaxed'>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className='mt-16 text-center'>
            <div className='bg-white rounded-2xl p-8 md:p-12 border-4 border-accent-orange/20'>
              <h3 className='text-2xl md:text-3xl font-bold text-greyscale-dark mb-4'>
                Still have questions?
              </h3>
              <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                We're here to help! Reach out to our organizing team through our
                social media channels or join our community for real-time
                answers.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <a
                  href='https://gdg.community.dev/gdg-minna/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-yellow text-black font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105'
                >
                  Join Our Community
                </a>
                <a
                  href='https://x.com/GDGMinna'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-greyscale-dark font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200'
                >
                  Follow us on X
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
