"use client";

import { useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as d3 from "d3";
import {
  Activity,
  Brain,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  HeartPulse,
  Loader2,
  MessageSquareText,
  Moon,
  Send,
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
import { OrganId, OrganScore, UploadStep } from "./types";

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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/86 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Good Morning, {employeeProfile.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-graphite">Here is your preventive health overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">Switch Portal</a>
          <div className="hidden text-right sm:block">
            <p className="font-semibold text-ink">{employeeProfile.name}</p>
            <p className="text-xs text-graphite">Employee ID: {employeeProfile.employeeId}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function EmployeeSidebar() {
  const items = ["Dashboard", "Health Twin", "Reports", "Upload Data", "Wearables", "Health Copilot", "Goals & Plans", "Medications", "Appointments", "Family Health", "Rewards", "Settings"];
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-ink/10 bg-white p-5 xl:block">
      <a href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ion text-white">
          <Brain size={22} />
        </span>
        <div>
          <p className="text-lg font-semibold text-ink">NeuroMirror</p>
          <p className="text-xs text-graphite">Your Personal Health Digital Twin</p>
        </div>
      </a>
      <nav className="mt-10 space-y-2">
        {items.map((item, index) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${index === 0 ? "bg-ion text-white" : "text-graphite hover:bg-mist hover:text-ink"}`}>
            {index === 0 ? <Activity size={18} /> : <ChevronRight size={17} />}
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-10 rounded-lg bg-mist p-5">
        <p className="text-sm font-semibold text-ink">Health Score</p>
        <div className="mt-5 grid h-32 place-items-center rounded-full border-[12px] border-clinical text-center">
          <div>
            <p className="text-4xl font-semibold text-ink">{employeeProfile.overallScore}</p>
            <p className="text-xs text-graphite">/100</p>
          </div>
        </div>
        <p className="mt-4 text-center font-semibold text-clinical">{employeeProfile.category}</p>
        <p className="mt-2 text-center text-xs text-graphite">{employeeProfile.trend}</p>
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
  const prompts = ["Explain my HbA1c", "Why is my liver score low?", "Generate doctor summary", "Prepare diet plan"];
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
        <div className="rounded-lg bg-mist p-4 text-sm leading-6 text-ink">
          Hi Rohit. Your liver enzymes are slightly elevated. This can indicate fatty liver risk. Main reasons could be high processed food intake, low physical activity, and poor sleep quality.
        </div>
        <div className="ml-auto w-fit max-w-[84%] rounded-lg bg-ion p-4 text-sm leading-6 text-white">
          Can you explain my liver report?
        </div>
        <div className="rounded-lg bg-mist p-4 text-sm leading-6 text-ink">
          Recommendation: reduce sugar and refined carbs, walk 30 minutes daily, hydrate well, and improve sleep to 7-8 hours.
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button key={prompt} onClick={() => setMessage(prompt)} className="rounded-full border border-ion/20 px-3 py-2 text-xs font-semibold text-ion">
            {prompt}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2 rounded-lg border border-ink/10 bg-white p-2">
        <input value={message} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 px-2 text-sm text-ink" placeholder="Ask me anything about your health..." />
        <button className="grid h-9 w-9 place-items-center rounded-lg bg-ion text-white" aria-label="Send message">
          <Send size={17} />
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
  return (
    <section className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-ink">Biomarkers</h2>
        <a href="#biomarkers" className="text-sm font-semibold text-ion">View All</a>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {biomarkers.map((biomarker) => (
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
  const current = uploadSteps[activeStep];
  const loading = activeStep > 0 && activeStep < uploadSteps.length - 1;
  return (
    <section id="upload-data" className={`${card} p-5`}>
      <h2 className="text-2xl font-semibold text-ink">Upload Reports</h2>
      <p className="mt-2 text-sm text-graphite">Supported: PDF, JPG, PNG, lab reports, health checkups, prescriptions, ECG, MRI, CT scan.</p>
      <div className="mt-5 rounded-lg border-2 border-dashed border-ion/30 bg-mist p-6 text-center">
        <UploadCloud className="mx-auto text-ion" size={42} />
        <p className="mt-3 font-semibold text-ink">Drag and drop your files here</p>
        <button onClick={() => setActiveStep((step) => (step + 1) % uploadSteps.length)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-ion px-5 py-3 font-semibold text-white">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />} {current}
        </button>
      </div>
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
