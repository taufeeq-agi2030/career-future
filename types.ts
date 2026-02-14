
export type UserRole = 'GUEST' | 'MEMBER' | 'STRATEGIST';

export interface UserAuth {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isAuthenticated: boolean;
  token?: string;
  lastLogin: Date;
  permissions: string[];
}

export interface EngagementPulse {
  score: number; // 0-100
  streak: number;
  totalReflections: number;
  milestones: { id: string; label: string; date: Date; achieved: boolean }[];
  lastActivity: Date;
}

export interface GrowthMetrics {
  anxietyLevel: number; // 0-100
  confidenceLevel: number; // 0-100
  excitementScore: number; // 0-100
  adaptabilityIndex: number; // 0-100
  orchestrationSkill: number; // 0-100
  empathyLeverage: number; // 0-100
  ethicalJudgment: number; // 0-100
  strategicIntent: number; // 0-100
  techAwareness: number; // 0-100
  resilienceMoat: number; // 0-100
  topKeywords: string[];
  sentimentTrend: 'Improving' | 'Stable' | 'Volatile' | 'Declining';
}

export interface MarketSignal {
  id: string;
  title: string;
  description: string;
  impact: 'DISRUPTIVE' | 'ADAPTIVE' | 'NEUTRAL';
  timeToImpact: string; // e.g. "6-12 Months"
  sourceUrl: string;
  sourceTitle: string;
  recommendation: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  role: string;
  industry: string;
  yearsExperience: number;
  skills: string[];
  fears: string;
  expectations: string;
  willingnessToPivot: number;
  email?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  personalitySnapshot?: GrowthMetrics;
  engagement?: EngagementPulse;
}

export interface AIRole {
  id: string;
  name: string;
  category: string;
  evolvesFrom: string;
  description: string;
  responsibilities: string[];
  skills: { technical: string[], human: string[] };
  salaryBenchmark: string;
  resilienceScore: number;
  learningPath: { step: string, resource: string }[];
  quizQuestions: { question: string, options: string[], correctIndex: number }[];
}

export interface CareerDiscoveryReport {
  id: string;
  userId: string;
  targetRoles: {
    title: string;
    description: string;
    aiResilienceScore: number;
    adaptiveResilienceScore: number;
    salaryPremium: string;
    matchPercentage: number;
    criticalGaps: { skill: string; difficulty: 'High' | 'Medium' | 'Low'; resources: string[] }[];
    aiAdvantagePoints: {
      point: string;
      suggestedTools: string[];
      suggestedResources: string[];
    }[];
  }[];
  marketContext: string;
  confidenceScore: number;
  timestamp: Date;
}

export interface ProfessionalVision {
  id: string;
  userId: string;
  statement: string;
  northStar: string;
  directives: { title: string; timeframe: string; description: string; impact: string }[];
  values: ["AI-Complementary", "Uniquely-Human", "High-Value-Expertise", "Leadership"];
}

export interface CollabSkillsAnalysis {
  id: string;
  userId: string;
  curationScore: number; // 0-100
  humanAlphaGaps: string[];
  recommendedAgenticSkills: { skill: string; reason: string; priority: 'High' | 'Medium' | 'Low' }[];
  industryVerdict: string;
  timestamp: Date;
}

export interface StrategicTip {
  id: string;
  title: string;
  content: string;
  category: 'AI-Readiness' | 'Human-Alpha' | 'Market-Shift';
  actionLabel: string;
  timestamp: Date;
}

export interface VoiceReflectionAnalysis {
  id: string;
  userId: string;
  transcript: string;
  timestamp: Date;
  sentiment: string;
  sentimentScore: number;
  emotionalTone: { emotion: string; intensity: number; context: string }[];
  themes: { theme: string; relevance: number }[];
  moodEntry: { mood: string; energyLevel: number; confidenceLevel: number; stressLevel: number };
  attitudeShift: string;
  progressIndicators: string[];
  identifiedSkills: string[];
  planAdjustment: {
    priorityShift: string;
    newFocusArea: string;
    rationale: string;
    suggestedTaskUpdate: string;
  };
  refereeReport: {
    grade: 'S' | 'A' | 'B' | 'C';
    qualityScore: number;
    verdict: string;
  };
}

export type SubscriptionTier = 'Free' | 'Pro' | 'Team' | 'Organization';

export interface CareerAssessment {
  id: string;
  userId: string;
  riskScore: number; 
  riskCategory: RiskLevel;
  opportunityScore: number;
  analysis: string;
  automationTimeline: string;
  coolingStatus: {
    isCooling: boolean;
    declineRate: number; // % per year
    monthsToObsolescence: number;
  };
  timeToImpact: {
    critical: number; // months
    significant: number; // months
    moderate: number; // months
  };
  vulnerableTasks: {
    task: string;
    automationProbability: number;
    aiTools: string[];
    timeframe: number; // months
  }[];
  strengths: {
    name: string;
    category: 'AI-Complementary' | 'Uniquely-Human' | 'High-Value-Expertise' | 'Leadership';
    marketDemand: 'High' | 'Medium' | 'Low';
    resilienceScore: number;
    valueDelta: number; // % change in salary premium
    advantage: string;
  }[];
  weaknesses: {
    name: string;
    vulnerabilityLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    automationRisk: number;
    aiReplacement: string; // Document required field
    marketTrend: 'Declining' | 'Stable' | 'Growing';
    improvementPriority: number;
    urgentAction: string; // Document required field
    learningPath: string[]; // Document required field
    valueDelta: number; // % change (negative)
  }[];
  groundingSources: { title: string; uri: string }[];
  futureReadinessScore: number;
  aiCollabScore: number;
  aiCollabTestScore?: number;
  trajectories: { pathA: any; pathB: any };
  resumeAnalysis: any;
  timestamp: Date;
  trendingTools: {
    name: string;
    description: string;
    adoptionRate: number;
    category: string;
    masteryLevelRequired: string;
    impact: string;
    researchSource?: string;
    patentStatus?: string;
  }[];
  simulationChallenges: any[];
  radarThreats: any[];
  positioning: any;
  marketValue: any;
  peerPercentile?: number;
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SkillAudit {
  id: string;
  userId: string;
  month: string;
  tasks: { 
    id: string; 
    name: string; 
    details?: string; 
    type: 'MACHINE' | 'HUMAN'; 
    tool?: string; 
    kpi?: string; 
    delegationPriority?: string;
    halfLifeYears?: number; 
  }[];
  conductorScore: number;
  completedGuidelines: number[];
  timestamp: Date;
}

export enum ViewState {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  MARKET_TRENDS = 'MARKET_TRENDS',
  MARKET_PULSE = 'MARKET_PULSE',
  SKILLS_COMPARISON = 'SKILLS_COMPARISON',
  ROADMAP = 'ROADMAP',
  CHAT = 'CHAT',
  ASSESSMENT_CENTER = 'ASSESSMENT_CENTER',
  TAKE_ASSESSMENT = 'TAKE_ASSESSMENT',
  ACTION_PLAN = 'ACTION_PLAN',
  PROFILE = 'PROFILE',
  LEARNING_HUB = 'LEARNING_HUB',
  MENTOR_MATCH = 'MENTOR_MATCH',
  VOICE_REFLECTION = 'VOICE_REFLECTION',
  PROFESSIONAL_VISION = 'PROFESSIONAL_VISION',
  COLLAB_SKILLS_ASSESSMENT = 'COLLAB_SKILLS_ASSESSMENT',
  MONTHLY_AUDIT = 'MONTHLY_AUDIT',
  CAREER_DISCOVERY = 'CAREER_DISCOVERY',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ABOUT = 'ABOUT',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  QA_PROTOCOL = 'QA_PROTOCOL',
  SYSTEM_REPORT = 'SYSTEM_REPORT',
  EVOLUTION_RADAR = 'EVOLUTION_RADAR'
}

export interface Roadmap {
  id: string;
  userId: string;
  overallProgress: number;
  phases: {
    name: string;
    timeframe: "0-3 Months" | "3-6 Months" | "6-12 Months";
    objective: string;
    resilienceGain: number; // Projected % reduction in risk
    tasks: {
      title: string;
      category: string;
      difficulty: 'High' | 'Medium' | 'Low';
      resources: string[];
    }[];
  }[];
}

export interface ActionPlan {
  id: string;
  userId: string;
  phases: {
    name: string;
    weeks: {
      weekNumber: number;
      theme: string;
      milestone: string;
      tasks: {
        title: string;
        description: string;
        duration: string;
        priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
        proofOfProductivity: string;
      }[];
    }[];
  }[];
  overallProgress: number;
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: string;
  skill: string;
  level: string;
  link: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  specialty: string;
  bio: string;
  matchScore: number;
  availableSlots: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'alert' | 'update' | 'report';
  timestamp: Date;
  read: boolean;
}
