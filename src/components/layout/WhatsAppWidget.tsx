'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Format: country code + number (e.g., 919876543210)
  defaultMessage?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '919876543210', // Default BSquare Business Number
  defaultMessage = "Hi BSquare, I would like to enquire about your technology training programs and upcoming batch timings.",
}) => {
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show tooltip after a short delay to grab attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Interactive Tooltip / Welcome Bubble */}
      {showTooltip && (
        <div className="pointer-events-auto max-w-xs bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl relative animate-fade-in flex flex-col gap-2">
          {/* Close button */}
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500">Admissions Online</span>
          </div>
          
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-normal pr-3">
            Have questions about fees, syllabus, or course durations? Chat live with us!
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowTooltip(false)}
            className="w-full py-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" /> Start Chat
          </a>
        </div>
      )}

      {/* Floating Pulse Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="pointer-events-auto group relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105"
      >
        {/* Glow / Pulse Rings */}
        <span className="absolute -inset-1 bg-emerald-500/35 rounded-full animate-ping pointer-events-none opacity-75" />
        <span className="absolute -inset-2 bg-emerald-500/15 rounded-full animate-pulse pointer-events-none" />

        {/* Icon */}
        <MessageCircle className="w-7 h-7 fill-white relative z-10 transition-transform group-hover:rotate-6" />

        {/* Tooltip on Hover */}
        <span className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
