/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Briefcase, Star, ExternalLink, Trophy, Network, UserSquare2 } from 'lucide-react';
import { FreelanceExperience } from '../types';

interface ExperienceProps {
  experience: FreelanceExperience[];
}

export default function Experience({ experience }: ExperienceProps) {
  const getPlatformIcon = (platform: FreelanceExperience['platform']) => {
    switch (platform) {
      case 'Upwork':
        return <span className="text-xs font-mono font-bold text-[#14a800] bg-[#14a800]/10 px-2 py-0.5 rounded border border-[#14a800]/20">Upwork</span>;
      case 'Fiverr':
        return <span className="text-xs font-mono font-bold text-[#1dbf73] bg-[#1dbf73]/10 px-2 py-0.5 rounded border border-[#1dbf73]/20">Fiverr</span>;
      case 'Direct Client':
        return <span className="text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">Direct</span>;
      default:
        return <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">Partner</span>;
    }
  };

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="experience">
      <div className="mx-auto max-w-4xl">
        {/* Intro Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
            <Briefcase className="h-3.5 w-3.5" />
            <span>Consultancy Progress</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="experience-section-title">
            Freelance History
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-sm">
            Proven track record of designing, shipping, and optimization directly for digital product agencies and creative operations of international clients.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-zinc-850 ml-4 md:ml-6 space-y-12 pb-1" id="experience-timeline">
          {experience.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={item.id}
              className="relative pl-8 md:pl-10"
              id={`experience-node-${item.id}`}
            >
              {/* Marker Bubble */}
              <span className="absolute -left-3.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400">
                <Network className="h-3.5 w-3.5" />
              </span>

              {/* Card Container */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 md:p-8 hover:border-zinc-700/60 transition-all hover:bg-zinc-900/50">
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex items-center space-x-2.5 mt-1 text-xs text-zinc-500">
                      <span className="font-medium text-zinc-400 flex items-center gap-1">
                        <UserSquare2 className="h-3.5 w-3.5 text-zinc-500" />
                        {item.clientName}
                      </span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <div>
                    {getPlatformIcon(item.platform)}
                  </div>
                </div>

                {/* Subtext */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Accomplishments Checklists */}
                <div>
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-1.5">
                    <Trophy className="h-3 w-3 text-indigo-400" />
                    <span>Selected Deliverables & Metrics</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {item.achievements.map((achievement, actIdx) => (
                      <li key={actIdx} className="flex items-start text-xs text-zinc-400 leading-relaxed">
                        <Star className="h-3 w-3 text-indigo-400 mt-1 mr-2.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty status check */}
        {experience.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-dashed border-zinc-850 p-6">
            <p className="text-sm text-zinc-500">No freelance history nodes provided yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
