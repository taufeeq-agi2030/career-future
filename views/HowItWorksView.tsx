
import React from 'react';
import { Cpu, Search, Database, BrainCircuit, Zap, Target, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

const HowItWorksView: React.FC = () => {
  const pipeline = [
    { 
      step: "01", 
      title: "Signal Capture", 
      icon: Search, 
      desc: "We perform active Google Search grounding across patent registries, VC funding feeds, and open-source agent repositories.",
      tech: "GroundingMetadata Engine"
    },
    { 
      step: "02", 
      title: "Neural Synthesis", 
      icon: BrainCircuit, 
      desc: "Our Gemini 3 Pro reasoning engine cross-references your profile with the captured signals to detect displacement vectors.",
      tech: "Strategic Pro Preview"
    },
    { 
      step: "03", 
      title: "Tactical Execution", 
      icon: Zap, 
      desc: "Gemini 3 Flash converts high-level strategy into a micro-task action plan for your next 90 days.",
      tech: "Flash Acceleration"
    },
    { 
      step: "04", 
      title: "Quality Refereeing", 
      icon: ShieldCheck, 
      desc: "Continuous QA auditing ensures your reflections are deep, honest, and strategically sound for trajectory mapping.",
      tech: "Referee-Grade Logic"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700 space-y-32 pb-40">
      <header className="text-center relative">
        <h2 className="text-6xl md:text-8xl font-black text-indigo-950 italic tracking-tighter uppercase leading-[0.85] mb-12">
          The FuturePath <br />
          <span className="text-amber-600">Intelligence Engine.</span>
        </h2>
        <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
          How we leverage multi-modal models to build the first proactive career resiliency infrastructure.
        </p>
      </header>

      {/* Pipeline Diagram */}
      <section className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 hidden lg:block"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {pipeline.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-[2.5rem] flex items-center justify-center text-indigo-950 mb-8 group hover:border-amber-400 transition-all shadow-2xl relative">
                <p className="absolute -top-4 -right-4 text-amber-500 font-black italic text-4xl opacity-20">{p.step}</p>
                <p.icon size={32} />
              </div>
              <h4 className="text-xl font-black text-indigo-950 uppercase italic tracking-tighter mb-4">{p.title}</h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed italic text-center px-4 mb-6">"{p.desc}"</p>
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl text-[9px] font-black uppercase tracking-widest">{p.tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Model Breakdown */}
      <section className="glass-card p-16 rounded-[4rem] border-slate-100 bg-white/70 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 p-12 text-slate-100 opacity-50"><Layers size={200} /></div>
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12">Model Role Stratification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-amber-600 border border-indigo-100">
                <Target size={24} />
              </div>
              <h4 className="text-2xl font-black text-indigo-950 uppercase italic tracking-tighter">Strategic Brain (Pro)</h4>
            </div>
            <p className="text-slate-600 font-medium italic leading-relaxed pl-16 border-l-2 border-indigo-100">
              Handles complex reasoning, multi-step industry analysis, and Google Search grounding. This is where the long-term "Alpha Gap" is calculated.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100">
                <Zap size={24} />
              </div>
              <h4 className="text-2xl font-black text-indigo-950 uppercase italic tracking-tighter">Tactical Engine (Flash)</h4>
            </div>
            <p className="text-slate-600 font-medium italic leading-relaxed pl-16 border-l-2 border-indigo-100">
              Low-latency JSON generation for daily action items, voice analysis, and real-time chat. Ensures the UI remains responsive and fluid.
            </p>
          </div>
        </div>
      </section>

      {/* Final Tech CTA */}
      <div className="text-center pt-20 border-t border-slate-200">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-3xl shadow-indigo-900/40 animate-pulse">
          <ShieldCheck size={48} />
        </div>
        <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter mb-8 leading-none">Intelligence Is Non-Negotiable.</h3>
        <button className="px-14 py-6 bg-amber-400 text-indigo-950 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 mx-auto hover:bg-amber-500 transition-all shadow-2xl">
          Deploy Your Diagnostic Protocol <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HowItWorksView;
