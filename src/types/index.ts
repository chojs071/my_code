export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  disabled?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface ResumeEntry {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
  date: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialUrl?: string;
  image: string;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export type ModuleId = 'resume' | 'portfolio' | 'interview' | 'certificates' | 'future';
