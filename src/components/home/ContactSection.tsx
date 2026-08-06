'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    technologies: ['Salesforce Administrator'],
    message: '',
    consent: true,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    
    try {
      const payload = new URLSearchParams();
      payload.append('oid', '00D5g00000FD5Sr');
      payload.append('retURL', 'https://bsquare-solutions.vercel.app/');
      payload.append('last_name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      
      formData.technologies.forEach(course => {
        payload.append('00Nfw00000Gnah3', course);
      });
      
      if (formData.message) {
        payload.append('description', formData.message);
      }
      
      payload.append('lead_source', 'Web');
      payload.append('recordType', '0125g000002LdEx');

      await fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      });

      setStatus('success');
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        phone: '',
        message: ''
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Connect With Our Advisory Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Get in Touch with BSquare
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Have questions regarding upcoming batches, course curriculum, or corporate training? Send us a message or request an instant callback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            {!mounted ? (
              <div className="h-[450px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#0086F8]" />
              </div>
            ) : status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Thank you <span className="font-bold text-[#0086F8]">{formData.name}</span>. An academic advisor from BSquare Solutions will call you within 2 business hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-[#0086F8] text-white font-semibold rounded-xl text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
                  Send Enquiry or Request Callback
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div suppressHydrationWarning>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-lpignore="true"
                      data-1p-ignore="true"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                    />
                  </div>
                  <div suppressHydrationWarning>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      data-lpignore="true"
                      data-1p-ignore="true"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                    />
                  </div>
                </div>

                <div suppressHydrationWarning>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-lpignore="true"
                    data-1p-ignore="true"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Interested Technology / Course
                  </label>
                  <select
                    multiple
                    size={4}
                    value={formData.technologies}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({ ...formData, technologies: selected });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                  >
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="Salesforce Administrator (ADM-201)">Salesforce Administrator (ADM-201)</option>
                    <option value="Salesforce Administrator (ADM-201) + Internship">Salesforce Administrator (ADM-201) + Internship</option>
                    <option value="Platform App Builder (CRT-801)">Platform App Builder (CRT-801)</option>
                    <option value="Platform App Builder (CRT-801) + Internship">Platform App Builder (CRT-801) + Internship</option>
                    <option value="Platform Developer I (Apex & Visualforce)">Platform Developer I (Apex & Visualforce)</option>
                    <option value="Platform Developer I (Apex & Visualforce) + Internship">Platform Developer I (Apex & Visualforce) + Internship</option>
                    <option value="Lightning Web Components (LWC) & Modern JS">Lightning Web Components (LWC) & Modern JS</option>
                    <option value="Lightning Web Components (LWC) & Modern JS + Internship">Lightning Web Components (LWC) & Modern JS + Internship</option>
                    <option value="Power BI Complete Masterclass (PL-300)">Power BI Complete Masterclass (PL-300)</option>
                    <option value="Power BI Complete Masterclass (PL-300) + Internship">Power BI Complete Masterclass (PL-300) + Internship</option>
                    <option value="Microsoft Fabric & Advanced DAX Engineering">Microsoft Fabric & Advanced DAX Engineering</option>
                    <option value="Microsoft Fabric & Advanced DAX Engineering + Internship">Microsoft Fabric & Advanced DAX Engineering + Internship</option>
                    <option value="Tableau Desktop & Server Master Class">Tableau Desktop & Server Master Class</option>
                    <option value="Tableau Desktop & Server Master Class + Internship">Tableau Desktop & Server Master Class + Internship</option>
                    <option value="Business & Data Analytics Career Bootcamp">Business & Data Analytics Career Bootcamp</option>
                    <option value="Business & Data Analytics Career Bootcamp + Internship">Business & Data Analytics Career Bootcamp + Internship</option>
                    <option value="PMP Certification & Professional Scrum Master (PSM I)">PMP Certification & Professional Scrum Master (PSM I)</option>
                    <option value="PMP Certification & Professional Scrum Master (PSM I) + Internship">PMP Certification & Professional Scrum Master (PSM I) + Internship</option>
                  </select>
                </div>

                <div suppressHydrationWarning>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Your Message / Specific Query
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ask about batch timings, fees, placement support..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-lpignore="true"
                    data-1p-ignore="true"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="rounded text-[#0086F8]"
                  />
                  <label htmlFor="contact-consent" className="text-xs text-slate-500">
                    I agree to be contacted by BSquare academic advisors regarding my enquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Enquiry Now
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Office Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                Direct Contact Channels
              </h3>

              <div className="space-y-3 text-xs">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Instant WhatsApp Chat</div>
                      <div className="text-slate-500">Chat live with an admissions advisor</div>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">Chat Now →</span>
                </a>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#0086F8]" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Phone Support</div>
                    <div className="text-slate-600 dark:text-slate-400 font-semibold">+91 98765 43210</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Email Address</div>
                    <div className="text-slate-600 dark:text-slate-400 font-semibold">info@bsquare.co.in</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Location Map Mock Card */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900 dark:text-white text-base">
                <MapPin className="w-5 h-5 text-[#0086F8]" /> Campus & Training Location
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                BSquare Technology Campus, Corporate Tower, Technology Hub, India
              </p>
              
              {/* Visual Map Frame Mock */}
              <div className="w-full h-40 rounded-2xl bg-slate-900/80 border border-slate-800 relative flex items-center justify-center text-slate-400 text-xs overflow-hidden">
                <div className="absolute inset-0 bg-hero-glow opacity-40 pointer-events-none" />
                <div className="text-center space-y-1 relative z-10">
                  <MapPin className="w-8 h-8 text-[#0086F8] mx-auto animate-bounce" />
                  <span className="font-bold text-white block">BSquare Solutions Campus</span>
                  <span className="text-[10px] text-slate-400">Interactive Location Map</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
