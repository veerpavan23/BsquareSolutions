import { TrainersSection } from '@/components/home/TrainersSection';

export const metadata = {
  title: 'Certified Elite Technology Trainers & MVPs | BSquare Solutions',
  description: 'Meet our team of active industry practitioners, certified Salesforce MVPs, Microsoft Certified Trainers, and AI architects.',
};

export default function TrainersPage() {
  return (
    <div className="py-12">
      <TrainersSection />
    </div>
  );
}
