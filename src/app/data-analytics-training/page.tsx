import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { LearningPathsSection } from '@/components/home/LearningPathsSection';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Data Analytics Career Bootcamp | SQL, Python, Power BI & Excel | BSquare',
  description: 'Job-ready Data Analytics bootcamp covering Advanced SQL, Python Pandas, Power BI, Excel, and capstone analytics projects.',
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
