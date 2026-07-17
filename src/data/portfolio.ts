import { PortfolioProject } from '@/types';

export const portfolioData: PortfolioProject[] = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign of a major e-commerce platform with focus on accessibility and performance. Achieved 98 Lighthouse score and 35% increase in conversion rate.',
    image: '/placeholder.svg',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
    url: 'https://example.com/project1',
    date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Real-Time Analytics Dashboard',
    description: 'Built a real-time analytics dashboard processing 10M+ events daily. Features interactive charts, custom reporting, and alerting system.',
    image: '/placeholder.svg',
    tags: ['React', 'D3.js', 'WebSocket', 'Node.js', 'AWS'],
    url: 'https://example.com/project2',
    date: '2024-01-20',
  },
  {
    id: '3',
    title: 'Mobile-First Social Platform',
    description: 'Developed a social networking platform with real-time messaging, feed algorithms, and content moderation system.',
    image: '/placeholder.svg',
    tags: ['React Native', 'Firebase', 'Cloud Functions', 'Elasticsearch'],
    date: '2023-10-10',
  },
  {
    id: '4',
    title: 'Open Source Component Library',
    description: 'Created and maintained an open source React component library with 2K+ GitHub stars. Comprehensive documentation and storybook integration.',
    image: '/placeholder.svg',
    tags: ['React', 'Storybook', 'Rollup', 'CSS Modules', 'GitHub Actions'],
    url: 'https://example.com/project4',
    date: '2023-07-05',
  },
  {
    id: '5',
    title: 'AI-Powered Resume Builder',
    description: 'Built an intelligent resume builder that uses AI to suggest improvements, optimize keywords, and format content professionally.',
    image: '/placeholder.svg',
    tags: ['Next.js', 'OpenAI', 'Zustand', 'Tailwind CSS', 'PostgreSQL'],
    date: '2023-04-12',
  },
];
