
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Cpu, 
  Globe, 
  BrainCircuit, 
  Rocket, 
  CheckCircle2, 
  Shield, 
  Activity, 
  Users,
  Compass,
  Briefcase,
  Lock,
  MessageSquare,
  BarChart3,
  Award,
  Star,
  Eye,
  Radar,
  Search,
  Target,
  ChevronRight,
  ShieldAlert,
  Loader2,
  Fingerprint,
  // Added missing icons to fix compilation errors
  Clock,
  Terminal,
  Gavel
} from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
  onViewChange: (view: ViewState) => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStart, onViewChange }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [scanStep, setScanStep] = useState<'IDLE' | 'SCANNING' | 'QUIZ' | 'RESULT'>('IDLE');
  const [pulseCount, setPulseCount] = useState(4821);

  // Simulate live user activity
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;
    setScanStep('SCANNING');
    setTimeout(() => setScanStep('QUIZ'), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fffdf5] text-indigo-950 overflow-x-hidden selection:bg-amber-200 selection:text-indigo-900">
      {/* Real-time Signal Ticker */}
      <div className="bg-indigo-950 text-white py-3 overflow-hidden border-b border-indigo-900 sticky top-0 z-[100] backdrop-blur-md bg-indigo-950/95">
        <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap gap-12 items-center">
          {[
            "SIGNAL: Legal-AI model adoption surged 18.5% in Q3",
            "ALERT: 300 million jobs to be automated by 2030 (WEF)",
            "MARKET: 42k 'Strategic Orchestrator' roles opened this month",
            "PULSE: Professionals in 'Human-Alpha' roles seeing 22% salary premium",
            "TECH: Gemini 3 Pro benchmarks verify 94% automation in clerical auditing"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{text}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "SIGNAL: Legal-AI model adoption surged 18.5% in Q3",
            "ALERT: 300 million jobs to be automated by 2030 (WEF)",
            "MARKET: 42k 'Strategic Orchestrator' roles opened this month",
            "PULSE: Professionals in 'Human-Alpha' roles seeing 22% salary premium",
            "TECH: Gemini 3 Pro benchmarks verify 94% automation in clerical auditing"
          ].map((text, i) => (
            <div key={i + 10} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(251, 191, 36, 0.02) 50%, transparent 100%);
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange(ViewState.LANDING)}>
          <div className="bg-indigo-950 p-2.5 rounded-2xl text-amber-400 shadow-xl shadow-indigo-950/20 group-hover:scale-110 transition-transform">
            <Sparkles size={28} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">FuturePath</span>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          <button onClick={() => onViewChange(ViewState.HOW_IT_WORKS)} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-950 transition-all border-b-2 border-transparent hover:border-amber-400 pb-1">The Engine</button>
          <button onClick={() => onViewChange(ViewState.QA_PROTOCOL)} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-950 transition-all border-b-2 border-transparent hover:border-amber-400 pb-1">QA Protocol</button>
          <button 
            onClick={onStart}
            className="px-10 py-4 bg-indigo-950 text-amber-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-900 transition-all shadow-2xl hover-card active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section with Interactive Risk Scanner */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-32 hero-gradient">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-50 text-amber-700 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-4 border-2 border-amber-200 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Activity size={14} className="animate-pulse" /> {pulseCount.toLocaleString()} Active Calibration Nodes Today
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-indigo-950 leading-[0.85] uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Don't Let AI <br />
              <span className="text-rose-500 underline decoration-[12px] underline-offset-[12px]">Replace</span> You. <br />
              <span className="text-indigo-600">Elevate</span> It.
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-500 text-2xl font-medium leading-relaxed italic animate-in fade-in slide-in-from-bottom-10 duration-1000 border-l-8 border-indigo-100 pl-10">
              "Join 50,000+ professionals using Career Mentor AI to bridge the gap between manual labor and strategic orchestration."
            </p>
          </div>

          {/* Interactive Widget: Scan My Future */}
          <div className="lg:col-span-5 relative group animate-in zoom-in duration-1000">
            <div className="absolute inset-0 bg-amber-400 blur-[120px] opacity-10 rounded-full group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-white border-4 border-slate-100 p-12 rounded-[5rem] shadow-3xl hover-card">
              {scanStep === 'IDLE' && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="text-center">
                    <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Risk Assessment v1.0</h3>
                    <p className="text-3xl font-black italic uppercase tracking-tighter text-indigo-950">Scan My Future</p>
                  </div>
                  <form onSubmit={handleStartScan} className="space-y-6">
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Current Job Title..."
                        className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-indigo-400 font-bold transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-8 bg-indigo-950 text-amber-400 rounded-[3rem] font-black text-xl uppercase tracking-tighter shadow-2xl hover:bg-indigo-900 transition-all flex items-center justify-center gap-4 group"
                    >
                      Scan My Path <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </form>
                  <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest italic">
                    94% Accuracy in Displacement Vector Modeling
                  </p>
                </div>
              )}

              {scanStep === 'SCANNING' && (
                <div className="py-20 flex flex-col items-center justify-center space-y-10 animate-in fade-in">
                   <div className="relative">
                      <div className="w-40 h-40 border-[10px] border-slate-100 rounded-full"></div>
                      <div className="w-40 h-40 border-[10px] border-transparent border-t-rose-500 rounded-full animate-spin absolute top-0 left-0"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Radar className="text-indigo-950 animate-pulse" size={64} />
                      </div>
                   </div>
                   <div className="text-center">
                      <h3 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter">Analyzing Matrix...</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Cross-referencing WEF Automation Repositories</p>
                   </div>
                </div>
              )}

              {scanStep === 'QUIZ' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4">
                   <div className="text-center">
                      <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 inline-block">Displacement Diagnostic</span>
                      <h4 className="text-2xl font-black uppercase italic leading-none text-indigo-950">Quick Calibrate</h4>
                   </div>
                   <p className="text-lg font-bold italic text-slate-600 text-center">"How much of your daily workload is spent on manual data consolidation?"</p>
                   <div className="grid grid-cols-1 gap-3">
                      {['Over 80%', '40% - 70%', 'Less than 20%'].map((opt, i) => (
                        <button key={i} onClick={onStart} className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] font-black text-xs uppercase tracking-widest text-indigo-950 hover:border-indigo-600 hover:bg-white transition-all text-left flex items-center gap-4">
                           <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center">{String.fromCharCode(65+i)}</div>
                           {opt}
                        </button>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The Pain Section: "You Feel It" */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
           <div className="text-center mb-32">
              <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-10">The Ground Is <span className="text-rose-500">Shifting.</span></h2>
              <p className="text-2xl text-slate-400 font-medium italic max-w-2xl mx-auto">"The uncertainty is paralyzing. But it doesn't have to be terminal. You are not alone in the pivot."</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: ShieldAlert, title: "Am I Next?", val: "300 Million", desc: "Jobs forecasted to be automated by 2030 (WEF)." },
                { icon: Clock, title: "Skill Decay", val: "2.4 Years", desc: "Average half-life of technical skills in automated sectors." },
                { icon: Compass, title: "Directionless", val: "85%", desc: "Professionals who feel unprepared for agentic workflows." }
              ].map((item, i) => (
                <div key={i} className="space-y-8 p-12 bg-white/5 border border-white/10 rounded-[4rem] group hover:bg-white/10 transition-all hover-card">
                   <div className="w-20 h-20 bg-rose-500/20 rounded-3xl flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 transition-transform">
                      <item.icon size={40} />
                   </div>
                   <h3 className="text-2xl font-black uppercase italic tracking-tight">{item.title}</h3>
                   <div className="text-7xl font-black italic tracking-tighter text-white leading-none">{item.val}</div>
                   <p className="text-slate-400 text-lg font-medium italic leading-relaxed">"{item.desc}"</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* The Guardian Section: Predict, Prepare, Pivot */}
      <section className="py-48 bg-[#faf9f0]">
        <div className="max-w-7xl mx-auto px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-5 space-y-12">
                 <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-950 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">The Career Guardian</div>
                 <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">Meet Your <span className="text-indigo-600">Co-Pilot.</span></h2>
                 <p className="text-slate-500 text-2xl font-medium leading-relaxed italic border-l-4 border-amber-400 pl-10">
                    "FuturePath is your 24/7 neural co-pilot through the AI revolution. We scan patent registries and agent benchmarks to harden your career against displacement."
                 </p>
                 <div className="space-y-10 pt-10">
                    {[
                      { icon: Eye, title: "PREDICT", desc: "See the future of your profession 6–24 months ahead with real-time risk modeling." },
                      { icon: Award, title: "PREPARE", desc: "Get a custom-built 90-day learning path to close critical human-alpha skill gaps." },
                      { icon: Rocket, title: "PIVOT", desc: "Discover 20+ high-growth, AI-resilient roles tailored to your unique expertise matrix." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 items-start group">
                         <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-xl border border-slate-100 group-hover:bg-indigo-950 group-hover:text-white transition-all">
                            <item.icon size={28} />
                         </div>
                         <div>
                            <h4 className="font-black text-indigo-950 uppercase italic text-xl mb-2">{item.title}</h4>
                            <p className="text-slate-500 text-base font-medium italic leading-relaxed">"{item.desc}"</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="lg:col-span-7">
                 <div className="relative group perspective-1000">
                    <div className="bg-white p-14 rounded-[5rem] border-4 border-slate-100 shadow-3xl hover-card transition-all duration-700 group-hover:rotate-1">
                       <div className="flex justify-between items-center mb-16">
                          <div className="px-6 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 text-[10px] font-black uppercase tracking-widest">Active Roadmap Synthesis</div>
                          <Sparkles size={32} className="text-amber-400 animate-pulse" />
                       </div>
                       <div className="space-y-12">
                          <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 opacity-60">
                             <div className="flex justify-between items-center opacity-40 italic">
                                <span className="text-xs font-black uppercase">Traditional Legacy Path</span>
                                <TrendingUp className="rotate-180 text-rose-500" />
                             </div>
                             <p className="text-4xl font-black text-slate-400 uppercase mt-4">Stagnant Execution</p>
                          </div>
                          <div className="flex justify-center -my-8 relative z-10">
                             <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-3xl animate-bounce border-8 border-white">
                                <ArrowRight size={32} className="text-indigo-950 rotate-90" />
                             </div>
                          </div>
                          <div className="p-10 bg-indigo-950 rounded-[4rem] text-white shadow-3xl border-b-[24px] border-indigo-900 group-hover:scale-[1.05] transition-transform">
                             <div className="flex justify-between items-center mb-6">
                                <span className="px-4 py-1.5 bg-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest">FuturePath Vector</span>
                                <Target className="text-amber-400" />
                             </div>
                             <p className="text-5xl font-black text-amber-400 uppercase italic tracking-tighter leading-none">Strategic Leader</p>
                             <div className="mt-8 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-indigo-300">
                                <CheckCircle2 size={16} className="text-emerald-400" /> Value Premium: +45% 
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Role Evolution Grid: Hover to Reveal */}
      <section className="py-32 bg-indigo-950 text-white">
         <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
               <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-none">Identify Your <span className="text-amber-400">Future Form.</span></h2>
               <p className="text-indigo-200 text-xl font-medium italic opacity-60">Hover over your current lineage to reveal your 2026 evolution.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { from: "Junior Developer", to: "AI Agent Architect", gain: "+65% ROI", icon: Terminal },
                 { from: "Marketing Mgr", to: "Content Orchestrator", gain: "+40% ROI", icon: MessageSquare },
                 { from: "Compliance Officer", to: "AI Ethicist", gain: "+80% ROI", icon: ShieldCheck },
                 { from: "Data Analyst", to: "Strategic Forecaster", gain: "+55% ROI", icon: BarChart3 },
                 { from: "UI/UX Designer", to: "Human-AI Interaction Dir", gain: "+70% ROI", icon: Eye },
                 { from: "Legal Assistant", to: "AI Validator", gain: "+45% ROI", icon: Gavel },
                 { from: "Project Mgr", to: "Agent Systems Conductor", gain: "+60% ROI", icon: Target },
                 { from: "Finance Ops", to: "Forensics Strategist", gain: "+50% ROI", icon: Briefcase }
               ].map((role, i) => (
                 <div key={i} className="relative h-64 group">
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Legacy Role</span>
                       <h4 className="text-2xl font-black uppercase italic leading-none text-slate-300">{role.from}</h4>
                    </div>
                    <div className="absolute inset-0 bg-amber-400 border border-amber-500 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center transition-all duration-500 opacity-0 scale-110 rotate-3 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 shadow-3xl">
                       <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest mb-4 italic">Evolution Path</span>
                       <h4 className="text-2xl font-black uppercase italic leading-none text-indigo-950 mb-4">{role.to}</h4>
                       <div className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-[10px] font-black uppercase">{role.gain}</div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-20 text-center">
               <button onClick={onStart} className="px-14 py-6 bg-white text-indigo-950 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all shadow-3xl group">
                 Explore all 20 Strategic Pivots <ChevronRight className="inline ml-2 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
         </div>
      </section>

      {/* The Manifesto / Final CTA */}
      <section className="relative z-10 py-48 bg-[#fffdf5]">
         <div className="max-w-4xl mx-auto px-8 text-center space-y-16">
            <div className="w-32 h-32 bg-indigo-50 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-inner border-2 border-indigo-100 group hover:rotate-12 transition-transform">
               <Fingerprint size={64} className="text-indigo-900" />
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]">
               You Are Not <br />
               <span className="text-rose-500">Replaceable.</span>
            </h2>
            <p className="text-slate-500 text-3xl font-medium leading-relaxed italic border-x-8 border-indigo-100 px-12">
               "Your skills haven't lost value; they've lost their current container. We help you pour your expertise into the next professional vessel—one designed for leadership, not labor."
            </p>
            <div className="pt-10">
               <button 
                onClick={onStart}
                className="px-20 py-10 bg-indigo-950 text-white rounded-[4rem] font-black text-2xl uppercase tracking-tighter hover:bg-indigo-900 transition-all shadow-3xl hover-card active:scale-95 group"
               >
                 Launch My Evolution <ArrowRight size={32} className="inline ml-6 group-hover:translate-x-3 transition-transform text-amber-400" />
               </button>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mt-12">Private • Secure • Neural Integrity Guaranteed</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-100 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            <div className="space-y-10">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-950 p-2 rounded-xl text-amber-400"><Sparkles size={20} /></div>
                <span className="text-xl font-black uppercase italic tracking-widest text-indigo-950">FuturePath</span>
              </div>
              <p className="text-sm text-slate-500 font-bold leading-relaxed italic border-l-4 border-amber-400 pl-6">
                Protecting professional integrity through the greatest technological shift in human history.
              </p>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Strategic Links</h4>
              <nav className="flex flex-col gap-6">
                <button onClick={() => onViewChange(ViewState.HOW_IT_WORKS)} className="flex items-center gap-4 text-sm font-black text-slate-500 hover:text-indigo-950 transition-all uppercase italic tracking-tighter group text-left">
                   The Engine
                </button>
                <button onClick={() => onViewChange(ViewState.QA_PROTOCOL)} className="flex items-center gap-4 text-sm font-black text-slate-500 hover:text-indigo-950 transition-all uppercase italic tracking-tighter group text-left">
                   QA Protocol
                </button>
              </nav>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Headquarters</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <Globe size={24} className="text-indigo-300 flex-shrink-0" />
                   <p className="text-xs font-bold text-slate-500 leading-relaxed italic uppercase">
                     Strategic Hub RNC-DDBIS<br />
                     Ampang, Selangor
                   </p>
                </div>
                <div className="px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                   <Lock size={16} className="text-indigo-600" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-indigo-900">Neural Data Shield active</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Human Connection</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-indigo-950 group-hover:text-white transition-all">
                     <MessageSquare size={24} />
                  </div>
                  <p className="text-sm font-black text-indigo-950 italic">+6011-6815 8954</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              © 2024 FuturePath Strategic Intelligence. All Neural Rights Reserved.
            </p>
            <div className="flex gap-12">
               <span className="text-[9px] font-black uppercase text-indigo-200 tracking-widest italic flex items-center gap-2">
                 <Activity size={14} /> Resilience: 99.9%
               </span>
               <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-950 transition-colors">Privacy</a>
               <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-950 transition-colors">Protocol Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
