import { Hero } from '@/components/home/Hero';
import { StatsSection } from '@/components/home/StatsSection';
import { PopularCategories } from '@/components/home/PopularCategories';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { SalesforceHighlight } from '@/components/home/SalesforceHighlight';
import { AnalyticsHighlight } from '@/components/home/AnalyticsHighlight';
import { LearningPathsSection } from '@/components/home/LearningPathsSection';
import { WhyBSquare } from '@/components/home/WhyBSquare';
import { UpcomingBatchesSection } from '@/components/home/UpcomingBatchesSection';
import { DeliveryModesSection } from '@/components/home/DeliveryModesSection';
import { TrainersSection } from '@/components/home/TrainersSection';
import { StudentOutcomesSection } from '@/components/home/StudentOutcomesSection';
import { CorporateBanner } from '@/components/home/CorporateBanner';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ResourcesPreview } from '@/components/home/ResourcesPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Trusted Training Statistics */}
      <StatsSection />

      {/* 4. Popular Course Categories */}
      <PopularCategories />

      {/* 5. Featured Courses */}
      <FeaturedCourses />

      {/* 6. Salesforce Training Highlight */}
      <SalesforceHighlight />

      {/* 7. Power BI & Tableau Training Highlight */}
      <AnalyticsHighlight />

      {/* 8. Learning Paths */}
      <LearningPathsSection />

      {/* 9. Why BSquare */}
      <WhyBSquare />

      {/* 10. Upcoming Batches */}
      <UpcomingBatchesSection />

      {/* 11. Training Delivery Modes */}
      <DeliveryModesSection />

      {/* 12. Trainer Profiles */}
      <TrainersSection />

      {/* 13. Student Outcomes */}
      <StudentOutcomesSection />

      {/* 14. Corporate Training Banner */}
      <CorporateBanner />

      {/* 15. Free Demo Class CTA */}
      <DemoClassCTA />

      {/* 16. Testimonials */}
      <TestimonialsSection />

      {/* 17. Free Resources Preview */}
      <ResourcesPreview />

      {/* 18. FAQ */}
      <FAQSection />

      {/* 19. Contact Section */}
      <ContactSection />
    </>
  );
}
