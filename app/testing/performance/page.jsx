// app/testing/performance/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function PerformanceTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Performance Testing"]]}
      eyebrow="Testing & QA"
      title="Performance Testing"
      subtitle="Validate that your application handles peak demand, degrades gracefully under stress, and meets response time requirements — before real users find the limits."
      stats={[
        { value: "<2s", label: "Target page load under load" },
        { value: "10x", label: "Typical peak traffic simulation" },
        { value: "Pre-launch", label: "When performance testing saves money" },
      ]}
      ctaTitle="Test your application under load"
      ctaSub="We'll design realistic load scenarios for your traffic profile and run the tests."
    >
      <Label>Performance testing types</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="📈" title="Load Testing" body="Simulate expected peak traffic to validate response times and resource utilisation at normal operating capacity." />
        <CapCard icon="💥" title="Stress Testing" body="Push beyond capacity limits to find the breaking point — and understand failure modes before they're real." />
        <CapCard icon="⏱️" title="Endurance Testing" body="Sustained load over hours or days to identify memory leaks, connection pool exhaustion, and degradation over time." />
        <CapCard icon="⚡" title="Spike Testing" body="Simulate sudden traffic spikes — product launches, viral moments, or batch job completion." />
        <CapCard icon="🔍" title="Scalability Testing" body="Validate that horizontal scaling works as expected under increasing load — with auto-scaling verified." />
        <CapCard icon="📱" title="API Performance Testing" body="Isolate and test API endpoint performance under concurrent load — before the frontend is even built." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Testing process</Label>
          <div className="space-y-6">
            <Step n="01" title="Workload modelling" body="We profile your real traffic patterns and model realistic user journeys for test scenarios." />
            <Step n="02" title="Script development" body="k6, JMeter, or Gatling scripts written for your application — covering critical user flows." />
            <Step n="03" title="Baseline measurement" body="Current performance benchmarked under zero load — the baseline everything is compared against." />
            <Step n="04" title="Load execution & analysis" body="Progressive load ramp with real-time monitoring and detailed post-test analysis." />
          </div>
        </div>
        <div>
          <Label>Report deliverables</Label>
          <CheckList items={[
            "Performance test plan with test scenarios",
            "Response time graphs under increasing load",
            "Throughput and error rate charts",
            "Bottleneck identification (database, network, compute)",
            "Comparison against SLAs and performance budgets",
            "Tuning recommendations prioritised by impact",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}