"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="w-full font-sans flex-nowrap flex flex-col lg:flex-row lg:items-center px-4 lg:px-24 py-4 justify-between border-b border-solid border-black bg-background">
      <div className="flex flex-row items-center justify-between w-full">
        {/* Logo left */}
        <Link href="/" className="flex-shrink-0 flex-row flex items-center overflow-hidden">
          <Image
            alt="DevFest Minna 2025 Logo"
            width={1000}
            height={760}
            className="h-[40px] lg:h-[80px] w-auto object-contain"
            src="/assets/logo.webp"
            priority
          />
        </Link>
        {/* Navbar button right */}
        <button
          className="md:hidden p-2 rounded-md"
          style={{ color: 'var(--medium-green)' }}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Open navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {/* Desktop nav */}
      <div className="hidden lg:block">
        <div className="flex flex-row gap-5 lg:w-auto lg:h-auto lg:bg-transparent lg:relative lg:items-center lg:gap-10 pr-10">
          <ul className="flex flex-row items-center gap-10 font-medium text-lg overflow-x-auto text-black whitespace-nowrap">
            <li>
              <Link href="/get-dp" className="text-black whitespace-nowrap">Get DP</Link>
            </li>
            <li>
              <Link href="/speakers" className="text-black">Speakers</Link>
            </li>
            <li>
              <Link href="/team" className="text-black">Team</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button className="rounded-full  text-black border border-solid border-transparent transition-colors flex items-center justify-center bg-accent-orange gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
          {/* <Image
            className="dark:invert"
            src="/assets/registration-icon.svg"
            alt="Registration Icon"
            width={20}
            height={20}
          /> */}
          Register
        </button>
      </div>
      {/* Mobile nav drawer */}
      {navOpen && (
        <div
          className={`fixed inset-y-0 left-0 w-1/2 max-w-xs bg-white shadow-xl z-50 lg:hidden overflow-y-auto
            transition-transform duration-700
            ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ transform: navOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-end px-6 py-4 border-b">
            <button
              className="text-black hover:text-blue-600"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Content */}
          <div className="py-2 px-6">
            <div className="mb-4">
              <Link href="/" className="block py-2 font-medium text-lg text-black" onClick={() => setNavOpen(false)}>
                Home
              </Link>
            </div>
            <div className="mb-4">
              <Link href="/get-dp" className="block py-2 font-medium text-lg text-black" onClick={() => setNavOpen(false)}>
                Get DP
              </Link>
            </div>
            <div className="mb-4">
              <Link href="/speakers" className="block py-2 font-medium text-lg text-black" onClick={() => setNavOpen(false)}>
                Speakers
              </Link>
            </div>
            <div className="mb-4">
              <Link href="/team" className="block py-2 font-medium text-lg text-black" onClick={() => setNavOpen(false)}>
                Team
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}