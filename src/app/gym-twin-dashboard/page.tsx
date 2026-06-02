"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Activity,
  Apple,
  Award,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  HeartPulse,
  MessageSquareText,
  Moon,
  Play,
  Plus,
  Send,
  ShieldCheck,
  Trophy,
  Watch
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

const memberAvatar = "https://api.dicebear.com/10.x/avataaars/svg?seed=Arjun&backgroundColor=b6e3f4";

const topMetrics = [
  { label: "Overall Fitness Score", value: "87/100", detail: "Excellent", icon: Activity, color: "#22c55e" },
  { label: "Body Fat %", value: "14.2%", detail: "-1.3%", icon: Flame, color: "#0f766e" },
  { label: "Muscle Mass", value: "68.5 kg", detail: "+2.1 kg", icon: Dumbbell, color: "#f59e0b" },
  { label: "Weight", value: "78.6 kg", detail: "-0.8 kg", icon: Watch, color: "#2563eb" },
  { label: "Strength Score", value: "86/100", detail: "Excellent", icon: Trophy, color: "#6d5dfc" },
  { label: "Recovery Score", value: "82/100", detail: "Good", icon: ShieldCheck, color: "#16a34a" },
  { label: "Calories Today", value: "1,842 kcal", detail: "On Track", icon: Flame, color: "#ef4444" }
];

const muscleGroups = [
  { name: "Chest", score: 88, growth: "+6.2%", strength: "+12kg Bench", recovery: "Good", rec: "Increase incline volume.", color: "#6d5dfc", pos: [-0.2, 1.05, 0.17] as [number, number, number] },
  { name: "Back", score: 87, growth: "+5.8%", strength: "+8kg Row", recovery: "Good", rec: "Add slow eccentric rows.", color: "#2563eb", pos: [0.24, 1.03, 0.05] as [number, number, number] },
  { name: "Shoulders", score: 84, growth: "+4.1%", strength: "+5kg OHP", recovery: "Good", rec: "Add rear delt volume.", color: "#8b5cf6", pos: [0.48, 1.18, 0.06] as [number, number, number] },
  { name: "Biceps", score: 86, growth: "+3.2%", strength: "+4kg Curl", recovery: "Excellent", rec: "Maintain weekly volume.", color: "#0ea5e9", pos: [-0.62, 0.75, 0.08] as [number, number, number] },
  { name: "Core", score: 90, growth: "+7.0%", strength: "+25s Plank", recovery: "Excellent", rec: "Progress anti-rotation work.", color: "#f97316", pos: [0, 0.48, 0.18] as [number, number, number] },
  { name: "Glutes", score: 82, growth: "+3.4%", strength: "+9kg Hip Thrust", recovery: "Good", rec: "Add hip hinge volume.", color: "#db2777", pos: [0, 0.05, 0.08] as [number, number, number] },
  { name: "Quads", score: 85, growth: "+4.9%", strength: "+15kg Squat", recovery: "Good", rec: "Keep progressive overload.", color: "#22c55e", pos: [-0.22, -0.48, 0.09] as [number, number, number] },
  { name: "Calves", score: 80, growth: "+2.5%", strength: "+6kg Raise", recovery: "Good", rec: "Train full ROM twice weekly.", color: "#14b8a6", pos: [0.24, -1.1, 0.09] as [number, number, number] }
];

const bodyComp = [
  { name: "Muscle Mass", value: 68.5, color: "#6d5dfc" },
  { name: "Fat Mass", value: 11.2, color: "#22c55e" },
  { name: "Bone Mass", value: 3.1, color: "#f97316" },
  { name: "Water", value: 55.8, color: "#2563eb" }
];

const fatTrend = [
  { date: "Apr 15", fat: 17.5 },
  { date: "Apr 30", fat: 16.6 },
  { date: "May 15", fat: 15.8 },
  { date: "May 30", fat: 14.9 },
  { date: "Jun 15", fat: 14.2 }
];

const performance = [
  { name: "Bench Press", value: 82.5, unit: "kg", delta: "+5.0kg", data: [70, 74, 78, 76, 81, 82.5] },
  { name: "Squat", value: 105, unit: "kg", delta: "+7.5kg", data: [88, 94, 98, 96, 102, 105] },
  { name: "Deadlift", value: 130, unit: "kg", delta: "+10kg", data: [110, 118, 121, 125, 128, 130] },
  { name: "Pull Ups", value: 12, unit: "reps", delta: "+2 reps", data: [7, 8, 9, 9, 11, 12] },
  { name: "VO2 Max", value: 52, unit: "ml/kg/min", delta: "Excellent", data: [46, 48, 49, 50, 51, 52] },
  { name: "Running 5K", value: 24.3, unit: "min", delta: "-1.15 min", data: [28, 27, 26.5, 25.8, 25.1, 24.3] }
];

