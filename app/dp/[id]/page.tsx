import { getDPRecord } from '@/lib/appwrite';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Metadata } from 'next';
import ShareButton from './_components/share-button';

interface DPPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: DPPageProps): Promise<Metadata> {
  try {
    const dpRecord = await getDPRecord(params.id);
    
    if (!dpRecord) {
      return {
        title: 'DP Not Found | DevFest Minna 2025',
        description: 'The requested DevFest profile picture could not be found.',
      };
    }

    return {
      title: `${dpRecord.name}'s DevFest Minna 2025 DP`,
      description: `Check out ${dpRecord.name}'s DevFest Minna 2025 profile picture! Join us at DevFest Minna on November 8th at Rasheedat Restaurant.`,
      openGraph: {
        title: `${dpRecord.name}'s DevFest Minna 2025 DP`,
        description: `Check out ${dpRecord.name}'s DevFest Minna 2025 profile picture! Join us at DevFest Minna on November 8th.`,
        images: [
          {
            url: dpRecord.imageUrl,
            width: 800,
            height: 800,
            alt: `${dpRecord.name}'s DevFest Minna 2025 DP`,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${dpRecord.name}'s DevFest Minna 2025 DP`,
        description: `Check out ${dpRecord.name}'s DevFest profile picture! Join DevFest Minna on November 8th.`,
        images: [dpRecord.imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'DevFest Minna 2025 DP',
      description: 'DevFest Minna 2025 profile picture.',
    };
  }
}

export default async function DPPage({ params }: DPPageProps) {
  let dpRecord;
  
  try {
    dpRecord = await getDPRecord(params.id);
  } catch (error) {
    console.error('Error fetching DP record:', error);
    notFound();
  }

  if (!dpRecord) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dp/${dpRecord.id}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/get-dp"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Create Your Own DP
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* DP Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-accent-yellow">
                <Image
                  src={dpRecord.imageUrl}
                  alt={`${dpRecord.name}'s DevFest Minna 2025 DP`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* DP Info */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-greyscale-dark mb-4">
                {dpRecord.name}'s
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-orange mb-6">
                DevFest Minna 2025 DP
              </h2>
              
              <p className="text-lg text-greyscale-dark/80 mb-8 leading-relaxed">
                {dpRecord.name} is excited to attend DevFest Minna 2025! Join us on November 8th 
                at Rasheedat Restaurant for an amazing day of tech talks, workshops, and networking.
              </p>

              {/* Event Details */}
              <div className="bg-accent-yellow/10 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-greyscale-dark mb-4">
                  DevFest Minna 2025
                </h3>
                <div className="space-y-2 text-greyscale-dark/80">
                  <p><strong>Date:</strong> November 8th, 2025</p>
                  <p><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
                  <p><strong>Venue:</strong> Rasheedat Restaurant, Minna</p>
                  <p><strong>Registration:</strong> Free for all</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ShareButton 
                  name={dpRecord.name}
                  shareUrl={shareUrl}
                />
                
                <Link href="/get-dp">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 border-greyscale-dark text-greyscale-dark hover:bg-greyscale-dark hover:text-white"
                  >
                    Create Your Own
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-greyscale-dark/60 mt-4">
                Created on {dpRecord.$createdAt ? new Date(dpRecord.$createdAt).toLocaleDateString() : 'Unknown date'}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-greyscale-dark rounded-3xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Join Us at DevFest Minna 2025!
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Create your own profile picture and be part of the community
          </p>
          <Link href="/get-dp">
            <Button
              size="lg"
              className="bg-accent-orange hover:bg-accent-orange/90 text-greyscale-dark font-bold"
            >
              Create Your DP Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}