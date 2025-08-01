import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CESCalculator } from '@/components/ces-calculator';
import { TrafficSourcesChart } from '@/components/traffic-sources-chart';
import { AlgorithmFlowchart } from '@/components/algorithm-flowchart';
import { Breadcrumb } from '@/components/breadcrumb';
import { Metadata } from 'next';

const guidesConfig = {
  'algorithm-deep-dive': {
    title: 'Algorithm Deep Dive',
    subtitle: 'Master the CES Scoring System',
    category: 'Core Algorithm',
    estimatedTime: '8 min read',
    order: 1,
    markdownFile: 'part1.md',
    description: 'Understand Xiaohongshu\'s CES algorithm scoring system. Learn how engagement, shares, and comments affect your AI app\'s reach in China.',
    keywords: ['xiaohongshu algorithm', 'CES scoring system', 'AI app China marketing', 'xiaohongshu engagement', 'redbook algorithm', 'china social media algorithm']
  },
  'traffic-sources-analysis': {
    title: 'Traffic Sources Analysis',
    subtitle: 'Where Your Views Come From',
    category: 'Traffic Strategy',
    estimatedTime: '6 min read',
    order: 2,
    markdownFile: 'part2.md',
    description: 'Discover the three main traffic sources on Xiaohongshu: discovery, search, and recommendations. Optimize your AI app content for each channel.',
    keywords: ['xiaohongshu traffic sources', 'redbook discovery', 'china app marketing channels', 'xiaohongshu search optimization', 'AI app viral marketing']
  },
  'push-mechanisms-explained': {
    title: 'Push Mechanisms Explained',
    subtitle: 'The Five Distribution Systems',
    category: 'Distribution Logic',
    estimatedTime: '7 min read',
    order: 3,
    markdownFile: 'part3.md',
    description: 'Master Xiaohongshu\'s five push mechanisms: immediate, delayed, hot content, search, and recommendation systems for AI app promotion.',
    keywords: ['xiaohongshu push mechanisms', 'content distribution china', 'AI app promotion strategy', 'redbook content optimization', 'viral content china']
  },
  'advanced-strategies': {
    title: 'Advanced Strategies',
    subtitle: 'Scale Your Content Impact',
    category: 'Growth Tactics',
    estimatedTime: '5 min read',
    order: 4,
    markdownFile: 'part4.md',
    description: 'Advanced AI app marketing strategies for Xiaohongshu: decentralized promotion, paid campaigns, and scaling viral content in China.',
    keywords: ['advanced xiaohongshu marketing', 'AI app scaling china', 'decentralized promotion', 'xiaohongshu paid promotion', 'viral AI app strategies']
  }
};

// Function to read markdown content from file
async function getMarkdownContent(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'xiaohongshu-algorithm', filename);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return '';
  }
}

// Helper functions for navigation
function getPrevGuideSlug(currentOrder: number): string {
  const prevOrder = currentOrder - 1;
  const prevGuide = Object.entries(guidesConfig).find(([, config]) => config.order === prevOrder);
  return prevGuide ? prevGuide[0] : '';
}

function getNextGuideSlug(currentOrder: number): string {
  const nextOrder = currentOrder + 1;
  const nextGuide = Object.entries(guidesConfig).find(([, config]) => config.order === nextOrder);
  return nextGuide ? nextGuide[0] : '';
}

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guidesConfig[slug as keyof typeof guidesConfig];
  
  if (!guide) {
    notFound();
  }

  const content = await getMarkdownContent(guide.markdownFile);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-5xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Guides', href: '/guides' },
              { label: guide.title }
            ]} 
          />
        </div>

        {/* Guide Header */}
        <div className="mb-12 max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              <Tag className="w-4 h-4 mr-1" />
              {guide.category}
            </span>
            <span className="inline-flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-1" />
              {guide.estimatedTime}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            {guide.title}
          </h1>
          <p className="text-xl text-gray-800">
            {guide.subtitle}
          </p>
        </div>

        {/* Guide Content */}
        <div className="space-y-12">
          {/* Algorithm Flowchart for first article */}
          {slug === 'algorithm-deep-dive' && (
            <div className="max-w-5xl mx-auto">
              <AlgorithmFlowchart />
            </div>
          )}

          {/* Main Content - Centered with max-width for readability */}
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-ul:text-gray-900 prose-ol:text-gray-900 prose-li:text-gray-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Interactive Components - Consistent width */}
          {slug === 'algorithm-deep-dive' && (
            <div className="max-w-5xl mx-auto">
              <CESCalculator />
            </div>
          )}

          {slug === 'traffic-sources-analysis' && (
            <div className="max-w-5xl mx-auto">
              <TrafficSourcesChart />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              {guide.order > 1 && (
                <Link 
                  href={`/guides/${getPrevGuideSlug(guide.order)}`}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Guide
                </Link>
              )}
            </div>
            <div>
              {guide.order < 4 && (
                <Link 
                  href={`/guides/${getNextGuideSlug(guide.order)}`}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Next Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesConfig[slug as keyof typeof guidesConfig];
  
  if (!guide) {
    return {
      title: 'Guide Not Found | Redverse',
      description: 'The requested guide could not be found.'
    };
  }

  const baseUrl = 'https://www.redverse.online';
  
  return {
    title: `${guide.title} | Redverse - AI App Marketing in China`,
    description: guide.description,
    keywords: guide.keywords,
    authors: [{ name: 'lantianlaoli' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${guide.title} | Redverse`,
      description: guide.description,
      url: `${baseUrl}/guides/${slug}`,
      siteName: 'Redverse',
      images: [
        {
          url: '/twitter.png',
          width: 1200,
          height: 630,
          alt: `${guide.title} - Redverse Guide`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} | Redverse`,
      description: guide.description,
      images: ['/twitter.png'],
      creator: '@redverse',
    },
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(guidesConfig).map((slug) => ({
    slug,
  }));
}