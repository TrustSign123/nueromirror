import {
  Activity,
  Bell,
  Brain,
  Building2,
  CalendarCheck,
  ChartNoAxesCombined,
  CreditCard,
  HeartPulse,
  Hospital,
  Landmark,
  Link2,
  LockKeyhole,
  Mail,
  MessageCircle,
  Microscope,
  QrCode,
  Rocket,
  School,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserPlus,
  Users,
  Dumbbell,
  GraduationCap
} from "lucide-react";

export const navItems = [
  "Home",
  "Platform",
  "SaaS Operations",
  "Digital Twin",
  "AI Copilot",
  "Solutions",
  "Pricing",
  "Security",
  "Book Demo"
];

export const organs = [
  {
    id: "heart",
    label: "Heart",
    score: 72,
    trend: "+4.8%",
    risk: "Moderate",
    insight: "Weight reduction of 8 kg lowers modeled cardiac risk by 31%.",
    color: "#e2495d"
  },
  {
    id: "brain",
    label: "Brain",
    score: 84,
    trend: "+7.1%",
    risk: "Low",
    insight: "Sleep consistency is improving stress resilience and focus windows.",
    color: "#2f6fed"
  },
  {
    id: "lungs",
    label: "Lungs",
    score: 79,
    trend: "+2.4%",
    risk: "Low",
    insight: "VO2 max gains suggest better recovery after zone-two training.",
    color: "#0f766e"
  },
  {
    id: "liver",
    label: "Liver",
    score: 68,
    trend: "-1.8%",
    risk: "Watch",
    insight: "ALT drift and triglycerides indicate a metabolic load pattern.",
    color: "#a26814"
  },
  {
    id: "kidney",
    label: "Kidney",
    score: 88,
    trend: "+1.2%",
    risk: "Low",
    insight: "Hydration and eGFR stability are within expected clinical range.",
    color: "#6d5dfc"
  },
  {
    id: "metabolism",
    label: "Metabolism",
    score: 64,
    trend: "+9.0%",
    risk: "Elevated",
    insight: "HbA1c and fasting insulin improve with higher protein breakfast.",
    color: "#d97706"
  },
  {
    id: "sleep",
    label: "Sleep",
    score: 76,
    trend: "+11%",
    risk: "Moderate",
    insight: "A 45-minute earlier bedtime improves next-day HRV projection.",
    color: "#5b6ee1"
  },
  {
    id: "stress",
    label: "Stress",
    score: 58,
    trend: "-6.2%",
    risk: "Elevated",
    insight: "Meeting density predicts afternoon cortisol-risk spikes.",
    color: "#db2777"
  }
];

export const customerSegments = [
  {
    name: "Corporates",
    icon: Building2,
    headline: "Population health intelligence without individual exposure.",
    metrics: ["Burnout risk", "Sleep deficiency", "Wellness ROI", "Insurance analytics"],
    privacy: "HR sees aggregate anonymized cohorts only."
  },
  {
    name: "Universities",
    icon: GraduationCap,
    headline: "Campus wellness signals tied to stress, sleep, and academic strain.",
    metrics: ["Mental wellness", "Fitness", "Nutrition", "Risk alerts"],
    privacy: "Population analytics are anonymous by default."
  },
  {
    name: "Schools",
    icon: School,
    headline: "Student health trends for nurses, teachers, parents, and admins.",
    metrics: ["BMI trends", "Attendance correlation", "Nutrition", "Sports participation"],
    privacy: "Sensitive records require authorized clinical roles."
  },
  {
    name: "Gyms",
    icon: Dumbbell,
    headline: "Performance twins for members, trainers, and gym operators.",
    metrics: ["Body fat", "Muscle mass", "VO2 max", "Recovery"],
    privacy: "Members control trainer visibility."
  },
  {
    name: "Hospitals",
    icon: Hospital,
    headline: "Clinical timelines, doctor copilots, and operational command centers.",
    metrics: ["AI summary", "Treatment simulation", "Bed utilization", "Outcomes"],
    privacy: "Role-based clinical access with audit trails."
  },
  {
    name: "Insurance",
    icon: ShieldCheck,
    headline: "Risk intelligence and preventive engagement for covered lives.",
    metrics: ["Risk evolution", "Program adherence", "Claims trends", "Care gaps"],
    privacy: "Underwriting access is governed by consent and policy."
  },
  {
    name: "Individuals",
    icon: HeartPulse,
    headline: "A personal digital twin that explains health, habits, and risk.",
    metrics: ["Reports", "Wearables", "Family history", "Prevention plan"],
    privacy: "The member owns granular sharing permissions."
  },
  {
    name: "Government",
    icon: Landmark,
    headline: "Public health programs with regional trends and intervention planning.",
    metrics: ["Screening coverage", "Chronic risk", "Program impact", "Equity gaps"],
    privacy: "De-identified analytics support population decisions."
  }
];

