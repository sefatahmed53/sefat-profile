/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProfileInfo {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
  googleSiteUrl: string;
  availability: 'Available' | 'Fully Booked' | 'Part-time';
  photoSlides?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'UI/UX' | 'Graphic Design' | 'Brand Identity' | 'Web Design';
  role: string;
  year: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  isFeatured: boolean;
  longDescription?: string;
}

export interface FreelanceExperience {
  id: string;
  role: string;
  clientName: string;
  duration: string;
  description: string;
  achievements: string[];
  platform: 'Upwork' | 'Fiverr' | 'Direct Client' | 'Other';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
  verificationUrl: string;
  description?: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  rating: number;
  reviewText: string;
  date: string;
  approved: boolean;
}

export interface ContactSubmission {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}
