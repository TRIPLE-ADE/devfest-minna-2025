import Image from "next/image";
import { Calendar, MapPin, Users, Mic2, Code2, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link";
import Hero from "@/shared/hero";
import Slider from "@/shared/slider";

export default function Home() {
  const logos = [
    {
      id: "devfest-logo-5",
      image: "/assets/devfest-logo-5.webp",
      name: "DevFest Logo 5",
      width: 200,
      height: 160
    }
  ];

  const sponsorSliderData = [
    {
      id: "Sponsor",
      image: "/assets/devfest-logo-5.webp",
      name: "DevFest Sponsor Logo",
      width: 200,
      height: 160
    }
  ] 

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Hero />
        <Slider logos={logos} duplicate duplicateCount={5} animationDuration={15} />
        <Slider logos={sponsorSliderData} animationDuration={15} direction="right" />
       
       {/* Venue Section */}
        <section className="bg-[#f8d8d8] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
              <h2 className="font-semibold text-2xl lg:text-4xl">Venues</h2>
              <Image
                src="/assets/devfest-logo-3.webp"
                alt="devfest-frame"
                width={4235}
                height={214}
                className="lg:w-[80%]"
                style={{ color: "transparent" }}
              />
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <Image
                      src="/assets/main.webp"
                      alt="Rasheedat Restaurant - DevFest Minna Venue"
                      width={800}
                      height={600}
                      className="object-contain h-full w-full"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Image
                      src="/assets/gif/SaveTheDate.gif"
                      alt="Save The Date"
                      width={800}
                      height={600}
                      className="object-contain h-full w-full"
                    />
                    
                    <Link
                      href="https://www.google.com/maps/dir/?api=1&destination=Rasheeday+Restaurant+Shehu+Kangiwa+Road+Minna+Nigeria"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center h-10 sm:h-12 px-4 sm:px-5 rounded-full gap-2 mt-6 text-black bg-accent-orange font-semibold hover:gap-3 transition-all"
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
      </main>
      
    </div>
  );
}
