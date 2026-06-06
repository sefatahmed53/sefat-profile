/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Award,
  Layers,
  Inbox,
  MessageSquare,
  User,
  Check,
  Save,
  RotateCcw,
  CheckSquare,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  LogOut,
  Lock,
  Compass
} from 'lucide-react';
import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  ProfileInfo,
  Project,
  FreelanceExperience,
  Certification,
  ClientReview,
  ContactSubmission
} from '../types';

interface CMSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
  onUpdateProfile: (p: ProfileInfo) => void;
  projects: Project[];
  onUpdateProjects: (proj: Project[]) => void;
  certifications: Certification[];
  onUpdateCertifications: (cert: Certification[]) => void;
  reviews: ClientReview[];
  onUpdateReviews: (reviews: ClientReview[]) => void;
  submissions: ContactSubmission[];
  onUpdateSubmissions: (subs: ContactSubmission[]) => void;
  onResetToDefaults: () => void;
  currentUser: FirebaseUser | null;
}

export default function CMSDialog({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  projects,
  onUpdateProjects,
  certifications,
  onUpdateCertifications,
  reviews,
  onUpdateReviews,
  submissions,
  onUpdateSubmissions,
  onResetToDefaults,
  currentUser
}: CMSDialogProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'certifications' | 'reviews' | 'inbox'>('certifications');

  // Form edit states
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certImage, setCertImage] = useState('');
  const [certLink, setCertLink] = useState('');
  const [certDesc, setCertDesc] = useState('');

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState<'UI/UX' | 'Graphic Design' | 'Brand Identity' | 'Web Design'>('UI/UX');
  const [projectRole, setProjectRole] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [projectTags, setProjectTags] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectLongDesc, setProjectLongDesc] = useState('');

  // Profile Edit
  const [profName, setProfName] = useState(profile.name);
  const [profTitle, setProfTitle] = useState(profile.title);
  const [profBio, setProfBio] = useState(profile.bio);
  const [profAvatar, setProfAvatar] = useState(profile.avatarUrl);
  const [profEmail, setProfEmail] = useState(profile.email);
  const [profGoogleSite, setProfGoogleSite] = useState(profile.googleSiteUrl);
  const [profAvailability, setProfAvailability] = useState(profile.availability);

  const isAdminUser = currentUser && (
    currentUser.email?.toLowerCase() === 'sefatahmed53@gmail.com'
  );

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      alert(`Sign in failed: ${e.message || e}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      alert(`Sign out failed: ${e.message || e}`);
    }
  };

  if (!isOpen) return null;

  // --- SECURITY GATE BLOCK ---
  if (!isAdminUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/98 backdrop-blur-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl space-y-6"
        >
          {/* Close button */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer hover:border-zinc-700 transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Secure Lock Icon Header */}
          <div className="mx-auto h-16 w-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            {currentUser ? <ShieldAlert className="h-8 w-8 animate-pulse" /> : <Lock className="h-7 w-7" />}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
              {currentUser ? 'Access Unauthorized' : 'Secure Admin Portal'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
              {currentUser 
                ? `You are authenticated as ${currentUser.email}, which is not registered as the administrator.`
                : 'Authorized transaction terminal for portfolio profile synchronization, projects, reviews governance, and email inbox records.'}
            </p>
          </div>

          {/* Sign In Options */}
          <div className="space-y-3 pt-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center space-x-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3 text-xs font-semibold text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-pointer"
                id="sign-in-google-btn"
              >
                <Compass className="h-4.5 w-4.5" />
                <span>Authorize with Google Account</span>
              </button>
            ) : (
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-zinc-850 hover:bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-white transition-all border border-zinc-800 cursor-pointer"
                >
                  <span>Switch Administrator Account</span>
                </button>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 hover:bg-red-950/40 px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Disconnect Credentials</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full text-zinc-500 hover:text-zinc-300 text-[11px] font-mono cursor-pointer transition-all pt-1 block"
            >
              Return back to public portfolio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Certification CRUD Handlers
  const handleStartAddCert = () => {
    setEditingCertId('NEW');
    setCertTitle('');
    setCertIssuer('');
    setCertDate('');
    setCertImage('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80');
    setCertLink('https://coursera.org/verify/');
    setCertDesc('');
  };

  const handleStartEditCert = (cert: Certification) => {
    setEditingCertId(cert.id);
    setCertTitle(cert.title);
    setCertIssuer(cert.issuer);
    setCertDate(cert.issueDate);
    setCertImage(cert.imageUrl);
    setCertLink(cert.verificationUrl);
    setCertDesc(cert.description || '');
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim() || !certIssuer.trim()) return;

    if (editingCertId === 'NEW') {
      const newCert: Certification = {
        id: `cert-${Date.now()}`,
        title: certTitle.trim(),
        issuer: certIssuer.trim(),
        issueDate: certDate.trim() || 'Date Pending',
        imageUrl: certImage.trim() || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80',
        verificationUrl: certLink.trim() || 'https://sites.google.com/diu.edu.bd/sefat1',
        description: certDesc.trim(),
      };
      onUpdateCertifications([...certifications, newCert]);
    } else {
      const updated = certifications.map((c) =>
        c.id === editingCertId
          ? {
              ...c,
              title: certTitle.trim(),
              issuer: certIssuer.trim(),
              issueDate: certDate.trim(),
              imageUrl: certImage.trim(),
              verificationUrl: certLink.trim(),
              description: certDesc.trim(),
            }
          : c
      );
      onUpdateCertifications(updated);
    }
    setEditingCertId(null);
  };

  const handleDeleteCert = (id: string) => {
    onUpdateCertifications(certifications.filter((c) => c.id !== id));
  };


  // Project CRUD Handlers
  const handleStartAddProj = () => {
    setEditingProjectId('NEW');
    setProjectTitle('');
    setProjectCategory('UI/UX');
    setProjectRole('Designer');
    setProjectYear('2025');
    setProjectImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80');
    setProjectTags('Figma, Research');
    setProjectLink('');
    setProjectDesc('');
    setProjectLongDesc('');
  };

  const handleStartEditProj = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectTitle(p.title);
    setProjectCategory(p.category);
    setProjectRole(p.role);
    setProjectYear(p.year);
    setProjectImage(p.imageUrl);
    setProjectTags(p.tags.join(', '));
    setProjectLink(p.link || '');
    setProjectDesc(p.description);
    setProjectLongDesc(p.longDescription || '');
  };

  const handleSaveProj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectDesc.trim()) return;

    const parsedTags = projectTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProjectId === 'NEW') {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectTitle.trim(),
        category: projectCategory,
        role: projectRole.trim(),
        year: projectYear.trim(),
        imageUrl: projectImage.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=400&q=80',
        tags: parsedTags,
        link: projectLink.trim() || undefined,
        isFeatured: true,
        description: projectDesc.trim(),
        longDescription: projectLongDesc.trim(),
      };
      onUpdateProjects([...projects, newProj]);
    } else {
      const updated = projects.map((p) =>
        p.id === editingProjectId
          ? {
              ...p,
              title: projectTitle.trim(),
              category: projectCategory,
              role: projectRole.trim(),
              year: projectYear.trim(),
              imageUrl: projectImage.trim(),
              tags: parsedTags,
              link: projectLink.trim() || undefined,
              description: projectDesc.trim(),
              longDescription: projectLongDesc.trim(),
            }
          : p
      );
      onUpdateProjects(updated);
    }
    setEditingProjectId(null);
  };

  const handleDeleteProj = (id: string) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
  };


  // Reviews Handle
  const handleToggleReviewApprove = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));
    onUpdateReviews(updated);
  };

  const handleDeleteReview = (id: string) => {
    onUpdateReviews(reviews.filter((r) => r.id !== id));
  };


  // Inbox handlers
  const handleMarkAsRead = (id: string) => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, isRead: true } : s));
    onUpdateSubmissions(updated);
  };

  const handleDeleteSubmission = (id: string) => {
    onUpdateSubmissions(submissions.filter((s) => s.id !== id));
  };


  // Profile save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: profName.trim(),
      title: profTitle.trim(),
      bio: profBio.trim(),
      avatarUrl: profAvatar.trim(),
      email: profEmail.trim(),
      googleSiteUrl: profGoogleSite.trim(),
      availability: profAvailability as ProfileInfo['availability'],
    });
    alert('Primary Profile Config Saved Successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md">
      <div className="relative flex flex-col h-[90vh] w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden text-left shadow-2xl">
        {/* Header Block Dashboard */}
        <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Portfolio Content Control Center (CMS)</h2>
            <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase font-semibold">Active Mode</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (confirm('Revert all profile config, project records, reviews & certificate urls back to initial developer presets? All custom edits will be wiped.')) {
                  onResetToDefaults();
                  onClose();
                }
              }}
              className="flex items-center space-x-1 border border-zinc-800 hover:border-zinc-700 bg-zinc-900 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Reset configuration defaults & seeds"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
              <span>Reset Portfolio Seeds</span>
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer hover:border-zinc-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Master CMS Workspace split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Vertical Navigation Rail */}
          <div className="w-1/4 min-w-[200px] border-r border-zinc-800 bg-zinc-950/50 p-4 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('certifications'); setEditingCertId(null); }}
                className={`w-full flex items-center space-x-2.5 rounded-lg px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-all ${
                  activeTab === 'certifications'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Certifications</span>
                <span className="ml-auto text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-500 font-mono">
                  {certifications.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('projects'); setEditingProjectId(null); }}
                className={`w-full flex items-center space-x-2.5 rounded-lg px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-all ${
                  activeTab === 'projects'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Projects Showcase</span>
                <span className="ml-auto text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-500 font-mono">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('profile'); }}
                className={`w-full flex items-center space-x-2.5 rounded-lg px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-all ${
                  activeTab === 'profile'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => { setActiveTab('reviews'); }}
                className={`w-full flex items-center space-x-2.5 rounded-lg px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Client Recommendations</span>
                {reviews.filter(r => !r.approved).length > 0 && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-amber-500" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('inbox'); }}
                className={`w-full flex items-center space-x-2.5 rounded-lg px-3.5 py-2.5 text-xs font-medium cursor-pointer transition-all ${
                  activeTab === 'inbox'
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <Inbox className="h-4 w-4" />
                <span>Submissions Inbox</span>
                {submissions.filter(s => !s.isRead).length > 0 && (
                  <span className="ml-auto bg-indigo-500 text-white font-bold h-4 w-4 flex items-center justify-center rounded-full text-[9px] font-mono">
                    {submissions.filter(s => !s.isRead).length}
                  </span>
                )}
              </button>
            </div>

            {/* Sidebar bottom guide */}
            <div className="rounded-xl border border-zinc-850 p-4 font-normal text-[11px] text-zinc-500 tracking-normal space-y-2">
              <span className="font-semibold text-zinc-400 flex items-center gap-1">⚡ Offline-Persistent</span>
              <p>State edits persist automatically on save to browser LocalStorage. Client can view them live instantly.</p>
            </div>
          </div>

          {/* Right main workspace viewport */}
          <div className="flex-1 p-6 overflow-y-auto bg-zinc-900/60" id="cms-main-content">
            {/* 1. CERTIFICATIONS CRUD PANEL */}
            {activeTab === 'certifications' && (
              <div className="space-y-6">
                {editingCertId ? (
                   // Form edit certified
                  <form onSubmit={handleSaveCert} className="space-y-4 rounded-xl border border-zinc-850 bg-zinc-900 p-5">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-805">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        <Edit3 className="h-4 w-4 text-indigo-400" />
                        <span>{editingCertId === 'NEW' ? 'Add Certification' : 'Update Certification'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingCertId(null)}
                        className="text-xs text-zinc-500 hover:text-white font-medium"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Certification Title *</label>
                        <input
                          type="text"
                          required
                          value={certTitle}
                          onChange={(e) => setCertTitle(e.target.value)}
                          placeholder="e.g. Google UX Design Certificate"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Issuing Organization *</label>
                        <input
                          type="text"
                          required
                          value={certIssuer}
                          onChange={(e) => setCertIssuer(e.target.value)}
                          placeholder="e.g. Google Career Certificates"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Issue Date</label>
                        <input
                          type="text"
                          value={certDate}
                          onChange={(e) => setCertDate(e.target.value)}
                          placeholder="e.g. October 2024"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Verify Link / credential Url</label>
                        <input
                          type="url"
                          value={certLink}
                          onChange={(e) => setCertLink(e.target.value)}
                          placeholder="https://coursera.org/verify/..."
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Credential Image URL (Replace to showcase image)</label>
                      <input
                        type="text"
                        value={certImage}
                        onChange={(e) => setCertImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                      />
                      <p className="text-[10px] text-zinc-500 mt-1 font-mono">Provide any valid absolute image link from Unsplash, Imgur or Google Drive.</p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Brief Description (Optional)</label>
                      <textarea
                        rows={2}
                        value={certDesc}
                        onChange={(e) => setCertDesc(e.target.value)}
                        className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold rounded-lg px-4 py-2 cursor-pointer"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Credentials</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // List current certs
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">Edit Certifications Image & Links</h3>
                        <p className="text-xs text-zinc-400">Update credential images, certificate verifications, or remove academic records instantly from your portfolio.</p>
                      </div>
                      <button
                        onClick={handleStartAddCert}
                        className="flex items-center space-x-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-indigo-500/20 text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-3 py-2 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Credential</span>
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1">
                      {certifications.map((c) => (
                        <div key={c.id} className="rounded-xl border border-zinc-850 p-4 bg-zinc-950/40 flex items-center justify-between gap-4">
                          <div className="flex items-center space-x-3.5">
                            <div className="h-14 w-20 bg-zinc-900 border border-zinc-800 overflow-hidden rounded-lg flex-shrink-0">
                              <img src={c.imageUrl} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{c.title}</h4>
                              <p className="text-[10px] text-zinc-500 font-medium">Issuer: <span className="text-zinc-400">{c.issuer}</span> | Date: {c.issueDate}</p>
                              <a href={c.verificationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[9px] font-mono text-indigo-400 mt-1 hover:underline">
                                Valid Verification Link <ExternalLink className="h-2 w-2 ml-1" />
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleStartEditCert(c)}
                              className="p-1.5 hover:bg-zinc-850 rounded border border-zinc-800 hover:border-zinc-750 text-zinc-350 hover:text-white cursor-pointer"
                              title="Edit Certification Details"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove custom certification: ${c.title}?`)) {
                                  handleDeleteCert(c.id);
                                }
                              }}
                              className="p-1.5 hover:bg-red-950 border border-zinc-800 hover:border-red-900 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                              title="Delete Certification"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {certifications.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-zinc-800 p-4 rounded-xl">
                          <p className="text-xs text-zinc-500">No certifications are currently displayed. Click Add Credential to start.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. PROJECTS CRUD INDEX */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {editingProjectId ? (
                  // Project edit form
                  <form onSubmit={handleSaveProj} className="space-y-4 rounded-xl border border-zinc-850 bg-zinc-900 p-5">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-805">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        <Edit3 className="h-4 w-4 text-indigo-400" />
                        <span>{editingProjectId === 'NEW' ? 'Create Project Catalog' : 'Update Project Catalog'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setEditingProjectId(null)}
                        className="text-xs text-zinc-500 hover:text-white font-medium"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                          placeholder="e.g. Aura Meditation App"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 animate-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Category *</label>
                        <select
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value as any)}
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        >
                          <option value="UI/UX">UI/UX Design</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Brand Identity">Brand Identity</option>
                          <option value="Web Design">Web Design</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">My Role *</label>
                        <input
                          type="text"
                          required
                          value={projectRole}
                          onChange={(e) => setProjectRole(e.target.value)}
                          placeholder="e.g. Lead Designer"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Year</label>
                        <input
                          type="text"
                          value={projectYear}
                          onChange={(e) => setProjectYear(e.target.value)}
                          placeholder="e.g. 2025"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Link URL</label>
                        <input
                          type="text"
                          value={projectLink}
                          onChange={(e) => setProjectLink(e.target.value)}
                          placeholder="https://behance.net/..."
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Thumbnail Cover URL (Unsplash or direct link)</label>
                        <input
                          type="text"
                          value={projectImage}
                          onChange={(e) => setProjectImage(e.target.value)}
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Tags (Comma-separated)</label>
                        <input
                          type="text"
                          value={projectTags}
                          onChange={(e) => setProjectTags(e.target.value)}
                          placeholder="e.g. Mobile App, Branding, Figma"
                          className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Short Description (Displays in card grid) *</label>
                      <input
                        type="text"
                        required
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        placeholder="Keep this around 1-2 sentence overview..."
                        className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Long Description & Case Study Writeup (Modal view)</label>
                      <textarea
                        rows={4}
                        value={projectLongDesc}
                        onChange={(e) => setProjectLongDesc(e.target.value)}
                        placeholder="In-depth explanation covering objectives, design problems, typography, or visual wireframes..."
                        className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold rounded-lg px-4 py-2 cursor-pointer"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Publish Work</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // List current projects items
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">Showcase Projects Index</h3>
                        <p className="text-xs text-zinc-400">Edit design works, branding packages, categories, or upload fresh mockups.</p>
                      </div>
                      <button
                        onClick={handleStartAddProj}
                        className="flex items-center space-x-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-indigo-500/20 text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-3 py-2 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.map((p) => (
                        <div key={p.id} className="rounded-xl border border-zinc-850 p-4 bg-zinc-950/40 flex items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="h-12 w-16 rounded overflow-hidden bg-zinc-900 border border-zinc-800">
                              <img src={p.imageUrl} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{p.title}</h4>
                              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Role: <span className="text-indigo-400">{p.role}</span> | Category: <span className="text-zinc-400">{p.category}</span></p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {p.tags.map((t) => (
                                  <span key={t} className="text-[8px] font-mono text-zinc-500 bg-zinc-900 px-1 py-0.2 rounded border border-zinc-850">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleStartEditProj(p)}
                              className="p-1.5 hover:bg-zinc-850 rounded border border-zinc-800 text-zinc-350 hover:text-white cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove showcase project: "${p.title}"?`)) {
                                  handleDeleteProj(p.id);
                                }
                              }}
                              className="p-1.5 hover:bg-red-950 border border-zinc-800 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {projects.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-zinc-800 p-4 rounded-xl">
                          <p className="text-xs text-zinc-500">No project works available. Click Add Project to start building your gallery!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-5 rounded-xl border border-zinc-850 bg-zinc-950/20 p-5">
                <div>
                  <h3 className="text-base font-bold text-white">General Portfolio bio & Info</h3>
                  <p className="text-xs text-zinc-400 mt-1">Configure core copy, profile avatar url, emails and references.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Developer-Designer Name</label>
                    <input
                      type="text"
                      required
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Professional Title</label>
                    <input
                      type="text"
                      required
                      value={profTitle}
                      onChange={(e) => setProfTitle(e.target.value)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Corporate Email Address</label>
                    <input
                      type="email"
                      required
                      value={profEmail}
                      onChange={(e) => setProfEmail(e.target.value)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Google Sites Profile Link (Sefat's Corporate site)</label>
                    <input
                      type="text"
                      required
                      value={profGoogleSite}
                      onChange={(e) => setProfGoogleSite(e.target.value)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Availability Status</label>
                    <select
                      value={profAvailability}
                      onChange={(e) => setProfAvailability(e.target.value as any)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    >
                      <option value="Available">Available for Freelance Projects</option>
                      <option value="Fully Booked">Fully Booked / No work accepted</option>
                      <option value="Part-time">Part-time consultations only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Avatar Image URL</label>
                    <input
                      type="text"
                      required
                      value={profAvatar}
                      onChange={(e) => setProfAvatar(e.target.value)}
                      className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Hero Section Bio Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={profBio}
                    onChange={(e) => setProfBio(e.target.value)}
                    className="w-full rounded bg-zinc-950 border border-zinc-800 p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2 border-t border-zinc-850">
                  <button
                    type="submit"
                    className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold rounded-lg px-5 py-2.5 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Profile Overrides</span>
                  </button>
                </div>
              </form>
            )}

            {/* 4. CLIENT RECOMMENDATIONS MODERATION */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Client Review Moderation</h3>
                  <p className="text-xs text-zinc-400 mt-1">Approve or hide submissions submitted dynamically by freelance clients on your portfolio recommendation form.</p>
                </div>                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-xl border border-zinc-850 p-4 bg-zinc-950/40 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white">{r.clientName}</span>
                          <span className="text-[10px] font-mono text-zinc-500">({r.clientRole} @ {r.clientCompany})</span>
                          <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 rounded font-semibold font-mono flex items-center gap-1">
                            ⭐️ {r.rating} / 5
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 italic">"{r.reviewText}"</p>
                        <p className="text-[9px] font-mono text-zinc-650">Submited on {r.date}</p>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleToggleReviewApprove(r.id)}
                          className={`flex items-center space-x-1 rounded px-2.5 py-1 text-[10px] font-bold border transition-colors cursor-pointer ${
                            r.approved
                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-zinc-900 hover:text-zinc-400 hover:border-zinc-800'
                              : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                          <span>{r.approved ? 'Approved (Click Hide)' : 'Approve Review'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          className="p-1.5 hover:bg-red-950 hover:text-red-400 rounded text-zinc-500 transition-colors border border-zinc-800 cursor-pointer"
                          title="Delete Recommendation"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {reviews.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
                      <p className="text-xs text-zinc-500">No client feedback scores left yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. INBOX SUBMISSIONS FOR CONTACT SUBMIT */}
            {activeTab === 'inbox' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Dynamic Contact Submissions Inbox</h3>
                  <p className="text-xs text-zinc-400 mt-1">Review contact inquiries submmited by user/client leads dynamically on this browser session.</p>
                </div>

                <div className="space-y-3">
                  {submissions.map((s) => (
                    <div key={s.id} className="rounded-xl border border-zinc-850 p-4 bg-zinc-950/40 relative">
                      {!s.isRead && (
                        <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-indigo-500" />
                      )}

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-805 pb-2">
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-white">{s.subject}</h4>
                            <p className="text-[10px] text-zinc-500">
                              Sender: <span className="text-zinc-300 font-semibold">{s.senderName}</span> | Email:{' '}
                              <a href={`mailto:${s.senderEmail}`} className="text-indigo-400 hover:underline">
                                {s.senderEmail}
                              </a>
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-600">{s.date}</span>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-2.5 rounded border border-zinc-850/40">
                          {s.message}
                        </p>

                        <div className="flex justify-end gap-2 text-[10px]">
                          {!s.isRead && (
                            <button
                              onClick={() => handleMarkAsRead(s.id)}
                              className="text-indigo-400 font-bold hover:underline"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('Delete this user inquiry permanently?')) {
                                handleDeleteSubmission(s.id);
                              }
                            }}
                            className="text-red-400 hover:underline flex items-center gap-0.5 ml-2"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {submissions.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-zinc-850 rounded-xl text-zinc-500 text-sm">
                      <Inbox className="h-8 w-8 mx-auto text-zinc-700 mb-3 animate-pulse" />
                      No contact mail logs stored in this session yet. Test the contact form below and check back!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
