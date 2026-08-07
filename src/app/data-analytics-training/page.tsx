import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { LearningPathsSection } from '@/components/home/LearningPathsSection';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Data Analytics Training in Hyderabad | SQL, Excel, Python & BI',
  description: 'Launch your career as a Data Analyst with BSquare Solutions. Comprehensive Data Analytics training covering SQL, Advanced Excel, Python, and BI tools in Hyderabad.',
  keywords: ['Data Analytics Training Hyderabad', 'Data Analyst Course', 'SQL Training', 'Business Analytics Course', 'Data Science Ameerpet'],
  alternates: { canonical: 'https://bsquare.co.in/data-analytics-training' },
};

export default function DataAnalyticsTrainingPage() {
  return (
    <div className="space-y-12">
      <FeaturedCourses />
      <LearningPathsSection />
      <DemoClassCTA />
    </div>
  );
}
