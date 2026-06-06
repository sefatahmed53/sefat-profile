/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Calendar, BadgeCheck, Eye, X } from 'lucide-react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-transparent" id="certifications">
      <div className="mx-auto max-w-7xl">
        {/* Title Group */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-[#7C4DFF]/5 px-3 py-1.5 text-xs font-mono font-bold text-[#7C4DFF] mb-4 border border-[#7C4DFF]/20">
            <Award className="h-3.5 w-3.5" />
            <span>Professional Credentials</span>
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight text-white sm:text-4xl" id="certifications-section-title">
            Certifications & Training
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-xs sm:text-sm">
            Dynamically updated credentials verifying professional competency in corporate systems, fintech designs, and marketing analytics portfolios.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2" id="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-zinc-850 bg-[#111827]/40 backdrop-blur-sm p-5 gap-5 hover:border-[#00E5FF]/30 hover:bg-[#111827]/75 transition-all duration-300"
              id={`cert-layout-card-${cert.id}`}
            >
              {/* Left Side: Thumbnail Preview */}
              <div className="relative w-full md:w-44 h-32 rounded-xl overflow-hidden bg-[#0A0A0A] border border-zinc-800 flex-shrink-0 flex items-center justify-center group/img">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
                {/* Blur Hover Action */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center space-x-2.5">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-2.5 rounded-lg bg-[#00E5FF] text-black hover:scale-105 transition-transform cursor-pointer"
                    title="View Credential Image"
                  >
                    <Eye className="h-4.5 w-4.5 font-bold" />
                  </button>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-[#111827] border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#00E5FF]/40 cursor-pointer"
                    title="Verify Credential Link"
                  >
                    <ExternalLink className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>

              {/* Right Side: Credential Details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-zinc-500">
                      <Calendar className="h-3 w-3 text-[#7C4DFF]" />
                      {cert.issueDate}
                    </span>
                    <span className="flex items-center text-[9px] font-bold font-mono text-[#00E5FF] bg-[#00E5FF]/5 border border-[#00E5FF]/20 px-2 py-0.5 rounded">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                  <h3 className="text-base font-display font-extrabold text-white tracking-tight group-hover:text-[#00E5FF] transition-colors duration-200">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400">
                    Issued by {cert.issuer}
                  </p>
                  {cert.description && (
                    <p className="text-[11px] text-zinc-550 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Verification Action */}
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-550 uppercase">Secured ID Hash</span>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors"
                  >
                    <span>Verification Credentials</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty fallback status */}
        {certifications.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-805 rounded-2xl">
            <Award className="h-8 w-8 mx-auto text-zinc-650 mb-3 animate-pulse" />
            <p className="text-xs text-zinc-500 font-medium">No professional certifications provided yet.</p>
          </div>
        )}

        {/* Image Modal Preview */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              id="cert-image-modal"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 15 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#111827] p-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-10 text-zinc-400 hover:text-white h-8 w-8 rounded-full border border-zinc-800 bg-black flex items-center justify-center cursor-pointer hover:border-[#00E5FF]/60"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Main Preview Container */}
                <div className="w-full flex items-center justify-center bg-black rounded-lg overflow-hidden border border-zinc-850 p-2 mt-8">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[65vh] max-w-full object-contain rounded"
                  />
                </div>

                <div className="mt-4 px-2">
                  <h3 className="text-lg font-display font-extrabold text-white tracking-tight">{selectedCert.title}</h3>
                  <p className="text-xs text-[#00E5FF] font-mono mt-0.5">CredRef ID: {selectedCert.id} — Issued by {selectedCert.issuer}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
