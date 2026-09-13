export type Language = 'TR' | 'EN';

export interface Milestone {
  year: string;
  title: string;
  institution: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  conditions: string[];
  treatments: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  language?: Language;
  keywords?: string;
  metaDescription?: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  topicId: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ClinicHours {
  days: string;
  hours: string;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  gmapsDirectionUrl: string;
  hours: ClinicHours[];
}
