import { SalesforceHighlight } from '@/components/home/SalesforceHighlight';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { FAQSection } from '@/components/home/FAQSection';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Salesforce Training Institute | ADM-201, Developer, LWC & Agentforce | BSquare',
  description: 'Master Salesforce Administration, Platform Developer, Lightning Web Components, Data Cloud and Agentforce AI at BSquare. Live projects & certification prep.',
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
