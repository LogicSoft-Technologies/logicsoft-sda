"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { GitPullRequest, ClipboardList, Scale, CheckSquare } from "lucide-react";

export default function ChangeRequestsPage() {
  return (
    <HowWeWorkPage
      index={5}
      title="Change Management"
      description="Requirements change. That's not a failure — it's reality. Our change management process makes change controlled, costed, and consensual — never chaotic."
      steps={[
        { title: "Change Request Logging", body: "Every requested change — regardless of origin — is formally logged with a description, requester, and date. Nothing changes without a ticket." },
        { title: "Impact Assessment", body: "We assess the scope, effort, timeline, and cost impact of each change request within 48 hours. No change is implemented without a known cost." },
        { title: "Prioritisation & Triage", body: "Changes are categorised as critical, high, medium, or low priority. Critical changes enter the next sprint; lower priority changes are batched." },
        { title: "Approval & Implementation", body: "Each change requires explicit approval from the designated change authority before implementation. Approved changes are tracked against the modified baseline." },
      ]}
      principles={[
        { icon: GitPullRequest, title: "No informal changes",    body: "Work done outside the change process is invisible work. We enforce formal logging without exception." },
        { icon: ClipboardList,  title: "Cost before commitment", body: "We never implement a change before its cost is known and approved. Surprises on invoices destroy trust." },
        { icon: Scale,          title: "Scope protection",       body: "The change process protects the original commitment. If you add scope, we add time and/or cost — transparently." },
        { icon: CheckSquare,    title: "Traceable decisions",    body: "Every change decision — approved or rejected — is recorded. Six months later, you can see exactly what changed and why." },
      ]}
      outcomes={[
        "Full traceability of every scope change from request to implementation",
        "Elimination of budget surprises through cost-before-commitment process",
        "Protected original timeline through controlled change batching",
        "Auditable change history supporting governance and compliance requirements",
        "Reduced conflict through transparent, agreed process for all parties",
      ]}
      quote={{ text: "The most dangerous phrase in engineering is 'we've always done it this way.'", source: "Grace Hopper, US Navy Rear Admiral & Pioneer Programmer" }}
    />
  );
}