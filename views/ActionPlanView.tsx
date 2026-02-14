
import React, { useState } from 'react';
import { ActionPlan } from '../types';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Star, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Target,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Award,
  TrendingUp,
  Fingerprint
} from 'lucide-react';

interface ActionPlanViewProps {
  plan: ActionPlan;
}

const ActionPlanView: React.FC<ActionPlanViewProps> = ({ plan }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  if (!plan || !plan.phases || plan.phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-[4rem] border border-slate-200 p-20 text-center">
        <AlertCircle size={64} className="text-amber-500 mb-6" />
        <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Plan Generation Interrupted</h3>
        <p className="text-slate-500 max-w-md mt-4 font-medium">We couldn't synthesize your 90-day resiliency protocol. Please try regenerating your career assessment.</p>
      </div>
    );
  }

  const toggleTask = (taskId: string) => {
    const next = new Set(completedTasks);
    if (next.has(taskId)) next.delete(taskId);
    else next.add(taskId);
    setCompletedTasks(next);
  };

  const currentPhase = plan.phases[activePhase] || plan.phases[0];
  const totalTasksCount = plan.phases.reduce((acc, p) => acc + (p?.weeks?.reduce((wacc, w) => wacc + (w?.tasks?.length || 0), 0) || 0), 0);
  const progressPercentage = totalTasksCount > 0 ? Math.round((completedTasks.size / totalTasksCount) * 100) : 0;

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'CRITICAL': return 'bg-rose-600 text-white shadow-rose-200';
      case 'HIGH': return 'bg-rose-500 text-white shadow-rose-100';
      case 'MEDIUM': return 'bg-amber-500 text-indigo-950 shadow-amber-100';
      case 'LOW': return 'bg-slate-400 text-white shadow-slate-100';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in pb-20 max-w-5xl mx-auto text-indigo-950">
      <header className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Proactive Transformation Logic</div>
        <h2 className="text-6xl font-black text-indigo-950 mb-4 tracking-tighter uppercase italic leading-[0.85]">90-Day Resiliency <br/><span className="text-amber-600">Protocol</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] mt-6">Transform from at-risk to indispensable in 3 Phases</p>
      </header>

      {/* Priority Matrix Key - NEW */}
      <div className="flex flex-wrap justify-center gap-4">
        {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
          <div key={p} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
             <div className={`w-3 h-3 rounded-full ${getPriorityColor(p).split(' ')[0]}`} />
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p} Response</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {plan.phases.map((phase, i) => (
          <button
            key={`phase-nav-${i}`}
            onClick={() => setActivePhase(i)}
            className={`px-10 py-6 rounded-[2.5rem] font-black text-sm transition-all border-4 flex items-center gap-4 ${
              activePhase === i 
                ? 'bg-indigo-950 border-indigo-950 text-amber-400 shadow-2xl scale-110' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${activePhase === i ? 'bg-amber-400 text-indigo-950' : 'bg-slate-50'}`}>
              {i + 1}
            </div>
            PHASE {i + 1}: {phase?.name?.split(':')[0] || 'Strategic Step'}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        <div className="bg-indigo-950 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-12 shadow-3xl relative overflow-hidden border-b-[16px] border-indigo-900 hover-card">
          <div className="absolute -bottom-10 -left-10 opacity-10 rotate-45"><Zap size={320} /></div>
          <div className="w-28 h-28 bg-white/10 rounded-[3rem] flex items-center justify-center text-amber-400 shadow-inner border border-white/10 shrink-0">
            <Zap size={56} className="animate-pulse" />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">{currentPhase?.name || 'Evolution Phase'}</h3>
            <p className="text-indigo-200 font-bold text-lg max-w-2xl leading-relaxed italic border-l-4 border-amber-400 pl-8">
              "Shift from completion-focused labor to strategic oversight. This phase targets your 80%+ automation vulnerabilities."
            </p>
          </div>
          <div className="text-center bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm min-w-[150px]">
            <div className="text-5xl font-black text-amber-400 leading-none italic">{progressPercentage}%</div>
            <div className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mt-4">Resilience Gain</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {currentPhase?.weeks?.map((week, wIdx) => (
            <div key={`week-${week?.weekNumber || wIdx}`} className="relative pl-12 md:pl-24 group">
              <div className="absolute left-0 top-0 text-slate-100 text-[10rem] font-black select-none pointer-events-none -ml-4 -mt-16 z-0 transition-colors group-hover:text-amber-50">
                W{week?.weekNumber || (wIdx + 1)}
              </div>
              <div className="relative z-10 bg-white p-12 rounded-[5rem] border-2 border-slate-100 shadow-xl hover:border-amber-400/30 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b-2 border-slate-50 pb-10">
                  <div>
                    <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">Week {week?.weekNumber || (wIdx + 1)} Strategy Pulse</span>
                    <h4 className="text-4xl font-black text-indigo-950 tracking-tight uppercase italic leading-none">{week?.theme || 'Strategic Onboarding'}</h4>
                  </div>
                  <div className="bg-indigo-50 text-indigo-950 px-8 py-4 rounded-[2rem] flex items-center gap-4 border-2 border-indigo-100 shadow-sm group-hover:bg-indigo-950 group-hover:text-white transition-all">
                    <Target size={24} className="text-indigo-600 group-hover:text-amber-400" />
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest leading-none opacity-50">Milestone Target</p>
                      <p className="text-sm font-black italic">{week?.milestone || 'Strategic Alignment Node'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {week?.tasks?.map((task, idx) => {
                    const taskId = `w${week?.weekNumber || wIdx}-t${idx}`;
                    const isDone = completedTasks.has(taskId);
                    return (
                      <div 
                        key={`task-${taskId}`} 
                        onClick={() => toggleTask(taskId)}
                        className={`group p-8 rounded-[3.5rem] border-2 transition-all cursor-pointer flex flex-col md:flex-row items-center gap-8 hover-card ${
                          isDone 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-inner' 
                            : 'bg-white border-slate-100 text-slate-900 shadow-sm'
                        }`}
                      >
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all shadow-lg shrink-0 ${
                          isDone ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-indigo-950 group-hover:text-amber-400'
                        }`}>
                          {isDone ? <CheckCircle2 size={32} /> : <div className="text-lg font-black">{idx + 1}</div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h5 className="font-black text-lg uppercase tracking-tight text-indigo-950 italic">{task?.title || 'Tactical Protocol'}</h5>
                            <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md ${getPriorityColor(task.priority)}`}>
                               {task.priority}
                            </span>
                          </div>
                          <p className={`text-sm font-medium leading-relaxed mb-6 ${isDone ? 'opacity-50' : 'text-slate-500'} italic`}>"{task?.description || 'Active protocol description pending.'}"</p>
                          
                          {/* Proof of Productivity Section - NEW */}
                          <div className={`p-4 rounded-2xl border flex items-center gap-3 transition-colors ${isDone ? 'bg-emerald-100/50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-100 text-amber-900'}`}>
                             <Fingerprint size={18} className={isDone ? 'text-emerald-500' : 'text-amber-600'} />
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Proof of Productivity Requirement</p>
                                <p className="text-xs font-bold italic">{task.proofOfProductivity}</p>
                             </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{task?.duration || '1h'}</span>
                           <ChevronRight className={`transition-all ${isDone ? 'text-emerald-500' : 'text-slate-200 group-hover:text-indigo-950 group-hover:translate-x-1'}`} size={24} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-4 border-emerald-100 p-20 rounded-[6rem] text-center shadow-3xl hover-card relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-50/30 backdrop-blur-sm -z-10"></div>
        <ShieldCheck size={80} className="text-emerald-500 mx-auto mb-10 animate-float" />
        <h3 className="text-5xl font-black text-indigo-950 uppercase tracking-tighter mb-6 italic leading-none">Security Certification</h3>
        <p className="text-slate-600 text-2xl font-medium leading-relaxed mb-16 max-w-3xl mx-auto italic font-bold">
          "The 90-day protocol is not a learning exercise; it is an infrastructure deployment. Complete these tasks to move from At-Risk to Unstoppable."
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
           <button className="px-16 py-8 bg-indigo-950 text-white rounded-[3rem] font-black hover:bg-indigo-900 transition-all text-xl uppercase tracking-tighter shadow-2xl flex items-center gap-4">
            Sync to Personal Calendar <Calendar />
          </button>
          <button className="px-12 py-8 bg-emerald-100 text-emerald-700 rounded-[3rem] font-black hover:bg-emerald-200 transition-all text-xl uppercase tracking-tighter">
            Export Deployment PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionPlanView;
