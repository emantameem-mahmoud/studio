import { Star } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/20 rounded-full">
            <Star className="text-primary" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            مدرسة الشمال الابتدائية للبنات
          </h1>
        </div>
        <div className="mt-2 text-center w-full">
            <div className="flex justify-between items-center">
                <p className="text-lg font-body text-muted-foreground">مديرة المدرسة: مريم مبارك الحسيني</p>
                <p className="text-2xl font-headline font-bold text-foreground/90 mt-1 flex-grow text-center">إنجازات نجمات الشمال</p>
                <div className="w-48"></div>
            </div>
        </div>
      </div>
    </header>
  );
}
