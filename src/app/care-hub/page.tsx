"use client";

import {
  Activity,
  Bell,
  Brain,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Database,
  Dumbbell,
  FileText,
  GraduationCap,
  HeartPulse,
  LockKeyhole,
  MessageSquareText,
  Network,
  Salad,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
  Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

type Expert = {
  name: string;
  role: string;
  match: number;
  rating: string;
  mode: string;
  next: string;
  focus: string[];
  icon: LucideIcon;
};

type CarePlan = {
  title: string;
  owner: string;
  progress: number;
  status: string;
  tasks: string[];
};

type TimelineEvent = {
  time: string;
  title: string;
  detail: string;
  actor: string;
  impact: string;
};

const navigation = [
  "Dashboard",
  "My Digital Twin",
  "Experts",
  "Appointments",
  "Care Plans",
  "Health Goals",
  "Progress Tracking",
  "Messages",
  "Documents",
  "Emergency Profile",
  "Family Members"
];

const userTypes = [
  "Employee",
  "Doctor",
  "Nutritionist",
  "Fitness Coach",
  "Mental Wellness Coach",
  "Physiotherapist",
  "Student",
  "Parent",
  "Teacher",
  "Gym Trainer",
  "Corporate HR",
  "School Administrator",
  "Insurance Partner",
  "Super Admin"
];

const expertCategories = [
  "Doctors",
  "Cardiologists",
  "Diabetologists",
  "Endocrinologists",
  "General Physicians",
  "Nutritionists",
  "Dieticians",
  "Fitness Coaches",
  "Personal Trainers",
  "Yoga Experts",
  "Mental Wellness Coaches",
  "Counsellors",
  "Physiotherapists",
  "Sleep Specialists",
  "Lifestyle Coaches",
  "Career Coaches",
  "Student Mentors",
  "Teachers",
  "Tutors"
];

const healthSignals = [
  { label: "Metabolic risk", value: 72, trend: "+8 improved", color: "#0f766e" },
  { label: "Sleep recovery", value: 58, trend: "-6 needs care", color: "#2f6fed" },
  { label: "Stress load", value: 44, trend: "+11 high", color: "#e2495d" },
  { label: "Plan adherence", value: 81, trend: "+18 this month", color: "#a26814" }
];

const riskData = [
  { week: "W1", diabetes: 68, sleep: 42, stress: 56 },
  { week: "W2", diabetes: 64, sleep: 46, stress: 58 },
  { week: "W3", diabetes: 59, sleep: 51, stress: 52 },
  { week: "W4", diabetes: 54, sleep: 57, stress: 48 },
  { week: "W5", diabetes: 49, sleep: 61, stress: 43 },
  { week: "W6", diabetes: 43, sleep: 66, stress: 39 }
];

const outcomeData = [
  { metric: "HbA1c", current: 5.7, target: 5.4 },
  { metric: "LDL", current: 118, target: 95 },
  { metric: "Sleep", current: 6.4, target: 7.5 },
  { metric: "Stress", current: 7.2, target: 4.5 }
];

const experts: Expert[] = [
  {
    name: "Dr. Anika Rao",
    role: "Endocrinologist",
    match: 96,
    rating: "4.9",
    mode: "Video or in-person",
    next: "Today, 6:30 PM",
    focus: ["Prediabetes", "Metabolic syndrome", "Lab review"],
    icon: Stethoscope
  },
  {
    name: "Neha Mehta",
    role: "Clinical Nutritionist",
    match: 94,
    rating: "4.8",
    mode: "Chat follow-ups",
    next: "Tomorrow, 10:00 AM",
    focus: ["Weight loss", "Fatty liver", "Meal planning"],
    icon: Salad
  },
  {
    name: "Kabir Sethi",
    role: "Fitness Coach",
    match: 89,
    rating: "4.7",
    mode: "Hybrid coaching",
    next: "Fri, 7:00 AM",
    focus: ["Strength training", "Walking goals", "Mobility"],
    icon: Dumbbell
  },
  {
    name: "Maya Iyer",
    role: "Mental Wellness Coach",
    match: 86,
    rating: "4.9",
    mode: "Private video",
    next: "Sat, 11:30 AM",
    focus: ["Sleep stress loop", "Burnout", "Mindfulness"],
    icon: Brain
  }
];

const matchingRules = [
  {
    trigger: "Prediabetes risk high",
    recommends: "Endocrinologist, Nutritionist, Fitness Coach",
    algorithm: "HbA1c + BMI + family history + activity compliance + food pattern"
  },
  {
    trigger: "Sleep score low",
    recommends: "Sleep Specialist, Mental Wellness Coach",
    algorithm: "Sleep duration + HRV + stress score + caffeine window + mood trend"
  },
  {
    trigger: "Student score poor",
    recommends: "Teacher, Mentor, Counsellor",
    algorithm: "Marks + attendance + learning style + assignment gaps + parent feedback"
  }
];

const carePlans: CarePlan[] = [
  {
    title: "12-week metabolic reset",
    owner: "Doctor + Nutritionist",
    progress: 64,
    status: "Risk score recalculated weekly",
    tasks: ["Repeat HbA1c in 45 days", "Protein-first breakfast", "Walk 8k steps"]
  },
  {
    title: "Sleep and stress recovery",
    owner: "Wellness Coach",
    progress: 42,
    status: "Twin sleep model updating nightly",
    tasks: ["Fixed bedtime", "10-minute breathing", "Meeting load review"]
  },
  {
    title: "Strength and mobility block",
    owner: "Fitness Coach",
    progress: 78,
    status: "Compliance synced from app",
    tasks: ["3 strength sessions", "Zone 2 cardio", "Mobility assessment"]
  }
];

const appointments = [
  ["Today", "6:30 PM", "Endocrinology consult", "Video", "Confirm vitals before call"],
  ["Tomorrow", "10:00 AM", "Nutrition onboarding", "Chat + video", "Share 3-day food log"],
  ["Friday", "7:00 AM", "Coach assessment", "In-person", "Wear comfortable shoes"]
];

const timeline: TimelineEvent[] = [
  {
    time: "Today 09:40",
    title: "Doctor added Vitamin D deficiency",
    detail: "Twin biomarkers, nutrition goals, and supplement reminders updated.",
    actor: "Doctor",
    impact: "Health score +2 projected"
  },
  {
    time: "Yesterday 18:10",
    title: "Nutritionist changed dinner plan",
    detail: "Carb target reduced and protein target increased for metabolic reset.",
    actor: "Nutritionist",
    impact: "Diabetes risk -4%"
  },
  {
    time: "Mon 07:20",
    title: "Fitness coach assigned week 4 block",
    detail: "Workout compliance and calorie burn are now feeding progress tracking.",
    actor: "Coach",
    impact: "Plan adherence +9%"
  },
  {
    time: "Last week",
    title: "Report uploaded",
    detail: "Lab report indexed for Copilot and risk model recalculation.",
    actor: "Employee",
    impact: "Twin confidence 91%"
  }
];

const permissionRows = [
  ["Employee", "Own twin, appointments, messages, goals", "Can approve expert access"],
  ["Doctor", "Medical summary, reports, prescriptions", "Can update diagnosis and care plan"],
  ["Nutritionist", "Nutrition, BMI, food logs, metabolic signals", "Can update meal plans"],
  ["Fitness Coach", "Activity, workouts, goals, body metrics", "Can update exercise plans"],
  ["Teacher", "Student twin, assignments, progress", "Can update learning plan"],
  ["HR/Admin", "Aggregated risk, adoption, billing", "No private clinical notes"]
];

const databaseTables = [
  "experts",
  "appointments",
  "prescriptions",
  "diet_plans",
  "workout_plans",
  "teacher_plans",
  "student_plans",
  "care_plans",
  "messages",
  "video_sessions",
  "notifications",
  "audit_logs",
  "progress_tracking",
  "compliance_tracking"
];

const apiSpecs = [
  ["POST", "/api/care-hub/expert-match", "Risk signals in, ranked expert recommendations out"],
  ["POST", "/api/care-hub/appointments", "Schedule video, chat, or in-person consultation"],
  ["PATCH", "/api/care-hub/twin-events", "Doctor, coach, teacher, or trainer updates twin state"],
  ["POST", "/api/care-hub/care-plans", "Create health, diet, workout, learning, or wellness plan"],
  ["GET", "/api/care-hub/timeline", "Return every report, note, prescription, and outcome event"],
  ["POST", "/api/care-hub/notifications", "Trigger reminders, goal events, risk changes, and messages"]
];

const portalCards = [
  {
    title: "Doctor Portal",
    icon: Stethoscope,
    actions: ["Add diagnosis", "Add prescriptions", "Request new tests", "Schedule follow-up", "Recommend specialists"]
  },
  {
    title: "Nutritionist Portal",
    icon: Salad,
    actions: ["Create meal plans", "Track compliance", "Assign hydration", "Set supplements", "Review reports"]
  },
  {
    title: "Fitness Coach Portal",
    icon: Dumbbell,
    actions: ["Assign workouts", "Track outcomes", "Set weekly goals", "Monitor mobility", "Update body metrics"]
  },
  {
    title: "Teacher Portal",
    icon: GraduationCap,
    actions: ["Create learning plans", "Upload assignments", "Add feedback", "Recommend courses", "Assign study goals"]
  }
];

function MetricCard({ label, value, trend, color }: { label: string; value: number; trend: string; color: string }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-graphite">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{value}<span className="text-sm text-graphite">/100</span></p>
        </div>
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <p className="mt-3 text-xs font-semibold text-graphite">{trend}</p>
    </article>
  );
}

