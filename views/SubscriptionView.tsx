
import React from 'react';
import { SubscriptionTier } from '../types';
import { Check, Zap, Rocket, Building, ShieldCheck, Star } from 'lucide-react';

interface SubscriptionViewProps {
  currentTier: SubscriptionTier;
  onUpgrade: (tier: SubscriptionTier) => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ currentTier, onUpgrade }) => {
  const tiers = [
    {
      id: 'Free',
      name: 'Discovery',
      price: '$0',
      description: 'Foundational intelligence for early stage pivots.',
      features: ['15 Voice Reflections/mo', 'Basic Dashboard', 'Standard Market Scanning', 'Community Support'],
      cta: 'Current Plan',
      accent: 'border-slate-200',
      icon: Zap
    },
    {
      id: 'Pro',
      name: 'Evolution',
      price: '$19',
      description: 'Advanced orchestration for the proactive professional.',
      features: ['Unlimited Reflections', '2 Deep Assessments/mo', 'Google Search Grounding', 'Priority Mentor Match', 'AI Collab Indexing'],
      cta: 'Accelerate Now',
      accent: 'border-indigo-300 bg-indigo-50/50',
      icon: Star,
      popular: true
    },
    {
      id: 'Team',
      name: 'Strategic',
      price: '$200',
      description: 'Departmental alignment for agile groups.',
      features: ['Up to 12 Entities', 'Peer Benchmarking', 'Shared Innovation Tracker', 'Manager Visibility', 'Quarterly Strategy PDF'],
      cta: 'Sync Team',
      accent: 'border-blue-300 bg-blue-50/50',
      icon: Rocket
    },
    {
      id: 'Organization',
      name: 'Neural',
      price: 'Custom',
      description: 'Full-scale resilience for high-growth firms.',
      features: ['Unlimited Scale', 'Custom Risk Models', 'Private AI Instance', 'HR Protocol Integration', 'Dedicated Strategist'],
      cta: 'Contact Sales',
      accent: 'border-amber-300 bg-amber-50/50',
      icon: Building
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 animate-in fade-in duration-700">
      <header className="text-center mb-20">
        <h2 className="text-6xl font-black text-indigo-950 uppercase italic tracking-tighter leading-none mb-6">Evolution <span className="text-amber-600">Tiers</span></h2>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[11px] max-w-2xl mx-auto leading-relaxed">Scaling Your Professional Intelligence Infrastructure</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tiers.map((tier) => (
          <div key={tier.id} className={`glass-card p-12 rounded-[4rem] border flex flex-col transition-all hover:scale-[1.03] relative bg-white ${tier.accent}`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-400 text-indigo-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                Strategic Choice
              </div>
            )}
            
            <div className="mb-10">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8">
                <tier.icon size={28} />
              </div>
              <h3 className="text-3xl font-black text-indigo-950 uppercase italic leading-none mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4 text-indigo-950">
                <span className="text-4xl font-black">{tier.price}</span>
                {tier.id !== 'Organization' && <span className="text-slate-500 font-bold uppercase text-[10px]">/mo</span>}
              </div>
              <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{tier.description}</p>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {tier.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onUpgrade(tier.id as SubscriptionTier)}
              disabled={currentTier === tier.id}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                tier.popular 
                  ? 'bg-amber-400 text-indigo-950 shadow-2xl shadow-amber-400/20 hover:bg-amber-500' 
                  : currentTier === tier.id ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-indigo-950 text-white hover:bg-indigo-800'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 glass-card p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 border-slate-200 bg-white shadow-sm">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
               <ShieldCheck size={32} />
            </div>
            <div>
               <h4 className="text-xl font-black uppercase italic text-indigo-950">Security Protocol</h4>
               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Enterprise-Grade Neural Privacy Guaranteed</p>
            </div>
         </div>
         <p className="text-slate-500 text-xs italic font-medium max-w-sm">All plans include our <span className="text-amber-600 font-bold">Neural Data Shield</span>. We do not use your strategic reflections to train public models.</p>
      </div>
    </div>
  );
};

export default SubscriptionView;
