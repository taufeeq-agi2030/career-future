
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, BrainCircuit, ShieldCheck, Target } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    role: '',
    industry: '',
    yearsExperience: 0,
    skills: [],
    fears: '',
    expectations: '',
    willingnessToPivot: 50
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = () => {
    if (currentSkill && !profile.skills.includes(currentSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, currentSkill] });
      setCurrentSkill('');
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(profile);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Design Your Future</h2>
        <p className="text-slate-500 text-lg">Help us understand where you are and where you want to go in the age of AI.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 transition-all duration-500">
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full flex-1 mx-1 ${
                s <= step ? 'bg-indigo-600' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-6">
              <BrainCircuit size={28} />
              <h3 className="text-xl font-bold">Your Current Context</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title / Role</label>
              <input
                type="text"
                placeholder="e.g. Senior Product Designer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
              <input
                type="text"
                placeholder="e.g. Fintech, Healthcare"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-6">
              <ShieldCheck size={28} />
              <h3 className="text-xl font-bold">Skills & Expertise</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Add Your Core Skills</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g. Python, UX Research"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-6">
              <Target size={28} />
              <h3 className="text-xl font-bold">Emotional Inventory</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What are your main fears about AI in your career?</label>
              <textarea
                rows={3}
                placeholder="Be honest... job security? losing creative touch?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                value={profile.fears}
                onChange={(e) => setProfile({ ...profile, fears: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What are your expectations for the next 5 years?</label>
              <textarea
                rows={3}
                placeholder="Better work-life balance? Higher pay? New roles?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                value={profile.expectations}
                onChange={(e) => setProfile({ ...profile, expectations: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 text-indigo-600 mb-6">
              <BrainCircuit size={28} />
              <h3 className="text-xl font-bold">Adaptability</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                How willing are you to completely pivot your career? ({profile.willingnessToPivot}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={profile.willingnessToPivot}
                onChange={(e) => setProfile({ ...profile, willingnessToPivot: parseInt(e.target.value) })}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Steady Course</span>
                <span>Total Transformation</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleNext}
            disabled={step === 1 && !profile.role}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            {step === 4 ? 'Generate My Path' : 'Continue'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
