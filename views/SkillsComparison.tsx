
import React, { useState } from 'react';
import { CareerAssessment, UserProfile } from '../types';
import { ShieldAlert, Sparkles, ArrowRight, TrendingDown, TrendingUp, Users, BrainCircuit, Lightbulb, UserCheck, AlertTriangle, Cpu, Target, Zap, ShieldCheck, Timer, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface SkillsComparisonProps {
  assessment: CareerAssessment;
  profile: UserProfile;
}

const SkillsComparison: React.FC<SkillsComparisonProps> = ({ assessment, profile }) => {
  const [expandedWeakness, setExpandedWeakness] = useState<string | null>(null);

  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'Uniquely-Human': return <Users size={20} />;
      case 'AI-Complementary': return <BrainCircuit size={20} />;
      case 'Leadership': return <UserCheck size={20} />;
      case 'High-Value-Expertise': return <Lightbulb size={20} />;
      default: return <TrendingUp size={20} />;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in pb-20 text-indigo-950 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-4">Security Protocol v4.5</div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Capability <span className="text-amber-600">Matrix</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-6 flex items-center gap-3">
            <Cpu size={18} className="text-indigo-600" /> Diagnosis: Identifying Automation Weakness and Human Strength
          </p>
        </div>
        <div className="bg-indigo-950 text-white px-8 py-4 rounded-3xl shadow-xl flex items-center gap-6">
           <div className="text-right">
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Security Score</span>
              <span className="text-4xl font-black italic">{100 - assessment.riskScore}%</span>
           </div>
           <ShieldCheck className="text-emerald-400" size={40} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* WEAKNESSES: Critical Vulnerabilities */}
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-10 bg-rose-600 text-white rounded-[3.5rem] mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform"><ShieldAlert size={120} /></div>
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-inner">
               <ShieldAlert size={40} />
            </div>
            <div className="relative z-10">
              <h4 className="font-black text-3xl uppercase tracking-tighter italic">Vulnerability Log</h4>
              <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">Identify what to fix immediately</p>
            </div>
          </div>
          <div className="space-y-4">
            {assessment.weaknesses.map((skill, i) => (
              <div 
                key={i} 
                className={`group p-8 bg-white rounded-[3rem] border-2 transition-all relative overflow-hidden hover-card cursor-pointer ${expandedWeakness === skill.name ? 'border-rose-400 shadow-2xl' : 'border-slate-100 shadow-sm'}`}
                onClick={() => setExpandedWeakness(expandedWeakness === skill.name ? null : skill.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${expandedWeakness === skill.name ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500'}`}>
                      <TrendingDown size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                         <span className="font-black text-indigo-950 uppercase text-lg italic tracking-tight leading-none">{skill.name}</span>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${skill.vulnerabilityLevel === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>{skill.vulnerabilityLevel}</span>
                      </div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Timer size={10} /> Time to Obsolete: {skill.improvementPriority < 3 ? '12+' : skill.improvementPriority === 3 ? '6' : '3'} Months
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3">
                       Risk: {skill.automationRisk}%
                     </div>
                     {expandedWeakness === skill.name ? <ChevronUp size={16} className="text-rose-500" /> : <ChevronDown size={16} className="text-slate-300" />}
                  </div>
                </div>

                {expandedWeakness === skill.name && (
                   <div className="mt-8 pt-8 border-t-2 border-rose-50 space-y-8 animate-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100">
                            <h5 className="text-[9px] font-black text-rose-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                               <ShieldAlert size={12} /> AI Replacement Tool
                            </h5>
                            <p className="text-sm font-black text-rose-950 uppercase italic">{skill.aiReplacement}</p>
                         </div>
                         <div className="bg-indigo-950 p-6 rounded-[2.5rem] text-white">
                            <h5 className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                               <Zap size={12} /> Urgent Intervention
                            </h5>
                            <p className="text-sm font-bold italic leading-tight">"{skill.urgentAction}"</p>
                         </div>
                      </div>
                      
                      <div className="bg-slate-50 p-8 rounded-[3rem] border-2 border-slate-100">
                         <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">3-Step Improvement Path</h5>
                         <div className="space-y-4">
                            {skill.learningPath.map((step, sIdx) => (
                               <div key={sIdx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xs">{sIdx + 1}</div>
                                  <span className="text-xs font-bold text-slate-700 italic">{step}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                      <button className="w-full py-5 bg-indigo-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-900 transition-all shadow-xl">
                         Access Curated Resources <ExternalLink size={14} />
                      </button>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STRENGTHS: Strategic Moats */}
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-10 bg-indigo-950 text-white rounded-[3.5rem] mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform"><Sparkles size={120} /></div>
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shadow-inner border border-white/10">
               <Sparkles size={40} className="text-amber-400" />
            </div>
            <div className="relative z-10">
              <h4 className="font-black text-3xl uppercase tracking-tighter italic">Strategic Alpha</h4>
              <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">High-value human-centric advantages</p>
            </div>
          </div>
          <div className="space-y-4">
            {assessment.strengths.map((skill, i) => (
              <div key={i} className="group p-8 bg-white rounded-[3rem] border-2 border-indigo-50 shadow-sm hover:shadow-2xl transition-all cursor-default relative overflow-hidden hover-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-950 group-hover:text-amber-400 transition-all shadow-sm">
                      {getSkillIcon(skill.category)}
                    </div>
                    <div>
                      <span className="font-black text-indigo-950 uppercase text-lg italic tracking-tight leading-none">{skill.name}</span>
                      <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-2">{skill.category.replace(/-/g, ' ')}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                     <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">
                       Moat Strength: {skill.resilienceScore}%
                     </div>
                     <div className="w-32 h-2 bg-indigo-50 rounded-full overflow-hidden shadow-inner">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${skill.resilienceScore}%` }}></div>
                     </div>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                   <ShieldCheck size={16} className="text-emerald-600" />
                   <p className="text-[10px] font-bold text-emerald-900 leading-tight italic">Human Advantage: {skill.advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement Priority Matrix Footer - NEW */}
      <div className="bg-slate-900 p-16 rounded-[5rem] text-white relative overflow-hidden mt-12 hover-card shadow-3xl border-b-[20px] border-indigo-600">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Target size={240} /></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <h3 className="text-5xl font-black mb-8 tracking-tighter uppercase italic leading-none">Security <span className="text-amber-400">Response</span> Protocol.</h3>
            <p className="text-slate-400 text-2xl font-medium leading-relaxed mb-10 max-w-2xl italic">
              "We prioritize skills with >80% risk. Fix Critical vectors this week. High vectors this month. Indifference is the only terminal risk."
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {[
                 { label: 'CRITICAL', color: 'bg-rose-600', sub: 'Fix: Week 1' },
                 { label: 'HIGH', color: 'bg-rose-500', sub: 'Fix: Month 1' },
                 { label: 'MEDIUM', color: 'bg-amber-500', sub: 'Fix: Month 3' },
                 { label: 'LOW', color: 'bg-slate-600', sub: 'Ongoing' }
               ].map((p, pIdx) => (
                 <div key={pIdx} className={`${p.color} p-4 rounded-2xl text-center shadow-lg`}>
                    <p className="text-xs font-black">{p.label}</p>
                    <p className="text-[8px] font-bold opacity-60 uppercase mt-1">{p.sub}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center">
             <div className="w-64 h-64 bg-white/5 rounded-full flex flex-col items-center justify-center text-center p-8 border-[16px] border-white/10 shadow-3xl backdrop-blur-md">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Defense Status</span>
                <span className="text-3xl font-black uppercase italic leading-tight">Proactive Hardening</span>
                <ArrowRight size={32} className="mt-4 text-emerald-400" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsComparison;
