import { AnalyticsHighlight } from '@/components/home/AnalyticsHighlight';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Tableau Desktop & Server Training | Certified Data Analyst Prep | BSquare',
  description: 'Learn Tableau visual storytelling, LOD calculations, Tableau Prep data cleaning, and Tableau Cloud publishing at BSquare.',
};

export default function TableauTrainingPage() {
  return (
    <div className="space-y-12">
      <AnalyticsHighlight />
      <FeaturedCourses />
      <DemoClassCTA />
    </div>
  );
}
