import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InteractiveHeroBackground } from "@/components/ui/InteractiveHeroBackground";

export const metadata: Metadata = {
  title: "Rishi Mistry — IT Student & Web Developer",
  description:
    "Personal portfolio of Rishi Mistry — Information Technology student and web developer specializing in responsive frontend and full-stack web applications.",
  icons: {
    icon: "https://i.ibb.co/8DNpG4Dy/snapedit-1741190364532.png",
  },
  verification: {
    google: "sH7tSyMKm6EVmNsmkFM-8Nm5FJdAclflR5Vzp_wxkbk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#09090b] text-[#f4f4f6]">
        {/* Global Interactive Constellation & Mouse-Spotlight Background */}
        <InteractiveHeroBackground />

        {/* Global Floating Island Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10">{children}</div>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
