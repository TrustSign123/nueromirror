import {
  Activity,
  Building2,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  School,
  ShieldCheck,
  Users
} from "lucide-react";

export type DashboardTenant = "organization" | "school" | "university" | "gym";

export const testAccounts = [
  {
    tenant: "organization" as const,
    label: "Organization Owner",
    username: "org@neuromirror.test",
    password: "test123",
    icon: Building2
  },
  {
    tenant: "school" as const,
    label: "School Admin",
    username: "school@neuromirror.test",
    password: "test123",
    icon: School
  },
  {
    tenant: "university" as const,
    label: "University Wellness Team",
    username: "university@neuromirror.test",
    password: "test123",
    icon: GraduationCap
  },
  {
    tenant: "gym" as const,
    label: "Gym Owner",
    username: "gym@neuromirror.test",
    password: "test123",
    icon: Dumbbell
  }
];

export const dashboardProfiles = {
  organization: {
    title: "Organization Health Command Center",
    tenantUrl: "acme-health.neuromirror.ai",
    role: "Organization Owner",
    headline: "Bulk upload employees, send invitations, and track preventive health participation.",
    primaryAction: "Send 486 Employee Invitations",
    uploadLabel: "Upload employee file",
    acceptedFiles: ".csv, .xlsx, HRIS export, ERP export",
    stats: [
      ["Total Employees", "500"],
      ["Valid Records", "486"],
      ["Duplicate Rows", "9"],
      ["Missing Fields", "5"]
    ],
    previewColumns: ["Employee", "Email", "Department", "Status"],
    people: [
      ["Aarav Mehta", "aarav@acmehealth.com", "Product", "Ready"],
      ["Maya Rao", "maya@acmehealth.com", "People", "Ready"],
      ["Kabir Shah", "kabir@acmehealth.com", "Sales", "Ready"],
      ["Nisha Iyer", "nisha@acmehealth.com", "Finance", "Ready"],
      ["Rohan Singh", "rohan@acmehealth.com", "Operations", "Ready"]
    ],
    requirements: ["HR sees only cohort analytics", "No personal reports", "Consent before twin creation", "Department trends"],
    modules: [
      { name: "Employee Wellness", icon: Users, detail: "Participation, health score, burnout, and program adoption." },
      { name: "Insurance Analytics", icon: ShieldCheck, detail: "Risk movement, preventive savings, and claims trend signals." },
      { name: "Program ROI", icon: Activity, detail: "Measure impact of sleep, stress, diabetes, and heart programs." }
    ]
  },
  school: {
    title: "School Student Health Dashboard",
    tenantUrl: "greenwood-school.neuromirror.ai",
    role: "School Admin",
    headline: "Invite students and parents while protecting sensitive medical information.",
    primaryAction: "Send 1,240 Parent And Student Invites",
    uploadLabel: "Upload student roster",
    acceptedFiles: ".csv, .xlsx, student management export",
    stats: [
      ["Total Students", "1,240"],
      ["Parent Invites", "1,018"],
      ["Class Groups", "42"],
      ["Nurse Reviews", "76"]
    ],
    previewColumns: ["Student", "Guardian Email", "Class", "Status"],
    people: [
      ["Anaya Sharma", "parent.anaya@example.com", "Grade 8A", "Ready"],
      ["Vihaan Patel", "parent.vihaan@example.com", "Grade 7C", "Ready"],
      ["Sara Khan", "parent.sara@example.com", "Grade 9B", "Ready"],
      ["Ishaan Das", "parent.ishaan@example.com", "Grade 6A", "Ready"],
      ["Meera Jain", "parent.meera@example.com", "Grade 10D", "Ready"]
    ],
    requirements: ["Parents see only their child", "Teachers see class trends only", "Nurse role can review flagged cases", "Anonymous class health score"],
    modules: [
      { name: "Attendance Correlation", icon: School, detail: "Compare wellness trends with attendance and school nurse visits." },
      { name: "Nutrition Trends", icon: HeartPulse, detail: "Track BMI, meal program impact, and sports participation." },
      { name: "Parent Portal", icon: Users, detail: "Consent, child dashboard, reminders, and report uploads." }
    ]
  },
  university: {
    title: "University Health Intelligence",
    tenantUrl: "northstar-university.neuromirror.ai",
    role: "University Wellness Team",
    headline: "Launch campus wellness invitations and monitor anonymous student health trends.",
    primaryAction: "Send 8,900 Student Invitations",
    uploadLabel: "Upload student list",
    acceptedFiles: ".csv, .xlsx, student information system export",
    stats: [
      ["Total Students", "8,900"],
      ["Active Users", "5,640"],
      ["High Stress Cohorts", "18"],
      ["Wellness Programs", "11"]
    ],
    previewColumns: ["Student", "Email", "Program", "Status"],
    people: [
      ["Leah Thomas", "leah@northstar.edu", "Engineering", "Ready"],
      ["Omar Ali", "omar@northstar.edu", "Business", "Ready"],
      ["Priya Menon", "priya@northstar.edu", "Medicine", "Ready"],
      ["Ethan Brooks", "ethan@northstar.edu", "Arts", "Ready"],
      ["Nora Wilson", "nora@northstar.edu", "Science", "Ready"]
    ],
    requirements: ["Anonymous campus insights", "Mental wellness escalation", "Academic correlation by cohort", "Student-controlled sharing"],
    modules: [
      { name: "Stress And Sleep", icon: Activity, detail: "Detect exam-period stress, poor sleep, and recovery patterns." },
      { name: "Academic Correlation", icon: GraduationCap, detail: "Compare anonymized wellness trends with academic pressure." },
      { name: "Campus Programs", icon: HeartPulse, detail: "Route students to counseling, fitness, sleep, and nutrition programs." }
    ]
  },
  gym: {
    title: "Gym Owner Performance Dashboard",
    tenantUrl: "peakfit.neuromirror.ai",
    role: "Gym Owner",
    headline: "Invite members, connect trainers, and create member performance twins.",
    primaryAction: "Send 920 Member Invitations",
    uploadLabel: "Upload member list",
    acceptedFiles: ".csv, .xlsx, gym CRM export",
    stats: [
      ["Total Members", "920"],
      ["Trainer Assigned", "614"],
      ["Wearables Connected", "488"],
      ["Active Plans", "236"]
    ],
    previewColumns: ["Member", "Email", "Trainer", "Status"],
    people: [
      ["Dev Arora", "dev@peakfit.com", "Ritika", "Ready"],
      ["Elena Cruz", "elena@peakfit.com", "Manav", "Ready"],
      ["Samar Gill", "samar@peakfit.com", "Ritika", "Ready"],
      ["Aisha Noor", "aisha@peakfit.com", "Karan", "Ready"],
      ["Joel Fernandes", "joel@peakfit.com", "Manav", "Ready"]
    ],
    requirements: ["Members control trainer visibility", "Progress simulations", "Recovery and sleep tracking", "AI coach recommendations"],
    modules: [
      { name: "Member Digital Twin", icon: Dumbbell, detail: "Body fat, muscle mass, VO2 max, recovery, and workout progress." },
      { name: "Trainer Portal", icon: Users, detail: "Assigned members, program adherence, and coaching alerts." },
      { name: "AI Coach", icon: HeartPulse, detail: "Nutrition, workout, recovery, and goal-specific recommendations." }
    ]
  }
};
