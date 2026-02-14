
import React, { useState, useEffect } from 'react';
import { UserProfile, CollabSkillsAnalysis } from '../types';
import { generateCollabSkillsQuestions, analyzeCollabSkills } from '../services/geminiService';
import { 
  Zap, 
  BrainCircuit, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  Target, 
  Cpu, 
  Layers, 
  Activity,
  Award,
  ChevronRight,
  RefreshCw,
  Info,
  CheckCircle2,
  Lock,
  Search
} from 'lucide-react';

interface CollabSkillsAssessmentProps {
  profile: UserProfile;
  onComplete: (analysis: CollabSkillsAnalysis) => void;
  existingAnalysis: CollabSkillsAnalysis | null;
}

const CollabSkillsAssessment: React.FC<CollabSkillsAssessmentProps> = ({ profile, onComplete, existingAnalysis }) => {
  const [step, setStep] = useState<'START' | 'QUIZ' | 'ANALYZING' | 'RESULT'>(existingAnalysis ? 'RESULT' : 'START');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<CollabSkillsAnalysis | null>(existingAnalysis);
  const [isLoading, setIsLoading] = useState(false);

  const startAssessment = async () => {
    setIsLoading(true);
    try {
      const qs = await generateCollabSkillsQuestions(profile);
      setQuestions(qs);
      setStep('QUIZ');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    const newAnswers = [...answers, { questionId: questions[currentQ].id, answer }];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('ANALYZING');
      try {
        const result = await analyzeCollabSkills(profile, newAnswers);
        setAnalysis(result);
        onComplete(result);
        setStep('RESULT');
      } catch (err) {
        console.error(err);
        setStep('START');
      }
    }
  };

  if (step === 'START') {
    return (
      <div className="max-w-5xl mx-auto py-12 animate-in fade-in space-y-16 text-indigo-950 pb-32">
        <header className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-800 to-indigo-950 text-amber-400 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-float">
            <Zap size={48} />
          </div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter italic uppercase leading-none mb-6">Collab Skills <span className="text-amber-600">Symphony</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] max-w-2xl mx-auto">
            Shift from Manual Execution to Strategic Curation in the {profile.industry} Sector.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card p-12 rounded-[4rem] bg-white shadow-xl border-2 border-indigo-100 hover-card">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8 leading-none">The Opportunity</h3>
            <p className="text-slate-600 text-lg font-medium leading-relaxed italic border-l-4 border-amber-400 pl-8 mb-10">
              "As a ${profile.role}, your competitive advantage is moving beyond simple task completion. You must become the conductor of machine agents."
            </p>
            <div className="space-y-4">
              {[
                "Identify high-leverage decision nodes",
                "Define industry-specific AI boundaries",
                "Bridge human-alpha judgment gaps",
                "Certify your curation proficiency"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-indigo-950">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-950 p-12 rounded-[4rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Cpu size={200} /></div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] mb-12">Diagnostic Protocol</h4>
              <p className="text-2xl font-black italic uppercase leading-tight mb-8">
                Take our specialized 6-question evaluation to map your {profile.industry} collaborative future.
              </p>
            </div>
            <button 
              onClick={startAssessment}
              disabled={isLoading}
              className="w-full py-6 bg-amber-400 text-indigo-950 rounded-3xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amber-400/20 relative z-10"
            >
              {isLoading ? <RefreshCw className="animate-spin mx-auto" size={20} /> : "Initiate Symphony"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'QUIZ' && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in zoom-in duration-500 text-indigo-950">
        <div className="flex justify-between items-center mb-16">
          <span className="px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em]">
            Diagnostic {currentQ + 1} / {questions.length}
          </span>
          <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-indigo-950 transition-all duration-500" 
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none mb-12 min-h-[120px]">
          {q.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {q.options.map((option: string, i: number) => (
            <button 
              key={i}
              onClick={() => submitAnswer(option)}
              className="w-full p-8 text-left bg-white border-2 border-slate-100 rounded-[2.5rem] font-bold text-indigo-950 hover:border-indigo-950 hover:shadow-2xl transition-all group flex items-center gap-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-indigo-300 group-hover:bg-indigo-950 group-hover:text-white group-hover:border-indigo-950 transition-all">
                {String.fromCharCode(65 + i)}
              </div>
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'ANALYZING') {
    return (
      <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center animate-in fade-in">
        <div className="relative mb-12">
          <div className="w-40 h-40 border-[10px] border-slate-100 rounded-full"></div>
          <div className="w-40 h-40 border-[10px] border-transparent border-t-amber-500 rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="text-indigo-950 animate-pulse" size={64} />
          </div>
        </div>
        <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter text-center leading-none">
          Synthesizing <br />
          <span className="text-amber-600">Collaborative Blueprint</span>
        </h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-6">Grounding answers in ${profile.industry} market benchmarks...</p>
      </div>
    );
  }

  if (step === 'RESULT' && analysis) {
    return (
      <div className="max-w-6xl mx-auto py-12 animate-in slide-in-from-bottom-8 duration-700 space-y-12 pb-32 text-indigo-950">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-200 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-200">
              <ShieldCheck size={14} /> Diagnostic Certified
            </div>
            <h2 className="text-6xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none">The Symphony <span className="text-amber-600">Report</span></h2>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Curation Proficiency</span>
             <div className="text-7xl font-black italic text-indigo-950 drop-shadow-xl">{analysis.curationScore}%</div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className="glass-card p-12 rounded-[4rem] bg-white shadow-2xl border-2 border-indigo-50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5"><Layers size={140} /></div>
               <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10">Industry Alignment Verdict</h3>
               <p className="text-3xl font-black italic uppercase text-indigo-950 leading-tight mb-8">
                 "{analysis.industryVerdict}"
               </p>
               <div className="flex gap-4 pt-8 border-t border-slate-100">
                  <div className="px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                    <Activity size={18} className="text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Market Shift</span>
                  </div>
                  <div className="px-6 py-3 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                    <Target size={18} className="text-amber-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Alpha Gap Isolated</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="glass-card p-10 rounded-[4rem] bg-indigo-950 text-white shadow-3xl hover-card">
                  <h4 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                    <BrainCircuit size={18} /> Human Alpha Gaps
                  </h4>
                  <div className="space-y-4">
                    {analysis.humanAlphaGaps.map((gap, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                        <ArrowRight size={16} className="text-amber-400" />
                        <span className="text-xs font-bold uppercase italic leading-none">{gap}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="glass-card p-10 rounded-[4rem] bg-white shadow-xl border-2 border-indigo-100 hover-card">
                  <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                    <Compass size={18} /> Strategic Skills
                  </h4>
                  <div className="space-y-4">
                    {analysis.recommendedAgenticSkills.map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-black uppercase italic text-indigo-950">{item.skill}</span>
                           <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${item.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                              {item.priority}
                           </span>
                        </div>
                        <p className="text-[10px] font-medium italic text-slate-500 leading-relaxed">"{item.reason}"</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-amber-400 p-12 rounded-[4.5rem] text-indigo-950 shadow-2xl shadow-amber-400/30 group hover-card">
               <div className="w-16 h-16 bg-indigo-950 text-amber-400 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                 <Award size={32} />
               </div>
               <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">Mastery Goal</h4>
               <p className="text-lg font-black italic leading-tight mb-10">
                 "Bridge your Curation Proficiency from {analysis.curationScore}% to 95% by focusing on Strategic Logic Oversight."
               </p>
               <button 
                onClick={() => setStep('START')}
                className="w-full py-5 bg-indigo-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
               >
                 <RefreshCw size={14} /> Re-Diagnostics
               </button>
            </div>

            <div className="p-10 rounded-[4rem] bg-white border border-slate-200 shadow-sm">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Expert Context</h5>
               <p className="text-xs font-medium italic leading-relaxed text-slate-600">
                  "In the {profile.industry} sector, the most resilient professionals aren't those who master the tools fastest, but those who best orchestrate the multi-tool ecosystem to solve high-stakes problems."
               </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CollabSkillsAssessment;
