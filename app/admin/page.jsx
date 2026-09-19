"use client";

import Link from "next/link";
import { ArrowRight, FileText, Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import DashboardStats from "@/components/admin/DashboardStats";
import PostTable from "@/components/admin/PostTable";
import { adminApi } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([
      adminApi.posts("?page=1&pageSize=100"),
      adminApi.subscribers("?page=1&pageSize=1"),
    ])
      .then(([postData, subscriberData]) => {
        if (!active) return;

        const allPosts = postData.posts || [];
        const counts = subscriberData.counts || {};

        setPosts(allPosts.slice(0, 5));
        setStats({
          published: allPosts.filter((post) => post.status === "PUBLISHED")
            .length,
          drafts: allPosts.filter((post) => post.status === "DRAFT").length,
          activeSubscribers: counts.ACTIVE || 0,
          pendingSubscribers: counts.PENDING || 0,
        });
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative">
      {/* Decorative background blobs — matches login page */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#065bad]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-[#0a7d3e]/10 blur-3xl" />

      <div className="relative mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 bg-[#eaf3fb] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
            <Sparkles className="h-3.5 w-3.5" />
            Content overview
          </span>

          <h1
            className="mt-4 text-[35px] leading-tight text-[#111827]"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
          >
            Good morning. Build authority.
          </h1>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 px-4 py-3.5 text-[13px] font-bold text-white transition bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
        >
          <Plus className="h-4 w-4" />
          New article
        </Link>
      </div>

      {error && (
        <p className="relative mb-6 border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[12px] leading-relaxed text-red-700">
          {error}
        </p>
      )}

      <div className="relative">
        <DashboardStats stats={stats} />
      </div>

      <section className="relative mt-9">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
              Publishing queue
            </p>
            <h2
              className="mt-2 text-[27px] leading-tight text-[#111827]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
            >
              Recent articles
            </h2>
          </div>

          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#065bad] hover:text-[#054d94]"
          >
            All posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="border border-white/60 bg-white/50 backdrop-blur-2xl ring-1 ring-white/40 ring-inset shadow-[0_8px_30px_rgba(6,91,173,0.08)]">
          <PostTable posts={posts} />
        </div>
      </section>

      <section className="relative mt-9 grid gap-4 lg:grid-cols-3">
        {[
          {
            href: "/admin/posts/new",
            title: "Publish an insight",
            description:
              "Create an SEO-ready article and publish it to LogicSoft Insights.",
          },
          {
            href: "/admin/newsletter",
            title: "Prepare a newsletter",
            description:
              "Build an editorial draft for review before it is sent in Brevo.",
          },
          {
            href: "/admin/subscribers",
            title: "Understand your audience",
            description:
              "Review subscribers, confirmation status, and acquisition sources.",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-white/60 bg-white/50 backdrop-blur-2xl p-6 ring-1 ring-white/40 ring-inset transition hover:-translate-y-0.5 hover:border-[#065bad]/40 hover:shadow-[0_8px_30px_rgba(6,91,173,0.15)]"
          >
            <span className="grid h-11 w-11 place-items-center bg-[#eaf3fb] text-[#0a7d3e]">
              <FileText className="h-4 w-4" />
            </span>
            <h3
              className="mt-4 text-[21px] leading-snug text-[#111827]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
            >
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#4b5563]">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}