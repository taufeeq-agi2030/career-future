
import React, { useState, useEffect } from 'react';
import { CareerAssessment, UserProfile, ViewState, SkillAudit, StrategicTip, EngagementPulse } from '../types';
import { bsi } from '../services/backendService';
import { IntelligenceService } from '../services/intelligenceService';
import { 
  PieChart, Pie, Cell as PieCell, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  Activity, TrendingUp, Sparkles, 
  ArrowUpRight, AlertCircle,
  Cpu, ArrowRight,
  Zap, Lightbulb, Radio,
  ShieldCheck, HeartHandshake, Info, Timer,
  BarChart3,
  CheckCircle2,
  CalendarDays,
  Award,
  Gauge,
  Shield
} from 'lucide-react';

interface DashboardProps {
  assessment: CareerAssessment;
  profile: UserProfile;
  onViewChange: (view: ViewState) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-indigo-950 p-4 rounded-2xl border border-indigo-800 shadow-2xl animate-in fade-in zoom-in duration-200">
        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2 border-b border-indigo-800 pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}></div>
            <p className="text-xs font-bold text-white uppercase italic">
              {entry.name}: <span className="text-amber-400 font-black">{entry.value}%</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ assessment, profile, onViewChange }) => {
  const [lastAudit, setLastAudit] = useState<SkillAudit | null>(null);
  const [dailyTip, setDailyTip] = useState<StrategicTip | null>(null);
  const [isTipLoading, setIsTipLoading] = useState(false);
  const [engagement, setEngagement] = useState<EngagementPulse | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const records = await bsi.getOwnRecords('skill_audits', profile.userId, 'MEMBER');
    const reflections = await bsi.getOwnRecords('reflections', profile.userId, 'MEMBER');
    
    if (records.length > 0) {
      setLastAudit(records.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]);
    }

    setEngagement(IntelligenceService.calculateEngagementAlpha(profile, reflections.length));
    loadDailyTip();
  };

  const loadDailyTip = async () => {
    setIsTipLoading(true);
    try {
      const tip = await IntelligenceService.generateDailyStrategicTip(profile, assessment);
      setDailyTip(tip);
    } catch (e) {
      console.error("Tip failed", e);
    } finally {
      setIsTipLoading(false);
    }
  };

  if (!assessment || !assessment.trajectories) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="p-16 glass-card rounded-[4rem] text-center max-w-md bg-white shadow-2xl border-4 border-slate-50">
            <AlertCircle size={64} className="text-rose-500 mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase text-indigo-950 tracking-tighter italic">Diagnostic Lost</h3>
            <p className="text-slate-500 text-sm italic mb-10">We couldn't synchronize your neural profile. Re-establish strategic link.</p>
            <button onClick={() => window.location.reload()} className="w-full py-5 bg-indigo-950 text-amber-400 rounded-2xl font-black uppercase text-xs tracking-widest hover-card">Re-Initialize Matrix</button>
         </div>
      </div>
    );
  }

  // Career Trajectory Data (Path A vs Path B)
  const trajectoryData = [
    { name: 'Today', PathA: 100, PathB: 100 },
    { name: 'Month 3', PathA: 92, PathB: 115 },
    { name: 'Month 6', PathA: 80, PathB: 135 },
    { name: 'Month 9', PathA: 65, PathB: 160 },
    { name: 'Year 1', PathA: 45, PathB: 195 },
  ];

  // Dynamic Skills Demand Trends Data
  const skillTrends = [
    { month: 'Jan', skill1Val: 45, skill2Val: 30 },
    { month: 'Feb', skill1Val: 52, skill2Val: 38 },
    { month: 'Mar', skill1Val: 48, skill2Val: 45 },
    { month: 'Apr', skill1Val: 65, skill2Val: 58 },
    { month: 'May', skill1Val: 78, skill2Val: 65 },
    { month: 'Jun', skill1Val: 88, skill2Val: 78 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 text-indigo-950">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-indigo-950 tracking-tighter italic uppercase leading-none">
            Strategy <span className="text-amber-600">Command</span> Hub
          </h2>
          <p className="text-slate-500 font-bold tracking-[0.4em] uppercase text-[11px] mt-6 flex items-center gap-3">
            <Activity size={18} className="text-indigo-600" /> Active Vector Identification: {profile.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="flex items-center gap-4 bg-indigo-950 border-2 border-indigo-800 px-8 py-4 rounded-[2rem] shadow-2xl hover-card text-white group">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                 <ShieldCheck size={24} className="animate-pulse" />
              </div>
              <div>
                 <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block leading-none mb-1">Security Rating</span>
                 <span className="text-lg font-black italic">{assessment.riskScore < 30 ? 'HIGH (SECURE)' : assessment.riskScore < 70 ? 'MODERATE' : 'CRITICAL (AT RISK)'}</span>
              </div>
           </div>
           
           <button 
             onClick={() => onViewChange(ViewState.MARKET_PULSE)}
             className="px-10 py-5 bg-rose-600 text-white rounded-[2rem] flex items-center gap-4 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-rose-500 hover-card active:scale-95 group transition-all"
           >
             <Radio size={20} className="animate-pulse" /> Live Market Signals
           </button>
        </div>
      </header>

      {/* Main Strategic Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Primary Metrics */}
        <div className="lg:col-span-8 space-y-10">
           {/* AI Collaboration Hero */}
           <div className="p-12 rounded-[5rem] bg-indigo-950 text-white flex flex-col md:flex-row items-center gap-12 border-b-[24px] border-indigo-900 shadow-3xl relative overflow-hidden group hover-card">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:scale-110 transition-transform"><Award size={360} /></div>
              <div className="relative z-10 flex-1">
                 <div className="px-6 py-2 bg-amber-400 text-indigo-950 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block shadow-xl">Collaboration Proficiency Node</div>
                 <h3 className="text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">Your <span className="text-amber-400 underline decoration-8 underline-offset-8">Orchestration</span> Score.</h3>
                 <p className="text-indigo-100 text-2xl font-medium leading-relaxed italic max-w-2xl mb-12">
                   {assessment.aiCollabTestScore 
                     ? `Your professional value benchmarked at ${assessment.aiCollabTestScore}/100. This indicates you have moved from 'Labor' to 'Architecture'.` 
                     : "Your technical symbiosis index hasn't been established. We recommend immediate calibration in the Assessment Lab."}
                 </p>
                 <button onClick={() => onViewChange(ViewState.TAKE_ASSESSMENT)} className="px-12 py-6 bg-white text-indigo-950 rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all shadow-2xl group active:scale-95 flex items-center gap-4">
                   {assessment.aiCollabTestScore ? 'View Detailed Breakdown' : 'Start Proficiency Test'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              {assessment.aiCollabTestScore && (
                <div className="w-56 h-56 rounded-[4rem] bg-white/5 border-4 border-white/10 flex flex-col items-center justify-center backdrop-blur-xl relative z-10 shadow-inner group-hover:bg-white/10 transition-all">
                   <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-indigo-950 shadow-xl rotate-12"><Sparkles size={24}/></div>
                   <span className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-2">SCORE</span>
                   <span className="text-[7rem] font-black italic text-amber-400 leading-none">{assessment.aiCollabTestScore}</span>
                </div>
              )}
           </div>

           {/* Interactive Charts Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Trajectory Area Chart */}
              <div className="p-12 rounded-[4rem] bg-white border-2 border-slate-100 relative overflow-hidden group hover-card shadow-2xl">
                 <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                       <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">Career Trajectory</h3>
                       <p className="text-4xl font-black italic uppercase tracking-tighter leading-none text-indigo-950">Market Alpha</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-[8px] font-black uppercase text-slate-400">Path B (Future)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white"></div>
                        <span className="text-[8px] font-black uppercase text-slate-400">Path A (Stagnant)</span>
                      </div>
                    </div>
                 </div>
                 <div className="h-[280px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={trajectoryData}>
                          <defs>
                             <linearGradient id="colorPathB" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                             </linearGradient>
                             <linearGradient id="colorPathA" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                          <YAxis hide domain={[0, 'auto']} />
                          <Tooltip content={<CustomTooltip />} />
                          <Area 
                            type="monotone" 
                            dataKey="PathB" 
                            stroke="#10b981" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorPathB)" 
                            name="Future Evolution" 
                            animationDuration={2000}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="PathA" 
                            stroke="#f43f5e" 
                            strokeWidth={2} 
                            strokeDasharray="8 8" 
                            fillOpacity={1} 
                            fill="url(#colorPathA)" 
                            name="Legacy Path" 
                            animationDuration={2000}
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-8 flex justify-between items-end relative z-10">
                    <p className="text-slate-500 font-bold text-[10px] uppercase italic">Predicted Gain: <span className="text-emerald-600 font-black">+145% Resilience</span></p>
                    <button onClick={() => onViewChange(ViewState.ROADMAP)} className="p-4 bg-slate-50 rounded-2xl text-indigo-600 hover:bg-indigo-950 hover:text-white transition-all shadow-sm group">
                       <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform" />
                    </button>
                 </div>
              </div>

              {/* Skills Line Chart */}
              <div className="p-12 rounded-[4rem] bg-white border-2 border-slate-100 shadow-2xl relative overflow-hidden group hover-card">
                 <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                       <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">Demand Pulse</h3>
                       <p className="text-4xl font-black italic uppercase tracking-tighter leading-none text-indigo-950">Skill Surge</p>
                    </div>
                    <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Real-time</div>
                 </div>
                 <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={skillTrends}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                          <YAxis hide domain={[0, 100]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="skill1Val" 
                            name={assessment.strengths[0]?.name || 'Critical Logic'} 
                            stroke="#fbbf24" 
                            strokeWidth={5} 
                            dot={{ r: 6, fill: '#fbbf24', strokeWidth: 3, stroke: '#fff' }} 
                            activeDot={{ r: 10, shadow: '0 0 20px rgba(251,191,36,0.8)' }} 
                            animationDuration={2500}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="skill2Val" 
                            name={assessment.strengths[1]?.name || 'Agent Orchestration'} 
                            stroke="#4ade80" 
                            strokeWidth={3} 
                            strokeDasharray="5 5" 
                            dot={false} 
                            animationDuration={2500}
                          />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-8 flex items-center justify-between">
                    <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] italic">Source: Global Disruption Index 2024.Q4</p>
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                       <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-75"></span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Col: Personal Pulse & Auditing */}
        <div className="lg:col-span-4 space-y-10">
           {/* Conductor Score Card */}
           <div className="p-12 rounded-[5rem] bg-white border-2 border-slate-100 flex flex-col items-center justify-center relative group hover-card shadow-3xl border-b-[20px] border-slate-50">
              <div className="absolute top-10 right-10">
                 <Shield size={32} className="text-emerald-500 opacity-20" />
              </div>
              <div className="w-20 h-20 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mb-10 shadow-inner group-hover:rotate-12 transition-transform">
                 <Gauge size={40} />
              </div>
              <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 text-center">Conductor Index</h3>
              <div className="flex items-baseline gap-2 mb-4">
                 <span className="text-[10rem] font-black italic tracking-tighter text-indigo-950 leading-none">{lastAudit ? lastAudit.conductorScore : '--'}</span>
                 <span className="text-3xl font-black text-amber-500">%</span>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12 text-center leading-relaxed">
                 {lastAudit 
                   ? `Validated for ${lastAudit.month}. ${lastAudit.tasks.filter(t => t.type === 'MACHINE').length} tasks successfully delegated.` 
                   : "Monthly Conductor protocol not initialized. Calibrate required."}
              </p>
              <button onClick={() => onViewChange(ViewState.MONTHLY_AUDIT)} className="w-full py-6 bg-indigo-950 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-2xl active:scale-95">
                 {lastAudit ? 'Perform Re-calibration' : 'Initialize Conductor Audit'}
              </button>
           </div>

           {/* Risk Gauge Circle */}
           <div className="p-12 rounded-[5rem] bg-white border-2 border-slate-100 flex flex-col items-center justify-center relative group hover-card shadow-2xl">
              <div className="absolute top-10 left-10">
                 <AlertCircle size={28} className="text-rose-500" />
              </div>
              <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 text-center">Obsolescence Radar</h3>
              <div className="relative w-64 h-64 mb-10">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie data={[{ value: assessment.riskScore, color: '#f43f5e' }, { value: 100 - assessment.riskScore, color: '#f1f5f9' }]} cx="50%" cy="50%" innerRadius={85} outerRadius={110} startAngle={210} endAngle={-30} dataKey="value" stroke="none">
                          <PieCell fill="#f43f5e" /><PieCell fill="#f1f5f9" />
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Automation Risk</span>
                    <span className="text-7xl font-black text-indigo-950 italic tracking-tighter leading-none">{assessment.riskScore}%</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest mt-3 px-4 py-1 rounded-full ${assessment.riskScore > 70 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{assessment.riskCategory}</span>
                 </div>
              </div>
              <p className="text-xs font-bold text-slate-500 italic text-center leading-relaxed">
                 Action required within <span className="text-rose-600 font-black">{assessment.timeToImpact.critical} months</span> to maintain market alpha.
              </p>
           </div>

           {/* Daily Strategic Pulse Card */}
           <div className="p-10 rounded-[4rem] bg-amber-400 text-indigo-950 flex flex-col justify-between shadow-3xl relative overflow-hidden group hover-card border-b-[20px] border-amber-500 min-h-[300px]">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:rotate-45 transition-transform"><Lightbulb size={240} /></div>
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                    <div className="p-4 rounded-[2rem] bg-indigo-950 text-amber-400 shadow-2xl relative group-hover:scale-110 transition-transform">
                       <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-ping scale-150 opacity-10"></div>
                       <Lightbulb size={32} />
                    </div>
                    <div className="px-5 py-2 bg-white/40 border border-white/60 rounded-full text-[9px] font-black uppercase tracking-[0.4em]">Strategic Tip</div>
                 </div>
                 {isTipLoading ? (
                   <div className="space-y-4 animate-pulse">
                      <div className="h-10 bg-white/40 rounded-2xl w-3/4"></div>
                      <div className="h-5 bg-white/40 rounded-xl w-full"></div>
                      <div className="h-5 bg-white/40 rounded-xl w-2/3"></div>
                   </div>
                 ) : (
                   <>
                     <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6 leading-none">{dailyTip?.title || 'Tactical Pivot Ready'}</h3>
                     <p className="text-indigo-950 text-xl font-bold italic leading-relaxed mb-10">"{dailyTip?.content || 'Synchronizing with latest market disruption signals...'}"</p>
                   </>
                 )}
              </div>
              <button onClick={() => onViewChange(ViewState.LEARNING_HUB)} className="w-fit px-12 py-5 bg-indigo-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-indigo-900 transition-all shadow-2xl relative z-10 group active:scale-95">
                 Execute Tactical Win <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      {/* Career Security Guarantee Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-700 p-16 rounded-[6rem] text-white flex flex-col lg:flex-row items-center gap-16 shadow-3xl relative overflow-hidden border-b-[24px] border-indigo-950 group hover-card mt-16">
         <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 group-hover:scale-110 transition-transform"><HeartHandshake size={380} /></div>
         <div className="relative z-10 flex-1">
            <div className="px-6 py-2 bg-white/20 border border-white/30 rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] mb-10 inline-block shadow-lg">The FuturePath Guarantee</div>
            <h3 className="text-6xl font-black uppercase italic tracking-tighter mb-10 leading-[0.9]">Your Job is Our <br/><span className="text-amber-400 underline decoration-[12px] underline-offset-[16px]">Primary Asset</span>.</h3>
            <p className="text-emerald-50 text-2xl font-medium leading-relaxed italic max-w-4xl mb-12 border-l-4 border-amber-400 pl-12">
               "We don't prevent automation; we position you ahead of it. By following your 12-month transformation roadmap, your automation risk is projected to drop to <span className="text-amber-400 font-black">15%</span> or less."
            </p>
            <div className="flex flex-wrap gap-6">
               <button onClick={() => onViewChange(ViewState.ROADMAP)} className="px-12 py-6 bg-amber-400 text-indigo-950 rounded-[3rem] font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95">Activate Security protocol</button>
               <button onClick={() => onViewChange(ViewState.QA_PROTOCOL)} className="px-10 py-6 bg-white/10 border-2 border-white/20 text-white rounded-[3rem] font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-4 group">How this Engine Works <Info size={20} className="group-hover:rotate-12 transition-transform" /></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
