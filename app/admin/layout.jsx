import AdminShell from "@/components/admin/AdminShell";
import { Playfair_Display, Inter } from "next/font/google";

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
  title: "Content CMS | LogicSoft Technologies",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}