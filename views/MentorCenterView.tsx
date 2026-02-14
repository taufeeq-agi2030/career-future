
import React, { useState } from 'react';
import { Mentor, UserProfile } from '../types';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Award, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface MentorCenterViewProps {
  mentors: Mentor[];
  profile: UserProfile;
}

const MentorCenterView: React.FC<MentorCenterViewProps> = ({ mentors, profile }) => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Mentor Matching</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-4">Connecting you with AI-Era Strategic Thinkers</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-600 uppercase shadow-sm">
           <Users size={16} className="text-indigo-600" /> Matches Found: {mentors.length}
        </div>
      </header>

      {selectedMentor ? (
        <div className="bg-indigo-50 p-16 rounded-[5rem] text-indigo-950 flex flex-col md:flex-row gap-12 items-center animate-in slide-in-from-top border-2 border-indigo-100 relative overflow-hidden shadow-sm hover-card">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
          <div className="w-48 h-48 bg-white rounded-[3rem] border-4 border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-2xl">
            <Users size={80} className="text-indigo-600" />
          </div>
          <div className="flex-1 relative z-10">
             <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-indigo-950 text-amber-400 text-[10px] font-black uppercase rounded">Top Match</div>
                <div className="text-2xl font-black italic text-indigo-950">{selectedMentor.matchScore}% Synergy</div>
             </div>
             <h3 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4 italic text-indigo-950">{selectedMentor.name}</h3>
             <p className="text-slate-600 text-xl font-bold mb-8 max-w-xl italic leading-relaxed">"{selectedMentor.bio}"</p>
             <div className="flex flex-wrap gap-4">
                {selectedMentor.availableSlots.map(slot => (
                  <button key={slot} className="px-6 py-3 bg-white hover:bg-indigo-950 hover:text-white border-2 border-indigo-100 rounded-2xl font-black text-[10px] uppercase transition-all shadow-sm">
                    {slot}
                  </button>
                ))}
             </div>
          </div>
          <button 
            onClick={() => setSelectedMentor(null)}
            className="px-10 py-5 bg-indigo-950 text-white rounded-[2rem] font-black text-sm uppercase shadow-2xl hover:scale-105 transition-all shadow-indigo-900/30"
          >
            Confirm Session
          </button>
        </div>
      ) : (
        <div className="bg-white border-2 border-slate-100 p-16 rounded-[4rem] text-indigo-950 flex flex-col md:flex-row items-center gap-12 shadow-sm hover-card">
          <div className="relative z-10 flex-1">
            <h3 className="text-4xl font-black tracking-tighter uppercase mb-4 italic">The Advisory Network</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mb-10 italic">
              "You don't just need skills; you need high-level context. Match with veterans who have navigated massive industry pivots."
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <Zap size={18} className="text-indigo-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">Live Strategy Sessions</span>
               </div>
               <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <Award size={18} className="text-emerald-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-700">Verified Credentials</span>
               </div>
            </div>
          </div>
          <div className="relative z-10 w-full md:w-1/3 p-8 bg-indigo-50 rounded-[3rem] border border-indigo-100 text-center">
             <Sparkles size={60} className="text-indigo-400 mx-auto mb-6" />
             <p className="text-xs font-black text-indigo-950 mb-6 uppercase tracking-widest leading-relaxed italic">Personalized matches updated every 48 hours based on your progress.</p>
             <button className="w-full py-4 bg-indigo-950 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-950/20">Request New Pool</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mentors.map((mentor) => (
          <div 
            key={mentor.id} 
            onClick={() => setSelectedMentor(mentor)}
            className="group bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm hover:shadow-3xl hover:border-indigo-600 transition-all cursor-pointer flex flex-col justify-between hover-card"
          >
            <div>
              <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                  <Users size={40} />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-indigo-950 leading-none mb-1 italic">{mentor.matchScore}%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Synergy</div>
                </div>
              </div>
              <h4 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-2">{mentor.name}</h4>
              <p className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 italic">{mentor.role} @ {mentor.company}</p>
              
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-10 italic">
                <p className="text-slate-500 text-sm font-bold leading-relaxed">"{mentor.bio}"</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Expertise Vector</span>
                  <span className="text-xs font-black text-indigo-950 uppercase italic">{mentor.specialty}</span>
               </div>
               <div className="w-12 h-12 bg-indigo-950 text-white rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <ArrowRight size={24} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorCenterView;
