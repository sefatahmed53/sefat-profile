/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Globe, CheckCircle2, User, ArrowUpRight, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { ProfileInfo, ContactSubmission } from '../types';

interface ContactFormProps {
  profile: ProfileInfo;
  onContactSubmit: (submission: Omit<ContactSubmission, 'id' | 'date' | 'isRead'>) => void;
}

export default function ContactForm({ profile, onContactSubmit }: ContactFormProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setError('Please provide Name, Email, and message.');
      return;
    }

    onContactSubmit({
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      subject: subject.trim() || 'General Inquiry',
      message: message.trim(),
    });

    setSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-transparent" id="contact">
      <div className="mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#00E5FF]/5 px-3 py-1.5 text-xs font-mono font-bold text-[#00E5FF] mb-4 border border-[#00E5FF]/20">
            <Mail className="h-3.5 w-3.5 animate-pulse" />
            <span>Co-Operations & Project Leads</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-white sm:text-4xl" id="contact-section-title">
            Get In Touch
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm">
            Interested in fintech automations, financial databases, or custom user interfaces? Fill out the inquiry form or reach out directly.
          </p>
        </div>

        {/* Action Content Grid */}
        <div className="grid gap-12 lg:grid-cols-5 items-stretch">
          {/* Sefat Profile Card Left */}
          <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#111827]/30 backdrop-blur-md p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-[#0A0A0A] border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00E5FF] ring-2 ring-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white tracking-tight">{profile.name}</h3>
                  <p className="text-[11px] font-mono font-semibold text-[#00E5FF]/80">{profile.title}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-850 text-xs text-zinc-405 font-mono">
                <div className="flex items-center space-x-3.5">
                  <Mail className="h-4.5 w-4.5 text-[#00E5FF]" />
                  <a href={`mailto:${profile.email}`} className="text-zinc-300 hover:text-white transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3.5">
                  <Phone className="h-4.5 w-4.5 text-[#00E5FF]" />
                  <a href={`tel:${profile.phone}`} className="text-zinc-300 hover:text-white transition-colors">
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3.5">
                  <MapPin className="h-4.5 w-4.5 text-[#7C4DFF]" />
                  <span className="text-zinc-300">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <Globe className="h-4.5 w-4.5 text-[#00E5FF]" />
                  <a
                    href={`https://${profile.googleSiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-zinc-300 transition-colors flex items-center gap-1 font-bold"
                  >
                    <span>Portfolio Site Link</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Site directory highlighting */}
            <div className="mt-8 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/10 p-5 space-y-3">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Google Site Portfolio</span>
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Browse academic credentials, extra certifications, and university assets directly on Sefat's public directory:
              </p>
              <a
                href={`https://${profile.googleSiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center space-x-1.5 rounded-lg bg-[#0A0A0A] border border-zinc-800 px-3.5 py-2.5 text-xs text-zinc-305 font-mono font-bold hover:border-[#00E5FF]/40 hover:text-white transition-all text-center"
              >
                <span>sites.google.com/diu.edu.bd/sefat1</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            {/* WhatsApp Quick Connect */}
            <div className="mt-4 rounded-xl bg-green-500/10 border border-green-500/20 p-5 space-y-3">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-green-500 flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Connect via WhatsApp</span>
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Reach out for quick discussions, project inquiries, or business collaborations:
              </p>
              <a
                href="https://wa.me/+8801625732526?text=Hi%20Sefat%2C%20I%20would%20like%20to%20connect%20with%20you%20regarding%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center space-x-1.5 rounded-lg bg-green-900/30 border border-green-500/40 px-3.5 py-2.5 text-xs text-green-400 font-mono font-bold hover:border-green-400 hover:text-white transition-all text-center"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>+88 0162 573 2526</span>
              </a>
            </div>
          </div>

          {/* Contact Input Form Right */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-800 bg-[#111827]/40 backdrop-blur-md p-6 sm:p-8" id="contact-input-panel">
              {submitted ? (
                <div className="text-center py-16" id="contact-success-state">
                  <CheckCircle2 className="h-12 w-12 text-[#00E5FF] mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-display font-extrabold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-xs text-zinc-405 font-mono max-w-sm mx-auto leading-relaxed">
                    Sefat has received your corporate transmission. He generally responds within 12 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" id="contact-mailing-form">
                  {error && (
                    <div className="rounded-xl bg-red-950/40 border border-red-900/40 p-3.5 text-xs text-red-400 font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-4.5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2 font-semibold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] p-3 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                        id="contact-input-sendername"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2 font-semibold">Corporate Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. manager@firm.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] p-3 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                        id="contact-input-senderemail"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 font-semibold">Message Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Consultancy / Portfolio Design Proposal"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] p-3 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                      id="contact-input-subject"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 font-semibold">Inquiry Description *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Explicitly describe your business challenge, timeline specifications, or interface parameters..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-[#0A0A0A] p-3 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
                      id="contact-input-description"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex w-full sm:w-auto items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-black transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
                      id="contact-form-btn"
                    >
                      <span>Transmit Mailing Inquiry</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
