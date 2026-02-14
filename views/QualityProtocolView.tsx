
import React from 'react';
import { Scale, ShieldCheck, AlertCircle, Fingerprint, Eye, Target, Sparkles, Zap, Award } from 'lucide-react';

const QualityProtocolView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700 space-y-32 pb-40">
      <header className="text-center">
        <div className="w-24 h-24 bg-amber-400 rounded-full border-8 border-indigo-950 shadow-2xl flex items-center justify-center mx-auto mb-10 -rotate-12 animate-float">
          <Scale size={40} className="text-indigo-950" />
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-indigo-950 italic tracking-tighter uppercase leading-[0.85] mb-12">
          The Strategic <br />
          <span className="text-amber-600">Referee Protocol.</span>
        </h2>
        <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
          Every reflection you record is audited by our Neural Referee. Quality of input determines the quality of your career trajectory.
        </p>
      </header>

      {/* Grade Explanation */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { grade: "S", label: "Strategic Master", desc: "High info density, radical honesty, and complex logic.", color: "bg-amber-400 text-indigo-950" },
          { grade: "A", label: "Proactive Lead", desc: "Solid insights with actionable self-critique.", color: "bg-indigo-600 text-white" },
          { grade: "B", label: "Standard Pivot", desc: "Clear description of tasks but lacks deeper context.", color: "bg-slate-100 text-slate-700 border border-slate-200" },
          { grade: "C", label: "Signal Noise", desc: "Vague, low word count, or lack of critical reflection.", color: "bg-white text-slate-400 border border-slate-100" }
        ].map((item, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] bg-white text-center flex flex-col items-center border border-slate-100 shadow-sm">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mb-8 italic shadow-xl ${item.color}`}>
              {item.grade}
            </div>
            <h4 className="text-lg font-black text-indigo-950 uppercase italic mb-4">{item.label}</h4>
            <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Audit Metrics */}
      <section className="space-y-16">
        <div className="text-center">
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Neural Audit Metrics</h3>
           <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Fingerprint, title: "Strategic Honesty", desc: "Detection of bias or sugarcoating in professional assessments." },
            { icon: Eye, title: "Information Density", desc: "Measurement of unique data points per minute of recording." },
            { icon: Target, title: "Logic Continuity", desc: "Checking if your stated goals align with your current actions." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-12 rounded-[3.5rem] bg-white border border-slate-100 group shadow-sm">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-amber-600 mb-8 border border-indigo-100 group-hover:scale-110 transition-transform">
                <item.icon size={28} />
              </div>
              <h4 className="text-2xl font-black text-indigo-950 uppercase italic tracking-tighter mb-4">{item.title}</h4>
              <p className="text-slate-500 text-sm font-medium italic leading-relaxed">"{item.desc}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why We Audit */}
      <section className="bg-gradient-to-br from-indigo-800 to-indigo-950 p-20 rounded-[5rem] border border-indigo-700 relative overflow-hidden flex flex-col md:flex-row items-center gap-20 shadow-2xl">
         <div className="absolute top-0 right-0 p-12 text-amber-400 opacity-10"><ShieldCheck size={240} /></div>
         <div className="flex-1 relative z-10 text-white">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-8 leading-tight">Why We Audit Your Reflections.</h3>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed italic mb-8">
              "Low-quality input leads to low-quality trajectories. The Referee Protocol ensures your growth roadmap is grounded in reality, not wishful thinking. Higher grades unlock advanced mentor tiers and deeper market diagnostics."
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/20 flex items-center gap-3">
                  <Award size={20} className="text-amber-400" />
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">S-Rank Unlocks Private Beta</span>
               </div>
            </div>
         </div>
         <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
               <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-20 animate-pulse"></div>
               <div className="w-56 h-56 bg-white border-[12px] border-amber-400 rounded-full flex flex-col items-center justify-center text-center shadow-3xl">
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Audit Mode</span>
                  <span className="text-4xl font-black text-indigo-950 italic uppercase leading-none">Active</span>
                  <Zap size={32} className="text-amber-500 mt-4 animate-bounce" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default QualityProtocolView;