const workouts = ["Bench Press", "Incline Dumbbell Press", "Shoulder Press", "Cable Fly", "Tricep Pushdown"];
const nutritionMacros = [
  { name: "Protein", value: 152, color: "#ef4444" },
  { name: "Carbs", value: 198, color: "#2563eb" },
  { name: "Fats", value: 68, color: "#22c55e" }
];
const recovery = [
  { name: "Deep Sleep", value: 130, color: "#1d4ed8" },
  { name: "Light Sleep", value: 265, color: "#6d5dfc" },
  { name: "REM Sleep", value: 70, color: "#a78bfa" },
  { name: "Awake", value: 20, color: "#ef4444" }
];

function MuscleOrb({ muscle, selected, onClick }: { muscle: (typeof muscleGroups)[number]; selected: boolean; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.5 + muscle.score) * (selected ? 0.08 : 0.035);
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} position={muscle.pos} onClick={onClick}>
      <sphereGeometry args={[muscle.name === "Chest" ? 0.2 : 0.16, 32, 32]} />
      <meshStandardMaterial color={muscle.color} emissive={muscle.color} emissiveIntensity={selected ? 0.55 : 0.18} transparent opacity={0.86} />
    </mesh>
  );
}

function GymTwinBody({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.32) * 0.18;
  });
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.48, 0]} scale={[0.62, 1.08, 0.38]}>
        <capsuleGeometry args={[0.8, 2.25, 22, 40]} />
        <meshPhysicalMaterial color="#f3f8f7" roughness={0.28} transmission={0.16} transparent opacity={0.58} clearcoat={0.7} />
      </mesh>
      <mesh position={[0, 1.95, 0]} scale={[0.72, 0.84, 0.68]}>
        <sphereGeometry args={[0.42, 44, 44]} />
        <meshPhysicalMaterial color="#eef8ff" roughness={0.34} transparent opacity={0.65} />
      </mesh>
      <mesh position={[-0.74, 0.58, 0]} rotation={[0, 0, -0.18]} scale={[0.16, 0.8, 0.16]}>
        <capsuleGeometry args={[0.4, 1.1, 18, 28]} />
        <meshPhysicalMaterial color="#eef8f6" transparent opacity={0.48} />
      </mesh>
      <mesh position={[0.74, 0.58, 0]} rotation={[0, 0, 0.18]} scale={[0.16, 0.8, 0.16]}>
        <capsuleGeometry args={[0.4, 1.1, 18, 28]} />
        <meshPhysicalMaterial color="#eef8f6" transparent opacity={0.48} />
      </mesh>
      {muscleGroups.map((muscle) => (
        <MuscleOrb key={muscle.name} muscle={muscle} selected={selected === muscle.name} onClick={() => setSelected(muscle.name)} />
      ))}
    </group>
  );
}

function GymTwinScene({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  return (
    <Canvas camera={{ position: [0, 1.1, 5.8], fov: 38 }} dpr={[1, 2]}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} />
      <GymTwinBody selected={selected} setSelected={setSelected} />
      <OrbitControls enablePan={false} minDistance={3.8} maxDistance={8} />
    </Canvas>
  );
}

