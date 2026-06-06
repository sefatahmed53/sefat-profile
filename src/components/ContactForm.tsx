/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Globe, CheckCircle2, User, ArrowUpRight, HelpCircle } from 'lucide-react';
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
    }, 4000);
  };

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="contact">
      <div className="mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
            <Mail className="h-3.5 w-3.5" />
            <span>Co-Operations & Project Leads</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="contact-section-title">
            Get In Touch
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-sm">
            Interested in digital branding, custom graphics, or user interface consultations? Fill out the contact form below or reach Sefat on his Google site directory.
          </p>
        </div>

        {/* Action Content Grid */}
        <div className="grid gap-12 lg:grid-cols-5 items-stretch">
          {/* Sefat Profile Card Left */}
          <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-zinc-850 bg-zinc-900/30 p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-zinc-900 border border-indigo-500/30">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{profile.name}</h3>
                  <p className="text-xs font-mono text-zinc-500">{profile.title}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-850 text-xs text-zinc-400">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-indigo-400" />
                  <a
                    href={`https://${profile.googleSiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 font-semibold"
                  >
                    <span>Corporate Google Site</span>
                    <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Site directory highlighting */}
            <div className="mt-8 rounded-xl bg-indigo-400/5 border border-indigo-500/10 p-5 space-y-3">
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Verify Google Directory</span>
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                You can browse further course materials, academic portfolios, and certification files directly on Sefat Ahmed's Google site:
              </p>
              <a
                href={`https://${profile.googleSiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center space-x-1 rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-300 font-semibold hover:border-zinc-700 hover:text-white transition-all text-center"
              >
                <span>sites.google.com/diu.edu.bd/sefat1</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Contact Input Form Right */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/10 p-6 sm:p-8" id="contact-input-panel">
              {submitted ? (
                <div className="text-center py-16" id="contact-success-state">
                  <CheckCircle2 className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-white mb-2">Message Saved Offline!</h3>
                  <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your inquiries are fully stored in the portfolio CMS inbox. Sefat can view your message dynamically using the CMS admin tab!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="contact-main-form">
                  {error && (
                    <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3 text-xs text-red-500">
                      {error}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 font-semibold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Miller"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                        id="contact-input-name"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 font-semibold">Email Account *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. david@agency.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                        id="contact-input-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 font-semibold">Subject / Objective</label>
                    <input
                      type="text"
                      placeholder="e.g. UI Redesign Consultation"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                      id="contact-input-subject"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 font-semibold">What is Sefat building for you? *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail your operational timelines, platform target (iOS/Android/Web), approximate budgets, or request file audits..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 resize-none"
                      id="contact-input-message"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="group flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3.5 text-xs font-bold text-white transition-colors w-full sm:w-auto cursor-pointer"
                      id="contact-submit-btn"
                    >
                      <span>Send Dynamic Message</span>
                      <Send className="h-3.5 w-3.5 text-white transition-transform group-hover:translate-y-0.5 group-hover:-translate-y-0.5" />
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
