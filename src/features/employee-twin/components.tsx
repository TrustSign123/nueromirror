"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as d3 from "d3";
import {
  Activity,
  Brain,
  Calendar,
  Check,
  ChevronRight,
  Dna,
  FileText,
  FlaskConical,
  Gauge,
  HeartHandshake,
  HeartPulse,
  Loader2,
  MessageSquareText,
  Moon,
  Pill,
  Send,
  ShieldCheck,
  Sparkles,
  Utensils,
  UploadCloud,
  Watch,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { biomarkers, employeeProfile, organScores, recommendations, risks, timeline, uploadSteps } from "./mock-data";
import { useEmployeeTwinStore } from "./store";
import { Biomarker, OrganId, OrganScore, ReportAnalysisResult, UploadStep } from "./types";

const card = "rounded-lg border border-ink/10 bg-white shadow-hairline";
const organUberonMap: Partial<Record<OrganId, string>> = {
  brain: "UBERON_0000955",
  heart: "UBERON_0000948",
  liver: "UBERON_0002107",
  kidney: "UBERON_0002113",
  lungs: "UBERON_0002048",
  metabolism: "UBERON_0001155"
};

const anatomogramGeometry: Partial<Record<OrganId, { cx: number; cy: number; rx: number; ry: number }>> = {
  brain: { cx: 150, cy: 58, rx: 30, ry: 20 },
  lungs: { cx: 150, cy: 164, rx: 52, ry: 42 },
  heart: { cx: 150, cy: 170, rx: 19, ry: 22 },
  liver: { cx: 182, cy: 225, rx: 34, ry: 22 },
  kidney: { cx: 116, cy: 238, rx: 18, ry: 28 },
  metabolism: { cx: 150, cy: 264, rx: 40, ry: 34 },
  sleep: { cx: 113, cy: 86, rx: 11, ry: 11 },
  stress: { cx: 187, cy: 86, rx: 11, ry: 11 }
};

const statusColor = {
  Normal: "text-clinical",
  Low: "text-amber",
  Borderline: "text-amber",
  High: "text-pulse"
};

function OrganOrb({ organ, position, scale }: { organ: OrganScore; position: [number, number, number]; scale: [number, number, number] }) {
  const setSelectedOrgan = useEmployeeTwinStore((state) => state.setSelectedOrgan);
  const selectedOrganId = useEmployeeTwinStore((state) => state.selectedOrganId);
  const selected = selectedOrganId === organ.id;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    scale[0] = scale[0] + Math.sin(t * 2) * 0;
  });

  return (
    <mesh position={position} scale={scale} onClick={() => setSelectedOrgan(organ.id)}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={organ.color} emissive={organ.color} emissiveIntensity={selected ? 0.6 : 0.18} transparent opacity={organ.id === "lungs" ? 0.4 : 0.82} />
    </mesh>
  );
}

function HumanTwinScene() {
  const organMap = useMemo(
    () =>
      new Map<OrganId, OrganScore>(
        organScores.map((organ) => [organ.id, organ])
      ),
    []
  );

  return (
    <Canvas camera={{ position: [0, 1.5, 7.5], fov: 35 }} dpr={[1, 2]}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} />
      <group rotation={[0, -0.08, 0]}>
        <mesh position={[0, 0.35, 0]} scale={[0.86, 1, 0.48]}>
          <capsuleGeometry args={[0.95, 2.15, 18, 32]} />
          <meshPhysicalMaterial color="#eaf6f4" roughness={0.35} transmission={0.3} thickness={1} transparent opacity={0.55} clearcoat={0.8} />
        </mesh>
        <mesh position={[0, 2.25, 0]} scale={[0.92, 1.05, 0.9]}>
          <sphereGeometry args={[0.48, 44, 44]} />
          <meshPhysicalMaterial color="#edf7f6" roughness={0.3} transmission={0.25} transparent opacity={0.58} />
        </mesh>
        <mesh position={[0, 0.62, 0.08]}>
          <cylinderGeometry args={[0.035, 0.035, 2.2, 18]} />
          <meshStandardMaterial color="#9db8b5" transparent opacity={0.5} />
        </mesh>
        <OrganOrb organ={organMap.get("heart")!} position={[0, 0.95, 0.16]} scale={[0.22, 0.25, 0.16]} />
        <OrganOrb organ={organMap.get("brain")!} position={[0, 2.36, 0.07]} scale={[0.33, 0.18, 0.23]} />
        <OrganOrb organ={organMap.get("lungs")!} position={[0, 1.12, 0.08]} scale={[0.56, 0.38, 0.11]} />
        <OrganOrb organ={organMap.get("liver")!} position={[0.32, 0.55, 0.12]} scale={[0.34, 0.19, 0.13]} />
        <OrganOrb organ={organMap.get("kidney")!} position={[-0.33, 0.28, 0.11]} scale={[0.16, 0.22, 0.1]} />
        <OrganOrb organ={organMap.get("metabolism")!} position={[0, -0.16, 0.13]} scale={[0.33, 0.18, 0.12]} />
        <OrganOrb organ={organMap.get("sleep")!} position={[-0.42, 1.84, 0.08]} scale={[0.11, 0.11, 0.08]} />
        <OrganOrb organ={organMap.get("stress")!} position={[0.42, 1.84, 0.08]} scale={[0.11, 0.11, 0.08]} />
      </group>
    </Canvas>
  );
}

