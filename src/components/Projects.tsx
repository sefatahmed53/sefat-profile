/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers, ArrowUpRight, FolderOpen, Tag, Calendar, User, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 bg-transparent" id="projects-list-container">
      <div className="mx-auto max-w-7xl">
        
        {/* Projects Grid with dynamic layout */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
          id="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#111827]/40 backdrop-blur-md cursor-pointer hover:border-[#00E5FF]/30 hover:bg-[#111827]/85 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(0,229,255,0.06)]"
                id={`project-card-${project.id}`}
              >
                {/* Product Image Thumbnail */}
                <div className="aspect-video w-full overflow-hidden bg-[#0A0A0A] relative border-b border-zinc-800/60">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating category */}
                  <span className="absolute top-3 right-3 rounded-md bg-zinc-950/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-[#00E5FF] border border-[#00E5FF]/20">
                    {project.category}
                  </span>
                </div>

                {/* Info block */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#7C4DFF] font-mono font-bold">
                    {project.role}
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <h3 className="text-base font-display font-extrabold text-white tracking-tight group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/40">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-900/60 px-2 py-0.5 text-[9px] font-mono text-zinc-400 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-mono text-zinc-500 self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if no projects items exist in CMS yet */}
        {projects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-805 rounded-2xl">
            <Layers className="h-8 w-8 mx-auto text-zinc-650 mb-3 animate-pulse" />
            <p className="text-xs text-zinc-500 font-medium">No project listings found under this filter query.</p>
          </div>
        )}

        {/* Rich Overlay Case Study Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              id="project-overlay-modal"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.93, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.93, y: 15 }}
                transition={{ type: 'spring', duration: 0.35 }}
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#111827] p-6 sm:p-8 shadow-2xl shadow-black"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white h-8 w-8 rounded-full border border-zinc-800 bg-[#0A0A0A] flex items-center justify-center cursor-pointer hover:border-[#00E5FF]/50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Banner Thumbnail */}
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black mt-4 border border-zinc-800">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Subtitle / Taxonomy */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <span className="rounded bg-[#00E5FF]/5 px-2.5 py-1 font-mono font-bold text-[#00E5FF] border border-[#00E5FF]/20">
                    {selectedProject.category}
                  </span>
                  <span className="text-zinc-650">•</span>
                  <div className="flex items-center text-zinc-400">
                    <User className="h-3.5 w-3.5 mr-1 text-[#7C4DFF]" />
                    <span className="font-medium">{selectedProject.role}</span>
                  </div>
                  <span className="text-zinc-650">•</span>
                  <div className="flex items-center text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                    <span>{selectedProject.year}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-zinc-350 leading-relaxed text-xs sm:text-sm mb-6 whitespace-pre-wrap">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Case Study Metadata */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#7C4DFF] font-mono mb-3">
                    Project Tech Stack & Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#0A0A0A] px-2.5 py-1 text-xs font-mono text-zinc-400 border border-zinc-800 flex items-center gap-1 hover:border-[#00E5FF]/20 transition-all"
                      >
                        <Tag className="h-3 w-3 text-[#00E5FF]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification/External Link block */}
                {selectedProject.link && (
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Live credential/workspace files:</span>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] px-4 py-2 text-xs font-mono font-bold text-black hover:opacity-90 transition-all shadow-md"
                    >
                      <span>Explore Case Files</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
