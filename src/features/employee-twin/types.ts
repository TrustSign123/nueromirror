export type OrganId = "brain" | "heart" | "liver" | "kidney" | "lungs" | "sleep" | "stress" | "metabolism";

export type RiskLevel = "Low" | "Medium" | "High" | "Needs Care";
export type BiomarkerStatus = "Normal" | "Low" | "Borderline" | "High";

export type OrganScore = {
  id: OrganId;
  name: string;
  score: number;
  risk: RiskLevel;
  trend: "Improving" | "Stable" | "Declining";
  change: number;
  color: string;
  analysis: string;
  prediction: string;
  recommendations: string[];
  history: Array<{ month: string; score: number }>;
};

export type RiskPrediction = {
  name: string;
  risk: number;
  level: RiskLevel;
  trend: "Improving" | "Stable" | "Rising";
  prediction: string;
  action: string;
  data: Array<{ month: string; risk: number }>;
};

export type Biomarker = {
  name: string;
  value: string;
  status: BiomarkerStatus;
  unit: string;
  data: Array<{ month: string; value: number }>;
};

export type BiomarkerUpdate = {
  name: string;
  value: string;
  unit?: string;
  status?: BiomarkerStatus;
  note?: string;
};

export type ReportAnalysisResult = {
  fileName?: string;
  fileId?: string;
  vectorStoreId?: string;
  isRelevant: boolean;
  relevanceReason: string;
  summary: string;
  biomarkers: BiomarkerUpdate[];
  organInsights: Array<{
    organ: string;
    score?: number;
    risk?: string;
    insight: string;
  }>;
  recommendations: string[];
};

export type Recommendation = {
  title: string;
  expectedImpact: "Low" | "Medium" | "High";
  difficulty: "Easy" | "Medium" | "Hard";
  improvement: string;
  category: string;
};

export type TimelineEvent = {
  date: string;
  title: string;
  type: "Report Upload" | "Doctor Visit" | "Medication Change" | "Weight Change" | "Health Event";
  detail: string;
};

export type SimulationInput = {
  weight: number;
  sleep: number;
  exercise: number;
  calories: number;
  smoking: number;
  alcohol: number;
  stress: number;
};

export type UploadStep = "Upload Report" | "OCR Extract" | "Extract Biomarkers" | "Update Dashboard" | "Update Organ Scores" | "Update Risks" | "Generate AI Summary";
