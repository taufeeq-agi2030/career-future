import React from 'react';
import { CareerAssessment, UserProfile } from '../types';
import { 
  Users, 
  ShieldAlert, 
  Zap, 
  Search, 
  Radar, 
  ArrowRight,
  ChevronRight,
  Download,
  Sparkles,
  Play,
  Lock,
  Cpu,
  Target,
  BrainCircuit,
  Activity,
  Timer,
  FileSearch,
  TrendingUp,
  Award,
  Trophy,
  // Added ShieldCheck to fix missing name error
  ShieldCheck
} from 'lucide-react';

interface AssessmentCenterProps {
  assessment: CareerAssessment;
  profile: UserProfile;
  onStartLab: (tier: 'Basic' | 'Intermediate' | 'Advanced') => void;
}

const AssessmentCenter: React.FC<AssessmentCenterProps> = ({ assessment, profile, onStartLab }) => {
  const tiers = [
    {
      title: 'Tier 1: Foundational Scan',
      level: 'Essential',
      time: '15 Minutes',
      status: 'Verified',
      color: 'border-slate-200 bg-white',
      accent: 'bg-indigo-50 text-indigo-600',
      icon: Search,
      methods: [
        { name: 'Task Vulnerability Index', score: 100 - assessment.riskScore },
        { name: 'Initial Readiness Grade', score: assessment.futureReadinessScore / 2 },
        { name: 'AI Collab capability', score: assessment.aiCollabScore }
      ]
    },
    {
      title: 'Tier 2: Intermediate Lab',
      level: 'Advanced',
      time: '45 Minutes',
      status: 'Open',
      color: 'border-indigo-200 bg-indigo-50/20',
      accent: 'bg-indigo-600 text-white',
      icon: Cpu,
      methods: [
        { name: 'Deep Project Simulation', icon: Timer },
        { name: 'Peer Matrix Ranking', score: assessment.peerPercentile },
        { name: 'Technical Symbiosis Index', icon: BrainCircuit }
      ]
    },
    {
      title: 'Tier 3: Strategic Forecast',
      level: 'S-Tier Only',
      time: '2-3 Hours',
      status: 'Open',
      color: 'border-amber-200 bg-amber-50/10',
      accent: 'bg-indigo-950 text-amber-400',
      icon: Target,
      methods: [
        { name: 'AI Job Radar (6mo - 24mo)', icon: Radar },
        { name: 'Reverse Resume Synthesis', icon: FileSearch },
        { name: '5-Year Trajectory Delta', icon: TrendingUp }
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in pb-20 text-indigo-950 max-w-7xl mx-auto duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-200 pb-16">
        <div>
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border-2 border-indigo-100 rounded-2xl text-indigo-700 text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-sm">Diagnostic Operational Layer v2.1</div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Strategic <span className="text-amber-600">Diagnostics</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] mt-8 flex items-center gap-3">
             <Activity size={18} className="text-indigo-600" /> Neural Evolution protocol for {profile.role}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-4 px-10 py-5 bg-white border-2 border-indigo-950 text-indigo-950 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-950 hover:text-white transition-all shadow-2xl group active:scale-95">
            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
            Export Comprehensive Report
          </button>
        </div>
      </header>

      {/* Critical Highlight: AI Collaboration Test */}
      <div className="bg-indigo-950 p-16 rounded-[6rem] text-white flex flex-col lg:flex-row items-center gap-16 border-b-[24px] border-indigo-900 shadow-3xl relative overflow-hidden group hover-card">
        <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 group-hover:scale-110 transition-transform"><Trophy size={320} /></div>
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-4 text-amber-400 font-black text-[11px] uppercase tracking-[0.5em] mb-8">
            <Zap size={20} className="animate-pulse" /> Urgent Calibration Node
          </div>
          <h3 className="text-5xl font-black tracking-tighter mb-8 italic leading-[0.9] uppercase text-white">AI Collaboration proficiency Test</h3>
          <p className="text-indigo-100 text-2xl font-medium leading-relaxed italic mb-12 max-w-3xl border-l-4 border-amber-400 pl-12">
            "Your professional survival depends on orchestration mastery. Take our standard 15-question diagnostic to certify your position as a Strategic Conductor."
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-10">
             <div className="px-10 py-5 bg-white/5 rounded-[2.5rem] border-2 border-white/10 backdrop-blur-md shadow-inner text-center sm:text-left min-w-[240px]">
                <span className="text-[10px] font-black uppercase text-indigo-300 block mb-2 tracking-widest">Previous Proficiency Index</span>
                <span className="text-5xl font-black italic text-amber-400 leading-none">{assessment.aiCollabTestScore || 'PENDING'}</span>
                {assessment.aiCollabTestScore && <span className="text-xl font-black text-white/50 ml-2">/ 100</span>}
             </div>
             <button 
              onClick={() => onStartLab('Basic')} 
              className="px-16 py-8 bg-amber-400 text-indigo-950 rounded-[3rem] font-black text-xl uppercase tracking-tighter flex items-center gap-6 hover:scale-105 transition-all shadow-3xl shadow-amber-400/20 active:scale-95"
             >
               Enter proficiency Lab <ArrowRight size={28} />
             </button>
          </div>
        </div>
        <div className="w-full lg:w-1/4 flex justify-center relative z-10">
           <div className="w-64 h-64 bg-white/5 rounded-full flex flex-col items-center justify-center border-4 border-white/10 shadow-3xl backdrop-blur-xl group-hover:rotate-6 transition-transform">
              <BrainCircuit size={100} className="text-amber-400 mb-4 animate-float" />
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.4em]">Symbiosis Node</span>
           </div>
        </div>
      </div>

      {/* Assessment Tier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {tiers.map((tier, i) => (
          <div key={i} className={`p-12 rounded-[5rem] border-4 flex flex-col justify-between min-h-[550px] transition-all relative overflow-hidden group hover:shadow-3xl hover-card ${tier.color}`}>
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform text-indigo-950">
               <tier.icon size={160} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-md ${tier.accent}`}>
                  {tier.level}
                </span>
                <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                  <Timer size={14} className="text-indigo-600" /> {tier.time}
                </div>
              </div>

              <h3 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter mb-8 leading-none italic">{tier.title}</h3>
              
              <div className="space-y-6 mb-12">
                {tier.methods.map((m: any, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b-2 border-slate-50 group/item">
                    <span className="text-sm font-black text-slate-500 uppercase flex items-center gap-3 group-hover/item:text-indigo-950 transition-colors">
                       {m.icon && <m.icon size={18} className="text-indigo-400" />} {m.name}
                    </span>
                    {m.score !== undefined && m.score !== null ? (
                      <span className="text-lg font-black text-indigo-600 italic">{m.score}%</span>
                    ) : (
                      <Zap size={16} className="text-slate-200 group-hover/item:text-amber-500 group-hover/item:scale-125 transition-all" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onStartLab(tier.title.split(':')[0].split(' ')[1] as any)}
              className={`relative z-10 w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-xl group active:scale-95 ${
                tier.status === 'Locked' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-950 text-white hover:bg-indigo-900'
              }`}
            >
              {tier.status === 'Locked' ? (
                <>Establish Tier Access <Lock size={20} /></>
              ) : (
                <>Initiate Lab Cycle <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Global Peer Status Footer */}
      <div className="bg-white border-2 border-indigo-100 p-20 rounded-[6rem] text-indigo-950 relative overflow-hidden shadow-sm hover-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-indigo-600 font-black text-[11px] uppercase tracking-[0.6em] mb-10">
              <Activity size={20} /> Neural Positioning Index
            </div>
            <h3 className="text-6xl font-black tracking-tighter mb-10 italic leading-none uppercase text-indigo-950">Market Delta: +{assessment.futureReadinessScore}%</h3>
            <p className="text-slate-500 text-2xl font-medium leading-relaxed italic mb-12 max-w-3xl border-l-4 border-amber-400 pl-12">
              "Your current trajectory demonstrates a <span className="text-indigo-600 font-black">high-alpha alignment</span>. While your peers remain in execution roles, your diagnostics verify a shift toward Strategic Decision Curation."
            </p>
            <div className="flex gap-6">
              <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-slate-100 shadow-inner group hover:border-indigo-200 transition-all">
                <span className="text-[10px] font-black uppercase text-indigo-400 block mb-3 tracking-widest">Evolution Ranking</span>
                <span className="text-4xl font-black text-indigo-950 italic">Top 8% <TrendingUp size={24} className="inline text-emerald-500 ml-2" /></span>
              </div>
              <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-slate-100 shadow-inner group hover:border-indigo-200 transition-all">
                <span className="text-[10px] font-black uppercase text-indigo-400 block mb-3 tracking-widest">Resilience Tier</span>
                <span className="text-4xl font-black text-indigo-950 italic">S-GRADE <ShieldCheck size={24} className="inline text-indigo-600 ml-2" /></span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
             <div className="w-72 h-72 bg-indigo-950 rounded-[4rem] flex flex-col items-center justify-center text-center p-10 border-4 border-indigo-900 shadow-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-amber-400 opacity-0 group-hover:opacity-5 transition-opacity" />
                <BrainCircuit size={72} className="text-amber-400 mb-6 animate-pulse" />
                <span className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.4em] mb-2">Protocol Active</span>
                <span className="text-3xl font-black uppercase italic text-white leading-tight tracking-tighter">Adaptive<br/>Alpha-Node</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCenter;