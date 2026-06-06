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
}

export default function Header({ profile, onAdminClick, unreadSubmissionsCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header id="header-nav" className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#0A0A0A]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Name */}
        <div className="flex items-center space-x-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#"
            onClick={(e) => handleScroll(e, '#header-nav')}
            className="flex items-center space-x-2 text-lg font-bold tracking-tight text-white"
            id="brand-logo"
          >
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">
              {profile.name}
            </span>
            <span className="text-xs font-mono font-normal text-[#00E5FF] border border-[#00E5FF]/20 px-1.5 py-0.5 rounded-md bg-[#00E5FF]/5">
              Portfolio
            </span>
          </motion.a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8" id="desktop-navigation">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-sm font-medium text-zinc-400 transition-all hover:text-[#00E5FF] hover:translate-y-[-1px]"
              id={`nav-item-${item.label.toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button: CMS / Admin Portal */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileActive={{ scale: 0.95 }}
            onClick={onAdminClick}
            className="relative flex items-center space-x-2 rounded-lg border border-[#00E5FF]/20 bg-[#111827] px-4 py-2 text-xs font-medium text-[#00E5FF] transition-all hover:bg-[#00E5FF]/10 hover:text-white hover:border-[#00E5FF]/50"
            id="desktop-admin-cms-btn"
            title="Open Content Management System (CMS)"
          >
            <Settings2 className="h-4 w-4 text-[#00E5FF]" />
            <span>CMS Admin Portal</span>
            {unreadSubmissionsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#7C4DFF] text-[9px] font-bold text-white animate-pulse">
                {unreadSubmissionsCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={onAdminClick}
            className="relative p-2 rounded-lg border border-[#00E5FF]/20 bg-[#111827] text-[#00E5FF]"
            id="mobile-admin-cms-shortcut"
          >
            <Settings2 className="h-4 w-4 text-[#00E5FF]" />
            {unreadSubmissionsCount > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#7C4DFF]" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
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
            className="md:hidden border-t border-zinc-900 bg-zinc-950 px-4 pt-2 pb-4 space-y-1"
            id="mobile-navigation-panel"
          >
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white"
                id={`mobile-nav-item-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-zinc-900 mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminClick();
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                id="mobile-admin-cms-btn"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Open CMS Admin Portal ({unreadSubmissionsCount} new msg)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
