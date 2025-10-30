import { AchievementShowcase } from '@/components/app/AchievementShowcase';
import { FeedbackForm } from '@/components/app/FeedbackForm';
import { Footer } from '@/components/app/Footer';
import { Header } from '@/components/app/Header';
import { ITShowcase } from '@/components/app/ITShowcase';
import { PersonalizedMessages } from '@/components/app/PersonalizedMessages';
import { RewardsSystem } from '@/components/app/RewardsSystem';
import { SchoolCalendar } from '@/components/app/SchoolCalendar';
import { StoryGenerator } from '@/components/app/StoryGenerator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="space-y-16 md:space-y-24">
          <PersonalizedMessages />
          <AchievementShowcase />
          <ITShowcase />
          
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16">
            <div className="lg:col-span-3">
              <RewardsSystem />
            </div>
            <div className="lg:col-span-2">
              <SchoolCalendar />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <StoryGenerator />
            <FeedbackForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    