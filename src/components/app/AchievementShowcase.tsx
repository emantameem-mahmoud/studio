import Image from 'next/image';
import { Award, BookOpen, Palette } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from './SectionTitle';

const achievements = [
  {
    title: 'الفائزة في معرض العلوم',
    description: 'حصلت على المركز الأول عن مشروعها المبتكر في استخدام الطاقة المتجددة.',
    category: 'العلوم',
    icon: Award,
    image: PlaceHolderImages.find(img => img.id === 'achievement-1'),
  },
  {
    title: 'فنانة المدرسة',
    description: 'ساهمت في رسم جدارية ملونة لتزيين ساحة المدرسة.',
    category: 'الفن',
    icon: Palette,
    image: PlaceHolderImages.find(img => img.id === 'achievement-2'),
  },
  {
    title: 'عمل جماعي متميز',
    description: 'قادت فريقها لتقديم أفضل عرض تقديمي في مادة الدراسات الاجتماعية.',
    category: 'القيادة',
    icon: Award,
    image: PlaceHolderImages.find(img => img.id === 'achievement-3'),
  },
  {
    title: 'ملكة القراءة',
    description: 'أتمت قراءة 20 كتاباً خلال شهر واحد في تحدي القراءة.',
    category: 'القراءة',
    icon: BookOpen,
    image: PlaceHolderImages.find(img => img.id === 'achievement-4'),
  },
];

export function AchievementShowcase() {
  return (
    <section id="achievements">
      <SectionTitle
        icon={Award}
        title="لوحة شرف الإنجازات"
        subtitle="نحتفي هنا بإنجازات طالباتنا المتميزات في مختلف المجالات."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {achievement.image && (
              <div className="relative h-48 w-full">
                <Image
                  src={achievement.image.imageUrl}
                  alt={achievement.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={achievement.image.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline text-xl">{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{achievement.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">{achievement.category}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
