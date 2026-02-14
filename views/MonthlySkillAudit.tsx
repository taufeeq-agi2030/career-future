import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, CareerAssessment, SkillAudit } from '../types';
import { bsi } from '../services/backendService';
import { IntelligenceService } from '../services/intelligenceService';
import { 
  CheckCircle2, 
  Circle, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Search, 
  Radio, 
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Bot,
  User,
  Activity,
  Sparkles,
  History,
  Target,
  Briefcase,
  Layers,
  Info,
  Timer,
  FileText,
  Clock,
  Gauge,
  X,
  ChevronDown
} from 'lucide-react';

interface MonthlySkillAuditProps {
  profile: UserProfile;
  assessment: CareerAssessment;
}

const AUDIT_STEPS = [
  { id: 1, title: "Decompose Tasks", desc: "Break your workday into atomic task nodes.", icon: Search },
  { id: 2, title: "Benchmark AI", desc: "Identify tool capabilities for each node.", icon: Cpu },
  { id: 3, title: "Isolate Alpha", desc: "Pinpoint where human judgment is non-negotiable.", icon: ShieldCheck },
  { id: 4, title: "Plan Delegation", desc: "Draft a roadmap to offload manual labor.", icon: Zap },
  { id: 5, title: "Shift KPIs", desc: "Redefine value based on outcomes, not hours.", icon: Target },
  { id: 6, title: "Audit Outputs", desc: "Verify agent integrity and quality.", icon: Radio },
  { id: 7, title: "Re-calibrate", desc: "Lock in your monthly Human-Alpha standards.", icon: TrendingUp }
];

const AI_TOOL_LIBRARY = [
  { name: "Gemini 3 Pro", category: "Reasoning / Multi-modal", provider: "Google" },
  { name: "GPT-4o", category: "Conversational / LLM", provider: "OpenAI" },
  { name: "Claude 3.5 Sonnet", category: "Coding / Writing", provider: "Anthropic" },
  { name: "Perplexity AI", category: "Search / Research", provider: "Perplexity" },
  { name: "GitHub Copilot", category: "Coding Assistant", provider: "Microsoft" },
  { name: "Midjourney v6", category: "Image Generation", provider: "Midjourney" },
  { name: "DALL-E 3", category: "Image Generation", provider: "OpenAI" },
  { name: "Llama 3", category: "Open Source / Local", provider: "Meta" },
  { name: "Stable Diffusion", category: "Image Generation", provider: "Stability AI" },
  { name: "GitHub Cursor", category: "Coding IDE", provider: "Anysphere" },
  { name: "Zapier Central", category: "Autonomous Agents", provider: "Zapier" },
  { name: "Make.com Agents", category: "Automation / Workflow", provider: "Make" },
  { name: "Fireflies.ai", category: "Meeting Intel", provider: "Fireflies" },
  { name: "Otter.ai", category: "Transcription", provider: "Otter" },
  { name: "Jasper", category: "Copywriting", provider: "Jasper" },
  { name: "Notion AI", category: "Knowledge Base", provider: "Notion" },
  { name: "Runway Gen-3", category: "Video Generation", provider: "Runway" },
  { name: "ElevenLabs", category: "Voice Synthesis", provider: "ElevenLabs" },
  { name: "Harvey AI", category: "Legal / Compliance", provider: "Harvey" },
  { name: "Tome", category: "Presentations", provider: "Tome" }
];

