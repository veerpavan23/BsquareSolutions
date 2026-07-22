'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Format: country code + number (e.g., 919876543210)
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '919876543210', // Default BSquare Business Number
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: "Hello! Welcome to BSquare Technology Academy. 👋\n\nHow can we help you jumpstart your career in Salesforce, Analytics, or AI today?",
      time: 'Just now',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, chatHistory]);

  if (!mounted) return null;

  // Pre-configured Quick Reply Queries
  const quickReplies = [
    "I want to enquire about Salesforce batches",
    "Interested in Power BI / Tableau training",
    "Tell me about placements & certification prep",
    "Request fee details & course duration"
  ];

  const handleQuickReply = (reply: string) => {
    // Add user message to local chat interface
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...chatHistory,
      { sender: 'user' as const, text: reply, time: userTime }
    ];
    setChatHistory(updatedHistory);

    // Auto-respond with a hand-off message and open WhatsApp
    setTimeout(() => {
      const agentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatHistory([
        ...updatedHistory,
        {
          sender: 'agent' as const,
          text: "Perfect! Connecting you to our admissions desk on WhatsApp to share the details instantly...",
          time: agentTime
        }
      ]);

      // Redirect to WhatsApp with pre-filled message
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(reply)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const query = messageText.trim();
    setMessageText('');

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedHistory = [
      ...chatHistory,
      { sender: 'user' as const, text: query, time: userTime }
    ];
    setChatHistory(updatedHistory);

    // Simulate Agent Hand-off message
    setTimeout(() => {
      const agentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatHistory([
        ...updatedHistory,
        {
          sender: 'agent' as const,
          text: "Linking your query to our active admissions advisor on WhatsApp now...",
          time: agentTime
        }
      ]);

      // Open WhatsApp link in new tab
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(query)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3">
      
      {/* 1. Embedded In-Browser Chat Window Console */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[460px] bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in z-50">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Agent Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm text-white border border-white/30">
                  BS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0086F8] rounded-full animate-pulse" />
              </div>
              
              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm">BSquare Academic Desk</h4>
                <p className="text-[10px] text-cyan-100 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-[#00C2FF]" /> Online | Typically replies instantly
                </p>
              </div>
            </div>
            
            {/* Close */}
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
            {chatHistory.map((chat, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`px-3 py-2 text-xs rounded-2xl whitespace-pre-line shadow-sm leading-relaxed ${
                    chat.sender === 'user'
                      ? 'bg-[#0086F8] text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  {chat.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1">{chat.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          {chatHistory.length === 1 && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto shrink-0">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(reply)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-[#0086F8] border border-slate-200 dark:border-slate-800 text-[10px] font-bold rounded-full transition-all text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Footer Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask us anything..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-grow px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-xs font-medium"
            />
            <button
              type="submit"
              className="p-2 bg-[#0086F8] hover:bg-blue-600 text-white rounded-xl transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 2. Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Chat with BSquare Support"
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105"
        >
          {/* Animated rings for engagement */}
          <span className="absolute -inset-1 bg-emerald-500/35 rounded-full animate-ping pointer-events-none opacity-75" />
          <span className="absolute -inset-2 bg-emerald-500/15 rounded-full animate-pulse pointer-events-none" />

          {/* Icon */}
          <MessageCircle className="w-7 h-7 fill-white" />
        </button>
      )}
    </div>
  );
};
