"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { BarChart2, Target, RefreshCw, Award } from "lucide-react";

export default function SuccessMeasurementPage() {
  return (
    <HowWeWorkPage
      index={6}
      title="Success Measurement"
      description="Delivery isn't success. Outcomes are success. We define, track, and report KPIs that measure what actually matters — business results, not activity metrics."
      steps={[
        { title: "KPI Definition", body: "At project inception we co-define success metrics with your team — delivery KPIs (velocity, quality, adherence) and outcome KPIs (performance, adoption, ROI)." },
        { title: "Baseline Establishment", body: "We measure the current state before delivery begins. Improvement can only be demonstrated against a documented baseline." },
        { title: "Continuous Tracking", body: "KPIs are tracked in every sprint and reported in every steering committee. Trends are surfaced early — positive and negative." },
        { title: "Joint Review", body: "We conduct formal success reviews at major milestones and at project close. Findings inform future engagements and validate delivery value." },
      ]}
      principles={[
        { icon: BarChart2,  title: "Outcomes over outputs",  body: "Features shipped is an output. Customer conversion improved is an outcome. We measure outcomes." },
        { icon: Target,     title: "Agreed before delivery", body: "KPIs defined after delivery are rationalisation. We agree metrics before a line of code is written." },
        { icon: RefreshCw,  title: "Continuous not lagging", body: "Annual reviews miss problems that compound over months. We track weekly and report monthly." },
        { icon: Award,      title: "Honest reporting",       body: "We report KPIs we're missing as clearly as KPIs we're exceeding. Selective reporting is not reporting." },
      ]}
      outcomes={[
        "Defined, agreed success criteria before project commencement",
        "Documented baseline enabling genuine improvement measurement",
        "Regular KPI reporting with trend analysis and early warning",
        "Joint accountability between LogicSoft and client teams",
        "Post-delivery evidence of business value for stakeholder reporting",
      ]}
      quote={{ text: "What gets measured gets managed.", source: "Peter Drucker, Management Theorist" }}
    />
  );
}