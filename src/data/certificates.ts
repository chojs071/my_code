import { Certificate } from '@/types';

export const certificateData: Certificate[] = [
  {
    id: '1',
    name: 'AWS Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: '2024-02-15',
    expiry: '2027-02-15',
    credentialUrl: 'https://example.com/cred/1',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Google Professional Cloud Developer',
    issuer: 'Google Cloud',
    date: '2023-11-20',
    expiry: '2026-11-20',
    credentialUrl: 'https://example.com/cred/2',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Meta Front-End Developer Certificate',
    issuer: 'Meta (Coursera)',
    date: '2023-08-10',
    image: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Scrum Master Certified (SMC)',
    issuer: 'Scrum Alliance',
    date: '2023-05-05',
    credentialUrl: 'https://example.com/cred/4',
    image: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'TOEIC (950)',
    issuer: 'ETS',
    date: '2023-03-01',
    expiry: '2025-03-01',
    image: '/placeholder.svg',
  },
];