function Sidebar() {
  const items = ["Dashboard", "My Twin", "Body Composition", "Workouts", "Nutrition", "Progress Photos", "Performance", "Recovery & Sleep", "Heart & Health", "Goals", "Reports", "Coaching", "AI Copilot", "Settings"];
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-ink/10 bg-white p-5 xl:block">
      <a href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ion text-white"><Dumbbell size={22} /></span>
        <div><p className="text-lg font-semibold text-ink">NeuroMirror</p><p className="text-xs text-graphite">Gym Digital Twin</p></div>
      </a>
      <nav className="mt-10 space-y-2">
        {items.map((item, index) => (
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${index === 0 ? "bg-[#5b35f5] text-white" : "text-graphite hover:bg-mist hover:text-ink"}`}>
            {index === 0 ? <Activity size={18} /> : <ChevronRight size={17} />}
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-10 rounded-lg bg-mist p-5 text-center">
        <p className="text-sm font-semibold text-ink">Current Streak</p>
        <Flame className="mx-auto mt-5 text-pulse" size={36} />
        <p className="mt-2 text-4xl font-semibold text-ink">12</p>
        <p className="text-sm font-semibold text-graphite">Days</p>
      </div>
    </aside>
  );
}

function TopMetrics() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
      {topMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article key={metric.label} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg" style={{ color: metric.color, backgroundColor: `${metric.color}14` }}><Icon size={20} /></span>
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

function DigitalTwinViewer() {
  const [selected, setSelected] = useState("Chest");
  const active = muscleGroups.find((muscle) => muscle.name === selected) ?? muscleGroups[0];
  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[#5b35f5]">My Digital Twin</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">Muscle Group Analysis</h2>
        </div>
        <p className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-graphite">Rotate + Zoom</p>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.42fr_1fr_0.42fr]">
        <div className="grid gap-3">{muscleGroups.slice(0, 4).map((muscle) => <MuscleCard key={muscle.name} muscle={muscle} active={selected === muscle.name} setSelected={setSelected} />)}</div>
        <div className="h-[500px] rounded-lg bg-gradient-to-b from-white to-mist"><GymTwinScene selected={selected} setSelected={setSelected} /></div>
        <div className="grid gap-3">
          {muscleGroups.slice(4).map((muscle) => <MuscleCard key={muscle.name} muscle={muscle} active={selected === muscle.name} setSelected={setSelected} />)}
          <div className="rounded-lg bg-mist p-4">
            <p className="font-semibold text-ink">{active.name} AI Suggestion</p>
            <p className="mt-2 text-sm text-graphite">{active.rec}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MuscleCard({ muscle, active, setSelected }: { muscle: (typeof muscleGroups)[number]; active: boolean; setSelected: (name: string) => void }) {
  return (
    <button onClick={() => setSelected(muscle.name)} className={`rounded-lg border p-3 text-left shadow-hairline transition ${active ? "border-[#5b35f5] bg-[#5b35f5]/10" : "border-ink/10 bg-white hover:border-[#5b35f5]/40"}`}>
      <div className="flex justify-between gap-3"><p className="font-semibold text-ink">{muscle.name}</p><span className="h-3 w-3 rounded-full" style={{ backgroundColor: muscle.color }} /></div>
      <p className="mt-1 text-xs text-graphite">Score: {muscle.score}</p>
      <p className="text-xs font-semibold text-clinical">{muscle.recovery}</p>
    </button>
  );
}

function BodyCompositionCard() {
  return (
    <section id="body-composition" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <div className="flex justify-between"><h2 className="text-2xl font-semibold text-ink">Body Composition</h2><a className="text-sm font-semibold text-ion">View Details</a></div>
      <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
        <div className="h-52"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={bodyComp} innerRadius={62} outerRadius={84} paddingAngle={4} dataKey="value">{bodyComp.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="space-y-3">
          {bodyComp.map((item) => <div key={item.name} className="flex justify-between rounded-lg bg-mist p-3"><span className="font-semibold text-ink">{item.name}</span><span className="font-semibold text-graphite">{item.value}</span></div>)}
        </div>
      </div>
      <div className="mt-5 h-44"><ResponsiveContainer width="100%" height="100%"><LineChart data={fatTrend}><CartesianGrid stroke="#e5ecea" vertical={false} /><XAxis dataKey="date" stroke="#647176" /><YAxis stroke="#647176" /><Tooltip /><Line type="monotone" dataKey="fat" stroke="#16a34a" strokeWidth={3} /></LineChart></ResponsiveContainer></div>
    </section>
  );
}

function AIFitnessCopilot() {
  return (
    <section id="ai-copilot" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-ink"><MessageSquareText className="text-[#5b35f5]" size={20} /> AI Fitness Copilot</h2>
      <div className="mt-5 space-y-4">
        <div className="ml-auto max-w-[85%] rounded-lg bg-[#5b35f5] p-4 text-sm text-white">How can I reduce body fat and build muscle faster?</div>
        <div className="rounded-lg bg-mist p-4 text-sm leading-6 text-ink">
          Based on your data: maintain a 300-400 calorie deficit, increase protein to 160-180g/day, focus progressive overload, sleep 7-8 hours, and drink 3.5L water daily.
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {["Analyze last workout", "Why is weight not reducing?", "Best supplements?", "Create meal plan"].map((item) => <button key={item} className="rounded-lg border border-ink/10 px-3 py-2 text-xs font-semibold text-graphite">{item}</button>)}
      </div>
      <div className="mt-4 flex gap-2 rounded-lg border border-ink/10 p-2"><input className="min-w-0 flex-1 px-2 text-sm" placeholder="Ask anything about your fitness..." /><button className="grid h-9 w-9 place-items-center rounded-lg bg-[#5b35f5] text-white"><Send size={17} /></button></div>
    </section>
  );
}

function WorkoutAndPerformance() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <section id="workouts" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Today's Workout Plan</h2>
        <div className="mt-4 space-y-2">{workouts.map((item) => <p key={item} className="flex justify-between rounded-lg bg-mist p-3 text-sm font-semibold text-ink"><span>{item}</span><span className="text-graphite">4 x 10 reps</span></p>)}</div>
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5b35f5] px-4 py-3 font-semibold text-white"><Play size={17} /> Start Workout</button>
      </section>
      <section id="performance" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <div className="flex justify-between"><h2 className="text-xl font-semibold text-ink">Performance Overview</h2><a className="text-sm font-semibold text-ion">View All</a></div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {performance.map((metric) => (
            <article key={metric.name} className="rounded-lg border border-ink/10 p-4">
              <p className="text-sm font-semibold text-graphite">{metric.name}</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{metric.value} <span className="text-sm">{metric.unit}</span></p>
              <p className="text-xs font-semibold text-clinical">{metric.delta}</p>
              <div className="mt-2 h-12"><ResponsiveContainer width="100%" height="100%"><LineChart data={metric.data.map((value, index) => ({ index, value }))}><Line type="monotone" dataKey="value" stroke="#5b35f5" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function RecoveryNutritionProgress() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <section id="nutrition" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Nutrition Summary</h2>
        <p className="mt-4 text-3xl font-semibold text-ink">1,842 <span className="text-sm text-graphite">/2,400 kcal</span></p>
        <div className="mt-4 h-36"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={nutritionMacros} innerRadius={42} outerRadius={62} dataKey="value">{nutritionMacros.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </section>
      <section id="recovery-and-sleep" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Recovery & Sleep</h2>
        <div className="mt-4 grid grid-cols-[130px_1fr] gap-4">
          <div className="h-32"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={recovery} innerRadius={42} outerRadius={62} dataKey="value">{recovery.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <div><p className="text-3xl font-semibold text-ink">7h 45m</p><p className="font-semibold text-clinical">Score 82 · Good</p><p className="mt-3 text-sm text-graphite">HRV 72ms · Resting HR 52bpm</p></div>
        </div>
      </section>
      <section id="progress-photos" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Progress Photos</h2>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {["Front", "Side", "Back", "Compare"].map((label) => <div key={label} className="grid aspect-[3/4] place-items-center rounded-lg bg-mist text-xs font-semibold text-graphite">{label}</div>)}
        </div>
      </section>
    </div>
  );
}

function AchievementsDevices() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section id="goals" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Achievements</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {["Consistent Warrior", "Strength Builder", "Early Bird", "Nutrition Pro"].map((item) => <p key={item} className="flex items-center gap-3 rounded-lg bg-mist p-3 font-semibold text-ink"><Award className="text-amber" size={18} /> {item}</p>)}
        </div>
      </section>
      <section id="wearables" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
        <h2 className="text-xl font-semibold text-ink">Connected Devices</h2>
        <div className="mt-5 space-y-3">{["Apple Watch", "InBody Scale", "Polar H10", "Nike Run Club"].map((item) => <p key={item} className="flex items-center justify-between rounded-lg bg-mist p-3 font-semibold text-ink"><span className="flex items-center gap-2"><Watch size={17} /> {item}</span><span className="text-xs text-clinical">Connected</span></p>)}</div>
      </section>
    </div>
  );
}

export default function GymTwinDashboardPage() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/86 px-4 py-4 backdrop-blur-xl lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><h1 className="text-3xl font-semibold text-ink">Good Morning, Arjun!</h1><p className="mt-1 text-sm text-graphite">Ready to crush your goals today?</p></div>
              <div className="flex items-center gap-3"><button className="inline-flex items-center gap-2 rounded-lg bg-[#5b35f5] px-4 py-3 font-semibold text-white"><Plus size={17} /> Log Workout</button><Bell className="text-ink" size={20} /><img src={memberAvatar} alt="Gym member avatar" className="h-11 w-11 rounded-full bg-white" /></div>
            </div>
          </header>
          <div className="grid gap-5 p-4 lg:p-6 2xl:grid-cols-[1fr_420px]">
            <div className="space-y-5">
              <TopMetrics />
              <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]"><DigitalTwinViewer /><BodyCompositionCard /></div>
              <WorkoutAndPerformance />
              <RecoveryNutritionProgress />
              <AchievementsDevices />
            </div>
            <AIFitnessCopilot />
          </div>
        </div>
      </div>
    </main>
  );
}
