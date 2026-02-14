import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ViewState, VoiceReflectionAnalysis } from '../types';
import { VoiceReflectionService, SessionTypes } from '../services/voiceReflectionService';
import { bsi } from '../services/backendService';
import { 
  Mic, StopCircle, Sparkles, Activity, BrainCircuit, Target, 
  ChevronRight, MessageCircle, ShieldCheck, 
  CheckCircle2, RotateCcw, Zap, Scale,
  Edit3, Send, Loader2, RefreshCw, History, Calendar, TrendingUp
} from 'lucide-react';

interface VoiceReflectionViewProps {
  profile: UserProfile;
  onViewChange: (view: ViewState) => void;
}

enum ReflectionStep {
  IDLE = 'IDLE',
  HISTORY = 'HISTORY',
  RECORDING = 'RECORDING',
  TRANSCRIBING = 'TRANSCRIBING',
  VERIFYING = 'VERIFYING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED'
}

const VoiceReflectionView: React.FC<VoiceReflectionViewProps> = ({ profile, onViewChange }) => {
  const [step, setStep] = useState<ReflectionStep>(ReflectionStep.IDLE);
  const [sessionType, setSessionType] = useState(SessionTypes.FREE_FORM);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState<VoiceReflectionAnalysis | null>(null);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [history, setHistory] = useState<VoiceReflectionAnalysis[]>([]);
  
  const timerRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const records = await bsi.getOwnRecords('reflections', profile.userId, 'MEMBER');
    setHistory(records);
  };

  useEffect(() => {
    if (step === ReflectionStep.RECORDING) {
      timerRef.current = window.setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [step]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        setStep(ReflectionStep.TRANSCRIBING);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          const text = await VoiceReflectionService.transcribeAudio(base64Audio, 'audio/webm');
          setTranscript(text);
          setStep(ReflectionStep.VERIFYING);
        };
      };
      mediaRecorder.start();
      setStep(ReflectionStep.RECORDING);
    } catch (err) {
      alert("Microphone link failed. Check permissions.");
    }
  };

  const stopRecording = () => mediaRecorderRef.current?.stop();

  const runAnalysis = async () => {
    setStep(ReflectionStep.ANALYZING);
    try {
      const result = await VoiceReflectionService.analyzeReflection(transcript, profile, history);
      setAnalysis(result);
      await bsi.saveRecord('reflections', result, 'MEMBER');
      
      const updatedHistory = [...history, result];
      const snapshot = VoiceReflectionService.calculateGrowthSnapshot(updatedHistory);
      const updatedProfile = { ...profile, personalitySnapshot: snapshot };
      await bsi.saveRecord('profiles', updatedProfile, 'MEMBER');
      
      setHistory(updatedHistory);
      setStep(ReflectionStep.COMPLETED);
    } catch (e) {
      setStep(ReflectionStep.VERIFYING);
    }
  };

  const syncPlanUpdate = () => {
    setIsUpdatingPlan(true);
    setTimeout(() => {
      setIsUpdatingPlan(false);
      onViewChange(ViewState.ACTION_PLAN);
    }, 1500);
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  if (step === ReflectionStep.IDLE) {
    return (
      <div className="max-w-6xl mx-auto py-12 animate-in fade-in text-indigo-950">
        <header className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Neural Growth Engine v5.0</div>
            <h2 className="text-6xl font-black text-indigo-950 uppercase italic tracking-tighter">Voice Reflection</h2>
          </div>
          <button 
            onClick={() => setStep(ReflectionStep.HISTORY)}
            className="px-8 py-4 bg-white border-2 border-slate-200 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all"
          >
            <History size={18} /> Review History
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(SessionTypes).map(([key, type]) => (
            <button
              key={type}
              onClick={() => { setSessionType(type); startRecording(); }}
              className="p-12 glass-card bg-white rounded-[4rem] hover:border-amber-400 transition-all text-left group flex flex-col justify-between h-[450px]"
            >
              <div>
                <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-indigo-900 group-hover:text-white transition-all mb-10 shadow-inner">
                  {type === 'daily_checkin' ? <Activity size={40} /> : <Sparkles size={40} />}
                </div>
                <h4 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter mb-4">{type.replace('_', ' ')}</h4>
                <p className="text-sm text-slate-500 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                  "{VoiceReflectionService.getOpeningPrompt(type)}"
                </p>
              </div>
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Establish Link</span>
                <ChevronRight size={24} className="text-slate-300 group-hover:text-amber-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === ReflectionStep.HISTORY) {
    return (
      <div className="max-w-5xl mx-auto py-12 animate-in slide-in-from-right text-indigo-950">
        <header className="flex justify-between items-center mb-16">
           <h2 className="text-5xl font-black uppercase italic tracking-tighter">Strategic History</h2>
           <button onClick={() => setStep(ReflectionStep.IDLE)} className="p-4 bg-slate-100 rounded-2xl font-black text-xs uppercase hover:bg-slate-200">Back</button>
        </header>

        <div className="space-y-6">
          {history.length === 0 ? (
            <div className="p-20 text-center glass-card rounded-[4rem] border-dashed border-2">
               <p className="text-slate-400 font-black uppercase tracking-widest">No signals logged yet.</p>
            </div>
          ) : (
            history.map((record, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row gap-10 items-center hover-card">
                 <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex flex-col items-center justify-center text-indigo-900 shadow-inner">
                    <Calendar size={24} className="mb-1" />
                    <span className="text-[10px] font-black uppercase">{new Date(record.timestamp).toLocaleDateString()}</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex gap-2 mb-3">
                       <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded uppercase">Grade: {record.refereeReport.grade}</span>
                       <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[9px] font-black rounded uppercase">Sentiment: {record.sentiment}</span>
                    </div>
                    <p className="text-lg font-black text-indigo-950 uppercase italic leading-tight mb-2 truncate">"{record.transcript}"</p>
                 </div>
                 <TrendingUp className="text-emerald-500" size={32} />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (step === ReflectionStep.RECORDING) {
    return (
      <div className="max-w-4xl mx-auto h-[75vh] flex flex-col items-center justify-center animate-in zoom-in">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 glass-card bg-white rounded-[2.5rem] mb-10 shadow-2xl">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
            <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Live Capture Active</span>
          </div>
          <h3 className="text-4xl font-black text-indigo-950 uppercase italic tracking-tighter mb-10 leading-[0.9]">
            {VoiceReflectionService.getOpeningPrompt(sessionType)}
          </h3>
          <div className="text-8xl font-black text-indigo-950 italic tracking-tighter mb-12">{formatTime(recordingTime)}</div>
          <button onClick={stopRecording} className="w-44 h-44 rounded-full bg-red-500 flex items-center justify-center shadow-xl border-4 border-white/20 hover:scale-105 transition-all">
            <StopCircle size={64} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  if (step === ReflectionStep.TRANSCRIBING || step === ReflectionStep.ANALYZING) {
    return (
      <div className="max-w-4xl mx-auto h-[75vh] flex flex-col items-center justify-center animate-in fade-in">
        <div className="relative mb-12">
           <div className="w-40 h-40 border-[10px] border-slate-100 rounded-full"></div>
           <div className="w-40 h-40 border-[10px] border-transparent border-t-amber-500 rounded-full animate-spin absolute top-0 left-0"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="text-indigo-900 animate-pulse" size={64} />
           </div>
        </div>
        <h3 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter text-center">
          {step === ReflectionStep.TRANSCRIBING ? "Neural Decoding..." : "Synthesizing Evolution..."}
        </h3>
      </div>
    );
  }

  if (step === ReflectionStep.VERIFYING) {
    return (
      <div className="max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom-8 text-indigo-950">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Signal Verification</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Confirm captured reflection</p>
        </header>

        <div className="glass-card p-12 rounded-[4rem] bg-white shadow-2xl relative">
           <textarea
             className="w-full min-h-[300px] bg-transparent border-none outline-none text-2xl font-medium italic leading-relaxed text-indigo-950 resize-none"
             value={transcript}
             onChange={(e) => setTranscript(e.target.value)}
           />
           <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
              <button onClick={() => setStep(ReflectionStep.IDLE)} className="text-slate-400 font-black text-xs uppercase">Discard</button>
              <button onClick={runAnalysis} className="px-12 py-5 bg-indigo-950 text-amber-400 rounded-[2rem] font-black text-sm uppercase flex items-center gap-4 shadow-xl">
                Start Analysis <Send size={18} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  if (analysis && step === ReflectionStep.COMPLETED) {
    return (
      <div className="max-w-7xl mx-auto py-12 animate-in fade-in space-y-12 pb-32 text-indigo-950">
        <header className="text-center mb-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full border-8 border-white shadow-2xl flex flex-col items-center justify-center -rotate-12 z-20 text-white">
             <Scale size={24} className="mb-1" />
             <span className="text-4xl font-black leading-none">{analysis.refereeReport.grade}</span>
             <span className="text-[8px] font-black uppercase">Neural Rank</span>
          </div>
          <div className="w-24 h-24 bg-indigo-900 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl hover-card"><ShieldCheck size={48} /></div>
          <h2 className="text-5xl font-black text-indigo-950 uppercase italic tracking-tighter mb-6">Strategic Re-Calibration</h2>
          <div className="bg-white/80 p-8 rounded-[3rem] border border-slate-200 max-w-2xl mx-auto italic font-bold text-slate-600">
            "{analysis.attitudeShift}"
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Detected Skills Section - NEW */}
            <div className="bg-white p-12 rounded-[4rem] border-2 border-slate-100 shadow-xl">
               <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-8">Detected Professional Capabilities</h4>
               <div className="flex flex-wrap gap-4">
                  {analysis.identifiedSkills.length > 0 ? analysis.identifiedSkills.map((skill, i) => (
                    <div key={i} className="px-6 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3 animate-in zoom-in group hover:bg-indigo-950 transition-all cursor-default">
                       <Zap size={14} className="text-amber-500 group-hover:animate-pulse" />
                       <span className="text-sm font-black uppercase italic text-indigo-950 group-hover:text-white">{skill}</span>
                    </div>
                  )) : (
                    <p className="text-slate-300 font-bold italic text-sm uppercase tracking-widest">No explicit skill extraction logged.</p>
                  )}
               </div>
            </div>

            <div className="bg-indigo-950 p-12 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group hover-card">
               <div className="absolute -bottom-10 -right-10 opacity-10"><Zap size={240} /></div>
               <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-[0.4em] mb-10">Recommended Growth Adjustment</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                  <div>
                    <span className="text-[10px] font-black text-indigo-300 uppercase block mb-2">Priority Shift</span>
                    <p className="text-2xl font-black italic uppercase leading-tight mb-6">{analysis.planAdjustment.priorityShift}</p>
                    <span className="text-[10px] font-black text-indigo-300 uppercase block mb-2">Neural Rationale</span>
                    <p className="text-sm font-medium text-indigo-100 italic leading-relaxed">"{analysis.planAdjustment.rationale}"</p>
                  </div>
                  <div className="bg-white/10 p-8 rounded-[2.5rem] border border-white/20 flex flex-col justify-between">
                    <div>
                       <span className="text-[10px] font-black text-amber-400 uppercase block mb-2">Suggested Task</span>
                       <p className="text-sm font-bold leading-relaxed italic">"{analysis.planAdjustment.suggestedTaskUpdate}"</p>
                    </div>
                    <button onClick={syncPlanUpdate} className="mt-8 w-full py-4 bg-amber-500 text-indigo-950 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl">
                      {isUpdatingPlan ? <Loader2 className="animate-spin" size={16} /> : <><RefreshCw size={14} /> Sync to Plan</>}
                    </button>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover-card">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Progress Anchors</h4>
               <div className="space-y-4">
                  {analysis.progressIndicators.map((p, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                       <CheckCircle2 size={18} className="text-emerald-600" />
                       <span className="text-xs font-black text-indigo-900 uppercase tracking-tighter">{p}</span>
                    </div>
                  ))}
               </div>
            </div>
            <button onClick={() => setStep(ReflectionStep.IDLE)} className="w-full py-6 bg-white border-2 border-slate-200 rounded-[2.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-slate-50 transition-all hover-card">
              <RotateCcw size={20} /> New reflection cycle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VoiceReflectionView;