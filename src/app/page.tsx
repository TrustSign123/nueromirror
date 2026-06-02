"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  Cloud,
  Database,
  FileText,
  HeartPulse,
  LineChart,
  Loader2,
  LockKeyhole,
  MessageSquareText,
  Play,
  RefreshCw,
  ShieldCheck,
  UploadCloud,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import * as THREE from "three";
import {
  agents,
  apiSurface,
  architectureCards,
  customerSegments,
  alertTypes,
  graphs,
  integrationSources,
  invitationChannels,
  marketplacePartners,
  navItems,
  onboardingSteps,
  organs,
  pages,
  priceTiers,
  rolePermissions,
  tenantStats,
  twinLifecycle,
  wellnessPrograms,
  uploadStates,
  workflow
} from "@/lib/platform-data";
import { useTwinStore } from "@/lib/store";

const queryClient = new QueryClient();

const trendData = [
  { month: "Jan", heart: 61, sleep: 48, stress: 72, metabolism: 58 },
  { month: "Feb", heart: 64, sleep: 52, stress: 69, metabolism: 59 },
  { month: "Mar", heart: 67, sleep: 59, stress: 65, metabolism: 60 },
  { month: "Apr", heart: 70, sleep: 68, stress: 62, metabolism: 62 },
  { month: "May", heart: 72, sleep: 76, stress: 58, metabolism: 64 }
];

const populationData = [
  { name: "Burnout", value: 31, color: "#e2495d" },
  { name: "Diabetes", value: 18, color: "#a26814" },
  { name: "Sleep", value: 44, color: "#2f6fed" },
  { name: "Obesity", value: 29, color: "#0f766e" }
];

const inviteFunnelData = [
  { stage: "Uploaded", users: 500 },
  { stage: "Delivered", users: 472 },
  { stage: "Opened", users: 331 },
  { stage: "Registered", users: 244 },
  { stage: "Reports", users: 176 }
];

const trustedLogos = [
  { name: "Apple", slug: "apple" },
  { name: "Tesla", slug: "tesla" },
  { name: "OpenAI", slug: "openai" },
  { name: "Stripe", slug: "stripe" },
  { name: "Vercel", slug: "vercel" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Garmin", slug: "garmin" },
  { name: "Fitbit", slug: "fitbit" },
  { name: "GitHub", slug: "github" }
];

function HeroOrganOrb({
  organ,
  position,
  scale
}: {
  organ: (typeof organs)[number];
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const setSelectedOrganId = useTwinStore((state) => state.setSelectedOrganId);
  const selectedOrganId = useTwinStore((state) => state.selectedOrganId);
  const meshRef = useRef<THREE.Mesh>(null);
  const selected = selectedOrganId === organ.id;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 4.2 + organ.score) * (selected ? 0.085 : 0.04);
    meshRef.current.scale.set(scale[0] * pulse, scale[1] * pulse, scale[2] * pulse);
  });

  return (
    <mesh ref={meshRef} position={position} onClick={() => setSelectedOrganId(organ.id)}>
      <sphereGeometry args={[1, 40, 40]} />
      <meshStandardMaterial
        color={organ.color}
        emissive={organ.color}
        emissiveIntensity={selected ? 0.58 : 0.2}
        roughness={0.22}
        transparent
        opacity={organ.id === "lungs" ? 0.42 : 0.86}
      />
    </mesh>
  );
}

