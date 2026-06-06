/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Mail, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeroProps {
  profile: ProfileInfo;
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-16 sm:px-6 lg:px-8" id="hero-section">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-x-0 top-12 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
        <div className="aspect-1155/678 w-[72rem] flex-none bg-gradient-to-tr from-indigo-500/20 to-purple-600/10 opacity-35" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex justify-center mb-6">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/20">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>{profile.availability} for Freelance Work</span>
          </span>
        </motion.div>

        {/* Display Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
          id="hero-title"
        >
          I design interactive platforms &
          <span className="block mt-2 bg-gradient-to-r from-white via-indigo-200 to-zinc-500 bg-clip-text text-transparent">
            elevate visual brands.
          </span>
        </motion.h1>

        {/* Modern subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-lg"
          id="hero-bio"
        >
          {profile.bio}
        </motion.p>

        {/* Social and Reference Links */}
        <motion.div variants={itemVariants} className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-mono text-zinc-500">
          <a
            href={profile.googleSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
          >
            Google Site <ArrowUpRight className="h-3 w-3" />
          </a>
          <span>•</span>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            Email Sefat <Mail className="h-3 w-3" />
          </a>
        </motion.div>

        {/* Dynamic call to action */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleScrollToSection('#projects')}
            className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
            id="hero-projects-cta"
          >
            <span>View Design Portfolio</span>
            <ArrowDown className="h-4 w-4 text-indigo-200 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => handleScrollToSection('#contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
            id="hero-contact-cta"
          >
            <Mail className="h-4 w-4" />
            <span>Get In Touch</span>
          </button>
        </motion.div>

        {/* Aesthetic decoration - subtle grid lines */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center text-zinc-600 animate-bounce"
        >
          <button
            onClick={() => handleScrollToSection('#projects')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:text-white cursor-pointer"
            title="Scroll Down"
          >
            <ArrowDown className="h-4 w-4 text-indigo-400" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
