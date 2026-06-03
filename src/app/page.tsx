"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Brain,
  Building2,
  Check,
  ChevronRight,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Hospital,
  Landmark,
  LineChart,
  Loader2,
  MessageSquareText,
  Play,
  RefreshCw,
  School,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
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
  customerSegments,
  alertTypes,
  graphs,
  marketplacePartners,
  organs,
  priceTiers,
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

const preventionMomentumData = [
  { stage: "Signals", score: 42 },
  { stage: "Twin", score: 58 },
  { stage: "Risk", score: 71 },
  { stage: "Action", score: 83 },
  { stage: "Progress", score: 91 }
];

const trustBarItems = ["Corporates", "Schools", "Universities", "Hospitals", "Gyms", "Insurance Providers"];

const primaryNav = [
  { label: "Platform", href: "#platform" },
  { label: "Resources", href: "#ai-copilot" },
  { label: "Company", href: "#book-demo" },
  { label: "Pricing", href: "#pricing" }
];

const solutionNav = [
  { label: "Corporate Twin", href: "/employee-health-dashboard", icon: Building2 },
  { label: "School Twin", href: "/kids-dashboard", icon: School },
  { label: "Gym Twin", href: "/gym-twin-dashboard", icon: Dumbbell },
  { label: "Hospital Twin", href: "#solutions", icon: Hospital },
  { label: "University Twin", href: "#solutions", icon: GraduationCap },
  { label: "Family Twin", href: "#digital-twin", icon: Users }
];

const dashboardLinks = [
  { label: "Admin Dashboard", href: "/login", icon: ShieldCheck, tone: "text-ink" },
  { label: "Employee Dashboard", href: "/employee-health-dashboard", icon: Building2, tone: "text-clinical" },
  { label: "Kids Dashboard", href: "/kids-dashboard", icon: School, tone: "text-ion" },
  { label: "Gym Twin", href: "/gym-twin-dashboard", icon: Dumbbell, tone: "text-[#5b35f5]" }
];

const premiumTwinCards = [
  {
    title: "Corporate Twin",
    description: "Population health intelligence for resilient teams.",
    href: "/employee-health-dashboard",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "School Twin",
    description: "Growth, fitness, nutrition, and wellbeing for students.",
    href: "/kids-dashboard",
    icon: School,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Gym Twin",
    description: "Performance, recovery, and body composition intelligence.",
    href: "/gym-twin-dashboard",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Hospital Twin",
    description: "Clinical timelines and risk context for care teams.",
    href: "#solutions",
    icon: Hospital,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "AI Copilot",
    description: "A conversational health interface with guardrails.",
    href: "#ai-copilot",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Admin Intelligence",
    description: "Clear population insights and program performance for leadership.",
    href: "/login",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  }
];

