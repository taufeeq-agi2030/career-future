
import React, { useState, useEffect } from 'react';
import { ViewState, UserProfile, Notification, CareerAssessment } from '../types';
import { IntelligenceService } from '../services/intelligenceService';
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Sparkles, 
  ClipboardList, 
  CalendarCheck,
  Settings,
  BookOpen,
  Users,
  Bell,
  X,
  AlertCircle,
  Mic,
  Eye,
  CreditCard,
  Info,
  ShieldCheck,
  Cpu,
  ChevronDown,
  FileText,
  CalendarDays,
  Compass,
  Zap,
  TrendingUp,
  Mail,
  Radio,
  Rocket
} from 'lucide-react';

interface LayoutProps {
  children: React.Node;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  isLoading?: boolean;
  profile?: UserProfile | null;
  assessment?: CareerAssessment | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, isLoading, profile, assessment }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [protocolsOpen, setProtocolsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (profile && assessment) {
      loadNotifications();
    }
  }, [profile, assessment]);

  const loadNotifications = async () => {
    try {
      const alerts = await IntelligenceService.synthesizeStrategicAlerts(profile!, assessment!);
      setNotifications(alerts);
    } catch (e) {
      console.error("Failed to load strategic alerts", e);
    }
  };

  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.EVOLUTION_RADAR, label: 'Evolution Radar', icon: Rocket, badge: 'New' },
    { id: ViewState.MARKET_PULSE, label: 'Market Pulse', icon: Radio },
    { id: ViewState.CAREER_DISCOVERY, label: 'Discovery & Gaps', icon: Compass },
    { id: ViewState.PROFESSIONAL_VISION, label: 'Strategic Vision', icon: Eye },
    { id: ViewState.COLLAB_SKILLS_ASSESSMENT, label: 'Collab Skills', icon: Zap },
    { id: ViewState.VOICE_REFLECTION, label: 'Voice Reflection', icon: Mic },
    { id: ViewState.MONTHLY_AUDIT, label: 'Skill Audit', icon: CalendarDays },
    { id: ViewState.ASSESSMENT_CENTER, label: 'Assessment Lab', icon: ClipboardList },
    { id: ViewState.ACTION_PLAN, label: '90-Day Plan', icon: CalendarCheck },
  ];

  const secondaryNav = [
    { id: ViewState.LEARNING_HUB, label: 'Learning Hub', icon: BookOpen },
    { id: ViewState.MENTOR_MATCH, label: 'Mentor Match', icon: Users },
    { id: ViewState.CHAT, label: 'AI Strategy', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fffdf5] text-slate-900 overflow-hidden font-medium">
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in">
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-md" onClick={() => setShowNotifications(false)}></div>
          <div className="relative w-full max-w-md bg-white h-screen shadow-2xl p-8 flex flex-col animate-in slide-in-from-right border-l-4 border-indigo-950">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-indigo-900 italic leading-none mb-2">Intervention Stream</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Displacement Radar</p>
              </div>
              <button onClick={() => setShowNotifications(false)} className="p-3 hover:bg-slate-100 rounded-2xl transition-all"><X size={20}/></button>
            </div>
            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="py-20 text-center">
                  <Mail className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No active interventions found.</p>
                </div>
              ) : notifications.map(n => (
                <div key={n.id} className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 transition-all cursor-pointer group hover-card hover:bg-white hover:border-amber-400 relative overflow-hidden">
                  <div className="flex gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${n.type === 'alert' ? 'bg-rose-500 text-white' : 'bg-indigo-950 text-amber-400'}`}>
                      {n.type === 'alert' ? <AlertCircle size={24}/> : <TrendingUp size={24}/>}
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-black text-sm uppercase tracking-tight text-indigo-950 italic">{n.title}</h4>
                         <span className="text-[8px] font-black text-slate-300 uppercase">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"{n.message}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col sticky top-0 md:h-screen z-20 overflow-y-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange(ViewState.LANDING)}>
            <div className="bg-gradient-to-br from-indigo-800 to-indigo-950 p-2.5 rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform">
              <Sparkles size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-indigo-950 uppercase italic">FuturePath</h1>
          </div>
          <button 
            onClick={() => setShowNotifications(true)}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-2xl text-amber-600 relative transition-all active:scale-95 shadow-sm"
          >
            <Bell size={22} />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Strategy</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              disabled={activeView === ViewState.ONBOARDING}
              className={`w-full flex items-center justify-between gap-3 px-5 py-3 rounded-[2rem] transition-all text-[11px] font-black uppercase tracking-widest ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-indigo-800 to-indigo-950 text-white shadow-2xl'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-indigo-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={activeView === item.id ? 'text-amber-400' : ''} />
                {item.label}
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 bg-amber-400 text-indigo-950 text-[8px] font-black rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
                {activeView === item.id && <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"></div>}
              </div>
            </button>
          ))}

          <div className="pt-6">
            <p className="px-5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ecosystem</p>
            {secondaryNav.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-[2rem] transition-all text-[11px] font-black uppercase tracking-widest ${
                  activeView === item.id ? 'bg-slate-100 text-indigo-950' : 'text-slate-500 hover:text-indigo-900 hover:bg-slate-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 space-y-4">
          <button
            onClick={() => onViewChange(ViewState.PROFILE)}
            disabled={activeView === ViewState.ONBOARDING}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-[2rem] transition-all text-xs font-black uppercase tracking-widest ${
              activeView === ViewState.PROFILE
                ? 'bg-slate-100 text-indigo-950'
                : 'text-slate-400 hover:text-indigo-950 hover:bg-slate-50'
            }`}
          >
            <Settings size={20} />
            Profile Settings
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative bg-[#fffdf5]">
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative mb-8">
              <div className="w-32 h-32 border-[8px] border-slate-100 rounded-full"></div>
              <div className="w-32 h-32 border-[8px] border-transparent border-t-amber-500 rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-amber-500 animate-pulse" size={48} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-indigo-950 tracking-tighter uppercase italic text-center">Synthesizing Signals</h3>
          </div>
        )}
        <div className="p-6 md:p-14 max-w-7xl mx-auto min-h-screen text-indigo-950">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
