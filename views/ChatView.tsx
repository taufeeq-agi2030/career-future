
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { chatWithMentor } from '../services/geminiService';
import { Send, User, Bot, Sparkles } from 'lucide-react';

interface ChatViewProps {
  profile: UserProfile;
}

const ChatView: React.FC<ChatViewProps> = ({ profile }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: `Hello! I'm your FuturePath Advisor. I've analyzed your profile as a ${profile.role}. I understand you have some concerns about ${profile.fears.toLowerCase() || 'the future'}. How can I support you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    try {
      const response = await chatWithMentor(userMsg, profile, []);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now. Let's try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 ${
                msg.role === 'user' ? 'bg-indigo-950 border-indigo-950 text-white' : 'bg-white border-slate-200 text-indigo-950 shadow-sm'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-6 rounded-3xl text-sm font-medium leading-relaxed italic ${
                msg.role === 'user' 
                  ? 'bg-amber-400 text-indigo-950 rounded-tr-none shadow-md border border-amber-500/20' 
                  : 'bg-white border border-slate-200 text-indigo-950 shadow-sm rounded-tl-none'
              }`}>
                "{msg.text}"
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                <Bot size={20} className="text-slate-400" />
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-indigo-950 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-950 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-indigo-950 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-6 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ask about specific certifications, market shifts, or career advice..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-indigo-950 px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-4 bg-indigo-950 text-white rounded-2xl hover:bg-indigo-900 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setInput("What are the best free courses for AI literacy?")}
            className="text-[10px] font-black text-slate-500 px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 hover:text-indigo-950 transition-colors uppercase tracking-widest"
          >
            <Sparkles size={12} className="inline mr-2 text-amber-500" /> Best AI courses?
          </button>
          <button 
             onClick={() => setInput("How should I talk to my manager about upskilling?")}
             className="text-[10px] font-black text-slate-500 px-4 py-2 border border-slate-100 rounded-xl hover:bg-slate-50 hover:text-indigo-950 transition-colors uppercase tracking-widest"
          >
             <Sparkles size={12} className="inline mr-2 text-amber-500" /> Talking to manager?
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
