import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { DemoClassCTA } from '@/components/home/DemoClassCTA';

export const metadata = {
  title: 'Generative AI & Data Science Training | LangChain, RAG & LLMs | BSquare',
  description: 'Master Python, Machine Learning, Deep Learning, Generative AI, RAG architecture, and Autonomous AI Agent engineering.',
};

export default function AIDataScienceTrainingPage() {
  return (
    <div className="space-y-12">
      <FeaturedCourses />
      <DemoClassCTA />
    </div>
  );
}
