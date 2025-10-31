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
        <div className="text-sm text-muted-foreground mt-2">
          <p className="font-semibold">مديرة المدرسة: مريم مبارك الحسيني</p>
          <p className="text-lg font-bold">إنجازات نجمات الشمال</p>
        </div>
      </div>
    </header>
  );
}
