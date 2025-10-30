import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  className?: string;
};

export function SectionTitle({ icon: Icon, title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col items-center text-center mb-8 md:mb-12", className)}>
      <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-base md:text-lg text-muted-foreground">{subtitle}</p>
    </div>
  );
}
