import { SalesforceHighlight } from '@/components/home/SalesforceHighlight';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { FAQSection } from '@/components/home/FAQSection';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Salesforce Training in Hyderabad | Admin, Developer, LWC Courses',
  description: 'Join the best Salesforce training institute in Hyderabad. 100% practical classes for Salesforce Admin, Developer, LWC & Integration. Global certification & placement support.',
  keywords: ['Salesforce Training Hyderabad', 'Salesforce Admin Course', 'Salesforce Developer Training', 'LWC Training', 'Salesforce Certification Ameerpet'],
  alternates: { canonical: 'https://bsquare.co.in/salesforce-training' },
};

export default function SalesforceTrainingPage() {
  return (
    <div className="space-y-12">
      <SalesforceHighlight />
      <FeaturedCourses />
      <DemoClassCTA />
      <FAQSection />
    </div>
  );
}
