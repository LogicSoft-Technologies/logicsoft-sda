"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
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
    <aside className="hidden fixed inset-y-0 left-0 z-30 w-64 border-r border-white/60 bg-white/50 backdrop-blur-2xl ring-1 ring-white/40 ring-inset shadow-[8px_0_30px_rgba(6,91,173,0.12)] lg:flex lg:flex-col">
      <div className="border-b border-white/60 px-7 py-7">
        <Link href="/admin">
          <Image
            src="/images/logicsoft-logo.png"
            alt="LogicSoft Technologies"
            width={320}
            height={66}
            priority
            className="h-auto w-[180px]"
          />
        </Link>
        <span className="block text-[10px] uppercase tracking-[0.16em] font-bold py-2 text-[#065bad]">
              Content CMS
            </span>
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
                  ? "bg-[#eaf3fb] text-[#065bad]"
                  : "text-slate-500 hover:bg-white/40 hover:text-[#111827]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/60 px-7 py-5">
        <p className="truncate text-[12px] font-bold text-[#111827]">
          {admin.name}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">
          {admin.role}
        </p>
      </div>
    </aside>
  );
}