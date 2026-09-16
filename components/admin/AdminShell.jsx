"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { adminApi } from "@/lib/admin-api";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    let active = true;

    // Login must remain public. Every other /admin route requires a session.
    if (isLoginPage) {
      setLoading(false);

      return () => {
        active = false;
      };
    }

    setLoading(true);

    adminApi
      .session()
      .then(({ admin: sessionAdmin }) => {
        if (active) setAdmin(sessionAdmin);
      })
      .catch(() => {
        if (active) {
          router.replace(
            `/admin/login?next=${encodeURIComponent(pathname)}`
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isLoginPage, pathname, router]);

  if (isLoginPage) {
    return children;
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f8fc]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8e4f0] border-t-[#1f6fb2]" />
          <p className="mt-4 text-[13px] font-medium text-slate-500">
            Loading LogicSoft CMS…
          </p>
        </div>
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <AdminSidebar admin={admin} />

      <div className="min-h-screen lg:pl-64">
        <AdminHeader admin={admin} />

        <main className="mx-auto max-w-[100rem] p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}