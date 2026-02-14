
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerAssessment, Roadmap, ActionPlan, LearningResource, Mentor, ProfessionalVision, CareerDiscoveryReport, CollabSkillsAnalysis } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateCollabSkillsQuestions(profile: UserProfile): Promise<any[]> {
  const ai = getAI();
  const prompt = `
    ACT AS: A Career Evolution Psychologist for the AI Era.
    CONTEXT: User is a ${profile.role} in the ${profile.industry} sector.
    TASK: Generate 6 diagnostic questions to measure readiness for shifting from execution to orchestration.
    JSON STRUCTURE:
    [{
      "id": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "intent": "string"
    }]
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  return JSON.parse(response.text);
}

export async function analyzeCollabSkills(profile: UserProfile, answers: any[]): Promise<CollabSkillsAnalysis> {
  const ai = getAI();
  const prompt = `Analyze diagnostic answers for a ${profile.role}. JSON format with curationScore, humanAlphaGaps, recommendedAgenticSkills, industryVerdict.`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });
  const data = JSON.parse(response.text);
  return { ...data, id: `COLLAB-${profile.id}`, userId: profile.userId, timestamp: new Date() };
}

export async function generateCareerAssessment(profile: UserProfile): Promise<CareerAssessment> {
  const ai = getAI();
  const prompt = `
    ACT AS: Senior AI Career Strategist.
    TASK: Generate a Phase 2 "Career Intelligence Report" for a ${profile.role} in ${profile.industry}.
    
    REQUIRED FORMULA FOR RISK:
    Automation Risk Score = (Task Automation Potential × 0.35) + (AI Tool Maturity × 0.25) + (Market Adoption Rate × 0.20) + (Skill Replaceability × 0.20).
    
    SPECIAL REQUIREMENTS (JOB SECURITY SOLUTION):
    1. AI Replacement Detection: For every weakness, name the specific AI/RPA tool replacing it.
    2. Urgent Action: Provide a 1-sentence IMMEDIATE action.
    3. Learning Path: Provide a 3-step learning path (e.g. "Week 1: X", "Week 2: Y").
    4. Strengths: Detail why it is AI-resistant and what the "Human Advantage" is.

    JSON STRUCTURE:
    {
      "riskScore": number (0-100),
      "riskCategory": "Low"|"Medium"|"High"|"Critical",
      "coolingStatus": { "isCooling": boolean, "declineRate": number, "monthsToObsolescence": number },
      "timeToImpact": { "critical": number, "significant": number, "moderate": number },
      "vulnerableTasks": [{ "task": "string", "automationProbability": number, "aiTools": ["string"], "timeframe": number }],
      "strengths": [{ "name": "string", "category": "AI-Complementary"|"Uniquely-Human"|"High-Value-Expertise"|"Leadership", "marketDemand": "High"|"Medium"|"Low", "resilienceScore": number, "valueDelta": number, "advantage": "string" }],
      "weaknesses": [{ "name": "string", "vulnerabilityLevel": "Critical"|"High"|"Medium"|"Low", "automationRisk": number, "aiReplacement": "string", "marketTrend": "Declining"|"Stable"|"Growing", "improvementPriority": number, "urgentAction": "string", "learningPath": ["string"], "valueDelta": number }],
      "futureReadinessScore": number,
      "aiCollabScore": number,
      "trajectories": { "pathA": {}, "pathB": {} },
      "marketValue": { "currency": "USD", "min": number, "max": number },
      "trendingTools": [{ "name": "string", "description": "string", "adoptionRate": number, "category": "string", "masteryLevelRequired": "string", "impact": "string", "researchSource": "string", "patentStatus": "string" }],
      "simulationChallenges": [],
      "radarThreats": [],
      "positioning": {},
      "resumeAnalysis": {}
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { tools: [{ googleSearch: {} }], responseMimeType: 'application/json' },
  });

  const data = JSON.parse(response.text);
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const groundingSources = groundingChunks
    .filter((chunk: any) => chunk.web)
    .map((chunk: any) => ({
      title: chunk.web.title || 'Market Source',
      uri: chunk.web.uri || ''
    }));

  return { ...data, id: `ASMT-${profile.id}`, userId: profile.userId, groundingSources, timestamp: new Date() };
}

