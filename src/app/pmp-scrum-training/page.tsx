import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { LearningPathsSection } from '@/components/home/LearningPathsSection';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Project Management & Agile Training | PMP & PSM | BSquare',
  description: 'Gain global recognition with PMP certification prep, Professional Scrum Master (PSM), and Agile delivery frameworks.',
};

export default function PmpScrumTrainingPage() {
  return (
    <div className="space-y-12">
      <FeaturedCourses />
      <LearningPathsSection />
      <DemoClassCTA />
    </div>
  );
}
