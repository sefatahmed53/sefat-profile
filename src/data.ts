/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProfileInfo, Project, FreelanceExperience, Certification, ClientReview, ContactSubmission } from './types';

export const INITIAL_PROFILE: ProfileInfo = {
  name: 'Sefat Ahmed',
  title: 'Lead UI/UX & Brand Identity Designer',
  bio: 'I craft highly immersive digital products, minimalist interfaces, and complete visual identities for startups and tech brands worldwide. Combining creative strategy with pixel-perfect design execution.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80', // elegant design-avatar
  email: 'SefatAhmed53@gmail.com',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  behanceUrl: 'https://behance.net',
  googleSiteUrl: 'https://sites.google.com/diu.edu.bd/sefat1',
  availability: 'Available',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Aura Meditation App',
    description: 'A calm, dark-themed mindfulness app designed to reduce anxiety through interactive ambient sounds and breathing loops.',
    category: 'UI/UX',
    role: 'Lead UI/UX Designer',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['Mobile Application', 'Mindfulness', 'Figma', 'Prototyping'],
    link: 'https://behance.net',
    isFeatured: true,
    longDescription: 'Aura is a complete UX case study focused on creating an accessible, non-stressful interface for daily mindfulness practices. Developed through rigorous user testing, wireframing, high-fidelity screen designs, and micro-interaction documentation.'
  },
  {
    id: 'proj-2',
    title: 'Vortex Crypto Wallet',
    description: 'Sleek, high-contrast dashboard and mobile designs for secure token swaps and real-time asset tracking.',
    category: 'Web Design',
    role: 'Product Designer',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['Web3', 'Dashboard', 'Fintech', 'Design System'],
    link: 'https://figma.com',
    isFeatured: true,
    longDescription: 'Vortex rethinks asset management for DeFi networks. The goal was to simplify complex cryptographic keys and token swap processes into a responsive, modern user experience suited for both professional traders and absolute beginners.'
  },
  {
    id: 'proj-3',
    title: 'Zenith Tech Brand identity',
    description: 'A comprehensive branding system featuring a custom typeface, visual design guidelines, and geometric marketing materials.',
    category: 'Brand Identity',
    role: 'Identity Designer',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['Branding', 'Typography', 'Logo Design', 'Vector Illustration'],
    link: 'https://dribbble.com',
    isFeatured: true,
    longDescription: 'Zenith required an architectural, bold monogram logo that expresses trust and rapid scalability. Crafted a full brand identity guidelines book covering grid measurements, typography scales, primary and secondary color palettes, and social media templates.'
  },
  {
    id: 'proj-4',
    title: 'Arcane Headwear E-Commerce',
    description: 'Minimalist electronic storefront with immersive product grids, interactive size selectors, and an elegant swift-checkout experience.',
    category: 'UI/UX',
    role: 'UI Designer',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['E-Commerce', 'Web App', 'Responsive Grid', 'User Retention'],
    link: 'https://behance.net',
    isFeatured: false,
    longDescription: 'Designed with ultra-clean margins and bold editorial layouts. This web platform maximizes visual breathing room to present premium merchandise in the most modern, elegant, boutique-store aesthetic possible.'
  }
];

export const INITIAL_EXPERIENCE: FreelanceExperience[] = [
  {
    id: 'exp-1',
    role: 'Senior Freelance UI/UX Specialist',
    clientName: 'Global Tech Startups',
    duration: '2024 - Present',
    description: 'Provide high-quality web designs, pitch deck revisions, and production-ready mobile prototypes directly to scaling tech clients.',
    achievements: [
      'Redesigned B2B SaaS onboarding experiences, driving a 34% increase in successful user registrations.',
      'Established systematic Figma component libraries supporting modular developers in faster production cycles.',
      'Created custom vector identity marks and full brand packages for 12+ international products.'
    ],
    platform: 'Upwork'
  },
  {
    id: 'exp-2',
    role: 'Graphic & Brand Consultant',
    clientName: 'EcoSphere Marketing Agency',
    duration: '2023 - 2024',
    description: 'Conceptualized client branding materials, social media assets, and vector layouts adhering to strict brand specifications.',
    achievements: [
      'Collaborated on dynamic social campaigns reaching over 500,000 monthly active impressions.',
      'Iterated rapid typography drafts and mockups for corporate re-brand submissions.'
    ],
    platform: 'Fiverr'
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google Career Certificates',
    issueDate: 'October 2024',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://coursera.org/verify/google-ux-design',
    description: 'Rigorous 7-course curriculum covering user research, Figma wireframing, high-fidelity prototyping, mobile and web responsive layouts.'
  },
  {
    id: 'cert-2',
    title: 'User Interface Engineering Accreditation',
    issuer: 'Interaction Design Foundation (IxDF)',
    issueDate: 'Jan 2024',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://interaction-design.org/verify/ui-engineering',
    description: 'Advanced credentials covering information architecture, human-computer interaction (HCI), card sorting, and accessibility standards.'
  }
];

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Alexander Vance',
    clientRole: 'Product VP',
    clientCompany: 'Aura Interactive',
    rating: 5,
    reviewText: "Sefat's design capabilities are unmatched! He took our rough design brief and created a pristine, modern, immersive layout that truly elevates our application's design language.",
    date: 'May 12, 2025',
    approved: true
  },
  {
    id: 'rev-2',
    clientName: 'Sarah Jenna',
    clientRole: 'Founding Partner',
    clientCompany: 'EcoSphere Agency',
    rating: 5,
    reviewText: "Highly professional designer with a phenomenal work ethic. The level of graphic detail, typography styling, and visual rhythm Sefat crafted for our global launch materials was brilliant.",
    date: 'April 03, 2025',
    approved: true
  }
];

// LocalStorage helpers
export const loadData = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved) as T;
    }
  } catch (e) {
    console.error('Error loading localStorage: ', e);
  }
  return defaultValue;
};

export const saveData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving localStorage: ', e);
  }
};
