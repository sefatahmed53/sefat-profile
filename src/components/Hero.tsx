/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, ArrowUpRight, Award, FileText } from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeroProps {
  profile: ProfileInfo;
  onTabChange?: (tab: string) => void;
}

export default function Hero({ profile, onTabChange }: HeroProps) {
  // Typing Effect
  const roles = [
    "Business Administration Student",
    "Freelance Designer",
    "ERP & Business Solutions Enthusiast",
    "Finance & Fintech UI Designer"
  ];

  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIdx];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }

      setTypingSpeed(isDeleting ? 40 : 80);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIdx, typingSpeed]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const handleScrollToSection = (id: string) => {
    const tabName = id.replace('#', '');
    if (onTabChange) {
      onTabChange(tabName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Slideshow state
  const slides = profile.photoSlides || [];
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      if (!isPaused) setSlideIdx((s) => (s + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides, isPaused]);


  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#0A0A0A] px-4 pt-10 sm:px-6 lg:px-8" id="hero-section">
      
      {/* Background Grid Lines & Vector Decor */}
      <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl text-center z-10 relative"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex justify-center mb-6">
          <span className="inline-flex items-center space-x-2 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 px-4.5 py-1.5 text-xs font-mono font-semibold text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>Active: {profile.availability} for Business Projects</span>
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mx-auto mb-10 flex items-center justify-center">
          <div className="avatar-ring relative rounded-full bg-[#0A0A0A]/40 p-1 shadow-[0_0_40px_rgba(0,229,255,0.1)]">
            <motion.img
              key={profile.avatarUrl}
              src={profile.avatarUrl}
              alt={`${profile.name} avatar`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-square w-full max-w-[240px] sm:max-w-[280px] rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-display font-extrabold tracking-tight text-white sm:text-7xl leading-tight"
          id="hero-title"
        >
          <span className="text-zinc-400">Hi, I'm</span>{' '}
          <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,229,255,0.2)] font-display">
            {profile.name}
          </span>
        </motion.h1>

        {/* Dynamic Typing Subheadline */}
        <motion.div 
          variants={itemVariants}
          className="mt-5 min-h-[40px] flex items-center justify-center"
        >
          <p className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300 md:text-lg">
            <span className="text-zinc-500">//</span>{' '}
            <span className="text-white border-r-2 border-[#00E5FF] pr-1 animate-pulse">
              {currentText}
            </span>
          </p>
        </motion.div>

        {/* Modern subheadline bio details */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base px-2"
          id="hero-bio"
        >
          {profile.bio}
        </motion.p>

        {/* Slideshow (optional) */}
        {slides && slides.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-8 w-full max-w-[880px] relative rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((src, i) => (
              <motion.img
                key={src + i}
                src={src}
                alt={`slide-${i}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={i === slideIdx ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover"
                style={{ willChange: 'opacity, transform' }}
              />
            ))}

            {/* Indicators */}
            <div className="absolute left-1/2 bottom-3 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIdx(i)}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${i === slideIdx ? 'bg-[#00E5FF]' : 'bg-white/30'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Social & Google Site links row */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-zinc-500">
          <a
            href={`https://${profile.googleSiteUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#00E5FF] text-zinc-400 font-semibold transition-colors duration-200"
          >
            <span>Google Site Portfolio</span> <ArrowUpRight className="h-3.5 w-3.5 text-[#00E5FF]" />
          </a>
          <span className="text-zinc-800">•</span>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-[#00E5FF] text-zinc-400 font-semibold transition-colors duration-200">
            <span>Corporate Mail</span> <Mail className="h-3.5 w-3.5 text-[#7C4DFF]" />
          </a>
          <span className="text-zinc-800">•</span>
          <span className="text-zinc-400 flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-[#00E5FF]" /> BBA Finance Honors
          </span>
        </motion.div>

        {/* Dynamic primary actions button cluster */}
        <motion.div variants={itemVariants} className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-4.5">
          <button
            onClick={() => handleScrollToSection('#projects')}
            className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
            id="hero-projects-cta"
          >
            <span>View Projects</span>
            <ArrowDown className="h-4 w-4 text-black transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => handleScrollToSection('#resume')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-[#111827] px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-[#00E5FF] hover:text-white transition-all hover:bg-[#00E5FF]/5 hover:border-[#00E5FF]/45 cursor-pointer"
            id="hero-resume-cta"
          >
            <FileText className="h-4 w-4" />
            <span>Download Resume</span>
          </button>

          <button
            onClick={() => handleScrollToSection('#contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-[#111827]/30 hover:bg-[#111827] px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-zinc-300 transition-all hover:border-[#7C4DFF]/50"
            id="hero-contact-cta"
          >
            <Mail className="h-4 w-4 text-[#7C4DFF]" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Aesthetic animated bottom scroll-down indicator icon */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex justify-center text-zinc-650 animate-bounce"
        >
          <button
            onClick={() => handleScrollToSection('#projects')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-850 bg-[#111827]/40 text-zinc-400 hover:border-[#00E5FF]/40 hover:text-white cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            title="Explore Workspace Portfolio"
          >
            <ArrowDown className="h-4 w-4 text-[#00E5FF]" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