export const uploadStates = [
  "Empty",
  "Drag & Drop",
  "Uploading",
  "OCR Extraction",
  "AI Analysis",
  "Score Update",
  "Twin Recalculation",
  "Success",
  "Failure",
  "Timeline Refresh"
];

export const pages = [
  "Home",
  "About",
  "Platform",
  "Health Digital Twin",
  "AI Health Copilot",
  "Corporate Wellness",
  "University Health Intelligence",
  "School Student Health",
  "Gym Performance Twin",
  "Hospital Digital Twin",
  "Insurance Risk Intelligence",
  "Pricing",
  "Case Studies",
  "Blog",
  "Book Demo",
  "Contact",
  "Login"
];

export const agents = [
  { name: "Report Analysis Agent", role: "Extracts labs, radiology, medications, diagnoses, and missing context." },
  { name: "Risk Prediction Agent", role: "Models chronic, cardiovascular, metabolic, mental health, and claims risk." },
  { name: "Organ Simulation Agent", role: "Projects organ-level response to weight, sleep, exercise, and medication changes." },
  { name: "Nutrition Agent", role: "Builds culturally aware meal interventions from biomarkers and preferences." },
  { name: "Exercise Agent", role: "Adapts workouts to recovery, VO2 max, joint load, and goals." },
  { name: "Mental Health Agent", role: "Detects burnout and stress patterns while escalating crisis signals." },
  { name: "Doctor Copilot Agent", role: "Produces clinical summaries, visit prep, and longitudinal patient timelines." },
  { name: "Insurance Agent", role: "Explains risk movement, care gaps, engagement, and cohort economics." },
  { name: "Clinical Recommendation Agent", role: "Grounds suggestions in guidelines, safety checks, and care-team review." }
];

export const graphs = [
  "Organ Health Trends",
  "Risk Evolution",
  "Prediction Curves",
  "Population Analytics",
  "Burnout Heatmaps",
  "Sleep Analysis",
  "Metabolic Trends",
  "Wearable Dashboards"
];

export const architectureCards = [
  {
    icon: Microscope,
    title: "RAG Medical Intelligence",
    body: "Clinical guidelines, research papers, hospital documents, and patient records flow into vector search with source-level grounding."
  },
  {
    icon: Sparkles,
    title: "LangGraph Agent Mesh",
    body: "Specialized agents plan, retrieve, simulate, critique, and hand off to clinical or enterprise workflows."
  },
  {
    icon: LockKeyhole,
    title: "Trust Boundary",
    body: "Consent, de-identification, RBAC, ABAC, tenant isolation, audit logs, and policy enforcement protect every data path."
  },
  {
    icon: ChartNoAxesCombined,
    title: "Twin Simulation Layer",
    body: "Biomarkers, wearables, lifestyle, medications, imaging, and family history update organ models and predictions."
  }
];

export const priceTiers = [
  { name: "Individual", price: "$19", fit: "Personal twin and AI copilot", cta: "Start" },
  { name: "Clinic", price: "$249", fit: "Doctors, care teams, and patient timelines", cta: "Evaluate" },
  { name: "Enterprise", price: "Custom", fit: "Corporates, insurers, hospitals, campuses", cta: "Book Demo" }
];

export const workflow = [
  { label: "Upload", description: "Reports, scans, wearables, history, lifestyle, medications, allergies." },
  { label: "Extract", description: "OCR, parsers, imaging metadata, normalization, duplicate detection." },
  { label: "Reason", description: "RAG, agents, guideline checks, longitudinal comparison, risk scoring." },
  { label: "Simulate", description: "Organ scores update and project effects of behavior or care changes." },
  { label: "Act", description: "Member plan, doctor summary, admin dashboard, alerts, notifications." }
];

export const apiSurface = [
  "POST /api/reports/upload",
  "GET /api/members/:id/twin",
  "POST /api/simulations/organ-impact",
  "POST /api/copilot/chat",
  "GET /api/cohorts/:id/analytics",
  "POST /api/consent/grants",
  "GET /api/audit/events",
  "POST /api/agents/run"
];

