import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TShirtSection = () => (
  <section className='md:py-24 relative overflow-hidden bg-white  py-12 flex flex-col items-center text-center'>
    <div className='container mx-auto px-4 lg:px-8 xl:px-12 relative z-10'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold mb-4'>
          DevFest Minna 2025 Official T-Shirts
        </h2>
        <div className='mb-6'>
          <Image
            src='/assets/t-shirts.webp'
            alt='DevFest Minna 2025 T-Shirts'
            width={400}
            height={400}
            className='rounded-lg shadow-lg mx-auto'
          />
        </div>
        <div className='text-lg mb-2 font-semibold'>
          Price: <span className='text-primary'>₦4,500</span>
        </div>
        <div className='mb-2'>
          <span className='font-medium'>Deadline:</span> 25th October, 2025
        </div>
        <Link
          href='https://bit.ly/devfest-minna-tshirts'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex w-fit items-center gap-2 bg-gradient-to-r from-accent-orange to-accent-yellow text-black font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:gap-3 transition-all duration-300 hover:scale-105 transform'
        >
          🔗 Order here
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  </section>
);

export default TShirtSection;
