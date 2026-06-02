import { Biomarker, OrganScore, Recommendation, RiskPrediction, TimelineEvent, UploadStep } from "./types";

export const employeeProfile = {
  name: "Rohit Kumar",
  employeeId: "EMP-2456",
  overallScore: 72,
  category: "Good",
  biologicalAge: 31,
  actualAge: 34,
  trend: "+8 points from last month",
  lastUpdated: "Today, 09:45 AM",
  stepsToday: 8432,
  sleepLastNight: "6h 45m",
  bodyWeight: "78.6 kg"
};

export const organScores: OrganScore[] = [
  {
    id: "brain",
    name: "Brain",
    score: 84,
    risk: "Low",
    trend: "Improving",
    change: 5,
    color: "#2563eb",
    analysis: "Focus, sleep rhythm, and stress recovery are trending in a healthy range.",
    prediction: "Maintaining sleep consistency may improve cognitive recovery by 7% over 90 days.",
    recommendations: ["Keep wake time consistent", "Add 10 minutes mindfulness", "Reduce late caffeine"],
    history: [
      { month: "Jan", score: 74 },
      { month: "Feb", score: 77 },
      { month: "Mar", score: 79 },
      { month: "Apr", score: 82 },
      { month: "May", score: 84 }
    ]
  },
  {
    id: "heart",
    name: "Heart",
    score: 72,
    risk: "Medium",
    trend: "Improving",
    change: 8,
    color: "#ef4444",
    analysis: "Heart score is improving, but weight and LDL still keep risk in the medium band.",
    prediction: "Reducing weight by 10 kg can lower projected heart risk from 22% to 11%.",
    recommendations: ["Walk 3000 more steps", "Zone 2 cardio 4x weekly", "Lower refined carbs"],
    history: [
      { month: "Jan", score: 61 },
      { month: "Feb", score: 64 },
      { month: "Mar", score: 67 },
      { month: "Apr", score: 70 },
      { month: "May", score: 72 }
    ]
  },
  {
    id: "liver",
    name: "Liver",
    score: 65,
    risk: "Needs Care",
    trend: "Stable",
    change: 2,
    color: "#f97316",
    analysis: "Liver enzymes are slightly elevated and match a fatty liver risk pattern.",
    prediction: "Lower alcohol, sugar, and weight can move liver score above 74 in 12 weeks.",
    recommendations: ["Reduce sugar", "Avoid alcohol 5 days weekly", "Add protein breakfast"],
    history: [
      { month: "Jan", score: 59 },
      { month: "Feb", score: 62 },
      { month: "Mar", score: 63 },
      { month: "Apr", score: 64 },
      { month: "May", score: 65 }
    ]
  },
  {
    id: "kidney",
    name: "Kidney",
    score: 88,
    risk: "Low",
    trend: "Stable",
    change: 1,
    color: "#0ea5e9",
    analysis: "Kidney markers are stable with healthy hydration and eGFR range.",
    prediction: "Current kidney risk remains low if blood pressure continues improving.",
    recommendations: ["Hydrate consistently", "Monitor BP weekly", "Limit high-sodium meals"],
    history: [
      { month: "Jan", score: 86 },
      { month: "Feb", score: 87 },
      { month: "Mar", score: 87 },
      { month: "Apr", score: 88 },
      { month: "May", score: 88 }
    ]
  },
  {
    id: "lungs",
    name: "Lungs",
    score: 86,
    risk: "Low",
    trend: "Improving",
    change: 4,
    color: "#0284c7",
    analysis: "Lung recovery and exercise tolerance are good.",
    prediction: "VO2 max can improve another 6% with consistent cardio volume.",
    recommendations: ["Add interval training", "Track resting heart rate", "Avoid smoke exposure"],
    history: [
      { month: "Jan", score: 79 },
      { month: "Feb", score: 80 },
      { month: "Mar", score: 82 },
      { month: "Apr", score: 84 },
      { month: "May", score: 86 }
    ]
  },
  {
    id: "sleep",
    name: "Sleep",
    score: 62,
    risk: "Medium",
    trend: "Declining",
    change: -3,
    color: "#6d5dfc",
    analysis: "Sleep duration is acceptable, but recovery and consistency are uneven.",
    prediction: "Moving bedtime 45 minutes earlier may raise sleep score by 9 points.",
    recommendations: ["Fixed bedtime", "No screens after 10 PM", "Morning sunlight"],
    history: [
      { month: "Jan", score: 70 },
      { month: "Feb", score: 68 },
      { month: "Mar", score: 66 },
      { month: "Apr", score: 65 },
      { month: "May", score: 62 }
    ]
  },
  {
    id: "stress",
    name: "Stress",
    score: 44,
    risk: "High",
    trend: "Declining",
    change: -7,
    color: "#db2777",
    analysis: "Stress load is high and likely affecting sleep and metabolic recovery.",
    prediction: "10-minute daily breathing practice can reduce burnout risk by 12%.",
    recommendations: ["Meditate 10 minutes", "Block focus time", "Reduce meeting density"],
    history: [
      { month: "Jan", score: 58 },
      { month: "Feb", score: 55 },
      { month: "Mar", score: 51 },
      { month: "Apr", score: 48 },
      { month: "May", score: 44 }
    ]
  },
  {
    id: "metabolism",
    name: "Metabolism",
    score: 58,
    risk: "Needs Care",
    trend: "Stable",
    change: 1,
    color: "#f59e0b",
    analysis: "HbA1c, triglycerides, and weight suggest metabolic risk needs attention.",
    prediction: "A 500 kcal deficit and exercise plan may improve score by 10 points.",
    recommendations: ["Protein-first meals", "Strength train 3x weekly", "Reduce sugary drinks"],
    history: [
      { month: "Jan", score: 53 },
      { month: "Feb", score: 55 },
      { month: "Mar", score: 56 },
      { month: "Apr", score: 57 },
      { month: "May", score: 58 }
    ]
  }
];

