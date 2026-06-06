/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from './firebase';
import {
  ProfileInfo,
  Project,
  Certification,
  ClientReview,
  ContactSubmission
} from './types';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_CERTIFICATIONS,
  INITIAL_REVIEWS
} from './data';

// --- SEEDING SYSTEM ---
// Automatically seed initial data if collections are empty to ensure a beautiful immediate presentation.
export async function seedInitialFirestoreData() {
  try {
    // 1. Profile
    const profileRef = doc(db, 'settings', 'profile');
    const profileSnap = await getDoc(profileRef);
    if (!profileSnap.exists()) {
      await setDoc(profileRef, INITIAL_PROFILE);
    }

    // 2. Projects
    const projectsColl = collection(db, 'projects');
    const projectsSnap = await getDocs(projectsColl);
    if (projectsSnap.empty) {
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), p);
      }
    }

    // 3. Certifications
    const certsColl = collection(db, 'certificates');
    const certsSnap = await getDocs(certsColl);
    if (certsSnap.empty) {
      for (const c of INITIAL_CERTIFICATIONS) {
        await setDoc(doc(db, 'certificates', c.id), c);
      }
    }

    // 4. Reviews
    const reviewsColl = collection(db, 'reviews');
    const reviewsSnap = await getDocs(reviewsColl);
    if (reviewsSnap.empty) {
      for (const r of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'reviews', r.id), r);
      }
    }

    // 5. Resume PDF link metadata default
    const resumeRef = doc(db, 'resume', 'default');
    const resumeSnap = await getDoc(resumeRef);
    if (!resumeSnap.exists()) {
      await setDoc(resumeRef, {
        id: 'default',
        pdfUrl: 'https://sites.google.com/diu.edu.bd/sefat1', // Reference to google site resume
        version: '1.0.0',
        updatedAt: new Date().toLocaleDateString('en-US')
      });
    }

    // 6. Social Links default
    const socialRef = doc(db, 'settings', 'socialLinks');
    const socialSnap = await getDoc(socialRef);
    if (!socialSnap.exists()) {
      await setDoc(socialRef, {
        facebook: 'https://www.facebook.com/sefatahmed53/',
        linkedin: 'https://www.linkedin.com/in/sefat-ahmed/',
        github: 'https://github.com',
        email: 'sefatahmed53@gmail.com',
        googleSite: 'sites.google.com/diu.edu.bd/sefat1'
      });
    }

    console.log('Firestore seeder completed successfully.');
  } catch (error) {
    console.error('Error seeding Firestore data: ', error);
  }
}

// --- PROFILE ACTIONS ---
export async function fetchProfileInfo(): Promise<ProfileInfo> {
  const path = 'settings/profile';
  try {
    const profileSnap = await getDoc(doc(db, 'settings', 'profile'));
    if (profileSnap.exists()) {
      return {
        ...INITIAL_PROFILE,
        ...(profileSnap.data() as Partial<ProfileInfo>)
      } as ProfileInfo;
    }
    return INITIAL_PROFILE;
  } catch (error) {
    return handleFirestoreError(error, OperationType.GET, path) as any;
  }
}