function HeroDigitalHuman() {
  const groupRef = useRef<THREE.Group>(null);
  const organMap = useMemo(() => new Map(organs.map((organ) => [organ.id, organ])), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.34) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.38, 0]} scale={[0.86, 1, 0.48]}>
        <capsuleGeometry args={[0.96, 2.25, 22, 42]} />
        <meshPhysicalMaterial color="#f0f7ff" roughness={0.28} transmission={0.22} thickness={1.1} transparent opacity={0.62} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, 2.3, 0]} scale={[0.94, 1.06, 0.9]}>
        <sphereGeometry args={[0.48, 48, 48]} />
        <meshPhysicalMaterial color="#eef8ff" roughness={0.3} transmission={0.18} transparent opacity={0.66} />
      </mesh>
      <mesh position={[0, 0.62, 0.08]}>
        <cylinderGeometry args={[0.035, 0.035, 2.25, 18]} />
        <meshStandardMaterial color="#8bb8c8" transparent opacity={0.52} />
      </mesh>
      <HeroOrganOrb organ={organMap.get("heart")!} position={[0, 0.98, 0.16]} scale={[0.22, 0.25, 0.16]} />
      <HeroOrganOrb organ={organMap.get("brain")!} position={[0, 2.39, 0.07]} scale={[0.33, 0.18, 0.23]} />
      <HeroOrganOrb organ={organMap.get("lungs")!} position={[0, 1.16, 0.08]} scale={[0.56, 0.38, 0.11]} />
      <HeroOrganOrb organ={organMap.get("liver")!} position={[0.32, 0.56, 0.12]} scale={[0.34, 0.19, 0.13]} />
      <HeroOrganOrb organ={organMap.get("kidney")!} position={[-0.33, 0.28, 0.11]} scale={[0.16, 0.22, 0.1]} />
      <HeroOrganOrb organ={organMap.get("metabolism")!} position={[0, -0.18, 0.13]} scale={[0.33, 0.18, 0.12]} />
      <HeroOrganOrb organ={organMap.get("sleep")!} position={[-0.42, 1.86, 0.08]} scale={[0.11, 0.11, 0.08]} />
      <HeroOrganOrb organ={organMap.get("stress")!} position={[0.42, 1.86, 0.08]} scale={[0.11, 0.11, 0.08]} />
    </group>
  );
}

function HeroDigitalHumanCanvas() {
  return (
    <Canvas camera={{ position: [0, 1.45, 7.5], fov: 36 }} dpr={[1, 2]}>
      <ambientLight intensity={2.3} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} />
      <pointLight position={[-3, 2, 3]} intensity={1.4} color="#7c3aed" />
      <HeroDigitalHuman />
      <OrbitControls enablePan={false} minDistance={5.4} maxDistance={8.5} />
    </Canvas>
  );
}