export const risks: RiskPrediction[] = [
  { name: "Diabetes Risk", risk: 12, level: "Medium", trend: "Improving", prediction: "Projected to 8% with 6 kg weight loss.", action: "Reduce sugar and increase strength training.", data: [{ month: "Jan", risk: 18 }, { month: "Feb", risk: 16 }, { month: "Mar", risk: 15 }, { month: "Apr", risk: 13 }, { month: "May", risk: 12 }] },
  { name: "Heart Disease Risk", risk: 22, level: "Medium", trend: "Improving", prediction: "Projected to 11% at 92 kg target weight.", action: "Walk 3000 more steps daily.", data: [{ month: "Jan", risk: 31 }, { month: "Feb", risk: 28 }, { month: "Mar", risk: 26 }, { month: "Apr", risk: 24 }, { month: "May", risk: 22 }] },
  { name: "Fatty Liver Risk", risk: 65, level: "High", trend: "Rising", prediction: "May improve to 38% with alcohol and sugar reduction.", action: "Start 12-week liver reset plan.", data: [{ month: "Jan", risk: 52 }, { month: "Feb", risk: 56 }, { month: "Mar", risk: 59 }, { month: "Apr", risk: 61 }, { month: "May", risk: 65 }] },
  { name: "Hypertension Risk", risk: 22, level: "Medium", trend: "Stable", prediction: "Projected stable if sodium is controlled.", action: "Track BP three times weekly.", data: [{ month: "Jan", risk: 23 }, { month: "Feb", risk: 22 }, { month: "Mar", risk: 24 }, { month: "Apr", risk: 22 }, { month: "May", risk: 22 }] },
  { name: "Obesity Risk", risk: 34, level: "Medium", trend: "Improving", prediction: "Projected 21% after 10 kg reduction.", action: "Calorie target and walking plan.", data: [{ month: "Jan", risk: 41 }, { month: "Feb", risk: 39 }, { month: "Mar", risk: 37 }, { month: "Apr", risk: 35 }, { month: "May", risk: 34 }] },
  { name: "Burnout Risk", risk: 48, level: "High", trend: "Rising", prediction: "May fall to 29% with sleep and stress plan.", action: "Meditation and meeting load reset.", data: [{ month: "Jan", risk: 34 }, { month: "Feb", risk: 38 }, { month: "Mar", risk: 42 }, { month: "Apr", risk: 45 }, { month: "May", risk: 48 }] },
  { name: "Sleep Disorder Risk", risk: 8, level: "Low", trend: "Stable", prediction: "Remains low with consistent bedtime.", action: "Keep sleep window stable.", data: [{ month: "Jan", risk: 10 }, { month: "Feb", risk: 9 }, { month: "Mar", risk: 8 }, { month: "Apr", risk: 9 }, { month: "May", risk: 8 }] }
];

