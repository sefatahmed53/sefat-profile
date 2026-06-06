/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Settings2, ShieldCheck } from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeaderProps {
  profile: ProfileInfo;
  onAdminClick: () => void;
  unreadSubmissionsCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ 
  profile, 
  onAdminClick, 
  unreadSubmissionsCount, 
  activeTab, 
  setActiveTab 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home', tab: 'home' },
    { label: 'Projects', href: '#projects', tab: 'projects' },
    { label: 'Experience', href: '#experience', tab: 'experience' },
    { label: 'Certifications', href: '#certifications', tab: 'certifications' },
    { label: 'Client Reviews', href: '#reviews', tab: 'reviews' },
    { label: 'Resume', href: '#resume', tab: 'resume' },
    { label: 'Contact', href: '#contact', tab: 'contact' },
  ];

  return (
    <header id="header-nav" className="sticky top-0 z-40 w-full border-b border-zinc-800/50 bg-[#0A0A0A]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div className="flex items-center space-x-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsOpen(false);
            }}
            className="flex items-center space-x-2.5 text-lg font-bold tracking-tight text-white group"
            id="brand-logo"
          >
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(0,229,255,0.3)] transition-all group-hover:brightness-110">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono font-medium text-[#00E5FF] border border-[#00E5FF]/25 px-2 py-0.5 rounded-full bg-[#00E5FF]/5 tracking-wider uppercase">
              Portfolio
            </span>
          </motion.a>
        </div>

        {/* Desktop Nav with Sliding glassmorphic bubble */}
        <nav className="hidden lg:flex items-center bg-zinc-900/40 p-1.5 rounded-full border border-zinc-800/80" id="desktop-navigation">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <a
                key={item.tab}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.tab);
                  window.location.hash = item.href;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className={`relative px-4 py-2 text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 rounded-full select-none ${
                  isActive ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
                id={`nav-item-${item.tab}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] rounded-full -z-10 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button: CMS / Admin Portal */}
        <div className="hidden lg:flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdminClick}
            className="relative flex items-center space-x-2 rounded-xl border border-zinc-805 bg-zinc-900/40 px-4 py-2.5 text-xs font-semibold text-[#00E5FF] transition-all hover:bg-zinc-850 hover:text-white hover:border-[#00E5FF]/40 cursor-pointer shadow-md"
            id="desktop-admin-cms-btn"
            title="Open Content Management System (CMS)"
          >
            <Settings2 className="h-4 w-4 text-[#00E5FF]" />
            <span>CMS Admin Portal</span>
            {unreadSubmissionsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C4DFF] text-[10px] font-bold text-white animate-pulse shadow-lg">
                {unreadSubmissionsCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={onAdminClick}
            className="relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-[#00E5FF] hover:border-[#00E5FF]/30 active:scale-95 transition-all"
            id="mobile-admin-cms-shortcut"
          >
            <Settings2 className="h-4.5 w-4.5 text-[#00E5FF]" />
            {unreadSubmissionsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-[#7C4DFF] animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900/60 border border-zinc-800 transition-colors"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-zinc-900 bg-zinc-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-2xl"
            id="mobile-navigation-panel"
          >
            {menuItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <a
                  key={item.tab}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.tab);
                    window.location.hash = item.href;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className={`block rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-zinc-900 text-[#00E5FF] border-l-4 border-[#00E5FF] pl-3 shadow-inner' 
                      : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-white'
                  }`}
                  id={`mobile-nav-item-${item.tab}`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-zinc-900 mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminClick();
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-xl bg-indigo-650 hover:bg-indigo-600 px-4 py-3 text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                id="mobile-admin-cms-btn"
              >
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>Open CMS Admin Portal ({unreadSubmissionsCount} new msgs)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
