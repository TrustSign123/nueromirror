"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Activity,
  Apple,
  Bell,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  Dumbbell,
  FileText,
  HeartPulse,
  Moon,
  Shield,
  Smile,
  Star,
  Stethoscope,
  Syringe,
  UploadCloud,
  Waves
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type * as THREE from "three";

const childAvatar = "https://api.dicebear.com/10.x/adventurer/svg?seed=Aarav&backgroundColor=b6e3f4";

const topMetrics = [
  { label: "Overall Health Score", value: "85/100", detail: "Good", icon: HeartPulse, color: "#16a34a" },
  { label: "Growth Percentile", value: "72nd", detail: "Height for age", icon: Activity, color: "#7c3aed" },
  { label: "Weight Percentile", value: "68th", detail: "Weight for age", icon: Apple, color: "#f97316" },
  { label: "BMI", value: "18.4", detail: "Healthy", icon: Waves, color: "#22c55e" },
  { label: "Sleep Last Night", value: "8h 45m", detail: "Good", icon: Moon, color: "#4f46e5" },
  { label: "Steps Today", value: "7,842", detail: "Active", icon: Activity, color: "#0f766e" }
];

const bodySystems = [
  { name: "Brain", score: 86, trend: "+4", risk: "Good", rec: "Keep reading and outdoor play.", color: "#2563eb", pos: [-0.55, 1.8, 0.1] as [number, number, number] },
  { name: "Eyes", score: 78, trend: "Stable", risk: "Watch", rec: "Reduce screen time before bed.", color: "#38bdf8", pos: [0.55, 1.78, 0.1] as [number, number, number] },
  { name: "Heart", score: 88, trend: "+5", risk: "Good", rec: "Continue sports practice.", color: "#ef4444", pos: [0, 0.92, 0.14] as [number, number, number] },
  { name: "Lungs", score: 92, trend: "+3", risk: "Excellent", rec: "Maintain daily activity.", color: "#0ea5e9", pos: [-0.38, 0.95, 0.12] as [number, number, number] },
  { name: "Bones", score: 74, trend: "+2", risk: "Needs calcium", rec: "Increase calcium and vitamin D.", color: "#f59e0b", pos: [0.45, 0.12, 0.1] as [number, number, number] },
  { name: "Immunity", score: 82, trend: "+6", risk: "Good", rec: "Vaccination schedule on track.", color: "#22c55e", pos: [-0.5, 0.16, 0.1] as [number, number, number] },
  { name: "Nutrition", score: 86, trend: "+4", risk: "Good", rec: "Add fruits and protein.", color: "#f97316", pos: [0, 0.42, 0.16] as [number, number, number] },
  { name: "Sleep", score: 88, trend: "+8", risk: "Good", rec: "Keep sleep routine stable.", color: "#6d5dfc", pos: [0.48, 1.43, 0.1] as [number, number, number] },
  { name: "Mental Wellness", score: 82, trend: "+3", risk: "Good", rec: "Confidence and social engagement strong.", color: "#db2777", pos: [-0.48, 1.43, 0.1] as [number, number, number] }
];

const growthData = [
  { age: "Age 6", height: 92, weight: 22 },
  { age: "Age 7", height: 104, weight: 25 },
  { age: "Age 8", height: 118, weight: 28 },
  { age: "Age 9", height: 126, weight: 31 },
  { age: "Age 10", height: 135, weight: 34 }
];

const wellnessData = [
  { name: "Physical", value: 88, color: "#22c55e" },
  { name: "Mental", value: 82, color: "#2563eb" },
  { name: "Social", value: 84, color: "#7c3aed" },
  { name: "Nutrition", value: 86, color: "#f59e0b" }
];

const sportsData = [
  { day: "Mon", activity: 6200 },
  { day: "Tue", activity: 8900 },
  { day: "Wed", activity: 7400 },
  { day: "Thu", activity: 6100 },
  { day: "Fri", activity: 8100 },
  { day: "Sat", activity: 9800 },
  { day: "Sun", activity: 6500 }
];

const timeline = [
  { date: "10 May", title: "Blood Test", detail: "All normal", icon: FileText },
  { date: "01 May", title: "Football Match", detail: "School tournament", icon: Dumbbell },
  { date: "20 Apr", title: "Fever", detail: "Recovered", icon: Stethoscope },
  { date: "15 Apr", title: "Dental Checkup", detail: "No cavities", icon: Smile },
  { date: "01 Apr", title: "Health Checkup", detail: "All good", icon: HeartPulse }
];

