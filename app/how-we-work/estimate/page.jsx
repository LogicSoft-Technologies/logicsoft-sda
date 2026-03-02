"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { Calculator, TrendingDown, Eye, GitBranch } from "lucide-react";

export default function EstimatePage() {
  return (
    <HowWeWorkPage
      index={3}
      title="Cost Estimation"
      description="We produce estimates that are accurate, explainable, and defensible. Every line item traces back to a specific requirement, team composition decision, or risk allowance — nothing is guesswork."
      steps={[
        { title: "Scope Decomposition", body: "We break the agreed scope into estimable work units — epics, features, and tasks — each estimated independently before being aggregated." },
        { title: "Effort Modelling", body: "We apply effort models calibrated against 300+ delivered projects. Historical data eliminates the optimism bias that plagues most software estimates." },
        { title: "Risk Allowance", body: "We identify estimation risks — unclear requirements, third-party dependencies, novel technology — and apply explicit contingency, not hidden padding." },
        { title: "Review & Validation", body: "Estimates are reviewed by a senior engineer who didn't produce them. Independent review catches systemic optimism and missing work items." },
      ]}
      principles={[
        { icon: Calculator,  title: "Bottom-up estimation",  body: "We never estimate top-down. Every estimate is built from work units up, not from a budget down." },
        { icon: TrendingDown,title: "Optimism control",      body: "Software estimates are systematically optimistic. We apply structured de-biasing techniques at every level." },
        { icon: Eye,         title: "Full transparency",     body: "You receive the full estimation breakdown — not just the total. Every assumption is documented." },
        { icon: GitBranch,   title: "Scenario modelling",    body: "For large engagements we provide range estimates: baseline, optimistic, and conservative scenarios." },
      ]}
      outcomes={[
        "Estimates accurate to within ±15% on well-scoped projects",
        "Full itemised breakdown — every line item explained",
        "Explicit risk reserves replacing hidden contingency padding",
        "Documented assumptions providing audit trail if scope changes",
        "Scenario modelling enabling informed budget decision-making",
      ]}
      quote={{ text: "For every dollar spent fixing a bug after release, it would have cost $0.10 to fix it during design.", source: "IBM Systems Sciences Institute" }}
    />
  );
}