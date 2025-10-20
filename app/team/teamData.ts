export interface TeamMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  imgUrl: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
export const organizers: TeamMember[] = [
  {
    id: "org-1",
    name: "Umar Saidu",
    role: "Lead Organizer",
    organization: "GDG Minna",
    bio: "Passionate tech community leader with 5+ years of experience organizing developer events. Dedicated to fostering innovation and collaboration in Minna's tech ecosystem.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/umar_saidu.jpeg",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "org-2",
    name: "Sunday Malgwi",
    role: "Co-Organizer",
    organization: "GDG Minna",
    bio: "Experienced software engineer and community builder. Specializes in Android development and loves sharing knowledge with aspiring developers.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sunday_malgwi.jpg",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "org-3",
    name: "Musa Amina Giwa",
    role: "Event Lead",
    organization: "Women Techmakers Minna",
    bio: "Advocate for women in technology and experienced event coordinator. Committed to creating inclusive tech spaces and mentoring the next generation of female developers.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/musa_amina_giwa_Hdcd3V3.jpg",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "org-4",
    name: "Catherine Maigida Baha",
    role: "WTM Minna Ambassador",
    organization: "Women Techmakers",
    bio: "Tech enthusiast and community advocate working to bridge the gender gap in technology. Passionate about empowering women through tech education.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/catherine_baha_maigida.JPG",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "org-5",
    name: "Bashir Aliyu",
    role: "Co-Organizer",
    organization: "GDG Minna",
    bio: "Full-stack developer and tech educator. Enjoys building scalable applications and helping developers level up their skills.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/bashir_aliyu_LqbLrOX.jpg",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "org-6",
    name: "Taoheed Abdulraheem",
    role: "Co-Organizer",
    organization: "GDG Minna",
    bio: "Cloud architect and DevOps enthusiast. Passionate about building developer communities and sharing best practices in modern software development.",
    imgUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/taoheed_abdulraheem_tISFpS5.JPG",
    socials: {
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
];

export const volunteers: TeamMember[] = [
  {
    id: "vol-1",
    name: "Abraham Folorunso",
    role: "Software Engineer",
    organization: "GDG Minna",
    bio: "Frontend developer passionate about creating delightful user experiences. Volunteer coordinator for bootcamp activities.",
    imgUrl:
      "https://build-with-ai-2025-puce.vercel.app/_next/image?url=%2Fteam-images%2FAbraham.png&w=384&q=75",
    socials: {
      github: "https://github.com",
    },
  },
  {
    id: "vol-2",
    name: "Benedict Isaac",
    role: "Bootcamp Lead",
    organization: "GDG Minna",
    bio: "Software engineer dedicated to mentoring new developers. Leads hands-on workshops and coding bootcamps.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760399366/LR_1-3276_1_ncnah9.jpg",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "vol-3",
    name: "Enoch Dani Mida",
    role: "Protocol Team",
    organization: "GDG Minna",
    bio: "UI/UX enthusiast and frontend developer. Helps coordinate design workshops and accessibility initiatives.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760399930/IMG_7893_a1kiet.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "vol-4",
    name: "Fiyinfoluwa John",
    role: "Social Media Team",
    organization: "GDG Minna",
    bio: "Product designer focused on user-centered design. Leads design thinking sessions and UX workshops.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760399366/IMG-20251013-WA0193_h7ijix.jpg",
    socials: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "vol-5",
    name: "Tauheed Mohammed",
    role: "Protocol Team",
    organization: "GDG Minna",
    bio: "Community builder and social media coordinator. Manages event communications and community engagement.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760399365/IMG-20251013-WA0192_vtiimv.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "vol-6",
    name: "Joel Francis",
    role: "Graphic Design Lead",
    organization: "GDG Minna",
    bio: "Community builder and social media coordinator. Manages event communications and community engagement.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760543950/WhatsApp_Image_2025-10-14_at_14.47.40_2bcf05f5_kjetxa.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "vol-7",
    name: "Fadil Bashir",
    role: "Design Team",
    organization: "GDG Minna",
    bio: "Community builder and social media coordinator. Manages event communications and community engagement.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760544076/Fadil_zotuad.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "vol-8",
    name: "Fawziyyah Muhammad",
    role: "Protocol team",
    organization: "GDG Minna",
    bio: "Community builder and social media coordinator. Manages event communications and community engagement.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760544196/WhatsApp_Image_2025-10-14_at_15.09.12_ab4c310b_xfb4kz.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
  {
    id: "vol-9",
    name: "Abdulsalam Madeenah",
    role: "Design team",
    organization: "GDG Minna",
    bio: "Community builder and social media coordinator. Manages event communications and community engagement.",
    imgUrl:
      "https://res.cloudinary.com/dzja5jbgq/image/upload/v1760544214/WhatsApp_Image_2025-10-14_at_15.52.32_af022717_zdqrzk.jpg",
    socials: {
      twitter: "https://twitter.com",
    },
  },
];
