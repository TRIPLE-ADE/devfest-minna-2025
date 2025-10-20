import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black px-0 py-0 w-full font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between py-20 px-10 gap-16 text-center md:text-left">
        {/* Left: Logo and tagline */}
        <div className="flex flex-col items-center md:items-start gap-6 flex-1">
          <Image
            alt="GDG Minna Logo"
            width={400}
            height={120}
            className="w-[300px] mb-4"
            src="/assets/logo-2.webp"
            style={{ color: "transparent" }}
          />
          <h2 className="text-white text-3xl lg:text-4xl font-bold">
            Building the future, together.
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl max-w-md">
            Google Developer Groups (GDG) Minna is a vibrant community in Minna,
            Nigeria, that brings together developers, tech enthusiasts, and
            industry professionals passionate about learning and sharing
            knowledge on Google technologies and open-source platforms.
          </p>
        </div>

        {/* Center: Lanyard and social icons */}
        <div className="flex flex-col items-center gap-8 flex-1">
          <Image
            alt="lanyard"
            width={260}
            height={40}
            className="w-[220px] lg:w-[260px]"
            src="/assets/svg/footer-lanyard.svg"
            style={{ color: "transparent" }}
          />
          <div className="flex items-center gap-8 mt-2">
            <a
              className="bg-white rounded-full hover:bg-[#F9AB00] transition p-4"
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/GDGMinna"
            >
              <Image
                alt="Twitter / X"
                width={40}
                height={40}
                src="/assets/svg/twitter.svg"
                style={{ color: "transparent" }}
              />
            </a>
            <a
              className="bg-white rounded-full hover:bg-[#F9AB00] transition p-4"
              target="_blank"
              rel="noopener noreferrer"
              href="https://ng.linkedin.com/company/nuesa-fut-minna-chapter"
            >
              <Image
                alt="LinkedIn"
                width={40}
                height={40}
                src="/assets/svg/linkedin.svg"
                style={{ color: "transparent" }}
              />
            </a>
          </div>
        </div>

        {/* Right: Quick links */}
        <div className="flex flex-col items-center md:items-end gap-6 flex-1">
          <h3 className="text-white text-2xl font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-4 text-gray-300 text-lg lg:text-xl">
            <li>
              <a href="/get-dp" className="hover:text-[#F9AB00] transition">
                Get DP
              </a>
            </li>
            <li>
              <a href="/speakers" className="hover:text-[#F9AB00] transition">
                Speakers
              </a>
            </li>
            <li>
              <a href="/team-page" className="hover:text-[#F9AB00] transition">
                Team
              </a>
            </li>
            <li>
              <a href="/schedule" className="hover:text-[#F9AB00] transition">Schedule</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-8 text-center">
        <p className="text-gray-400 text-base lg:text-lg italic">
          &copy; {new Date().getFullYear()}, GDG Minna. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
