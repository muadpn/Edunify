import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/components/ToasterProvider";
import HomeOverlay from "@/components/HomeOverlay";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edunify - School Finder",
  description:
    "Edunify is a platform for parents and students to find the best School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ToasterProvider />
          <Navbar />
          {children}
          <div className="opacity-20">
            <HomeOverlay />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
