import React, { useState } from 'react';
import { UserProfile, CareerAssessment } from '../types';
import { bsi } from '../services/backendService';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  BrainCircuit, 
  Target, 
  Zap, 
  Award,
  RotateCcw,
  FileSearch,
  Timer,
  Radar,
  TrendingUp,
  Loader2,
  Trophy,
  // Added Bot and Activity to fix missing name errors
  Bot,
  Activity
} from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AssessmentLabProps {
  profile: UserProfile;
  assessment: CareerAssessment;
  onComplete: (updatedAssessment?: CareerAssessment) => void;
}

const AI_COLLAB_TEST_QUESTIONS = [
  {
    q: "When a model provides a hallucination (false fact), what is the most effective corrective action in a professional workflow?",
    a: [
      "Regenerate the prompt with 'Think harder' instructions.",
      "Verify against trusted source grounding and provide those sources in a revised prompt.",
      "Switch to a smaller model to reduce complexity.",
      "Manually edit the output without informing the model."
    ],
    correct: 1
  },
  {
    q: "How do you define 'Chain of Thought' prompting in a professional career context?",
    a: [
      "Asking the AI to list every possible tool it can use.",
      "Requesting the AI to explain its step-by-step reasoning before providing a final answer.",
      "Linking multiple AI models together in a series.",
      "Talking to the AI as if it were a human mentor."
    ],
    correct: 1
  },
  {
    q: "Which tool type is best for complex data visualization and trend analysis compared to pure text generation?",
    a: [
      "Standard Chat Interface",
      "Code Interpreter / Advanced Data Analysis sandboxes",
      "Image Generation Models",
      "Retrieval Augmented Generation (RAG) engines"
    ],
    correct: 1
  },
  {
    q: "What is the primary risk of 'Automation Bias' in strategic decision-making?",
    a: [
      "Becoming too slow due to over-reliance on tech.",
      "Over-trusting machine outputs and ignoring contradictory human intuition or evidence.",
      "Spending too much money on API credits.",
      "Learning too many different tools at once."
    ],
    correct: 1
  },
  {
    q: "How should you handle sensitive company data when using standard public LLM interfaces?",
    a: [
      "Ask the AI to delete the data after processing.",
      "Anonymize or mask all sensitive PII and proprietary logic before inputting.",
      "Only use the AI during off-peak hours.",
      "Trust the provider's standard terms of service without further action."
    ],
    correct: 1
  },
  {
    q: "What does the 'Human-in-the-loop' (HITL) principle primarily emphasize?",
    a: [
      "Humans doing the manual labor while AI watches.",
      "AI acting as a fully autonomous decision-maker.",
      "The necessity of human judgment to audit, refine, and approve machine outputs.",
      "Humans learning how to code the AI models from scratch."
    ],
    correct: 2
  },
  {
    q: "In task decomposition for AI, what is typically the first step before involving machine intelligence?",
    a: [
      "Writing the final prompt.",
      "Defining the clear strategic objective and success metrics.",
      "Selecting the most expensive model available.",
      "Generating 10 random ideas to see what sticks."
    ],
    correct: 1
  },
  {
    q: "How do you evaluate the reliability of a RAG-based (Retrieval Augmented Generation) response?",
    a: [
      "Check if the answer sounds confident.",
      "Verify the citations and confirm the answer is directly supported by the retrieved documents.",
      "Ask the AI 'Is this true?'.",
      "If the response is long, it is likely reliable."
    ],
    correct: 1
  },
  {
    q: "When a model refuses a task due to safety filters, what is the best ethical approach?",
    a: [
      "Try to 'jailbreak' the prompt to bypass the filters.",
      "Re-evaluate the task for potential risks and refine the approach to stay within safety boundaries.",
      "Complain to the provider.",
      "Ignore the task entirely."
    ],
    correct: 1
  },
  {
    q: "What is a 'System Instruction' in the context of professional agent configuration?",
    a: [
      "A manual for how to fix the computer.",
      "The core persona, rules, and behavioral boundaries set before a conversation begins.",
      "The list of all previous messages in the chat.",
      "The user's login credentials."
    ],
    correct: 1
  },
  {
    q: "How does 'Context Window' size primarily affect your multi-document analysis?",
    a: [
      "It determines how fast the AI can type.",
      "It determines how much total information the AI can hold in its 'active memory' during a session.",
      "It limits the number of images the AI can see.",
      "It affects the color scheme of the UI."
    ],
    correct: 1
  },
  {
    q: "What is the key difference between Zero-shot and Few-shot prompting?",
    a: [
      "Zero-shot uses no electricity.",
      "Few-shot involves providing specific examples of inputs and outputs within the prompt.",
      "Zero-shot is only for simple math.",
      "Few-shot requires the user to have a degree in AI."
    ],
    correct: 1
  },
  {
    q: "How do you detect subtle algorithmic bias in an AI-generated hiring recommendation?",
    a: [
      "You cannot; AI is perfectly neutral.",
      "Compare the AI's selection criteria against your own diversity and merit standards for inconsistencies.",
      "Ask the AI if it is biased.",
      "Check the grammar of the recommendation."
    ],
    correct: 1
  },
  {
    q: "What defines an 'Agentic Workflow' compared to standard 'Linear Chat'?",
    a: [
      "Using a more expensive model.",
      "A multi-step process where the AI plans, executes, reflects, and iterates on its own work.",
      "Typing faster than the AI can respond.",
      "Sharing the chat link with others."
    ],
    correct: 1
  },
  {
    q: "How do you verify the 'source grounding' of an AI's professional market claim?",
    a: [
      "Ask if it's 100% sure.",
      "Check for clickable citations and cross-verify those links with primary market data sources.",
      "Assume the AI is always up to date.",
      "Trust it if it matches your existing beliefs."
    ],
    correct: 1
  }
];

