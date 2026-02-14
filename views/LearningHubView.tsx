
import React, { useState } from 'react';
import { LearningResource } from '../types';
import { 
  BookOpen, 
  ExternalLink, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Star,
  Search,
  Filter
} from 'lucide-react';

interface LearningHubViewProps {
  resources: LearningResource[];
}

const LearningHubView: React.FC<LearningHubViewProps> = ({ resources }) => {
  const [filter, setFilter] = useState<'All' | 'Course' | 'Tool' | 'Webinar'>('All');
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const filtered = filter === 'All' ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="space-y-12 animate-in fade-in pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Intelligence Lab</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">Curated Assets for Human-Alpha Mastery</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Course', 'Tool', 'Webinar'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                filter === t ? 'bg-indigo-950 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:text-indigo-950'
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </header>

      {/* Featured Course - Light version */}
      <div className="bg-white p-12 rounded-[4rem] border-2 border-indigo-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-sm hover-card">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 flex-1">
          <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase rounded-lg w-fit mb-6">Course of the Month</div>
          <h3 className="text-4xl font-black tracking-tighter uppercase leading-tight mb-4 italic text-indigo-950">Strategic AI Orchestration for Creative Leaders</h3>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mb-10 italic">
            "Master the framework for leading AI agents and maintaining high-leverage decision control in automated environments."
          </p>
          <div className="flex gap-6 items-center">
            <button className="px-8 py-4 bg-indigo-950 text-white rounded-2xl font-black text-sm uppercase flex items-center gap-2 hover:bg-indigo-900 transition-all shadow-xl shadow-indigo-950/20">
              <PlayCircle size={18}/> Start Mastery
            </button>
            <div className="flex items-center gap-2 text-indigo-400 font-black text-sm uppercase">
              <Clock size={16}/> 12 Hours
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-1/3 aspect-square bg-indigo-50 rounded-[3rem] border border-indigo-100 flex items-center justify-center backdrop-blur-md">
           <BookOpen size={100} className="text-indigo-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all group flex flex-col justify-between h-full hover-card">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  res.type === 'Course' ? 'bg-indigo-50 text-indigo-600' : 
                  res.type === 'Tool' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {res.type === 'Course' ? <PlayCircle size={24}/> : <ExternalLink size={24}/>}
                </div>
                <div className="px-2 py-0.5 bg-slate-100 rounded text-[8px] font-black text-slate-400 uppercase tracking-widest">{res.provider}</div>
              </div>
              <h4 className="text-xl font-black text-indigo-950 uppercase leading-tight mb-3 group-hover:text-indigo-600 transition-colors">{res.title}</h4>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">{res.skill} • {res.level}</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                <span className="text-[10px] font-black text-slate-400 ml-2 uppercase">Verified Resource</span>
              </div>
              <div className="flex gap-2">
                <a 
                  href={res.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 py-4 bg-white border-2 border-indigo-950 text-indigo-950 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-indigo-950 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Access <ExternalLink size={14} />
                </a>
                <button 
                  onClick={() => setCompleted(new Set(completed).add(res.id))}
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                    completed.has(res.id) ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-200 hover:text-emerald-500 hover:border-emerald-500'
                  }`}
                >
                  <CheckCircle2 size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 p-16 rounded-[4.5rem] border border-indigo-100 shadow-sm flex flex-col md:flex-row items-center gap-12 hover-card">
        <div className="w-40 h-40 rounded-full border-[12px] border-white bg-white flex items-center justify-center relative shadow-xl">
          <div className="absolute inset-0 border-[12px] border-indigo-600 rounded-full border-t-transparent border-r-transparent -rotate-45"></div>
          <span className="text-3xl font-black text-indigo-950">42%</span>
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-black uppercase tracking-tight mb-4 text-indigo-950 italic">Mastery Pipeline</h4>
          <p className="text-slate-600 font-bold leading-relaxed mb-6 italic">
            "Your learning velocity is currently 12% above the industry average. Continue following the curated path to maintain your competitive lead."
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white rounded-xl border border-indigo-100 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">3 Courses In Progress</div>
            <div className="px-4 py-2 bg-white rounded-xl border border-indigo-100 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">12 Skill Nodes Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHubView;
