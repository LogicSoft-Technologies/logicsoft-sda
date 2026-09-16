"use client";

import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { adminApi } from "@/lib/admin-api";

export default function AdminHeader({ admin }) {
  const router = useRouter();

  async function logout() {
    try {
      await adminApi.logout();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-[#e2eaf3] bg-white/95 px-5 backdrop-blur sm:px-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
          LogicSoft Content Engine
        </p>
        <p className="mt-0.5 text-[12px] text-slate-500">
          Signed in as {admin.email}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/blog"
          target="_blank"
          className="inline-flex items-center gap-2 border border-[#d8e4f0] px-3 py-2 text-[12px] font-bold text-[#1f3a5f] hover:border-[#1f6fb2]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Insights
        </Link>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 border border-[#d8e4f0] px-3 py-2 text-[12px] font-bold text-[#1f3a5f] hover:border-red-300 hover:text-red-600"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </header>
  );
}