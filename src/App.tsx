/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MessageSquare, ArrowUpRight, Github, Linkedin, HelpCircle } from 'lucide-react';

// Types & Data
import {
  ProfileInfo,
  Project,
  FreelanceExperience,
  Certification,
  ClientReview,
  ContactSubmission
} from './types';

import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_EXPERIENCE,
  INITIAL_CERTIFICATIONS,
  INITIAL_REVIEWS,
  loadData,
  saveData
} from './data';

// Subcomponents
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import ClientReviews from './components/ClientReviews';
import Resume from './components/Resume';
import ContactForm from './components/ContactForm';
import CMSDialog from './components/CMSDialog';

export default function App() {
  // Core Portfolio and CMS Local persistence States
  const [profile, setProfile] = useState<ProfileInfo>(() => loadData('sefat_profile', INITIAL_PROFILE));
  const [projects, setProjects] = useState<Project[]>(() => loadData('sefat_projects', INITIAL_PROJECTS));
  const [experience, setExperience] = useState<FreelanceExperience[]>(() => loadData('sefat_experience', INITIAL_EXPERIENCE));
  const [certifications, setCertifications] = useState<Certification[]>(() => loadData('sefat_certifications', INITIAL_CERTIFICATIONS));
  const [reviews, setReviews] = useState<ClientReview[]>(() => loadData('sefat_reviews', INITIAL_REVIEWS));
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => loadData('sefat_submissions', []));

  const [isCMSOpen, setIsCMSOpen] = useState(false);

  // Auto synchronization triggers
  useEffect(() => {
    saveData('sefat_profile', profile);
  }, [profile]);

  useEffect(() => {
    saveData('sefat_projects', projects);
  }, [projects]);

  useEffect(() => {
    saveData('sefat_experience', experience);
  }, [experience]);

  useEffect(() => {
    saveData('sefat_certifications', certifications);
  }, [certifications]);

  useEffect(() => {
    saveData('sefat_reviews', reviews);
  }, [reviews]);

  useEffect(() => {
    saveData('sefat_submissions', submissions);
  }, [submissions]);

  // CMS Handlers
  const handleUpdateProfile = (newProfile: ProfileInfo) => {
    setProfile(newProfile);
  };

  const handleUpdateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const handleUpdateCertifications = (newCerts: Certification[]) => {
    setCertifications(newCerts);
  };

  const handleUpdateReviews = (newReviews: ClientReview[]) => {
    setReviews(newReviews);
  };

  const handleUpdateSubmissions = (newSubmissions: ContactSubmission[]) => {
    setSubmissions(newSubmissions);
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem('sefat_profile');
    localStorage.removeItem('sefat_projects');
    localStorage.removeItem('sefat_experience');
    localStorage.removeItem('sefat_certifications');
    localStorage.removeItem('sefat_reviews');
    localStorage.removeItem('sefat_submissions');

    setProfile(INITIAL_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setExperience(INITIAL_EXPERIENCE);
    setCertifications(INITIAL_CERTIFICATIONS);
    setReviews(INITIAL_REVIEWS);
    setSubmissions([]);
    alert('Dynamic portfolio data successfully reset to clean default developer templates!');
  };

  // Submission Receivers from Client Components
  const handleContactSubmit = (data: Omit<ContactSubmission, 'id' | 'date' | 'isRead'>) => {
    const newSubmission: ContactSubmission = {
      id: `sub-${Date.now()}`,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      subject: data.subject,
      message: data.message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isRead: false
    };
    setSubmissions([newSubmission, ...submissions]);
  };

  const handleReviewSubmit = (reviewData: Omit<ClientReview, 'id' | 'date' | 'approved'>) => {
    const newReview: ClientReview = {
      id: `rev-${Date.now()}`,
      clientName: reviewData.clientName,
      clientRole: reviewData.clientRole,
      clientCompany: reviewData.clientCompany,
      rating: reviewData.rating,
      reviewText: reviewData.reviewText,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      approved: true // Automatically display, can manage/moderate inside CMS
    };
    setReviews([newReview, ...reviews]);
  };

  const unreadCount = submissions.filter(s => !s.isRead).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-black antialiased relative">
      {/* Top Header Navigation */}
      <Header
        profile={profile}
        onAdminClick={() => setIsCMSOpen(true)}
        unreadSubmissionsCount={unreadCount}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero profile={profile} />

        <Projects projects={projects} />

        <Experience experience={experience} />

        <Certifications certifications={certifications} />

        <ClientReviews
          reviews={reviews}
          onSubmitReview={handleReviewSubmit}
        />

        <Resume
          profile={profile}
          experience={experience}
          projects={projects}
        />

        <ContactForm
          profile={profile}
          onContactSubmit={handleContactSubmit}
        />
      </main>

      {/* Corporate design footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 text-center no-print" id="app-footer">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white tracking-tight">Sefat Ahmed Portfolio Workspace</h4>
            <p className="text-xs text-zinc-500 mt-1">Academic credentials & freelance operations</p>
          </div>

          <div className="flex items-center space-x-6 text-xs text-zinc-500">
            <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a>
            <a href={`https://${profile.googleSiteUrl}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-0.5">
              <span>Google Site Directory</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-4 px-4">
          <p>© {new Date().getFullYear()} Sefat Ahmed. Crafted with pride.</p>
          <button
            onClick={() => setIsCMSOpen(true)}
            className="inline-flex items-center space-x-1 hover:text-indigo-400 font-mono font-medium transition-colors cursor-pointer"
          >
            <ShieldCheck className="h-4.5 w-4.5 text-indigo-500" />
            <span>Launch CMS Security Portal</span>
          </button>
        </div>
      </footer>

      {/* Content Management System Modal dialog overlay */}
      <AnimatePresence>
        {isCMSOpen && (
          <CMSDialog
            isOpen={isCMSOpen}
            onClose={() => setIsCMSOpen(false)}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            projects={projects}
            onUpdateProjects={handleUpdateProjects}
            certifications={certifications}
            onUpdateCertifications={handleUpdateCertifications}
            reviews={reviews}
            onUpdateReviews={handleUpdateReviews}
            submissions={submissions}
            onUpdateSubmissions={handleUpdateSubmissions}
            onResetToDefaults={handleResetToDefaults}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