const ToolAutocomplete: React.FC<{
  value: string;
  onChange: (tool: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = AI_TOOL_LIBRARY.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-400 font-bold shadow-inner"
        />
        {search && (
          <button 
            onClick={() => { setSearch(''); onChange(''); }}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-[100] top-full left-0 w-full mt-2 bg-white border-2 border-indigo-100 rounded-3xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto animate-in slide-in-from-top-2 duration-200 no-scrollbar">
          {filtered.length > 0 ? filtered.map((tool) => (
            <button
              key={tool.name}
              onClick={() => {
                setSearch(tool.name);
                onChange(tool.name);
                setIsOpen(false);
              }}
              className="w-full text-left px-6 py-4 hover:bg-indigo-50 transition-colors border-b border-slate-50 last:border-none group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-black text-indigo-950 text-sm group-hover:text-indigo-600 transition-colors">{tool.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tool.category}</p>
                </div>
                <span className="text-[9px] font-black text-indigo-300 uppercase bg-slate-50 px-2 py-1 rounded-lg group-hover:bg-indigo-100">{tool.provider}</span>
              </div>
            </button>
          )) : (
            <div className="p-8 text-center">
              <p className="text-xs font-black text-slate-300 uppercase italic">Custom Tool Protocol Active</p>
              <button 
                onClick={() => { onChange(search); setIsOpen(false); }}
                className="mt-4 px-4 py-2 bg-indigo-950 text-white rounded-xl text-[10px] font-black uppercase"
              >
                Use "{search}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MonthlySkillAudit: React.FC<MonthlySkillAuditProps> = ({ profile, assessment }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'HISTORY'>('GUIDE');
  const [currentStep, setCurrentStep] = useState(1);
  const [auditTasks, setAuditTasks] = useState<{ id: string; name: string; details?: string; type: 'MACHINE' | 'HUMAN'; tool?: string; kpi?: string; delegationPriority?: string; halfLifeYears?: number }[]>([]);
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

  const addTask = async (type: 'MACHINE' | 'HUMAN') => {
    if (!newTaskName.trim()) return;
    
    // Pass details to the intelligence service for a more contextual half-life calculation
    const halfLife = await IntelligenceService.assessSkillHalfLife(newTaskName, profile.role, newTaskDetails);
    
    setAuditTasks([...auditTasks, { 
      id: Date.now().toString(), 
      name: newTaskName, 
      details: newTaskDetails, 
      type,
      halfLifeYears: halfLife 
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
      tasks: auditTasks,
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
      case 1: 
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                    <Search size={28} />
                 </div>
                 <h4 className="text-3xl font-black uppercase italic text-indigo-950">Phase 1: Task Decomposition</h4>
              </div>
              
              <div className="space-y-6 mb-12 p-8 bg-indigo-50/50 rounded-[3rem] border-2 border-indigo-100">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-4">Task Domain</label>
                    <input 
                      type="text" 
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      placeholder="e.g. Stakeholder Sentiment Analysis..."
                      className="w-full px-8 py-5 bg-white border-2 border-slate-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-lg shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-4 mr-4">
                      <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2"><FileText size={12}/> Technical Context / Complexity</label>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${newTaskDetails.length > 50 ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {newTaskDetails.length > 50 ? 'High Context Mode Active' : 'Provide More Context'}
                      </span>
                    </div>
                    <textarea 
                      value={newTaskDetails}
                      onChange={(e) => setNewTaskDetails(e.target.value)}
                      placeholder="Describe variables, data sources, stakes, and intended output integrity..."
                      className="w-full px-8 py-4 bg-white border-2 border-slate-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 font-medium text-sm italic resize-none h-24"
                    />
                    <div className="flex justify-end pr-4">
                      <span className="text-[9px] font-bold text-slate-300">{newTaskDetails.length} characters</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={() => addTask('HUMAN')} className="px-10 py-5 bg-indigo-950 text-white rounded-[2rem] font-black uppercase text-xs flex items-center gap-3 active:scale-95 transition-all shadow-xl hover:bg-indigo-900 group">
                    <Plus size={22} className="group-hover:rotate-90 transition-transform"/> Inject into Audit Matrix
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {auditTasks.map(t => (
                  <div key={t.id} className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 group hover-card hover:bg-white transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm transition-all">
                          <Briefcase size={24} />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-black text-indigo-950 uppercase text-lg italic tracking-tight leading-none mb-1">{t.name}</span>
                           {t.details && (
                             <div className="flex items-start gap-2 mt-1">
                               <Info size={12} className="text-indigo-300 mt-0.5 shrink-0" />
                               <span className="text-[10px] text-slate-400 font-bold italic leading-relaxed">"{t.details}"</span>
                             </div>
                           )}
                        </div>
                      </div>
                      <button onClick={() => removeTask(t.id)} className="p-3 text-slate-300 hover:text-rose-500 transition-colors bg-white rounded-xl border border-slate-200 shadow-sm">
                        <Trash2 size={20}/>
                      </button>
                    </div>
                    <div className="pl-16 space-y-2">
                       <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-400 tracking-widest">
                          <span className="flex items-center gap-2"><Timer size={12}/> Skill Obsolescence Forecast</span>
                          <span className="text-amber-600 font-black">{t.halfLifeYears} Year Half-Life</span>
                       </div>
                       <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                             className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 transition-all duration-1000" 
                             style={{ width: `${Math.min(100, (t.halfLifeYears || 1) * 10)}%` }}
                          />
                       </div>
                    </div>
                  </div>
                ))}
                {auditTasks.length === 0 && (
                  <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-[4rem]">
                     <p className="text-slate-300 font-black uppercase tracking-[0.4em] italic">Empty Matrix Protocol</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl overflow-visible">
              <h4 className="text-3xl font-black uppercase italic mb-8 text-indigo-950">Phase 2: AI Capability Benchmark</h4>
              <p className="text-slate-500 font-bold italic leading-relaxed mb-10">"Select the optimal agent for each task node to determine displacement potential."</p>
              <div className="space-y-8">
                {auditTasks.map(t => (
                  <div key={t.id} className="p-8 bg-slate-50 rounded-[3rem] border-2 border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center hover-card hover:bg-white transition-all overflow-visible">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-white flex items-center justify-center shadow-lg shrink-0">
                          <Bot size={24} />
                       </div>
                       <div>
                          <span className="font-black text-indigo-950 text-sm uppercase tracking-tighter italic block">{t.name}</span>
                          {t.details && <p className="text-[9px] text-slate-400 italic line-clamp-1">Context: {t.details}</p>}
                       </div>
                    </div>
                    <div className="flex gap-4 items-center">
                       <ToolAutocomplete 
                         value={t.tool || ''}
                         placeholder="Search AI library..."
                         onChange={(val) => {
                            updateTaskDetails(t.id, { tool: val, type: val ? 'MACHINE' : t.type });
                         }}
                       />
                       <button 
                         onClick={() => updateTaskDetails(t.id, { type: t.type === 'MACHINE' ? 'HUMAN' : 'MACHINE' })}
                         className={`px-6 py-4 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center gap-3 whitespace-nowrap shadow-md h-[52px] ${t.type === 'MACHINE' ? 'bg-amber-400 text-indigo-950' : 'bg-white border-2 border-slate-200 text-slate-400 hover:text-indigo-600'}`}
                       >
                         {t.type === 'MACHINE' ? <CheckCircle2 size={18}/> : <Plus size={18}/>}
                         {t.type === 'MACHINE' ? 'Shedded' : 'Tag agent'}
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl">
              <h4 className="text-3xl font-black uppercase italic mb-8 text-indigo-950">Phase 3: Isolate Human Alpha</h4>
              <p className="text-slate-500 font-bold italic leading-relaxed mb-10 max-w-2xl">"Identify nodes where human accountability, empathy, and ethical judgment are the primary value drivers."</p>
              <div className="grid grid-cols-1 gap-6">
                {auditTasks.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => updateTaskDetails(t.id, { type: t.type === 'HUMAN' ? 'MACHINE' : 'HUMAN' })}
                    className={`p-10 rounded-[3.5rem] border-4 flex items-center justify-between cursor-pointer transition-all hover-card ${t.type === 'HUMAN' ? 'bg-indigo-950 border-indigo-950 text-white shadow-3xl scale-[1.02]' : 'bg-slate-50 border-slate-100 text-slate-400 opacity-60'}`}
                  >
                    <div className="flex items-center gap-8">
                       <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-lg ${t.type === 'HUMAN' ? 'bg-amber-400 text-indigo-950' : 'bg-slate-200'}`}>
                         <ShieldCheck size={32} />
                       </div>
                       <div>
                          <p className="font-black uppercase text-xl italic tracking-tight leading-none mb-2">{t.name}</p>
                          {t.details && <p className={`text-xs italic ${t.type === 'HUMAN' ? 'text-indigo-200' : 'text-slate-400'}`}>"{t.details}"</p>}
                          <p className={`text-[12px] font-black uppercase tracking-widest mt-2 ${t.type === 'HUMAN' ? 'text-indigo-300' : 'text-slate-400'}`}>
                             {t.type === 'HUMAN' ? 'ISOLATED HUMAN-ALPHA NODE' : 'DELEGATED MACHINE NODE'}
                          </p>
                       </div>
                    </div>
                    {t.type === 'HUMAN' ? <CheckCircle2 size={32} className="text-amber-400" /> : <Circle size={32} className="text-slate-200" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl">
              <div className="flex justify-between items-start mb-10">
                 <h4 className="text-3xl font-black uppercase italic text-indigo-950">Phase 4: Agent Delegation Roadmap</h4>
                 <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <Clock size={20} />
                    <div className="text-right">
                       <p className="text-[9px] font-black uppercase tracking-widest leading-none">Recoverable Effort</p>
                       <p className="text-xl font-black italic">{(machineCount * 8.5).toFixed(1)} hrs/mo</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-8">
                 {auditTasks.filter(t => t.type === 'MACHINE').map(t => (
                   <div key={t.id} className="p-10 bg-indigo-600 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 justify-between border-l-[20px] border-amber-400 shadow-2xl hover-card">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-amber-400 shadow-inner"><Bot size={32}/></div>
                         <div>
                            <p className="text-2xl font-black uppercase italic leading-none mb-2">{t.name}</p>
                            <p className="text-[12px] font-black text-indigo-200 uppercase tracking-widest">Protocol Tool: {t.tool || 'TBD'}</p>
                         </div>
                      </div>
                      <select 
                        value={t.delegationPriority || ''}
                        onChange={(e) => updateTaskDetails(t.id, { delegationPriority: e.target.value })}
                        className="bg-indigo-950 border-2 border-indigo-400/30 rounded-2xl px-8 py-5 font-black text-xs uppercase tracking-widest outline-none focus:bg-amber-400 focus:text-indigo-950 transition-all text-white shadow-xl cursor-pointer"
                      >
                         <option value="" className="text-white">Migration Priority</option>
                         <option value="IMMEDIATE" className="text-white">Immediate (P0)</option>
                         <option value="NEXT_MONTH" className="text-white">Next Cycle (P1)</option>
                         <option value="HOLD" className="text-white">Manual Hold</option>
                      </select>
                   </div>
                 ))}
                 {machineCount === 0 && <p className="text-center py-20 text-slate-300 font-black italic text-sm uppercase tracking-widest">No machine-labor targets selected.</p>}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl">
              <h4 className="text-3xl font-black uppercase italic mb-8 text-indigo-950">Phase 5: Shift KPIs to Outcomes</h4>
              <p className="text-slate-500 font-bold italic leading-relaxed mb-10">"Stop measuring hours. Start measuring the quality and impact of the decision node."</p>
              <div className="space-y-6">
                {auditTasks.filter(t => t.type === 'HUMAN').map(t => (
                  <div key={t.id} className="p-10 bg-amber-500 border-2 border-amber-400/30 rounded-[3.5rem] space-y-8 hover-card shadow-xl">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-indigo-950 text-white rounded-3xl flex items-center justify-center shadow-2xl"><Target size={32}/></div>
                        <p className="font-black text-indigo-950 uppercase text-xl italic tracking-tight">{t.name}</p>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-4">Defined Strategic Outcome</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 100% data integrity verified for Q3 report..."
                          className="w-full px-8 py-6 bg-white/40 border-2 border-white/30 rounded-3xl text-sm font-black italic outline-none shadow-inner placeholder:text-indigo-900/40 text-indigo-950"
                          onChange={(e) => updateTaskDetails(t.id, { kpi: e.target.value })}
                          value={t.kpi || ''}
                        />
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-2xl">
              <h4 className="text-3xl font-black uppercase italic mb-10 text-indigo-950">Phase 6: Audit AI Outputs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { id: 'grounding', label: "Grounding Audit", desc: "Cross-verify agent outputs with original data sources." },
                   { id: 'intent', label: "Intent Verification", desc: "Does the output solve the core business objective?" },
                   { id: 'voice', label: "Persona Consistency", desc: "Match machine tone to your professional identity." },
                   { id: 'ethical', label: "Ethical Integrity", desc: "Ensure safety, policy, and bias compliance." }
                 ].map((check) => (
                   <div 
                    key={check.id} 
                    onClick={() => setVerificationChecklist(prev => ({ ...prev, [check.id]: !prev[check.id] }))}
                    className={`p-10 rounded-[3.5rem] border-4 transition-all cursor-pointer flex items-start gap-8 hover-card ${verificationChecklist[check.id] ? `bg-emerald-50 border-emerald-500 shadow-2xl scale-[1.03]` : 'bg-slate-50 border-slate-100 opacity-60'}`}
                   >
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-lg ${verificationChecklist[check.id] ? 'bg-indigo-950 text-white' : 'bg-white'}`}>
                         <ShieldCheck size={32} />
                      </div>
                      <div className="flex-1">
                         <h5 className="font-black uppercase text-lg mb-2 text-indigo-950">{check.label}</h5>
                         <p className="text-sm italic font-medium leading-relaxed text-indigo-950/70">{check.desc}</p>
                      </div>
                      {verificationChecklist[check.id] ? <CheckCircle2 size={32} className="text-emerald-500" /> : <Circle size={32} className="text-slate-200" />}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      case 7: 
        return (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-indigo-950 p-16 rounded-[5rem] text-white text-center shadow-3xl relative overflow-hidden border-b-[24px] border-indigo-900 hover-card">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Sparkles size={280} /></div>
              <div className="relative z-10">
                <h4 className="text-5xl font-black uppercase italic tracking-tighter mb-12 leading-none">Phase 7: Strategy Recalibration</h4>
                <div className="flex flex-col items-center justify-center mb-16">
                   <div className="text-[12rem] font-black italic tracking-tighter mb-4 text-amber-400 drop-shadow-2xl leading-none">{conductorScore}%</div>
                   <p className="text-indigo-300 text-2xl font-black uppercase tracking-[0.4em]">Human-Alpha Index</p>
                </div>
                
                <div className="bg-white/10 p-10 rounded-[4rem] border-2 border-white/20 max-w-3xl mx-auto italic mb-16 shadow-inner text-xl font-medium leading-relaxed">
                   "Your monthly audit is complete. You are operating at an average skill half-life of { (auditTasks.reduce((acc, t) => acc + (t.halfLifeYears || 0), 0) / total).toFixed(1) } years. This positions you in the top 5% of resilient professionals."
                </div>
                
                <button 
                  onClick={handleFinalize}
                  disabled={isSaving}
                  className="px-20 py-8 bg-amber-400 text-indigo-950 rounded-[3rem] font-black text-2xl uppercase tracking-tighter shadow-3xl hover:scale-105 transition-all hover:bg-amber-300 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? "Locking Matrix State..." : "Commit Monthly Protocol"}
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
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-50 border-2 border-amber-200 text-amber-700 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
             <Gauge size={14} /> Critical Operational Layer
          </div>
          <h2 className="text-6xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Monthly <span className="text-amber-600">Skill Audit</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] mt-6 flex items-center gap-3">
            <Activity size={18} className="text-indigo-600" /> Active Conductor Protocol for {profile.role}
          </p>
        </div>
        <div className="flex bg-white p-3 rounded-[2.5rem] border-2 border-slate-100 shadow-xl">
          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`px-10 py-5 rounded-[2rem] flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'GUIDE' ? 'bg-indigo-950 text-amber-400 shadow-2xl' : 'text-slate-400 hover:text-indigo-950'}`}
          >
            <Layers size={20} /> Strategy Lab
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-10 py-5 rounded-[2rem] flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'HISTORY' ? 'bg-indigo-950 text-amber-400 shadow-2xl' : 'text-slate-400 hover:text-indigo-950'}`}
          >
            <History size={20} /> History Log
          </button>
        </div>
      </header>

      {activeTab === 'GUIDE' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-8 px-6">Audit Lifecycle</h5>
            {AUDIT_STEPS.map((step) => (
              <div
                key={step.id}
                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                className={`w-full flex items-center gap-6 px-8 py-6 rounded-[2.5rem] transition-all border-2 ${currentStep === step.id ? 'bg-indigo-950 text-amber-400 border-indigo-950 shadow-2xl scale-105' : currentStep > step.id ? 'bg-emerald-50 text-emerald-600 border-emerald-100 cursor-pointer hover-card' : 'bg-white text-slate-300 border-slate-50'}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-md transition-all ${currentStep === step.id ? 'bg-amber-400 text-indigo-950' : currentStep > step.id ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                  {currentStep > step.id ? <CheckCircle2 size={20}/> : step.id}
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-9 space-y-12">
            {renderStepContent()}
            <div className="flex justify-between items-center pt-12 border-t-2 border-slate-100">
               <button 
                 disabled={currentStep === 1}
                 onClick={() => setCurrentStep(currentStep - 1)}
                 className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-950 disabled:opacity-0 transition-all active:scale-95"
               >
                 <ArrowLeft size={20}/> Previous Phase
               </button>
               {currentStep < 7 && (
                 <button 
                   onClick={() => setCurrentStep(currentStep + 1)}
                   className="px-14 py-6 bg-indigo-950 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-indigo-900 shadow-2xl transition-all active:scale-95 group"
                 >
                   Verify & Advance <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform"/>
                 </button>
               )}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in space-y-10 duration-700">
           {auditHistory.length === 0 ? (
             <div className="p-32 text-center glass-card bg-white rounded-[6rem] border-dashed border-4 border-slate-100 flex flex-col items-center">
                <Clock size={64} className="text-slate-100 mb-8" />
                <p className="text-slate-300 font-black uppercase tracking-[0.5em] text-lg">No Cycles Synchronized</p>
                <button onClick={() => setActiveTab('GUIDE')} className="mt-8 px-10 py-5 bg-indigo-950 text-amber-400 rounded-3xl font-black uppercase text-xs tracking-widest hover-card shadow-xl">Initiate Audit v1.0</button>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-8">
                {auditHistory.map((audit, i) => (
                  <div key={i} className="bg-white p-12 rounded-[5rem] border-2 border-slate-100 flex flex-col md:flex-row items-center justify-between hover-card shadow-xl hover:border-amber-400/40">
                     <div className="flex items-center gap-12">
                        <div className="w-28 h-28 bg-indigo-50 rounded-[3rem] flex flex-col items-center justify-center text-indigo-900 shadow-inner border-2 border-white">
                           <span className="text-xs font-black uppercase tracking-widest opacity-40">{audit.month.split('-')[0]}</span>
                           <span className="text-3xl font-black italic">{audit.month.split('-')[1]}</span>
                        </div>
                        <div>
                           <div className="flex items-center gap-4 mb-3">
                              <CheckCircle2 size={24} className="text-emerald-500" />
                              <h5 className="text-3xl font-black text-indigo-950 uppercase italic leading-none">Cycle Validated</h5>
                           </div>
                           <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-8">
                             <span className="flex items-center gap-2"><Bot size={18} className="text-indigo-400"/> {audit.tasks.filter(t => t.type === 'MACHINE').length} Delegations</span>
                             <span className="flex items-center gap-2"><User size={18} className="text-amber-500"/> {audit.tasks.filter(t => t.type === 'HUMAN').length} Alpha Nodes</span>
                           </p>
                        </div>
                     </div>
                     <div className="text-right px-10 border-l-2 border-slate-100">
                        <span className="text-[12px] font-black text-slate-300 uppercase tracking-[0.4em] block mb-2">Conductor Score</span>
                        <span className="text-7xl font-black italic text-indigo-950 drop-shadow-md">{audit.conductorScore}%</span>
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

export default MonthlySkillAudit;