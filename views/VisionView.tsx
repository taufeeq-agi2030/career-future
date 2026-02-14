
import React, { useState } from 'react';
import { ProfessionalVision, UserProfile, CareerAssessment } from '../types';
import { bsi } from '../services/backendService';
import { GoogleGenAI } from "@google/genai";
import { 
  Eye, 
  Target, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Quote,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Layers,
  CheckCircle2,
  RefreshCw,
  MagicWand,
  Terminal,
  Cpu
} from 'lucide-react';

interface VisionViewProps {
  vision: ProfessionalVision;
  profile: UserProfile;
  assessment: CareerAssessment;
  onUpdate: (v: ProfessionalVision) => void;
}

const VisionView: React.FC<VisionViewProps> = ({ vision: initialVision, profile, assessment, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVision, setEditedVision] = useState<ProfessionalVision>(initialVision);
  const [isSaving, setIsSaving] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await bsi.saveRecord('visions', editedVision, 'MEMBER');
      onUpdate(editedVision);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save vision protocol:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const refineField = async (field: keyof ProfessionalVision, instruction: string) => {
    setIsSynthesizing(field);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const currentValue = editedVision[field];
    
    const prompt = `
      ACT AS: A world-class Career Vision Architect.
      CONTEXT: User is a ${profile.role} in ${profile.industry}. Current value for ${field}: "${JSON.stringify(currentValue)}".
      INSTRUCTION: ${instruction}.
      GOAL: Shift the language from 'doing' to 'orchestrating' and 'leading'.
      OUTPUT: Return ONLY the refined value as a string (if statement/northstar) or a JSON array/object matching the field's structure.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      const text = response.text;
      if (field === 'directives' || field === 'values') {
        setEditedVision({ ...editedVision, [field]: JSON.parse(text) });
      } else {
        setEditedVision({ ...editedVision, [field]: text.replace(/"/g, '') });
      }
    } catch (err) {
      console.error("AI Synthesis failed", err);
    } finally {
      setIsSynthesizing(null);
    }
  };

  const addDirective = () => {
    setEditedVision({
      ...editedVision,
      directives: [
        ...editedVision.directives,
        { title: '', timeframe: '', description: '', impact: '' }
      ]
    });
  };

  const removeDirective = (index: number) => {
    const next = [...editedVision.directives];
    next.splice(index, 1);
    setEditedVision({ ...editedVision, directives: next });
  };

  const updateDirective = (index: number, field: string, value: string) => {
    const next = [...editedVision.directives];
    next[index] = { ...next[index], [field]: value };
    setEditedVision({ ...editedVision, directives: next });
  };

  const addValue = () => {
    setEditedVision({
      ...editedVision,
      values: [...editedVision.values, '']
    });
  };

  const removeValue = (index: number) => {
    const next = [...editedVision.values];
    next.splice(index, 1);
    setEditedVision({ ...editedVision, values: next });
  };

  const updateValue = (index: number, value: string) => {
    const next = [...editedVision.values];
    next[index] = value;
    setEditedVision({ ...editedVision, values: next });
  };

  if (isEditing) {
    return (
      <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-500 space-y-12 pb-32">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-200 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-amber-200">Neural Synthesis Mode</div>
            <h2 className="text-6xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none">Vision <span className="text-amber-600">Lab</span></h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-8 py-4 bg-white border-2 border-slate-200 rounded-[2rem] font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-10 py-4 bg-indigo-950 text-amber-400 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all"
            >
              {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
              Lock Architecture
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Career Statement Section */}
            <div className="glass-card p-12 rounded-[4rem] bg-white shadow-xl border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Cpu size={120} /></div>
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Terminal size={16} /> Operational Thesis
                </h3>
                <button 
                  onClick={() => refineField('statement', 'Make this a powerful, executive-level visionary statement focusing on AI orchestration')}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  {isSynthesizing === 'statement' ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  Refine Protocol
                </button>
              </div>
              <textarea 
                value={editedVision.statement}
                onChange={(e) => setEditedVision({...editedVision, statement: e.target.value})}
                placeholder="Define your professional purpose in the age of AI..."
                className="w-full min-h-[150px] bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 text-2xl font-black italic text-indigo-950 outline-none focus:border-amber-400 transition-all resize-none relative z-10"
              />
            </div>

            {/* North Star Section */}
            <div className="glass-card p-12 rounded-[4rem] bg-white shadow-xl border border-slate-100 relative group">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Target size={16} /> Strategic North Star
                </h3>
                <button 
                  onClick={() => refineField('northStar', 'Convert this into a concrete, 5-year strategic job title or market outcome')}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  {isSynthesizing === 'northStar' ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  Target Alpha
                </button>
              </div>
              <input 
                type="text"
                value={editedVision.northStar}
                onChange={(e) => setEditedVision({...editedVision, northStar: e.target.value})}
                placeholder="Your ultimate career objective..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-xl font-bold uppercase tracking-tight text-indigo-950 outline-none focus:border-indigo-400 transition-all"
              />
            </div>

            {/* Directives Section */}
            <div className="glass-card p-12 rounded-[4rem] bg-white shadow-xl border border-slate-100 relative">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Compass size={16} /> Strategic Directives
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => refineField('directives', 'Generate 3 high-impact professional directives focusing on upskilling and market positioning')}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    {isSynthesizing === 'directives' ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    Sync Paths
                  </button>
                  <button 
                    onClick={addDirective}
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {editedVision.directives.map((d, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 relative group animate-in slide-in-from-bottom-4">
                    <button 
                      onClick={() => removeDirective(i)}
                      className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Directive Title</label>
                        <input 
                          type="text"
                          value={d.title}
                          onChange={(e) => updateDirective(i, 'title', e.target.value)}
                          placeholder="e.g. Technical Mastery"
                          className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-indigo-950 text-sm outline-none focus:border-indigo-400 shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Time Horizon</label>
                        <input 
                          type="text"
                          value={d.timeframe}
                          onChange={(e) => updateDirective(i, 'timeframe', e.target.value)}
                          placeholder="e.g. Q3 2024"
                          className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-amber-600 text-sm outline-none focus:border-amber-400 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Execution Protocol</label>
                      <textarea 
                        value={d.description}
                        onChange={(e) => updateDirective(i, 'description', e.target.value)}
                        placeholder="Detailed tactical approach..."
                        className="w-full h-24 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-medium text-slate-600 text-sm outline-none focus:border-indigo-400 resize-none shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Core Values Section */}
            <div className="glass-card p-12 rounded-[4rem] bg-white shadow-xl border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-3">
                  <Zap size={16} /> Core Values
                </h3>
                <button 
                  onClick={addValue}
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {editedVision.values.map((v, i) => (
                  <div key={i} className="flex gap-2 group animate-in slide-in-from-right-4">
                    <input 
                      type="text"
                      value={v}
                      onChange={(e) => updateValue(i, e.target.value)}
                      placeholder="Enter value..."
                      className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-indigo-950 outline-none focus:border-emerald-400 shadow-sm"
                    />
                    <button 
                      onClick={() => removeValue(i)}
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-400 p-12 rounded-[4rem] text-indigo-950 shadow-2xl shadow-amber-400/20">
               <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck size={24} />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Resiliency Check</h4>
               </div>
               <p className="text-xl font-black italic leading-tight mb-8">"Ensure your directives shift you from machine-level labor to human-alpha decision curation."</p>
               <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-5 bg-indigo-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
               >
                 Confirm Architecture
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-800 text-white rounded-[2rem] flex items-center justify-center mx-auto md:mx-0 mb-8 shadow-2xl animate-float">
            <Eye size={40} />
          </div>
          <h2 className="text-6xl font-black text-indigo-950 uppercase italic tracking-tighter mb-4 leading-none">The North Star <span className="text-amber-600">Protocol</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px]">Synthesizing Your Long-Term Strategic Identity</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-10 py-5 bg-white border-2 border-indigo-950 text-indigo-950 rounded-[2.5rem] font-black text-sm uppercase tracking-tighter flex items-center gap-3 hover:bg-indigo-950 hover:text-white transition-all shadow-xl"
        >
          <Edit3 size={18} /> Modify Architecture
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Vision Statement */}
        <div className="lg:col-span-8 space-y-10">
          <div className="glass-card p-16 rounded-[4rem] relative overflow-hidden group border-amber-400/20 bg-white/70 hover-card shadow-2xl">
            <Quote className="absolute top-10 right-10 text-slate-200 opacity-20" size={160} />
            <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.5em] mb-10 flex items-center gap-3">
              <Compass size={16} /> Operational Thesis
            </h3>
            <p className="text-indigo-950 text-4xl font-black italic leading-[1.1] uppercase tracking-tighter mb-10 text-glow relative z-10">
              "{initialVision.statement}"
            </p>
            <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100 relative z-10">
              {initialVision.values.map((v, i) => (
                <span key={i} className="px-6 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-950 uppercase tracking-widest shadow-sm">{v}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-card p-12 rounded-[4rem] border-indigo-200 bg-white/70 hover-card shadow-xl">
               <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                 <Target size={18} /> Strategic North Star
               </h4>
               <p className="text-indigo-950 text-2xl font-black uppercase italic leading-tight">{initialVision.northStar}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 p-12 rounded-[4rem] text-white shadow-3xl hover-card">
               <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                 <Zap size={18} /> Instant Action Pulse
               </h4>
               <p className="text-white text-lg font-bold italic leading-relaxed mb-6">"Align your current outputs to the North Star through immediate orchestration of autonomous toolsets."</p>
               <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 group">
                Sync with Plan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Vision Directives */}
        <div className="lg:col-span-4 space-y-10">
           <div className="glass-card p-12 rounded-[4rem] bg-white/70 hover-card shadow-xl">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10">Strategic Directives</h4>
              <div className="space-y-8">
                {initialVision.directives.map((d, i) => (
                  <div key={i} className="group cursor-default animate-in slide-in-from-right duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">{d.timeframe}</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    </div>
                    <h5 className="text-sm font-black text-indigo-950 uppercase mb-2 group-hover:text-indigo-600 transition-colors">{d.title}</h5>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">{d.description}</p>
                  </div>
                ))}
                {initialVision.directives.length === 0 && (
                  <p className="text-center py-10 text-slate-300 font-black uppercase italic tracking-widest text-[9px]">No directives established.</p>
                )}
              </div>
           </div>

           <div className="bg-amber-400 p-12 rounded-[4rem] text-indigo-950 shadow-2xl shadow-amber-400/20 group hover-card">
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                 <ShieldCheck size={18} /> Vision Integrity
              </h4>
              <p className="text-xl font-black italic leading-tight mb-8">"This protocol captures high-level market resilience for the next phase of evolution."</p>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                <CheckCircle2 size={20} className="text-indigo-950" />
                Protocol Certified
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VisionView;
