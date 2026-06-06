/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProfileInfo, Project, FreelanceExperience, Certification, ClientReview, ContactSubmission } from './types';

export const INITIAL_PROFILE: ProfileInfo = {
  name: 'Md. Sakir Ahmed Sefat',
  title: 'Technology Integration & Finance Automation Specialist',
  bio: 'Detail-oriented BBA student majoring in Finance with structural expertise in fintech, business automation, and digital branding. I bridge corporate operations with tech integration, designing optimized ledger systems and streamlined spreadsheet architectures.',
  avatarUrl: '/src/assets/images/sefat_avatar_1780743117841.png',
  email: 'sefatahmed53@gmail.com',
  phone: '+8801625732526',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://linkedin.com',
  behanceUrl: 'https://behance.net',
  googleSiteUrl: 'sites.google.com/diu.edu.bd/sefat1',
  availability: 'Available',
  photoSlides: [
    '/src/assets/images/sefat_avatar_1780743117841.png',
    '/src/assets/images/sefat_desk_1780743137973.png',
    '/src/assets/images/sefat_standing_1780743155434.png',
  ],
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Finance Ledger Automation Dashboard',
    description: 'Developed custom financial systems and reconciliation pipelines parsing transaction logs for local corporate accounts.',
    category: 'Web Design',
    role: 'Financial Automation Lead',
    year: '2025',
    imageUrl: '/src/assets/images/sefat_desk_1780743137973.png',
    tags: ['Fintech UX', 'Excel Macros', 'Ledger Integration', 'Workflow Design'],
    link: 'https://github.com',
    isFeatured: true,
    longDescription: 'Leveraged advanced Microsoft Excel modeling and programmatic script integrations to automate routine general ledger updates. The solution ingests bank feeds, automatically tags operational expenditures, and produces instant dynamic reporting charts representing quarterly variances.'
  },
  {
    id: 'proj-2',
    title: 'Portfolio Weighting & Asset Rebalancer',
    description: 'A mock-fintech web interface representing secure user portfolios with dynamic asset allocation formulas, crafted for local BBA research studies.',
    category: 'UI/UX',
    role: 'Fintech Analyst',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['Asset Allocation', 'Figma Prototyping', 'Fintech UX', 'Corporate Finance'],
    link: 'https://github.com',
    isFeatured: true,
    longDescription: 'Completed a full interactive case study for micro-savings and automated portfolio optimization. Calculated efficient portfolio frontiers using modern markowitz models, making complex balancing parameters clear and accessible to average corporate employees.'
  },
  {
    id: 'proj-3',
    title: 'Strategic Brand Identity Guidelines',
    description: 'Designed a comprehensive vector brand kit, custom logo system, and geometric marketing guidelines for BBA club events.',
    category: 'Brand Identity',
    role: 'Graphic Designer',
    year: '2024',
    imageUrl: '/src/assets/images/sefat_standing_1780743155434.png',
    tags: ['Adobe Illustrator', 'Branding Book', 'Vector Illustration', 'Marketing Strategy'],
    link: 'https://github.com',
    isFeatured: true,
    longDescription: 'Using Adobe Illustrator, crafted high-fidelity advertising designs, banners, and scalable geometric patterns. Managed social campaigns reaching extensive campus audiences, adhering to strict typography rules.'
  }
];

export const INITIAL_EXPERIENCE: FreelanceExperience[] = [
  {
    id: 'exp-1',
    role: 'Technology Integration & Automation Specialist',
    clientName: 'Corporate Operations Specialist (Freelance)',
    duration: '2024 - Present',
    description: 'Directly establish automated HR payroll systems, design vector marketing layout cards, and construct custom email models to coordinate corporate events.',
    achievements: [
      'Developed responsive financial spreadsheet templates reducing accounting errors in local business reviews by 22%.',
      'Engineered automated Microsoft Outlook and Gmail email marketing campaigns with 45%+ higher response rates.',
      'Designed vector branding books and promotional campaigns in Adobe Illustrator for international freelance partners.'
    ],
    platform: 'Upwork'
  },
  {
    id: 'exp-2',
    role: 'Business Club Leader & Instructor',
    clientName: 'DIU Business & Education Club',
    duration: '2023 - 2024',
    description: 'Instructed peers in advanced spreadsheets, structured prompt engineering frameworks using Copilot, and assisted event organization.',
    achievements: [
      'Co-designed structured Microsoft Excel courses teaching pivot tables and regression modeling to over 200 DIU BBA students.',
      'Organized outreach structures, increasing annual student registration submissions by 55%.'
    ],
    platform: 'Direct Client'
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Adobe Illustrator Professional Graphic Design',
    issuer: 'Human Resource Development Institute (HRDI)',
    issueDate: 'Jan 2025',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://hrdi.diu.edu.bd',
    description: 'Comprehensive vector graphics certification, specializing in logo structures, corporate layout designs, and branding kits. Credential ID: Z7APGS8W8VMJ.'
  },
  {
    id: 'cert-2',
    title: 'Cyber Security Essentials',
    issuer: 'Mukhtopaath (Govt. of Bangladesh)',
    issueDate: 'Nov 2024',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://mukto-paath.gov.bd',
    description: 'Fundamental training covering data encryption standards, secure credential practices, firewall installations, and risk threat mitigations.'
  },
  {
    id: 'cert-3',
    title: 'Microsoft Excel Advanced Training',
    issuer: 'DIU Business & Education Club',
    issueDate: 'Aug 2024',
    imageUrl: 'https://images.unsplash.com/photo-1611095787946-fd7e39785a2c?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://diu.edu.bd',
    description: 'Advanced spreadsheets modeling, including pivot statistics, VLOOKUP/XLOOKUP arrays, financial regressions, and automated macro routines.'
  },
  {
    id: 'cert-4',
    title: 'AI+ Prompt Engineer, Copilot AI',
    issuer: 'Netcom Learning',
    issueDate: 'Jun 2024',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://netcomlearning.com',
    description: 'Advanced prompt chains for business automation, workflow scaling, semantic structures, and direct Copilot integrations.'
  },
  {
    id: 'cert-5',
    title: 'Digital Marketing Fundamentals',
    issuer: '10 Minute School',
    issueDate: 'Apr 2024',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80',
    verificationUrl: 'https://10minuteschool.com',
    description: 'Full multi-platform social media strategy, SEO marketing optimizations, Google AdWords metrics, and brand campaign targeting.'
  }
];

export const INITIAL_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Alexander Vance',
    clientRole: 'Operations Director',
    clientCompany: 'Aura Interactive',
    rating: 5,
    reviewText: "Sefat's spreadsheet and payroll automation capabilities are outstanding! He reconstructed our standard operating ledger and integrated simple scripts that turned complex sheets into clean, manageable data streams.",
    date: 'May 12, 2025',
    approved: true
  },
  {
    id: 'rev-2',
    clientName: 'Sarah Jenna',
    clientRole: 'Managing Advisor',
    clientCompany: 'EcoSphere Solutions',
    rating: 5,
    reviewText: "Incredibly professional and organized. Sefat combined Adobe Illustrator brand guidance with targeted digital marketing structures to increase our promotional campaign registrations greatly.",
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
