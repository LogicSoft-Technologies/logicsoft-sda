"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Database, GitMerge,
  Zap, Brain, Table, PieChart, TrendingUp, Eye
} from "lucide-react";

// ── Design: Dark editorial magazine aesthetic. Deep slate with vivid violet
//    #8b5cf6 accent. Dense data visualisation bars used as decoration.
//    Feels like a premium analytics consultancy — rigorous, intelligent.

const CAPABILITIES = [
  {
    num:"01", icon:Database,
    title:"Data Engineering & Pipelines",
    accent:"#8b5cf6", bg:"#f5f3ff",
    desc:"ETL and ELT pipeline design, data lake and warehouse architecture, and orchestration with Apache Airflow or Prefect. Raw data transformed into reliable, governed, queryable assets your teams actually use.",
    tags:["Apache Airflow","dbt","Spark","Kafka","BigQuery","Snowflake"],
  },
  {
    num:"02", icon:BarChart3,
    title:"Business Intelligence & Dashboards",
    accent:"#7c3aed", bg:"#ede9fe",
    desc:"Self-service BI dashboards built on Looker, Power BI, Tableau, or Metabase — whichever your team already uses. Data models designed so the right people answer their own questions without engineering.",
    tags:["Looker","Power BI","Tableau","Metabase","Redash"],
  },
  {
    num:"03", icon:Brain,
    title:"Machine Learning & Predictive Analytics",
    accent:"#8b5cf6", bg:"#f5f3ff",
    desc:"Churn prediction, demand forecasting, recommendation engines, anomaly detection, and NLP. Model development, validation, deployment to production API, and monitoring for drift.",
    tags:["Python","scikit-learn","XGBoost","TensorFlow","MLflow","Sagemaker"],
  },
  {
    num:"04", icon:Table,
    title:"Data Warehouse & Lakehouse Architecture",
    accent:"#7c3aed", bg:"#ede9fe",
    desc:"Modern data warehouse design on Snowflake, BigQuery, Redshift, or Databricks Delta Lake. Dimensional modelling, partitioning strategy, cost governance, and query performance optimisation.",
    tags:["Snowflake","BigQuery","Redshift","Databricks","Delta Lake"],
  },
  {
    num:"05", icon:GitMerge,
    title:"Data Governance & Quality",
    accent:"#8b5cf6", bg:"#f5f3ff",
    desc:"Data cataloguing, lineage tracking, quality rules, and access control policies. Great Engineering requires trustworthy data — we build the governance layer that makes analysis reliable.",
    tags:["dbt tests","Great Expectations","DataHub","Apache Atlas","dbt docs"],
  },
  {
    num:"06", icon:Zap,
    title:"Real-Time & Streaming Analytics",
    accent:"#7c3aed", bg:"#ede9fe",
    desc:"Kafka-based event streams, Flink processing, and real-time dashboards for operational intelligence. Fraud detection in milliseconds, live inventory tracking, real-time personalisation.",
    tags:["Apache Kafka","Apache Flink","ksqlDB","Kinesis","Pub/Sub"],
  },
];

const STACK_LAYERS = [
  { label:"Ingestion",    tools:["Kafka","Fivetran","Airbyte","Custom connectors"],   color:"#8b5cf6" },
  { label:"Storage",      tools:["Snowflake","BigQuery","S3 + Delta Lake","MongoDB"],  color:"#7c3aed" },
  { label:"Transform",    tools:["dbt","Spark","Airflow","Prefect"],                   color:"#6d28d9" },
  { label:"Serve",        tools:["REST APIs","GraphQL","gRPC","Cube.js"],              color:"#5b21b6" },
  { label:"Visualise",    tools:["Looker","Power BI","Tableau","Metabase"],            color:"#4c1d95" },
];

const PROCESS = [
  { num:"01", title:"Data Discovery",       desc:"Inventory of all data sources, quality assessment, existing tooling review, and business question prioritisation."             },
  { num:"02", title:"Architecture Design",  desc:"Data platform architecture chosen based on volume, velocity, cost tolerance, and team capability — not fashion."              },
  { num:"03", title:"Pipeline Build",       desc:"Data pipelines, transformation models, and quality tests built and deployed. First dashboard delivered within 4 weeks."       },
  { num:"04", title:"Insight & Iteration",  desc:"First insights delivered to stakeholders. Feedback loop established. Models and dashboards iterated based on real use."       },
];

