
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, VoiceReflectionAnalysis, GrowthMetrics } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const SessionTypes = {
  DAILY_CHECKIN: 'daily_checkin',
  WEEKLY_REVIEW: 'weekly_review',
  CHALLENGE_SHARE: 'challenge_share',
  SUCCESS_STORY: 'success_story',
  AI_EXPERIENCE: 'ai_experience',
  MINDSET_WORK: 'mindset_work',
  FREE_FORM: 'free_form'
};

export class VoiceReflectionService {
  static getOpeningPrompt(type: string): string {
    switch (type) {
      case SessionTypes.DAILY_CHECKIN:
        return "How are you feeling about your career trajectory today?";
      case SessionTypes.WEEKLY_REVIEW:
        return "What was your biggest strategic win this week?";
      case SessionTypes.CHALLENGE_SHARE:
        return "What automation threat is currently on your radar?";
      case SessionTypes.SUCCESS_STORY:
        return "Tell us about a time you orchestrated an AI tool effectively.";
      case SessionTypes.AI_EXPERIENCE:
        return "Describe your latest interaction with an AI agent.";
      case SessionTypes.MINDSET_WORK:
        return "How are you shifting your identity from worker to orchestrator?";
      default:
        return "Share your reflections on the future of your role.";
    }
  }

  static async transcribeAudio(audioBase64: string, mimeType: string): Promise<string> {
    const ai = getAI();
    const prompt = `
      TASK: Transcribe this professional reflection audio.
      RULES: 
      - Capture filler words only if they indicate significant anxiety or hesitation.
      - Maintain high fidelity for emotions, fears, and expressions of excitement.
      - Ensure professional terminology is correctly spelled.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: audioBase64, mimeType } },
          { text: prompt }
        ]
      },
    });

    return response.text?.trim() || "";
  }

  /**
   * Extracts specific professional skills mentioned in the transcript.
   */
  static async identifySkills(transcript: string): Promise<string[]> {
    const ai = getAI();
    const prompt = `Identify any specific professional skills, software tools, or competencies mentioned in this professional reflection transcript: "${transcript}". Return ONLY a JSON array of strings. If none are found, return an empty array [].`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { 
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
    });
    
    try {
      const text = response.text;
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error("Skill identification failed", e);
      return [];
    }
  }

  static async analyzeReflection(
    transcript: string, 
    profile: UserProfile, 
    history: VoiceReflectionAnalysis[]
  ): Promise<VoiceReflectionAnalysis> {
    const ai = getAI();
    
    const historyContext = history.map(h => `- ${h.timestamp.toISOString()}: ${h.sentiment}, Keywords: ${h.themes.map(t => t.theme).join(',')}`).join('\n');
    const currentSkills = profile.skills.join(', ');

    const prompt = `
      ACT AS: Senior Emotional Intelligence Coach & Career Strategist.
      CONTEXT: Analyzing a new reflection from a ${profile.role} in ${profile.industry}.
      CURRENT SKILLS: ${currentSkills}
      PREVIOUS HISTORY:
      ${historyContext || "No previous history available."}

      TRANSCRIPT: "${transcript}"

      TASK: Perform a Multi-Dimensional Neural Analysis.
      1. ATTITUDE SHIFT: How is their attitude changing compared to previous sessions?
      2. GROWTH INDICATORS: Identify specific progress in skills or mindset, relative to their current skills.
      3. ANXIETY vs CONFIDENCE: Quantify current emotional state.
      4. PLAN ADJUSTMENT: Based on this specific input, how should their 90-day plan change?
      
      OUTPUT JSON:
      {
        "sentiment": "string",
        "sentimentScore": number,
        "emotionalTone": [{"emotion": "string", "intensity": 1-10, "context": "string"}],
        "themes": [{"theme": "string", "relevance": 1-10}],
        "moodEntry": {"mood": "string", "energyLevel": 1-10, "confidenceLevel": 1-10, "stressLevel": 1-10},
        "attitudeShift": "Detailed analysis of how their mindset is evolving",
        "progressIndicators": ["string"],
        "planAdjustment": {
          "priorityShift": "string",
          "newFocusArea": "string",
          "rationale": "string",
          "suggestedTaskUpdate": "string"
        },
        "refereeReport": {
          "grade": "S"|"A"|"B"|"C",
          "qualityScore": number,
          "verdict": "string"
        }
      }
    `;

    // Perform analysis and skill identification in parallel for maximum efficiency
    const [analysisResponse, identifiedSkills] = await Promise.all([
      ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      }),
      this.identifySkills(transcript)
    ]);

    let result;
    try {
      const responseText = analysisResponse.text;
      result = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error("Analysis JSON parse failed", e);
      result = {
        sentiment: "Neutral",
        sentimentScore: 0,
        emotionalTone: [],
        themes: [],
        moodEntry: { mood: "Neutral", energyLevel: 5, confidenceLevel: 5, stressLevel: 5 },
        attitudeShift: "Unable to process shift analysis.",
        progressIndicators: [],
        planAdjustment: { priorityShift: "None", newFocusArea: "None", rationale: "Parse Error", suggestedTaskUpdate: "None" },
        refereeReport: { grade: "C", qualityScore: 50, verdict: "System Error in Synthesis" }
      };
    }

    return {
      ...result,
      identifiedSkills, // Integrating identified skills into the analysis object
      id: `REF-${Date.now()}`,
      userId: profile.userId,
      transcript,
      timestamp: new Date()
    };
  }

  /**
   * Aggregates history into a GrowthMetrics snapshot
   */
  static calculateGrowthSnapshot(history: VoiceReflectionAnalysis[]): GrowthMetrics {
    if (history.length === 0) return {
      anxietyLevel: 50,
      confidenceLevel: 50,
      excitementScore: 50,
      adaptabilityIndex: 50,
      orchestrationSkill: 50,
      empathyLeverage: 50,
      ethicalJudgment: 50,
      strategicIntent: 50,
      techAwareness: 50,
      resilienceMoat: 50,
      topKeywords: [],
      sentimentTrend: 'Stable'
    };

    const latest = history[history.length - 1];
    const avgConfidence = history.reduce((acc, curr) => acc + curr.moodEntry.confidenceLevel, 0) / history.length;
    
    // Aggregate unique skills found across history
    const allIdentifiedSkills = Array.from(new Set(history.flatMap(h => h.identifiedSkills || [])));
    const allKeywords = history.flatMap(h => h.themes.map(t => t.theme));
    
    // Simple frequency count for top keywords
    const counts: Record<string, number> = {};
    allKeywords.forEach(k => counts[k] = (counts[k] || 0) + 1);
    const topKeywords = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);

    return {
      anxietyLevel: latest.moodEntry.stressLevel * 10,
      confidenceLevel: avgConfidence * 10,
      excitementScore: (latest.sentimentScore + 1) * 50,
      adaptabilityIndex: Math.min(100, history.length * 5),
      orchestrationSkill: latest.refereeReport.qualityScore,
      empathyLeverage: Math.min(100, (latest.identifiedSkills?.length || 0) * 10),
      ethicalJudgment: latest.refereeReport.grade === 'S' ? 95 : latest.refereeReport.grade === 'A' ? 85 : 70,
      strategicIntent: latest.moodEntry.energyLevel * 10,
      techAwareness: Math.min(100, (allIdentifiedSkills.length + latest.themes.length) * 5),
      resilienceMoat: 75,
      topKeywords,
      sentimentTrend: history.length > 1 ? (latest.sentimentScore > history[0].sentimentScore ? 'Improving' : 'Declining') : 'Stable'
    };
  }
}
