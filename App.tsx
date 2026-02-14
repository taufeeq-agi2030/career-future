
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import MarketTrends from './views/MarketTrends';
import MarketPulseView from './views/MarketPulseView';
import SkillsComparison from './views/SkillsComparison';
import RoadmapView from './views/RoadmapView';
import ChatView from './views/ChatView';
import AssessmentCenter from './views/AssessmentCenter';
import AssessmentLab from './views/AssessmentLab';
import ActionPlanView from './views/ActionPlanView';
import ProfileSettings from './views/ProfileSettings';
import LearningHubView from './views/LearningHubView';
import MentorCenterView from './views/MentorCenterView';
import VoiceReflectionView from './views/VoiceReflectionView';
import VisionView from './views/VisionView';
import CollabSkillsAssessment from './views/CollabSkillsAssessment';
import MonthlySkillAudit from './views/MonthlySkillAudit';
import CareerDiscovery from './views/CareerDiscovery';
import SubscriptionView from './views/SubscriptionView';
import AboutView from './views/AboutView';
import HowItWorksView from './views/HowItWorksView';
import QualityProtocolView from './views/QualityProtocolView';
import SystemReportView from './views/SystemReportView';
import EvolutionRadarView from './views/EvolutionRadarView';
import { UserProfile, CareerAssessment, Roadmap, ViewState, ActionPlan, LearningResource, Mentor, ProfessionalVision, UserAuth, CollabSkillsAnalysis } from './types';
import { bsi } from './services/backendService';
import { 
  generateCareerAssessment, 
  generateUpskillingRoadmap, 
  generateActionPlan, 
  generateLearningHub, 
  generateMentorMatches,
  generateProfessionalVision
} from './services/geminiService';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.LANDING);
  const [auth, setAuth] = useState<UserAuth | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessment, setAssessment] = useState<CareerAssessment | null>(null);
  const [vision, setVision] = useState<ProfessionalVision | null>(null);
  const [collabSkills, setCollabSkills] = useState<CollabSkillsAnalysis | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('FP_SESSION');
    if (saved) {
      setAuth(JSON.parse(saved));
    }
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setNeedsApiKey(!hasKey);
    }
  };

  const handleRequestKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setNeedsApiKey(false);
    }
  };

  const handleAuth = (userAuth: UserAuth) => {
    setAuth(userAuth);
    localStorage.setItem('FP_SESSION', JSON.stringify(userAuth));
    setActiveView(ViewState.ONBOARDING);
  };

  const handleOnboardingComplete = async (userProfile: any) => {
    if (!auth) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const finalProfile: UserProfile = {
        ...userProfile,
        id: `PROF-${auth.id}`,
        userId: auth.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setProfile(finalProfile);
      
      const assessmentData = await generateCareerAssessment(finalProfile);
      setAssessment(assessmentData);
      
      const [roadmapData, planData, resData, mentorData, visionData] = await Promise.all([
        generateUpskillingRoadmap(finalProfile, assessmentData),
        generateActionPlan(finalProfile, assessmentData),
        generateLearningHub(finalProfile, assessmentData),
        generateMentorMatches(finalProfile, assessmentData),
        generateProfessionalVision(finalProfile, assessmentData)
      ]);

      setRoadmap(roadmapData);
      setActionPlan(planData);
      setResources(resData);
      setMentors(mentorData);
      setVision(visionData);

      await bsi.saveRecord('profiles', finalProfile, auth.role);
      setActiveView(ViewState.DASHBOARD);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setNeedsApiKey(true);
        setError("API Session expired. Please re-select your key.");
      } else {
        setError(err.message || "Strategy synthesis failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssessmentComplete = (updatedAssessment?: CareerAssessment) => {
    if (updatedAssessment) {
      setAssessment(updatedAssessment);
    }
    setActiveView(ViewState.ASSESSMENT_CENTER);
  };

  const renderContent = () => {
    if (needsApiKey && activeView !== ViewState.LANDING) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffdf5]">
          <div className="glass-card p-12 rounded-[3rem] max-w-md text-center bg-white">
            <h2 className="text-3xl font-black text-indigo-950 uppercase italic mb-6">Key Selection Required</h2>
            <p className="text-slate-500 mb-10 font-medium italic">
              FuturePath AI requires an active API key from a paid GCP project to generate your advanced career intelligence.
              <br/><br/>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-600 underline">Learn about billing</a>
            </p>
            <button 
              onClick={handleRequestKey}
              className="w-full py-5 bg-indigo-950 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover-card"
            >
              Select Paid API Key
            </button>
          </div>
        </div>
      );
    }

    if (activeView === ViewState.LANDING) {
      return <LandingView onStart={() => setActiveView(ViewState.AUTH)} onViewChange={setActiveView} />;
    }

    if (activeView === ViewState.AUTH) {
      return <AuthView onAuthenticated={handleAuth} />;
    }

    const publicShared = {
      [ViewState.ABOUT]: <AboutView />,
      [ViewState.HOW_IT_WORKS]: <HowItWorksView />,
      [ViewState.QA_PROTOCOL]: <QualityProtocolView />,
      [ViewState.SYSTEM_REPORT]: <SystemReportView />
    };

    if (activeView in publicShared) {
      return (
        <div className="bg-[#fffdf5] min-h-screen">
          {(publicShared as any)[activeView]}
          <div className="max-w-7xl mx-auto px-14 pb-20">
            <button onClick={() => setActiveView(ViewState.LANDING)} className="px-10 py-4 bg-indigo-950 text-amber-400 rounded-2xl font-black uppercase text-xs tracking-widest">Back to Landing</button>
          </div>
        </div>
      );
    }

    if (activeView === ViewState.ONBOARDING) {
      return (
        <div className="relative bg-[#fffdf5] min-h-screen">
          <Onboarding onComplete={handleOnboardingComplete} />
          {error && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold text-center uppercase tracking-widest text-[10px]">
              {error}
            </div>
          )}
        </div>
      );
    }

    if (!auth || !profile || !assessment) {
       return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900"></div></div>;
    }

    switch (activeView) {
      case ViewState.DASHBOARD:
        return <Dashboard assessment={assessment} profile={profile} onViewChange={setActiveView} />;
      case ViewState.EVOLUTION_RADAR:
        return <EvolutionRadarView />;
      case ViewState.PROFESSIONAL_VISION:
        return vision ? <VisionView vision={vision} profile={profile} assessment={assessment} onUpdate={setVision} /> : null;
      case ViewState.COLLAB_SKILLS_ASSESSMENT:
        return <CollabSkillsAssessment profile={profile} onComplete={setCollabSkills} existingAnalysis={collabSkills} />;
      case ViewState.VOICE_REFLECTION:
        return <VoiceReflectionView profile={profile} onViewChange={setActiveView} />;
      case ViewState.MONTHLY_AUDIT:
        return <MonthlySkillAudit profile={profile} assessment={assessment} />;
      case ViewState.CAREER_DISCOVERY:
        return <CareerDiscovery profile={profile} assessment={assessment} onViewChange={setActiveView} />;
      case ViewState.MARKET_TRENDS:
        return <MarketTrends assessment={assessment} />;
      case ViewState.MARKET_PULSE:
        return <MarketPulseView profile={profile} />;
      case ViewState.SKILLS_COMPARISON:
        return <SkillsComparison assessment={assessment} profile={profile} />;
      case ViewState.ROADMAP:
        return roadmap ? <RoadmapView roadmap={roadmap} /> : null;
      case ViewState.CHAT:
        return <ChatView profile={profile} />;
      case ViewState.ASSESSMENT_CENTER:
        return <AssessmentCenter assessment={assessment} profile={profile} onStartLab={() => setActiveView(ViewState.TAKE_ASSESSMENT)} />;
      case ViewState.TAKE_ASSESSMENT:
        return <AssessmentLab assessment={assessment} profile={profile} onComplete={handleAssessmentComplete} />;
      case ViewState.ACTION_PLAN:
        return actionPlan ? <ActionPlanView plan={actionPlan} /> : null;
      case ViewState.PROFILE:
        return <ProfileSettings profile={profile} setProfile={setProfile} />;
      case ViewState.LEARNING_HUB:
        return <LearningHubView resources={resources} />;
      case ViewState.MENTOR_MATCH:
        return <MentorCenterView mentors={mentors} profile={profile} />;
      default:
        return <Dashboard assessment={assessment} profile={profile} onViewChange={setActiveView} />;
    }
  };

  const isPublicView = [ViewState.LANDING, ViewState.AUTH, ViewState.ABOUT, ViewState.HOW_IT_WORKS, ViewState.QA_PROTOCOL, ViewState.SYSTEM_REPORT].includes(activeView);

  if (isPublicView || activeView === ViewState.ONBOARDING) {
    return renderContent();
  }

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView} 
      isLoading={isLoading}
      profile={profile}
      assessment={assessment}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