export const onboardingSteps = [
  {
    title: "Organization Info",
    fields: ["Organization name", "Industry", "Location", "Website", "User count"],
    detail: "Capture tenant type, operating scale, and regional compliance needs."
  },
  {
    title: "Subscription",
    fields: ["Starter", "Growth", "Enterprise", "Custom"],
    detail: "Map pricing, user limits, AI capacity, integrations, and support tier."
  },
  {
    title: "Payment",
    fields: ["Credit card", "UPI", "Bank transfer", "Invoice"],
    detail: "Confirm billing entity, tax profile, purchase order, and renewal policy."
  },
  {
    title: "Admin Setup",
    fields: ["Name", "Email", "Phone", "Role"],
    detail: "Create the first organization owner and enforce MFA before launch."
  },
  {
    title: "Launch Tenant",
    fields: ["Dashboard", "Tenant URL", "Security policy", "Invite users"],
    detail: "Provision isolated data, dashboards, policies, and subdomain."
  }
];

export const tenantStats = [
  { label: "Total Users", value: "12,480", delta: "+18%" },
  { label: "Invited Users", value: "10,920", delta: "+41%" },
  { label: "Active Users", value: "8,406", delta: "+23%" },
  { label: "Participation", value: "76%", delta: "+9%" },
  { label: "Avg Health Score", value: "82", delta: "+4" },
  { label: "High Risk", value: "11%", delta: "-3%" },
  { label: "Pending Reports", value: "394", delta: "-12%" },
  { label: "Active Programs", value: "18", delta: "+6" }
];

export const invitationChannels = [
  { name: "Email", icon: Mail, status: "Delivered 94%" },
  { name: "SMS", icon: MessageCircle, status: "Opened 63%" },
  { name: "WhatsApp", icon: MessageCircle, status: "Registered 48%" },
  { name: "QR Code", icon: QrCode, status: "Scanned 1,284" },
  { name: "Magic Link", icon: Link2, status: "Completed 52%" },
  { name: "SSO", icon: ShieldCheck, status: "Connected" }
];

export const integrationSources = [
  "Single user",
  "CSV upload",
  "Excel upload",
  "HRIS",
  "ERP",
  "Student management",
  "Hospital management",
  "Gym CRM"
];

export const rolePermissions = [
  { role: "Super Admin", permissions: ["Tenants", "Billing", "Policies", "Audit"] },
  { role: "Organization Owner", permissions: ["Users", "Programs", "Insights", "Integrations"] },
  { role: "HR Admin", permissions: ["Invitations", "Cohorts", "Programs", "No reports"] },
  { role: "Doctor", permissions: ["Patients", "Reports", "Copilot", "Care plans"] },
  { role: "Trainer", permissions: ["Members", "Fitness", "Recovery", "Plans"] },
  { role: "Teacher", permissions: ["Class trends", "Attendance", "No medical reports"] },
  { role: "Parent", permissions: ["Own child", "Wellness", "Reports by consent"] },
  { role: "Insurance Analyst", permissions: ["Population risk", "Claims trends", "No private records"] }
];

export const marketplacePartners = [
  { name: "Doctors", icon: Stethoscope, action: "Book consults" },
  { name: "Nutritionists", icon: HeartPulse, action: "Sponsor diet plans" },
  { name: "Fitness Coaches", icon: Dumbbell, action: "Assign coaching" },
  { name: "Mental Health Experts", icon: Brain, action: "Route support" },
  { name: "Diagnostic Labs", icon: Microscope, action: "Order tests" },
  { name: "Insurance Providers", icon: ShieldCheck, action: "Connect plans" },
  { name: "Hospitals", icon: Hospital, action: "Refer patients" },
  { name: "Pharmacies", icon: CreditCard, action: "Medication support" }
];

export const wellnessPrograms = [
  { name: "Diabetes Prevention", target: "500 high-risk employees", metric: "A1c risk -14%" },
  { name: "Sleep Improvement", target: "2,100 poor sleepers", metric: "Sleep score +11" },
  { name: "Stress Reduction", target: "860 burnout-risk users", metric: "Burnout risk -18%" },
  { name: "Heart Health", target: "1,240 cardio-risk users", metric: "Risk -9%" }
];

export const alertTypes = [
  { name: "Employee Risk Alert", icon: Bell },
  { name: "Doctor Alert", icon: Stethoscope },
  { name: "Program Alert", icon: Rocket },
  { name: "Insurance Alert", icon: ShieldCheck },
  { name: "Wearable Alert", icon: Activity },
  { name: "Appointment Reminder", icon: CalendarCheck }
];

export const twinLifecycle = [
  "User joins",
  "Uploads data",
  "Twin created",
  "Twin learns",
  "Predictions generated",
  "Programs assigned",
  "Health improves",
  "Twin updates"
];

export const iconMap = {
  Activity,
  Brain,
  Stethoscope,
  UserPlus,
  Users
};
