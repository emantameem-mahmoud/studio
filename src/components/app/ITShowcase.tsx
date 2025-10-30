import Image from 'next/image';
import { Cpu, Bot, Printer } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionTitle } from './SectionTitle';

const itAchievements = [
  {
    title: 'تطوير تطبيق مدرسي',
    description: 'فريق من الطالبات يطور تطبيقاً لتنظيم الفعاليات المدرسية.',
    category: 'البرمجة',
    icon: Cpu,
    image: PlaceHolderImages.find(img => img.id === 'it-1'),
  },
  {
    title: 'الفوز بمسابقة الروبوت',
    description: 'تصميم وبرمجة روبوت ذكي لتنفيذ مهام معقدة والفوز بالمركز الأول.',
    category: 'الروبوتات',
    icon: Bot,
    image: PlaceHolderImages.find(img => img.id === 'it-2'),
  },
  {
    title: 'مشروع الطباعة ثلاثية الأبعاد',
    description: 'استخدام الطباعة ثلاثية الأبعاد لإنشاء نماذج تعليمية مبتكرة.',
    category: 'الابتكار',
    icon: Printer,
    image: PlaceHolderImages.find(img => img.id === 'it-3'),
  },
];

export function ITShowcase() {
  return (
    <section id="it-achievements">
      <SectionTitle
        icon={Cpu}
        title="إنجازات الحوسبة وتكنولوجيا المعلومات"
        subtitle="نستعرض هنا أبرز مشاريع وإبداعات طالباتنا في المجال التقني."
      />
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {itAchievements.map((achievement, index) => (
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
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{achievement.category}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

    