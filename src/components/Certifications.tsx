/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Calendar, BadgeCheck, Eye, ShieldCheck } from 'lucide-react';
import { Certification } from '../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="certifications">
      <div className="mx-auto max-w-7xl">
        {/* Title Group */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
            <Award className="h-3.5 w-3.5" />
            <span>Professional Credentials</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="certifications-section-title">
            Certifications & Training
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-sm">
            Dynamically updated credentials verifying professional competency in UI research, graphic delivery pipelines, and accessibility.
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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 gap-5 hover:border-zinc-700/80 hover:bg-zinc-900 transition-all"
              id={`cert-layout-card-${cert.id}`}
            >
              {/* Left Side: Thumbnail Preview */}
              <div className="relative w-full md:w-44 h-32 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-850 flex-shrink-0 flex items-center justify-center group/img">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Blur Hover Action */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
                    title="View Credential Image"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                    title="Verify Credential Link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right Side: Credential Details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      {cert.issueDate}
                    </span>
                    <span className="flex items-center text-[10px] font-semibold font-mono text-indigo-400 bg-indigo-400/5 border border-indigo-500/20 px-2 py-0.5 rounded">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400">
                    Issued by {cert.issuer}
                  </p>
                  {cert.description && (
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Verification Action */}
                <div className="mt-4 pt-3 border-t border-zinc-850/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">Cryptographic ID Verified</span>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Verification Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty fallback status */}
        {certifications.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-850 rounded-2xl">
            <Award className="h-8 w-8 mx-auto text-zinc-600 mb-4 animate-pulse" />
            <p className="text-sm text-zinc-500">No professional certifications uploaded.</p>
          </div>
        )}

        {/* Image Modal Preview */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-sm"
              id="cert-image-modal"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-2 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close badge */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 text-white hover:text-zinc-300 h-8 w-8 rounded-full bg-zinc-950/90 border border-zinc-700 flex items-center justify-center cursor-pointer"
                >
                  &times;
                </button>

                <div className="p-4 pt-8">
                  <h3 className="text-lg font-bold text-white mb-1">{selectedCert.title}</h3>
                  <p className="text-xs text-zinc-400 mb-4">Official credential verification file</p>
                </div>

                <div className="overflow-auto max-h-[60vh] rounded-lg">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="mx-auto rounded-lg max-h-[55vh] object-contain border border-zinc-800"
                  />
                </div>

                <div className="p-4 flex items-center justify-between mt-2 border-t border-zinc-800">
                  <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" /> Secure Credential Check
                  </span>
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-indigo-400 hover:bg-zinc-900 transition-colors"
                  >
                    <span>Verify at Credential Provider</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