function SectionHeader({ eyebrow, title, icon: Icon }: { eyebrow: string; title: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clinical">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold text-ink">{title}</h2>
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-clinical/10 text-clinical">
        <Icon size={21} />
      </span>
    </div>
  );
}

export default function CareHubPage() {
  return (
    <main className="min-h-screen bg-mist text-ink">
      <div className="flex">
        <aside className="hidden h-screen w-72 shrink-0 border-r border-ink/10 bg-white xl:sticky xl:top-0 xl:flex xl:flex-col">
          <div className="border-b border-ink/10 p-5">
            <a href="/employee-health-dashboard" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white">
                <HeartPulse size={20} />
              </span>
              <div>
                <p className="text-lg font-semibold text-ink">Care Hub</p>
                <p className="text-xs text-graphite">Living care ecosystem</p>
              </div>
            </a>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto p-3">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-graphite">Main Navigation</p>
            <div className="mt-3 space-y-1">
              {navigation.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    index === 0 ? "bg-ion text-white" : "text-graphite hover:bg-mist hover:text-ink"
                  }`}
                >
                  {index === 0 ? <Activity size={17} /> : <CheckCircle2 size={17} />}
                  {item}
                </a>
              ))}
            </div>
          </nav>
          <div className="border-t border-ink/10 p-4">
            <div className="rounded-lg bg-ink p-4 text-white">
              <p className="text-sm font-semibold">Event-driven sync</p>
              <p className="mt-2 text-xs leading-5 text-white/70">
                Every expert action writes a twin event, recalculates risk, and updates goals.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clinical">NeuroMirror Care Ecosystem</p>
                <h1 className="text-2xl font-semibold text-ink">CARE HUB</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a href="/employee-health-dashboard" className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">
                  Employee Twin
                </a>
                <button className="inline-flex items-center gap-2 rounded-full bg-ion px-4 py-2 text-sm font-semibold text-white">
                  <CalendarClock size={16} /> Book Expert
                </button>
              </div>
            </div>
          </header>

          <section id="dashboard" className="mx-auto max-w-[1680px] space-y-5 p-4 lg:p-6">
            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase text-clinical">After AI analysis</p>
                    <h2 className="mt-2 text-4xl font-semibold text-ink sm:text-5xl">From prediction to expert-guided outcomes.</h2>
                    <p className="mt-4 text-sm leading-6 text-graphite">
                      The employee uploads reports, the twin detects risks, Care Hub recommends qualified experts, and every consultation updates the living profile.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Risk detection", "Expert matching", "Consultation", "Care plan", "Progress tracking", "Twin sync"].map((step) => (
                        <span key={step} className="rounded-full bg-mist px-3 py-2 text-xs font-semibold text-ink">
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-mist p-4">
                    <p className="text-sm font-semibold text-ink">Live risk trajectory</p>
                    <div className="mt-4 h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={riskData}>
                          <CartesianGrid stroke="#dbe7e4" vertical={false} />
                          <XAxis dataKey="week" stroke="#647176" />
                          <YAxis stroke="#647176" />
                          <Tooltip />
                          <Area type="monotone" dataKey="diabetes" stroke="#0f766e" fill="#0f766e" fillOpacity={0.16} />
                          <Area type="monotone" dataKey="sleep" stroke="#2f6fed" fill="#2f6fed" fillOpacity={0.12} />
                          <Area type="monotone" dataKey="stress" stroke="#e2495d" fill="#e2495d" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="AI Expert Matching" title="Recommended care team" icon={Sparkles} />
                <div className="mt-5 space-y-3">
                  {experts.slice(0, 3).map((expert) => {
                    const Icon = expert.icon;
                    return (
                      <article key={expert.name} className="rounded-lg border border-ink/10 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex gap-3">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-clinical/10 text-clinical">
                              <Icon size={20} />
                            </span>
                            <div>
                              <p className="font-semibold text-ink">{expert.name}</p>
                              <p className="text-sm text-graphite">{expert.role} - {expert.mode}</p>
                            </div>
                          </div>
                          <span className="rounded-full bg-ion/10 px-3 py-1 text-xs font-semibold text-ion">{expert.match}% match</span>
                        </div>
                        <p className="mt-3 text-xs font-semibold text-graphite">Next slot: {expert.next}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {healthSignals.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>

            <section id="experts" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <SectionHeader eyebrow="Expert Marketplace" title="Discover qualified professionals" icon={Search} />
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {expertCategories.map((category, index) => (
                  <button
                    key={category}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                      index === 0 ? "bg-ink text-white" : "bg-mist text-graphite"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {experts.map((expert) => {
                  const Icon = expert.icon;
                  return (
                    <article key={expert.name} className="rounded-lg border border-ink/10 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-lg bg-mist text-clinical">
                          <Icon size={22} />
                        </span>
                        <span className="rounded-full bg-clinical/10 px-3 py-1 text-xs font-semibold text-clinical">{expert.rating} rating</span>
                      </div>
                      <h3 className="mt-4 font-semibold text-ink">{expert.name}</h3>
                      <p className="text-sm text-graphite">{expert.role}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {expert.focus.map((focus) => (
                          <span key={focus} className="rounded bg-mist px-2 py-1 text-xs font-semibold text-graphite">
                            {focus}
                          </span>
                        ))}
                      </div>
                      <button className="mt-4 w-full rounded-full bg-ion px-4 py-2 text-sm font-semibold text-white">View Profile</button>
                    </article>
                  );
                })}
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <section id="appointments" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="Appointment System" title="Consultations and reminders" icon={CalendarClock} />
                <div className="mt-5 space-y-3">
                  {appointments.map(([day, time, title, mode, task]) => (
                    <article key={`${day}-${title}`} className="flex gap-3 rounded-lg bg-mist p-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-ion">
                        {mode.includes("Video") ? <Video size={20} /> : <CalendarClock size={20} />}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{title}</p>
                        <p className="text-sm text-graphite">{day}, {time} - {mode}</p>
                        <p className="mt-1 text-xs font-semibold text-clinical">{task}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="care-plans" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="Care Plan Engine" title="Plans that continuously update the twin" icon={ClipboardList} />
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {carePlans.map((plan) => (
                    <article key={plan.title} className="rounded-lg border border-ink/10 p-4">
                      <p className="font-semibold text-ink">{plan.title}</p>
                      <p className="mt-1 text-sm text-graphite">{plan.owner}</p>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist">
                        <div className="h-full rounded-full bg-clinical" style={{ width: `${plan.progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-clinical">{plan.progress}% complete - {plan.status}</p>
                      <div className="mt-3 space-y-2">
                        {plan.tasks.map((task) => (
                          <p key={task} className="rounded bg-mist px-3 py-2 text-xs font-semibold text-graphite">{task}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section id="progress-tracking" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <SectionHeader eyebrow="Progress Tracking" title="Outcome measurement across plans" icon={Activity} />
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={outcomeData}>
                    <CartesianGrid stroke="#dbe7e4" vertical={false} />
                    <XAxis dataKey="metric" stroke="#647176" />
                    <YAxis stroke="#647176" />
                    <Tooltip />
                    <Bar dataKey="current" fill="#2f6fed" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="target" fill="#0f766e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section id="my-digital-twin" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <SectionHeader eyebrow="Digital Twin Timeline" title="Every expert action becomes a twin event" icon={Network} />
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4">
                  {timeline.map((event) => (
                    <article key={`${event.time}-${event.title}`} className="flex gap-3 rounded-lg border border-ink/10 p-4">
                      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-clinical/10 text-clinical">
                        <FileText size={18} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-graphite">{event.time} - {event.actor}</p>
                        <p className="font-semibold text-ink">{event.title}</p>
                        <p className="mt-1 text-sm leading-6 text-graphite">{event.detail}</p>
                        <p className="mt-2 text-xs font-semibold text-ion">{event.impact}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="rounded-lg bg-ink p-5 text-white">
                  <p className="text-sm font-semibold">Critical sync rule</p>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    Doctor adds diagnosis, nutritionist changes diet, trainer assigns workout, or teacher adds feedback. The event updates the correct twin, recalculates risk, updates recommendations, and writes an audit log.
                  </p>
                  <div className="mt-5 space-y-2 text-xs font-semibold text-white/80">
                    {["twin.event.created", "risk.model.recalculated", "recommendation.updated", "goal.generated", "notification.sent"].map((event) => (
                      <p key={event} className="rounded bg-white/10 px-3 py-2">{event}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-2">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="Role Dashboards" title="Expert workspaces" icon={Users} />
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {portalCards.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <article key={portal.title} className="rounded-lg border border-ink/10 p-4">
                        <Icon className="text-clinical" size={22} />
                        <p className="mt-3 font-semibold text-ink">{portal.title}</p>
                        <div className="mt-3 space-y-2">
                          {portal.actions.map((action) => (
                            <p key={action} className="text-xs font-semibold text-graphite">{action}</p>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section id="messages" className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="Notification Engine" title="Care updates and secure messages" icon={Bell} />
                <div className="mt-5 space-y-3">
                  {[
                    ["Prescription updated", "Doctor changed Vitamin D schedule", "Push + email"],
                    ["Appointment reminder", "Endocrinology consult starts in 2 hours", "SMS + app"],
                    ["Goal achieved", "8k steps completed 5 days in a row", "App"],
                    ["Risk score changed", "Diabetes risk reduced after plan adherence", "App + care team"]
                  ].map(([title, detail, channel]) => (
                    <article key={title} className="flex items-center justify-between gap-3 rounded-lg bg-mist p-4">
                      <div className="flex items-center gap-3">
                        <MessageSquareText className="text-ion" size={19} />
                        <div>
                          <p className="font-semibold text-ink">{title}</p>
                          <p className="text-sm text-graphite">{detail}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-graphite">{channel}</span>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
              <SectionHeader eyebrow="Student, Gym, Family Extensions" title="Additional digital twin products" icon={UserRound} />
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  ["Student Digital Twin", "Report cards, attendance, projects, exam scores, learning gaps, career paths, mentor and teacher recommendations.", GraduationCap],
                  ["Gym Digital Twin", "Weight, body fat, muscle mass, workouts, calories, supplements, trainer programs, and fitness goals.", Dumbbell],
                  ["Family Care", "Parent access, dependent profiles, emergency profile, insurance partner workflows, and shared appointments.", Users]
                ].map(([title, detail, Icon]) => {
                  const IconComponent = Icon as LucideIcon;
                  return (
                    <article key={title as string} className="rounded-lg border border-ink/10 p-4">
                      <IconComponent className="text-clinical" size={23} />
                      <p className="mt-3 font-semibold text-ink">{title as string}</p>
                      <p className="mt-2 text-sm leading-6 text-graphite">{detail as string}</p>
                    </article>
                  );
                })}
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="Permissions Matrix" title="Least-privilege access model" icon={LockKeyhole} />
                <div className="mt-5 overflow-hidden overflow-x-auto rounded-lg border border-ink/10">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-mist text-xs uppercase text-graphite">
                      <tr>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Access</th>
                        <th className="px-4 py-3">Permission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10">
                      {permissionRows.map(([role, access, permission]) => (
                        <tr key={role}>
                          <td className="px-4 py-3 font-semibold text-ink">{role}</td>
                          <td className="px-4 py-3 text-graphite">{access}</td>
                          <td className="px-4 py-3 text-graphite">{permission}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
                <SectionHeader eyebrow="User Types" title="Supported ecosystem roles" icon={ShieldCheck} />
                <div className="mt-5 flex flex-wrap gap-2">
                  {userTypes.map((type) => (
                    <span key={type} className="rounded-full bg-mist px-3 py-2 text-sm font-semibold text-graphite">
                      {type}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline xl:col-span-1">
                <SectionHeader eyebrow="Database Design" title="Core tables" icon={Database} />
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {databaseTables.map((table) => (
                    <p key={table} className="rounded bg-mist px-3 py-2 text-xs font-semibold text-graphite">{table}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline xl:col-span-2">
                <SectionHeader eyebrow="API Specifications" title="Care Hub service contracts" icon={Network} />
                <div className="mt-5 space-y-2">
                  {apiSpecs.map(([method, path, detail]) => (
                    <div key={path} className="grid gap-3 rounded-lg bg-mist p-3 text-sm md:grid-cols-[80px_260px_1fr]">
                      <span className="font-semibold text-clinical">{method}</span>
                      <span className="font-semibold text-ink">{path}</span>
                      <span className="text-graphite">{detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-hairline">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">VC fundable product blueprint</p>
                  <h2 className="mt-1 text-2xl font-semibold">A care operating system for employees, students, families, gyms, schools, and providers.</h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70">
                    Care Hub moves NeuroMirror from insight generation into a marketplace, outcomes, subscriptions, multi-role workflows, and continuously learning digital twins.
                  </p>
                </div>
                <button className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-ink">
                  <Sparkles size={18} /> Ready for API buildout
                </button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