export function EmployeeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clinical">Employee Digital Twin</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">Good Morning, {employeeProfile.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-graphite">Here is your preventive health overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline transition hover:border-ion/30 hover:text-ion">Switch Portal</a>
          <div className="hidden rounded-full border border-ink/10 bg-white px-4 py-2 text-right shadow-hairline sm:block">
            <p className="font-semibold text-ink">{employeeProfile.name}</p>
            <p className="text-xs text-graphite">Employee ID: {employeeProfile.employeeId}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function EmployeeSidebar() {
  const primaryItems = [
    { label: "Dashboard", href: "#dashboard", icon: Activity },
    { label: "Health Twin", href: "#health-twin", icon: Brain },
    { label: "Reports", href: "#reports", icon: FileText },
    { label: "Upload Data", href: "#upload-data", icon: UploadCloud },
    { label: "Wearables", href: "#wearables", icon: Watch },
    { label: "Care Hub", href: "/care-hub", icon: HeartHandshake },
    { label: "Genetic Twin", href: "#genetic-digital-twin", icon: Dna },
    { label: "Health Copilot", href: "#health-copilot", icon: MessageSquareText }
  ];
  const secondaryItems = ["Goals", "Meds", "Visits", "Family"];
  const geneticItems = [
    "Genetic Profile",
    "Biomarker Dashboard",
    "Nutrigenomics",
    "DNA Insights",
    "Food Response Analysis",
    "Vitamin & Mineral Profile",
    "Metabolic Profile",
    "Longevity Dashboard",
    "Genetic Risk Dashboard",
    "Precision Nutrition"
  ];

  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-ink/10 bg-white/94 xl:sticky xl:top-0 xl:flex xl:flex-col">
      <div className="p-5">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
            <Brain size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-ink">NeuroMirror</p>
            <p className="truncate text-xs text-graphite">Personal health twin</p>
          </div>
        </a>

        <div className="mt-6 rounded-lg border border-ink/10 bg-mist p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-graphite">Health Score</p>
              <p className="mt-1 text-3xl font-semibold text-ink">{employeeProfile.overallScore}<span className="text-sm text-graphite">/100</span></p>
            </div>
            <span className="rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">{employeeProfile.category}</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-clinical" style={{ width: `${employeeProfile.overallScore}%` }} />
          </div>
          <p className="mt-3 text-xs font-semibold text-clinical">{employeeProfile.trend}</p>
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-5">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-graphite">Workspace</p>
        <div className="mt-3 space-y-1">
          {primaryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  index === 0 ? "bg-ion text-white shadow-hairline" : "text-graphite hover:bg-mist hover:text-ink"
                }`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-graphite">Genetic Twin</p>
          <div className="mt-3 grid gap-2">
            {geneticItems.map((item) => (
              <a key={item} href="#genetic-digital-twin" className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-xs font-semibold text-graphite shadow-hairline transition hover:border-ion/30 hover:text-ion">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-graphite">More</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {secondaryItems.map((item) => (
              <a key={item} href="#book-demo" className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-center text-xs font-semibold text-graphite shadow-hairline transition hover:border-ion/30 hover:text-ion">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-ink/10 p-4">
        <div className="rounded-lg bg-ink p-4 text-white">
          <p className="text-sm font-semibold">Next best action</p>
          <p className="mt-2 text-xs leading-5 text-white/70">Upload your latest report and ask Copilot what changed.</p>
          <a href="#upload-data" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ink">
            Upload Report <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </aside>
  );
}

export function TopMetricCards() {
  const metrics = [
    { label: "Health Score", value: `${employeeProfile.overallScore}/100`, detail: employeeProfile.category, icon: HeartPulse },
    { label: "Biological Age", value: `${employeeProfile.biologicalAge}`, detail: `Actual age: ${employeeProfile.actualAge}`, icon: Activity },
    { label: "Steps Today", value: employeeProfile.stepsToday.toLocaleString(), detail: "Goal: 10,000 steps", icon: Activity },
    { label: "Sleep Last Night", value: employeeProfile.sleepLastNight, detail: "Fair", icon: Moon },
    { label: "Body Weight", value: employeeProfile.bodyWeight, detail: "-1.2 kg this month", icon: Watch }
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label} className={`${card} p-4`}>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-clinical/10 text-clinical">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-graphite">{metric.label}</p>
                <p className="text-xl font-semibold text-ink">{metric.value}</p>
                <p className="text-xs text-clinical">{metric.detail}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function HealthScoreCard() {
  const colorScale = d3.scaleLinear<string>().domain([0, 50, 80, 100]).range(["#ef4444", "#f97316", "#10b981", "#0f766e"]);
  return (
    <section className={`${card} p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Overall Health Score</p>
          <h2 className="mt-2 text-5xl font-semibold text-ink">{employeeProfile.overallScore}<span className="text-lg text-graphite">/100</span></h2>
          <p className="mt-2 font-semibold text-clinical">{employeeProfile.category}</p>
        </div>
        <p className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-graphite">{employeeProfile.lastUpdated}</p>
      </div>
      <div className="mt-6 space-y-3">
        {organScores.map((organ) => (
          <div key={organ.id}>
            <div className="flex justify-between text-sm font-semibold">
              <span>{organ.name}</span>
              <span>{organ.score}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
              <div className="h-full rounded-full" style={{ width: `${organ.score}%`, backgroundColor: colorScale(organ.score) }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DigitalTwinViewer() {
  const setSelectedOrgan = useEmployeeTwinStore((state) => state.setSelectedOrgan);
  return (
    <section id="health-twin" className={`${card} p-5`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Health Twin Overview</p>
          <h2 className="text-2xl font-semibold text-ink">Interactive Human Digital Twin</h2>
        </div>
        <p className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-graphite">Click organs</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.34fr_0.66fr_0.34fr]">
        <div className="grid gap-3">
          {organScores.slice(0, 4).map((organ) => <OrganButton key={organ.id} organ={organ} onClick={() => setSelectedOrgan(organ.id)} />)}
        </div>
        <div className="h-[420px] rounded-lg bg-gradient-to-b from-white to-mist">
          <HumanTwinScene />
        </div>
        <div className="grid gap-3">
          {organScores.slice(4).map((organ) => <OrganButton key={organ.id} organ={organ} onClick={() => setSelectedOrgan(organ.id)} />)}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-graphite">
        {["Excellent (80-100)", "Good (60-79)", "Needs Care (40-59)", "High Risk (0-39)"].map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  );
}

export function OrganAnatomogramPanel() {
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganScore | null>(null);
  const setSelectedOrgan = useEmployeeTwinStore((state) => state.setSelectedOrgan);

  return (
    <section className={`${card} p-5`}>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Organ Ontology Anatomogram</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">Human body health score map</h2>
          <p className="mt-2 text-sm leading-6 text-graphite">
            Anatomogram-style organ map using Uberon IDs, mapped to this employee's health scores.
          </p>
        </div>
        <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold text-graphite">
          {hoveredOrgan ? `${hoveredOrgan.name}: ${hoveredOrgan.score}/100` : "Hover or click tissue"}
        </span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="min-h-[420px] overflow-hidden rounded-lg bg-gradient-to-b from-white to-mist p-3">
          <svg viewBox="0 0 300 430" role="img" aria-label="Human organ anatomogram with health scores" className="mx-auto h-[420px] w-full max-w-md">
            <defs>
              <linearGradient id="bodyShell" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#dff4ff" />
                <stop offset="100%" stopColor="#eef8f6" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M150 22c25 0 45 20 45 45 0 18-10 33-25 40v24l60 22c18 7 30 24 30 43v90c0 17-13 30-30 30h-28l-10 86c-2 14-13 24-27 24h-30c-14 0-25-10-27-24l-10-86H70c-17 0-30-13-30-30v-90c0-19 12-36 30-43l60-22v-24c-15-7-25-22-25-40 0-25 20-45 45-45z"
              fill="url(#bodyShell)"
              stroke="#9bc9d8"
              strokeWidth="2"
              opacity="0.82"
            />
            <path d="M150 112v278" stroke="#8fb9bf" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
            {organScores.map((organ) => {
              const shape = anatomogramGeometry[organ.id];
              if (!shape) return null;
              const risky = organ.risk === "High" || organ.risk === "Needs Care";
              return (
                <g
                  key={organ.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${organ.name} score ${organ.score}`}
                  onMouseEnter={() => setHoveredOrgan(organ)}
                  onMouseLeave={() => setHoveredOrgan(null)}
                  onFocus={() => setHoveredOrgan(organ)}
                  onBlur={() => setHoveredOrgan(null)}
                  onClick={() => setSelectedOrgan(organ.id)}
                  className="cursor-pointer"
                >
                  <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx + 7} ry={shape.ry + 7} fill={organ.color} opacity={risky ? "0.18" : "0.11"} filter="url(#softGlow)" />
                  <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} fill={organ.color} opacity={risky ? "0.88" : "0.72"} stroke="#ffffff" strokeWidth="2" />
                  <text x={shape.cx} y={shape.cy + 4} textAnchor="middle" className="fill-white text-[12px] font-bold">
                    {organ.score}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="grid gap-3">
          {organScores.map((organ) => (
            <button
              key={organ.id}
              onClick={() => setSelectedOrgan(organ.id)}
              className="rounded-lg border border-ink/10 bg-white p-3 text-left shadow-hairline transition hover:border-clinical/40"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{organ.name}</p>
                  <p className="text-xs text-graphite">{organUberonMap[organ.id] ?? "Digital twin signal"}</p>
                </div>
                <p className="text-xl font-semibold text-ink">{organ.score}</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
                <div className="h-full rounded-full" style={{ width: `${organ.score}%`, backgroundColor: organ.color }} />
              </div>
              <p className={`mt-2 text-xs font-semibold ${organ.risk === "High" || organ.risk === "Needs Care" ? "text-pulse" : "text-clinical"}`}>
                {organ.risk} · {organ.trend}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganButton({ organ, onClick }: { organ: OrganScore; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-lg border border-ink/10 bg-white p-3 text-left shadow-hairline transition hover:border-clinical/40">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: organ.color }} />
        <div>
          <p className="font-semibold text-ink">{organ.name}</p>
          <p className="text-xs text-graphite">Score: {organ.score}</p>
          <p className={`text-xs font-semibold ${organ.risk === "High" || organ.risk === "Needs Care" ? "text-pulse" : "text-clinical"}`}>{organ.risk}</p>
        </div>
      </div>
    </button>
  );
}

export function OrganDetailDrawer() {
  const { selectedOrganId, drawerOpen, closeDrawer } = useEmployeeTwinStore();
  const organ = organScores.find((item) => item.id === selectedOrganId) ?? organScores[1];

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm">
      <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} exit={{ x: 420 }} className="ml-auto h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-glass">
        <button onClick={closeDrawer} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-mist text-ink" aria-label="Close organ drawer">
          <X size={18} />
        </button>
        <p className="text-sm font-semibold uppercase text-clinical">Organ Detail</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{organ.name}</h2>
        <p className="mt-1 text-graphite">{organ.score}/100 · {organ.risk} Risk · {organ.trend} · {organ.change > 0 ? "+" : ""}{organ.change} points</p>
        <div className="mt-5 h-56 rounded-lg bg-mist p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={organ.history}>
              <CartesianGrid stroke="#e5ecea" vertical={false} />
              <XAxis dataKey="month" stroke="#647176" />
              <YAxis stroke="#647176" />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke={organ.color} fill={`${organ.color}22`} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <InfoBlock title="AI Analysis" text={organ.analysis} />
        <InfoBlock title="Prediction" text={organ.prediction} />
        <div className="mt-5">
          <h3 className="font-semibold text-ink">Recommendations</h3>
          <div className="mt-3 space-y-2">
            {organ.recommendations.map((item) => (
              <p key={item} className="rounded-lg bg-mist p-3 text-sm font-semibold text-ink">{item}</p>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-5 rounded-lg border border-ink/10 p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-graphite">{text}</p>
    </div>
  );
}

export function HealthCopilotPanel() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Hi Rohit. Upload a PDF report and I can answer questions from it, explain markers, and prepare a doctor-ready summary."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { latestReportAnalysis, vectorStoreId } = useEmployeeTwinStore();
  const prompts = ["Explain my HbA1c", "Why is my liver score low?", "Generate doctor summary", "Prepare diet plan"];
  const userContext = `${employeeProfile.name}, employee ${employeeProfile.employeeId}, age ${employeeProfile.actualAge}, current overall score ${employeeProfile.overallScore}, biological age ${employeeProfile.biologicalAge}, latest weight ${employeeProfile.bodyWeight}, sleep last night ${employeeProfile.sleepLastNight}, steps today ${employeeProfile.stepsToday}.`;

  const sendMessage = async (nextMessage = message) => {
    const trimmed = nextMessage.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...chatMessages, { role: "user" as const, content: trimmed }];
    setChatMessages(nextMessages);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/employee-twin/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: chatMessages,
          vectorStoreId,
          reportSummary: latestReportAnalysis?.summary,
          userContext
        })
      });
      const payload = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to reach the health copilot.");
      }

      setChatMessages((items) => [...items, { role: "assistant", content: payload.answer ?? "I could not generate an answer." }]);
    } catch (sendError) {
      const text = sendError instanceof Error ? sendError.message : "Unable to reach the health copilot.";
      setError(text);
      setChatMessages((items) => [...items, { role: "assistant", content: text }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside id="health-copilot" className={`${card} flex h-full min-h-[520px] flex-col p-5`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ion text-white">
          <MessageSquareText size={19} />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-ink">AI Health Copilot</h2>
          <p className="text-xs text-graphite">Informational guidance, not medical diagnosis.</p>
        </div>
      </div>
      <div className="mt-5 flex-1 space-y-4 overflow-y-auto">
        {latestReportAnalysis && (
          <div className="rounded-lg border border-clinical/20 bg-clinical/5 p-4 text-sm leading-6 text-ink">
            <p className="font-semibold text-clinical">Latest report loaded</p>
            <p className="mt-1">{latestReportAnalysis.summary}</p>
            <p className="mt-2 text-xs font-semibold text-graphite">
              {latestReportAnalysis.isRelevant ? "Report memory is active for this chat." : `Not used for marker updates: ${latestReportAnalysis.relevanceReason}`}
            </p>
          </div>
        )}
        {chatMessages.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={`rounded-lg p-4 text-sm leading-6 ${
              item.role === "user" ? "ml-auto w-fit max-w-[84%] bg-ion text-white" : "bg-mist text-ink"
            }`}
          >
            {item.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 rounded-lg bg-mist p-4 text-sm font-semibold text-graphite">
            <Loader2 className="animate-spin" size={16} /> Thinking from your report...
          </div>
        )}
      </div>
      {error && <p className="mt-3 rounded-lg bg-pulse/10 p-3 text-xs font-semibold text-pulse">{error}</p>}
      <div className="mt-5 flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button key={prompt} onClick={() => sendMessage(prompt)} className="rounded-full border border-ion/20 px-3 py-2 text-xs font-semibold text-ion">
            {prompt}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2 rounded-lg border border-ink/10 bg-white p-2">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          className="min-w-0 flex-1 px-2 text-sm text-ink"
          placeholder="Ask me anything about your health..."
        />
        <button onClick={() => sendMessage()} disabled={loading} className="grid h-9 w-9 place-items-center rounded-lg bg-ion text-white disabled:opacity-50" aria-label="Send message">
          {loading ? <Loader2 className="animate-spin" size={17} /> : <Send size={17} />}
        </button>
      </div>
    </aside>
  );
}

export function RiskDashboard() {
  return (
    <section className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-ink">Risk Dashboard</h2>
        <a className="text-sm font-semibold text-ion" href="#risk-dashboard">View Details</a>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {risks.map((risk) => (
          <article key={risk.name} className="rounded-lg border border-ink/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-ink">{risk.name}</h3>
                <p className={`mt-1 text-xs font-semibold ${risk.level === "High" ? "text-pulse" : risk.level === "Low" ? "text-clinical" : "text-amber"}`}>{risk.level} Risk</p>
              </div>
              <p className="text-2xl font-semibold text-ink">{risk.risk}%</p>
            </div>
            <div className="mt-3 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={risk.data}>
                  <Line type="monotone" dataKey="risk" stroke={risk.level === "High" ? "#ef4444" : "#2f6fed"} strokeWidth={2} dot={false} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-xs leading-5 text-graphite">{risk.prediction}</p>
            <button className="mt-3 rounded-full bg-mist px-3 py-2 text-xs font-semibold text-ink">{risk.action}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SimulationEngine() {
  const { simulation, setSimulation } = useEmployeeTwinStore();
  const projectedHeartRisk = Math.max(6, Math.round(44 - (102 - simulation.weight) * 1.3 - (simulation.sleep - 6) * 2 - simulation.exercise * 0.12 + simulation.stress * 1.2 + simulation.alcohol * 1.4 + simulation.smoking * 4));
  const improvement = Math.max(0, Math.round(((22 - projectedHeartRisk) / 22) * 100));
  const chart = [
    { name: "Current", risk: 22 },
    { name: "Projected", risk: projectedHeartRisk }
  ];
  const sliders = [
    ["weight", "Target Weight", simulation.weight, 70, 110, "kg"],
    ["sleep", "Sleep", simulation.sleep, 4, 9, "h"],
    ["exercise", "Exercise", simulation.exercise, 0, 120, "min"],
    ["calories", "Calories", simulation.calories, 1400, 3200, "kcal"],
    ["smoking", "Smoking", simulation.smoking, 0, 10, "cigs"],
    ["alcohol", "Alcohol", simulation.alcohol, 0, 7, "drinks"],
    ["stress", "Stress", simulation.stress, 1, 10, "/10"]
  ] as const;

  return (
    <section className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">What-If Simulation</h2>
      <p className="mt-2 text-sm text-graphite">Adjust lifestyle inputs and see projected heart risk improvement.</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {sliders.map(([key, label, value, min, max, unit]) => (
            <label key={key} className="text-sm font-semibold text-ink">
              <span className="flex justify-between"><span>{label}</span><span>{value}{unit}</span></span>
              <input className="mt-2 w-full accent-clinical" type="range" min={min} max={max} step={key === "sleep" ? 0.5 : 1} value={value} onChange={(event) => setSimulation(key, Number(event.target.value))} />
            </label>
          ))}
        </div>
        <div className="rounded-lg bg-mist p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <Metric label="Current Heart Risk" value="22%" />
            <Metric label="Projected Risk" value={`${projectedHeartRisk}%`} />
            <Metric label="Improvement" value={`${improvement}%`} />
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}>
                <CartesianGrid stroke="#dbe7e4" vertical={false} />
                <XAxis dataKey="name" stroke="#647176" />
                <YAxis stroke="#647176" />
                <Tooltip />
                <Bar dataKey="risk" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs font-semibold text-graphite">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

export function BiomarkerCharts() {
  const biomarkerUpdates = useEmployeeTwinStore((state) => state.biomarkerUpdates);
  const liveBiomarkers = useMemo(
    () =>
      biomarkers.map((biomarker): Biomarker => {
        const update = biomarkerUpdates[biomarker.name.toLowerCase()];
        if (!update) return biomarker;

        const numericValue = Number.parseFloat(update.value);
        return {
          ...biomarker,
          value: update.value,
          unit: update.unit ?? biomarker.unit,
          status: update.status ?? biomarker.status,
          data: Number.isFinite(numericValue)
            ? [...biomarker.data.slice(0, -1), { month: "Latest", value: numericValue }]
            : biomarker.data
        };
      }),
    [biomarkerUpdates]
  );

  return (
    <section className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-ink">Biomarkers</h2>
        <a href="#biomarkers" className="text-sm font-semibold text-ion">View All</a>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {liveBiomarkers.map((biomarker) => (
          <article key={biomarker.name} className="rounded-lg border border-ink/10 p-4">
            <p className="font-semibold text-ink">{biomarker.name}</p>
            <p className="mt-1 text-xl font-semibold text-ink">{biomarker.value} <span className="text-sm text-graphite">{biomarker.unit}</span></p>
            <p className={`text-xs font-semibold ${statusColor[biomarker.status]}`}>{biomarker.status}</p>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={biomarker.data}>
                  <Line type="monotone" dataKey="value" stroke={biomarker.status === "High" ? "#ef4444" : "#10b981"} strokeWidth={2} dot={false} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RecommendationPanel() {
  return (
    <section className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">Personalized Recommendations</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {recommendations.map((item) => (
          <article key={item.title} className="rounded-lg bg-mist p-4">
            <p className="font-semibold text-ink">{item.title}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <span className="rounded bg-white p-2 font-semibold text-clinical">Impact: {item.expectedImpact}</span>
              <span className="rounded bg-white p-2 font-semibold text-ink">Difficulty: {item.difficulty}</span>
              <span className="rounded bg-white p-2 font-semibold text-ion">Score: {item.improvement}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function UploadReportWidget() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [analysis, setAnalysis] = useState<ReportAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const applyReportAnalysis = useEmployeeTwinStore((state) => state.applyReportAnalysis);
  const current = uploadSteps[activeStep];
  const loading = uploading || (activeStep > 0 && activeStep < uploadSteps.length - 1);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const uploadReport = async () => {
    if (!selectedFile || uploading) {
      fileInputRef.current?.click();
      return;
    }

    setUploading(true);
    setError("");
    setAnalysis(null);
    setActiveStep(1);

    const formData = new FormData();
    formData.append("file", selectedFile);

    let stepTimer: number | undefined;
    try {
      stepTimer = window.setInterval(() => {
        setActiveStep((step) => Math.min(step + 1, uploadSteps.length - 2));
      }, 1400);

      const response = await fetch("/api/employee-twin/upload-report", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as ReportAnalysisResult | { error?: string };
      if (!response.ok) {
        throw new Error("error" in payload ? payload.error : "Unable to analyze the report.");
      }

      const result = payload as ReportAnalysisResult;
      if (result.isRelevant) {
        applyReportAnalysis(result);
      }
      setAnalysis(result);
      setActiveStep(uploadSteps.length - 1);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to analyze the report.");
      setActiveStep(0);
    } finally {
      if (stepTimer) {
        window.clearInterval(stepTimer);
      }
      setUploading(false);
    }
  };

  return (
    <section id="upload-data" className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">Upload Reports</h2>
      <p className="mt-2 text-sm text-graphite">Upload a PDF lab report for live OpenAI analysis, RAG indexing, and marker updates.</p>
      <div className="mt-5 rounded-lg border-2 border-dashed border-ion/30 bg-mist p-6 text-center">
        <UploadCloud className="mx-auto text-ion" size={42} />
        <p className="mt-3 font-semibold text-ink">{selectedFile ? selectedFile.name : "Choose a PDF report to analyze"}</p>
        <p className="mt-1 text-xs text-graphite">PDFs are uploaded to OpenAI Files and indexed in a vector store for report-aware chat.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setSelectedFile(file);
            setAnalysis(null);
            setError("");
            if (downloadUrl) {
              URL.revokeObjectURL(downloadUrl);
            }
            setDownloadUrl(file ? URL.createObjectURL(file) : "");
          }}
        />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-white px-5 py-3 font-semibold text-ion">
            Select PDF
          </button>
          <button onClick={uploadReport} disabled={uploading} className="inline-flex items-center gap-2 rounded-full bg-ion px-5 py-3 font-semibold text-white disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />} {current}
          </button>
        </div>
      </div>
      {error && <p className="mt-3 rounded-lg bg-pulse/10 p-3 text-sm font-semibold text-pulse">{error}</p>}
      {downloadUrl && selectedFile && (
        <a href={downloadUrl} download={selectedFile.name} className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">
          <FileText size={16} /> Download uploaded PDF
        </a>
      )}
      {analysis && (
        <div className={`mt-4 rounded-lg border p-4 ${analysis.isRelevant ? "border-clinical/20 bg-clinical/5" : "border-amber/30 bg-amber/10"}`}>
          <p className={`text-sm font-semibold ${analysis.isRelevant ? "text-clinical" : "text-amber"}`}>
            {analysis.isRelevant ? "Health report analyzed" : "Document not relevant"}
          </p>
          <p className="mt-2 text-sm leading-6 text-ink">{analysis.isRelevant ? analysis.summary : analysis.relevanceReason}</p>
          {analysis.isRelevant && (
            <div className="mt-3 flex flex-wrap gap-2">
              {analysis.biomarkers.slice(0, 6).map((biomarker) => (
                <span key={biomarker.name} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-hairline">
                  {biomarker.name}: {biomarker.value}{biomarker.unit ? ` ${biomarker.unit}` : ""}
                </span>
              ))}
            </div>
          )}
          <div className="mt-3 rounded-lg bg-white p-3 text-xs leading-5 text-graphite">
            {analysis.isRelevant
              ? "Markers were updated on the dashboard and the report is indexed in RAG memory for Copilot questions."
              : "Dashboard markers were not changed. Upload a lab report, prescription, diagnostic report, or health checkup PDF for full analysis."}
          </div>
        </div>
      )}
      <div className="mt-5 grid gap-2">
        {uploadSteps.map((step: UploadStep, index) => (
          <div key={step} className={`flex items-center gap-3 rounded-lg p-3 ${index <= activeStep ? "bg-mist" : "bg-white"}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${index < activeStep ? "bg-clinical text-white" : index === activeStep ? "bg-ink text-white" : "bg-mist text-graphite"}`}>
              {index < activeStep ? <Check size={14} /> : index + 1}
            </span>
            <p className="text-sm font-semibold text-ink">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GeneticDigitalTwinModule() {
  const geneticScores = [
    { label: "Biomarker Health", value: 78, detail: "Current reports + DNA layer", icon: FlaskConical, color: "#0f766e" },
    { label: "Biological Age", value: 31, detail: "3 years younger than actual", icon: Gauge, color: "#2f6fed" },
    { label: "Longevity Score", value: 82, detail: "Improving with sleep trend", icon: Sparkles, color: "#a26814" },
    { label: "Nutrition Fit", value: 74, detail: "Low glycemic plan favored", icon: Utensils, color: "#e2495d" }
  ];
  const biomarkerIntelligence = [
    ["Blood Sugar", "HbA1c", "5.7%", "4.8-5.6%", "5.9%", "Improving", "Borderline", "Reduce evening carbs and add post-meal walks."],
    ["Lipids", "LDL", "118 mg/dL", "<100", "129", "Improving", "Medium", "Increase fiber and prioritize unsaturated fats."],
    ["Inflammation", "CRP", "2.8 mg/L", "<1.0", "3.4", "Improving", "Medium", "Improve sleep consistency and omega-3 intake."],
    ["Nutrition", "Vitamin D", "24 ng/mL", "30-100", "21", "Improving", "Low", "Add sunlight, fortified foods, and clinician-approved supplement."],
    ["Kidney", "eGFR", "96", ">90", "94", "Stable", "Normal", "Maintain hydration and blood pressure tracking."],
    ["Hormones", "TSH", "3.1 mIU/L", "0.4-4.0", "3.4", "Stable", "Watch", "Monitor fatigue and repeat thyroid panel if symptoms persist."]
  ];
  const foodResponses = [
    { name: "Carbohydrate Sensitivity", genetic: "Higher glucose response tendency", biomarker: "HbA1c borderline", recommendation: "Low glycemic meals, 10-minute walks after dinner", confidence: 88 },
    { name: "Fat Metabolism", genetic: "Moderate saturated fat sensitivity", biomarker: "LDL still above target", recommendation: "Prefer nuts, olive oil, avocado, and fatty fish", confidence: 81 },
    { name: "Protein Utilization", genetic: "Average utilization pattern", biomarker: "Weight trend improving", recommendation: "Protein-first breakfast and strength training days", confidence: 76 },
    { name: "Caffeine Response", genetic: "Slow caffeine clearance", biomarker: "Sleep recovery uneven", recommendation: "Stop caffeine after 1 PM", confidence: 84 },
    { name: "Lactose Tolerance", genetic: "Possible reduced tolerance", biomarker: "No inflammation spike confirmed", recommendation: "Monitor dairy symptoms for 14 days", confidence: 67 },
    { name: "Hydration Response", genetic: "Higher sweat sodium tendency", biomarker: "Kidney markers stable", recommendation: "Electrolytes on high-sweat workout days", confidence: 79 }
  ];
  const vitaminProfiles = [
    ["Vitamin D", "24 ng/mL", "Lower utilization pattern", "Low", "Eggs, mushrooms, fortified milk", "Discuss D3 plan with clinician", "+3 ng/mL"],
    ["Vitamin B12", "450 pg/mL", "Normal absorption", "Normal", "Dairy, eggs, fish", "Maintenance only", "+30 pg/mL"],
    ["Iron", "78 ug/dL", "Average transport", "Watch", "Lentils, spinach, lean meat", "Pair with vitamin C foods", "Stable"],
    ["Magnesium", "1.8 mg/dL", "Higher stress depletion", "Watch", "Pumpkin seeds, nuts, legumes", "Consider sleep-support timing", "-0.1"],
    ["Zinc", "82 ug/dL", "Average utilization", "Normal", "Seeds, beans, seafood", "Food-first approach", "Stable"],
    ["Folate", "8.9 ng/mL", "Methylation support needed", "Watch", "Leafy greens, beans", "Review with nutritionist", "+0.4"]
  ];
  const metabolicData = [
    { month: "Jan", metabolic: 65, longevity: 71, inflammation: 58 },
    { month: "Feb", metabolic: 67, longevity: 73, inflammation: 55 },
    { month: "Mar", metabolic: 70, longevity: 75, inflammation: 51 },
    { month: "Apr", metabolic: 73, longevity: 78, inflammation: 47 },
    { month: "May", metabolic: 76, longevity: 82, inflammation: 42 }
  ];
  const dnaLayers = ["Medical Records", "Wearable Data", "Lifestyle Data", "Biomarkers", "Genetics", "AI Predictions"];
  const uploadProviders = ["23andMe", "AncestryDNA", "MyHeritage", "CircleDNA", "Nutrigenomix", "Custom Laboratory Reports"];
  const dataTables = [
    "genetic_reports",
    "dna_variants",
    "genetic_traits",
    "biomarkers",
    "biomarker_history",
    "food_response_profiles",
    "nutrigenomics_recommendations",
    "metabolic_scores",
    "longevity_scores",
    "vitamin_profiles",
    "supplement_plans",
    "nutrition_plans"
  ];

  return (
    <section id="genetic-digital-twin" className={`${card} overflow-hidden`}>
      <div className="border-b border-ink/10 bg-ink p-5 text-white">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Premium Module</p>
            <h2 className="mt-2 text-3xl font-semibold">Genetic Digital Twin</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/72">
              Combines DNA reports, biomarkers, wearables, lifestyle signals, and AI predictions for precision nutrition and personalized health planning.
            </p>
          </div>
          <div className="grid w-full max-w-sm grid-cols-2 gap-2 text-xs font-semibold">
            {["PDF", "CSV", "VCF", "Genetic data files"].map((format) => (
              <span key={format} className="rounded-lg bg-white/10 px-3 py-2 text-center text-white/80">{format}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {geneticScores.map((score) => {
            const Icon = score.icon;
            return (
              <article key={score.label} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist" style={{ color: score.color }}>
                    <Icon size={21} />
                  </span>
                  <p className="text-3xl font-semibold text-ink">{score.value}</p>
                </div>
                <p className="mt-3 font-semibold text-ink">{score.label}</p>
                <p className="mt-1 text-xs text-graphite">{score.detail}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
                  <div className="h-full rounded-full" style={{ width: `${score.value}%`, backgroundColor: score.color }} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-lg border border-ink/10 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-ion/10 text-ion">
                <UploadCloud size={21} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">DNA Test Upload Flow</h3>
                <p className="text-sm text-graphite">Upload genetic reports and connect them to the permanent twin layer.</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border-2 border-dashed border-ion/30 bg-mist p-5 text-center">
              <Dna className="mx-auto text-ion" size={42} />
              <p className="mt-3 font-semibold text-ink">Drop DNA report or genetic data file</p>
              <p className="mt-1 text-xs text-graphite">Supported providers: {uploadProviders.join(", ")}.</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-ion px-5 py-3 text-sm font-semibold text-white">
                <UploadCloud size={17} /> Upload DNA Report
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              {["Validate file", "Extract variants", "Map traits", "Update genetic layer", "Generate AI explanation"].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg bg-mist p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-semibold text-ion">{index + 1}</span>
                  <p className="text-sm font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-ink">Genetic Profile Dashboard</h3>
                <p className="text-sm text-graphite">DNA summary, traits, predispositions, metabolism, nutrition, exercise, sleep, stress, and drug response.</p>
              </div>
              <span className="rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">Twin confidence 91%</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["Health Predispositions", "Metabolic syndrome, inflammation, vitamin D deficiency"],
                ["Nutrition Insights", "Low glycemic, higher omega-3, moderate saturated fat"],
                ["Exercise Response", "Strong response to mixed cardio + resistance"],
                ["Sleep Genetics", "Caffeine sensitivity affects sleep recovery"],
                ["Stress Response", "Higher cortisol recovery support needed"],
                ["Drug Response", "Clinician review required before medication decisions"]
              ].map(([title, detail]) => (
                <article key={title} className="rounded-lg bg-mist p-3">
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-graphite">{detail}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metabolicData}>
                  <CartesianGrid stroke="#dbe7e4" vertical={false} />
                  <XAxis dataKey="month" stroke="#647176" />
                  <YAxis stroke="#647176" />
                  <Tooltip />
                  <Area type="monotone" dataKey="metabolic" stroke="#0f766e" fill="#0f766e" fillOpacity={0.16} />
                  <Area type="monotone" dataKey="longevity" stroke="#2f6fed" fill="#2f6fed" fillOpacity={0.12} />
                  <Area type="monotone" dataKey="inflammation" stroke="#e2495d" fill="#e2495d" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-ink/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-ink">Biomarker Intelligence Dashboard</h3>
              <p className="text-sm text-graphite">Current value, normal range, previous value, trend, risk, AI explanation, and recommended action.</p>
            </div>
            <FlaskConical className="hidden text-clinical sm:block" size={24} />
          </div>
          <div className="mt-4 overflow-hidden overflow-x-auto rounded-lg border border-ink/10">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-mist text-xs uppercase text-graphite">
                <tr>
                  {["Section", "Marker", "Current", "Normal Range", "Previous", "Trend", "Risk", "AI Action"].map((heading) => (
                    <th key={heading} className="px-4 py-3">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {biomarkerIntelligence.map(([section, marker, current, normal, previous, trend, risk, action]) => (
                  <tr key={`${section}-${marker}`}>
                    <td className="px-4 py-3 font-semibold text-ink">{section}</td>
                    <td className="px-4 py-3 text-graphite">{marker}</td>
                    <td className="px-4 py-3 font-semibold text-ink">{current}</td>
                    <td className="px-4 py-3 text-graphite">{normal}</td>
                    <td className="px-4 py-3 text-graphite">{previous}</td>
                    <td className="px-4 py-3 text-clinical">{trend}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${risk === "Normal" ? "bg-clinical/10 text-clinical" : risk === "Low" || risk === "Medium" ? "bg-amber/10 text-amber" : "bg-ion/10 text-ion"}`}>
                        {risk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-graphite">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-ink/10 p-4">
            <h3 className="font-semibold text-ink">How My Body Responds to Food</h3>
            <p className="mt-1 text-sm text-graphite">Combines DNA, blood reports, weight trends, lifestyle, and wearable data.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {foodResponses.map((item) => (
                <article key={item.name} className="rounded-lg bg-mist p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-ion">{item.confidence}%</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-graphite"><span className="font-semibold text-ink">Genetic:</span> {item.genetic}</p>
                  <p className="mt-1 text-xs leading-5 text-graphite"><span className="font-semibold text-ink">Biomarker:</span> {item.biomarker}</p>
                  <p className="mt-2 rounded-lg bg-white p-2 text-xs font-semibold text-clinical">{item.recommendation}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 p-4">
            <h3 className="font-semibold text-ink">Precision Nutrition Dashboard</h3>
            <p className="mt-1 text-sm text-graphite">Recommended diet type: Low glycemic Mediterranean vegetarian.</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Foods to eat more", "Lentils, beans, leafy greens, curd, nuts, seeds, berries"],
                ["Foods to limit", "Refined flour, sugary drinks, late-night desserts, fried snacks"],
                ["Foods to monitor", "Dairy, gluten-heavy meals, caffeine after lunch"],
                ["Hydration goals", "2.8 L water, electrolytes on workout days"],
                ["Supplement guidance", "Vitamin D and magnesium review with clinician"],
                ["Meal timing", "12-hour eating window and protein-first breakfast"]
              ].map(([title, detail]) => (
                <div key={title} className="flex items-start gap-3 rounded-lg bg-mist p-3">
                  <Utensils className="mt-0.5 shrink-0 text-clinical" size={17} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="text-xs leading-5 text-graphite">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-ink/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-ink">Vitamin & Mineral Intelligence</h3>
              <p className="text-sm text-graphite">Current biomarker, genetic utilization, risk, foods, supplement guidance, and trend.</p>
            </div>
            <Pill className="hidden text-amber sm:block" size={24} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {vitaminProfiles.map(([name, current, pattern, risk, foods, supplement, trend]) => (
              <article key={name} className="rounded-lg border border-ink/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="text-sm text-graphite">{current}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${risk === "Normal" ? "bg-clinical/10 text-clinical" : "bg-amber/10 text-amber"}`}>{risk}</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-graphite">Genetic pattern: {pattern}</p>
                <p className="mt-2 text-xs leading-5 text-graphite">Foods: {foods}</p>
                <p className="mt-2 rounded-lg bg-mist p-2 text-xs font-semibold text-ink">{supplement}</p>
                <p className="mt-2 text-xs font-semibold text-clinical">Trend: {trend}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-3">
          <section className="rounded-lg border border-ink/10 p-4 xl:col-span-1">
            <h3 className="font-semibold text-ink">Metabolic Digital Twin</h3>
            <div className="mt-4 grid gap-3">
              {[
                ["Metabolic Age", "29"],
                ["Insulin Sensitivity", "72/100"],
                ["Fat Burning Efficiency", "68/100"],
                ["Recovery Score", "76/100"],
                ["Energy Utilization", "74/100"],
                ["Muscle Maintenance", "81/100"]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-lg bg-mist p-3">
                  <p className="text-sm font-semibold text-graphite">{label}</p>
                  <p className="font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-ink/10 p-4 xl:col-span-2">
            <h3 className="font-semibold text-ink">Longevity Dashboard</h3>
            <p className="mt-1 text-sm text-graphite">Biological age, projected healthspan, inflammation trend, metabolic trend, sleep quality, and fitness trend.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metabolicData}>
                  <CartesianGrid stroke="#dbe7e4" vertical={false} />
                  <XAxis dataKey="month" stroke="#647176" />
                  <YAxis stroke="#647176" />
                  <Tooltip />
                  <Line type="monotone" dataKey="longevity" stroke="#2f6fed" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="metabolic" stroke="#0f766e" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="inflammation" stroke="#e2495d" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-ink/10 p-4">
            <h3 className="font-semibold text-ink">Digital Twin Layers</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-6">
              {dnaLayers.map((layer, index) => (
                <div key={layer} className="rounded-lg bg-mist p-3 text-center">
                  <p className="text-xs font-semibold uppercase text-graphite">Layer {index + 1}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{layer}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-clinical/10 p-4 text-sm leading-6 text-ink">
              Genetic data is stored as a permanent twin layer and used by AI predictions, risk scores, nutrition plans, supplement guidance, and nutritionist workflows.
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-clinical" size={22} />
              <h3 className="font-semibold text-ink">HR Privacy Controls</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-pulse/10 p-3">
                <p className="text-sm font-semibold text-pulse">HR must never see</p>
                <p className="mt-2 text-xs leading-5 text-graphite">DNA reports, genetic traits, individual biomarkers, or individual health data.</p>
              </div>
              <div className="rounded-lg bg-clinical/10 p-3">
                <p className="text-sm font-semibold text-clinical">HR can see only</p>
                <p className="mt-2 text-xs leading-5 text-graphite">Aggregated population insights such as deficiency, inflammation, and metabolic risk percentages.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-ink/10 p-4">
            <h3 className="font-semibold text-ink">AI Nutrigenomics Agent</h3>
            <div className="mt-4 grid gap-2">
              {[
                "Analyze DNA reports",
                "Analyze biomarkers",
                "Analyze food logs",
                "Analyze wearables",
                "Generate nutrition and supplement recommendations",
                "Explain genetic traits",
                "Create meal plans and weekly nutrition plans"
              ].map((capability) => (
                <p key={capability} className="rounded-lg bg-mist px-3 py-2 text-sm font-semibold text-graphite">{capability}</p>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 p-4">
            <h3 className="font-semibold text-ink">Product Specification Surface</h3>
            <p className="mt-1 text-sm text-graphite">APIs, database tables, and nutritionist integration needed for buildout.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-mist p-3">
                <p className="text-sm font-semibold text-ink">APIs required</p>
                <div className="mt-2 space-y-1 text-xs font-semibold text-graphite">
                  {["/api/genetics/upload", "/api/genetics/traits", "/api/biomarkers/history", "/api/nutrigenomics/recommendations", "/api/nutritionist/plans"].map((api) => (
                    <p key={api}>{api}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-mist p-3">
                <p className="text-sm font-semibold text-ink">Database tables</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {dataTables.map((table) => (
                    <span key={table} className="rounded bg-white px-2 py-1 text-xs font-semibold text-graphite">{table}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export function WearableConnectCard() {
  return (
    <section id="wearables" className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">Connect Wearables</h2>
      <div className="mt-5 grid gap-3">
        {["Apple Watch", "Fitbit", "Oura Ring", "Garmin", "Google Fit"].map((device, index) => (
          <div key={device} className="flex items-center justify-between rounded-lg bg-mist p-3">
            <div className="flex items-center gap-3">
              <Watch className="text-clinical" size={18} />
              <p className="font-semibold text-ink">{device}</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-graphite">{index === 0 ? "Synced 2 hrs ago" : "Connect"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HealthTimeline() {
  return (
    <section className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">Health Timeline</h2>
      <div className="mt-5 space-y-4">
        {timeline.map((event) => (
          <div key={`${event.date}-${event.title}`} className="flex gap-3">
            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-clinical">
              {event.type === "Report Upload" ? <FileText size={17} /> : <Calendar size={17} />}
            </span>
            <div>
              <p className="text-xs font-semibold text-graphite">{event.date} · {event.type}</p>
              <p className="font-semibold text-ink">{event.title}</p>
              <p className="text-sm text-graphite">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
