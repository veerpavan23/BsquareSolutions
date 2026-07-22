import { StudentOutcomesSection } from '@/components/home/StudentOutcomesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'Student Success Stories & Placement Outcomes | BSquare Solutions',
  description: 'Read verified student testimonials, certification achievements, and career transition stories at BSquare technology academy.',
};

export default function SuccessStoriesPage() {
  return (
    <div className="space-y-12 py-12">
      <StudentOutcomesSection />
      <TestimonialsSection />
    </div>
  );
}