const AssessmentLab: React.FC<AssessmentLabProps> = ({ profile, assessment: initialAssessment, onComplete }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [activeSimulation, setActiveSimulation] = useState<number | null>(null);
  
  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<number | null>(initialAssessment.aiCollabTestScore || null);
  const [isSaving, setIsSaving] = useState(false);
  const [workingAssessment, setWorkingAssessment] = useState<CareerAssessment>(initialAssessment);

  const modules = [
    { id: 'ai-collab', name: 'Proficiency Test (M0)', icon: Award, color: 'text-amber-500' },
    { id: 'ai-collab-report', name: 'AI Collab (M1)', icon: BrainCircuit, color: 'text-blue-500' },
    { id: 'tasks', name: 'Task Map (M2)', icon: ShieldAlert, color: 'text-amber-500' },
    { id: 'readiness', name: 'Future Ready (M3)', icon: Zap, color: 'text-purple-500' },
    { id: 'simulation', name: 'Simulation (M4)', icon: Timer, color: 'text-indigo-500' },
    { id: 'radar', name: 'Job Radar (M7)', icon: Radar, color: 'text-red-500' },
    { id: 'positioning', name: 'Positioning (M8)', icon: Target, color: 'text-cyan-500' },
    { id: 'forecast', name: 'Forecast (M9)', icon: TrendingUp, color: 'text-emerald-500' },
    { id: 'resume', name: 'Reverse Resume', icon: FileSearch, color: 'text-slate-500' }
  ];

  const nextModule = () => {
    if (currentModule < modules.length - 1) setCurrentModule(currentModule + 1);
    else onComplete(workingAssessment);
  };

  const prevModule = () => {
    if (currentModule > 0) setCurrentModule(currentModule - 1);
  };

  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQ(0);
    setAnswers([]);
    setQuizResult(null);
  };

  const submitAnswer = async (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentQ < AI_COLLAB_TEST_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const correctCount = newAnswers.reduce((acc, ans, i) => 
        ans === AI_COLLAB_TEST_QUESTIONS[i].correct ? acc + 1 : acc, 0
      );
      const finalScore = Math.round((correctCount / AI_COLLAB_TEST_QUESTIONS.length) * 100);
      
      setIsSaving(true);
      const updatedAssessment = { ...workingAssessment, aiCollabTestScore: finalScore };
      try {
        await bsi.saveRecord('assessments', updatedAssessment, 'MEMBER');
        setWorkingAssessment(updatedAssessment);
        setQuizResult(finalScore);
        setQuizActive(false);
      } catch (err) {
        console.error("Failed to persist score", err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const renderQuiz = () => (
    <div className="space-y-12 animate-in fade-in zoom-in duration-700 text-indigo-950">
      {!quizActive && quizResult === null ? (
        <div className="bg-white p-16 rounded-[4rem] border-2 border-indigo-100 text-center shadow-2xl hover-card">
          <Trophy size={100} className="text-amber-500 mx-auto mb-10 animate-float" />
          <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">AI Collaboration Test</h3>
          <p className="text-slate-500 text-2xl font-medium leading-relaxed italic mb-16 max-w-2xl mx-auto">
            "Your professional value is no longer just what you can do, but what you can orchestrate." 
            <br/><br/>
            Evaluate your technical symbiosis across 15 high-stakes professional scenarios.
          </p>
          <button onClick={startQuiz} className="px-16 py-8 bg-indigo-950 text-amber-400 rounded-[3rem] font-black text-2xl uppercase tracking-tighter shadow-3xl hover:scale-105 transition-all">
            Begin Diagnostic protocol
          </button>
        </div>
      ) : quizActive ? (
        <div className="bg-white p-14 rounded-[5rem] border-2 border-indigo-950 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
             <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${((currentQ + 1) / 15) * 100}%` }}></div>
          </div>
          <div className="flex justify-between items-center mb-16">
            <span className="px-6 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full shadow-inner tracking-widest">Diagnostic Node {currentQ + 1} / 15</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Calibration Active</span>
               <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
          </div>
          <h4 className="text-4xl font-black text-indigo-950 uppercase italic leading-[1.1] mb-16 min-h-[140px] tracking-tight">
            {AI_COLLAB_TEST_QUESTIONS[currentQ].q}
          </h4>
          <div className="grid grid-cols-1 gap-6">
            {AI_COLLAB_TEST_QUESTIONS[currentQ].a.map((option, idx) => (
              <button 
                key={idx}
                disabled={isSaving}
                onClick={() => submitAnswer(idx)}
                className="w-full p-8 text-left bg-slate-50 border-2 border-slate-100 rounded-[3rem] font-bold text-xl text-indigo-950 transition-all group flex items-center gap-8 hover-card hover:bg-white hover:border-indigo-600 disabled:opacity-50 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center font-black group-hover:bg-indigo-950 group-hover:text-white transition-all shadow-md group-active:scale-90">
                  {String.fromCharCode(65 + idx)}
                </div>
                {option}
              </button>
            ))}
          </div>
          {isSaving && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-[5rem] flex flex-col items-center justify-center z-20">
               <Loader2 className="text-indigo-600 animate-spin mb-6" size={64} />
               <p className="font-black uppercase tracking-[0.5em] text-sm text-indigo-950">Synthesizing Proficiency Matrix...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-indigo-950 p-20 rounded-[6rem] text-white text-center shadow-3xl animate-in zoom-in duration-700 relative overflow-hidden hover-card border-b-[30px] border-indigo-900">
          <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12"><CheckCircle2 size={320} /></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 text-[10px] font-black uppercase rounded-full mb-12 shadow-lg tracking-widest">Validation Certification Complete</div>
            <div className="text-[12rem] font-black italic tracking-tighter mb-4 text-amber-400 drop-shadow-2xl leading-none">{quizResult}</div>
            <p className="text-indigo-300 text-2xl font-black uppercase tracking-[0.5em] mb-16">Total Orchestration Index</p>
            <div className="bg-white/10 p-12 rounded-[4rem] border-2 border-white/20 max-w-3xl mx-auto italic mb-16 shadow-inner text-2xl font-medium leading-relaxed">
               {quizResult! >= 85 
                ? "STRATEGIC CONDUCTOR: You demonstrate high-order logic synthesis and a deep understanding of agentic boundaries. You are primed for Tier 3 leadership." 
                : quizResult! >= 60 
                  ? "EMERGING SYMBIONT: You have mastered the base tools but still lean on reactive labor. Focus on Step 4 of the Skill Audit." 
                  : "AI NOVICE: Critical vulnerability detected in logic verification. Immediate upskilling in Grounding Verification required."}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <button onClick={startQuiz} className="px-12 py-6 bg-white/5 border-2 border-white/20 text-white rounded-[2.5rem] font-black text-lg uppercase tracking-tighter hover:bg-white/10 transition-all flex items-center justify-center gap-4">
                <RotateCcw size={22} /> Re-Calibrate Signal
              </button>
              <button onClick={nextModule} className="px-16 py-8 bg-amber-400 text-indigo-950 rounded-[3rem] font-black text-2xl uppercase tracking-tighter shadow-2xl hover:scale-110 transition-all hover:bg-amber-300">
                Proceed to Lab Modules <ArrowRight size={28} className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAICollab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="bg-blue-600 p-14 rounded-[5rem] text-white flex items-center justify-between hover-card shadow-2xl relative overflow-hidden border-b-[20px] border-blue-800">
         <div className="absolute -right-20 -bottom-20 opacity-10"><BrainCircuit size={400} /></div>
         <div className="max-w-xl relative z-10">
            <h4 className="text-5xl font-black mb-6 italic uppercase tracking-tighter leading-none">Collaboration Index</h4>
            <p className="text-blue-100 text-xl font-medium leading-relaxed italic">
              "Based on your diagnostic profile, we've benchmarked your ability to govern autonomous workflows."
            </p>
         </div>
         <div className="text-[10rem] font-black italic opacity-20 relative z-10 leading-none">{workingAssessment.aiCollabScore}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="p-10 bg-white rounded-[4rem] border-2 border-slate-100 shadow-xl hover-card">
            <h5 className="text-[10px] font-black uppercase text-blue-500 mb-6 tracking-[0.4em]">Collab Profile</h5>
            <p className="text-3xl font-black text-indigo-950 uppercase mb-6 italic leading-none">
              {workingAssessment.aiCollabScore > 75 ? 'AI-enhanced Orchestrator' : 'Reactive Tool-User'}
            </p>
            <p className="text-slate-500 text-lg font-medium leading-relaxed italic border-l-4 border-blue-500 pl-8">
              "Your approach leans heavily towards {workingAssessment.aiCollabScore > 75 ? 'Strategic Integration' : 'Manual Task Completion'}. We recommend focusing on Phase 4 of the Monthly Skill Audit."
            </p>
         </div>
         <div className="p-10 bg-indigo-950 rounded-[4rem] text-white shadow-3xl hover-card border-b-[16px] border-indigo-900">
            <h5 className="text-[10px] font-black uppercase text-blue-400 mb-6 tracking-[0.4em]">Mastery Directive</h5>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 shadow-inner">
               <Zap size={32} />
            </div>
            <p className="text-xl font-black italic leading-tight mb-4">"Shift your prompt strategy from 'Content' to 'Logic'."</p>
            <p className="text-blue-200 text-sm font-medium italic opacity-70">
              "Stop asking AI to write emails; start asking it to build communication architectures that you approve and refine."
            </p>
         </div>
      </div>
    </div>
  );

  const renderReadiness = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-center">
         <div className="inline-block p-12 bg-purple-100 text-purple-600 rounded-[3rem] mb-10 shadow-2xl animate-float border-4 border-white">
            <Zap size={80} fill="currentColor" />
         </div>
         <h4 className="text-7xl font-black text-indigo-950 uppercase tracking-tighter italic mb-4 leading-none">SCORE: {workingAssessment.futureReadinessScore}/200</h4>
         <div className="inline-block px-6 py-2 bg-indigo-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Diagnostic Level: {workingAssessment.futureReadinessScore > 150 ? 'AI-ADAPTIVE ELITE' : 'VULNERABLE ENTITY'}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           // icon: Bot needs to be imported from lucide-react
           { label: 'Agent Adoption', val: 'Accelerated', color: 'text-emerald-500', icon: Bot },
           { label: 'Proactive Bias', val: 'Moderate', color: 'text-amber-500', icon: TrendingUp },
           { label: 'Market Resiliency', val: 'Stable', color: 'text-blue-500', icon: ShieldAlert }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-100 text-center shadow-xl hover-card group">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6 group-hover:bg-indigo-950 group-hover:text-white transition-all shadow-inner">
                 <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] block mb-2">{stat.label}</span>
              <span className={`text-2xl font-black uppercase italic ${stat.color}`}>{stat.val}</span>
           </div>
         ))}
      </div>
    </div>
  );

  const renderSimulation = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-center mb-14">
         <h4 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic leading-none">Project Simulations</h4>
         <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Benchmarking strategic output under industry disruption</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {workingAssessment.simulationChallenges.map((challenge, i) => (
          <div key={i} className={`p-12 rounded-[5rem] border-4 transition-all cursor-pointer group flex flex-col justify-between h-[500px] hover-card shadow-2xl ${
            activeSimulation === i ? 'bg-indigo-950 border-amber-400 text-white' : 'bg-white border-slate-100 hover:border-indigo-300'
          }`} onClick={() => setActiveSimulation(i)}>
            <div>
               <div className="flex justify-between items-start mb-10">
                  <div className={`p-5 rounded-3xl shadow-xl ${activeSimulation === i ? 'bg-amber-400 text-indigo-950' : 'bg-slate-50 text-indigo-600'}`}>
                     <RotateCcw size={32} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${activeSimulation === i ? 'text-amber-400' : 'text-slate-300'}`}>{challenge.difficulty} SCAN</span>
               </div>
               <h5 className="text-3xl font-black uppercase mb-6 leading-tight italic">{challenge.title}</h5>
               <p className={`text-lg font-medium leading-relaxed italic border-l-4 ${activeSimulation === i ? 'text-indigo-100 border-amber-400' : 'text-slate-500 border-indigo-600'} pl-8`}>
                 "{challenge.scenario}"
               </p>
            </div>
            
            <div className="space-y-6">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-current pb-4 opacity-40">
                  <span>Reveal Level</span>
                  <span>{challenge.reveals} Nodes</span>
               </div>
               <button className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase transition-all shadow-xl ${
                 activeSimulation === i ? 'bg-amber-400 text-indigo-950 hover:bg-white' : 'bg-indigo-950 text-white hover:bg-indigo-900'
               }`}>
                 Start Challenge Protocol <ArrowRight size={18} className="inline ml-2" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResume = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="bg-slate-900 p-16 rounded-[6rem] text-white flex flex-col md:flex-row items-center gap-16 border-b-[24px] border-slate-950 hover-card shadow-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-16 opacity-5"><FileSearch size={300} /></div>
         <div className="w-44 h-44 bg-white/10 rounded-[4rem] flex items-center justify-center text-white border-2 border-white/20 shadow-inner group-hover:scale-105 transition-transform">
            <FileSearch size={90} />
         </div>
         <div className="flex-1 relative z-10">
            <div className="flex items-center gap-6 mb-6">
               <div className="px-5 py-2 bg-indigo-600 text-[10px] font-black uppercase rounded-xl shadow-lg">Critical Intelligence Grade</div>
               <span className="text-7xl font-black italic text-amber-400 leading-none">{workingAssessment.resumeAnalysis.aiReadinessGrade}</span>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-4">Reverse Resume Diagnostic</h3>
            <p className="text-slate-400 text-2xl font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-8">
              "We've scanned your current positioning through the eyes of Phase 2 hiring algorithms. Your market gaps are now isolated."
            </p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-white p-12 rounded-[4.5rem] border-2 border-slate-100 shadow-2xl hover-card">
            <h5 className="text-[10px] font-black uppercase text-rose-500 mb-10 tracking-[0.5em] flex items-center gap-3"><ShieldAlert size={18}/> Vulnerability Nodes</h5>
            <div className="space-y-4">
               {workingAssessment.resumeAnalysis.missingSkills.map((s: string, i: number) => (
                 <div key={i} className="flex items-center gap-6 p-6 bg-rose-50 rounded-3xl border border-rose-100 text-rose-950 font-black text-sm uppercase italic group hover:bg-rose-600 hover:text-white transition-all">
                    <ShieldAlert size={20} className="text-rose-500 group-hover:text-white" /> {s}
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-white p-12 rounded-[4.5rem] border-2 border-slate-100 shadow-2xl hover-card">
            <h5 className="text-[10px] font-black uppercase text-indigo-500 mb-10 tracking-[0.5em] flex items-center gap-3"><Target size={18}/> Strategic Value Prop</h5>
            <p className="text-slate-500 text-xl font-bold italic leading-relaxed mb-12 border-l-4 border-indigo-500 pl-8">
              "{workingAssessment.resumeAnalysis.strategicValue}"
            </p>
            <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
               <span className="text-[10px] font-black uppercase text-slate-400 block mb-6 tracking-widest">Market Sentiment Delta</span>
               <div className="flex flex-wrap gap-3">
                  {workingAssessment.resumeAnalysis.marketGaps.map((g: string, i: number) => (
                    <span key={i} className="text-[10px] font-black text-indigo-950 uppercase px-5 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-400 transition-all">{g}</span>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderRadar = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-center mb-14">
         <h4 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic leading-none">Radar Threat Tracker</h4>
         <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Active scanning for 6-24 Month Disruption Vectors</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {workingAssessment.radarThreats.map((threat, i) => (
          <div key={i} className="bg-white p-10 rounded-[4rem] border-2 border-slate-100 shadow-xl relative overflow-hidden group hover-card">
            <div className={`absolute top-0 right-0 p-10 opacity-5 ${threat.risk === 'Critical' ? 'text-rose-600' : 'text-indigo-950'} group-hover:scale-110 transition-transform`}>
               <Radar size={100} />
            </div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-8">
                  <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${threat.category === 'Immediate' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}>
                    {threat.category}
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${threat.risk === 'Critical' ? 'text-rose-600' : 'text-indigo-600'}`}>Risk: {threat.risk}</div>
               </div>
               <h5 className="text-2xl font-black text-indigo-950 uppercase mb-4 italic leading-tight">{threat.title}</h5>
               <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed italic">"{threat.impact}"</p>
               <div className="p-6 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex items-center gap-6 shadow-inner group-hover:bg-rose-100 transition-colors">
                  <ShieldAlert size={28} className="text-rose-600" />
                  <div className="flex-1">
                     <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Defense Action</p>
                     <p className="text-sm font-black text-rose-900 italic">{threat.action}</p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPositioning = () => {
    const data = [
      { x: workingAssessment.positioning.x, y: workingAssessment.positioning.y, name: workingAssessment.positioning.currentLabel, fill: '#6366f1' },
      { x: workingAssessment.positioning.targetX, y: workingAssessment.positioning.targetY, name: workingAssessment.positioning.targetLabel, fill: '#10b981' }
    ];
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
        <div className="text-center">
          <h4 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic leading-none">Market Position Map</h4>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Mapping Domain Expertise vs. AI Orchestration proficiency</p>
        </div>
        <div className="bg-white p-14 rounded-[5rem] border-2 border-slate-100 shadow-2xl relative h-[550px] hover-card">
           <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" dataKey="x" name="Domain Mastery" unit="%" domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="AI Orchestration" unit="%" domain={[0, 100]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={data} fill="#8884d8">
                   {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Scatter>
              </ScatterChart>
           </ResponsiveContainer>
           <div className="absolute bottom-8 right-8 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-indigo-600"><div className="w-2 h-2 rounded-full bg-indigo-600" /> Current Position</div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-600" /> 12-Month Target</div>
           </div>
        </div>
      </div>
    );
  };

  const renderForecast = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-center">
        <h4 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic leading-none">5-Year Strategy Forecast</h4>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">The Cost of Inaction vs. Proactive Evolution</p>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {[workingAssessment.trajectories.pathA, workingAssessment.trajectories.pathB].map((path, i) => (
          <div key={i} className={`p-14 rounded-[5rem] border-4 flex flex-col md:flex-row gap-16 hover-card shadow-2xl ${i === 0 ? 'bg-white border-slate-100' : 'bg-indigo-950 text-white border-amber-400'}`}>
            <div className="flex-1">
               <div className="flex items-center gap-6 mb-10">
                  <span className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${i === 0 ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white'}`}>{path.label}</span>
                  <div className="flex gap-2">{path.emoji.map((e: string, idx: number) => <span key={idx} className="text-3xl drop-shadow-xl">{e}</span>)}</div>
               </div>
               <div className="grid grid-cols-3 gap-10">
                  <div><span className={`text-[10px] font-black uppercase opacity-40 block mb-3 tracking-widest ${i === 1 ? 'text-indigo-300' : ''}`}>Today</span><p className="text-2xl font-black italic leading-none">{path.todayVal}</p></div>
                  <div><span className={`text-[10px] font-black uppercase opacity-40 block mb-3 tracking-widest ${i === 1 ? 'text-indigo-300' : ''}`}>2 Years</span><p className="text-2xl font-black italic leading-none">{path.twoYearVal}</p></div>
                  <div><span className={`text-[10px] font-black uppercase opacity-40 block mb-3 tracking-widest ${i === 1 ? 'text-indigo-300' : ''}`}>5 Years</span><p className={`text-5xl font-black italic leading-none ${i === 1 ? 'text-amber-400' : 'text-rose-500'}`}>{path.fiveYearVal}</p></div>
               </div>
            </div>
            <div className={`md:w-80 border-l-4 pl-12 flex flex-col justify-center ${i === 1 ? 'border-white/10' : 'border-slate-50'}`}>
               <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 ${i === 1 ? 'text-indigo-300' : 'text-slate-400'}`}>Resiliency Rank</span>
               <div className={`w-full h-3 rounded-full overflow-hidden mb-6 shadow-inner ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <div className={`h-full transition-all duration-1000 ${path.riskFive > 70 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${100 - path.riskFive}%` }}></div>
               </div>
               <p className={`text-xs font-bold italic leading-relaxed ${i === 1 ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {i === 0 ? "Forecasted market obsolescence risk: Critical." : "Forecasted leadership position verified."}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="text-center">
         <h4 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-4 italic leading-none">Workday Automation Map</h4>
         <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Real-time task vulnerability for {profile.role}</p>
      </div>
      <div className="bg-indigo-950 p-14 rounded-[5rem] text-white border-b-[24px] border-indigo-900 shadow-3xl space-y-14 hover-card relative overflow-hidden">
        {/* Activity icon added to imports to fix missing name error */}
        <div className="absolute top-0 right-0 p-16 opacity-5"><Activity size={300} /></div>
        <div className="space-y-10 relative z-10">
           <h5 className="flex items-center gap-4 text-rose-500 font-black text-sm uppercase tracking-[0.5em] mb-8"><ShieldAlert size={24} /> Red Zone (Automate ASAP)</h5>
           {workingAssessment.vulnerableTasks.filter(t => t.automationProbability > 70).map((t, i) => (
             <div key={i} className="flex items-center gap-10 text-lg group">
                <div className="w-56 font-black uppercase text-indigo-300 truncate group-hover:text-white transition-colors italic">{t.task}</div>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden shadow-inner border border-white/5"><div className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]" style={{ width: `${t.automationProbability}%` }}></div></div>
                <div className="w-20 font-black text-rose-400 italic text-right">{t.automationProbability}%</div>
             </div>
           ))}
        </div>
        <div className="space-y-10 relative z-10 pt-10 border-t border-white/5">
           <h5 className="flex items-center gap-4 text-emerald-500 font-black text-sm uppercase tracking-[0.5em] mb-8"><CheckCircle2 size={24} /> Human Alpha Zone</h5>
           {workingAssessment.vulnerableTasks.filter(t => t.automationProbability <= 40).map((t, i) => (
             <div key={i} className="flex items-center gap-10 text-lg group">
                <div className="w-56 font-black uppercase text-indigo-300 truncate group-hover:text-white transition-colors italic">{t.task}</div>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden shadow-inner border border-white/5"><div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: `${t.automationProbability}%` }}></div></div>
                <div className="w-20 font-black text-emerald-400 italic text-right">{t.automationProbability}%</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="sticky top-0 z-30 bg-[#fffdf5]/80 backdrop-blur-xl pt-6 pb-14">
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => onComplete(workingAssessment)} className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase hover:text-indigo-600 transition-all active:scale-95">
            <ArrowLeft size={16} /> Exit Strategic lab
          </button>
          <div className="flex gap-3">
            {modules.map((m, i) => (
              <div key={i} className={`w-14 h-2.5 rounded-full transition-all duration-700 shadow-sm ${i === currentModule ? 'bg-indigo-600 w-32' : i < currentModule ? 'bg-indigo-300' : 'bg-slate-200'}`} />
            ))}
          </div>
          <div className="text-indigo-950 font-black text-[10px] uppercase tracking-[0.3em]">Module 0{currentModule + 1} / 0{modules.length}</div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className={`p-6 bg-white rounded-[2rem] shadow-2xl border-2 border-slate-100 transition-all ${modules[currentModule].color} hover-card`}>
            {React.createElement(modules[currentModule].icon, { size: 48 })}
          </div>
          <div>
             <h2 className="text-5xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-2">{modules[currentModule].name}</h2>
             <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.5em] flex items-center gap-3">
                {/* Activity icon added to imports to fix missing name error */}
                <Activity size={14} className="text-indigo-600" /> Strategic Diagnostic Pulse active
             </p>
          </div>
        </div>
      </div>

      <div className="min-h-[600px] py-10">
        {currentModule === 0 && renderQuiz()}
        {currentModule === 1 && renderAICollab()}
        {currentModule === 2 && renderTasks()}
        {currentModule === 3 && renderReadiness()}
        {currentModule === 4 && renderSimulation()}
        {currentModule === 5 && renderRadar()}
        {currentModule === 6 && renderPositioning()}
        {currentModule === 7 && renderForecast()}
        {currentModule === 8 && renderResume()}
      </div>

      <div className="mt-20 pt-16 border-t-4 border-slate-100 flex justify-between items-center">
        <button onClick={prevModule} disabled={currentModule === 0} className="flex items-center gap-4 px-12 py-6 bg-white border-4 border-slate-100 rounded-[3rem] font-black text-sm text-slate-400 hover:text-indigo-950 hover:border-indigo-600 disabled:opacity-0 transition-all uppercase tracking-widest active:scale-95">
          <ArrowLeft size={24} /> Prev Diagnostic Node
        </button>
        <button 
          onClick={nextModule} 
          disabled={(currentModule === 0 && quizResult === null) || isSaving}
          className="flex items-center gap-6 px-16 py-8 bg-indigo-950 text-white rounded-[3rem] font-black text-xl hover:bg-indigo-600 hover:scale-105 transition-all shadow-3xl uppercase tracking-tighter disabled:opacity-50 active:scale-95"
        >
          {currentModule === modules.length - 1 ? 'Confirm Strategy synthesis' : 'Next Diagnostic Node'} <ArrowRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default AssessmentLab;