import { AnalyticsHighlight } from '@/components/home/AnalyticsHighlight';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata = {
  title: 'Power BI & Microsoft Fabric Training | PL-300 Certification | BSquare',
  description: 'Master Power Query, DAX formulas, Star Schema modeling, and Microsoft Fabric with hands-on live projects and PL-300 exam preparation.',
};

export default function PowerBITrainingPage() {
  return (
    <div className="space-y-12">
      <AnalyticsHighlight />
      <FeaturedCourses />
      <DemoClassCTA />
      <FAQSection />
    </div>
  );
}
