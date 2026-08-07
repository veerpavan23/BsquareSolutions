import { AnalyticsHighlight } from '@/components/home/AnalyticsHighlight';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';
import { FAQSection } from '@/components/home/FAQSection';

export const metadata = {
  title: 'Power BI Training in Hyderabad | DAX, Fabric & Real-time Projects',
  description: 'Master Data Analytics with the best Power BI training in Hyderabad. Learn DAX, Microsoft Fabric, Data Modeling and build enterprise dashboards. 100% placement support.',
  keywords: ['Power BI Training Hyderabad', 'DAX Training', 'Data Analytics Course', 'Microsoft Fabric Course', 'Power BI Ameerpet'],
  alternates: { canonical: 'https://bsquare.co.in/power-bi-training' },
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
