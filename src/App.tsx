/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Award,
  Clock,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUp,
  UserCheck,
  Search,
  SlidersHorizontal,
  ChevronUp
} from 'lucide-react';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from './firebase';

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
  INITIAL_REVIEWS
} from './data';

import {
  seedInitialFirestoreData,
  fetchProfileInfo,
  updateProfileInfo,
  fetchProjects,
  saveProject,
  deleteProject,
  fetchCertifications,
  saveCertification,
  deleteCertification,
  fetchReviews,
  saveReview,
  deleteReview,
  fetchSubmissions,
  saveContactSubmission,
  markSubmissionRead,
  deleteSubmission,
  fetchSocialLinks,
  SocialLinks
} from './firebaseUtils';

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
  // Core Portfolio States
  const [profile, setProfile] = useState<ProfileInfo>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experience, setExperience] = useState<FreelanceExperience[]>(INITIAL_EXPERIENCE);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);
  const [reviews, setReviews] = useState<ClientReview[]>(INITIAL_REVIEWS);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: 'https://www.facebook.com/sefatahmed53/',
    linkedin: 'https://www.linkedin.com/in/sefat-ahmed/',
    github: 'https://github.com',
    email: 'sefatahmed53@gmail.com',
    googleSite: 'sites.google.com/diu.edu.bd/sefat1'
  });

  // Auth & UI control states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active page state corresponding to header links or home overview
  const [activeTab, setActiveTab2] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return ['projects', 'experience', 'certifications', 'reviews', 'resume', 'contact'].includes(hash) ? hash : 'home';
  });

  const setActiveTab = (tab: string) => {
    setActiveTab2(tab);
    window.location.hash = tab === 'home' ? '' : `#${tab}`;
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['projects', 'experience', 'certifications', 'reviews', 'resume', 'contact'].includes(hash)) {
        setActiveTab2(hash);
        window.scrollTo({ top: 0 });
      } else {
        setActiveTab2('home');
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // --- SCROLL WATCHER ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FIREBASE DATA SYNC ---
  useEffect(() => {
    const bootstrapPublicData = async () => {
      try {
        setAppLoading(true);
        
        const currentProfile = await fetchProfileInfo();
        setProfile(currentProfile);

        const currentProj = await fetchProjects();
        if (currentProj.length > 0) setProjects(currentProj);

        const currentCerts = await fetchCertifications();
        if (currentCerts.length > 0) setCertifications(currentCerts);

        const currentReviews = await fetchReviews(false); // Guest gets approved-only
        if (currentReviews.length > 0) setReviews(currentReviews);

        const initialSocials = await fetchSocialLinks();
        setSocialLinks(initialSocials);

      } catch (e) {
        console.error('Firebase offline or public loading failed. Falling back to local data.', e);
      } finally {
        setTimeout(() => {
          setAppLoading(false);
        }, 1200);
      }
    };

    bootstrapPublicData();

    // Setup active real-time firestore listeners with proper error boundaries
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snap) => {
      if (!snap.empty) {
        const loaded: Project[] = [];
        snap.forEach(docSnap => loaded.push(docSnap.data() as Project));
        setProjects(loaded);
      }
    }, (error) => {
      console.warn('Projects snapshot listener permission error or offline:', error);
    });

    const unsubCerts = onSnapshot(collection(db, 'certificates'), (snap) => {
      if (!snap.empty) {
        const loaded: Certification[] = [];
        snap.forEach(docSnap => loaded.push(docSnap.data() as Certification));
        setCertifications(loaded);
      }
    }, (error) => {
      console.warn('Certifications snapshot listener permission error or offline:', error);
    });

    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snap) => {
      if (!snap.empty) {
        const loaded: ClientReview[] = [];
        snap.forEach(docSnap => loaded.push(docSnap.data() as ClientReview));
        setReviews(loaded);
      }
    }, (error) => {
      console.warn('Reviews snapshot listener permission error or offline:', error);
    });

    const unsubProfile = onSnapshot(doc(db, 'settings', 'profile'), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as ProfileInfo);
      }
    }, (error) => {
      console.warn('Profile settings snapshot listener permission error or offline:', error);
    });

    return () => {
      unsubProjects();
      unsubCerts();
      unsubReviews();
      unsubProfile();
    };
  }, []);

  // --- FIREBASE AUTH WATCHER ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  // --- FIREBASE ADMIN SYNC (ROLE-BASED SEEDING & INBOX) ---
  useEffect(() => {
    if (!currentUser) {
      setSubmissions([]);
      return;
    }

    const emailLow = currentUser.email?.toLowerCase();
    const isAdminUser = emailLow === 'sefatahmed53@gmail.com';

    if (!isAdminUser) {
      setSubmissions([]);
      return;
    }

    // Authenticated admin context
    const bootstrapAdminData = async () => {
      try {
        // Core Write/Seed actions ONLY initiated by verified authenticated owner
        await seedInitialFirestoreData();

        // Fetch direct inbox entries
        const initialSubmissions = await fetchSubmissions();
        setSubmissions(initialSubmissions);

        // Fetch including pending reviews for approval moderation
        const currentReviews = await fetchReviews(true);
        if (currentReviews.length > 0) setReviews(currentReviews);

      } catch (e) {
        console.error('Admin resource bootstrapping failed:', e);
      }
    };

    bootstrapAdminData();

    // Setup active real-time firestore listener on private submissions
    const unsubMessages = onSnapshot(
      collection(db, 'contactMessages'),
      (snap) => {
        const loaded: ContactSubmission[] = [];
        snap.forEach(docSnap => loaded.push(docSnap.data() as ContactSubmission));
        setSubmissions(loaded.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      },
      (error) => {
        console.warn('Admin messages snapshot listener permission error or offline:', error);
      }
    );

    return () => {
      unsubMessages();
    };
  }, [currentUser]);

  // --- DATABASE CMS MUTATION WRAPPERS ---
  const handleUpdateProfile = async (newProfile: ProfileInfo) => {
    setProfile(newProfile);
    try {
      await updateProfileInfo(newProfile);
    } catch (e) {
      console.error('Failed to update profile in Firestore:', e);
    }
  };

  const handleUpdateProjects = async (newProjects: Project[]) => {
    const currentIds = projects.map(p => p.id);
    const newIds = newProjects.map(p => p.id);

    // Deleted
    const deletedIds = currentIds.filter(id => !newIds.includes(id));
    for (const dId of deletedIds) {
      await deleteProject(dId).catch(err => console.error(err));
    }

    // Saved/Updated
    for (const p of newProjects) {
      const existing = projects.find(ep => ep.id === p.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(p)) {
        await saveProject(p).catch(err => console.error(err));
      }
    }
    setProjects(newProjects);
  };

  const handleUpdateCertifications = async (newCerts: Certification[]) => {
    const currentIds = certifications.map(c => c.id);
    const newIds = newCerts.map(c => c.id);

    // Deleted
    const deletedIds = currentIds.filter(id => !newIds.includes(id));
    for (const dId of deletedIds) {
      await deleteCertification(dId).catch(err => console.error(err));
    }

    // Saved/Updated
    for (const c of newCerts) {
      const existing = certifications.find(ec => ec.id === c.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(c)) {
        await saveCertification(c).catch(err => console.error(err));
      }
    }
    setCertifications(newCerts);
  };

  const handleUpdateReviews = async (newReviews: ClientReview[]) => {
    const currentIds = reviews.map(r => r.id);
    const newIds = newReviews.map(r => r.id);

    // Deleted
    const deletedIds = currentIds.filter(id => !newIds.includes(id));
    for (const dId of deletedIds) {
      await deleteReview(dId).catch(err => console.error(err));
    }

    // Saved/Updated
    for (const r of newReviews) {
      const existing = reviews.find(er => er.id === r.id);
      if (!existing || JSON.stringify(existing) !== JSON.stringify(r)) {
        await saveReview(r).catch(err => console.error(err));
      }
    }
    setReviews(newReviews);
  };

  const handleUpdateSubmissions = async (newSubs: ContactSubmission[]) => {
    const currentIds = submissions.map(s => s.id);
    const newIds = newSubs.map(s => s.id);

    // Deleted
    const deletedIds = currentIds.filter(id => !newIds.includes(id));
    for (const dId of deletedIds) {
      await deleteSubmission(dId).catch(err => console.error(err));
    }

    // Modified (e.g. marked read)
    for (const s of newSubs) {
      const existing = submissions.find(es => es.id === s.id);
      if (existing && existing.isRead !== s.isRead) {
        await markSubmissionRead(s.id, s.isRead).catch(err => console.error(err));
      }
    }
    setSubmissions(newSubs);
  };

  // --- REVIEWS & SUBMISSIONS RECEIVED FROM PUBLIC CLIENT ---
  const handleContactSubmit = async (data: Omit<ContactSubmission, 'id' | 'date' | 'isRead'>) => {
    const timestampId = `sub-${Date.now()}`;
    const newSubmission: ContactSubmission = {
      id: timestampId,
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

    // Save to Firestore with clean fallback
    await saveContactSubmission(newSubmission);
    // Update local state is automatically bound via snapshot, but doing it manually in case of quick updates:
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const handleReviewSubmit = async (reviewData: Omit<ClientReview, 'id' | 'date' | 'approved'>) => {
    const timestampId = `rev-${Date.now()}`;
    const newReview: ClientReview = {
      id: timestampId,
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
      approved: false // Moderation pipeline - Pending until Admin manual approval
    };

    await saveReview(newReview);
    // Notify client review was queued for moderation
    alert('Thank you for your valuable feedback! Your review has been submitted to Md. Sakir Ahmed Sefat for approval moderation.');
  };

  const unreadCount = submissions.filter(s => !s.isRead).length;

  // Filter projects by category and text search query
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans selection:bg-[#00E5FF] selection:text-black antialiased relative overflow-x-hidden">
      
      {/* 2. LOADING SCREEN PRELOADER */}
      <AnimatePresence>
        {appLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0A0A0A] z-50 flex flex-col items-center justify-center"
            id="app-preloader"
          >
            <div className="relative flex flex-col items-center">
              {/* Dynamic shining tech blobs */}
              <div className="absolute w-44 h-44 rounded-full bg-[#00E5FF]/10 blur-2xl animate-pulse" />
              <div className="absolute w-32 h-32 rounded-full bg-[#7C4DFF]/10 blur-xl animate-bounce" />

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-t-2 border-r-2 border-[#00E5FF] border-b border-l border-[#7C4DFF]/10"
              />
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-lg font-display font-bold tracking-widest mt-6 uppercase"
              >
                Md. Sakir Ahmed Sefat
              </motion.h2>
              <p className="text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase mt-1 animate-pulse">
                Technology, Finance Automation & Corporate ERP
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. DYNAMIC AMBIENT BACKGROUND ANIMATOR (TAB-REACTIVE) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {activeTab === 'home' && (
              <>
                {/* Cybernetic Cosmic Orbs */}
                <motion.div
                  animate={{ 
                    x: [0, 40, -20, 0], 
                    y: [0, -50, 30, 0],
                    scale: [1, 1.1, 0.9, 1] 
                  }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
                  className="absolute top-[12%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#00E5FF]/8 blur-[130px]"
                />
                <motion.div
                  animate={{ 
                    x: [0, -30, 50, 0], 
                    y: [0, 40, -40, 0],
                    scale: [1, 0.95, 1.05, 1] 
                  }}
                  transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
                  className="absolute top-[48%] right-[-10%] w-[480px] h-[480px] rounded-full bg-[#7C4DFF]/6 blur-[110px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.06]" />
              </>
            )}

            {activeTab === 'projects' && (
              <>
                {/* Cyan Grid Node Arrays */}
                <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.07]" />
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                  className="absolute -top-[10%] right-[10%] w-[600px] h-[600px] border border-[#00E5FF]/10 rounded-full flex items-center justify-center blur-sm"
                >
                  <div className="w-[450px] h-[450px] border border-[#00E5FF]/5 rounded-full" />
                  <div className="w-[300px] h-[300px] border border-[#7C4DFF]/5 rounded-full border-dashed" />
                </motion.div>
                <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
              </>
            )}

            {activeTab === 'experience' && (
              <>
                {/* Moving Laser Stream lines */}
                <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,#18181b_25%,#18181b_26%,transparent_27%,transparent_74%,#18181b_75%,#18181b_76%,transparent_77%)] bg-[size:50px_50px] opacity-10" />
                <div className="absolute top-[20%] left-[10%] right-[10%] h-[350px] bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-transparent blur-[80px]" />
                <motion.div
                  animate={{ y: [-100, 1000] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="absolute left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/15 to-transparent shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                />
                <motion.div
                  animate={{ y: [1000, -100] }}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  className="absolute left-1/3 right-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#7C4DFF]/15 to-transparent shadow-[0_0_15px_rgba(124,77,255,0.4)]"
                />
              </>
            )}

            {activeTab === 'certifications' && (
              <>
                {/* Golden/Indigo radiant glowing waves */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.02)_0%,transparent_70%)]" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                  className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-yellow-500/[0.03] blur-[150px]"
                />
                <motion.div
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[120px]"
                />
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                {/* Speech heartbeat pulse ripples */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#111827_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1.8],
                      opacity: [0.5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeOut' }}
                    className="absolute w-[300px] h-[300px] border border-[#7C4DFF]/10 rounded-full animate-pulse"
                  />
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1.8],
                      opacity: [0.4, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4, delay: 2, ease: 'easeOut' }}
                    className="absolute w-[300px] h-[300px] border border-[#00E5FF]/10 rounded-full animate-pulse"
                  />
                </div>
                <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#7C4DFF]/4 blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#00E5FF]/4 blur-[100px]" />
              </>
            )}

            {activeTab === 'resume' && (
              <>
                {/* Blueprint drafting markers & alignment lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:100px_100px] opacity-40" />
                <div className="absolute top-[10%] left-1/4 w-[1px] h-full bg-zinc-900" />
                <div className="absolute top-[10%] right-1/4 w-[1px] h-full bg-zinc-900" />
                <div className="absolute top-[150px] left-0 right-0 h-[1px] bg-zinc-900" />
                <div className="absolute top-[400px] left-0 right-0 h-[1px] bg-zinc-900" />
                <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-zinc-800/[0.02] border border-zinc-900 blur-[2px]" />
              </>
            )}

            {activeTab === 'contact' && (
              <>
                {/* Pulsing signal radars */}
                <div className="absolute inset-0 bg-[radial-gradient(#111827_2px,transparent_2px)] bg-[size:20px_20px] opacity-25" />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2">
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      animate={{ 
                        scale: [0.5, 3],
                        opacity: [0.4, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 6, delay: (ring - 1) * 2, ease: 'easeOut' }}
                      className="absolute w-[400px] h-[400px] rounded-full border border-[#00E5FF]/10 -translate-x-1/2 -translate-y-1/2"
                    />
                  ))}
                </div>
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#00E5FF]/4 blur-[110px]" />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* App Header Navigation */}
      <Header
        profile={profile}
        onAdminClick={() => setIsCMSOpen(true)}
        unreadSubmissionsCount={unreadCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container Layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <>
                {/* Dynamic Hero with high premium layout */}
                <Hero profile={profile} onTabChange={setActiveTab} />

                {/* 5. DYNAMIC STATS COCOUNTERS BANNER SECTION */}
                <section className="bg-[#111827]/30 border-y border-zinc-850 py-12 px-4 shadow-xl">
                  <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Completed Projects', value: projects.length, icon: Layers, desc: 'Digital products built', color: 'text-[#00E5FF]', action: () => setActiveTab('projects') },
                      { label: 'Professional Certifications', value: certifications.length, icon: Award, desc: 'Illustrator, AI & Analytics', color: 'text-[#7C4DFF]', action: () => setActiveTab('certifications') },
                      { label: 'Freelance & Club Contracts', value: experience.length + 3, icon: Briefcase, desc: 'Successful corporate assets', color: 'text-[#00E5FF]', action: () => setActiveTab('experience') },
                      { label: 'Verified Client Reviews', value: reviews.filter(r=>r.approved).length, icon: UserCheck, desc: 'Approved testimonials', color: 'text-[#7C4DFF]', action: () => setActiveTab('reviews') }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start space-x-3.5 p-4 rounded-2xl bg-[#111827]/40 border border-zinc-800/40 hover:border-[#00E5FF]/20 cursor-pointer hover:bg-[#111827]/60 transition-all duration-300 group"
                        onClick={stat.action}
                      >
                        <div className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-805 group-hover:border-[#00E5FF]/30 transition-all ${stat.color}`}>
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center">
                            <span>{stat.value}</span>
                            <span className="text-[#00E5FF] text-xl ml-0.5">+</span>
                          </h4>
                          <p className="text-xs font-semibold text-zinc-350 mt-0.5">{stat.label}</p>
                          <p className="text-[10px] font-mono text-zinc-500">{stat.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* FEATURED INSIGHT SECTION */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center bg-[#111827]/10 border border-zinc-800/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-3xl -z-10" />
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase">About Md. Sakir Ahmed Sefat</span>
                      <h2 className="text-3xl font-display font-extrabold tracking-tight text-white mt-1.5 leading-tight">
                        Pioneering Advanced Business Automation & Finance Automation
                      </h2>
                      <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                        With a specialization in corporate BBA Fintech/Finance and seasoned hands-on experience in business orchestration, Md. Sakir designs high-end portfolio solutions. From modern corporate sites to robust ledger reconciliations and analytics portfolios, each venture represents clean, scalable code and beautiful responsive craftsmanship.
                      </p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <button
                          onClick={() => setActiveTab('projects')}
                          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] hover:brightness-110 text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
                        >
                          Explore Projects
                        </button>
                        <button
                          onClick={() => setActiveTab('contact')}
                          className="px-5 py-3 rounded-xl border border-zinc-700 hover:border-[#00E5FF]/30 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer bg-[#111827]/45"
                        >
                          Initiate Conversation
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Data Analytics', text: 'Proficient in financial modeling, pivot spreadsheets & corporate spreadsheets.', icon: '📊' },
                        { title: 'Brand Identity', text: 'Expert Adobe Illustrator designer and developer of rich business identities.', icon: '🎨' },
                        { title: 'Automation Labs', text: 'Integrating automated newsletters, workflow systems & smart web portals.', icon: '⚡' },
                        { title: 'Security First', text: 'Implementing secure role-based portals and private communication grids.', icon: '🛡️' }
                      ].map((card, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors">
                          <span className="text-3xl">{card.icon}</span>
                          <div className="mt-4">
                            <h5 className="text-xs font-bold uppercase text-white tracking-wider">{card.title}</h5>
                            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{card.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'projects' && (
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" id="projects">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800/80 pb-5 mb-8 gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5FF] flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Showcased Ventures</span>
                    </span>
                    <h2 className="text-3xl font-display font-extrabold text-white tracking-tight mt-1">
                      Dynamic Portfolios
                    </h2>
                  </div>

                  {/* Filter and search utilities */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Query projects or tags..."
                        className="bg-[#111827] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF] transition-all w-full sm:w-52"
                      />
                    </div>

                    {/* Category pill selects */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
                      {['All', 'UI/UX', 'Web Design', 'Brand Identity'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                            selectedCategory === cat 
                              ? 'bg-[#00E5FF] text-black font-bold' 
                              : 'bg-[#111827] text-zinc-400 hover:text-white border border-zinc-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Render projects with filtering bounds applied */}
                <Projects projects={filteredProjects} />
                {filteredProjects.length === 0 && (
                  <div className="text-center py-20 bg-[#111827]/40 border border-zinc-805 rounded-xl">
                    <p className="text-sm font-semibold text-zinc-400">No projects match your current filter parameters or query.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                      className="mt-3 text-xs text-[#00E5FF] hover:underline cursor-pointer"
                    >
                      Clear all active search filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <Experience experience={experience} />
            )}

            {activeTab === 'certifications' && (
              <Certifications certifications={certifications} />
            )}

            {activeTab === 'reviews' && (
              <ClientReviews
                reviews={reviews}
                onSubmitReview={handleReviewSubmit}
              />
            )}

            {activeTab === 'resume' && (
              <Resume
                profile={profile}
                experience={experience}
                projects={projects}
              />
            )}

            {activeTab === 'contact' && (
              <ContactForm
                profile={profile}
                onContactSubmit={handleContactSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Details */}
      <footer className="bg-[#0A0A0A] border-t border-zinc-900 py-12 px-4 text-center no-print" id="app-footer">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white tracking-tight">Md. Sakir Ahmed Sefat</h4>
            <p className="text-xs text-zinc-500 mt-1">Technology integration & freelance business automation pipelines</p>
          </div>

          <div className="flex items-center space-x-6 text-xs text-zinc-500">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-[#00E5FF] transition-colors">GitHub</a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-[#00E5FF] transition-colors">Facebook</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#00E5FF] transition-colors">LinkedIn</a>
            <a href={`https://${socialLinks.googleSite}`} target="_blank" rel="noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-0.5">
              <span>Google Site</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 gap-4 px-4">
          <p>© {new Date().getFullYear()} Md. Sakir Ahmed Sefat. All rights reserved.</p>
          <button
            onClick={() => setIsCMSOpen(true)}
            className="inline-flex items-center space-x-1 hover:text-[#00E5FF] font-mono font-medium transition-colors cursor-pointer border border-[#00E5FF]/20 px-3 py-1.5 rounded-lg bg-[#111827]"
          >
            <ShieldCheck className="h-4 w-4 text-[#00E5FF]" />
            <span>Launch Security Portal</span>
          </button>
        </div>
      </footer>

      {/* 7. BACK TO TOP CORNER BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#111827] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black hover:scale-105 border border-zinc-805 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            title="Scroll to Top"
            id="back-to-top-button"
          >
            <ChevronUp className="h-4.5 w-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dynamic Content Management System Modal Dialog */}
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
            currentUser={currentUser}
            onResetToDefaults={async () => {
              // Direct Firebase seed recovery
              await seedInitialFirestoreData();
              const freshProfile = await fetchProfileInfo();
              setProfile(freshProfile);
              const freshProj = await fetchProjects();
              setProjects(freshProj);
              const freshCerts = await fetchCertifications();
              setCertifications(freshCerts);
              const freshReviews = await fetchReviews(true);
              setReviews(freshReviews);
              alert('Firestore seed database refreshed successfully back to clean templates!');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