const alerts = [
  { title: "Mild Vitamin D Deficiency", detail: "Recommended sunlight exposure", icon: Shield },
  { title: "Posture Check", detail: "Slight forward head posture detected", icon: Activity },
  { title: "Vaccination Due", detail: "Annual flu vaccine reminder", icon: Syringe }
];

function PulsingOrgan({ system, selected, onClick }: { system: (typeof bodySystems)[number]; selected: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 4 + system.score) * (selected ? 0.09 : 0.045);
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={system.pos} onClick={onClick}>
      <sphereGeometry args={[system.name === "Lungs" ? 0.18 : 0.14, 32, 32]} />
      <meshStandardMaterial color={system.color} emissive={system.color} emissiveIntensity={selected ? 0.55 : 0.2} transparent opacity={0.86} />
    </mesh>
  );
}

function KidTwinBody({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.48, 0]} scale={[0.55, 0.92, 0.34]}>
        <capsuleGeometry args={[0.82, 1.85, 20, 36]} />
        <meshPhysicalMaterial color="#edf9ff" roughness={0.32} transmission={0.22} transparent opacity={0.62} clearcoat={0.6} />
      </mesh>
      <mesh position={[0, 1.86, 0]} scale={[0.78, 0.9, 0.72]}>
        <sphereGeometry args={[0.42, 44, 44]} />
        <meshPhysicalMaterial color="#eef8ff" roughness={0.34} transparent opacity={0.66} />
      </mesh>
      <mesh position={[0, 0.55, 0.08]}>
        <cylinderGeometry args={[0.025, 0.025, 1.95, 18]} />
        <meshStandardMaterial color="#9ecad6" transparent opacity={0.6} />
      </mesh>
      {bodySystems.map((system) => (
        <PulsingOrgan key={system.name} system={system} selected={selected === system.name} onClick={() => setSelected(system.name)} />
      ))}
    </group>
  );
}

