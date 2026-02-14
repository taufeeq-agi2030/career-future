
import React, { useState } from 'react';
import { bsi } from '../services/backendService';
import { UserAuth } from '../types';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  User, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

interface AuthViewProps {
  onAuthenticated: (auth: UserAuth) => void;
}

type AuthMode = 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD';

const AuthView: React.FC<AuthViewProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recoverySent, setRecoverySent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'LOGIN') {
        const auth = await bsi.authenticate(email, password);
        onAuthenticated(auth);
      } else if (mode === 'SIGNUP') {
        const auth = await bsi.register(name, email, password);
        onAuthenticated(auth);
      } else if (mode === 'FORGOT_PASSWORD') {
        await bsi.resetPassword(email);
        setRecoverySent(true);
      }
    } catch (err: any) {
      setError(err.message || "Strategic Access Denied.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const auth = await bsi.googleAuth();
      onAuthenticated(auth);
    } catch (err: any) {
      setError("Google identity synchronization failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffdf5]">
      <div className="max-w-md w-full glass-card p-10 md:p-12 rounded-[4rem] border-slate-200 shadow-2xl animate-in zoom-in duration-500 overflow-hidden relative">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Shield size={200} />
        </div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-20 h-20 bg-indigo-950 rounded-[2.5rem] flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-xl shadow-indigo-900/10">
            {mode === 'FORGOT_PASSWORD' ? <Lock size={40} /> : <Shield size={40} />}
          </div>
          <h2 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter mb-2">
            {mode === 'LOGIN' ? 'Secure Link' : mode === 'SIGNUP' ? 'Initiate Evolution' : 'Protocol Recovery'}
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
            {mode === 'LOGIN' ? 'Verification Hub' : mode === 'SIGNUP' ? 'Registry of Professionals' : 'Strategic Identity Restoration'}
          </p>
        </div>

        {recoverySent && mode === 'FORGOT_PASSWORD' ? (
          <div className="text-center py-8 animate-in fade-in">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-indigo-950 uppercase italic mb-4">Reset Signal Sent</h3>
            <p className="text-slate-500 text-sm font-medium italic mb-8 px-4">
              A secure recovery link has been dispatched to {email}. Check your primary inbox.
            </p>
            <button 
              onClick={() => { setMode('LOGIN'); setRecoverySent(false); }}
              className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-amber-600"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {mode === 'SIGNUP' && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-900" size={18} />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950" 
                    placeholder="E.g., Aris Thorne"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-900" size={18} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950" 
                  placeholder="identity@futurepath.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {mode !== 'FORGOT_PASSWORD' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Protocol</label>
                  {mode === 'LOGIN' && (
                    <button 
                      type="button"
                      onClick={() => setMode('FORGOT_PASSWORD')}
                      className="text-[9px] font-black text-amber-600 uppercase tracking-widest hover:text-indigo-950"
                    >
                      Forgot Protocol?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-900" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-indigo-950" 
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-indigo-950 text-amber-400 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-indigo-900 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Processing Signal..." : mode === 'LOGIN' ? "Establish Secure Link" : mode === 'SIGNUP' ? "Register in Matrix" : "Request Reset"} 
              <ArrowRight size={20} />
            </button>
          </form>
        )}

        <div className="mt-8 space-y-6 relative z-10">
          {mode === 'FORGOT_PASSWORD' ? (
             <button 
              onClick={() => setMode('LOGIN')}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-950"
            >
              <ChevronLeft size={14} /> Back to Login
            </button>
          ) : (
            <>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-100"></div>
                <span className="flex-shrink mx-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-slate-100"></div>
              </div>

              <button 
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-4 bg-white border-2 border-slate-100 text-indigo-950 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-4 h-4" />
                Sync with Google Identity
              </button>

              <div className="text-center">
                <button 
                  onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                  className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-amber-600"
                >
                  {mode === 'LOGIN' ? "New Professional? Initiate Evolution" : "Already Registered? Re-Establish Link"}
                </button>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-slate-100">
             <div className="flex items-center justify-center gap-2 text-indigo-300">
               <Sparkles size={16} />
               <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Strategic Pulse Active</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
