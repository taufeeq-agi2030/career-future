
import React from 'react';
import { Sparkles, Target, History, Rocket, Heart, Globe, Cpu, Users } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700 space-y-32 pb-40">
      {/* Our Story / Intro */}
      <section className="text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-200/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            Professional Evolution v3.0
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-indigo-950 italic tracking-tighter uppercase leading-[0.85] mb-12">
            The Story of <br />
            <span className="text-amber-600">Human Alpha.</span>
          </h2>
          <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
            FuturePath AI was born in the surge of 2024, not to replace humanity, but to protect it. We saw a world reacting to AI with fear, and we decided to build a proactive shield for professional value.
          </p>
        </div>
      </section>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="glass-card p-16 rounded-[4rem] border-amber-400/20 bg-white/70 group hover:border-amber-400 transition-all">
          <div className="w-20 h-20 bg-amber-400 rounded-3xl flex items-center justify-center text-indigo-950 mb-10 group-hover:scale-110 transition-transform shadow-xl shadow-amber-400/20">
            <Rocket size={40} />
          </div>
          <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter mb-6">The Vision</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-8">Establish a new professional paradigm.</p>
          <p className="text-indigo-900 text-lg font-medium leading-relaxed italic border-l-4 border-amber-400 pl-8">
            "A global economy where humans are not displaced by AI, but empowered as Strategic Orchestrators—moving from manual execution to intentional judgment."
          </p>
        </div>

        <div className="glass-card p-16 rounded-[4rem] border-indigo-200 bg-white/70 group hover:border-indigo-600 transition-all">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform shadow-xl shadow-indigo-600/20">
            <Target size={40} />
          </div>
          <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter mb-6">The Mission</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-8">Eradicate career obsolescence.</p>
          <p className="text-indigo-900 text-lg font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-8">
            "To provide every professional with real-time neural intelligence, identifying threat vectors before they manifest as displacement, and mapping the trajectory to the Human-Alpha state."
          </p>
        </div>
      </div>

      {/* Core Philosophies */}
      <section className="space-y-16">
        <div className="text-center">
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Core Operating Philosophies</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-amber-400 to-indigo-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Heart, title: "Radical Honesty", desc: "Our AI 'Referee' doesn't sugarcoat. To evolve, we must face current technical vulnerabilities with binary clarity." },
            { icon: Globe, title: "Signal Supremacy", desc: "We process thousands of market signals daily—patents, VC flow, and agent benchmarks—to stay 24 months ahead." },
            { icon: Cpu, title: "Neural Symbiosis", desc: "We believe the highest ROI on intelligence is not just machine learning, but the human-machine collaboration index." }
          ].map((item, i) => (
            <div key={i} className="text-center group">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-8 border border-slate-100 group-hover:text-amber-600 group-hover:border-amber-400/40 shadow-sm transition-all">
                 <item.icon size={28} />
               </div>
               <h4 className="text-xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic">{item.title}</h4>
               <p className="text-slate-500 text-sm font-medium leading-relaxed italic px-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Impact CTA */}
      <section className="bg-indigo-950 rounded-[5rem] p-20 text-center border-b-[24px] border-indigo-600 relative overflow-hidden group">
         <div className="absolute inset-0 bg-amber-400 opacity-5 transition-opacity"></div>
         <div className="relative z-10">
            <Users size={64} className="text-indigo-400 mx-auto mb-10 animate-bounce" />
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">Join the <span className="text-amber-400">Strategic</span> Resistance.</h2>
            <p className="text-indigo-200 text-xl font-medium leading-relaxed max-w-2xl mx-auto italic mb-12">
              "Indifference is the only true risk. Whether you are an individual explorer or a global organization, the Path starts with a single diagnostic signal."
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
               <div className="px-10 py-5 bg-white text-indigo-950 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-amber-50 transition-all cursor-pointer">Partner With FuturePath</div>
               <div className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-500 transition-all cursor-pointer">Read The Whitepaper</div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutView;
