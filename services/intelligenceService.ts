import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerAssessment, StrategicTip, Notification, MarketSignal, EngagementPulse } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Tactical Intelligence & Journey Orchestration Engine
 * Reconciles UserJourneyService, SkillAnalysisService, and NewsAlertsService
 */
export class IntelligenceService {
  
  /**
   * UserJourneyService: Calculates the engagement alpha based on weighted activity
   */
  static calculateEngagementAlpha(profile: UserProfile, reflectionsCount: number): EngagementPulse {
    const baseScore = 40; 
    const reflectionWeight = 30;
    const streakBonus = profile.engagement?.streak ? profile.engagement.streak * 2 : 0;
    
    const finalScore = Math.min(100, baseScore + (reflectionsCount * 5) + streakBonus);
    
    return {
      score: finalScore,
      streak: (profile.engagement?.streak || 0) + 1,
      totalReflections: reflectionsCount,
      lastActivity: new Date(),
      milestones: [
        { id: 'M1', label: 'Strategic Initiate', date: new Date(), achieved: true },
        { id: 'M2', label: 'Alpha Symbiont', date: new Date(), achieved: finalScore > 70 },
        { id: 'M3', label: 'The Conductor', date: new Date(), achieved: finalScore > 90 }
      ]
    };
  }

  /**
   * SkillAnalysisService: Predicts duration of skill durability (Half-Life)
   */
  static async assessSkillHalfLife(skill: string, role: string, details?: string): Promise<number> {
    const ai = getAI();
    const prompt = `
      ACT AS: Future-of-Work Quantitative Analyst.
      TASK: Estimate the 'Professional Half-Life' of the skill '${skill}' for a '${role}' in years.
      CONTEXT: Consider Phase 2 agentic AI capabilities (2025-2027).
      SPECIFIC USER CONTEXT: "${details || 'No additional context provided.'}"
      
      CRITERIA:
      - If details imply high human empathy, complex ethics, or executive judgment, half-life should be higher.
      - If details imply repetitive data manipulation or standard documentation, half-life should be lower.
      
      RETURN: A JSON object with a single numeric field 'years'. Range: 0.5 to 15.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text).years;
    } catch (e) {
      return 3.5; // Strategic fallback
    }
  }

  /**
   * Daily Tips Service: hyper-personalized micro-learning
   */
  static async generateDailyStrategicTip(profile: UserProfile, assessment: CareerAssessment): Promise<StrategicTip> {
    const ai = getAI();
    const prompt = `
      ACT AS: A Micro-Learning Architect for the AI Era.
      CONTEXT: User is a ${profile.role} with ${assessment.riskScore}% automation risk. 
      VULNERABILITY: ${assessment.vulnerableTasks[0]?.task || 'General manual routine'}.
      
      TASK: Generate ONE daily "Strategic Pulse" tip.
      FORMAT: JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const data = JSON.parse(response.text);
    return {
      ...data,
      id: `TIP-${Date.now()}`,
      timestamp: new Date()
    };
  }

  /**
   * News Alerts Service: Fetches real-time market signals
   */
  static async fetchMarketPulse(profile: UserProfile): Promise<MarketSignal[]> {
    const ai = getAI();
    const prompt = `
      ACT AS: A Strategic Risk Analyst.
      SEARCH FOR: Latest AI news affecting ${profile.role} in ${profile.industry}.
      JSON STRUCTURE: [{ "title": "string", "description": "string", "impact": "DISRUPTIVE"|"ADAPTIVE", "timeToImpact": "3-6 months", "sourceTitle": "string", "sourceUrl": "string", "recommendation": "string" }]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { 
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json' 
      },
    });

    return JSON.parse(response.text).map((item: any, i: number) => ({
      ...item,
      id: `SIGNAL-${Date.now()}-${i}`,
      timestamp: new Date()
    }));
  }

  /**
   * Communication Service: Generates high-stakes intervention alerts
   */
  static async synthesizeStrategicAlerts(profile: UserProfile, assessment: CareerAssessment): Promise<Notification[]> {
    const ai = getAI();
    const prompt = `Identify 2 urgent market shifts for a ${profile.role}. JSON: [{ "title": "string", "message": "string", "type": "alert"|"update" }]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    return JSON.parse(response.text).map((a: any, i: number) => ({
      ...a,
      id: `ALERT-${Date.now()}-${i}`,
      userId: profile.userId,
      timestamp: new Date(),
      read: false
    }));
  }
}