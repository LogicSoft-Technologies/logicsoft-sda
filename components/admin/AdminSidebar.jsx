"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  FileText,
  LayoutDashboard,
  Mail,
  Tags,
  Users,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/categories", label: "Taxonomy", icon: Tags },
  { href: "/admin/authors", label: "Authors", icon: Users },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter drafts", icon: Mail },
];

export default function AdminSidebar({ admin }) {
  const pathname = usePathname();

  return (
    <aside className="hidden fixed inset-y-0 left-0 z-30 w-64 border-r border-[#17345f] bg-[#0b1b33] lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-7 py-7">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-[#1f6fb2]">
            <BookOpenText className="h-5 w-5 text-white" />
          </span>

          <span>
            <span className="block text-[15px] font-bold text-white">
              LogicSoft
            </span>
            <span className="block text-[10px] uppercase tracking-[0.16em] text-[#8ac8f2]">
              Content CMS
            </span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5">
        {links.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 px-4 py-3 text-[13px] font-semibold transition-colors ${
                active
                  ? "bg-[#1f6fb2] text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-7 py-5">
        <p className="truncate text-[12px] font-semibold text-white">
          {admin.name}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">
          {admin.role}
        </p>
      </div>
    </aside>
  );
}