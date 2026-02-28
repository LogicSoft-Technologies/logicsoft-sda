import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalLoader from "@/components/GlobalLoader";
import LiveChatWidget from "@/components/LiveChatWidget";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Software Development Agency",
  description:
    "We are a leading software development company providing innovative solutions for businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" scroll="smooth">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <GlobalLoader />
        <ScrollToTop />
        <Navbar />
        {children}
        <LiveChatWidget />
        <Footer />
        <div id="dropdown-root"></div>
      </body>
    </html>
  );
}
