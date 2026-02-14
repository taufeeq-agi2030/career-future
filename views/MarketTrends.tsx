
import React from 'react';
import { CareerAssessment } from '../types';
import { Zap, Activity, Info, ArrowUpRight, Target, Users, Sparkles, Cpu, Layers, Fingerprint, FileText, Landmark } from 'lucide-react';

interface MarketTrendsProps {
  assessment: CareerAssessment;
}

const MarketTrends: React.FC<MarketTrendsProps> = ({ assessment }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-20">
      <header>
        <h2 className="text-3xl font-black text-indigo-950 tracking-tight uppercase italic leading-none">Innovation Command Center</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Active Scanning for Phase 1 Strategic Disruptors</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-400 transition-all hover-card">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform"><Activity size={100} /></div>
          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Adoption Velocity</h4>
          <p className="text-2xl font-black text-indigo-950 italic uppercase">Accelerated</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <Target size={14} className="text-indigo-600" /> Verified
          </div>
        </div>
        <div className="p-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-400 transition-all hover-card">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform"><Zap size={100} /></div>
          <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Risk Volatility</h4>
          <p className="text-2xl font-black text-indigo-950 italic uppercase">Moderate-High</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <Users size={14} className="text-indigo-600" /> Aggressive
          </div>
        </div>
        <div className="p-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-400 transition-all hover-card">
           <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform"><Cpu size={100} /></div>
          <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Tech Alpha</h4>
          <p className="text-2xl font-black text-indigo-950 italic uppercase">Systemic Shift</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <ArrowUpRight size={14} className="text-indigo-600" /> Vectors Logged
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
           <Layers size={24} className="text-indigo-600" />
           <h3 className="text-xl font-black uppercase text-indigo-950 tracking-tighter">Technology Adoption Tracker</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {assessment.trendingTools.map((tool, i) => (
            <div key={i} className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-400 transition-all flex flex-col justify-between group hover-card">
              <div>
                <div className="flex items-center justify-between mb-8">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-950 group-hover:text-white transition-all shadow-lg">
                      <Cpu size={28} />
                   </div>
                   <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Adoption Rate</span>
                      <span className="text-2xl font-black text-indigo-950 italic">{tool.adoptionRate}%</span>
                   </div>
                </div>
                <h4 className="text-2xl font-black text-indigo-950 uppercase italic tracking-tighter mb-4">{tool.name}</h4>
                <p className="text-slate-500 font-bold mb-10 leading-relaxed text-sm italic">
                  "{tool.description}"
                </p>
                
                {/* Technical Provenance Tags - NEW */}
                <div className="flex flex-wrap gap-3 mb-10">
                   {tool.researchSource && (
                      <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2 text-[9px] font-black uppercase text-indigo-600">
                         <FileText size={12} /> {tool.researchSource}
                      </div>
                   )}
                   {tool.patentStatus && (
                      <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2 text-[9px] font-black uppercase text-amber-700">
                         <Landmark size={12} /> {tool.patentStatus}
                      </div>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                   <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</div>
                      <div className="text-xs font-black text-indigo-950 uppercase tracking-tighter italic">{tool.category}</div>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mastery Required</div>
                      <div className="text-xs font-black text-amber-600 uppercase tracking-tighter italic">{tool.masteryLevelRequired}</div>
                   </div>
                </div>
              </div>
              <div className="p-6 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
                 <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Strategic Disruption Impact</div>
                 <p className="text-sm font-black text-indigo-950 leading-tight uppercase italic">"{tool.impact}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Light version of CTA */}
      <div className="bg-white border-2 border-indigo-100 p-16 rounded-[5rem] text-indigo-950 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-sm hover-card">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         <div className="flex-1 relative z-10 text-center lg:text-left">
            <h3 className="text-4xl font-black mb-6 tracking-tighter italic uppercase leading-none">Intelligence Provenance</h3>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl italic mb-10 border-l-4 border-indigo-600 pl-8">
              "Our Phase 1 models process 10,000+ data signals daily from patent registries, ArXiv pre-prints, and VC terminal feeds."
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
               <div className="px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                  <Fingerprint size={18} className="text-indigo-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-950">Live Search Enabled</span>
               </div>
               <div className="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                  <Activity size={18} className="text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-950">Confidence: 94%</span>
               </div>
            </div>
         </div>
         <div className="w-full lg:w-1/3 flex flex-col items-center relative z-10">
            <button className="w-full py-6 bg-indigo-950 text-white rounded-[2.5rem] font-black hover:bg-indigo-900 transition-all text-xl shadow-2xl uppercase tracking-tighter mb-4 shadow-indigo-950/20">
              Export Signal Report
            </button>
            <button className="w-full py-6 bg-white text-indigo-950 border-2 border-indigo-200 rounded-[2.5rem] font-black hover:bg-indigo-50 transition-all text-xl uppercase tracking-tighter">
              Upgrade Monitoring
            </button>
         </div>
      </div>
    </div>
  );
};

export default MarketTrends;
