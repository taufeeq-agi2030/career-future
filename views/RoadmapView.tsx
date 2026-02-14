
import React from 'react';
import { Roadmap, ViewState } from '../types';
import { CheckCircle2, Globe, Target, BrainCircuit, ShieldCheck, Rocket, Sparkles, Zap, ShieldAlert, Clock, BookOpen, ArrowUpRight, TrendingUp } from 'lucide-react';

interface RoadmapViewProps {
  roadmap: Roadmap;
  onViewChange?: (view: ViewState) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, onViewChange }) => {
  const getIcon = (timeframe: string) => {
    switch(timeframe) {
      case '0-3 Months': return <ShieldAlert size={28} className="text-rose-500" />;
      case '3-6 Months': return <Zap size={28} className="text-amber-500" />;
      case '6-12 Months': return <Rocket size={28} className="text-indigo-500" />;
      default: return <Target size={28} className="text-slate-500" />;
    }
  };

  const getPhaseColor = (timeframe: string) => {
    switch(timeframe) {
      case '0-3 Months': return 'bg-rose-50 border-rose-100 text-rose-950';
      case '3-6 Months': return 'bg-amber-50 border-amber-100 text-amber-950';
      case '6-12 Months': return 'bg-indigo-50 border-indigo-100 text-indigo-950';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 text-indigo-950">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-12">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-950 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-xl">Phase 3 Strategic Synthesis</div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Resiliency <span className="text-amber-600">Roadmap</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-6">Proprietary Phased Evolution Framework</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-100 shadow-xl flex items-center gap-6">
              <div className="text-right">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Mastery Progress</span>
                 <div className="text-3xl font-black italic">{roadmap.overallProgress}%</div>
              </div>
              <TrendingUp className="text-emerald-500" size={32} />
           </div>
        </div>
      </header>

      <div className="space-y-16 mt-20">
        {roadmap.phases.map((phase, index) => (
          <div key={index} className={`p-12 rounded-[4rem] border-2 relative overflow-hidden group hover-card shadow-2xl transition-all ${getPhaseColor(phase.timeframe)}`}>
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
               {getIcon(phase.timeframe)}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
               {/* Left: Phase Objective */}
               <div className="lg:w-1/3 space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-white rounded-[2rem] shadow-xl flex items-center justify-center">
                        {getIcon(phase.timeframe)}
                     </div>
                     <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 block mb-1">{phase.timeframe}</span>
                        <h3 className="text-3xl font-black uppercase italic leading-none">{phase.name}</h3>
                     </div>
                  </div>
                  <p className="text-lg font-bold italic leading-relaxed opacity-80 border-l-4 border-current pl-6 py-2">
                     "{phase.objective}"
                  </p>
                  <div className="bg-white/50 p-6 rounded-3xl border border-white/20 backdrop-blur-sm">
                     <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-50">Projected Resilience Gain</span>
                     <div className="text-4xl font-black italic">+{phase.resilienceGain}%</div>
                  </div>
               </div>

               {/* Right: Tactical Actions */}
               <div className="lg:w-2/3">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 px-4 opacity-50">Tactical Implementation Protocol</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {phase.tasks.map((task, tIdx) => (
                       <div key={tIdx} className="bg-white p-8 rounded-[3rem] shadow-lg border border-white/50 group/item hover:scale-[1.02] transition-all">
                          <div className="flex justify-between items-start mb-6">
                             <span className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black uppercase tracking-widest">{task.category}</span>
                             <span className={`text-[9px] font-black uppercase ${task.difficulty === 'High' ? 'text-rose-500' : 'text-emerald-500'}`}>{task.difficulty} Complexity</span>
                          </div>
                          <h5 className="text-xl font-black uppercase italic leading-none mb-6 text-indigo-950">{task.title}</h5>
                          <div className="space-y-2">
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Resource Access</p>
                             <div className="flex flex-wrap gap-2">
                                {task.resources.map((res, rIdx) => (
                                   <button key={rIdx} onClick={() => onViewChange?.(ViewState.LEARNING_HUB)} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[8px] font-black text-indigo-600 uppercase hover:bg-indigo-950 hover:text-white transition-all">
                                      {res}
                                   </button>
                                ))}
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-950 p-20 rounded-[5rem] text-center shadow-3xl flex flex-col items-center border-b-[20px] border-indigo-900 relative overflow-hidden mt-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <Sparkles size={64} className="text-amber-400 mb-10 animate-pulse" />
        <h3 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Trajectory Certified</h3>
        <p className="text-indigo-200 mb-16 max-w-2xl text-2xl font-medium leading-relaxed italic border-x-2 border-white/10 px-10 py-4">
          "The distance between survival and leadership is a personalized execution protocol."
        </p>
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <button className="px-14 py-6 bg-white text-indigo-950 rounded-[2.5rem] font-black hover:bg-amber-50 transition-all text-xl shadow-2xl uppercase tracking-tighter flex items-center gap-4">
            Export Deployment PDF <ArrowUpRight />
          </button>
          <button className="px-14 py-6 bg-indigo-600 text-white border-2 border-white/20 rounded-[2.5rem] font-black hover:bg-indigo-500 transition-all text-xl uppercase tracking-tighter">
            Share with Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapView;
