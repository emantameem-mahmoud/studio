import { Footer } from '@/components/app/Footer';
import { Header } from '@/components/app/Header';
import { ITShowcase } from '@/components/app/ITShowcase';
import { RewardsSystem } from '@/components/app/RewardsSystem';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="space-y-16 md:space-y-24">
          <ITShowcase />
          <RewardsSystem />
        </div>
      </main>
      <Footer />
    </div>
  );
}
