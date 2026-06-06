/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layers, ArrowUpRight, FolderOpen, Tag, Calendar, User } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'UI/UX' | 'Graphic Design' | 'Brand Identity' | 'Web Design'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterOptions: ('All' | 'UI/UX' | 'Graphic Design' | 'Brand Identity' | 'Web Design')[] = [
    'All',
    'UI/UX',
    'Brand Identity',
    'Web Design',
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="projects">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="md:flex md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-mono font-medium text-indigo-400 mb-4 border border-indigo-500/20">
              <FolderOpen className="h-3 w-3" />
              <span>Design Works</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" id="projects-section-title">
              Selected Works
            </h2>
            <p className="mt-4 max-w-xl text-zinc-400">
              A curated showcase of applications, interfaces, and branding components built for global freelance clients and corporate partners.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="mt-6 flex flex-wrap gap-2 md:mt-0" id="project-filters">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  activeFilter === option
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/20 font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-850'
                }`}
                id={`filter-${option.toLowerCase().replace(' ', '-')}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          id="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/45 cursor-pointer hover:border-zinc-700/80 hover:bg-zinc-900 transition-all"
                id={`project-card-${project.id}`}
              >
                {/* Product Image Thumbnail */}
                <div className="aspect-video w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating category */}
                  <span className="absolute top-3 right-3 rounded-md bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-medium text-indigo-400 border border-zinc-800">
                    {project.category}
                  </span>
                </div>

                {/* Info block */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                    {project.role}
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-4 border-t border-zinc-850">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-950 px-2 py-0.5 text-[10px] font-mono text-zinc-400 border border-zinc-850"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-500 self-center">
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
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-850 rounded-2xl">
            <Layers className="h-8 w-8 mx-auto text-zinc-600 mb-4 animate-pulse" />
            <p className="text-sm text-zinc-500">No project listings found under this filter.</p>
          </div>
        )}

        {/* Rich Overlay Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm"
              id="project-overlay-modal"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-white h-8 w-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center cursor-pointer hover:border-zinc-700"
                >
                  &times;
                </button>

                {/* Banner Thumbnail */}
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-zinc-950 mt-4 border border-zinc-800">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Subtitle / Taxonomy */}
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <span className="rounded bg-indigo-500/10 px-2.5 py-1 font-mono font-medium text-indigo-400 border border-indigo-500/20">
                    {selectedProject.category}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <div className="flex items-center text-zinc-400">
                    <User className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                    <span>{selectedProject.role}</span>
                  </div>
                  <span className="text-zinc-500">•</span>
                  <div className="flex items-center text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                    <span>{selectedProject.year}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-zinc-300 leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Case Study Metadata */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 font-mono mb-3">
                    Project Tech Stack & Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-zinc-950 px-2.5 py-1 text-xs font-mono text-zinc-400 border border-zinc-800 flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3 text-indigo-500/60" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification/External Link block */}
                {selectedProject.link && (
                  <div className="pt-4 border-t border-zinc-850 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Live credential files available:</span>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
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