export async function updateProfileInfo(profile: ProfileInfo): Promise<void> {
  const path = 'settings/profile';
  try {
    await setDoc(doc(db, 'settings', 'profile'), profile);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- PROJECT ACTIONS ---
export async function fetchProjects(): Promise<Project[]> {
  const path = 'projects';
  try {
    const pSnap = await getDocs(collection(db, 'projects'));
    return pSnap.docs.map(doc => doc.data() as Project);
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path) as any;
  }
}

export async function saveProject(project: Project): Promise<void> {
  const path = `projects/${project.id}`;
  try {
    await setDoc(doc(db, 'projects', project.id), project);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  const path = `projects/${projectId}`;
  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- CERTIFICATION ACTIONS ---
export async function fetchCertifications(): Promise<Certification[]> {
  const path = 'certificates';
  try {
    const cSnap = await getDocs(collection(db, 'certificates'));
    return cSnap.docs.map(doc => doc.data() as Certification);
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path) as any;
  }
}

export async function saveCertification(cert: Certification): Promise<void> {
  const path = `certificates/${cert.id}`;
  try {
    await setDoc(doc(db, 'certificates', cert.id), cert);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCertification(certId: string): Promise<void> {
  const path = `certificates/${certId}`;
  try {
    await deleteDoc(doc(db, 'certificates', certId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- REVIEWS ACTIONS ---
export async function fetchReviews(includePending = false): Promise<ClientReview[]> {
  const path = 'reviews';
  try {
    const qSnap = await getDocs(collection(db, 'reviews'));
    const all = qSnap.docs.map(doc => doc.data() as ClientReview);
    if (includePending) return all;
    return all.filter(r => r.approved);
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path) as any;
  }
}

export async function saveReview(review: ClientReview): Promise<void> {
  const path = `reviews/${review.id}`;
  try {
    await setDoc(doc(db, 'reviews', review.id), review);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateReviewApproval(reviewId: string, approved: boolean): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await updateDoc(doc(db, 'reviews', reviewId), { approved });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- CONTACT SUBMISSIONS ACTIONS ---
export async function fetchSubmissions(): Promise<ContactSubmission[]> {
  const path = 'contactMessages';
  try {
    const cSnap = await getDocs(collection(db, 'contactMessages'));
    const messages = cSnap.docs.map(doc => doc.data() as ContactSubmission);
    // Sort by date (descending)
    return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return handleFirestoreError(error, OperationType.LIST, path) as any;
  }
}

export async function saveContactSubmission(submission: ContactSubmission): Promise<void> {
  const path = `contactMessages/${submission.id}`;
  try {
    await setDoc(doc(db, 'contactMessages', submission.id), submission);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function markSubmissionRead(messageId: string, isRead: boolean): Promise<void> {
  const path = `contactMessages/${messageId}`;
  try {
    await updateDoc(doc(db, 'contactMessages', messageId), { isRead });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteSubmission(messageId: string): Promise<void> {
  const path = `contactMessages/${messageId}`;
  try {
    await deleteDoc(doc(db, 'contactMessages', messageId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- RESUME METADATA ACTIONS ---
export interface ResumeMeta {
  id: string;
  pdfUrl: string;
  version: string;
  updatedAt: string;
}

export async function fetchResumeMeta(): Promise<ResumeMeta> {
  const path = 'resume/default';
  try {
    const rSnap = await getDoc(doc(db, 'resume', 'default'));
    if (rSnap.exists()) {
      return rSnap.data() as ResumeMeta;
    }
    return {
      id: 'default',
      pdfUrl: 'https://sites.google.com/diu.edu.bd/sefat1',
      version: '1.0.0',
      updatedAt: new Date().toLocaleDateString('en-US')
    };
  } catch (error) {
    return handleFirestoreError(error, OperationType.GET, path) as any;
  }
}

export async function saveResumeMeta(meta: ResumeMeta): Promise<void> {
  const path = 'resume/default';
  try {
    await setDoc(doc(db, 'resume', 'default'), meta);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- SOCIAL LINKS ACTIONS ---
export interface SocialLinks {
  facebook: string;
  linkedin: string;
  github: string;
  email: string;
  googleSite: string;
}

export async function fetchSocialLinks(): Promise<SocialLinks> {
  const path = 'settings/socialLinks';
  try {
    const sSnap = await getDoc(doc(db, 'settings', 'socialLinks'));
    if (sSnap.exists()) {
      return sSnap.data() as SocialLinks;
    }
    return {
      facebook: 'https://www.facebook.com/sefatahmed53/',
      linkedin: 'https://www.linkedin.com/in/sefat-ahmed/',
      github: 'https://github.com',
      email: 'sefatahmed53@gmail.com',
      googleSite: 'sites.google.com/diu.edu.bd/sefat1'
    };
  } catch (error) {
    return handleFirestoreError(error, OperationType.GET, path) as any;
  }
}

export async function saveSocialLinks(links: SocialLinks): Promise<void> {
  const path = 'settings/socialLinks';
  try {
    await setDoc(doc(db, 'settings', 'socialLinks'), links);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- UPLOAD STORAGE HELPER (Graceful Fallback) ---
export async function uploadFileToStorage(file: File, refPath: string): Promise<string> {
  try {
    const storageRef = ref(storage, refPath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.warn('Firebase Storage upload failed/not-configured, falling back to local object URL:', error);
    // Return a local Object URL or return a base64 string
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
