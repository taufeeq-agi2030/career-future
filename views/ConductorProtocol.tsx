
import React, { useState, useEffect } from 'react';
import { UserProfile, CareerAssessment, SkillAudit } from '../types';
import { bsi } from '../services/backendService';
import { 
  CheckCircle2, 
  Circle, 
  ClipboardList, 
  Layout, 
  Cpu, 
  Users, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Search, 
  Radio, 
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  AlertCircle,
  BarChart3,
  Bot,
  User,
  Activity,
  Sparkles,
  History,
  Lock,
  ChevronRight,
  LineChart as LineChartIcon,
  BrainCircuit,
  Eye,
  Target,
  Clock,
  Briefcase,
  Info
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ConductorProtocolProps {
  profile: UserProfile;
  assessment: CareerAssessment;
}

const AUDIT_STEPS = [
  { id: 1, title: "Decompose Tasks", desc: "List every granular routine task performed over the last 30 days.", icon: Search },
  { id: 2, title: "Benchmark AI Tools", desc: "Identify machine capabilities for executing your specific tasks.", icon: Cpu },
  { id: 3, title: "Isolate Human Alpha", desc: "Explicitly pin where judgment, ethics, or empathy are non-negotiable.", icon: ShieldCheck },
  { id: 4, title: "Plan AI Delegation", desc: "Draft the roadmap to offload manual labor to AI agents.", icon: Zap },
  { id: 5, title: "Shift KPIs to Outcomes", desc: "Redefine your value based on produced outcomes rather than hours.", icon: Target },
  { id: 6, title: "Audit AI Outputs", desc: "Establish your checklist for evaluating agent integrity.", icon: Radio },
  { id: 7, title: "Re-calibrate Strategy", desc: "Lock in your monthly standards and prepare for the next cycle.", icon: TrendingUp }
];

const COMMON_AI_TOOLS = [
  "Gemini (Google)",
  "ChatGPT (OpenAI)",
  "Claude (Anthropic)",
  "Perplexity AI",
  "GitHub Copilot",
  "Cursor (AI Editor)",
  "Midjourney",
  "Canva Magic Studio",
  "Zapier Central (Agents)",
  "Make.com (Automation)",
  "Fireflies.ai (Meetings)",
  "Otter.ai",
  "Jasper (Marketing)",
  "Notion AI",
  "Runway (Video)",
  "ElevenLabs (Voice)",
  "Hugging Face (Open Source Models)"
];

const ConductorProtocol: React.FC<ConductorProtocolProps> = ({ profile, assessment }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'HISTORY'>('GUIDE');
  const [currentStep, setCurrentStep] = useState(1);
  const [auditTasks, setAuditTasks] = useState<{ id: string; name: string; details?: string; type: 'MACHINE' | 'HUMAN'; tool?: string; kpi?: string; delegationPriority?: string }[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDetails, setNewTaskDetails] = useState('');
  const [auditHistory, setAuditHistory] = useState<SkillAudit[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [verificationChecklist, setVerificationChecklist] = useState<Record<string, boolean>>({
    'grounding': false,
    'intent': false,
    'voice': false,
    'ethical': false
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const records = await bsi.getOwnRecords('skill_audits', profile.userId, 'MEMBER');
      setAuditHistory(records.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (err) {
      console.error("History fetch failed", err);
    }
  };

  const addTask = (type: 'MACHINE' | 'HUMAN') => {
    if (!newTaskName.trim()) return;
    setAuditTasks([...auditTasks, { 
      id: Date.now().toString(), 
      name: newTaskName, 
      details: newTaskDetails,
      type 
    }]);
    setNewTaskName('');
    setNewTaskDetails('');
  };

  const removeTask = (id: string) => setAuditTasks(auditTasks.filter(t => t.id !== id));

  const updateTaskDetails = (id: string, updates: any) => {
    setAuditTasks(auditTasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const machineCount = auditTasks.filter(t => t.type === 'MACHINE').length;
  const humanCount = auditTasks.filter(t => t.type === 'HUMAN').length;
  const total = auditTasks.length || 1;
  const conductorScore = Math.round((humanCount / total) * 100);

  const handleFinalize = async () => {
    setIsSaving(true);
    const audit: SkillAudit = {
      id: `AUDIT-${Date.now()}`,
      userId: profile.userId,
      month: new Date().toISOString().substring(0, 7),
      tasks: auditTasks.map(t => ({ ...t, intensity: 5 })),
      conductorScore,
      completedGuidelines: [1, 2, 3, 4, 5, 6, 7],
      timestamp: new Date()
    };
    try {
      await bsi.saveRecord('skill_audits', audit, 'MEMBER');
      await loadHistory();
      setActiveTab('HISTORY');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Decomposition
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 1: Decompose Tasks</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"Audit your routine manually. List every granular 'doing' node performed this month."</p>
              
              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-2">Task Title</label>
                  <input 
                    type="text" 
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="e.g. Preparing Monthly Client Slidedeck..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-2">Strategic Context (Details)</label>
                  <textarea 
                    value={newTaskDetails}
                    onChange={(e) => setNewTaskDetails(e.target.value)}
                    placeholder="Provide context... who is the audience? what is the expected output quality? what tools are currently used?"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-medium text-sm h-24 resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button onClick={() => addTask('HUMAN')} className="px-8 py-4 bg-indigo-950 text-white rounded-2xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg hover:bg-indigo-900">
                    <Plus size={18}/> Log Task Node
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {auditTasks.map(t => (
                  <div key={t.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                          <Briefcase size={18} />
                        </div>
                        <span className="font-black text-indigo-950 uppercase text-sm italic tracking-tight">{t.name}</span>
                      </div>
                      <button onClick={() => removeTask(t.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                    {t.details && (
                      <div className="pl-12 flex items-start gap-2">
                        <Info size={14} className="text-indigo-400 mt-1 shrink-0" />
                        <p className="text-xs text-slate-500 font-medium italic leading-relaxed">
                          "{t.details}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                {auditTasks.length === 0 && <p className="text-center py-10 text-slate-300 font-black uppercase italic tracking-widest text-[10px]">No tasks logged for decomposition.</p>}
              </div>
            </div>
          </div>
        );
      case 2: // Benchmarking
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 2: Benchmark AI Tools</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"Match each task against available machine labor. Identify which can be offloaded."</p>
              <div className="space-y-4">
                {auditTasks.map(t => (
                  <div key={t.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1">
                      <span className="font-black text-indigo-950 text-xs uppercase tracking-tighter italic">{t.name}</span>
                      {t.details && <p className="text-[9px] text-slate-400 italic line-clamp-1">"{t.details}"</p>}
                    </div>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         list="ai-tools"
                         placeholder="Select or type AI tool..."
                         className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-400 font-bold"
                         onChange={(e) => updateTaskDetails(t.id, { tool: e.target.value })}
                         value={t.tool || ''}
                       />
                       <button 
                         onClick={() => updateTaskDetails(t.id, { type: t.type === 'MACHINE' ? 'HUMAN' : 'MACHINE' })}
                         className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 whitespace-nowrap ${t.type === 'MACHINE' ? 'bg-amber-400 text-indigo-950' : 'bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200'}`}
                       >
                         {t.type === 'MACHINE' ? <Bot size={14}/> : <User size={14}/>}
                         {t.type === 'MACHINE' ? 'Machine Potential' : 'Keep Manual'}
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              <datalist id="ai-tools">
                {COMMON_AI_TOOLS.map(tool => <option key={tool} value={tool} />)}
              </datalist>
            </div>
          </div>
        );
      case 3: // Isolation (User Managed)
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 3: Isolate Human Alpha</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"Explicitly identify 'Judgment Nodes'. These are tasks where human intuition and accountability are the primary value."</p>
              <div className="grid grid-cols-1 gap-4">
                {auditTasks.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => updateTaskDetails(t.id, { type: t.type === 'HUMAN' ? 'MACHINE' : 'HUMAN' })}
                    className={`p-6 rounded-[2.5rem] border-2 flex items-center justify-between cursor-pointer transition-all ${t.type === 'HUMAN' ? 'bg-indigo-950 border-indigo-950 text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-400 opacity-60'}`}
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${t.type === 'HUMAN' ? 'bg-amber-400 text-indigo-950' : 'bg-slate-100'}`}>
                         <ShieldCheck size={24} />
                       </div>
                       <div>
                          <p className="font-black uppercase text-xs italic">{t.name}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest ${t.type === 'HUMAN' ? 'text-indigo-300' : 'text-slate-400'}`}>
                             {t.type === 'HUMAN' ? 'Isolated as Human Alpha' : 'Redundant Labor'}
                          </p>
                       </div>
                    </div>
                    {t.type === 'HUMAN' ? <CheckCircle2 size={24} className="text-amber-400" /> : <Circle size={24} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4: // Planning (User Managed)
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 4: Plan AI Delegation</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"Draft the delegation protocol for tasks tagged as Machine Labor. Set your migration timeframe."</p>
              <div className="space-y-6">
                 {auditTasks.filter(t => t.type === 'MACHINE').map(t => (
                   <div key={t.id} className="p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400"><Bot size={24}/></div>
                         <div>
                            <p className="text-xl font-black uppercase italic leading-none mb-1">{t.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Tool: {t.tool || 'TBD'}</p>
                         </div>
                      </div>
                      <select 
                        value={t.delegationPriority || ''}
                        onChange={(e) => updateTaskDetails(t.id, { delegationPriority: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 font-black text-[10px] uppercase tracking-widest outline-none focus:bg-amber-400 focus:text-indigo-950 transition-all text-white"
                      >
                         <option value="" className="text-indigo-950">Set Migration Priority</option>
                         <option value="IMMEDIATE" className="text-indigo-950">Immediate Transition</option>
                         <option value="NEXT_MONTH" className="text-indigo-950">Migrate Next Cycle</option>
                         <option value="EXPERIMENTAL" className="text-indigo-950">Parallel Run (Audit First)</option>
                         <option value="HOLD" className="text-indigo-950">Hold Manual for now</option>
                      </select>
                   </div>
                 ))}
                 {machineCount === 0 && <p className="text-center py-20 border-2 border-dashed border-slate-100 rounded-[3rem] text-slate-300 font-black uppercase italic text-xs">No machine-labor tasks identified for delegation.</p>}
              </div>
            </div>
          </div>
        );
      case 5: // Outcome Synthesis
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 5: Shift KPIs to Outcomes</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"Define the strategic outcomes produced by your orchestration of these tasks. Metrics shift from 'Time spent' to 'Value generated'."</p>
              <div className="space-y-4">
                {auditTasks.filter(t => t.type === 'HUMAN').map(t => (
                  <div key={t.id} className="p-8 bg-indigo-50 border-2 border-indigo-100 rounded-[3rem] space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-950 text-white rounded-2xl flex items-center justify-center shadow-lg"><Target size={24}/></div>
                        <div>
                           <p className="font-black text-indigo-950 uppercase text-xs italic">{t.name}</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Alpha Outcome Mapping</p>
                        </div>
                     </div>
                     <input 
                       type="text" 
                       placeholder="e.g. Achieve 15% increase in strategic client sentiment index..."
                       className="w-full px-8 py-5 bg-white border border-indigo-200 rounded-[2rem] text-xs font-bold italic outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-sm"
                       onChange={(e) => updateTaskDetails(t.id, { kpi: e.target.value })}
                       value={t.kpi || ''}
                     />
                  </div>
                ))}
                {humanCount === 0 && <p className="text-center py-20 text-slate-300 font-black italic uppercase text-xs">No human-alpha tasks isolated for KPI mapping.</p>}
              </div>
            </div>
          </div>
        );
      case 6: // Auditing (User Managed)
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
              <h4 className="text-2xl font-black uppercase italic mb-6">Step 6: Audit AI Outputs</h4>
              <p className="text-slate-500 mb-8 font-medium italic">"As the Conductor, you are responsible for the integrity of delegated machine labor. Verify your audit checklist."</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                 {[
                   { id: 'grounding', label: "Grounding Verification", desc: "Always cross-check agent claims against primary data sources." },
                   { id: 'intent', label: "Strategic Intent Check", desc: "Does the AI output solve the root objective or just follow instructions?" },
                   { id: 'voice', label: "Brand Voice & Persona", desc: "Ensure machine-generated tone matches your professional identity." },
                   { id: 'ethical', label: "Ethical & Safety Audit", desc: "Verify that machine logic adheres to organizational safety guidelines." }
                 ].map((check) => (
                   <div 
                    key={check.id} 
                    onClick={() => setVerificationChecklist(prev => ({ ...prev, [check.id]: !prev[check.id] }))}
                    className={`p-8 rounded-[3.5rem] border-2 transition-all cursor-pointer group flex items-start gap-6 ${verificationChecklist[check.id] ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-60 hover:opacity-100'}`}
                   >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${verificationChecklist[check.id] ? 'bg-emerald-500 text-white' : 'bg-white'}`}>
                         <ShieldCheck size={28} />
                      </div>
                      <div className="flex-1">
                         <h5 className={`font-black uppercase text-xs mb-2 transition-colors ${verificationChecklist[check.id] ? 'text-emerald-900' : 'text-slate-400'}`}>{check.label}</h5>
                         <p className={`text-[10px] italic leading-relaxed transition-colors ${verificationChecklist[check.id] ? 'text-emerald-700' : 'text-slate-400'}`}>{check.desc}</p>
                      </div>
                      {verificationChecklist[check.id] ? <CheckCircle2 size={24} className="text-emerald-600" /> : <Circle size={24} className="text-slate-200" />}
                   </div>
                 ))}
              </div>
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 flex items-center gap-4">
                 <AlertCircle className="text-amber-600" size={24} />
                 <p className="text-[10px] font-bold text-amber-900 uppercase italic leading-tight">Verification is non-negotiable. Only check off protocols you have physically established in your monthly routine.</p>
              </div>
            </div>
          </div>
        );
      case 7: // Re-calibration
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="bg-indigo-950 p-12 rounded-[5rem] text-white text-center shadow-3xl relative overflow-hidden border-b-[20px] border-indigo-900">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Sparkles size={240} /></div>
              <div className="relative z-10">
                <h4 className="text-4xl font-black uppercase italic tracking-tighter mb-8 leading-none">Step 7: Re-calibrate Strategy</h4>
                <div className="text-9xl font-black italic tracking-tighter mb-4 text-amber-400">{conductorScore}%</div>
                <p className="text-indigo-300 text-xl font-medium uppercase tracking-widest mb-12">New Monthly Human-Alpha Index</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                   <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                      <span className="text-[9px] font-black uppercase text-indigo-300 block mb-2">Tasks Shed</span>
                      <span className="text-3xl font-black text-amber-400">{machineCount}</span>
                   </div>
                   <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                      <span className="text-[9px] font-black uppercase text-indigo-300 block mb-2">Alpha Nodes</span>
                      <span className="text-3xl font-black text-emerald-400">{humanCount}</span>
                   </div>
                   <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                      <span className="text-[9px] font-black uppercase text-indigo-300 block mb-2">Audit Rank</span>
                      <span className="text-3xl font-black text-white">{conductorScore > 80 ? 'S' : conductorScore > 50 ? 'A' : 'B'}</span>
                   </div>
                </div>

                <div className="bg-white/10 p-8 rounded-[3rem] border border-white/20 max-w-2xl mx-auto italic mb-12">
                   "You have successfully re-balanced your professional value. By committing to delegate {machineCount} task nodes, you've recovered approximately <span className="text-amber-400 font-bold">{(machineCount * 8).toFixed(1)} strategic hours</span> for this upcoming month."
                </div>
                
                <button 
                  onClick={handleFinalize}
                  disabled={isSaving}
                  className="px-14 py-6 bg-amber-400 text-indigo-950 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter shadow-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? "Locking Protocol..." : "Sync Monthly Audit Results"}
                </button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in pb-20 text-indigo-950 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4">Strategic Operational Layer</div>
          <h2 className="text-5xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Monthly <span className="text-amber-600">Skill Audit</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4 flex items-center gap-2">
            <Radio size={14} className="text-indigo-600" /> Active Resiliency Engine for {profile.role}
          </p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'GUIDE' ? 'bg-indigo-950 text-amber-400 shadow-lg' : 'text-slate-400 hover:text-indigo-950'
            }`}
          >
            <Activity size={16} /> Strategy Lab
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'HISTORY' ? 'bg-indigo-950 text-amber-400 shadow-lg' : 'text-slate-400 hover:text-indigo-950'
            }`}
          >
            <History size={16} /> Audit History
          </button>
        </div>
      </header>

      {activeTab === 'GUIDE' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Stepper Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-4">Audit Lifecycle</h5>
            {AUDIT_STEPS.map((step) => (
              <div
                key={step.id}
                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all ${
                  currentStep === step.id 
                    ? 'bg-indigo-950 text-amber-400 shadow-2xl scale-105' 
                    : currentStep > step.id ? 'bg-emerald-50 text-emerald-600 cursor-pointer hover:bg-emerald-100' : 'bg-white text-slate-300 border border-slate-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                   currentStep === step.id ? 'bg-amber-400 text-indigo-950' : currentStep > step.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 size={16}/> : step.id}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{step.title}</span>
              </div>
            ))}
          </div>

          {/* Step Workspace */}
          <div className="lg:col-span-9 space-y-10">
            {renderStepContent()}
            
            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
               <button 
                 disabled={currentStep === 1}
                 onClick={() => setCurrentStep(currentStep - 1)}
                 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-950 disabled:opacity-0 transition-all active:scale-95"
               >
                 <ArrowLeft size={16}/> Previous Phase
               </button>
               {currentStep < 7 && (
                 <button 
                   onClick={() => setCurrentStep(currentStep + 1)}
                   className="px-10 py-5 bg-indigo-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-indigo-900 transition-all shadow-xl active:scale-95"
                 >
                   Verify & Advance <ArrowRight size={18}/>
                 </button>
               )}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in space-y-8">
           {auditHistory.length === 0 ? (
             <div className="p-24 text-center glass-card bg-white rounded-[5rem] border-dashed border-2 flex flex-col items-center">
                <Clock size={48} className="text-slate-200 mb-6" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No strategic cycles detected. Initiate your first monthly audit above.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-6">
                {auditHistory.map((audit, i) => (
                  <div key={i} className="bg-white p-10 rounded-[4rem] border border-slate-200 flex items-center justify-between hover:shadow-2xl hover:border-indigo-400 transition-all group cursor-default hover-card">
                     <div className="flex items-center gap-8">
                        <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex flex-col items-center justify-center text-indigo-900 group-hover:bg-indigo-950 group-hover:text-amber-400 transition-all shadow-inner">
                           <span className="text-[10px] font-black uppercase">{audit.month.split('-')[1]}</span>
                           <span className="text-2xl font-black italic leading-none">{audit.month.split('-')[0]}</span>
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                             <CheckCircle2 size={16} className="text-emerald-500" />
                             <h5 className="text-2xl font-black text-indigo-950 uppercase italic leading-none">Cycle Synchronized</h5>
                           </div>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-4">
                             <span className="flex items-center gap-1"><Bot size={12}/> {audit.tasks.filter(t => t.type === 'MACHINE').length} Tasks Delegated</span>
                             <span className="flex items-center gap-1"><User size={12}/> {audit.tasks.filter(t => t.type === 'HUMAN').length} Alpha Nodes</span>
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Human Alpha Index</span>
                        <span className="text-5xl font-black italic text-indigo-950">{audit.conductorScore}%</span>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      )}

      {/* Audit Advisory */}
      <div className="bg-white border-2 border-indigo-100 p-16 rounded-[5rem] flex flex-col md:flex-row items-center gap-12 shadow-sm hover-card">
         <div className="w-24 h-24 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 border-2 border-indigo-200">
            <Activity size={48} />
         </div>
         <div className="flex-1">
            <h4 className="text-2xl font-black uppercase italic tracking-tighter text-indigo-950 mb-2 leading-none">The Discipline of Orchestration</h4>
            <p className="text-slate-500 text-lg font-medium leading-relaxed italic max-w-3xl">
               "A Monthly Skill Audit is not just data entry; it's a recalibration of your professional identity. Professionals who fail to audit their manual routine monthly are 85% more likely to be blindsided by automation displacement."
            </p>
         </div>
         <div className="px-8 py-4 bg-indigo-950 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl">
            Protocol Version 1.2 Active
         </div>
      </div>
    </div>
  );
};

export default ConductorProtocol;