export const biomarkers: Biomarker[] = [
  { name: "HbA1c", value: "5.7", unit: "%", status: "Normal", data: [{ month: "Jan", value: 6.1 }, { month: "Feb", value: 5.9 }, { month: "Mar", value: 5.8 }, { month: "Apr", value: 5.8 }, { month: "May", value: 5.7 }] },
  { name: "Vitamin D", value: "24", unit: "ng/mL", status: "Low", data: [{ month: "Jan", value: 18 }, { month: "Feb", value: 20 }, { month: "Mar", value: 21 }, { month: "Apr", value: 23 }, { month: "May", value: 24 }] },
  { name: "Vitamin B12", value: "450", unit: "pg/mL", status: "Normal", data: [{ month: "Jan", value: 380 }, { month: "Feb", value: 405 }, { month: "Mar", value: 420 }, { month: "Apr", value: 438 }, { month: "May", value: 450 }] },
  { name: "LDL", value: "118", unit: "mg/dL", status: "Borderline", data: [{ month: "Jan", value: 142 }, { month: "Feb", value: 136 }, { month: "Mar", value: 129 }, { month: "Apr", value: 122 }, { month: "May", value: 118 }] },
  { name: "HDL", value: "46", unit: "mg/dL", status: "Normal", data: [{ month: "Jan", value: 41 }, { month: "Feb", value: 42 }, { month: "Mar", value: 44 }, { month: "Apr", value: 45 }, { month: "May", value: 46 }] },
  { name: "Triglycerides", value: "165", unit: "mg/dL", status: "High", data: [{ month: "Jan", value: 201 }, { month: "Feb", value: 190 }, { month: "Mar", value: 181 }, { month: "Apr", value: 171 }, { month: "May", value: 165 }] },
  { name: "Blood Pressure", value: "126/84", unit: "mmHg", status: "Borderline", data: [{ month: "Jan", value: 134 }, { month: "Feb", value: 131 }, { month: "Mar", value: 129 }, { month: "Apr", value: 128 }, { month: "May", value: 126 }] },
  { name: "BMI", value: "27.4", unit: "", status: "Borderline", data: [{ month: "Jan", value: 29.1 }, { month: "Feb", value: 28.6 }, { month: "Mar", value: 28.1 }, { month: "Apr", value: 27.8 }, { month: "May", value: 27.4 }] },
  { name: "Weight", value: "78.6", unit: "kg", status: "Normal", data: [{ month: "Jan", value: 82.4 }, { month: "Feb", value: 81.1 }, { month: "Mar", value: 80.2 }, { month: "Apr", value: 79.3 }, { month: "May", value: 78.6 }] }
];

export const recommendations: Recommendation[] = [
  { title: "Walk 3000 More Steps", expectedImpact: "High", difficulty: "Easy", improvement: "+4", category: "Heart" },
  { title: "Improve Sleep By 1 Hour", expectedImpact: "High", difficulty: "Medium", improvement: "+6", category: "Sleep" },
  { title: "Reduce Sugar Intake", expectedImpact: "High", difficulty: "Medium", improvement: "+5", category: "Liver" },
  { title: "Meditate For 10 Minutes", expectedImpact: "Medium", difficulty: "Easy", improvement: "+3", category: "Stress" }
];

export const timeline: TimelineEvent[] = [
  { date: "Today", title: "Liver Function Test Uploaded", type: "Report Upload", detail: "ALT and triglycerides updated risk model." },
  { date: "20 May 2026", title: "Full Body Checkup", type: "Report Upload", detail: "CBC, HbA1c, lipid profile, LFT, KFT imported." },
  { date: "12 May 2026", title: "Weight Reduced", type: "Weight Change", detail: "Weight moved from 79.3 kg to 78.6 kg." },
  { date: "02 May 2026", title: "Doctor Consultation", type: "Doctor Visit", detail: "Doctor summary generated for metabolic risk follow-up." },
  { date: "18 Apr 2026", title: "Vitamin D Started", type: "Medication Change", detail: "Supplement plan added to recommendations." }
];

export const uploadSteps: UploadStep[] = [
  "Upload Report",
  "OCR Extract",
  "Extract Biomarkers",
  "Update Dashboard",
  "Update Organ Scores",
  "Update Risks",
  "Generate AI Summary"
];
