import {
  FileCheck2,
  FilePenLine,
  MailCheck,
  Users,
} from "lucide-react";

const cards = [
  {
    key: "published",
    label: "Published articles",
    icon: FileCheck2,
    color: "text-emerald-700",
    background: "bg-emerald-50",
  },
  {
    key: "drafts",
    label: "Draft articles",
    icon: FilePenLine,
    color: "text-amber-700",
    background: "bg-amber-50",
  },
  {
    key: "activeSubscribers",
    label: "Active subscribers",
    icon: Users,
    color: "text-[#1f6fb2]",
    background: "bg-[#eaf4ff]",
  },
  {
    key: "pendingSubscribers",
    label: "Pending confirmations",
    icon: MailCheck,
    color: "text-violet-700",
    background: "bg-violet-50",
  },
];

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="border border-[#e2eaf3] bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-500">
                  {card.label}
                </p>

                <p className="mt-3 text-[30px] font-semibold text-[#1f3a5f]">
                  {stats[card.key] || 0}
                </p>
              </div>

              <span className={`grid h-9 w-9 place-items-center ${card.background}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}