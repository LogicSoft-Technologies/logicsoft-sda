"use client";

import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";
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
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
            Content overview
          </p>

          <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
            Good morning. Build authority.
          </h1>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex w-fit items-center gap-2 bg-[#1f6fb2] px-4 py-3 text-[12px] font-bold text-white hover:bg-[#1a5a96]"
        >
          <Plus className="h-4 w-4" />
          New article
        </Link>
      </div>

      {error && (
        <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <DashboardStats stats={stats} />

      <section className="mt-9">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#1f6fb2]">
              Publishing queue
            </p>
            <h2 className="mt-1 font-serif text-[27px] text-[#1f3a5f]">
              Recent articles
            </h2>
          </div>

          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f6fb2]"
          >
            All posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <PostTable posts={posts} />
      </section>

      <section className="mt-9 grid gap-4 lg:grid-cols-3">
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
            className="border border-[#e2eaf3] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#1f6fb2]/40 hover:shadow-lg hover:shadow-[#1f6fb2]/5"
          >
            <FileText className="h-4 w-4 text-[#1f6fb2]" />
            <h3 className="mt-4 font-serif text-[21px] text-[#1f3a5f]">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}