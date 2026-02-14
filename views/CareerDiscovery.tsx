
import React, { useState, useEffect } from 'react';
import { UserProfile, CareerAssessment, CareerDiscoveryReport, ViewState } from '../types';
import { generateCareerDiscovery } from '../services/geminiService';
import { 
  Compass, 
  Target, 
  Zap, 
  ArrowRight, 
  BrainCircuit, 
  ShieldAlert, 
  TrendingUp, 
  Briefcase,
  AlertCircle,
  ChevronRight,
  BookOpen,
  Sparkles,
  Loader2,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface CareerDiscoveryProps {
  profile: UserProfile;
  assessment: CareerAssessment;
  onViewChange: (view: ViewState) => void;
}

const CareerDiscovery: React.FC<CareerDiscoveryProps> = ({ profile, assessment, onViewChange }) => {
  const [report, setReport] = useState<CareerDiscoveryReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDiscovery();
  }, []);

  const fetchDiscovery = async () => {
    setLoading(true);
    try {
      const data = await generateCareerDiscovery(profile, assessment);
      setReport(data);
    } catch (err) {
      setError("Failed to synthesize market pivot data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in">
        <div className="relative">
          <div className="w-32 h-32 border-8 border-slate-100 rounded-full"></div>
          <div className="w-32 h-32 border-8 border-transparent border-t-amber-500 rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="text-indigo-950 animate-pulse" size={48} />
          </div>
        </div>
        <h3 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter text-center">Scanning Market Signals...</h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Analyzing Alpha Gaps and AI Displacement Vectors</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-20 text-center glass-card bg-white rounded-[4rem] border-dashed border-2 flex flex-col items-center">
        <AlertCircle size={48} className="text-red-500 mb-6" />
        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">{error || "Signal lost."}</p>
        <button onClick={fetchDiscovery} className="mt-8 px-10 py-5 bg-indigo-950 text-amber-400 rounded-3xl font-black uppercase text-xs tracking-widest hover-card">Retry Synthesis</button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in pb-20 max-w-7xl mx-auto text-indigo-950">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border-2 border-indigo-200 text-indigo-700 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">Advanced Discovery Protocol</div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Career <span className="text-amber-600">Discovery</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] mt-6 flex items-center gap-3">
            <Zap size={18} className="text-amber-500" /> Neural Gap Analysis for {profile.role}
          </p>
        </div>
        <div className="text-right px-8 py-4 bg-white rounded-3xl border-2 border-slate-100 shadow-xl flex items-center gap-6">
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pivot Confidence</span>
              <span className="text-4xl font-black italic">{report.confidenceScore}%</span>
           </div>
           <TrendingUp className="text-emerald-500" size={40} />
        </div>
      </header>

      <div className="bg-indigo-950 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-12 border-b-[16px] border-indigo-900 shadow-2xl relative overflow-hidden group hover-card">
         <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Sparkles size={200} /></div>
         <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-amber-400 shrink-0">
            <AlertCircle size={48} />
         </div>
         <div className="flex-1">
            <h4 className="text-[12px] font-black text-amber-400 uppercase tracking-[0.4em] mb-4">Strategic Market Context</h4>
            <p className="text-xl font-medium leading-relaxed italic text-indigo-100">
               "{report.marketContext}"
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] px-6">Identified Opportunity Paths</h3>
        {report.targetRoles.map((role, i) => (
          <div key={i} className="bg-white rounded-[5rem] border-2 border-slate-100 overflow-hidden shadow-xl hover-card group">
            <div className="p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Left: Role Info & Resilience Scores */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="flex justify-between items-start">
                     <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-950 group-hover:text-amber-400 transition-all shadow-lg">
                        <Briefcase size={32} />
                     </div>
                     <div className="text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">Match Potential</span>
                        <span className="text-2xl font-black italic text-indigo-600">{role.matchPercentage}%</span>
                     </div>
                  </div>
                  <div>
                     <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-4 text-indigo-950 leading-none">{role.title}</h4>
                     <p className="text-slate-500 text-sm font-medium leading-relaxed italic">"{role.description}"</p>
                  </div>
                  
                  {/* Visual Resilience Scores - Enhanced */}
                  <div className="space-y-6 pt-4 bg-slate-50 p-6 rounded-[3rem] border border-slate-100 shadow-inner">
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                          <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-indigo-400"/> General Market Resilience</span>
                          <span className="text-indigo-950">{role.aiResilienceScore}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-400" style={{ width: `${role.aiResilienceScore}%` }}></div>
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-600">
                          <span className="flex items-center gap-1"><UserCheck size={12}/> Your Adaptive Resilience</span>
                          <span className="text-emerald-700">{role.adaptiveResilienceScore}%</span>
                       </div>
                       <div className="h-3 w-full bg-emerald-100 rounded-full overflow-hidden border border-emerald-200">
                          <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: `${role.adaptiveResilienceScore}%` }}></div>
                       </div>
                       <div className="flex justify-between items-center mt-2">
                         <span className="text-[8px] text-slate-400 font-bold uppercase italic">Resilience Gain: +{(role.adaptiveResilienceScore - role.aiResilienceScore).toFixed(0)}%</span>
                         <TrendingUp size={12} className="text-emerald-500" />
                       </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Salary Premium</span>
                     <span className="text-2xl font-black italic text-indigo-950">{role.salaryPremium}</span>
                  </div>
               </div>

               {/* Center: Gap Analysis */}
               <div className="lg:col-span-4 space-y-6">
                  <h5 className="flex items-center gap-3 text-indigo-600 font-black text-[12px] uppercase tracking-widest mb-6">
                    <ShieldAlert size={18} /> Critical Skill Gaps
                  </h5>
                  <div className="space-y-4">
                     {role.criticalGaps.map((gap, gIdx) => (
                       <div key={gIdx} className="p-6 bg-slate-50 rounded-[2.5rem] border-l-8 border-amber-400 shadow-sm hover:bg-amber-50 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-sm font-black uppercase italic text-indigo-950">{gap.skill}</span>
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${gap.difficulty === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>Difficulty: {gap.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar">
                             {gap.resources.map((res, rIdx) => (
                               <button key={rIdx} onClick={() => onViewChange(ViewState.LEARNING_HUB)} className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-950 transition-colors flex items-center gap-2">
                                  <BookOpen size={12} /> {res}
                               </button>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Right: Human Alpha Advantage & Suggestions */}
               <div className="lg:col-span-4 space-y-6">
                  <h5 className="flex items-center gap-3 text-emerald-600 font-black text-[12px] uppercase tracking-widest mb-6">
                    <BrainCircuit size={18} /> Human Alpha Edge
                  </h5>
                  <div className="space-y-6">
                     {role.aiAdvantagePoints.map((advantage, pIdx) => (
                       <div key={pIdx} className="flex flex-col gap-3 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 group/item hover:bg-white transition-all shadow-sm">
                          <div className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                            <span className="text-xs font-bold text-indigo-950 leading-relaxed italic">{advantage.point}</span>
                          </div>
                          
                          <div className="pl-8 space-y-3">
                             {advantage.suggestedTools.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                   {advantage.suggestedTools.map((tool, tIdx) => (
                                      <button 
                                        key={tIdx} 
                                        onClick={() => onViewChange(ViewState.LEARNING_HUB)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-100 rounded-lg text-[9px] font-black uppercase text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                                      >
                                        <Cpu size={10} /> {tool}
                                      </button>
                                   ))}
                                </div>
                             )}
                             {advantage.suggestedResources.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                   {advantage.suggestedResources.map((res, rIdx) => (
                                      <button 
                                        key={rIdx} 
                                        onClick={() => onViewChange(ViewState.LEARNING_HUB)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950 text-amber-400 rounded-lg text-[9px] font-black uppercase hover:bg-indigo-800 transition-all"
                                      >
                                        <BookOpen size={10} /> {res}
                                      </button>
                                   ))}
                                </div>
                             )}
                          </div>
                       </div>
                     ))}
                  </div>
                  <button 
                    onClick={() => onViewChange(ViewState.TAKE_ASSESSMENT)}
                    className="w-full mt-8 py-5 bg-indigo-950 text-amber-400 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-900 transition-all flex items-center justify-center gap-3"
                  >
                    Bridge This Path <ChevronRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-indigo-100 p-16 rounded-[6rem] flex flex-col md:flex-row items-center gap-16 shadow-sm hover-card">
         <div className="w-32 h-32 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 border-2 border-indigo-200 shrink-0 shadow-inner">
            <Target size={64} />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h4 className="text-3xl font-black uppercase italic tracking-tighter text-indigo-950 mb-4 leading-none">Adaptive Resilience Mapping</h4>
            <p className="text-slate-500 text-lg font-medium leading-relaxed italic max-w-3xl">
               "Discovery is not a one-time event. As you bridge these gaps, our engine will re-recalculate your market position. Junior roles are being automated, but the demand for <span className="text-indigo-950 font-black">Strategic Conductors</span> is at an all-time high."
            </p>
         </div>
         <button onClick={() => onViewChange(ViewState.LEARNING_HUB)} className="px-12 py-6 bg-indigo-950 text-white rounded-[3rem] font-black uppercase text-xs tracking-widest shadow-xl hover:bg-indigo-900 transition-all active:scale-95">
            Launch Skill Hub
         </button>
      </div>
    </div>
  );
};

export default CareerDiscovery;