export async function generateCareerDiscovery(profile: UserProfile, assessment: CareerAssessment): Promise<CareerDiscoveryReport> {
  const ai = getAI();
  const prompt = `
    ACT AS: Strategic Career Discovery Agent.
    CONTEXT: ${profile.role} in ${profile.industry}. Current Career Risk: ${assessment.riskScore}%.
    USER SKILLS: ${profile.skills.join(', ')}.
    TASK: Generate a Career Discovery Report in JSON format with 3 specific target roles that represent high-value, AI-resilient career pivots for this user.
    
    SPECIAL CALCULATION: For each role, provide an "adaptiveResilienceScore" (0-100). 
    This MUST be calculated based on:
    1. The synergy between the User's current skills and the role's requirements.
    2. The role's inherent human-alpha advantages (judgment, empathy, leadership).
    
    JSON STRUCTURE:
    {
      "targetRoles": [{
        "title": "string",
        "description": "string",
        "aiResilienceScore": number,
        "adaptiveResilienceScore": number,
        "salaryPremium": "string",
        "matchPercentage": number,
        "criticalGaps": [{ "skill": "string", "difficulty": "High"|"Medium"|"Low", "resources": ["string"] }],
        "aiAdvantagePoints": [{ "point": "string", "suggestedTools": ["string"], "suggestedResources": ["string"] }]
      }],
      "marketContext": "string",
      "confidenceScore": number
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { 
      tools: [{ googleSearch: {} }],
      responseMimeType: 'application/json' 
    },
  });

  const data = JSON.parse(response.text);
  return { 
    ...data, 
    id: `DISC-${profile.id}`, 
    userId: profile.userId, 
    timestamp: new Date() 
  };
}

export async function generateUpskillingRoadmap(profile: UserProfile, assessment: CareerAssessment): Promise<Roadmap> {
  const ai = getAI();
  const prompt = `
    ACT AS: Career Architect.
    TASK: Generate a 3-Phase Career Evolution Roadmap.
    STRICT STRUCTURE:
    Phase 1: Immediate Risk Mitigation (0-3 months)
    Phase 2: Core Skill Strengthening (3-6 months)
    Phase 3: Future-Ready Transformation (6-12 months)
    
    JSON STRUCTURE:
    {
      "phases": [{
        "name": "string",
        "timeframe": "0-3 Months"|"3-6 Months"|"6-12 Months",
        "objective": "string",
        "resilienceGain": number,
        "tasks": [{ "title": "string", "category": "string", "difficulty": "High"|"Medium"|"Low", "resources": ["string"] }]
      }]
    }
  `;
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });
  return { id: `RDMP-${profile.id}`, userId: profile.userId, overallProgress: 0, ...JSON.parse(response.text) };
}

export async function generateActionPlan(profile: UserProfile, assessment: CareerAssessment): Promise<ActionPlan> {
  const ai = getAI();
  const prompt = `
    ACT AS: Tactical Action Architect.
    TASK: Generate a tactical 90-day Action Plan in JSON. 
    FOCUS: Shifting from 'doer' to 'orchestrator'.
    REQUIREMENT: Every task must have a "proofOfProductivity" metric (e.g., "Document 10x speed gain using Copilot").
    URGENCY: Use CRITICAL/HIGH/MEDIUM/LOW.
    
    JSON STRUCTURE:
    {
      "phases": [{
        "name": "string",
        "weeks": [{
          "weekNumber": number,
          "theme": "string",
          "milestone": "string",
          "tasks": [{
            "title": "string",
            "description": "string",
            "duration": "string",
            "priority": "CRITICAL"|"HIGH"|"MEDIUM"|"LOW",
            "proofOfProductivity": "string"
          }]
        }]
      }]
    }
  `;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: 'application/json' } });
  const data = JSON.parse(response.text);
  return { id: `PLAN-${profile.id}`, userId: profile.userId, phases: data.phases || [], overallProgress: 0 };
}

export async function generateLearningHub(profile: UserProfile, assessment: CareerAssessment): Promise<LearningResource[]> {
  const ai = getAI();
  const prompt = `Return a JSON array of 6 learning resources for a ${profile.role} focusing on AI-Resilient skills.`;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: 'application/json' } });
  return JSON.parse(response.text);
}

export async function generateMentorMatches(profile: UserProfile, assessment: CareerAssessment): Promise<Mentor[]> {
  const ai = getAI();
  const prompt = `Return a JSON array of 4 mentor profiles who excel at AI orchestration for ${profile.role}.`;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: 'application/json' } });
  return JSON.parse(response.text);
}

export async function generateProfessionalVision(profile: UserProfile, assessment: CareerAssessment): Promise<ProfessionalVision> {
  const ai = getAI();
  const prompt = `Synthesize a long-term "Professional Vision" for a ${profile.role}. Return JSON with statement, northStar, directives, and values.`;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: 'application/json' } });
  return { id: `VIS-${profile.id}`, userId: profile.userId, ...JSON.parse(response.text) };
}

export async function chatWithMentor(message: string, profile: UserProfile, history: any[]) {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: { systemInstruction: `You are 'FuturePath AI Career Strategist'. Focus on human-AI collaboration.` },
  });
  const result = await chat.sendMessage({ message });
  return result.text;
}