// ── Data viz dashboard hero visual ───────────────────────────────────────────
function DataDashboard() {
  const barData = [
    { label:"Jan", val:62,  color:"#8b5cf6" },
    { label:"Feb", val:78,  color:"#8b5cf6" },
    { label:"Mar", val:71,  color:"#7c3aed" },
    { label:"Apr", val:89,  color:"#8b5cf6" },
    { label:"May", val:95,  color:"#a78bfa" },
    { label:"Jun", val:103, color:"#a78bfa" },
    { label:"Jul", val:98,  color:"#8b5cf6" },
    { label:"Aug", val:114, color:"#a78bfa" },
    { label:"Sep", val:108, color:"#8b5cf6" },
    { label:"Oct", val:127, color:"#c4b5fd" },
    { label:"Nov", val:139, color:"#c4b5fd" },
    { label:"Dec", val:152, color:"#c4b5fd" },
  ];
  const max = Math.max(...barData.map(d => d.val));

  const lineData = [40,52,48,65,70,68,82,79,91,88,102,110];
  const lineMax = Math.max(...lineData);
  const lineMin = Math.min(...lineData);
  const W = 260, H = 60;
  const xs = lineData.map((_, i) => (i / (lineData.length-1)) * W);
  const ys = lineData.map(v => H - ((v-lineMin)/(lineMax-lineMin+1))*H);
  const path = xs.map((x,i) => `${i===0?"M":"L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const areaPath = path + ` L${W},${H} L0,${H} Z`;

  return (
    <div className="w-full border border-violet-900/25 overflow-hidden shadow-2xl shadow-violet-950/20">
      {/* Header */}
      <div className="bg-[#080514] border-b border-violet-900/25 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <BarChart3 className="w-3 h-3 text-violet-400 ml-1" />
          <span className="text-[10px] font-bold font-mono text-violet-400 uppercase tracking-[0.18em]">ANALYTICS DASHBOARD · LIVE</span>
        </div>
        <span className="text-[10px] font-mono text-gray-600">Updated: just now</span>
      </div>

      <div className="bg-[#050310] p-4 space-y-4">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label:"Revenue", val:"₦94.2M",  delta:"+18%",  color:"#a78bfa" },
            { label:"Users",   val:"48,291",  delta:"+24%",  color:"#a78bfa" },
            { label:"Conv. Rate",val:"3.84%", delta:"+0.6pp",color:"#34d399" },
            { label:"Churn",   val:"2.1%",    delta:"-0.4pp",color:"#34d399" },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay: 0.3 + i*0.08 }}
              className="border border-violet-900/20 bg-white/[0.02] p-2.5">
              <p className="text-[8px] text-white/30 uppercase mb-1">{k.label}</p>
              <p className="text-[16px] font-bold font-mono leading-none mb-0.5" style={{ color:k.color }}>{k.val}</p>
              <p className="text-[9px] font-mono" style={{ color: k.delta.startsWith("+") ? "#34d399" : "#f87171" }}>{k.delta}</p>
            </motion.div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="border border-violet-900/20 bg-white/[0.01] p-3">
          <p className="text-[9px] text-white/30 uppercase mb-3 font-bold">Monthly Revenue (₦M)</p>
          <div className="flex items-end gap-1" style={{ height:80 }}>
            {barData.map((d, i) => (
              <motion.div key={d.label} className="flex flex-col items-center flex-1"
                initial={{ scaleY:0 }} animate={{ scaleY:1 }}
                transition={{ delay: 0.5 + i*0.05, duration:0.4, ease:"easeOut" }}
                style={{ transformOrigin:"bottom" }}>
                <div className="w-full rounded-sm" style={{ height:`${(d.val/max)*68}px`, background:d.color+"cc" }} />
                <p className="text-[7px] text-white/20 mt-1 font-mono">{d.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Line chart + table */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-violet-900/20 bg-white/[0.01] p-3">
            <p className="text-[9px] text-white/30 uppercase mb-2 font-bold">User Growth</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height:60 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGrad)" />
              <path d={path} fill="none" stroke="#a78bfa" strokeWidth="2" />
            </svg>
          </div>
          <div className="border border-violet-900/20 bg-white/[0.01] p-3">
            <p className="text-[9px] text-white/30 uppercase mb-2 font-bold">Top Channels</p>
            <div className="space-y-2">
              {[
                { ch:"Organic", pct:42, color:"#8b5cf6" },
                { ch:"Referral", pct:28, color:"#a78bfa" },
                { ch:"Paid", pct:20,    color:"#c4b5fd" },
                { ch:"Direct", pct:10,  color:"#6d28d9" },
              ].map(c => (
                <div key={c.ch} className="flex items-center gap-2">
                  <p className="text-[9px] text-white/35 w-12">{c.ch}</p>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background:c.color }}
                      initial={{ width:0 }} animate={{ width:`${c.pct}%` }}
                      transition={{ delay:0.8, duration:0.6 }} />
                  </div>
                  <p className="text-[9px] font-mono" style={{ color:c.color }}>{c.pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#080514] border-t border-violet-900/20 px-4 py-2 flex justify-between">
        <span className="text-[9.5px] font-mono text-gray-700">Sources: CRM · Payments · App · Web</span>
        <span className="text-[9.5px] font-mono text-violet-400 font-bold">Snowflake · dbt · Looker</span>
      </div>
    </div>
  );
}

export default function DataAnalytics() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Data Analytics — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/other-services" className="hover:text-[#1f6fb2] transition-colors">Other Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Data Analytics</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#050210 0%,#080418 50%,#060212 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[700px] h-[500px] rounded-full bg-violet-900/10 blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-purple-950/10 blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #8b5cf6 1px, transparent 1px)", backgroundSize:"32px 32px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_580px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-violet-600/30 bg-violet-600/8 px-3 py-1.5 mb-6">
                <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[11px] font-bold text-violet-400 uppercase tracking-[0.16em]">Other Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Data<br /><span style={{ color:"#a78bfa" }}>Analytics</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Data engineering, BI dashboards, machine learning, and real-time streaming analytics.
                We build the pipelines, models, and dashboards that turn raw data into business decisions.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"dbt",     label:"Data transformation",    color:"#a78bfa" },
                  { val:"4 wk",    label:"First dashboard",        color:"#c4b5fd" },
                  { val:"ML",      label:"Production model deploy", color:"#a78bfa" },
                  { val:"RT",      label:"Real-time streaming",     color:"#c4b5fd" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-violet-600 hover:bg-violet-500 transition-all duration-200">
                  Discuss your data needs <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Request a data audit
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <DataDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* STACK LAYERS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.16em] mb-3">Modern data stack</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Five layers from raw data to decision.</h3>
          <div className="flex flex-col gap-1">
            {STACK_LAYERS.map((layer, i) => (
              <motion.div key={layer.label}
                initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                className="group flex items-stretch overflow-hidden border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                <div className="shrink-0 w-[90px] flex items-center justify-center text-[11px] font-bold font-mono" style={{ background:layer.color+"18", color:layer.color }}>
                  {layer.label.toUpperCase()}
                </div>
                <div className="flex flex-wrap items-center gap-2 px-5 py-3 flex-1">
                  {layer.tools.map(t => (
                    <span key={t} className="text-[11px] font-semibold px-2.5 py-1 border" style={{ background:layer.color+"10", color:layer.color, borderColor:layer.color+"30" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.16em] mb-4">What we build</p>
              <h3 className="text-[30px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Six capabilities across the data lifecycle.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">From raw event ingestion to ML in production — we build the whole stack or plug into what you already have.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div key={cap.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group relative border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${cap.accent},${cap.accent}55)` }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:cap.bg }}>
                        <cap.icon className="w-4 h-4" style={{ color:cap.accent }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-[#1f3a5f] mb-2 group-hover:text-violet-700 transition-colors">{cap.title}</h4>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background:cap.accent }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background:cap.bg, color:cap.accent, borderColor:cap.accent+"30" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.16em] mb-4">How we work</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-12">From messy data to meaningful insight.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.num}
                className={`group relative p-8 hover:bg-violet-50 transition-colors duration-200 ${i<PROCESS.length-1?"border-b lg:border-b-0 lg:border-r border-gray-200":""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-violet-500 to-purple-400" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5">{p.num}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-violet-700 transition-colors">{p.title}</h4>
                <div className="w-5 h-[2px] bg-violet-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-violet-400 uppercase tracking-[0.15em] mb-3">Data-driven decisions</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Your data has answers. Let's find them.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We'll audit your data landscape, identify the most valuable analytics opportunities, and propose a platform that gets your team to answers fast.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-violet-600 hover:bg-violet-500 transition-all duration-200">
              Start a data project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/other-services/cost-optimization" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Cost optimisation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}