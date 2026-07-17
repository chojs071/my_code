import { NavItem, Language } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'resume', label: 'nav.resume', icon: 'FileText', href: '/resume' },
  { id: 'portfolio', label: 'nav.portfolio', icon: 'Briefcase', href: '/portfolio' },
  { id: 'interview', label: 'nav.interview', icon: 'MessageSquare', href: '/interview' },
  { id: 'certificates', label: 'nav.certificates', icon: 'Award', href: '/certificates' },
  { id: 'future', label: 'nav.future', icon: 'Sparkles', href: '/future' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const APP_NAME = 'CareerHub';