const mappedPages = [
  { label: "Admin Dashboard", href: "/login", icon: ShieldCheck },
  { label: "Employee Health", href: "/employee-health-dashboard", icon: Building2 },
  { label: "Kids Dashboard", href: "/kids-dashboard", icon: School },
  { label: "Gym Twin", href: "/gym-twin-dashboard", icon: Dumbbell },
  { label: "Book Demo", href: "#book-demo", icon: MessageSquareText },
  { label: "AI Copilot", href: "#ai-copilot", icon: Sparkles },
  { label: "Digital Twin", href: "#digital-twin", icon: HeartPulse }
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
  return (
    <section className="border-y border-ink/10 bg-white/90 py-7">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <p className="w-full text-sm font-semibold uppercase tracking-[0.18em] text-graphite md:w-64">
            Trusted by modern health ecosystems
          </p>
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
            <div className="logo-marquee flex items-center gap-4">
              {[...trustBarItems, ...trustBarItems].map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex h-14 min-w-52 items-center justify-center gap-3 rounded-lg border border-ink/10 bg-white px-5 shadow-hairline"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-clinical/10 text-clinical">
                    <Check size={16} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{name}</span>
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-ink/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 font-semibold text-ink" aria-label="Neuromirror home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white">
            <Brain size={18} />
          </span>
          <span>Neuromirror</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {primaryNav.slice(0, 1).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-graphite transition hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="group relative">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-graphite transition hover:bg-ink/5 hover:text-ink">
              Solutions
            </button>
            <div className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-lg border border-ink/10 bg-white p-2 opacity-0 shadow-glass transition group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
              {solutionNav.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-clinical/10 text-clinical">
                      <Icon size={18} />
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
          {primaryNav.slice(1).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-graphite transition hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#book-demo"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-hairline transition hover:bg-clinical"
        >
          Book Demo <ArrowRight size={16} />
        </a>
        <div className="group relative hidden md:block">
          <button className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline transition hover:border-clinical/40">
            Dashboard <ChevronRight size={15} />
          </button>
          <div className="invisible absolute right-0 top-full w-72 translate-y-2 rounded-lg border border-ink/10 bg-white p-2 opacity-0 shadow-glass transition group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-mist">
                  <Icon size={18} className={item.tone} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
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
            One intelligent platform that continuously learns, predicts, and improves human health, fitness, growth, and wellbeing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/employee-health-dashboard" className="inline-flex items-center gap-2 rounded-full bg-clinical px-5 py-3 font-semibold text-white shadow-glass">
              Experience My Twin <ChevronRight size={18} />
            </a>
            <a href="#product-intro" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 font-semibold text-ink shadow-hairline">
              Watch Demo <Play size={18} />
            </a>
            <a href="#book-demo" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 font-semibold text-ink shadow-hairline">
              Book Demo <MessageSquareText size={18} />
            </a>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white/75 px-4 py-3 text-sm font-semibold text-ink shadow-hairline backdrop-blur transition hover:-translate-y-0.5 hover:border-clinical/40 hover:bg-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon size={18} className={item.tone} />
                    {item.label}
                  </span>
                  <ArrowRight size={15} className="text-graphite transition group-hover:translate-x-0.5 group-hover:text-clinical" />
                </a>
              );
            })}
          </div>
          <div id="product-intro" className="mt-8 overflow-hidden rounded-lg border border-ink/10 bg-ink shadow-glass">
            <video
              className="product-intro-video"
              src="/videos/product-intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Neuromirror product intro video"
            />
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
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
                Run Simulation <Sparkles size={15} />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-lg border border-ink/10 bg-white/90 p-4 shadow-glass backdrop-blur-xl md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm text-graphite">Health score</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selected.color }} />
                  <p className="text-2xl font-semibold text-ink">{selected.label}</p>
                  <p className="rounded-full bg-ink px-2 py-1 text-xs font-semibold text-white">{selected.score}</p>
                </div>
                <p className="mt-2 text-sm text-graphite">{selected.insight}</p>
                <p className="mt-3 w-fit rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">
                  Trend +8 points this month
                </p>
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
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-clinical">Digital Twin Platform</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Purpose-built twins for every health ecosystem.</h2>
          </div>
          <a href="#book-demo" className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white shadow-hairline">
            Book Demo <ArrowRight size={17} />
          </a>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {premiumTwinCards.map((card) => {
            const Icon = card.icon;
            return (
              <a key={card.title} href={card.href} className="group overflow-hidden rounded-lg border border-ink/10 bg-white shadow-hairline transition hover:-translate-y-1 hover:border-clinical/40 hover:shadow-glass">
                <div className="relative h-56 overflow-hidden bg-ink">
                  <img src={card.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-lg bg-white text-clinical shadow-hairline">
                    <Icon size={22} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-graphite">{card.description}</p>
                    </div>
                    <ArrowRight size={18} className="mt-1 shrink-0 text-graphite transition group-hover:translate-x-1 group-hover:text-clinical" />
                  </div>
                </div>
              </a>
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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Why NeuroMirror</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">See health change before it becomes a crisis.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
              NeuroMirror turns everyday health signals into a living 3D twin, helping people and organizations understand risk, act earlier, and measure improvement.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Predict earlier", "Spot risk movement across heart, liver, sleep, stress, and metabolism."],
                ["Personalize action", "Translate reports and habits into clear next steps people can follow."],
                ["Show progress", "Visualize how sleep, exercise, weight, and recovery shift the twin over time."],
                ["Scale prevention", "Help teams, schools, gyms, and hospitals move from reactive care to guided prevention."]
              ].map(([title, body]) => (
                <article key={title} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                  <Check size={18} className="text-clinical" />
                  <h3 className="mt-3 font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-glass">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(47,111,237,0.28),transparent_32rem)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase text-white/60">3D twin simulation</p>
                  <h3 className="mt-2 text-2xl font-semibold">Model the next best move.</h3>
                </div>
                <span className="rounded-full bg-clinical px-3 py-1 text-sm font-semibold text-white">Live preview</span>
              </div>
              <div className="mt-5 h-[430px] overflow-hidden rounded-lg border border-white/10 bg-white/10">
                <HeroDigitalHumanCanvas />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {organs.slice(0, 4).map((organ) => (
                  <div key={organ.id} className="rounded-lg border border-white/10 bg-white/10 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{organ.label}</span>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold">{organ.score}/100</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{organ.risk} risk - {organ.trend} trend</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-white p-4 text-ink">
                <p className="text-sm font-semibold text-clinical">What changes when action improves?</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {["Heart risk 22% -> 11%", "Sleep score +12", "Biological age -5y"].map((item) => (
                    <p key={item} className="rounded-lg bg-mist px-3 py-2 text-sm font-semibold">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HealthJourney() {
  return (
    <section id="member-journey" className="border-y border-ink/10 bg-mist py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Health Journey</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">From first report to a living prevention plan.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
              NeuroMirror helps people understand what their body is telling them, visualize risk in 3D, and follow the next action that can move their scores.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Connect signals", "Reports, wearables, lifestyle, symptoms, and goals become one health picture."],
                ["Build the twin", "Organ scores, trends, and risk patterns appear in a visual model people can understand."],
                ["Simulate change", "Sleep, weight, exercise, stress, and recovery choices show projected impact."],
                ["Guide action", "The platform turns complex health data into simple next steps and progress tracking."]
              ].map(([title, body], index) => (
                <article key={title} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{index + 1}</span>
                  <h3 className="mt-4 font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-ink">Prevention momentum</h3>
              <span className="rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">Improving</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={preventionMomentumData}>
                  <CartesianGrid stroke="#e5ecea" vertical={false} />
                  <XAxis dataKey="stage" stroke="#647176" />
                  <YAxis stroke="#647176" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#0f766e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                "Reports understood",
                "Wearable trends connected",
                "Organ scores generated",
                "Risks explained in plain language",
                "Lifestyle simulation reviewed",
                "Next action selected",
                "Progress tracked over time"
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg bg-mist p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-semibold text-ink">{index + 1}</span>
                  <p className="text-sm font-semibold text-ink">{step}</p>
                </div>
              ))}
            </div>
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
                <p className="text-sm text-white/60">Step {index + 1}</p>
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
    <section id="digital-twin" className="border-y border-white/10 bg-ink py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Interactive Digital Twin</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Upload once. Watch the twin recalculate.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Reports, wearables, lifestyle, and history become a living model that updates risk, organ scores, and next-best actions.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {workflow.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-hairline">
                <p className="font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/10 p-5 shadow-glass backdrop-blur-xl">
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
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Ask your body what changed, and why.</h2>
            <div className="mt-8 rounded-lg border border-ink/10 bg-ink p-4 text-white shadow-glass">
              {[
                ["You", "Why is my liver score low?"],
                ["Neuromirror", "Your liver score is being pulled down by ALT drift, triglycerides, sleep debt, and recent weight trend. The model predicts the fastest improvement from lower alcohol intake, 7.5h sleep consistency, and a 6-week strength plus walking plan."],
                ["You", "Can I share this with my doctor?"],
                ["Neuromirror", "Yes. I prepared a short clinical summary with timeline, abnormal labs, lifestyle signals, and the questions worth asking next."]
              ].map(([role, text]) => (
                <div key={text} className={`mb-3 rounded-lg p-4 ${role === "You" ? "ml-auto max-w-[84%] bg-white/10" : "mr-auto max-w-[92%] border border-clinical/30 bg-clinical/20"}`}>
                  <p className="text-xs font-semibold uppercase text-white/50">{role}</p>
                  <p className="mt-1 text-white/90">{text}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-3 text-graphite">
                <MessageSquareText size={18} />
                Ask about reports, risk, medication, nutrition, exercise, prevention...
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

function PricingAndPages() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Mapped Experience</p>
            <h2 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Every live page, one clear doorway.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {mappedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <a key={page.label} href={page.href} className="group flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white p-4 text-sm font-semibold text-ink shadow-hairline transition hover:-translate-y-0.5 hover:border-clinical/40">
                    <span className="inline-flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-clinical/10 text-clinical">
                        <Icon size={18} />
                      </span>
                      {page.label}
                    </span>
                    <ArrowRight size={16} className="text-graphite transition group-hover:translate-x-1 group-hover:text-clinical" />
                  </a>
                );
              })}
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
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Bring preventive health intelligence to every person you serve.</h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            See how NeuroMirror can help your organization improve engagement, predict risk earlier, and guide people toward measurable health progress.
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
          <p className="mt-3 text-xs text-graphite">
            Our team will tailor the walkthrough to your audience, workflows, and prevention goals.
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
        <HealthJourney />
        <MarketplaceProgramsAndAlerts />
        <Dashboards />
        <UploadFlow />
        <CopilotAndAgents />
        <PricingAndPages />
        <DemoForm />
      </main>
    </QueryClientProvider>
  );
}
