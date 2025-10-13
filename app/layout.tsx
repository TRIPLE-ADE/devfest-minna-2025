import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/shared/layout/header";
import Footer from "@/shared/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevFest Minna 2025 | Google Developer Festival",
    template: "%s | DevFest Minna 2025"
  },
  description: "Join DevFest Minna 2025 on November 8th at Rasheedat Restaurant, Minna. A community-led developer festival featuring expert speakers, hands-on workshops, and networking opportunities. Free registration for all skill levels.",
  keywords: [
    "DevFest",
    "DevFest Minna",
    "DevFest 2025",
    "Google Developer Festival",
    "GDG Minna",
    "Google Developer Groups",
    "Women Techmakers",
    "Tech Conference",
    "Developer Event",
    "Minna Tech",
    "Nigeria Tech",
    "Android Development",
    "Web Development",
    "Cloud Computing",
    "Machine Learning",
    "AI",
    "Flutter",
    "Firebase",
    "Google Cloud",
    "Tech Community",
    "Niger State",
    "Technology",
    "Programming",
    "Software Development"
  ],
  authors: [
    { name: "GDG Minna" },
    { name: "GDG Cloud Minna" },
    { name: "Women Techmakers Minna" },
    { name: "Women Techmakers Cloud Minna" }
  ],
  creator: "GDG Minna",
  publisher: "Google Developer Groups Minna",
  metadataBase: new URL('https://devfest-minna-2025.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devfest-minna-2025.vercel.app',
    title: 'DevFest Minna 2025 | Google Developer Festival',
    description: 'Join DevFest Minna 2025 on November 8th at Rasheedat Restaurant, Minna. A community-led developer festival featuring expert speakers, hands-on workshops, and networking opportunities. Free registration for all skill levels.',
    siteName: 'DevFest Minna 2025',
    images: [
      {
        url: '/assets/devfest-logo-4.webp',
        width: 1200,
        height: 630,
        alt: 'DevFest Minna 2025 - Google Developer Festival',
      },
      {
        url: '/assets/main.webp',
        width: 800,
        height: 600,
        alt: 'DevFest Minna 2025 Venue - Rasheedat Restaurant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFest Minna 2025 | Google Developer Festival',
    description: 'Join DevFest Minna 2025 on November 8th at Rasheedat Restaurant, Minna. Free tech conference with expert speakers and workshops.',
    images: ['/assets/devfest-logo-4.webp'],
    creator: '@GDGMinna',
    site: '@GDGMinna',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Technology Conference',
  other: {
    'event:start_time': '2025-11-08T09:00:00+01:00',
    'event:end_time': '2025-11-08T18:00:00+01:00',
    'event:location': 'Rasheedat Restaurant, Shehu Kangiwa Road, Minna, Niger State, Nigeria',
    'event:organizer': 'GDG Minna',
    'geo.region': 'NG-NI',
    'geo.placename': 'Minna, Niger State, Nigeria',
    'geo.position': '9.6137;6.5560',
    'ICBM': '9.6137, 6.5560',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}
      >
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
