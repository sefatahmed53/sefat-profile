/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, UserCheck, CheckCircle2, ChevronRight, PenTool } from 'lucide-react';
import { ClientReview } from '../types';

interface ClientReviewsProps {
  reviews: ClientReview[];
  onSubmitReview: (review: Omit<ClientReview, 'id' | 'date' | 'approved'>) => void;
}

export default function ClientReviews({ reviews, onSubmitReview }: ClientReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const approvedReviews = reviews.filter(r => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!clientName.trim() || !clientRole.trim() || !reviewText.trim()) {
      setError('Please fill out Name, Role, and Recommendation message.');
      return;
    }

    if (reviewText.length < 10) {
      setError('Recommendation must be at least 10 characters.');
      return;
    }

    onSubmitReview({
      clientName: clientName.trim(),
      clientRole: clientRole.trim(),
      clientCompany: clientCompany.trim() || 'Freelance Partner',
      rating,
      reviewText: reviewText.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      // Reset form variables
      setClientName('');
      setClientRole('');
      setClientCompany('');
      setRating(5);
      setReviewText('');
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="reviews">
      <div className="mx-auto max-w-6xl">
        {/* Layout grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Static info header column */}
          <div className="lg:col-span-1">
            <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="reviews-section-title">
              Client Feedback
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Real opinions, recommendations, and reviews from team leaders and startup founders Sefat integrated with on freelance platforms.
            </p>

            {/* Leave dynamic review action */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setSubmitted(false);
                }}
                className="inline-flex items-center space-x-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold hover:border-zinc-700 transition-all hover:bg-zinc-805 text-zinc-300 hover:text-white px-5 py-3 cursor-pointer"
                id="toggle-leave-review"
              >
                <PenTool className="h-4 w-4 text-indigo-400" />
                <span>{showForm ? 'Cancel Form' : 'Write Client Recommendation'}</span>
              </button>
            </div>
          </div>

          {/* Right column: Reviews feed or Form write */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {showForm ? (
                // Feedback Form panel
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8"
                  id="client-recommendation-panel"
                >
                  {submitted ? (
                    <div className="text-center py-12" id="review-success-panel">
                      <CheckCircle2 className="h-12 w-12 text-indigo-400 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-lg font-bold text-white mb-2">Thank you Sefat's client!</h3>
                      <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Your recommendation was submitted successfully. It will display immediately below after Sefat reviews it in his CMS inbox!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" id="client-review-form">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">Create Recommendation</h3>
                        <p className="text-xs text-zinc-500 mb-4">Sharing constructive feedback inspires confidence in future freelance prospects.</p>
                      </div>

                      {error && (
                        <div className="rounded-lg bg-red-950/40 border border-red-900/40 p-3 text-xs text-red-400" id="review-form-error">
                          {error}
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-2 font-medium">Your Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20"
                            id="review-input-name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-2 font-medium">Your Role / Job Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Co-Founder / PM"
                            value={clientRole}
                            onChange={(e) => setClientRole(e.target.value)}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20px"
                            id="review-input-role"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-2 font-medium">Company or Platform</label>
                          <input
                            type="text"
                            placeholder="e.g. Upwork Client"
                            value={clientCompany}
                            onChange={(e) => setClientCompany(e.target.value)}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20"
                            id="review-input-company"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-zinc-400 mb-2 font-medium">Interface Rating *</label>
                          <div className="flex items-center space-x-1 h-11" id="review-rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(null)}
                                className="text-zinc-600 hover:text-amber-400 transition-colors cursor-pointer"
                                id={`rating-star-btn-${star}`}
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    (hoveredStar !== null ? star <= hoveredStar : star <= rating)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-zinc-700'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-2 font-medium">Client Recommendation Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Detail Sefat's graphic deliverables, UI expertise, communication quality, or pixel precision..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20 resize-none"
                          id="review-input-message"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors w-full sm:w-auto cursor-pointer"
                          id="submit-client-feedback"
                        >
                          Submit Safe Recommendation
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                // Reviews List Wall (default view)
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  id="client-reviews-stack"
                >
                  {approvedReviews.map((review, rIdx) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: rIdx * 0.1 }}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8 hover:border-zinc-855 transition-all"
                      id={`review-item-card-${review.id}`}
                    >
                      {/* Starts count */}
                      <div className="flex items-center space-x-1 mb-4" id={`review-stars-${review.id}`}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${
                              idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-800'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Text */}
                      <p className="text-zinc-350 italic text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        "{review.reviewText}"
                      </p>

                      {/* Client card badge */}
                      <div className="flex items-center justify-between border-t border-zinc-850/60 pt-4">
                        <div className="flex items-center space-x-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold font-mono">
                            {review.clientName.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white tracking-tight">{review.clientName}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              {review.clientRole} at <span className="text-zinc-400">{review.clientCompany}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <UserCheck className="h-3 w-3 text-indigo-400" />
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Empty state reviews check */}
                  {approvedReviews.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-zinc-850 rounded-2xl p-6">
                      <MessageSquare className="h-8 w-8 text-zinc-700 mx-auto mb-4 animate-pulse" />
                      <p className="text-sm text-zinc-500">Wait for client recommendations or click Write Review above to add your own!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