function TrustLogoMarquee() {
  const logoLoop = [...trustedLogos, ...trustedLogos];

  return (
    <section className="border-y border-ink/10 bg-white/80 py-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <p className="w-full text-sm font-semibold uppercase tracking-[0.18em] text-graphite md:w-64">
            Inspired by teams building the future
          </p>
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="logo-marquee flex items-center gap-4">
              {logoLoop.map((logo, index) => (
                <div
                  key={`${logo.slug}-${index}`}
                  className="flex h-14 min-w-40 items-center justify-center gap-3 rounded-lg border border-ink/10 bg-white px-5 shadow-hairline"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${logo.slug}/172126`}
                    alt={`${logo.name} logo`}
                    className="h-5 w-5 object-contain"
                  />
                  <span className="text-sm font-semibold text-ink">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeHumanTwin() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { selectedOrganId, setSelectedOrganId } = useTwinStore();

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.45, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const key = new THREE.DirectionalLight("#ffffff", 2.2);
    key.position.set(3, 5, 5);
    scene.add(key);
    scene.add(new THREE.AmbientLight("#dcefed", 2.4));

    const group = new THREE.Group();
    scene.add(group);

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: "#edf6f5",
      roughness: 0.34,
      transmission: 0.32,
      thickness: 1.1,
      transparent: true,
      opacity: 0.58,
      clearcoat: 0.7
    });
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: "#9db8b5",
      roughness: 0.45,
      transparent: true,
      opacity: 0.5
    });

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.95, 2.15, 18, 32), bodyMaterial);
    torso.position.y = 0.4;
    torso.scale.set(0.86, 1, 0.48);
    group.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 48, 48), bodyMaterial);
    head.position.y = 2.25;
    head.scale.set(0.92, 1.05, 0.9);
    group.add(head);

    const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 18), lineMaterial);
    spine.position.set(0, 0.62, 0.08);
    group.add(spine);

    const organMeshes = new Map<string, THREE.Mesh>();
    const organSpecs = [
      ["heart", "#e2495d", [0, 0.95, 0.16], [0.22, 0.25, 0.16]],
      ["brain", "#2f6fed", [0, 2.36, 0.07], [0.33, 0.18, 0.23]],
      ["lungs", "#0f766e", [0, 1.12, 0.08], [0.56, 0.38, 0.11]],
      ["liver", "#a26814", [0.32, 0.55, 0.12], [0.34, 0.19, 0.13]],
      ["kidney", "#6d5dfc", [-0.33, 0.28, 0.11], [0.16, 0.22, 0.1]],
      ["metabolism", "#d97706", [0, -0.16, 0.13], [0.33, 0.18, 0.12]],
      ["sleep", "#5b6ee1", [-0.42, 1.84, 0.08], [0.11, 0.11, 0.08]],
      ["stress", "#db2777", [0.42, 1.84, 0.08], [0.11, 0.11, 0.08]]
    ] as const;

    organSpecs.forEach(([id, color, position, scale]) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 40),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: id === selectedOrganId ? 0.45 : 0.18,
          roughness: 0.24,
          transparent: true,
          opacity: id === "lungs" ? 0.42 : 0.82
        })
      );
      mesh.position.set(position[0], position[1], position[2]);
      mesh.scale.set(scale[0], scale[1], scale[2]);
      mesh.userData.id = id;
      organMeshes.set(id, mesh);
      group.add(mesh);
    });

    const rings = new THREE.Group();
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.28 + i * 0.3, 0.005, 10, 96),
        new THREE.MeshBasicMaterial({ color: "#9dcfca", transparent: true, opacity: 0.33 - i * 0.07 })
      );
      ring.rotation.x = Math.PI / 2.35;
      ring.position.y = 0.65;
      rings.add(ring);
    }
    group.add(rings);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(Array.from(organMeshes.values()))[0];
      if (hit?.object.userData.id) setSelectedOrganId(hit.object.userData.id);
    };

    renderer.domElement.addEventListener("pointerdown", handlePointer);

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.012;
      group.rotation.y = Math.sin(frame) * 0.14;
      rings.rotation.z += 0.003;
      organMeshes.forEach((mesh, id) => {
        const material = mesh.material as THREE.MeshStandardMaterial;
        const selected = id === useTwinStore.getState().selectedOrganId;
        const pulse = 1 + Math.sin(frame * 6 + mesh.position.y) * (selected ? 0.075 : 0.035);
        mesh.scale.multiplyScalar(pulse / (mesh.userData.lastPulse || 1));
        mesh.userData.lastPulse = pulse;
        material.emissiveIntensity = selected ? 0.55 : 0.18;
      });
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = mount.clientWidth;
      const nextHeight = mount.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointer);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [selectedOrganId, setSelectedOrganId]);

  return <div ref={mountRef} aria-label="Interactive 3D human digital twin" className="h-[520px] w-full md:h-[680px]" />;
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 font-semibold text-ink" aria-label="Neuromirror home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">
            <Brain size={18} />
          </span>
          <span>Neuromirror</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navItems.slice(1, 7).map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-graphite transition hover:bg-ink/5 hover:text-ink"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#book-demo"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-hairline transition hover:bg-clinical"
        >
          Book Demo <ArrowRight size={16} />
        </a>
        <a
          href="/login"
          className="hidden items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline transition hover:border-clinical/40 md:inline-flex"
        >
          Admin Dashboard
        </a>
        <a
          href="/employee-health-dashboard"
          className="hidden items-center gap-2 rounded-full bg-clinical px-4 py-2 text-sm font-semibold text-white shadow-hairline transition hover:bg-ink xl:inline-flex"
        >
          Employee Health
        </a>
        <a
          href="/kids-dashboard"
          className="hidden items-center gap-2 rounded-full bg-ion px-4 py-2 text-sm font-semibold text-white shadow-hairline transition hover:bg-ink xl:inline-flex"
        >
          Kids Dashboard
        </a>
        <a
          href="/gym-twin-dashboard"
          className="hidden items-center gap-2 rounded-full bg-[#5b35f5] px-4 py-2 text-sm font-semibold text-white shadow-hairline transition hover:bg-ink xl:inline-flex"
        >
          Gym Twin
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const { selectedOrganId, setSelectedOrganId, simulation, setSimulation } = useTwinStore();
  const selected = organs.find((organ) => organ.id === selectedOrganId) ?? organs[0];
  const projectedRisk = Math.max(6, Math.round(48 - simulation.weightKg * 2.7 - (simulation.sleepHours - 6) * 4 - simulation.exerciseMinutes * 0.08));

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <div className="grid-fade pointer-events-none absolute inset-0" />
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-clinical/20 bg-white/70 px-3 py-1 text-sm font-medium text-clinical shadow-hairline">
            <Activity size={15} /> AI-powered Digital Twin for every human
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Your Digital Twin For Life
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite sm:text-xl">
            One intelligent platform that understands your health, fitness, growth, wellbeing, and future risks.
            Continuously learning. Continuously improving. Powered by AI to improve the health of every person on the
            globe through preventive health.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/employee-health-dashboard" className="inline-flex items-center gap-2 rounded-full bg-clinical px-5 py-3 font-semibold text-white shadow-glass">
              Experience My Twin <ChevronRight size={18} />
            </a>
            <a href="#ai-copilot" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 font-semibold text-ink shadow-hairline">
              Watch Demo <Play size={18} />
            </a>
            <a href="#book-demo" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 font-semibold text-ink shadow-hairline">
              Book Enterprise Demo <MessageSquareText size={18} />
            </a>
            <a href="#platform" className="inline-flex items-center gap-2 rounded-full border border-clinical/20 bg-white px-5 py-3 font-semibold text-clinical shadow-hairline">
              Explore Platform <HeartPulse size={18} />
            </a>
            <a href="/kids-dashboard" className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-white px-5 py-3 font-semibold text-ion shadow-hairline">
              Kids Digital Twin <Brain size={18} />
            </a>
            <a href="/gym-twin-dashboard" className="inline-flex items-center gap-2 rounded-full border border-[#5b35f5]/20 bg-white px-5 py-3 font-semibold text-[#5b35f5] shadow-hairline">
              Gym Digital Twin <Activity size={18} />
            </a>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["HIPAA-ready controls", "Cohort privacy", "Agentic RAG"].map((item) => (
              <div key={item} className="glass rounded-lg p-4">
                <Check className="mb-3 text-clinical" size={18} />
                <p className="text-sm font-semibold text-ink">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
          <div className="glass relative overflow-hidden rounded-lg border border-white/70">
            <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-ink shadow-hairline">
                Live 3D Organ Simulation
              </span>
              <span className="rounded-full bg-clinical px-3 py-1 text-sm font-semibold text-white shadow-hairline">
                {selected.score}/100 {selected.risk} risk
              </span>
            </div>
            <div className="h-[620px] md:h-[700px]">
              <HeroDigitalHumanCanvas />
            </div>
            <div className="absolute right-4 top-20 hidden w-56 rounded-lg border border-ink/10 bg-white/90 p-4 shadow-glass backdrop-blur-xl sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite">What-if prediction</p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Heart risk</span>
                  <span className="font-semibold text-clinical">22% &rarr; 11%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Fatty liver</span>
                  <span className="font-semibold text-clinical">65% &rarr; 38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite">Biological age</span>
                  <span className="font-semibold text-clinical">36 &rarr; 31</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-lg border border-ink/10 bg-white/90 p-4 shadow-glass backdrop-blur-xl md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm text-graphite">Selected organ</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selected.color }} />
                  <p className="text-2xl font-semibold text-ink">{selected.label}</p>
                  <p className="rounded-full bg-ink px-2 py-1 text-xs font-semibold text-white">{selected.score}</p>
                </div>
                <p className="mt-2 text-sm text-graphite">{selected.insight}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Weight", simulation.weightKg, "kg", 0, 15, "weightKg"],
                  ["Sleep", simulation.sleepHours, "h", 5, 9, "sleepHours"],
                  ["Exercise", simulation.exerciseMinutes, "m", 0, 90, "exerciseMinutes"]
                ].map(([label, value, unit, min, max, key]) => (
                  <label key={String(label)} className="text-xs font-semibold text-graphite">
                    {label}
                    <input
                      aria-label={`${label} simulation`}
                      className="mt-2 block w-full accent-clinical"
                      type="range"
                      min={Number(min)}
                      max={Number(max)}
                      step={key === "sleepHours" ? 0.5 : 1}
                      value={Number(value)}
                      onChange={(event) => setSimulation(key as "weightKg" | "sleepHours" | "exerciseMinutes", Number(event.target.value))}
                    />
                    <span className="text-ink">{value}{unit}</span>
                  </label>
                ))}
                <div className="sm:col-span-3 rounded-lg bg-mist p-3 text-sm font-semibold text-ink">
                  Modeled risk after change: <span className="text-clinical">{projectedRisk}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {organs.map((organ) => (
              <button
                key={organ.id}
                onClick={() => setSelectedOrganId(organ.id)}
                className={`rounded-lg border p-3 text-left transition ${
                  selectedOrganId === organ.id ? "border-clinical bg-clinical text-white" : "border-ink/10 bg-white text-ink hover:border-clinical/40"
                }`}
              >
                <p className="text-sm font-semibold">{organ.label}</p>
                <p className={selectedOrganId === organ.id ? "text-xs text-white/80" : "text-xs text-graphite"}>{organ.risk} risk</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="border-y border-ink/10 bg-mist py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-clinical">Complete SaaS Platform</p>
          <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">One twin engine, eight markets.</h2>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Neuromirror unifies reports, wearables, imaging, lifestyle, and enterprise workflows into a privacy-first intelligence layer.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {customerSegments.map((segment) => {
            const Icon = segment.icon;
            return (
              <article key={segment.name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-clinical/10 text-clinical">
                    <Icon size={20} />
                  </div>
                  <LockKeyhole size={17} className="text-graphite" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-ink">{segment.name}</h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-graphite">{segment.headline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {segment.metrics.map((metric) => (
                    <span key={metric} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink">
                      {metric}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-semibold text-clinical">{segment.privacy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SaaSOperations() {
  return (
    <section id="saas-operations" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Multi-Tenant SaaS</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Launch every organization as its own secure tenant.</h2>
            <p className="mt-5 text-lg leading-8 text-graphite">
              Corporate, school, university, gym, hospital, and insurance tenants get isolated users, admins, reports,
              AI models, dashboards, policies, billing, and audit trails.
            </p>
            <div className="mt-8 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-clinical">Generated tenant URL</p>
                  <p className="mt-1 text-2xl font-semibold text-ink">acme-health.neuromirror.ai</p>
                </div>
                <span className="rounded-full bg-clinical/10 px-3 py-1 text-sm font-semibold text-clinical">Ready</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["No cross-tenant data", "Dedicated policies", "Tenant AI controls", "Private dashboards"].map((item) => (
                  <p key={item} className="flex items-center gap-2 rounded-lg bg-mist px-3 py-2 text-sm font-semibold text-ink">
                    <Check size={15} className="text-clinical" /> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {onboardingSteps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-graphite">{step.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.fields.map((field) => (
                        <span key={field} className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink">
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-clinical">Organization Admin Dashboard</p>
              <h3 className="mt-2 text-3xl font-semibold text-ink">Tenant command center after purchase.</h3>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 font-semibold text-white">
              Launch Tenant <RocketIcon />
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tenantStats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-mist p-4">
                <p className="text-xs font-semibold uppercase text-graphite">{stat.label}</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold text-ink">{stat.value}</p>
                  <p className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-clinical">{stat.delta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RocketIcon() {
  return <ArrowRight size={17} />;
}

function InvitationsAndAccess() {
  return (
    <section id="tenant-management" className="border-y border-ink/10 bg-mist py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Invitations And Access</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Import 500 users and track every invite.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {invitationChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <article key={channel.name} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-clinical/10 text-clinical">
                        <Icon size={19} />
                      </div>
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-graphite">{channel.status}</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-ink">{channel.name}</h3>
                  </article>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {integrationSources.map((source) => (
                <span key={source} className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-ink shadow-hairline">
                  {source}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-ink">Invitation funnel</h3>
              <span className="rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">Live campaign</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inviteFunnelData}>
                  <CartesianGrid stroke="#e5ecea" vertical={false} />
                  <XAxis dataKey="stage" stroke="#647176" />
                  <YAxis stroke="#647176" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#0f766e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "Create account",
                "Verify mobile and email",
                "Accept consent",
                "Health questionnaire",
                "Upload reports",
                "Connect wearables",
                "Launch dashboard"
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg bg-mist p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-semibold text-ink">{index + 1}</span>
                  <p className="text-sm font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-clinical">Role Based Access Control</p>
              <h3 className="mt-2 text-3xl font-semibold text-ink">Permissions by role and purpose.</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-graphite">
              HR, teachers, insurers, and admins never receive personal reports unless policy, role, and consent allow it.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {rolePermissions.map((role) => (
              <article key={role.role} className="rounded-lg bg-mist p-4">
                <h4 className="font-semibold text-ink">{role.role}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span key={permission} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-graphite">
                      {permission}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketplaceProgramsAndAlerts() {
  return (
    <section id="marketplace" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-clinical">Marketplace And Programs</p>
          <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Turn insights into care, coaching, and ROI.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {marketplacePartners.map((partner) => {
            const Icon = partner.icon;
            return (
              <article key={partner.name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <Icon className="text-clinical" size={23} />
                <h3 className="mt-4 font-semibold text-ink">{partner.name}</h3>
                <p className="mt-2 text-sm text-graphite">{partner.action}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase text-clinical">Wellness Program Engine</p>
                <h3 className="mt-2 text-3xl font-semibold text-ink">Launch targeted interventions.</h3>
              </div>
              <button className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">New Program</button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {wellnessPrograms.map((program) => (
                <article key={program.name} className="rounded-lg bg-mist p-4">
                  <h4 className="font-semibold text-ink">{program.name}</h4>
                  <p className="mt-2 text-sm text-graphite">{program.target}</p>
                  <p className="mt-4 w-fit rounded-full bg-white px-3 py-1 text-sm font-semibold text-clinical">{program.metric}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <p className="text-sm font-semibold uppercase text-clinical">Alert System</p>
            <h3 className="mt-2 text-3xl font-semibold text-ink">Clinical and operational reminders.</h3>
            <div className="mt-6 grid gap-3">
              {alertTypes.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.name} className="flex items-center justify-between gap-3 rounded-lg bg-mist p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-clinical">
                        <Icon size={18} />
                      </span>
                      <p className="font-semibold text-ink">{alert.name}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-graphite">Policy checked</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-ink p-5 text-white">
          <p className="text-sm font-semibold uppercase text-white/60">AI Digital Twin Lifecycle</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {twinLifecycle.map((step, index) => (
                <div key={step} className="rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/55">Step {index + 1}</p>
                <p className="mt-1 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboards() {
  const [active, setActive] = useState(customerSegments[0].name);
  const segment = customerSegments.find((item) => item.name === active) ?? customerSegments[0];

  return (
    <section id="solutions" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Dashboards</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Role-aware command centers.</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-full border border-ink/10 bg-white p-1 shadow-hairline">
            {customerSegments.slice(0, 6).map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === item.name ? "bg-ink text-white" : "text-graphite hover:bg-mist hover:text-ink"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-hairline">
            <p className="text-sm font-semibold text-clinical">{segment.name} Dashboard</p>
            <h3 className="mt-2 text-3xl font-semibold text-ink">{segment.headline}</h3>
            <p className="mt-4 text-graphite">{segment.privacy}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {segment.metrics.map((metric, index) => (
                <div key={metric} className="rounded-lg bg-mist p-4">
                  <p className="text-xs font-semibold uppercase text-graphite">{metric}</p>
                  <p className="mt-2 text-2xl font-semibold text-ink">{[31, 84, 12, 67][index]}%</p>
                  <p className="mt-1 text-xs text-clinical">AI signal updated</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-clinical/20 bg-clinical/5 p-4">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <ShieldCheck size={18} className="text-clinical" /> Privacy rule active
              </div>
              <p className="mt-2 text-sm text-graphite">Sensitive medical detail is filtered before this dashboard renders.</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-ink">Organ health trends</h3>
                <LineChart size={18} className="text-clinical" />
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="heart" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#e2495d" stopOpacity={0.32} />
                        <stop offset="95%" stopColor="#e2495d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e5ecea" vertical={false} />
                    <XAxis dataKey="month" stroke="#647176" />
                    <YAxis stroke="#647176" />
                    <Tooltip />
                    <Area type="monotone" dataKey="heart" stroke="#e2495d" fill="url(#heart)" strokeWidth={3} />
                    <Area type="monotone" dataKey="sleep" stroke="#2f6fed" fill="#2f6fed12" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-ink">Population risk intelligence</h3>
                <Activity size={18} className="text-clinical" />
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={populationData}>
                    <CartesianGrid stroke="#e5ecea" vertical={false} />
                    <XAxis dataKey="name" stroke="#647176" />
                    <YAxis stroke="#647176" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {populationData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadFlow() {
  const [stateIndex, setStateIndex] = useState(0);
  const current = uploadStates[stateIndex];
  const isLoading = ["Uploading", "OCR Extraction", "AI Analysis", "Twin Recalculation"].includes(current);
  const isFailure = current === "Failure";
  const isSuccess = current === "Success";

  return (
    <section id="digital-twin" className="border-y border-ink/10 bg-mist py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Health Digital Twin</p>
          <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Upload once. Recalculate the entire twin.</h2>
          <p className="mt-5 text-lg leading-8 text-graphite">
            Annual checkups, CBC, HbA1c, lipid profile, LFT, KFT, vitamin D, B12, thyroid, CRP, insulin, uric acid, ECG,
            echo, stress tests, MRI, CT, ultrasound, medication history, allergies, vaccination, lifestyle, wearables,
            and family history all become longitudinal context.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {workflow.map((item) => (
              <div key={item.label} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                <p className="font-semibold text-ink">{item.label}</p>
                <p className="mt-1 text-sm text-graphite">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <div className="rounded-lg border-2 border-dashed border-clinical/30 bg-white p-6 text-center">
            <UploadCloud className="mx-auto text-clinical" size={36} />
            <h3 className="mt-4 text-2xl font-semibold text-ink">Annual Health Checkup.pdf</h3>
            <p className="mt-2 text-sm text-graphite">Drag and drop reports, scans, wearable exports, or clinical summaries.</p>
            <button
              onClick={() => setStateIndex((index) => (index + 1) % uploadStates.length)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : isFailure ? <X size={18} /> : isSuccess ? <Check size={18} /> : <Play size={18} />}
              {current}
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {uploadStates.map((state, index) => (
              <div key={state} className={`flex items-center gap-3 rounded-lg p-3 ${index <= stateIndex ? "bg-white" : "bg-white/50"}`}>
                <span className={`grid h-7 w-7 place-items-center rounded-full ${index < stateIndex ? "bg-clinical text-white" : index === stateIndex ? "bg-ink text-white" : "bg-mist text-graphite"}`}>
                  {index < stateIndex ? <Check size={15} /> : index + 1}
                </span>
                <p className="font-medium text-ink">{state}</p>
                {index === stateIndex && <span className="ml-auto text-sm font-semibold text-clinical">Active</span>}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-ink p-4 text-white">
            <p className="text-sm text-white/70">Button behavior</p>
            <p className="mt-1 font-semibold">Each action owns loading, success, failure, empty, confirmation, notification, and recalculation states.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopilotAndAgents() {
  return (
    <section id="ai-copilot" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">AI Health Copilot</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">A ChatGPT-level health interface with clinical guardrails.</h2>
            <div className="mt-8 rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
              {[
                ["You", "Compare my March and May lipid reports and explain the risk trend."],
                ["Neuromirror", "LDL fell from 142 to 118, triglycerides improved, and ApoB remains the next high-value marker to confirm residual risk."],
                ["You", "Generate a doctor summary for my appointment."],
                ["Neuromirror", "Prepared: timeline, abnormal labs, medications, family history, questions, and source citations for review."]
              ].map(([role, text]) => (
                <div key={text} className={`mb-3 rounded-lg p-4 ${role === "You" ? "bg-mist" : "bg-clinical/8 border border-clinical/20"}`}>
                  <p className="text-xs font-semibold uppercase text-graphite">{role}</p>
                  <p className="mt-1 text-ink">{text}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-3 text-graphite">
                <MessageSquareText size={18} />
                Ask about reports, risks, medication, nutrition, exercise, prevention...
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {agents.map((agent) => (
              <article key={agent.name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-mist text-clinical">
                  <RefreshCw size={18} />
                </div>
                <h3 className="font-semibold text-ink">{agent.name}</h3>
                <p className="mt-2 text-sm leading-6 text-graphite">{agent.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section id="security" className="border-y border-ink/10 bg-mist py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Enterprise Architecture</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Built for medical trust and SaaS scale.</h2>
            <div className="mt-8 grid gap-3">
              {["Next.js 15", "NestJS", "PostgreSQL", "Redis", "OpenAI GPT models", "LangGraph", "LangChain", "FAISS", "Azure", "Kubernetes", "Docker", "Vercel"].map((tech) => (
                <span key={tech} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">
                  <Check size={15} className="text-clinical" /> {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {architectureCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                  <Icon className="text-clinical" size={24} />
                  <h3 className="mt-4 font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{card.body}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg bg-ink p-5 text-white">
            <Database className="text-white/80" size={22} />
            <h3 className="mt-4 font-semibold">Database Tables</h3>
            <p className="mt-2 text-sm text-white/70">tenants, users, members, consent_grants, reports, biomarkers, organ_scores, simulations, cohorts, messages, agent_runs, audit_events.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-hairline">
            <Cloud className="text-clinical" size={22} />
            <h3 className="mt-4 font-semibold text-ink">Deployment</h3>
            <p className="mt-2 text-sm text-graphite">Vercel frontend, Azure AKS services, Azure Database for PostgreSQL, Azure Cache for Redis, Blob Storage, Key Vault, Monitor.</p>
          </div>
          <div className="rounded-lg bg-white p-5 shadow-hairline">
            <FileText className="text-clinical" size={22} />
            <h3 className="mt-4 font-semibold text-ink">APIs</h3>
            <div className="mt-3 space-y-2">
              {apiSurface.slice(0, 5).map((api) => (
                <p key={api} className="rounded bg-mist px-3 py-2 font-mono text-xs text-ink">{api}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingAndPages() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Information Architecture</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Every page and module mapped.</h2>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {pages.map((page) => (
                <a key={page} href="#book-demo" className="rounded-lg border border-ink/10 bg-white p-3 text-sm font-semibold text-ink shadow-hairline hover:border-clinical/40">
                  {page}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="grid gap-4 md:grid-cols-3">
              {priceTiers.map((tier) => (
                <article key={tier.name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                  <p className="text-sm font-semibold text-clinical">{tier.name}</p>
                  <p className="mt-4 text-4xl font-semibold text-ink">{tier.price}</p>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-graphite">{tier.fit}</p>
                  <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 font-semibold text-white">
                    {tier.cta} <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <h3 className="font-semibold text-ink">Graph library</h3>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {graphs.map((graph) => (
                  <p key={graph} className="rounded bg-mist px-3 py-2 text-sm font-medium text-ink">{graph}</p>
                ))}
              </div>
            </div>
            <div className="mt-6 h-64 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={trendData}>
                  <CartesianGrid stroke="#e5ecea" vertical={false} />
                  <XAxis dataKey="month" stroke="#647176" />
                  <YAxis stroke="#647176" />
                  <Tooltip />
                  <Line type="monotone" dataKey="metabolism" stroke="#d97706" strokeWidth={3} />
                  <Line type="monotone" dataKey="stress" stroke="#db2777" strokeWidth={3} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoForm() {
  return (
    <section id="book-demo" className="bg-ink py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-white/60">Book Demo</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Deploy the health intelligence layer your organization can trust.</h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            The next implementation step is splitting this prototype into dedicated routes, NestJS services, database migrations, and Azure infrastructure modules.
          </p>
        </div>
        <form className="rounded-lg bg-white p-5 text-ink shadow-glass">
          <div className="grid gap-4 sm:grid-cols-2">
            {["Name", "Work Email", "Organization", "Segment"].map((field) => (
              <label key={field} className="text-sm font-semibold text-graphite">
                {field}
                <input className="mt-2 w-full rounded-lg border border-ink/10 px-4 py-3 text-ink" placeholder={field} />
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold text-graphite">
            What should your digital twin platform solve first?
            <textarea className="mt-2 min-h-28 w-full rounded-lg border border-ink/10 px-4 py-3 text-ink" placeholder="Corporate wellness, hospital command center, school module..." />
          </label>
          <button type="button" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clinical px-5 py-3 font-semibold text-white">
            Request Enterprise Demo <ArrowRight size={18} />
          </button>
          <p className="mt-3 flex items-center gap-2 text-xs text-graphite">
            <AlertCircle size={14} /> Demo submissions are mocked in this prototype.
          </p>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const memoizedClient = useMemo(() => queryClient, []);

  return (
    <QueryClientProvider client={memoizedClient}>
      <Header />
      <main>
        <Hero />
        <TrustLogoMarquee />
        <Platform />
        <SaaSOperations />
        <InvitationsAndAccess />
        <MarketplaceProgramsAndAlerts />
        <Dashboards />
        <UploadFlow />
        <CopilotAndAgents />
        <Architecture />
        <PricingAndPages />
        <DemoForm />
      </main>
    </QueryClientProvider>
  );
}
