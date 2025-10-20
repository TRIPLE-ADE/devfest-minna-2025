import React from "react";
import Image from "next/image";

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center mb-5">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-black text-greyscale-dark mb-6 animate-fade-in-up">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
          {subtitle}
        </p>
      </div>
      <picture className="flex justify-center w-full">
        <source
          media="(max-width: 768px)"
          srcSet="/assets/devfest-logo-4.webp"
        />
        <Image
          src="/assets/devfest-logo-3.webp"
          alt="devfest-frame"
          width={4235}
          height={214}
          className="lg:w-[80%] mx-auto"
          style={{ color: "transparent" }}
        />
      </picture>
    </div>
  );
};

export default SectionHeader;
