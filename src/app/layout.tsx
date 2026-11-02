import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/constants/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.website),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.bio,
  keywords: [
    "Portfolio",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Dimas Prayogo",
    "Web Developer Indonesia",
    "Madiun",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.website }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_CONFIG.website,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.bio,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/screenshots/hero.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.bio,
    images: ["/screenshots/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_CONFIG.website}/#person`,
      name: SITE_CONFIG.name,
      jobTitle: SITE_CONFIG.role,
      description: SITE_CONFIG.bio,
      url: SITE_CONFIG.website,
      image: `${SITE_CONFIG.website}/avatar.webp`,
      sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madiun",
        addressRegion: "Jawa Timur",
        addressCountry: "ID",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.website}/#website`,
      url: SITE_CONFIG.website,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.bio,
      publisher: {
        "@id": `${SITE_CONFIG.website}/#person`,
      },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} bg-black text-white h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-zinc-800 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
