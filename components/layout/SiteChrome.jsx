"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import LiveChatWidget from "@/components/LiveChatWidget";
import MascotHideout from "@/components/robot/MascotHideout";
import MascotPeekaboo from "@/components/robot/MascotPeekaboo";
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <GlobalLoader />
      <ScrollToTop />
      <Navbar />
      {children}
      <MascotPeekaboo />
      <MascotHideout />
      <LiveChatWidget />
      {!isBlog && <Footer />}
      <div id="dropdown-root" />
    </>
  );
}