function KidTwinScene({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  return (
    <Canvas camera={{ position: [0, 1.2, 5.7], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 4, 4]} intensity={2.4} />
      <KidTwinBody selected={selected} setSelected={setSelected} />
      <OrbitControls enablePan={false} minDistance={3.9} maxDistance={8} />
    </Canvas>
  );
}

function MetricCards() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
      {topMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg" style={{ backgroundColor: `${metric.color}14`, color: metric.color }}>
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-graphite">{metric.label}</p>
                <p className="text-xl font-semibold text-ink">{metric.value}</p>
                <p className="text-xs font-semibold text-clinical">{metric.detail}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Sidebar() {
  const items = ["Dashboard", "Health Overview", "Growth & Development", "Medical Records", "Vaccinations", "Nutrition", "Mental Wellness", "School Health", "Sports & Fitness", "Sleep", "Achievements", "Settings"];
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-ink/10 bg-white p-5 xl:block">
      <a href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ion text-white">
          <Brain size={22} />
        </span>
        <div>
          <p className="text-lg font-semibold text-ink">NeuroMirror</p>
          <p className="text-xs text-graphite">Kids Health + Happy Future</p>
        </div>
      </a>
      <div className="mt-8 flex items-center gap-4 rounded-lg bg-mist p-4">
        <img src={childAvatar} alt="Open-source child avatar for Aarav Sharma" className="h-16 w-16 rounded-full bg-white object-cover" />
        <div>
          <p className="text-lg font-semibold text-ink">Aarav Sharma</p>
          <p className="text-sm text-graphite">Age 10 · Class 5</p>
        </div>
      </div>
      <nav className="mt-8 space-y-2">
        {items.map((item, index) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${index === 0 ? "bg-ion text-white" : "text-graphite hover:bg-mist hover:text-ink"}`}>
            {index === 0 ? <Activity size={18} /> : <ChevronRight size={17} />}
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-8 rounded-lg bg-mist p-5 text-center">
        <p className="text-sm font-semibold text-ink">Health Score</p>
        <div className="mx-auto mt-4 grid h-32 w-32 place-items-center rounded-full border-[12px] border-clinical bg-white">
          <div>
            <p className="text-4xl font-semibold text-ink">85</p>
            <p className="text-xs text-graphite">/100</p>
          </div>
        </div>
        <p className="mt-3 font-semibold text-clinical">Good</p>
        <p className="mt-2 text-xs text-graphite">+12 points from last month</p>
      </div>
      <p className="mt-4 text-center text-[10px] text-graphite">Avatar: DiceBear Adventurer, CC BY 4.0</p>
    </aside>
  );
}

function HealthTwinCard() {
  const [selected, setSelected] = useState("Heart");
  const active = bodySystems.find((system) => system.name === selected) ?? bodySystems[2];

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Health Overview</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">Real-time Kids Digital Twin</h2>
          <p className="mt-2 text-sm text-graphite">Rotate, zoom, and click body systems to see score, trend, risk, and recommendation.</p>
        </div>
        <div className="rounded-lg bg-mist px-4 py-3">
          <p className="text-xs font-semibold text-graphite">Selected</p>
          <p className="font-semibold text-ink">{active.name}: {active.score}/100</p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.42fr_1fr_0.42fr]">
        <div className="grid gap-3">
          {bodySystems.slice(0, 5).map((system) => <BodySystemCard key={system.name} system={system} selected={selected === system.name} setSelected={setSelected} />)}
        </div>
        <div className="h-[500px] rounded-lg bg-gradient-to-b from-white to-mist">
          <KidTwinScene selected={selected} setSelected={setSelected} />
        </div>
        <div className="grid gap-3">
          {bodySystems.slice(5).map((system) => <BodySystemCard key={system.name} system={system} selected={selected === system.name} setSelected={setSelected} />)}
          <div className="rounded-lg bg-mist p-4">
            <p className="text-sm font-semibold text-ink">{active.name} Recommendation</p>
            <p className="mt-2 text-sm leading-6 text-graphite">{active.rec}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BodySystemCard({ system, selected, setSelected }: { system: (typeof bodySystems)[number]; selected: boolean; setSelected: (name: string) => void }) {
  return (
    <button onClick={() => setSelected(system.name)} className={`rounded-lg border p-3 text-left shadow-hairline transition ${selected ? "border-clinical bg-clinical/10" : "border-ink/10 bg-white hover:border-clinical/40"}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{system.name}</p>
          <p className="text-xs text-graphite">Score: {system.score}</p>
        </div>
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: system.color }} />
      </div>
      <p className={`mt-1 text-xs font-semibold ${system.risk === "Needs calcium" || system.risk === "Watch" ? "text-amber" : "text-clinical"}`}>{system.risk}</p>
    </button>
  );
}

function GrowthDashboard() {
  return (
    <section id="growth-and-development" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <h2 className="text-2xl font-semibold text-ink">Growth & Development</h2>
      <p className="mt-2 text-sm text-graphite">WHO and CDC-style growth tracking with prediction signals.</p>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData}>
            <CartesianGrid stroke="#e5ecea" vertical={false} />
            <XAxis dataKey="age" stroke="#647176" />
            <YAxis stroke="#647176" />
            <Tooltip />
            <Line type="monotone" dataKey="height" stroke="#7c3aed" strokeWidth={3} />
            <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Puberty Stage", "Stage 1", "Normal"],
          ["Growth Velocity", "6.2 cm/year", "On Track"],
          ["Adult Height Prediction", "171-176 cm", "Healthy range"]
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-lg bg-mist p-4">
            <p className="text-xs font-semibold uppercase text-graphite">{label}</p>
            <p className="mt-2 text-xl font-semibold text-ink">{value}</p>
            <p className="text-xs font-semibold text-clinical">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WellnessAtGlance() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <h2 className="text-2xl font-semibold text-ink">Wellness at a Glance</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={wellnessData} innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value">
                {wellnessData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {wellnessData.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg bg-mist p-3">
              <span className="flex items-center gap-2 font-semibold text-ink"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
              <span className="text-sm font-semibold text-clinical">{item.value}/100</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NutritionMentalSports() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <section id="nutrition" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Nutrition</h2>
        <div className="mt-5 grid grid-cols-[120px_1fr] gap-4">
          <div className="grid h-28 place-items-center rounded-full border-[12px] border-clinical bg-mist text-center">
            <div><p className="text-3xl font-semibold">82</p><p className="text-xs text-clinical">Good</p></div>
          </div>
          <div className="space-y-2 text-sm">
            {["Fruits", "Vegetables", "Protein", "Calcium", "Water Intake"].map((item) => <p key={item} className="rounded bg-mist px-3 py-2 font-semibold text-ink">{item}</p>)}
          </div>
        </div>
      </section>

      <section id="mental-wellness" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Mental Wellness</h2>
        <p className="mt-3 text-sm text-graphite">How are you feeling today?</p>
        <div className="mt-4 flex justify-between gap-2">
          {["Happy", "Okay", "Stressed", "Sad", "Angry"].map((mood, index) => (
            <button key={mood} className={`rounded-lg px-3 py-3 text-sm font-semibold ${index === 0 ? "bg-clinical/10 text-clinical" : "bg-mist text-graphite"}`}>
              {mood}
            </button>
          ))}
        </div>
        <div className="mt-5 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[{ d: "M", v: 44 }, { d: "T", v: 50 }, { d: "W", v: 47 }, { d: "T", v: 58 }, { d: "F", v: 72 }]}>
              <Area type="monotone" dataKey="v" stroke="#22c55e" fill="#22c55e22" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section id="sports-and-fitness" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Sports & Fitness</h2>
        <div className="mt-5 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sportsData}>
              <XAxis dataKey="day" stroke="#647176" />
              <YAxis stroke="#647176" />
              <Tooltip />
              <Bar dataKey="activity" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <p className="rounded bg-mist p-2 text-sm font-semibold">Steps<br />7,842</p>
          <p className="rounded bg-mist p-2 text-sm font-semibold">Active<br />68 min</p>
          <p className="rounded bg-mist p-2 text-sm font-semibold">Calories<br />320</p>
        </div>
      </section>
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="space-y-5">
      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-ink"><Bell className="text-amber" size={20} /> Health Alerts</h2>
        <div className="mt-5 space-y-3">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.title} className="flex gap-3 rounded-lg bg-mist p-3">
                <Icon className="text-amber" size={20} />
                <div>
                  <p className="font-semibold text-ink">{alert.title}</p>
                  <p className="text-sm text-graphite">{alert.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ion">AI Health Tips for Aarav</h2>
        <div className="mt-5 space-y-3">
          {["Drink more water", "Increase calcium intake", "Practice deep breathing", "Good job on your sleep"].map((tip) => (
            <p key={tip} className="flex items-center gap-3 rounded-lg bg-mist p-3 text-sm font-semibold text-ink"><Check className="text-clinical" size={17} /> {tip}</p>
          ))}
        </div>
        <button className="mt-5 w-full rounded-full border border-ion/30 px-4 py-3 font-semibold text-ion">Ask AI Health Coach</button>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Upcoming</h2>
        <div className="mt-5 space-y-3">
          {["Annual Health Checkup", "Eye Checkup", "Basketball Practice"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-lg bg-mist p-3 text-sm font-semibold text-ink"><CalendarDays className="text-ion" size={17} /> {item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Child Missions</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {["Water Hero", "Sleep Star", "Calcium Champ", "Sports Goal"].map((item) => (
            <div key={item} className="rounded-lg bg-mist p-3 text-center text-sm font-semibold text-ink">
              <Star className="mx-auto mb-2 text-amber" size={18} /> {item}
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function Timeline() {
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ink">Health Timeline</h2>
        <a href="#timeline" className="text-sm font-semibold text-ion">View Full Timeline</a>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {timeline.map((event) => {
          const Icon = event.icon;
          return (
            <motion.div key={event.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg bg-mist p-4">
              <Icon className="text-ion" size={18} />
              <p className="mt-3 text-xs text-graphite">{event.date}</p>
              <p className="font-semibold text-ink">{event.title}</p>
              <p className="text-sm text-graphite">{event.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default function KidsDashboardPage() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/86 px-4 py-4 backdrop-blur-xl lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-ink">Hello, Aarav!</h1>
                <p className="mt-1 text-sm text-graphite">Here is your health and wellness overview.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full bg-ion/10 px-4 py-2 text-sm font-semibold text-ion">Child View</button>
                <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">Parent View</button>
                <img src="https://api.dicebear.com/10.x/lorelei/svg?seed=Neha&backgroundColor=ffd5dc" alt="Parent avatar" className="h-10 w-10 rounded-full bg-white" />
              </div>
            </div>
          </header>

          <div className="grid gap-5 p-4 lg:p-6 2xl:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <MetricCards />
              <div className="grid gap-5 xl:grid-cols-[1.15fr_0.9fr]">
                <HealthTwinCard />
                <div className="space-y-5">
                  <GrowthDashboard />
                  <WellnessAtGlance />
                </div>
              </div>
              <NutritionMentalSports />
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-ink">Reports, Tests & Vaccinations</h2>
                    <p className="text-sm text-graphite">Blood tests, eye tests, dental records, allergies, vaccinations, and pediatric visits.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-ion px-4 py-3 font-semibold text-white"><UploadCloud size={18} /> Upload Report</button>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  {["Blood Test", "Vitamin D Test", "Dental Checkup", "Vaccination Schedule"].map((item, index) => (
                    <div key={item} className="rounded-lg bg-mist p-4">
                      <p className="font-semibold text-ink">{item}</p>
                      <p className={`mt-2 text-xs font-semibold ${index === 1 ? "text-amber" : "text-clinical"}`}>{index === 1 ? "Low" : "Normal"}</p>
                    </div>
                  ))}
                </div>
              </section>
              <Timeline />
              <p className="text-center text-xs text-graphite">This information is for wellness tracking and awareness only, not a substitute for medical advice.</p>
            </div>
            <RightPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
