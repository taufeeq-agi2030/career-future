import React, { useState } from 'react';
import { AIRole, ViewState } from '../types';
import { 
  Rocket, 
  ArrowRight, 
  Cpu, 
  Terminal, 
  Users, 
  ShieldCheck, 
  BrainCircuit, 
  Target, 
  Zap, 
  Scale, 
  HeartHandshake, 
  BarChart3,
  Briefcase,
  Sparkles,
  Info,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  RefreshCw,
  Activity,
  Award,
  DollarSign,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';

const ROLES_DATA: AIRole[] = [
  // 1. AI Operations
  {
    id: "prompt-eng",
    name: "Prompt Engineer",
    category: "AI Operations",
    evolvesFrom: "Administrative Clerks / Drafting Assistants",
    description: "The architect of model communication, translating high-level business requirements into precise technical instructions for large language models.",
    salaryBenchmark: "$120k - $250k",
    resilienceScore: 88,
    responsibilities: [
      "Develop complex multi-shot prompt templates for specific enterprise tasks",
      "Benchmark model responses for accuracy, safety, and cultural nuance",
      "Optimize token usage to reduce operational costs for high-volume agents"
    ],
    skills: { 
      technical: ["LLM Logic", "Token Optimization", "Chain-of-Thought Design"], 
      human: ["Semantic Precision", "Linguistic Creativity", "Systemic Reasoning"] 
    },
    learningPath: [
      { step: "Master DAIR.AI Prompt Engineering Guide", resource: "DAIR.AI GitHub" },
      { step: "Complete Advanced LLM Specialization", resource: "DeepLearning.AI" }
    ],
    quizQuestions: [
      { question: "What is 'Few-Shot' prompting?", options: ["The fastest model response", "Providing examples within the prompt", "Reducing cost by using fewer tokens"], correctIndex: 1 },
      { question: "Which technique forces a model to explain its reasoning?", options: ["Zero-shot", "Chain-of-thought", "Prompt Injection"], correctIndex: 1 },
      { question: "What is a 'System Instruction'?", options: ["A hardware manual", "A base persona/behavior guide", "A code comment"], correctIndex: 1 }
    ]
  },
  {
    id: "ai-va-mgr",
    name: "AI Virtual Assistant Manager",
    category: "AI Operations",
    evolvesFrom: "Executive Assistants / Office Managers",
    description: "Orchestrates complex ecosystems of autonomous AI agents to manage corporate logistics, research, and high-frequency communication.",
    salaryBenchmark: "$95k - $145k",
    resilienceScore: 82,
    responsibilities: [
      "Configure agent-to-agent workflow protocols (e.g., Zapier Central)",
      "Resolve logical conflicts between autonomous assistants",
      "Maintain high-level executive scheduling through predictive analysis"
    ],
    skills: { 
      technical: ["Zapier Central", "Microsoft Copilot Studio", "Agent Orchestration"], 
      human: ["Strategic Logistics", "Conflict Curation", "Executive Presence"] 
    },
    learningPath: [
      { step: "Certified AI Automation Strategist", resource: "Automation Guild" }
    ],
    quizQuestions: [
      { question: "How does an AI Manager resolve agent loops?", options: ["Manual override", "Asking the AI to stop", "Rebooting the server"], correctIndex: 0 }
    ]
  },
  {
    id: "wf-auto-arch",
    name: "Workflow Automation Architect",
    category: "AI Operations",
    evolvesFrom: "Ops Analysts / Process Mappers",
    description: "Replaces traditional manual process mapping by designing self-healing, AI-driven automation loops for standard office repetitive tasks.",
    salaryBenchmark: "$130k - $195k",
    resilienceScore: 94,
    responsibilities: [
      "Identify high-ROI task nodes for displacement",
      "Design autonomous loops using RPA and Generative AI",
      "Perform weekly efficiency audits on automated pipelines"
    ],
    skills: { 
      technical: ["Make.com", "RPA Tools", "Python Automation"], 
      human: ["Systems Thinking", "Process Intuition", "Holistic Vision"] 
    },
    learningPath: [
      { step: "Advanced Workflow Design Certification", resource: "Make.com Academy" }
    ],
    quizQuestions: []
  },
  {
    id: "ai-data-labeler",
    name: "AI Data Annotator",
    category: "AI Operations",
    evolvesFrom: "Data Entry Clerks",
    description: "Curates and verifies 'ground truth' data used for fine-tuning proprietary enterprise models, ensuring high-quality training sets.",
    salaryBenchmark: "$65k - $95k",
    resilienceScore: 65,
    responsibilities: [
      "Verify bias in synthetic training datasets",
      "Label proprietary data for fine-tuning models",
      "Document edge-case failures for model developers"
    ],
    skills: { 
      technical: ["Labelbox", "Dataset Curation", "Fine-tuning Basics"], 
      human: ["High Attention to Detail", "Ethical Vigilance", "Accuracy"] 
    },
    learningPath: [], quizQuestions: []
  },
  // 2. AI Strategy
  {
    id: "ai-content-strat",
    name: "AI Content Strategist",
    category: "AI Strategy",
    evolvesFrom: "Junior Copywriters / Content Marketers",
    description: "Directs AI content generation tools to maintain brand authority and emotional resonance across high-frequency digital channels.",
    salaryBenchmark: "$85k - $160k",
    resilienceScore: 78,
    responsibilities: [
      "Calibrate AI brand voices for cross-platform consistency",
      "Manage synthetic asset libraries for rapid deployment",
      "Human-in-the-loop editing for cultural nuance and empathy"
    ],
    skills: { 
      technical: ["Jasper", "Copy.ai", "SGE SEO"], 
      human: ["Brand Intuition", "Empathetic Curation", "Storytelling"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "geo-spec",
    name: "GEO Specialist",
    category: "AI Strategy",
    evolvesFrom: "SEO Specialists",
    description: "The next evolution of SEO, optimizing content specifically for the Generative Search Experience (SGE) used by AI-native engines.",
    salaryBenchmark: "$115k - $175k",
    resilienceScore: 91,
    responsibilities: [
      "Map content to AI retrieval-augmented generation patterns",
      "Establish semantic authority nodes for brand topics",
      "Monitor SGE performance and citation frequency"
    ],
    skills: { 
      technical: ["Semantic Markup", "SGE Analytics", "RAG Logic"], 
      human: ["Market Foresight", "Intent Logic", "Analytical Depth"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-creative-dir",
    name: "AI Creative Director",
    category: "AI Strategy",
    evolvesFrom: "Art Directors / Junior Designers",
    description: "Orchestrates generative visual and video models to execute complex aesthetic visions that AI cannot conceive without direction.",
    salaryBenchmark: "$155k - $290k",
    resilienceScore: 96,
    responsibilities: [
      "Design multi-tool generative art pipelines",
      "Synthesize large-scale conceptual campaigns",
      "Audit AI-generated assets for intellectual property compliance"
    ],
    skills: { 
      technical: ["Midjourney", "Runway Gen-3", "ComfyUI"], 
      human: ["Conceptual Synthesis", "Aesthetic Curation", "Design Leadership"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "synth-media-mgr",
    name: "Synthetic Media Manager",
    category: "AI Strategy",
    evolvesFrom: "Social Media Managers",
    description: "Oversees the lifecycle of AI-generated avatars and virtual influencers, managing deepfake ethics and interactive digital clones.",
    salaryBenchmark: "$95k - $165k",
    resilienceScore: 84,
    responsibilities: [
      "Design interactive personas for virtual ambassadors",
      "Manage real-time synthetic customer responses",
      "Ensure compliance with synthetic disclosure laws"
    ],
    skills: { 
      technical: ["HeyGen", "Synthesia", "Deepfake Ethics"], 
      human: ["Persona Consistency", "Brand Safety", "Crisis Mgmt"] 
    },
    learningPath: [], quizQuestions: []
  },
  // 3. AI Interaction
  {
    id: "human-ai-designer",
    name: "Human-AI Interaction Designer",
    category: "AI Interaction",
    evolvesFrom: "UI/UX Designers",
    description: "Focuses on the friction points between human intuition and machine output, designing seamless agentic interfaces.",
    salaryBenchmark: "$145k - $225k",
    resilienceScore: 90,
    responsibilities: [
      "Map multi-modal conversational interfaces",
      "Optimize handoff protocols between AI and Human agents",
      "Design intuitive status displays for autonomous processes"
    ],
    skills: { 
      technical: ["Voice UI Design", "Context Mapping", "Figma AI"], 
      human: ["Cognitive Psychology", "Interaction Intuition", "UX empathy"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-conv-designer",
    name: "AI Conversation Designer",
    category: "AI Interaction",
    evolvesFrom: "Script-writers / Call Center Managers",
    description: "Architects the logic of dialogue systems, ensuring machine conversations feel helpful, natural, and goal-oriented.",
    salaryBenchmark: "$110k - $185k",
    resilienceScore: 85,
    responsibilities: [
      "Map complex dialogue trees and edge-case logic",
      "Implement sentiment-adaptive machine responses",
      "Benchmark conversational helpfulness metrics"
    ],
    skills: { 
      technical: ["NLP Principles", "Dialogue Logic", "Linguistics"], 
      human: ["Dialogic Empathy", "Logic Design", "Clarity"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-escalation-off",
    name: "AI Escalation Officer",
    category: "AI Interaction",
    evolvesFrom: "Tier 3 Support / Customer Success",
    description: "The 'High-Empathy' layer handling the 5% of complex cases that autonomous bots fail to resolve effectively.",
    salaryBenchmark: "$85k - $140k",
    resilienceScore: 98,
    responsibilities: [
      "Resolve emotionally charged high-stakes customer conflicts",
      "Provide feedback loops to developers on agent failure modes",
      "Maintain human accountability for autonomous decision-making"
    ],
    skills: { 
      technical: ["CRM Logic", "Agent Failure Logs"], 
      human: ["Extreme Empathy", "Critical Decision Making", "Patience"] 
    },
    learningPath: [], quizQuestions: []
  },
  // 4. AI Governance
  {
    id: "ai-ethicist",
    name: "AI Ethicist",
    category: "AI Governance",
    evolvesFrom: "Compliance Officers / Policy Analysts",
    description: "Ensures AI systems operate fairly, transparently, and in alignment with societal and organizational values.",
    salaryBenchmark: "$155k - $300k",
    resilienceScore: 97,
    responsibilities: [
      "Audit algorithms for harmful gender/racial bias",
      "Draft enterprise transparency and safety protocols",
      "Liaise with regulators on autonomous system compliance"
    ],
    skills: { 
      technical: ["Bias Auditing", "Explainability (XAI)", "Policy Docs"], 
      human: ["Moral Philosophy", "Ethical Judgment", "Strategic Integrity"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "legal-ai-validator",
    name: "Legal AI Validator",
    category: "AI Governance",
    evolvesFrom: "Junior Paralegals / Document Reviewers",
    description: "Verifies the accuracy of AI-summarized legal briefs and contracts, ensuring zero 'hallucinations' in critical filings.",
    salaryBenchmark: "$105k - $175k",
    resilienceScore: 89,
    responsibilities: [
      "Cross-verify AI legal citations against primary statutes",
      "Audit automated contract risk assessments",
      "Manage AI-assisted evidence discovery protocols"
    ],
    skills: { 
      technical: ["Legal LLMs (Harvey)", "Citation Checking"], 
      human: ["High Detail Precision", "Liability Judgment", "Legal Logic"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-fin-analyst",
    name: "AI Financial Forensics Analyst",
    category: "AI Governance",
    evolvesFrom: "Manual Bookkeepers / Staff Accountants",
    description: "Uses specialized models to detect patterns of fraud and anomaly in massive financial datasets in real-time.",
    salaryBenchmark: "$125k - $220k",
    resilienceScore: 87,
    responsibilities: [
      "Tune anomaly detection models for sector-specific fraud",
      "Investigate high-priority machine-detected red flags",
      "Audit automated tax and compliance filing systems"
    ],
    skills: { 
      technical: ["Fin-AI Models", "Pattern Recognition", "Python"], 
      human: ["Investigative Intuition", "Accountability", "Ethical Scepticism"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "algo-risk-mgr",
    name: "Algorithmic Risk Manager",
    category: "AI Governance",
    evolvesFrom: "Credit Analysts / Risk Management",
    description: "Focuses on preventing systemic failures in autonomous trading, lending, and insurance models.",
    salaryBenchmark: "$145k - $260k",
    resilienceScore: 93,
    responsibilities: [
      "Design stress tests for autonomous risk models",
      "Map cascading failure vectors in agentic loops",
      "Maintain algorithmic 'Circuit Breakers'"
    ],
    skills: { 
      technical: ["Quantitative Modeling", "Simulation", "Stress Testing"], 
      human: ["Strategic Pessimism", "Risk Logic", "Governance Mindset"] 
    },
    learningPath: [], quizQuestions: []
  },
  // 5. AI Infrastructure
  {
    id: "ai-impl-spec",
    name: "AI Implementation Specialist",
    category: "AI Infrastructure",
    evolvesFrom: "IT Support / Implementation Consultants",
    description: "Guides organizations through the physical integration of AI toolchains into legacy business software.",
    salaryBenchmark: "$120k - $210k",
    resilienceScore: 91,
    responsibilities: [
      "Migrate legacy databases to AI-compatible vector formats",
      "Coach departments on tool adoption and prompt workflows",
      "Perform internal tool-security audits"
    ],
    skills: { 
      technical: ["API Integration", "SaaS Ops", "Legacy Migration"], 
      human: ["Change Management", "Coaching", "Complex Problem Solving"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "fwd-engineer",
    name: "Forward-Deployed Engineer",
    category: "AI Infrastructure",
    evolvesFrom: "Software Developers",
    description: "On-site specialists who adapt generalized frontier models to a company's unique, non-public proprietary data.",
    salaryBenchmark: "$185k - $375k",
    resilienceScore: 95,
    responsibilities: [
      "Fine-tune local models on proprietary datasets",
      "Engineer local data-privacy safeguards",
      "Optimize model inference for unique on-prem hardware"
    ],
    skills: { 
      technical: ["MLOps", "Model Fine-tuning", "Data Architecture"], 
      human: ["Deep Collaboration", "Client Empathy", "Technical Clarity"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-rel-engineer",
    name: "AI Reliability Engineer (MLOps)",
    category: "AI Infrastructure",
    evolvesFrom: "System Administrators",
    description: "The 'Ops' layer of AI, ensuring models remain fast, accurate, and stable under enterprise production loads.",
    salaryBenchmark: "$150k - $275k",
    resilienceScore: 92,
    responsibilities: [
      "Monitor models for 'semantic drift' and accuracy loss",
      "Automate model re-training and deployment triggers",
      "Minimize inference latency for real-time applications"
    ],
    skills: { 
      technical: ["Kubernetes", "PyTorch", "Monitoring Stacks"], 
      human: ["Operational Vigilance", "Reliability Mindset", "Detail"] 
    },
    learningPath: [], quizQuestions: []
  },
  // 6. Professional Services
  {
    id: "health-tech-spec",
    name: "Health Tech Implementation Specialist",
    category: "Healthcare / Education",
    evolvesFrom: "Medical Admins / Radiology Techs",
    description: "Bridges the clinical-technical gap, ensuring AI diagnostics are usable, accurate, and patient-centric in hospital settings.",
    salaryBenchmark: "$105k - $185k",
    resilienceScore: 94,
    responsibilities: [
      "Audit machine-generated diagnostic summaries for accuracy",
      "Map clinical workflows to AI radiology and lab tools",
      "Ensure patient data privacy across AI networks"
    ],
    skills: { 
      technical: ["Medical-NLP", "EHR Sync", "Health Data Privacy"], 
      human: ["Patient Advocacy", "Medical Ethics", "Clinical Insight"] 
    },
    learningPath: [], quizQuestions: []
  },
  {
    id: "ai-lit-trainer",
    name: "AI Literacy Trainer",
    category: "Healthcare / Education",
    evolvesFrom: "Teachers / Corporate Educators",
    description: "Empowers the workforce by teaching the mental frameworks and technical skills required to thrive in automated environments.",
    salaryBenchmark: "$90k - $160k",
    resilienceScore: 88,
    responsibilities: [
      "Architect department-wide upskilling curriculums",
      "Deliver high-impact prompt engineering workshops",
      "Manage the psychological transition to agentic workflows"
    ],
    skills: { 
      technical: ["Multi-model Mastery", "Prompt Benchmarking", "LMS"], 
      human: ["Pedagogical Design", "Psychological Safety", "Encouragement"] 
    },
    learningPath: [], quizQuestions: []
  }
];

const EvolutionRadarView: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<AIRole | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleAnswer = (idx: number) => {
    const nextAnswers = [...quizAnswers, idx];
    setQuizAnswers(nextAnswers);
    
    if (selectedRole && quizStep < selectedRole.quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate score
      const correct = nextAnswers.reduce((acc, ans, i) => 
        ans === selectedRole?.quizQuestions[i].correctIndex ? acc + 1 : acc, 0
      );
      setQuizScore(Math.round((correct / (selectedRole?.quizQuestions.length || 1)) * 100));
      setQuizActive(false);
    }
  };

  const renderRoleDetail = (role: AIRole) => (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 pb-20">
      <button 
        onClick={() => { setSelectedRole(null); setQuizActive(false); setQuizScore(null); setQuizStep(0); setQuizAnswers([]); }}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all mb-8"
      >
        <ChevronLeft size={16} /> Back to Hub Explorer
      </button>

      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Rocket size={14} /> 2026 Strategic Target
          </div>
          <h2 className="text-7xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none mb-6">
            {role.name}
          </h2>
          <p className="text-slate-500 text-2xl font-medium leading-relaxed italic border-l-4 border-amber-400 pl-8">
            "{role.description}"
          </p>
        </div>
        <div className="bg-indigo-950 p-10 rounded-[3.5rem] text-white shadow-3xl text-right min-w-[320px] relative overflow-hidden group hover-card">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><DollarSign size={160} /></div>
           <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-2">Projected Value 2026</span>
           <span className="text-5xl font-black italic text-amber-400 leading-none">{role.salaryBenchmark}</span>
           <div className="mt-6 flex items-center justify-end gap-2 text-emerald-400">
             <TrendingUp size={18} />
             <span className="text-[11px] font-black uppercase tracking-widest">High-Alpha Path</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
           {/* Lineage Transition */}
           <div className="p-12 bg-white rounded-[4rem] border-2 border-slate-100 shadow-xl relative overflow-hidden group hover-card">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform"><RefreshCw size={200} /></div>
              <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-2"><ArrowRight size={14}/> Career Evolution Bridge</h3>
              <div className="flex flex-col md:flex-row items-center gap-12">
                 <div className="flex-1 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 opacity-60 relative">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Traditional Lineage</p>
                    <p className="text-2xl font-black text-slate-600 line-through italic uppercase leading-tight">{role.evolvesFrom}</p>
                 </div>
                 <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-xl animate-pulse shrink-0">
                    <ArrowRight size={32} className="text-indigo-950" />
                 </div>
                 <div className="flex-1 p-10 bg-indigo-950 rounded-[3rem] text-white shadow-2xl scale-105 border-2 border-indigo-900">
                    <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest mb-3">2026 Evolution</p>
                    <p className="text-3xl font-black italic uppercase tracking-tighter text-amber-400 leading-tight">{role.name}</p>
                 </div>
              </div>
           </div>

           {/* Core Spec */}
           <div className="bg-white p-14 rounded-[4.5rem] border-2 border-slate-100 shadow-xl hover-card">
              <h3 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-12">Strategic Responsibilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {role.responsibilities.map((r, i) => (
                  <div key={i} className="flex gap-5 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:border-indigo-200 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={20} className="text-indigo-600" /></div>
                    <p className="text-base font-bold text-slate-700 italic leading-snug">"{r}"</p>
                  </div>
                ))}
              </div>
           </div>

           {/* Learning Hub & Resources */}
           <div className="bg-white p-14 rounded-[4.5rem] border-2 border-slate-100 shadow-xl hover-card">
              <h3 className="text-[12px] font-black text-amber-600 uppercase tracking-[0.5em] mb-12">Curated Upskilling Path</h3>
              <div className="space-y-6">
                {role.learningPath.length > 0 ? role.learningPath.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-amber-50 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-amber-400 group-hover:text-white transition-all">
                           <BookOpen size={24} />
                        </div>
                        <div>
                           <p className="font-black text-indigo-950 text-sm uppercase tracking-tight italic leading-none mb-1">{item.step}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source: {item.resource}</p>
                        </div>
                     </div>
                     <ExternalLink size={20} className="text-slate-300 group-hover:text-amber-600 transition-colors cursor-pointer" />
                  </div>
                )) : (
                  <div className="p-10 text-center border-4 border-dashed border-slate-100 rounded-[3rem]">
                     <p className="text-slate-300 font-black uppercase italic tracking-widest text-[11px]">Resources Pending Synthesis...</p>
                  </div>
                )}
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-12">
           {/* Capability Specs */}
           <div className="bg-indigo-950 p-12 rounded-[4rem] text-white shadow-3xl hover-card border-b-[24px] border-indigo-900">
              <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-2"><Cpu size={14}/> Capability Requirements</h4>
              <div className="space-y-10">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block px-2">Technical Mastery</span>
                    <div className="flex flex-wrap gap-2">
                       {role.skills.technical.map(s => <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-black text-indigo-100 uppercase tracking-tight">{s}</span>)}
                    </div>
                 </div>
                 <div className="space-y-4 pt-10 border-t border-white/10">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block px-2">Human Alpha Focus</span>
                    <div className="flex flex-wrap gap-2">
                       {role.skills.human.map(s => <span key={s} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] font-black text-emerald-400 uppercase italic tracking-tight">{s}</span>)}
                    </div>
                 </div>
              </div>
           </div>

           {/* Fit Diagnostic Quiz */}
           <div className="bg-amber-400 p-12 rounded-[4rem] text-indigo-950 shadow-2xl relative overflow-hidden group hover-card">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform"><BrainCircuit size={200} /></div>
              <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-6">Am I a Good Fit?</h4>
              
              {quizScore !== null ? (
                <div className="space-y-8 animate-in zoom-in duration-300">
                   <div className="text-center">
                      <div className="text-6xl font-black italic text-indigo-950 mb-2">{quizScore}%</div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Compatibility Rank</p>
                   </div>
                   <p className="text-lg font-black italic mb-10 opacity-80 leading-relaxed border-l-4 border-indigo-950/20 pl-8">
                     "{quizScore >= 80 ? "Strategic Alignment Verified. You demonstrate natural resonance for this evolutionary trajectory." : quizScore >= 50 ? "Emerging Potential detected. Bridge your technical gaps to increase path stability." : "Vulnerable Entry. Significant upskilling required before initiating this transition."}"
                   </p>
                   <button 
                     onClick={() => { setQuizScore(null); setQuizActive(false); setQuizStep(0); setQuizAnswers([]); }}
                     className="w-full py-6 bg-indigo-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-4"
                   >
                     <RefreshCw size={20}/> Re-Calibrate Signal
                   </button>
                </div>
              ) : quizActive ? (
                <div className="space-y-8 animate-in zoom-in duration-300 relative z-10">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                      <span>Node {quizStep + 1} / {role.quizQuestions.length}</span>
                      <span>Calibration Pulse</span>
                   </div>
                   <p className="text-xl font-black leading-tight uppercase italic">{role.quizQuestions[quizStep].question}</p>
                   <div className="space-y-3">
                      {role.quizQuestions[quizStep].options.map((opt, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleAnswer(i)}
                          className="w-full text-left p-5 bg-white/40 border border-white/60 rounded-2xl text-xs font-black uppercase hover:bg-white transition-all shadow-sm active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <p className="text-xl font-black italic mb-12 opacity-80 leading-relaxed border-l-4 border-indigo-950/20 pl-8">
                    "Benchmark your intuitive resonance for this role before beginning the 90-day transition roadmap."
                  </p>
                  <button 
                    disabled={role.quizQuestions.length === 0}
                    onClick={() => setQuizActive(true)}
                    className="w-full py-6 bg-indigo-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {role.quizQuestions.length > 0 ? "Establish Lab Baseline" : "Diagnostics Pending"}
                  </button>
                </div>
              )}
           </div>

           {/* Peer Intelligence / Case Study */}
           <div className="bg-indigo-50 p-10 rounded-[4rem] border border-indigo-100 shadow-sm hover-card">
              <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                 <Star size={18} /> Success Signal
              </h4>
              <p className="text-xs font-bold text-indigo-900 leading-relaxed italic mb-4">
                "Alex (Marketing Manager) transitioned to AI Content Strategist in 4 months. By orchestrating agentic copy audits, his departmental output increased by 400% while reducing manual hours by 85%."
              </p>
              <div className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                 <Award size={14} /> Verified Case Study 2024.11
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 text-indigo-950">
      {selectedRole ? (
        renderRoleDetail(selectedRole)
      ) : (
        <>
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-200 pb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-50 border-2 border-amber-200 text-amber-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] mb-4 shadow-sm">
                 <Target size={14} /> Strategic Horizon 2026
              </div>
              <h2 className="text-7xl font-black text-indigo-950 tracking-tighter uppercase italic leading-none">Evolution <span className="text-amber-600">Hub</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] flex items-center gap-3">
                 <BarChart3 size={18} className="text-indigo-600" /> Mapping 20 Career Pivots for the Agentic Era
              </p>
            </div>
            <div className="bg-indigo-950 text-white p-10 rounded-[3.5rem] shadow-3xl flex items-center gap-10 border-b-[16px] border-indigo-900 group hover-card">
               <div className="text-right">
                  <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Market Impact</span>
                  <span className="text-5xl font-black italic">~300M</span>
                  <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mt-2">Jobs Evolving into "Assist & Replace" Roles</p>
               </div>
               <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                  <Zap size={32} className="text-amber-400 animate-pulse" />
               </div>
            </div>
          </header>

          {/* Role Categories Grid */}
          <div className="space-y-24">
            {["AI Operations", "AI Strategy", "AI Interaction", "AI Governance", "AI Infrastructure", "Healthcare / Education"].map((cat, i) => (
              <section key={cat} className="space-y-12 animate-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-8 px-6">
                  <div className="w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-2xl bg-indigo-950 transition-transform hover:rotate-6">
                    {i === 0 ? <Terminal /> : i === 1 ? <Sparkles /> : i === 2 ? <MessageSquare /> : i === 3 ? <Scale /> : i === 4 ? <Cpu /> : <Users />}
                  </div>
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter text-indigo-950">{cat}</h3>
                  <div className="flex-grow h-1.5 bg-gradient-to-r from-slate-100 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {ROLES_DATA.filter(r => r.category.includes(cat.split(' ')[0])).map((role) => (
                    <div 
                      key={role.id} 
                      onClick={() => setSelectedRole(role)}
                      className="bg-white p-12 rounded-[4.5rem] border-2 border-slate-100 shadow-sm hover:shadow-3xl hover:border-indigo-300 transition-all flex flex-col justify-between group hover-card cursor-pointer relative overflow-hidden"
                    >
                       <div className="absolute top-0 left-0 w-full h-2.5 bg-slate-50 group-hover:bg-amber-400 transition-colors"></div>
                       <div>
                          <div className="mb-10 flex justify-between items-start">
                             <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-inner">Future Role</div>
                             <span className="text-slate-200 group-hover:text-indigo-600 group-hover:scale-125 transition-all"><ExternalLink size={24} /></span>
                          </div>
                          <h4 className="text-3xl font-black text-indigo-950 uppercase italic tracking-tighter leading-[1.1] mb-6 group-hover:text-indigo-600 transition-colors">
                            {role.name}
                          </h4>
                          <div className="p-5 bg-slate-50 rounded-3xl mb-10 border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                               <Briefcase size={12} /> Evolutionary Path
                             </p>
                             <p className="text-xs font-black text-slate-600 uppercase italic opacity-60 line-through leading-tight">
                               From {role.evolvesFrom.split(' / ')[0]}
                             </p>
                          </div>
                       </div>

                       <div className="space-y-6 pt-6 border-t border-slate-50">
                          <div className="flex justify-between items-end">
                             <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Market Resilience</span>
                                <div className="text-2xl font-black italic text-emerald-600">{role.resilienceScore}%</div>
                             </div>
                             <div className="text-right">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">ROI Potential</span>
                                <span className="text-xs font-black text-indigo-950 uppercase italic px-3 py-1 bg-indigo-50 rounded-lg">High</span>
                             </div>
                          </div>
                          <button className="w-full py-5 bg-indigo-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 group-hover:bg-indigo-900">
                             Launch Diagnostic <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Strategic Call to Action */}
          <div className="bg-white border-4 border-indigo-100 p-24 rounded-[6rem] text-indigo-950 relative overflow-hidden shadow-sm hover-card mt-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 text-indigo-600 font-black text-[12px] uppercase tracking-[0.6em] mb-12">
                  <Activity size={24} /> Neural Transition Protocol
                </div>
                <h3 className="text-7xl font-black tracking-tighter mb-10 italic leading-none uppercase text-indigo-950">Scale Your <span className="text-amber-600">Alpha Value</span></h3>
                <p className="text-slate-500 text-3xl font-medium leading-relaxed italic mb-16 max-w-4xl border-l-8 border-amber-400 pl-12">
                  "The fastest entry points are Prompt Engineering and AI Ethics. The most resilient long-term positions are in AI Infrastructure. Don't wait for displacement—begin your transition protocol today."
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="bg-slate-50 p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-inner group hover:border-indigo-300 transition-all min-w-[300px]">
                    <span className="text-[11px] font-black uppercase text-indigo-400 block mb-4 tracking-widest">Immediate Entry</span>
                    <span className="text-3xl font-black text-indigo-950 italic uppercase">Strategy & Ethics <TrendingUp size={24} className="inline text-emerald-500 ml-3" /></span>
                  </div>
                  <div className="bg-slate-50 p-10 rounded-[3.5rem] border-2 border-slate-100 shadow-inner group hover:border-indigo-300 transition-all min-w-[300px]">
                    <span className="text-[11px] font-black uppercase text-indigo-400 block mb-4 tracking-widest">Resilience Peak</span>
                    <span className="text-3xl font-black text-indigo-950 italic uppercase">Infrastructure <ShieldCheck size={24} className="inline text-indigo-600 ml-3" /></span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex justify-center">
                 <div className="w-80 h-80 bg-indigo-950 rounded-[5rem] flex flex-col items-center justify-center text-center p-12 border-4 border-indigo-900 shadow-4xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-amber-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <BrainCircuit size={100} className="text-amber-400 mb-10 animate-float" />
                    <span className="text-[12px] font-black text-indigo-300 uppercase tracking-[0.5em] mb-4 leading-none">Synergy Matrix</span>
                    <span className="text-4xl font-black uppercase italic text-white leading-tight tracking-tighter">Strategic<br/>Alignment</span>
                 </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EvolutionRadarView;