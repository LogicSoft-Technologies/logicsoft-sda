"use client";

import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

const statusStyle = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  UNSUBSCRIBED: "border-slate-200 bg-slate-100 text-slate-600",
  BOUNCED: "border-red-200 bg-red-50 text-red-700",
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [counts, setCounts] = useState({});
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const params = new URLSearchParams({
      page: "1",
      pageSize: "100",
    });

    if (status) params.set("status", status);
    if (query.trim()) params.set("q", query.trim());

    try {
      const response = await adminApi.subscribers(`?${params.toString()}`);
      setSubscribers(response.subscribers || []);
      setCounts(response.counts || {});
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    load();
  }, [status]);

  async function changeStatus(subscriber, nextStatus) {
    try {
      await adminApi.updateSubscriberStatus(subscriber.id, nextStatus);

      setSubscribers((current) =>
        current.map((item) =>
          item.id === subscriber.id
            ? {
                ...item,
                status: nextStatus,
                unsubscribedAt:
                  nextStatus === "UNSUBSCRIBED"
                    ? new Date().toISOString()
                    : item.unsubscribedAt,
              }
            : item
        )
      );

      setCounts((current) => ({
        ...current,
        [subscriber.status]: Math.max((current[subscriber.status] || 1) - 1, 0),
        [nextStatus]: (current[nextStatus] || 0) + 1,
      }));
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
          Audience
        </p>
        <h1 className="mt-2 font-serif text-[35px] text-[#1f3a5f]">
          Newsletter subscribers
        </h1>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["ACTIVE", "Active"],
          ["PENDING", "Awaiting confirmation"],
          ["UNSUBSCRIBED", "Unsubscribed"],
        ].map(([key, label]) => (
          <div key={key} className="border border-[#e2eaf3] bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-[26px] font-semibold text-[#1f3a5f]">
              {counts[key] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <form
          className="flex flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            load();
          }}
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search email address"
            className="min-w-0 flex-1 border border-[#cbd9e7] bg-white px-4 py-3 text-[13px] outline-none focus:border-[#1f6fb2]"
          />
          <button className="bg-[#1f3a5f] px-4 text-white">
            <Search className="h-4 w-4" />
          </button>
        </form>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="border border-[#cbd9e7] bg-white px-3 py-3 text-[13px]"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="UNSUBSCRIBED">Unsubscribed</option>
          <option value="BOUNCED">Bounced</option>
        </select>
      </div>

      {error && (
        <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto border border-[#e2eaf3] bg-white">
        <table className="min-w-[850px] w-full text-left">
          <thead className="border-b border-[#e2eaf3] bg-[#f8fafc]">
            <tr>
              {["Subscriber", "Status", "Source", "Joined", "Action"].map(
                (label) => (
                  <th
                    key={label}
                    className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500"
                  >
                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf2f7]">
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td className="px-5 py-4">
                  <p className="text-[13px] font-bold text-[#1f3a5f]">
                    {subscriber.email}
                  </p>
                  {subscriber.firstName && (
                    <p className="mt-1 text-[11.5px] text-slate-500">
                      {subscriber.firstName}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`border px-2.5 py-1 text-[10px] font-bold ${
                      statusStyle[subscriber.status]
                    }`}
                  >
                    {subscriber.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-[12px] text-slate-600">
                  <p>{subscriber.source || "website"}</p>
                  {subscriber.sourcePage && (
                    <p className="mt-1 max-w-44 truncate text-[11px] text-slate-400">
                      {subscriber.sourcePage}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4 text-[12px] text-slate-600">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(subscriber.createdAt))}
                </td>

                <td className="px-5 py-4">
                  {subscriber.status !== "UNSUBSCRIBED" && (
                    <button
                      onClick={() =>
                        changeStatus(subscriber, "UNSUBSCRIBED")
                      }
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Unsubscribe
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!subscribers.length && (
          <div className="px-6 py-14 text-center text-[13px] text-slate-500">
            <Users className="mx-auto h-5 w-5 text-[#1f6fb2]" />
            <p className="mt-3">No subscribers match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}