import { Star } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-right">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="p-2 bg-primary/20 rounded-full">
            <Star className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
            إنجازات نجمات الشمال
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold">مدرسة الشمال الابتدائية بنات</p>
          <p>مديرة المدرسة: مريم مبارك الحسيني</p>
        </div>
      </div>
    </header>
  );
}
