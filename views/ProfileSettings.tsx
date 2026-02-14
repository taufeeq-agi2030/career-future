
import React, { useState, useMemo } from 'react';
import { UserProfile, ViewState } from '../types';
import { bsi } from '../services/backendService';
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  Mail,
  Lock,
  History as HistoryIcon,
  CheckCircle2,
  Briefcase,
  Layers,
  Trash2,
  Plus,
  AlertCircle,
  Save,
  ChevronDown,
  Zap,
  Globe,
  Download,
  AlertTriangle,
  X
} from 'lucide-react';

const Loader2 = ({ size, className }: { size: number, className: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

interface ProfileSettingsProps {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
}

type SettingsTab = 'IDENTITY' | 'SKILLS' | 'SECURITY' | 'SUBSCRIPTION';

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, setProfile }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('IDENTITY');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Calculate profile completeness for the UI
  const completeness = useMemo(() => {
    const fields = [profile.name, profile.email, profile.role, profile.industry];
    const filled = fields.filter(f => !!f).length;
    const skillsWeight = profile.skills.length > 5 ? 1 : profile.skills.length / 5;
    return Math.round(((filled / fields.length) * 0.7 + skillsWeight * 0.3) * 100);
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await bsi.saveRecord('profiles', profile, 'MEMBER');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  const navItems = [
    { id: 'IDENTITY', label: 'Identity Protocol', icon: User },
    { id: 'SKILLS', label: 'Skill Matrix', icon: Layers },
    { id: 'SECURITY', label: 'Security & Alerts', icon: Shield },
    { id: 'SUBSCRIPTION', label: 'Subscription Hub', icon: CreditCard },
  ];

  return (
    <div className="space-y-12 animate-in fade-in pb-20 max-w-6xl mx-auto text-indigo-950">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
            <Settings size={14} /> Control Center v1.2
          </div>
          <h2 className="text-5xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Account <span className="text-amber-600">Strategy</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
            Managing Core Vector: {profile.role || 'Unspecified Entity'}
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Profile Integrity</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-indigo-600 transition-all duration-1000" 
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <span className="text-sm font-black italic">{completeness}%</span>
            </div>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top">
              <CheckCircle2 size={14} /> Matrix Updated
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Tab Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as SettingsTab)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl transition-all hover-card ${
                activeTab === item.id 
                  ? 'bg-indigo-950 text-amber-400 font-black shadow-2xl scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest">
                <item.icon size={18} className={activeTab === item.id ? 'text-amber-400' : 'text-slate-400'} />
                {item.label}
              </div>
              <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
          
          <div className="pt-10 space-y-2">
            <button className="w-full flex items-center gap-4 px-6 py-4 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 rounded-3xl transition-all group">
              <Download size={18} />
              Export My Data
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('FP_SESSION');
                window.location.reload();
              }}
              className="w-full flex items-center gap-4 px-6 py-4 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-3xl transition-all group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Terminate Link
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeTab === 'IDENTITY' && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="bg-white p-10 md:p-12 rounded-[4rem] border-2 border-slate-100 shadow-sm space-y-10">
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                  <div className="w-28 h-28 rounded-[3rem] bg-indigo-50 border-4 border-white shadow-2xl flex items-center justify-center text-indigo-900 relative group">
                    <User size={48} />
                    <div className="absolute inset-0 bg-indigo-900/40 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                       <Zap size={24} className="text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-2 italic">Entity Information</h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">Core Strategic Profile</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Professional Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        value={profile.name || ''} 
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="Verified Entity Name"
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950 italic" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Communication Protocol</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="email" 
                        value={profile.email || ''} 
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="identity@futurepath.ai"
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950 italic" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Strategic Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        value={profile.role} 
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950 italic" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Market Industry</label>
                    <div className="relative">
                      <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        value={profile.industry} 
                        onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950 italic" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex justify-between items-center border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold italic max-w-xs uppercase leading-relaxed">
                    Identity changes trigger a re-synthesis of your career discovery report.
                  </p>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-12 py-5 bg-indigo-950 text-amber-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-xl flex items-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Apply Vector Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'SKILLS' && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-sm space-y-12">
                <header className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter italic mb-2 leading-none">Capability Matrix</h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic leading-relaxed max-w-md">
                      These competencies fuel your AI Resilience score and peer benchmarking.
                    </p>
                  </div>
                  <div className="px-6 py-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-[10px] font-black uppercase flex items-center gap-2">
                    <Zap size={14} /> {profile.skills.length} Active Nodes
                  </div>
                </header>

                <div className="space-y-10">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Layers className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="Inject new competency vector..."
                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950 italic"
                      />
                    </div>
                    <button 
                      onClick={addSkill}
                      className="px-10 bg-indigo-950 text-amber-400 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-900 transition-all flex items-center gap-3 shadow-xl"
                    >
                      <Plus size={18} /> Inject
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 min-h-[150px] p-10 bg-indigo-50/50 border-2 border-dashed border-indigo-100 rounded-[3rem]">
                    {profile.skills.map(skill => (
                      <div key={skill} className="px-6 py-4 bg-white border-2 border-indigo-100 rounded-3xl flex items-center gap-4 hover-card group animate-in zoom-in">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-amber-500 group-hover:scale-150 transition-all" />
                        <span className="text-[11px] font-black text-indigo-950 uppercase tracking-widest italic">{skill}</span>
                        <button onClick={() => removeSkill(skill)} className="text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {profile.skills.length === 0 && (
                       <div className="w-full flex flex-col items-center justify-center py-10 opacity-30">
                         <Layers size={48} className="mb-4" />
                         <p className="font-black uppercase tracking-widest text-[10px]">No skills mapped in matrix</p>
                       </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 border-b-[16px] border-indigo-600 shadow-2xl">
                   <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-amber-400 border border-white/20 shadow-inner">
                      <Zap size={40} className="animate-pulse" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-xl font-black uppercase italic mb-2 leading-none">Intelligence ROI</h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
                        "Your current skill-to-market alignment is 88%. Adding 'Agentic Logic' would increase your Path B salary ceiling by $12k/year."
                      </p>
                   </div>
                   <button 
                    onClick={handleSave}
                    className="px-10 py-5 bg-white text-indigo-950 rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                   >
                     Update Matrix
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'SECURITY' && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-sm">
                <h3 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter italic mb-12 leading-none">Security Protocol</h3>
                
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">New Access Protocol</label>
                       <div className="relative">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                         <input type="password" placeholder="••••••••••••" className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none font-bold shadow-inner" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Confirm Protocol</label>
                       <div className="relative">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                         <input type="password" placeholder="••••••••••••" className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none font-bold shadow-inner" />
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase italic max-w-xs leading-relaxed">
                      Password must be minimum 12 characters with at least one high-entropy symbol.
                    </p>
                    <button className="px-10 py-5 bg-indigo-950 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-xl">
                      Update Secure Key
                    </button>
                  </div>
                </div>

                <div className="mt-20 space-y-12 border-t-2 border-slate-100 pt-16">
                   <header className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                        <Bell size={28} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black uppercase italic tracking-tighter text-indigo-950 leading-none mb-1">Intelligence Alerts</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Trigger Preferences</p>
                      </div>
                   </header>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { id: 'risk', label: 'Displacement Vectors', checked: true, desc: 'Immediate notification when a task becomes 80%+ automatable.' },
                        { id: 'pivot', label: 'Market Pivot Signals', checked: true, desc: 'Alerts for emerging job titles matching your specific matrix.' },
                        { id: 'voice', label: 'Reflection Pulse', checked: false, desc: 'Gentle nudges to maintain your neural growth logging cycle.' },
                        { id: 'mentor', label: 'Strategist Comms', checked: true, desc: 'Direct encrypted messaging from matched industry veterans.' }
                      ].map((pref, i) => (
                        <div key={pref.id} className="flex items-start justify-between p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 hover:border-indigo-200 transition-all group">
                           <div className="flex-1 pr-6">
                              <p className="text-sm font-black text-indigo-950 uppercase italic leading-none mb-3 group-hover:text-indigo-600 transition-colors">{pref.label}</p>
                              <p className="text-[10px] text-slate-400 font-bold italic leading-relaxed">{pref.desc}</p>
                           </div>
                           <label className="relative inline-flex items-center cursor-pointer mt-1">
                              <input type="checkbox" className="sr-only peer" defaultChecked={pref.checked} />
                              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-950 shadow-inner"></div>
                           </label>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="mt-16 p-8 bg-rose-50 border-2 border-rose-100 rounded-[3rem] flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h5 className="text-lg font-black text-rose-900 uppercase italic tracking-tighter leading-none mb-1">Destructive Action</h5>
                        <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">This will erase all 5-year forecasts</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="px-8 py-4 bg-white border-2 border-rose-200 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                   >
                     Terminate Account
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'SUBSCRIPTION' && (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="bg-indigo-950 p-12 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-3xl border-b-[20px] border-indigo-900">
                 <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Sparkles size={280} /></div>
                 <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
                       <div className="space-y-6">
                          <div className="px-5 py-2 bg-amber-400 text-indigo-950 text-[10px] font-black uppercase rounded-xl mb-4 inline-block shadow-lg">Active Resiliency Level</div>
                          <h3 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-2 text-white">Evolution <span className="text-amber-400">Pro</span></h3>
                          <div className="flex items-center gap-3 text-indigo-300 font-bold uppercase tracking-widest text-[10px]">
                            <HistoryIcon size={14} /> Next Synthesis Cycle: Oct 12, 2024
                          </div>
                       </div>
                       <div className="text-right p-8 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md">
                          <p className="text-[9px] font-black text-amber-400 uppercase tracking-[0.4em] mb-3">Subscription Fee</p>
                          <p className="text-6xl font-black italic tracking-tighter">$19<span className="text-xl opacity-40 ml-1">/mo</span></p>
                          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-4 flex items-center justify-end gap-2">
                             <CheckCircle2 size={14} /> Matrix Connected
                          </p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-white/10">
                       <div className="space-y-6">
                          <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Active Plan Directives</p>
                          <div className="grid grid-cols-1 gap-4">
                             {[
                               "Unlimited Neural Voice Reflections",
                               "Real-time Google Search Grounding",
                               "Advanced AI-Displacement Radar",
                               "Priority Strategist Mentorship (S-Tier)"
                             ].map((f, i) => (
                               <div key={i} className="flex items-center gap-4 group">
                                  <div className="w-6 h-6 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                     <CheckCircle2 size={14} className="text-amber-400" />
                                  </div>
                                  <span className="text-xs font-bold text-indigo-100 tracking-tight">{f}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                       <div className="flex flex-col justify-end gap-4">
                          <button className="w-full py-6 bg-amber-400 text-indigo-950 rounded-[2.5rem] font-black text-sm uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-amber-400/20">
                            Upgrade to Team Strategy
                          </button>
                          <button className="w-full py-4 bg-transparent border-2 border-white/20 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                            Manage Billing & Cancellation
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-sm">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                   <HistoryIcon size={24} className="text-indigo-600" /> Transactional Log
                 </h4>
                 
                 <div className="space-y-4">
                    {[
                      { id: '#FP-8821-X', date: 'Sept 12, 2024', status: 'SYNCHRONIZED', amount: '$19.00', card: '•••• 4242' },
                      { id: '#FP-7712-A', date: 'Aug 12, 2024', status: 'SYNCHRONIZED', amount: '$19.00', card: '•••• 4242' },
                      { id: '#FP-6604-B', date: 'July 12, 2024', status: 'SYNCHRONIZED', amount: '$19.00', card: '•••• 4242' }
                    ].map((inv, i) => (
                      <div key={i} className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100 group hover:border-indigo-200 transition-all">
                         <div className="flex items-center gap-8">
                            <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm">
                               <CreditCard size={24} />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-indigo-950 uppercase italic leading-none mb-2">{inv.id}</span>
                               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.date} • {inv.card}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-10">
                            <div className="text-right">
                               <p className="text-lg font-black text-indigo-950 italic leading-none mb-2">{inv.amount}</p>
                               <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">{inv.status}</p>
                            </div>
                            <button className="p-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-950 hover:border-indigo-950 transition-all shadow-sm">
                               <Download size={20} />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md" onClick={() => setShowDeleteModal(false)}></div>
           <div className="relative w-full max-w-lg bg-white rounded-[4rem] p-12 shadow-3xl border-4 border-rose-100 text-center animate-in zoom-in">
              <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl">
                 <AlertTriangle size={48} />
              </div>
              <h3 className="text-4xl font-black uppercase italic tracking-tighter text-indigo-950 mb-6">Terminate Account?</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed italic mb-12">
                "This action is permanent. You will lose your Human-Alpha history, all 90-day action plans, and current mentor synchronization."
              </p>
              <div className="flex flex-col gap-4">
                 <button className="w-full py-6 bg-rose-600 text-white rounded-[2.5rem] font-black uppercase text-xs tracking-widest hover:bg-rose-700 transition-all shadow-2xl">
                    Final Termination Protocol
                 </button>
                 <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-5 bg-slate-50 text-slate-400 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:text-indigo-950 transition-all"
                 >
                    Abort and Maintain Integrity
                 </button>
              </div>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-8 right-8 p-3 text-slate-300 hover:text-indigo-950 transition-colors"
              >
                <X size={24} />
              </button>
           </div>
        </div>
      )}

      {/* Privacy Guard Footer */}
      <div className="bg-white border-2 border-indigo-100 p-16 rounded-[5rem] flex flex-col md:flex-row items-center gap-16 shadow-sm hover-card">
        <div className="w-32 h-32 bg-indigo-50 rounded-[3rem] flex items-center justify-center text-indigo-600 border-2 border-indigo-200 shrink-0 shadow-inner">
           <Shield size={64} />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h4 className="text-3xl font-black uppercase italic tracking-tighter text-indigo-950 mb-4 leading-none">Intelligence Privacy Guard</h4>
           <p className="text-slate-500 text-lg font-medium leading-relaxed italic max-w-3xl">
             "Your strategic reflections and diagnostic data are secured via AES-256 encryption. We strictly enforce a policy where individual professional matrices are never used to train global LLM models."
           </p>
        </div>
        <div className="flex flex-col items-center gap-4">
           <div className="px-8 py-4 bg-indigo-950 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
              <Zap size={16} className="text-amber-400" /> Neural Shield Active
           </div>
           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Protocol v4.0.2</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
