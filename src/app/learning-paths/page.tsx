import { LearningPathsSection } from '@/components/home/LearningPathsSection';

export const metadata = {
  title: 'Visual Career Learning Paths | Salesforce, Power BI & AI Roadmaps | BSquare',
  description: 'Step-by-step career roadmaps showing skills, courses, certifications, capstone projects, and target job roles for tech professionals.',
};

export default function LearningPathsPage() {
  return (
    <div className="py-12">
      <LearningPathsSection />
    </div>
  );
}
