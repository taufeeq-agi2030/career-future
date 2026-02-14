
import React, { useState, useEffect } from 'react';
import { UserProfile, MarketSignal } from '../types';
import { IntelligenceService } from '../services/intelligenceService';
import { 
  Radio, 
  Zap, 
  ExternalLink, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  Activity, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Search
} from 'lucide-react';

interface MarketPulseViewProps {
  profile: UserProfile;
}

const MarketPulseView: React.FC<MarketPulseViewProps> = ({ profile }) => {
  const [signals, setSignals] = useState<MarketSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSignals();
  }, []);

  const loadSignals = async () => {
    setIsLoading(true);
    try {
      const data = await IntelligenceService.fetchMarketPulse(profile);
      setSignals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in pb-20 text-indigo-950 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-[9px] font-black uppercase tracking-widest mb-4">Live Threat Radar</div>
          <h2 className="text-5xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Market <span className="text-rose-600">Pulse</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4 flex items-center gap-2">
            <Radio size={14} className="text-rose-600 animate-pulse" /> Scanning for Phase 2 Disruption Vectors: {profile.industry}
          </p>
        </div>
        <button 
          onClick={loadSignals}
          disabled={isLoading}
          className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-indigo-200 transition-all active:scale-95"
        >
          {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Search size={16} />}
          Refresh Signals
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-12 rounded-[4rem] border border-slate-100 animate-pulse flex gap-10">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl" />
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-slate-100 rounded-xl w-1/3" />
                <div className="h-4 bg-slate-100 rounded-lg w-full" />
                <div className="h-4 bg-slate-100 rounded-lg w-2/3" />
              </div>
            </div>
          ))
        ) : signals.length === 0 ? (
          <div className="p-24 text-center glass-card bg-white rounded-[5rem] border-dashed border-2 flex flex-col items-center">
            <Radio size={48} className="text-slate-200 mb-6" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No critical signals detected in the last 24 hours. Silence is strategic.</p>
          </div>
        ) : (
          signals.map((signal, i) => (
            <div key={signal.id} className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 flex flex-col lg:flex-row items-center gap-12 hover-card shadow-sm group">
              <div className="relative">
                <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center shadow-xl transition-transform group-hover:rotate-6 ${
                  signal.impact === 'DISRUPTIVE' ? 'bg-rose-500 text-white' : signal.impact === 'ADAPTIVE' ? 'bg-amber-400 text-indigo-950' : 'bg-indigo-950 text-white'
                }`}>
                  <ShieldAlert size={48} />
                </div>
                {signal.impact === 'DISRUPTIVE' && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white border-4 border-rose-500 rounded-full animate-ping opacity-20" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                    signal.impact === 'DISRUPTIVE' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {signal.impact} SIGNAL
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Clock size={14} /> TTI: {signal.timeToImpact}
                  </div>
                </div>
                <h3 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none mb-4 group-hover:text-rose-600 transition-colors">{signal.title}</h3>
                <p className="text-slate-500 font-medium italic leading-relaxed text-lg mb-8">"{signal.description}"</p>
                
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                  <div className="flex-1">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Strategic Recommendation</span>
                    <p className="text-sm font-bold text-indigo-950 uppercase italic leading-tight">{signal.recommendation}</p>
                  </div>
                  <a 
                    href={signal.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-950 hover:border-indigo-950 transition-all shadow-sm"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-indigo-950 p-16 rounded-[5rem] text-white text-center shadow-3xl relative overflow-hidden group hover-card border-b-[20px] border-indigo-900">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Sparkles size={240} /></div>
        <div className="relative z-10">
          <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none text-amber-400">Signal Supremacy Protocol</h4>
          <p className="text-indigo-200 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic mb-10">
            "Your professional value is a function of your response time to market disruption. By monitoring these Phase 2 signals, you are moving from a reactive state to a proactive orchestration position."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-5 bg-white text-indigo-950 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-amber-50 transition-all">Download Signal Briefing</button>
            <button className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl border border-white/20 hover:bg-indigo-500 transition-all">Configure Threat Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulseView;
